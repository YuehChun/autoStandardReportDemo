		var figI_data=[];
		var figI_comment_1=[];
		var figI_comment_2=[];


		function comI1DataIsReady() {
			var content_com_i_1 ="<ul>"
			figI_comment_1.map(function(comm){
				content_com_i_1+= '<li><p>占比最高的年齡族群為\
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> ，最低的年齡族群為\
					<span class="badge badge-pill fontCust badge-primary">'+comm.b+'</span> 兩者占比相差\
					<span class="badge badge-pill fontCust badge-warning">'+Math.round(comm.c*100)+'%</span> \
				</p></li>';
			})
			content_com_i_1+="</ul>";
			$("#fig_h_and_i #figI_comment_1").html(content_com_i_1);
		}

		function comI2DataIsReady() {
			var content_com_i_2 ="<ul>"
			figI_comment_2.map(function(comm){
				content_com_i_2+= '<li><p>平均停留時間最久的年齡族群為\
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> ，最短的年齡族群為\
					<span class="badge badge-pill fontCust badge-primary">'+comm.b+'</span> ，相差\
					<span class="badge badge-pill fontCust badge-secondary">'+Math.round(comm.c)+'</span> 分鐘\
				</p></li>';
			})
			content_com_i_2+="</ul>";
			$("#fig_h_and_i #figI_comment_2").html(content_com_i_2);
		}

		function figIDataIsReady() {
			var figISinLog=[]
			var figIBarVal=[]
			var figILineVal=[]



			figI_data.map(function(i){
				if (i.age_type=='20-29歲'){
					reName='a#'+i.age_type
				}else if(i.age_type=='30-39歲'){
					reName='b#'+i.age_type
				}else if(i.age_type=='40-49歲'){
					reName='c#'+i.age_type
				}else if(i.age_type=='50-59歲'){
					reName='d#'+i.age_type
				}else if(i.age_type=='60歲以上'){
					reName='e#'+i.age_type
				}else{
					reName="error_age_type"
				}
				if(reName!="error_age_type"){
					if(figISinLog.indexOf(reName)==-1){
						figISinLog.push(reName);
					}
				}

				if(!(reName in figIBarVal) && figISinLog.indexOf(reName)>-1){
					figIBarVal[reName]=Math.round(i.percent*100)
				}
				if(!(reName in figILineVal)  && figISinLog.indexOf(reName)>-1){
					figILineVal[reName]=i.avg_stay
				}
			});

			figISinLog.sort();
			CallDrawFigI(figISinLog,figIBarVal,figILineVal);
		}

		function CallDrawFigI(figISinLog,figIBarVal,figILineVal){
			var BarArrFigI=[]
			var LineArrFigI=[]
			var sinLogArrFigI = []
			figISinLog.map(function(i){
				BarArrFigI.push(figIBarVal[i]);
				LineArrFigI.push(figILineVal[i]);
				sinLogArrFigI.push(i.split("#")[1])
			})
			
			var color = Chart.helpers.color;
			var dataFigI = {
				labels: sinLogArrFigI,
				datasets: [{
					type: 'line',
					label: '平均停留時間',
					backgroundColor: color(window.chartColors.blue).alpha(0.4).rgbString(),
					borderColor: window.chartColors.blue,
					borderWidth: 5,
					fill: false,
					data: LineArrFigI,
					yAxisID: 'y-axis-2'
				}, {
					type: 'bar',
					label: '人數占比',
					backgroundColor: window.chartColors.yellow,
					data: BarArrFigI,
					borderColor: 'white',
					borderWidth: 2,
					yAxisID: 'y-axis-1'
				}]

			};

			var configFigI = {
				type: 'bar',
				data: dataFigI,
				options: {
					responsive: true,
					title: {
						display: true,
						text: '族群人次及平均停留時間',
						fontSize: 24
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					scales: {
						yAxes: [{
							type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
							scaleLabel: {
								display: true,
								labelString: '參與活動人數占比(%)'
							},
							ticks: {
				                fontSize: 14
				            }
						}, {
							type: 'linear',
							display: true,
							position: 'right',
							id: 'y-axis-2',
							scaleLabel: {
								display: true,
								labelString: '平均停留時間(分)'
							},
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
							ticks: {
				                fontSize: 14
				            }
						}],
					},
					legend: {
			            labels: {
				               fontSize: 20
			            }
			        }
				}
			}

			var ctx_figI = document.getElementById('canvas_figI').getContext('2d');
			new Chart(ctx_figI, configFigI);
		}

		d3.csv("./data/i_com_1.csv", ).row(function(d) { 
			return {'a': d.a, 'b': d.b, 'c': parseFloat(d.c)}; 
		}).get(function(error, rows) {
			figI_comment_1=rows
			comI1DataIsReady();
		});

		d3.csv("./data/i_com_2.csv", ).row(function(d) { 
			return {'a': d.a, 'b': d.b, 'c': parseInt(d.c)}; 
		}).get(function(error, rows) {
			figI_comment_2=rows
			comI2DataIsReady();
		});

		d3.csv("./data/i_fig.csv", ).row(function(d) { 
			return {'age_type': d.age_type, 'percent': parseFloat(d.percent), 'avg_stay': parseInt(d.avg_stay)}; 
		}).get(function(error, rows) {
			figI_data=rows;
			figIDataIsReady();
		});


