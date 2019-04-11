
set timer_act_day=20190217;
set timer_start_ftime=13;
set timer_start_min=0;
set timer_end_ftime=17;
set timer_end_min=0;

set timer_start_time_log=concat(${hiveconf:timer_act_day},lpad((${hiveconf:timer_start_ftime}-1),2,'0'));
set timer_end_time_log=concat(${hiveconf:timer_act_day},lpad(${hiveconf:timer_end_ftime},2,'0'));
set timer_act_start_sin=${hiveconf:timer_start_ftime}*60+${hiveconf:timer_start_min}-30;
set timer_act_end_sin=${hiveconf:timer_end_ftime}*60+${hiveconf:timer_end_min}+30;

set act_name='w_test';
set act_x='120.2958255';
set act_y='23.1247078';
set act_county='台南市';
set act_town='善化區';
set act_village='坐駕里';
set act_in_range=300;

--- get data 

-- fig 1 
select 'fig1' as sin,sinLog,time_a,cnt from ans1.yct_auto_cc_result_log_point  where sintype=${hiveconf:act_name} and sinLog<>'other';

--- fig 1 comment
---  a族群在b時候人潮達到最高峰，現場當下約有c人
select a.sinLog as a,a.time_a as b,a.cnt as c,a.sintype from 
(select sinLog,sintype,time_a,cnt,row_number() over(partition by sinLog,sintype order by cnt desc) as sorted_num from ans1.yct_auto_cc_result_log_point  where sintype=${hiveconf:act_name} and sinLog<>'other')a
where a.sorted_num=1;

---  在A時候，活動人潮達到最高峰，現場當下約有B人
select b.time_a as a,a.max_cnt as b,a.sintype from (
	select sintype,max(cnt) as max_cnt from (
		select sintype,time_a,sum(cnt) as cnt from ans1.yct_auto_cc_result_log_point  where sintype=${hiveconf:act_name}  and sinLog<>'other' group by time_a,sintype
	)a group by sintype
)a join (
	select time_a,sintype,sum(cnt) as cnt from ans1.yct_auto_cc_result_log_point where sintype=${hiveconf:act_name}  and sinLog<>'other' group by time_a,sintype
)b on a.sintype=b.sintype
where a.max_cnt=b.cnt;


-- fig2 
select 'fig2' as sin,sinLog,percent,sintype from ans1.yct_auto_cc_result_pie_percent where sintype=${hiveconf:act_name};
-- fig2  comment
--  停留時間區間以A族群的人占比最高為B，其次為C族群，其占比為D，前兩者差異為E
select a.sinLog as a,cast(a.percent*100 as int) as b,b.sinLog as c,cast(b.percent*100 as int)  as d,(cast(a.percent*100 as int)-cast(b.percent*100 as int)) as e from  
(select sintype,sinLog,percent,row_number() over(partition by sintype order by percent desc) as sorted_num from  ans1.yct_auto_cc_result_pie_percent  where sintype=${hiveconf:act_name})a
join 
(select sintype,sinLog,percent,row_number() over(partition by sintype order by percent desc) as sorted_num from  ans1.yct_auto_cc_result_pie_percent  where sintype=${hiveconf:act_name})b
on a.sintype=b.sintype
where a.sorted_num=1 and b.sorted_num=2;



--fig 3
select 'fig3' as sin,sinLog,cnt,avg_time,sintype from ans1.yct_auto_cc_result_num_avgtime where sintype=${hiveconf:act_name};
--fig 3 comment
--  活動期間A族群約有B人，其平均停留時間為C分鐘，停留10分鐘以上的共有d人，總平均停留時間為E分鐘

select a.sinLog as a,a.cnt as b,a.avg_time as c,b.totalnum as d,b.total_avg_time as e from (
	select sintype,sinLog,cnt,avg_time,row_number() over(partition by sintype order by cnt desc) as sorted_num from ans1.yct_auto_cc_result_num_avgtime a 
	where  sintype=${hiveconf:act_name}
)a join (
	select sintype,sum(cnt) as totalnum,round(sum(avg_time*cnt)/sum(cnt)) as total_avg_time from ans1.yct_auto_cc_result_num_avgtime a 
	where sinLog<>'停留5-10分鐘' and sinLog<>'停留5分鐘以下' and sintype=${hiveconf:act_name}
	group by sintype
)b on a.sintype=b.sintype
where a.sorted_num=1;

