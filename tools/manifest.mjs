import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');const files=['index.html','CNAME','.nojekyll','favicon.ico'];
for(const dir of ['assets','demos'])for(const f of fs.readdirSync(path.join(root,dir),{recursive:true,withFileTypes:true}))if(f.isFile())files.push(path.relative(root,path.join(f.parentPath,f.name)).replaceAll('\\','/'));
const manifest=Object.fromEntries(files.sort().map(file=>[file,createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')]));
fs.writeFileSync(path.join(root,'release-manifest.json'),JSON.stringify({release:'FULSTONE-V3-1151021',files:manifest},null,2)+'\n');console.log('Release manifest',files.length,'files');
