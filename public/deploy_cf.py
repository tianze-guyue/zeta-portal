import hashlib
import base64
import json
import os
import mimetypes
import requests

# Config
project_name = "zeta-portal"
account_id = "21a7bb6819c1d2717d2cb87a7969908f"
token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwYWdlcy1idWlsZC1tYWVzdHJvIiwiZXhwIjoxNzg2ODk2MTUxLCJmZWF0dXJlcyI6WyJmaWxlcyJdLCJpYXQiOjE3ODY4OTQzNTEsImlzcyI6ImZ1bmZldHRpIiwibWF4X2ZpbGVfY291bnRfYWxsb3dlZCI6MjAwMDAsInByb2plY3ROYW1lc3BhY2UiOiI3OTI0MmYwZTEzY2E0MmRjYWRmNzRmNDM0YWI0N2ZhOSJ9.uVw1SH-PKkqYRWB13QZQZ6v_Z_yW67F3pyCBTU96fsfn4Kn6-27NxkSH_VmgD-ixMxdfEtwzttnisXOGa3Di7XfVNrb8mmnw6ctEZ1o0NlYq_ojf-Cu8dNdNjbxm9NAEifAirgtydklzVvsdQ4LUcbit6YqOw8vxzHL1rPmPqjg34brfxmKHNqWohxS1WlX_wzGZPw9e8ZQxBX1wUfUWscPdt2T51_v8t2HRd1lQnaLoVZ-xC6LPL3NtLfKtVSXlLuThU9pDKb6s40JQKvo16Lm0eV0qeUtxmi-YNpZbV3B0WclR4NRdBJcA8cVm-CS6zVHksvAqFmp4RAGqc3jJ2eh0plN6Rr4n-RQuj2a0FS8n5yFBF8IhldlTVF8gf6zBGTjJAJaCV3on45IYC7THr_3vHxbY9SDwNzTSjxYuymiY-BTugSgNDSWt1PEVSLZNCiIoR1baDsV94o12wBL0q6Ze2wSYEor6G-mvythzU_Palqtipcn3hugBwUdgMqgwtMj9YZQxy1Hc3Qky-0d2VV0jbhYNECFthJYZ4gjbAV_Km4QWKLFQTJq1N_ZjPpGa-i2NdZNrbZ_RqnNwWBEK_65WDDFstvluydG6d6HPwQcap0DUG22gZuMRC0QJhUFfDfBlk2e9PiR3r0UPrg4T95y0NyIGE3lOrmhbr7jBVC8"

base_url = "https://api.cloudflare.com/client/v4"

def hash_file(filepath):
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        h.update(f.read())
    return h.hexdigest()

def gather_files(dist_dir):
    files = {}
    for root, _, filenames in os.walk(dist_dir):
        for fname in filenames:
            if fname.endswith('.py') or fname == '.git':
                continue
            filepath = os.path.join(root, fname)
            rel_path = os.path.relpath(filepath, dist_dir).replace('\\', '/')
            if rel_path.startswith('.git/'):
                continue
            file_hash = hash_file(filepath)
            files[rel_path] = {
                'path': filepath,
                'hash': file_hash,
                'size': os.path.getsize(filepath)
            }
    return files

dist_dir = '.'
files = gather_files(dist_dir)
print(f"Found {len(files)} files to deploy")
for p, info in files.items():
    print(f"  {p} ({info['size']} bytes, hash={info['hash'][:16]}...)")

# Check missing
hashes = [f['hash'] for f in files.values()]
headers = {"Authorization": f"Bearer {token}"}
check_url = "https://api.cloudflare.com/client/v4/pages/assets/check-missing"
resp = requests.post(check_url, headers=headers, json={"hashes": hashes})
print(f"\nCheck missing: {resp.status_code}")
result = resp.json()
print(json.dumps(result, indent=2)[:800])

missing = result.get('result', hashes) if resp.status_code == 200 else hashes
print(f"\nMissing files to upload: {len(missing)}")

# Upload missing assets
upload_url = "https://api.cloudflare.com/client/v4/pages/assets/upload"
upload_batch = []
for rel_path, info in files.items():
    if info['hash'] not in missing:
        continue
    with open(info['path'], 'rb') as f:
        content = f.read()
    content_type = mimetypes.guess_type(rel_path)[0] or 'application/octet-stream'
    upload_batch.append({
        "key": info['hash'],
        "value": base64.b64encode(content).decode('utf-8'),
        "metadata": {"contentType": content_type},
        "base64": True
    })

batch_size = 100
for i in range(0, len(upload_batch), batch_size):
    batch = upload_batch[i:i+batch_size]
    resp = requests.post(upload_url, headers=headers, json=batch)
    print(f"Upload batch {i//batch_size + 1}/{ (len(upload_batch)+batch_size-1)//batch_size }: {resp.status_code}")
    if resp.status_code != 200:
        print(resp.text[:500])

# Create deployment
manifest = {rel_path: info['hash'] for rel_path, info in files.items()}
deploy_url = f"{base_url}/accounts/{account_id}/pages/projects/{project_name}/deployments"

resp = requests.post(deploy_url, headers=headers, json={
    "manifest": manifest,
    "commit_message": "Deploy via API"
})
print(f"\nDeploy: {resp.status_code}")
result = resp.json()
print(json.dumps(result, indent=2)[:1500])

if result.get('success'):
    deployment = result.get('result', {})
    print(f"\n✅ Deployment URL: {deployment.get('url')}")
    print(f"✅ Pages URL: https://zeta-portal.pages.dev")