-- fig 4 
select  'fig4' as sin,time_a,county,cnt,sintype from ans1.yct_auto_cc_result_county_log where  sintype=${hiveconf:act_name};

-- fig 4 comment 
-- 當地A的人次為多，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約有F倍
			select a.county as a,a.time_a as b,a.cnt as c,b.time_a as d,b.cnt as e,(cast((a.cnt/b.cnt)*10 as int)/10) as f from (
				select a.sintype,a.county,a.time_a,a.cnt from (
					select a.sintype,a.county,a.time_a,a.cnt,row_number() over(partition by a.sintype,a.county order by a.cnt desc) as sorted_num from ans1.yct_auto_cc_result_county_log a join (
						select a.sintype,a.county,a.sorted_num from (
							select sintype,county,row_number() over(partition by sintype order by a.cnt desc) as sorted_num from 
							(select sintype,county,sum(cnt) as cnt from ans1.yct_auto_cc_local_num where sintype=${hiveconf:act_name} group by sintype,county)a
						)a where a.sorted_num=1 
					)b on a.sintype=b.sintype and a.county=b.county
				)a where a.sorted_num=1
			)a join (
				select a.sintype,a.county,a.time_a,a.cnt from (
					select a.sintype,a.county,a.time_a,a.cnt,row_number() over(partition by a.sintype,a.county order by a.cnt ASC) as sorted_num from ans1.yct_auto_cc_result_county_log a join (
						select a.sintype,a.county,a.sorted_num from (
							select sintype,county,row_number() over(partition by sintype order by a.cnt desc) as sorted_num from 
							(select sintype,county,sum(cnt) as cnt from ans1.yct_auto_cc_local_num where sintype=${hiveconf:act_name} group by sintype,county)a
						)a where a.sorted_num=1 
					)b on a.sintype=b.sintype and a.county=b.county
				)a where a.sorted_num=1
			)b on a.sintype=b.sintype and a.county=b.county;

			
		
-- fig 5 
select  'fig5' as sin,time_a,town,cnt,sintype from ans1.yct_auto_cc_result_town_log where  sintype=${hiveconf:act_name}

-- fig 5 comment 
-- 整體A的居民人次為多，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約增加F人
-- 其次為A的居民，且以B時當下現場人數達到最高約有C的人，相較於活動最低點D時的人數E，約增加F人

	select a.town as a,a.time_a as b,a.cnt as c,b.time_a as d,b.cnt as e,(a.cnt-b.cnt) as f from (
				select a.sintype,a.county,a.town,a.time_a,a.cnt from (
					select a.sintype,a.county,a.town,a.time_a,a.cnt,row_number() over(partition by a.sintype,a.county,a.town order by a.cnt desc) as sorted_num from ans1.yct_auto_cc_result_town_log a join (
						select a.sintype,a.county,a.town,a.sorted_num from (
							select sintype,county,town,row_number() over(partition by sintype order by a.cnt desc) as sorted_num from 
							(select sintype,county,town,sum(cnt) as cnt from ans1.yct_auto_cc_local_num where sintype=${hiveconf:act_name} group by sintype,county,town)a
						)a where a.sorted_num<3
					)b on a.sintype=b.sintype and a.county=b.county and a.town=b.town
				)a where a.sorted_num=1
			)a join (
				select a.sintype,a.county,a.town,a.time_a,a.cnt from (
					select a.sintype,a.county,a.town,a.time_a,a.cnt,row_number() over(partition by a.sintype,a.county,a.town order by a.cnt ASC) as sorted_num from ans1.yct_auto_cc_result_town_log a join (
						select a.sintype,a.county,a.town,a.sorted_num from (
							select sintype,county,town,row_number() over(partition by sintype order by a.cnt desc) as sorted_num from 
							(select sintype,county,town,sum(cnt) as cnt from ans1.yct_auto_cc_local_num where sintype=${hiveconf:act_name} group by sintype,county,town)a
						)a where a.sorted_num<3
					)b on a.sintype=b.sintype and a.county=b.county and a.town=b.town
				)a where a.sorted_num=1
			)b on a.sintype=b.sintype and a.county=b.county and a.town=b.town;	
			
			
-- fig 6
select  'fig6' as sin,a.otype,(a.cnt/b.sum_num) as percent,a.sintype from ans1.yct_auto_cc_aggre_county_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_county_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;


