
--- fig a 
select 'fig1' as sin,sinLog,time_a,cnt from ans1.yct_auto_cc_result_log_point  where sintype=${hiveconf:act_name} and sinLog<>'other';

--- fig a comment 1 : a族群在b時候人潮達到最高峰，現場當下約有c人
--- fig a comment 2 : 在A時候，活動人潮達到最高峰，現場當下約有B人

--- fig b  
select 'fig2' as sin,sinLog,percent,sintype from ans1.yct_auto_cc_result_pie_percent where sintype=${hiveconf:act_name};
--- fig b comment 1 : 停留時間區間以A族群的人占比最高為B，其次為C族群，其占比為D，前兩者差異為E

--- fig c
select 'fig3' as sin,sinLog,cnt,avg_time,sintype from ans1.yct_auto_cc_result_num_avgtime where sintype=${hiveconf:act_name};
--- fig c comment 1 : 活動期間A族群約有B人，其平均停留時間為C分鐘，停留10分鐘以上的共有d人，總平均停留時間為E分鐘

--- fig d
select  'fig4' as sin,time_a,county,cnt,sintype from ans1.yct_auto_cc_result_county_log where  sintype=${hiveconf:act_name};

--- fig d comment 1 : 當地A的人次為多，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約有F倍
	
--- fig e 
select  'fig5' as sin,time_a,town,cnt,sintype from ans1.yct_auto_cc_result_town_log where  sintype=${hiveconf:act_name}

--- fig e comment 1 : 整體A的居民人次為多，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約增加F人
--- fig e comment 2 : 其次為A的居民，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約增加F人
	
--- fig f
select  'fig6' as sin,a.otype,(a.cnt/b.sum_num) as percent,a.sintype from ans1.yct_auto_cc_aggre_county_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_county_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;

--- fig f table :
select  a.otype,(a.cnt/b.sum_num) as percent,a.cnt,a.sintype from ans1.yct_auto_cc_aggre_county_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_county_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name};

--- fig f comment 1 : 活動整體參加的人以A的人次最多，約有B人，占整體的C%

--- fig g
select  'fig7' as sin,a.otype,(sum(a.cnt)/b.sum_num) as percent,a.sintype from ans1.yct_auto_cc_aggre_town_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_town_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;


--- fig g table :
select  a.otype,(sum(a.cnt)/b.sum_num) as percent,sum(a.cnt) as cnt ,a.sintype from ans1.yct_auto_cc_aggre_town_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_town_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;

--- fig g comment 1 : 細看鄉鎮區，最多到訪的人次為A，到訪人數約有B人，約占C的到訪人數中的D%

--- fig h
select 'fig8' as sin,a.time_a as time_a,a.age_type as age_type,a.cnt as cnt,a.sintype from ans1.yct_auto_cc_age_log_point a where a.sintype=${hiveconf:act_name};
--- fig h comment 1 : 活動期間增減差異最多的群族為A，現場人數最多的時間點在B，而最少的時間點在C
--- fig h comment 2 : 活動期間增減最少的群族為A，現場人數最多的時間點在B，而最少的時間點在C

--- fig i
select 'fig9' as sin,a.age_type as age_type,a.percent as percent,a.avg_stay as avg_stay,a.sintype from ans1.yct_auto_cc_age_stay_percent a where a.sintype=${hiveconf:act_name};

		
--- fig i commnet 1 : 占比最高的年齡族群為A，最低的年齡族群為B，相差C%
--- fig i commnet 2 : 平均停留時間最久的年齡族群為A，最短的年齡族群為B，相差C分鐘


--- fig j
select 'fig10' as sin,a.county,a.avg_age,a.cnt,a.sintype from ans1.yct_auto_cc_age_avg_county a where a.sintype=${hiveconf:act_name} order by cnt desc;

--- fig j commnet 1 : 人潮最多的縣市為A，其平均年齡為B，次者C地區的平均年齡為D

--- fig k
select 'fig11' as sin,a.town,a.avg_age,a.cnt,a.sintype from ans1.yct_auto_cc_age_avg_town a where a.sintype=${hiveconf:act_name} order by cnt desc;
			
--- fig k commnet 1 : 細看鄉鎮區，人潮最多的鄉鎮區為A，其平均年齡為B，次者C地區的平均年齡為D
