		//var figD_data=[];
		//var figD_comment_1=[];


		function comD1DataIsReady(figD_comment_1) {
			var content_com_d_1 ="<ul>"
			figD_comment_1.map(function(comm){
				content_com_d_1+='<li><p>以當地 \
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> 的人次為多，且當\
					<span class="badge badge-pill fontCust badge-dark">'+comm.b+'</span> 時現場人數達到最高約有\
					<span class="badge badge-pill fontCust badge-success">'+comm.c+'</span> 的人，相較於活動最低點\
					<span class="badge badge-pill fontCust badge-dark">'+comm.d+'</span> 的時後現場人數有\
					<span class="badge badge-pill fontCust badge-success">'+comm.e+'</span> ，約有\
					<span class="badge badge-pill fontCust badge-warning">'+comm.f+'</span> 倍 \
				</p></li>';
			});
			content_com_d_1+="</ul>";
			$("#fig_D #figD_comment_1").html(content_com_d_1);
		}
		function figDDataIsReady(figD_data) {
			var d_data=[]
			var figDSumArr=[]
			var tempSortArr=[]
			var timeLogArrFigD=[]
			var time_axisFigD=[]
			var dataSinArrFigD = []
			for (var i in figD_data){
				e=figD_data[i]

				if(!(e.county in figDSumArr)){
					figDSumArr[e.county]=e.cnt
				}
				figDSumArr[e.county]+=e.cnt;

				if(timeLogArrFigD.indexOf(e.time_a)==-1){
					timeLogArrFigD.push(e.time_a)
				}

				if(!(e.time_a in d_data)){
					d_data[e.time_a]=[]
				}
				d_data[e.time_a][e.county]=e.cnt
			}

			for (county in figDSumArr){
				tempSortArr.push({'county' : county , 'sum' : figDSumArr[county]})
			}

			tempSortArr.sort(function(a , b){
				return b.sum-a.sum
			});
			timeLogArrFigD.sort();
			tempSortArr.map(function(x){
				dataSinArrFigD[x.county]=[]
			})


			timeLogArrFigD.map(function(x){
				tempSortArr.map(function(y){
					if(y.county in d_data[x]){
						cnt=d_data[x][y.county]
					}else{
						cnt=0
					}
					dataSinArrFigD[y.county].push(cnt)
				})
				time_axisFigD.push(x);
			})

			for (var j in timeLogArrFigD){
				timea=timeLogArrFigD[j]
			}
			CallDrawFigD(time_axisFigD,dataSinArrFigD);
		}

		function CallDrawFigD(time_axisFigD,dataSinArrFigD){
			var timeFormat = 'HH:mm';
			var i=0
			var dataArrFigD=[]
			var sinArrFigD=[]
			var yAxesName=""
			for(var a in dataSinArrFigD){
				yAxesName=yAxesName==""?a+"當地民眾人次":yAxesName;
				dataArrFigD[i]=dataSinArrFigD[a];
				sinArrFigD[i]=a;
				i+=1;
			}

			var color = Chart.helpers.color;
			var configFigD = {
				type: 'line',
				data: {
					labels: time_axisFigD,
					datasets: [{
						label: sinArrFigD[0],
						backgroundColor: color(window.chartColors.red).alpha(0.9).rgbString(),
						borderColor: window.chartColors.red,
						fill: false,
						data: dataArrFigD[0],
						yAxisID: 'y-axis-1',
						fontSize: 18
					}, {
						label: sinArrFigD[1],
						backgroundColor: color(window.chartColors.orange).alpha(0.9).rgbString(),
						borderColor: window.chartColors.orange,
						fill: false,
						data: dataArrFigD[1],
						yAxisID: 'y-axis-2',
						fontSize: 18
					}, {
						label: sinArrFigD[2],
						backgroundColor: color(window.chartColors.yellow).alpha(0.9).rgbString(),
						borderColor: window.chartColors.yellow,
						fill: false,
						data: dataArrFigD[2],
						yAxisID: 'y-axis-2',
						fontSize: 18
					}, {
						label: sinArrFigD[3],
						backgroundColor: color(window.chartColors.green).alpha(0.9).rgbString(),
						borderColor: window.chartColors.green,
						fill: false,
						data: dataArrFigD[3],
						yAxisID: 'y-axis-2',
						fontSize: 18
					}, {
						label: sinArrFigD[4],
						backgroundColor: color(window.chartColors.blue).alpha(0.9).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: dataArrFigD[4],
						yAxisID: 'y-axis-2',
						fontSize: 18
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
					    display: true,
					    text: '各縣市不同時段的當下人潮',
					    fontSize: 18
					},
					legend: {
					    labels: {
					        fontSize: 18
					    }
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
							}
						}],
						yAxes: [{
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
							scaleLabel: {
								display: true,
								labelString: yAxesName
							}
						}, {
							type: 'linear',
							display: true,
							position: 'right',
							id: 'y-axis-2',
							gridLines: {
								drawOnChartArea: false,
							},
							scaleLabel: {
								display: true,
								labelString: '其他縣市人次'
							}
						}],
					},
				}
			};
			var ctx_figD = document.getElementById('canvas_figD').getContext('2d');
			new Chart(ctx_figD, configFigD);
		}
        


        /*
		d3.csv("./data/d_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': parseInt(d.c, 10), 'd': d.d, 'e': parseInt(d.e, 10), 'f': parseFloat(d.f)};
	    }).get(function(error, rows) {
	    	figD_comment_1=rows
	    	comD1DataIsReady();
	    });

		d3.csv("./data/d_fig.csv", ).row(function(d) { 
		 	return {'time_a': d.time_a, 'county': d.county, 'cnt': parseInt(d.cnt, 10)}; 
	    }).get(function(error, rows) {
	    	figD_data=rows;
	    	figDDataIsReady();
	    });
        */