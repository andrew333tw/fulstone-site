import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const [commit,output]=process.argv.slice(2);if(!/^[a-f0-9]{40}$/.test(commit)||!output)throw Error('Pass exact deployed commit and external evidence directory');
const repo='andrew333tw/fulstone-site',base='https://fulstone.tw/';
const api=p=>JSON.parse(execFileSync('gh',['api',`repos/${repo}/${p}`],{encoding:'utf8'}));
const main=api('commits/main'),build=api('pages/builds/latest');
assert.equal(main.sha,commit);assert.equal(build.commit,commit);assert.equal(build.status,'built');
const expected=JSON.parse(execFileSync('git',['show',`${commit}:release-manifest.json`],{encoding:'utf8'}));
const checks=[];
for(const [file,sha256]of Object.entries(expected.files)) {
 const response=await fetch(base+file+'?v='+commit,{signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,200,file);const bytes=Buffer.from(await response.arrayBuffer());
 const actual=createHash('sha256').update(bytes).digest('hex');assert.equal(actual,sha256,file);
 checks.push({file,status:response.status,bytes:bytes.length,sha256:actual,contentType:response.headers.get('content-type')});
}
const manifestResponse=await fetch(base+'release-manifest.json?v='+commit,{signal:AbortSignal.timeout(20000)});assert.equal(manifestResponse.status,200);
assert.deepEqual(await manifestResponse.json(),expected);
const range=await fetch(base+'assets/media/workflow-demo.mp4?v='+commit,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(20000)});assert.equal(range.status,206);assert.match(range.headers.get('content-range'),/^bytes 0-1023\//);await range.arrayBuffer();
assert.equal(api('commits/main').sha,commit);assert.equal(api('pages/builds/latest').commit,commit);
await mkdir(output,{recursive:true});await writeFile(output+'/production-assets.json',JSON.stringify({repo,base,checkedAt:new Date().toISOString(),commit,main:main.sha,build,release:expected.release,manifest:true,rangeStatus:range.status,checks},null,2));
console.log('PRODUCTION PASS',commit,checks.length,'manifest asset byte hashes; published manifest and video byte ranges');
