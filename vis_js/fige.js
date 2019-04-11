		var figE_data=[];
		var figE_comment_1=[];


		function comE1DataIsReady() {
			var content_com_e_1 ="<ul>"
			figE_comment_1.map(function(comm){

				content_com_e_1+='<li><p>\
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> 的居民以\
					<span class="badge badge-pill fontCust badge-dark">'+comm.b+'</span> 時當下現場人數達到最高約有\
					<span class="badge badge-pill fontCust badge-success">'+comm.c+'</span> 的人，相較於活動最低點\
					<span class="badge badge-pill fontCust badge-dark">'+comm.d+'</span> 時的人數\
					<span class="badge badge-pill fontCust badge-success">'+comm.e+'</span> ，差異約有\
					<span class="badge badge-pill fontCust badge-warning">'+comm.f+'</span> 人 \
				</p></li>';
			})
			content_com_e_1+="</ul>";
			$("#fig_E #figE_comment_1").html(content_com_e_1);
		}
		function figEDataIsReady() {
			var e_data=[]
			var figESumArr=[]
			var tempSortArr=[]
			var timeLogArrFigE=[]
			var time_axisFigE=[]
			var dataSinArrFigE = []
			for (var i in figE_data){
				e=figE_data[i]

				if(!(e.town in figESumArr)){
					figESumArr[e.town]=e.cnt
				}
				figESumArr[e.town]+=e.cnt;

				if(timeLogArrFigE.indexOf(e.time_a)==-1){
					timeLogArrFigE.push(e.time_a)
				}

				if(!(e.time_a in e_data)){
					e_data[e.time_a]=[]
				}
				e_data[e.time_a][e.town]=e.cnt
			}

			for (town in figESumArr){
				tempSortArr.push({'town' : town , 'sum' : figESumArr[town]})
			}

			tempSortArr.sort(function(a , b){
				return b.sum-a.sum
			});
			timeLogArrFigE.sort();
			tempSortArr.map(function(x){
				dataSinArrFigE[x.town]=[]
			})


			timeLogArrFigE.map(function(x){
				tempSortArr.map(function(y){
					if(y.town in e_data[x]){
						cnt=e_data[x][y.town]
					}else{
						cnt=0
					}
					dataSinArrFigE[y.town].push(cnt)
				})
				time_axisFigE.push(x);
			})

			for (var j in timeLogArrFigE){
				timea=timeLogArrFigE[j]
			}
			CallDrawFigE(time_axisFigE,dataSinArrFigE);
		}

		function CallDrawFigE(time_axisFigE,dataSinArrFigE){
			var timeFormat = 'HH:mm';
			var i=0
			var dataArrFigE=[]
			var sinArrFigE=[]
			var yAxesName=""
			for(var a in dataSinArrFigE){
				yAxesName=yAxesName==""?a+"當地民眾人次":yAxesName;
				dataArrFigE[i]=dataSinArrFigE[a];
				sinArrFigE[i]=a;
				i+=1;
			}

			var color = Chart.helpers.color;
			var configFigE = {
				type: 'line',
				data: {
					labels: time_axisFigE,
					datasets: [{
						label: sinArrFigE[0],
						backgroundColor: color(window.chartColors.red).alpha(0.9).rgbString(),
						borderColor: window.chartColors.red,
						fill: false,
						data: dataArrFigE[0],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigE[1],
						backgroundColor: color(window.chartColors.orange).alpha(0.9).rgbString(),
						borderColor: window.chartColors.orange,
						fill: false,
						data: dataArrFigE[1],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigE[2],
						backgroundColor: color(window.chartColors.yellow).alpha(0.9).rgbString(),
						borderColor: window.chartColors.yellow,
						fill: false,
						data: dataArrFigE[2],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigE[3],
						backgroundColor: color(window.chartColors.green).alpha(0.9).rgbString(),
						borderColor: window.chartColors.green,
						fill: false,
						data: dataArrFigE[3],
						yAxisID: 'y-axis-1',
					}, {
						label: sinArrFigE[4],
						backgroundColor: color(window.chartColors.blue).alpha(0.9).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: dataArrFigE[4],
						yAxisID: 'y-axis-1',
					}]
				},
				options: {
					responsive: true,
					title: {
						display: true,
						text: '各鄉鎮不同時段的當下人潮',
						fontSize: 24
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
				                fontSize: 14
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
			};
			var ctx_figE = document.getElementById('canvas_figE').getContext('2d');
			new Chart(ctx_figE, configFigE);
		}

		d3.csv("./data/e_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': parseInt(d.c, 10), 'd': d.d, 'e': parseInt(d.e, 10), 'f': parseInt(d.f)};
		}).get(function(error, rows) {
			figE_comment_1=rows
			comE1DataIsReady();
		});

		d3.csv("./data/e_fig.csv", ).row(function(d) { 
		 	return {'time_a': d.time_a, 'town': d.town, 'cnt': parseInt(d.cnt, 10)}; 
		}).get(function(error, rows) {
			figE_data=rows;
			figEDataIsReady();
		});