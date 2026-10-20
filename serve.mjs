import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
import {markdown} from './presentation.mjs';
const root=path.resolve('.');
const server=http.createServer((req,res)=>{
 let rel;
 try{rel=decodeURIComponent(req.url.split('?')[0]);}catch{res.writeHead(400);return res.end('Invalid URL encoding');}
 if(rel==='/')rel='/outputs/dashboard.html';
 const p=path.resolve(root,'.'+rel);
 if(!p.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
 try{
  let body=fs.readFileSync(p);
  if(p.endsWith('.md'))body='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project supporting document</title><style>body{font:18px/1.65 system-ui;color:#192b35;max-width:1400px;margin:40px auto;padding:24px}.scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:16px}td,th{padding:12px;text-align:left;border-bottom:1px solid #dce5e1;min-width:120px}thead th{background:#eaf1ef}tbody tr:nth-child(even){background:#f5f8f8}pre{white-space:pre-wrap;overflow-wrap:anywhere}a{color:#14625a}</style><a href="/">Back to dashboard</a><main>'+markdown(body.toString('utf8'))+'</main></html>';
  const mime=p.endsWith('.html')||p.endsWith('.md')?'text/html':p.endsWith('.json')?'application/json':'text/plain';
  res.writeHead(200,{'Content-Type':mime+'; charset=utf-8'});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.on('error',error=>{
 console.error(error.code==='EADDRINUSE'?'Port already in use. Reuse the existing verified dashboard, stop only your own server with Ctrl+C, or set $env:PORT=4391 and rerun node serve.mjs.':error.message);
 process.exitCode=1;
});
server.listen(Number(process.env.PORT??4390),'127.0.0.1',()=>console.log(`Local dashboard: http://127.0.0.1:${server.address().port} — Ctrl+C to stop`));
