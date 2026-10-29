import pandas as pd, re
pd.set_option('display.width',250,'display.max_colwidth',70,'display.max_rows',200)
B=pd.read_csv('../data/lpg_businesses_clean.csv')
D=pd.read_csv('../data/dealers_xlsx_classified.csv')
def n(p):
    d=re.sub(r'\D','',str(p)) if pd.notna(p) else ''
    d=d[2:] if d.startswith('92') else d
    return d.lstrip('0')
b=set(B.phone_e164.map(n))-{''}; d=set(D.phone_n.astype(str))-{''}
print('clean businesses',len(B),'phones',len(b)); print('dealer xlsx unique',len(D),'phones',len(d)); print('overlap by phone',len(b&d),'| dealer-only',len(d-b),'| clean-only',len(b-d))
print('dealer-only by province',D[D.phone_n.astype(str).isin(d-b)].groupby('province').size().to_dict(), '| class',D[D.phone_n.astype(str).isin(d-b)]['class'].value_counts().to_dict())
print('\nKarachi localities (clean):'); print(B[B.city_clean=='Karachi'].locality.value_counts().head(12).to_dict())
print('Karachi: with phone',B[(B.city_clean=='Karachi')].phone_e164.notna().sum(),'rated>=4.0 & reviews>=5',((B.city_clean=='Karachi')&(B.rating>=4)&(B.reviews>=5)).sum())
# a partner is "listing-ready" if: phone + OPERATIONAL + rating or reviews present
ok=B[(B.status=='OPERATIONAL')&B.phone_e164.notna()]
print('\noperational with phone',len(ok)); c=ok.groupby('city_clean').size()
for t in (1,3,5,10): print(f' cities with >={t} phone-listed:',(c>=t).sum())
print(' cities with >=5:',c[c>=5].sort_values(ascending=False).to_dict())
print('\nroles',B.role.value_counts().to_dict())
# population-based city demand extrapolation
C=pd.read_csv('../data/cities_master.csv'); 
print('\npop by tier (M):',(C.groupby('pop_tier').pop_2023.sum()/1e6).round(1).to_dict(),'count',C.groupby('pop_tier').size().to_dict())
pg=pd.read_csv('../page-map.csv'); print(pg[['page_id','url','phase','pillar','primary_keyword','volume_floor']].to_string(index=False))

