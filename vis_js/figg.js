		var figG_data=[];
		var figG_comment_1=[];
		var figG_table=[];
		function comG1DataIsReady() {
			var content_com_g_1 ="<ul>"
			figG_comment_1.map(function(comm){
				content_com_g_1+= '<li><p>細看鄉鎮區，最多到訪的人次為 \
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> ，到訪人數約有\
					<span class="badge badge-pill fontCust badge-success">'+comm.b+'</span> 人，約占\
					<span class="badge badge-pill fontCust badge-primary">'+comm.c+'</span> 的到訪人數中的\
					<span class="badge badge-pill fontCust badge-warning">'+Math.round(comm.d*100)+'%</span>\
				</p></li>';

			});
			content_com_g_1+="</ul>";
			$("#fig_f_and_g #figG_comment_1").html(content_com_g_1);
		}
		var figGSinLog=[]
		var figGValLog=[]
		function figGDataIsReady() {
			figG_data.map(function(t){
				figGValLog.push({'otype' : t.otype, 'percent' : t.percent});

			});
			figGValLog.sort(function(a,b){
				return b.percent-a.percent
			});
			figGValLog.map(function(t){
				figGSinLog.push(t.otype)
			})
			CallDrawFigG(figGSinLog,figGValLog);
		}

		function tableG1DataIsReady() {
			var sort_num=1;
			var content_table_g_1 ="";
			var tableGValLog=[];
			figG_table.map(function(t){
				if(t.otype!='其他'){
					tableGValLog.push({'otype' : t.otype, 'cnt' : t.cnt, 'percent' : Math.round(t.percent*100)});	
				}
			});
			tableGValLog.sort(function(a,b){
				return b.cnt-a.cnt
			});
			tableGValLog.map(function(t){
				if(sort_num<=5){
					content_table_g_1+='<tr>\
								<th scope="row">'+sort_num+'</th>\
								<td>'+t.otype+'</td>\
								<td>'+t.cnt+'</td>\
								<td>'+t.percent+'%</td>\
							</tr>';
				}
				sort_num+=1;
			});
			$("#table_g_tbody").html(content_table_g_1);
		}
		function CallDrawFigG(figGSinLog,figGValLog){
			var dataArrFigG=[]
			figGValLog.map(function(t){
				dataArrFigG.push(Math.round(t.percent*100));
			});
			var color = Chart.helpers.color;
			var configFigG = {
				type: 'pie',
				data: {
					datasets: [{
						data: dataArrFigG,
						backgroundColor: [
							color('#008000').alpha(1).rgbString(),
							color('#008000').alpha(0.5).rgbString(),
							color('#008000').alpha(0.42).rgbString(),
							color('#008000').alpha(0.34).rgbString(),
							color('#008000').alpha(0.26).rgbString(),
							color('#008000').alpha(0.18).rgbString(),
							color('#008000').alpha(0.12).rgbString(),
							color('#008000').alpha(0.07).rgbString(),
							color('#008000').alpha(0.01).rgbString(),
						],
						label: '停留時間'
					}],
					labels: figGSinLog
				},
				options: {
					responsive: true,
					legend: {
						position: 'bottom',
						labels: {
							fontSize: 18
						}
					},
					title: {
						display: true,
						text: '當地鄉鎮區居民統計比例',
						fontSize: 24
					},
					tooltips: {
						bodyFontSize: 18
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
				}
			};

			var ctx_figG = document.getElementById('canvas_figG').getContext('2d');
			new Chart(ctx_figG, configFigG);
		}

		d3.csv("./data/g_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': parseInt(d.b),'c': d.c, 'd': parseFloat(d.d)}; 
	    }).get(function(error, rows) {
	    	figG_comment_1=rows
	    	comG1DataIsReady();
	    });

		d3.csv("./data/g_fig.csv", ).row(function(d) { 
		 	return {'otype': d.otype, 'percent': parseFloat(d.percent)}; 
	    }).get(function(error, rows) {
	    	figG_data=rows;
	    	figGDataIsReady();
	    });


		d3.csv("./data/g_table.csv", ).row(function(d) { 
		 	return {'otype': d.otype, 'percent': parseFloat(d.percent), 'cnt': parseInt(d.cnt)}; 
	    }).get(function(error, rows) {
	    	figG_table=rows
	    	tableG1DataIsReady();
	    });
