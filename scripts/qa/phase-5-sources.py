"""Read the guide registry and verify public primary-source URLs without credentials."""
import concurrent.futures
import datetime
import json
import subprocess
import urllib.request
from pathlib import Path

code = "import {guides} from './src/content/guides/index.ts'; console.log(JSON.stringify(guides.map(g=>({slug:g.slug,sources:g.sources}))));"
guides = json.loads(subprocess.check_output(['node', '--import', 'tsx', '--input-type=module', '-e', code], text=True))
urls = sorted({s['url'] for g in guides for s in g['sources']})
def check(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'TruePay-source-verification/1.0'}), timeout=30) as response:
            body = response.read()
            return {'url': url, 'status': response.status, 'finalUrl': response.url, 'bytes': len(body), 'contentType': response.headers.get('content-type'), 'loads': response.status == 200 and len(body) > 100}
    except Exception as error:
        return {'url': url, 'loads': False, 'error': str(error)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, urls))
lookup = {r['url']: r for r in results}
counts = [{'path': '/resources/' + g['slug'] + '/', 'verifiedLoadingPrimarySources': sum(lookup[s['url']]['loads'] for s in g['sources'])} for g in guides]
report = {'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'checks': results, 'guides': counts, 'note': 'All sources were also read for relevance through web retrieval. Only successful HTTP 200 responses with nonempty content count toward the two-link minimum.'}
Path('docs/qa/phase-5/source-checks.json').write_text(json.dumps(report, indent=2) + '\n')
for count in counts:
    print(count['path'], count['verifiedLoadingPrimarySources'], 'loading primary sources')
assert all(c['verifiedLoadingPrimarySources'] >= 2 for c in counts), 'A guide lacks two loading primary sources'