-- fig 6 and table 1 
select  a.otype,(a.cnt/b.sum_num) as percent,a.cnt,a.sintype from ans1.yct_auto_cc_aggre_county_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_county_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name};



		


-- fig 7
select  'fig7' as sin,a.otype,(sum(a.cnt)/b.sum_num) as percent,a.sintype from ans1.yct_auto_cc_aggre_town_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_town_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;


-- fig 7 and table 1 
select  a.otype,(sum(a.cnt)/b.sum_num) as percent,sum(a.cnt) as cnt ,a.sintype from ans1.yct_auto_cc_aggre_town_num a
join (select sintype,sum(cnt) as sum_num from  ans1.yct_auto_cc_aggre_town_num where  sintype=${hiveconf:act_name} group by sintype)b on a.sintype=b.sintype
where  a.sintype=${hiveconf:act_name}
group by a.otype,a.sintype,b.sum_num;


-- fig 6 & 7 comment 
--- 活動整體參加的人以A的人次最多，約有B人，占整體的C%
select b.otype as a,b.cnt as b,(b.cnt/a.sum_num) as c,a.sintype from 
(select a.sintype,sum(a.cnt) as sum_num from ans1.yct_auto_cc_aggre_county_num a where a.sintype=${hiveconf:act_name} group by a.sintype)a join 
(select sintype,otype,cnt,row_number() over(partition by sintype order by cnt desc) as sorted_num from  ans1.yct_auto_cc_aggre_county_num where  sintype=${hiveconf:act_name})b
on a.sintype=b.sintype
where b.sorted_num=1;

--- 細看鄉鎮區，最多到訪的人次為A，到訪人數約有B人，約占C的到訪人數中的D%
select b.otype as a,b.cnt as b,a.county as c,(b.cnt/a.sum_num) as d,a.sintype from 
(select a.sintype,a.county,sum(a.cnt) as sum_num from ans1.yct_auto_cc_aggre_town_num a where a.sintype=${hiveconf:act_name} group by a.sintype,a.county)a join 
(select sintype,county,otype,cnt,row_number() over(partition by sintype,county order by cnt desc) as sorted_num from  ans1.yct_auto_cc_aggre_town_num where  sintype=${hiveconf:act_name})b
on a.sintype=b.sintype and a.county=b.county
where b.sorted_num=1
group by b.otype;






-- fig 8
select 'fig8' as sin,a.time_a,a.age_type,a.cnt,a.sintype from ans1.yct_auto_cc_age_log_point a where a.sintype=${hiveconf:act_name};

