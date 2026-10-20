// Developer-only accessibility audit; injected through browser protocol, not shipped.
import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
if(!process.env.AXE_SOURCE)throw Error('AXE_SOURCE must point to local axe-core/axe.min.js');
const axe=await readFile(process.env.AXE_SOURCE,'utf8');
const base=process.argv[2],output=process.argv[3];await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined}),results=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
  const audit=async surface=>{
   await page.evaluate(axe);
   const report=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,failureSummary:n.failureSummary}))})),passes:r.passes.length,incomplete:r.incomplete.map(v=>v.id)};});
   results.push({width,surface,...report});
  };
  await page.goto(base+'/');await audit('home');
  await page.goto(base+'/demos/order-check/');await page.waitForSelector('#scenario option',{state:'attached'});await page.locator('#run').click();await audit('order review');
  while(await page.getByRole('button',{name:'確認此項',exact:true}).count())await page.getByRole('button',{name:'確認此項',exact:true}).first().click();await page.locator('#complete').click();await audit('order summary');
  await page.goto(base+'/demos/studio-flow/');await page.waitForSelector('[data-case]');await audit('studio');
  await page.goto(base+'/demos/operations/');await page.waitForSelector('#ops-rows tr');await audit('operations');await page.locator('[data-open]').first().click();await audit('operations detail');
  await page.goto(base+'/demos/workflow/');await page.waitForSelector('#workflow-stages li');for(let i=0;i<3;i++)await page.locator('#workflow-next').click();await audit('workflow review');await page.locator('#workflow-scenario').selectOption('invalid');await page.locator('#workflow-next').click();await page.locator('#workflow-next').click();await audit('workflow error');
  await Promise.race([context.close(),new Promise(r=>setTimeout(r,5000))]);
 }
 await writeFile(output+'/a11y-results.json',JSON.stringify({base,tool:'axe-core 4.11.0',results},null,2));
 for(const r of results){console.log(r.width,r.surface,r.passes,'rules passed',JSON.stringify(r.violations));assert.deepEqual(r.violations,[]);}
}catch(e){console.error(e);process.exitCode=1;}finally{await Promise.race([browser.close(),new Promise(r=>setTimeout(r,5000))]);}
process.exit(process.exitCode||0);
