import urllib.request, re, ssl, json, collections as C
sites=["https://www.flamora.pk","https://gasonline.pk","https://noorlpg.com","https://ppgl.com.pk","https://friends-gas.pk","https://bostanlpg.com","https://cylin.com.pk","https://paklpg.com"]
ctx=ssl.create_default_context()
UA={"User-Agent":"Mozilla/5.0 (compatible; TheLPGCo-research/1.0; +https://thelpgco.pk)"}
def get(u,t=15):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=t,context=ctx)
        return r.status, r.read(3_000_000).decode('utf-8','ignore')
    except Exception as e:
        return str(e)[:80], ''
out={}
for s in sites:
    d={}
    st,rb=get(s+"/robots.txt")
    d['robots_status']=st
    sm=re.findall(r'(?i)sitemap:\s*(\S+)',rb)
    d['robots_disallow']=re.findall(r'(?im)^disallow:\s*(\S+)',rb)[:8]
    d['robots_crawl_delay']=re.findall(r'(?im)^crawl-delay:\s*(\S+)',rb)[:1]
    cands=sm or [s+"/sitemap.xml",s+"/sitemap_index.xml",s+"/wp-sitemap.xml"]
    urls=[]; seen=set()
    q=list(cands)
    while q and len(seen)<12:
        u=q.pop(0)
        if u in seen: continue
        seen.add(u)
        st,x=get(u)
        if not x or '<' not in x: continue
        locs=re.findall(r'<loc>\s*([^<\s]+)\s*</loc>',x)
        subs=[l for l in locs if l.endswith('.xml')]
        q+=subs
        urls+=[l for l in locs if not l.endswith('.xml')]
    urls=list(dict.fromkeys(urls))
    d['sitemaps_tried']=len(seen); d['urls']=len(urls)
    seg=C.Counter()
    for u in urls:
        p=re.sub(r'https?://[^/]+','',u).strip('/').split('/')
        seg[p[0] if p and p[0] else '(home)']+=1
    d['top_segments']=seg.most_common(8)
    d['sample']=urls[:6]
    st,h=get(s+"/")
    d['home_status']=st; d['home_bytes']=len(h)
    t=re.search(r'(?is)<title[^>]*>(.*?)</title>',h); d['title']=(t.group(1).strip()[:110] if t else None)
    d['js_rendered_hint']=('__next' in h or 'id="root"' in h or 'ng-version' in h)
    d['wordpress']=('wp-content' in h)
    d['has_ld_json']=('application/ld+json' in h)
    out[s]=d
json.dump(out,open('competitor_recon.json','w'),indent=1)
for s,d in out.items():
    print(s); [print('  ',k,':',v) for k,v in d.items()]
