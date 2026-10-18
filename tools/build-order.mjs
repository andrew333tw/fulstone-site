import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const source=path.resolve(process.argv[2] || '');
if(!fs.existsSync(path.join(source,'sales-demo/engine.ts'))) throw Error('Pass the verified Business OS repository root');
const ts=require(path.join(source,'node_modules/typescript'));
const out=path.resolve(import.meta.dirname,'../assets');fs.mkdirSync(out,{recursive:true});
const read=p=>fs.readFileSync(path.join(source,p),'utf8');
const inputs=['sales-demo/engine.ts','adapters/tabular.ts','delivery-kit/records.ts','delivery-kit/errors.ts','infra/hash.ts'];
const fixtures={};
for(const id of fs.readdirSync(path.join(source,'sales-demo/fixtures'))){
 for(const name of ['manifest.json','source-a.csv','source-b.csv']){
 const p=`sales-demo/fixtures/${id}/${name}`;fixtures['/'+p]=read(p);inputs.push(p);
 }
}
const adapter=`
const fixtureFiles=${JSON.stringify(fixtures)};
const path={dirname:()=>'/sales-demo',join:(...x)=>x.join('/')};
const fileURLToPath=()=>'/sales-demo/engine.ts';
const readFileSync=(p)=>{if(!(p in fixtureFiles))throw new DemoError('NOT_FOUND','找不到這組示範資料');return fixtureFiles[p]};
const readdirSync=()=>[...new Set(Object.keys(fixtureFiles).map(p=>p.split('/')[3]))].map(name=>({name,isDirectory:()=>true}));
const newId=prefix=>prefix+'_'+crypto.randomUUID();
// Synchronous SHA-256 for unchanged S20 receipt contract. Covered by Node hash parity tests.
function sha256(input){
 const bytes=new TextEncoder().encode(input);const len=bytes.length;
 const data=new Uint8Array(Math.ceil((len+9)/64)*64);data.set(bytes);data[len]=128;
 const v=new DataView(data.buffer);v.setUint32(data.length-4,len*8);v.setUint32(data.length-8,Math.floor(len/536870912));
 const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];const r=(x,n)=>(x>>>n)|(x<<(32-n));
 for(let off=0;off<data.length;off+=64){const w=new Uint32Array(64);for(let i=0;i<16;i++)w[i]=v.getUint32(off+i*4);for(let i=16;i<64;i++){const a=w[i-15],b=w[i-2];w[i]=(w[i-16]+(r(a,7)^r(a,18)^(a>>>3))+w[i-7]+(r(b,17)^r(b,19)^(b>>>10)))>>>0}
 let [a,b,c,d,e,f,g,z]=h;for(let i=0;i<64;i++){const t=(z+(r(e,6)^r(e,11)^r(e,25))+((e&f)^(~e&g))+k[i]+w[i])>>>0;const u=((r(a,2)^r(a,13)^r(a,22))+((a&b)^(a&c)^(b&c)))>>>0;z=g;g=f;f=e;e=(d+t)>>>0;d=c;c=b;b=a;a=(t+u)>>>0}for(const [i,x]of [a,b,c,d,e,f,g,z].entries())h[i]=(h[i]+x)>>>0;
 }return h.map(x=>x.toString(16).padStart(8,'0')).join('');
}
export {sha256};
`;
const strip=s=>s.replace(/^import .*;\r?\n/gm,'');
const csv=read('adapters/tabular.ts').slice(read('adapters/tabular.ts').indexOf('export interface Table'),read('adapters/tabular.ts').indexOf('/** First worksheet'));
const records=read('delivery-kit/records.ts').slice(read('delivery-kit/records.ts').indexOf('export interface FieldSpec'),read('delivery-kit/records.ts').indexOf('// ---------------- business timezone'));
const hash=read('infra/hash.ts').slice(read('infra/hash.ts').indexOf('/** Deterministic'),read('infra/hash.ts').indexOf('/** Time-sortable'));
const code=adapter+strip(read('delivery-kit/errors.ts'))+csv+records+hash+strip(read('sales-demo/engine.ts'));
fs.writeFileSync(path.join(out,'order-engine.mjs'),'// GENERATED from unchanged S20; regenerate with tools/build-order.mjs.\n'+ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);
fs.writeFileSync(path.join(out,'order-provenance.json'),JSON.stringify({source_repository:'andrew333tw/fulstone-business-os',inputs:inputs.map(file=>({file,sha256:createHash('sha256').update(read(file)).digest('hex')}))},null,2)+'\n');
console.log('Generated browser S20 engine; '+inputs.length+' hashed source files');
