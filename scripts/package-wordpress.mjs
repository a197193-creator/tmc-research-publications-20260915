import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { researchProjectRegister } from '../src/data/researchInitiatives.ts';
import { publicationsList } from '../src/data/publications.ts';

const root=process.cwd();
const plugin=path.resolve(root,'wordpress/tmc-research-portal');
const build=path.resolve(plugin,'build');
if (!build.startsWith(root+path.sep)) throw new Error('Build must stay inside this repository');
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build','--outDir',build],{
  stdio:'inherit', env:{...process.env,TMC_BASE_PATH:'./'}
});
function publicProject(record) {
  const {currentParticipants,samplesCount,...safe}=record;
  if (safe.subProjects) safe.subProjects=safe.subProjects.map(publicProject);
  return safe;
}
fs.writeFileSync(path.join(plugin,'seed.json'),JSON.stringify({
  checkedOn:'2026-10-13', projects:researchProjectRegister.map(publicProject),publications:publicationsList
},null,2)+'\n');
console.log('WordPress package build: 22 projects, 56 components, 68 distinct publications. Import creates drafts.');
