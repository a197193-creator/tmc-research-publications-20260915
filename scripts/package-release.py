from pathlib import Path
import zipfile, hashlib, json
root=Path(__file__).resolve().parents[1]
out=root/'release'
out.mkdir(exist_ok=True)
plugin=root/'wordpress/tmc-research-portal'
archive=out/'tmc-research-wordpress-2026-10-13.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for file in plugin.rglob('*'):
        if file.is_file() and file.name != 'fixture-result.json': z.write(file, 'tmc-research-portal/'+file.relative_to(plugin).as_posix())
with zipfile.ZipFile(archive) as z:
    assert 'tmc-research-portal/tmc-research-portal.php' in z.namelist()
    assert 'tmc-research-portal/build/.vite/manifest.json' in z.namelist()
    seed=json.loads(z.read('tmc-research-portal/seed.json'))
    assert len(seed['projects'])==22 and len(seed['publications'])==68
    assert 'currentParticipants' not in z.read('tmc-research-portal/seed.json').decode()
    assert not any('.env' in name or 'node_modules' in name or '.git/' in name for name in z.namelist())
hashes={archive.name:hashlib.sha256(archive.read_bytes()).hexdigest()}
(out/'SHA256SUMS.json').write_text(json.dumps(hashes,indent=2)+'\n')
print('Verified installable ZIP:',archive,'SHA256',hashes[archive.name])