-- fig 8 commnet
-- 活動期間增減差異最多的群族為A，現場人數最多的時間點在C，而最少的時間點在D
select a.age_type as a,b.time_a as b,c.time_a as c,a.sintype from 
(
	select a.sintype,a.age_type,row_number() over(partition by a.sintype order by (a.ma-a.mi) desc) as sorted_num from 
	(select a.sintype,a.age_type,max(cnt) as ma,min(cnt) as mi from ans1.yct_auto_cc_age_log_point a where a.sintype=${hiveconf:act_name} group by a.sintype,a.age_type)a
)a join (
	select a.time_a,a.age_type,a.sintype,a.cnt,row_number() over(partition by a.sintype,a.age_type order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_log_point a 
	where a.sintype=${hiveconf:act_name}
)b on a.sintype=b.sintype and a.age_type=b.age_type join (
	select a.time_a,a.age_type,a.sintype,a.cnt,row_number() over(partition by a.sintype,a.age_type order by cnt asc) as sorted_num  from ans1.yct_auto_cc_age_log_point a 
	where a.sintype=${hiveconf:act_name}
)c on a.sintype=c.sintype and a.age_type=c.age_type
where a.sorted_num=1 and b.sorted_num=1 and c.sorted_num=1;


-- 活動期間增減最少的群族為A，現場人數最多的時間點在C，而最少的時間點在D
select a.age_type as a,b.time_a as b,c.time_a as c,a.sintype from 
(
	select a.sintype,a.age_type,row_number() over(partition by a.sintype order by (a.ma-a.mi) ASC) as sorted_num from 
	(select a.sintype,a.age_type,max(cnt) as ma,min(cnt) as mi from ans1.yct_auto_cc_age_log_point a where a.sintype=${hiveconf:act_name} group by a.sintype,a.age_type)a
)a join (
	select a.time_a,a.age_type,a.sintype,a.cnt,row_number() over(partition by a.sintype,a.age_type order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_log_point a 
	where a.sintype=${hiveconf:act_name}
)b on a.sintype=b.sintype and a.age_type=b.age_type join (
	select a.time_a,a.age_type,a.sintype,a.cnt,row_number() over(partition by a.sintype,a.age_type order by cnt asc) as sorted_num  from ans1.yct_auto_cc_age_log_point a 
	where a.sintype=${hiveconf:act_name}
)c on a.sintype=c.sintype and a.age_type=c.age_type
where a.sorted_num=1 and b.sorted_num=1 and c.sorted_num=1;

-- fig 9
select 'fig9' as sin,a.age_type,a.percent,a.avg_stay,a.sintype from ans1.yct_auto_cc_age_stay_percent a where a.sintype=${hiveconf:act_name};

		
-- fig 9 commnet
--  占比最高的年齡族群為A，最低的年齡族群為B，相差C%
select a.age_type as a,b.age_type as b,(a.percent-b.percent) as c,a.sintype from (
	select age_type,percent,avg_stay,sintype,row_number() over(partition by sintype order by percent desc) as sorted_num from ans1.yct_auto_cc_age_stay_percent where sintype=${hiveconf:act_name}
)a join (
	select age_type,percent,avg_stay,sintype,row_number() over(partition by sintype order by percent asc) as sorted_num from ans1.yct_auto_cc_age_stay_percent where sintype=${hiveconf:act_name}
)b on a.sintype=b.sintype
where a.sorted_num=1 and b.sorted_num=1;


--  平均停留時間最久的年齡族群為A，最短的年齡族群為B，相差C分鐘
select a.age_type as a,b.age_type as b,(a.avg_stay-b.avg_stay) as c,a.sintype from (
	select age_type,percent,avg_stay,sintype,row_number() over(partition by sintype order by avg_stay desc) as sorted_num from ans1.yct_auto_cc_age_stay_percent where sintype=${hiveconf:act_name}
)a join (
	select age_type,percent,avg_stay,sintype,row_number() over(partition by sintype order by avg_stay asc) as sorted_num from ans1.yct_auto_cc_age_stay_percent where sintype=${hiveconf:act_name}
)b on a.sintype=b.sintype
where a.sorted_num=1 and b.sorted_num=1
			
			

-- fig 10
select 'fig10' as sin,a.county,a.avg_age,a.cnt,a.sintype from ans1.yct_auto_cc_age_avg_county a where a.sintype=${hiveconf:act_name} order by cnt desc;

-- fig 10 commnet
-- 人潮最多的縣市為A，其平均年齡為B，次者C地區的平均年齡為D
select a.county as a,a.avg_age as b,b.county as c,b.avg_age as d from (
	select a.county,a.avg_age,a.cnt,a.sintype,row_number() over(partition by sintype order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_avg_county a where a.sintype=${hiveconf:act_name} 
)a join (
	select a.county,a.avg_age,a.cnt,a.sintype,row_number() over(partition by sintype order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_avg_county a where a.sintype=${hiveconf:act_name} 
)b on a.sintype=b.sintype
where a.sorted_num=1 and b.sorted_num=2;



-- fig 11
select 'fig11' as sin,a.town,a.avg_age,a.cnt,a.sintype from ans1.yct_auto_cc_age_avg_town a where a.sintype=${hiveconf:act_name} order by cnt desc;
			
-- fig 11 commnet
-- 細看鄉鎮區，人潮最多的鄉鎮區為A，其平均年齡為B，次者C地區的平均年齡為D
select a.town as a,a.avg_age as b,b.town as c,b.avg_age as d from (
	select a.town,a.avg_age,a.cnt,a.sintype,row_number() over(partition by sintype,county order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_avg_town a where a.sintype=${hiveconf:act_name} 
)a join (
	select a.town,a.avg_age,a.cnt,a.sintype,row_number() over(partition by sintype,county order by cnt desc) as sorted_num  from ans1.yct_auto_cc_age_avg_town a where a.sintype=${hiveconf:act_name} 
)b on a.sintype=b.sintype
where a.sorted_num=1 and b.sorted_num=2;