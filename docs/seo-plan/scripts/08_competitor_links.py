import urllib.request, re, ssl, json, collections as C
ctx=ssl.create_default_context()
UA={"User-Agent":"Mozilla/5.0 (compatible; TheLPGCo-research/1.0; +https://thelpgco.pk)"}
def get(u,t=20):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=t,context=ctx)
        return r.status, r.read(3_000_000).decode('utf-8','ignore')
    except Exception as e:
        return str(e)[:80], ''
# cylin full structure
st,x=get("https://cylin.com.pk/sitemap.xml")
locs=[l for l in re.findall(r'<loc>\s*([^<\s]+)\s*</loc>',x) if '/ur' not in l.replace('https://cylin.com.pk','')[:4]]
print('cylin EN urls',len(locs))
seg=C.defaultdict(list)
for u in locs:
    p=u.replace('https://cylin.com.pk','').strip('/').split('/')
    seg[p[0] or '(home)'].append('/'.join(p))
for k,v in seg.items(): print(' ',k,len(v),v[:12])
# gasonline / noor / bostan / paklpg: homepage internal links
for s in ["https://gasonline.pk","https://noorlpg.com","https://bostanlpg.com","https://paklpg.com","https://friends-gas.pk","https://www.flamora.pk"]:
    st,h=get(s+"/")
    host=re.sub(r'https?://(www\.)?','',s)
    links=set(re.findall(r'href=["\'](https?://(?:www\.)?'+re.escape(host)+r'[^"\'#?]*|/[^"\'#?]*)["\']',h))
    links={ (l if l.startswith('http') else s+l) for l in links}
    links={l for l in links if not re.search(r'\.(css|js|png|jpg|jpeg|svg|webp|ico|woff2?|xml|pdf)$',l) and 'wp-' not in l and '/feed' not in l}
    print('\n',s,len(links)); [print('   ',l) for l in sorted(links)[:45]]
