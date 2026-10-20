// Reproducible silent film: capture the actual synthetic UI, compose six scenes,
// then encode locally. No network account, customer input or external service.
import {createRequire} from 'node:module';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:8764';
const output = path.resolve(process.argv[3] || '../video-evidence');
const media = path.resolve(import.meta.dirname, '../assets/media');
await mkdir(output, {recursive:true}); await mkdir(media, {recursive:true});
const ffmpeg = process.env.FFMPEG_PATH || execFileSync('python', ['-X', 'utf8', '-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'], {encoding:'utf8'}).trim();
const browser = await chromium.launch({headless:true, channel:'msedge'});
try {
  const context = await browser.newContext({viewport:{width:1280,height:720}, reducedMotion:'reduce'});
  const page = await context.newPage(), stage = await context.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/demos/order-check/'); await page.waitForSelector('#scenario option',{state:'attached'});
  const scenes = [];
  const capture = async (index, heading, caption, selector, duration) => {
    await page.locator(selector).first().evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-20));
    const screen = index===4 ? await page.locator(selector).first().screenshot() : await page.screenshot();
    await writeFile(path.join(output,`source-${index}.png`),screen);
    await stage.setContent(`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f3efe6;color:#1c1915;font-family:'Microsoft JhengHei',sans-serif}.scene{width:1280px;height:720px;padding:24px 60px 18px}.top{display:flex;justify-content:space-between;font-size:14px;letter-spacing:2px;color:#6b3418}.heading{font-size:32px;font-weight:700;margin:14px 0 18px}.screen{height:490px;border:1px solid #bdb3a3;box-shadow:9px 9px 0 #e1d9cb;overflow:hidden;background:#fffdf8}.screen img{display:block;width:100%}.caption{font-size:19px;margin:20px 0 6px}.bottom{display:flex;justify-content:space-between;font-size:13px;color:#625b51}</style><main class="scene"><div class="top"><b>FULSTONE / MAKE WORK FLOW.</b><span>0${index} / 06</span></div><div class="heading">${heading}</div><div class="screen"><img alt="實際虛構資料示範畫面" src="data:image/png;base64,${screen.toString('base64')}"></div><p class="caption">${caption}</p><div class="bottom"><span>虛構資料展示 · 非客戶案例 · 無真實資料寫入</span><span>fulstone.tw</span></div></main></html>`);
    await stage.locator('img').evaluate(el=>el.decode());
    const file=path.join(output,`scene-${index}.png`); await stage.screenshot({path:file});
    scenes.push({index,heading,caption,duration,source:`source-${index}.png`,frame:`scene-${index}.png`});
  };
  await capture(1,'兩份資料，為什麼總要重新核對？','訂單與出貨清單，差異需要一個清楚的處理方式。','#sources',6);
  await page.locator('#scenario').selectOption('weekly-exceptions');
  await capture(2,'先選一組情境，保留原本的工作方式。','預載虛構資料，不上傳真實訂單，也不更換整套系統。','.toolbar',6);
  await page.locator('#run').click();
  await capture(3,'差異在哪裡，先看清楚。','Dashboard 的數量、分布與明細，來自同一份核對結果。','.dashboard',8);
  // A real poster: the same browser-rendered third scene, not a mock interface.
  await stage.screenshot({path:path.join(media,'workflow-poster.jpg'),type:'jpeg',quality:88});
  const first = page.locator('[data-exception]').last();
  await first.locator('[data-choice]').selectOption('KEEP_B');
  await capture(4,'查看來源，再由人決定。','先比較同一項目的來源，選擇採用哪一份或排除。','.exception:last-of-type',8);
  await first.locator('[data-confirm]').click();
  while(await page.getByRole('button',{name:'確認此項',exact:true}).count()) await page.getByRole('button',{name:'確認此項',exact:true}).first().click();
  await page.locator('#complete').click(); await page.locator('#result-title').waitFor();
  await capture(5,'全部確認後，才產生結果摘要。','每一項人工決定可追溯；示範不寫入任何真實訂單。','#result-title',8);
  await page.goto(base+'/#contact');
  await capture(6,'你最常重做的那一步，是什麼？','到 fulstone.tw，試用 Demo，再用三個問題描述你的工作。','#contact',4);
  if(errors.length) throw Error(JSON.stringify(errors));
  const args=['-y','-hide_banner','-loglevel','error'];
  for(const scene of scenes) args.push('-loop','1','-t',String(scene.duration),'-i',path.join(output,scene.frame));
  const filters=scenes.map((s,i)=>`[${i}:v]fps=24,scale=1280:720,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.25,fade=t=out:st=${s.duration-0.25}:d=0.25[v${i}]`).join(';')+';'+scenes.map((_,i)=>`[v${i}]`).join('')+'concat=n=6:v=1:a=0[v]';
  const video=path.join(media,'workflow-demo.mp4');
  args.push('-filter_complex',filters,'-map','[v]','-an','-c:v','libx264','-preset','medium','-crf','23','-movflags','+faststart','-t','40',video);
  execFileSync(ffmpeg,args,{stdio:'inherit'});
  const stamp=n=>`00:${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}.000`;
  let offset=0;const cues=scenes.map(s=>{const start=offset;offset+=s.duration;return `${s.index}\n${stamp(start)} --> ${stamp(offset)}\n${s.heading}\n${s.caption}\n`;});
  await writeFile(path.join(media,'workflow-zh.vtt'),'WEBVTT\n\n'+cues.join('\n'));
  // Reuse the actual poster with a correctly sized original sharing crop.
  const poster=await readFile(path.join(media,'workflow-poster.jpg'));
  await stage.setViewportSize({width:1200,height:630});
  await stage.setContent(`<html><style>body{margin:0;background:#f3efe6}img{width:1200px;height:630px;object-fit:cover}</style><img alt="FULSTONE 虛構核對展示" src="data:image/jpeg;base64,${poster.toString('base64')}"></html>`);
  await stage.locator('img').evaluate(el=>el.decode());
  await stage.screenshot({path:path.join(media,'share-workflow.jpg'),type:'jpeg',quality:88});
  const bytes=await readFile(video);
  await writeFile(path.join(output,'render-receipt.json'),JSON.stringify({source:base,synthetic:true,durationSeconds:40,width:1280,height:720,fps:24,audio:false,scenes,encoderVersion:execFileSync(ffmpeg,['-version'],{encoding:'utf8'}).split('\n')[0],bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),pageErrors:errors},null,2));
  console.log('Rendered 40-second original synthetic-demo film:',video,bytes.length,'bytes');
} catch(error) {console.error(error);process.exitCode=1;} finally {await Promise.race([browser.close(),new Promise(r=>setTimeout(r,5000))]);}
process.exit(process.exitCode||0);
