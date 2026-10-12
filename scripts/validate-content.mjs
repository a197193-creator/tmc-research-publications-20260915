import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { researchProjectRegister } from '../src/data/researchInitiatives.ts';
import { publicationsList, publicationRegister } from '../src/data/publications.ts';

assert.equal(researchProjectRegister.length, 22);
assert.equal(researchProjectRegister.reduce((n,p)=>n+(p.subProjects?.length||0),0), 56);
assert.equal(publicationRegister.length, 69);
assert.equal(publicationsList.length, 68);
assert.equal(new Set(publicationsList.map(p=>p.id)).size, 68);
const article=publicationsList.find(p=>p.doi==='10.21315/mjms2024.31.3.6');
assert.equal(article.year, 2024);
assert.deepEqual(article.sourceRecordIds,['tmc-publication-54','tmc-publication-46']);
const proceedings=publicationsList.filter(p=>p.doi.toLowerCase()==='10.17576/mh.2023.s1809');
assert.equal(proceedings.length,2);
assert.equal(new Set(proceedings.map(p=>p.url)).size,2);
assert.ok(proceedings.every(p=>p.citationNote&&p.url.includes('#page=')));
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true}))entry.isDirectory()?walk(path.join(dir,entry.name)):files.push(path.join(dir,entry.name));}
walk('src');
const referenced=new Set();
for(const file of files.filter(f=>/\.(tsx|ts)$/.test(f))) {
  const text=fs.readFileSync(file,'utf8');
  for(const m of text.matchAll(/['"]\/(assets|documents)\/([^'"]+)['"]/g)) {
    const asset=path.join('public',m[1],m[2]);
    assert.ok(fs.existsSync(asset),`Missing asset: ${asset}`);
    referenced.add(asset);
  }
}
const report={checkedOn:'2026-10-13',projects:22,subprojects:56,sourcePublicationRows:69,distinctPublications:68,localAssets:referenced.size,result:'passed'};
fs.writeFileSync('docs/content-checks-2026-10-13.json',JSON.stringify(report,null,2)+'\n');
console.log(report);
