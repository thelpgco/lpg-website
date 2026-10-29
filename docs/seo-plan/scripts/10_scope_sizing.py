import pandas as pd, re
K=pd.read_csv('../keyword-master.csv'); K['volume']=K.volume.fillna(0)
K=K[K.disposition!='EXCLUDE']
def grp(name,pat):
    m=K[K.keyword.str.contains(pat,case=False,regex=True)]
    vol=m[m.volume>0]
    floor=vol.drop_duplicates('volume').volume.sum()
    print(f"{name:34s} kw={len(m):4d} withvol={len(vol):3d} floor={int(floor):6d} ceil={int(vol.volume.sum()):6d} | "+'; '.join(f"{r.keyword} {int(r.volume)}" for r in vol.sort_values('volume',ascending=False).head(4).itertuples()))
G={
'composite/fibre/fiber cylinder':r'composite|fib(er|re)',
'regulator/hose/valve/pipe':r'regulator|hose|valve|gas pipe|connector',
'stove/burner/chulha/oven/tandoor':r'stove|burner|chulh|oven|tandoor|cooker|hob',
'geyser/heater':r'geyser|heater|heating',
'vaporizer':r'vaporiz|vaporis',
'tank/storage/bulk/bowser':r'\btank|storage|bulk|bowser|bobtail|tanker',
'pipeline/installation/piping':r'pipeline|piping|installation|install',
'leak/detector/alarm':r'leak|detector|alarm',
'filling plant/bottling/plant':r'filling plant|bottling|\bplant\b',
'auto lpg/kit/conversion':r'auto ?lpg|\bkit\b|conversion|autogas|car\b',
'dealer/distributor/agency/marketing':r'dealer|distribut|agency|agent|marketing compan|licen[cs]e|franchise|wholesale',
'industrial/commercial/restaurant/hotel':r'industrial|commercial|restaurant|hotel|factory|boiler|furnace|bakery|catering|hospital',
'new connection/refill/exchange':r'new connection|refill|exchange|connection',
'delivery/order/home':r'delivery|order|online|home service|doorstep',
'urdu/roman (ka|ki|kimat|qeemat|rate)':r'\bka\b|\bki\b|\bke\b|kimat|qeemat|qimat|\bmein\b|\bme\b|\bwala',
'urdu script':r'[\u0600-\u06FF]',
'near me/shop/store/station':r'near me|shop|store|station|point',
'12 kg/11.8/15/45/5 kg':r'\b(5|6|10|11\.8|12|13|15|22|30|45|45\.4) ?kg',
'sui gas / natural gas / cng':r'sui|natural gas|\bcng\b|sngpl|ssgc',
'safety':r'safe|danger|blast|explos|fire|smell',
}
for n,p in G.items(): grp(n,p)
# cities
L=pd.read_csv('../data/location-master.csv')
rows=[]
for r in L.itertuples():
    nm=re.sub(r'\s*\(.*\)','',r.city).strip()
    pat=r'\b'+re.escape(nm.lower())+r'\b'
    m=K[(K.keyword.str.lower().str.contains(pat,regex=True))&(K.volume>0)]
    rows.append((r.city,r.province,int(r.businesses),int(m.drop_duplicates('volume').volume.sum()),int(m.volume.sum()),len(m),'; '.join(f"{x.keyword} {int(x.volume)}" for x in m.sort_values('volume',ascending=False).head(3).itertuples())))
D=pd.DataFrame(rows,columns=['city','province','businesses','kw_floor','kw_ceil','n_kw','top'])
D.to_csv('../data/city_keyword_demand.csv',index=False)
print('\ncities with any kw volume:',(D.kw_floor>0).sum(),'of',len(D))
print(D[D.kw_floor>0].sort_values('kw_floor',ascending=False).head(30).to_string(index=False))
print('\nDemand but 0 clean listings:',D[(D.kw_floor>0)&(D.businesses==0)].city.tolist())
