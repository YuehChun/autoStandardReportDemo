		//var figH_data=[];
		//var figH_comment_1=[];


		function comH1DataIsReady(figH_comment_1) {
			var content_com_h_1 ="<ul>"
			figH_comment_1.map(function(comm){
				content_com_h_1+= '<li><p>活動期間增減差異最多的群族為\
					<span class="badge badge-pill fontCust badge-primary"> '+comm.a+'</span> ，現場人數最多的時間點在\
					<span class="badge badge-pill fontCust badge-dark"> '+comm.b+'</span> ，而最少的時間點在\
					<span class="badge badge-pill fontCust badge-dark"> '+comm.c+'</span> \
				</p></li>';
			})
			content_com_h_1+="</ul>";
			$("#fig_h_and_i #figH_comment_1").html(content_com_h_1);
		}

		function comH2DataIsReady(figH_comment_2) {
			var content_com_h_2 ="<ul>"
			figH_comment_2.map(function(comm){
				content_com_h_2+= '<li><p>活動期間增減差異最多的群族為\
					<span class="badge badge-pill fontCust badge-primary"> '+comm.a+'</span> ，現場人數最多的時間點在\
					<span class="badge badge-pill fontCust badge-dark"> '+comm.b+'</span> ，而最少的時間點在\
					<span class="badge badge-pill fontCust badge-dark"> '+comm.c+'</span> \
				</p></li>';
			})
			content_com_h_2+="</ul>";
			$("#fig_h_and_i #figH_comment_2").html(content_com_h_2);
		}
		function figHDataIsReady(figH_data) {
			var h_data=[];
			var figHSumArr=[];
			var tempSortArr=[];
			var sinLogArrFigH=[]
			var timeLogArrFigH=[];
			var time_axisFigH=[];
			var dataSinArrFigH = [];

			figH_data.map(function(i){
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
					if(sinLogArrFigH.indexOf(reName)==-1){
						sinLogArrFigH.push(reName);
					}
					if(timeLogArrFigH.indexOf(i.time_a)==-1){
						timeLogArrFigH.push(i.time_a);
					}
					if(!(i.time_a in h_data)){
						h_data[i.time_a]=[];
					}
					h_data[i.time_a][reName]=i.cnt;
				}
			});
			sinLogArrFigH.sort();
			timeLogArrFigH.sort();
			for(a in sinLogArrFigH){
				dataSinArrFigH[sinLogArrFigH[a]]=[]
			}

			timeLogArrFigH.map(function(x){
				sinLogArrFigH.map(function(y){
					backName=y.split('#')[1];
					if(y in h_data[x]){
						cnt=h_data[x][y]
					}else{
						cnt=0
					}
					dataSinArrFigH[y].push(cnt)
				})
				time_axisFigH.push(x);
			});

			CallDrawFigH(time_axisFigH,dataSinArrFigH);
		}

		function CallDrawFigH(time_axisFigH,dataSinArrFigH){

			var timeFormat = 'HH:mm';
			var i=0
			var dataArrFigH=[]
			var sinArrFigH=[]
			for(var a in dataSinArrFigH){
				dataArrFigH[i]=dataSinArrFigH[a];
				sinArrFigH[i]=a.split('#')[1];
				i+=1;
			}

			var color = Chart.helpers.color;
			var configFigH = {
				type: 'line',
				data: {
					labels: time_axisFigH,
					datasets: [{
						label: sinArrFigH[0],
						backgroundColor: color(window.chartColors.red).alpha(0.9).rgbString(),
						borderColor: window.chartColors.red,
						fill: false,
						data: dataArrFigH[0],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigH[1],
						backgroundColor: color(window.chartColors.orange).alpha(0.9).rgbString(),
						borderColor: window.chartColors.orange,
						fill: false,
						data: dataArrFigH[1],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigH[2],
						backgroundColor: color(window.chartColors.yellow).alpha(0.9).rgbString(),
						borderColor: window.chartColors.yellow,
						fill: false,
						data: dataArrFigH[2],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigH[3],
						backgroundColor: color(window.chartColors.green).alpha(0.9).rgbString(),
						borderColor: window.chartColors.green,
						fill: false,
						data: dataArrFigH[3],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigH[4],
						backgroundColor: color(window.chartColors.blue).alpha(0.9).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: dataArrFigH[4],
						yAxisID: 'y-axis-1',
					}]
				},
				options: {
					responsive: true,
                    maintainAspectRatio: false,
					title: {
						display: true,
						text: '各年齡層不同時段的當下人潮',
						fontSize: 18
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					scales: {
						xAxes: [{
							type: 'time',
							time: {
								parser: timeFormat,
								tooltipFormat: 'HH:mm'
							},
							scaleLabel: {
								display: true,
								labelString: '活動時間'
							},
							ticks: {
				                fontSize: 18
				            }
						}],
						yAxes: [{
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
							scaleLabel: {
								display: true,
								labelString: '人次'
							},
							ticks: {
				                fontSize: 18
				            }
						}],
					},
					legend: {
			            labels: {
				               fontSize: 18
			            }
			        }
				}
			};
			var ctx_figH = document.getElementById('canvas_figH').getContext('2d');
			new Chart(ctx_figH, configFigH);
		}



        /*
		d3.csv("./data/h_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': d.c};
		}).get(function(error, rows) {
			figH_comment_1=rows
			comH1DataIsReady();
		});

		d3.csv("./data/h_com_2.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': d.c};
		}).get(function(error, rows) {
			figH_comment_2=rows
			comH2DataIsReady();
		});

		d3.csv("./data/h_fig.csv", ).row(function(d) { 
		 	return {'time_a': d.time_a, 'age_type': d.age_type, 'cnt': parseInt(d.cnt, 10)}; 
		}).get(function(error, rows) {
			figH_data=rows;
			figHDataIsReady();
		});*/