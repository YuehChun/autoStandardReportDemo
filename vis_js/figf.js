		var figF_data=[];
		var figF_comment_1=[];
		var figF_table=[];

		function comF1DataIsReady() {
			var content_com_f_1 ="<ul>"
			figF_comment_1.map(function(comm){
				content_com_f_1+='<li><p> 活動整體參加的人以 \
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> 的人次最多，約有\
					<span class="badge badge-pill fontCust badge-success">'+comm.b+'</span> 人，占整體的\
					<span class="badge badge-pill fontCust badge-warning">'+Math.round(comm.c*100)+'%</span>\
				</p></li>';

			});
			content_com_f_1+="</ul>";
			$("#fig_f_and_g #figF_comment_1").html(content_com_f_1);
		}
		function tableF1DataIsReady() {
			var sort_num_f=1;
			var content_table_f_1 ="";
			var tableFValLog=[];
			figF_table.map(function(t){
				if(t.otype!='其他'){
					tableFValLog.push({'otype' : t.otype, 'cnt' : t.cnt, 'percent' : Math.round(t.percent*100)});	
				}
			});
			tableFValLog.sort(function(a,b){
				return b.cnt-a.cnt
			});
			tableFValLog.map(function(t){
				content_table_f_1+='<tr>\
							<th scope="row">'+sort_num_f+'</th>\
							<td>'+t.otype+'</td>\
							<td>'+t.cnt+'</td>\
							<td>'+t.percent+'%</td>\
						</tr>';
				sort_num_f+=1;
			});
			$("#table_f_tbody").html(content_table_f_1);
		}
		var figFSinLog=[]
		var figFValLog=[]
		function figFDataIsReady() {
			figF_data.map(function(t){
				figFValLog.push({'otype' : t.otype, 'percent' : t.percent});

			});
			figFValLog.sort(function(a,b){
				return b.percent-a.percent
			});
			figFValLog.map(function(t){
				figFSinLog.push(t.otype)
			})
			CallDrawFigF(figFSinLog,figFValLog);
		}

		function CallDrawFigF(figFSinLog,figFValLog){
			var dataArrFigF=[]
			figFValLog.map(function(t){
				dataArrFigF.push(Math.round(t.percent*100));
			});
			var color = Chart.helpers.color;
			var configFigF = {
				type: 'pie',
				data: {
					datasets: [{
						data: dataArrFigF,
						backgroundColor: [
							color('#b35900').alpha(1).rgbString(),
							color('#b35900').alpha(0.5).rgbString(),
							color('#b35900').alpha(0.4).rgbString(),
							color('#b35900').alpha(0.3).rgbString(),
							color('#b35900').alpha(0.2).rgbString(),
							color('#b35900').alpha(0.1).rgbString(),
						],
						label: '停留時間'
					}],
					labels: figFSinLog
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
						text: '縣市居民統計比例',
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

			var ctx_figF = document.getElementById('canvas_figF').getContext('2d');
			new Chart(ctx_figF, configFigF);
		}

		d3.csv("./data/f_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': parseInt(d.b), 'c': parseFloat(d.c)}; 
	    }).get(function(error, rows) {
	    	figF_comment_1=rows
	    	comF1DataIsReady();
	    });

		d3.csv("./data/f_fig.csv", ).row(function(d) { 
		 	return {'otype': d.otype, 'percent': parseFloat(d.percent)}; 
	    }).get(function(error, rows) {
	    	figF_data=rows;
	    	figFDataIsReady();
	    });


		d3.csv("./data/f_table.csv", ).row(function(d) { 
		 	return {'otype': d.otype, 'percent': parseFloat(d.percent), 'cnt': parseInt(d.cnt)}; 
	    }).get(function(error, rows) {
	    	figF_table=rows
	    	tableF1DataIsReady();
	    });
