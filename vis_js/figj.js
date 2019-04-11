		var figJ_data=[];
		var figJ_comment_1=[];

		function comJ1DataIsReady() {
			
			var content_com_j_1 ="<ul>"
			figJ_comment_1.map(function(comm){
				content_com_j_1+= '<li><p>人潮最多的縣市為 \
					<span class="badge badge-pill lead fontCust badge-primary">'+comm.a+'</span> ，其平均年齡為\
					<span class="badge badge-pill lead fontCust badge-success">'+Math.round(comm.b)+'</span> ，次者\
					<span class="badge badge-pill lead fontCust badge-primary">'+comm.c+'</span> 地區的平均年齡為\
					<span class="badge badge-pill lead fontCust badge-success">'+Math.round(comm.d)+'</span> \
				</p></li>';
			})
			content_com_j_1+="</ul>";
			$("#fig_j_and_k #figJ_comment_1").html(content_com_j_1);
		}

		function figJDataIsReady() {
			var figJSinLog=[]
			var figJBarVal=[]
			
			figJ_data.map(function(i){
				figJBarVal.push(i)
			});

			figJBarVal.sort(function(a,b){
				return b.cnt-a.cnt
			});
			CallDrawFigJ(figJSinLog,figJBarVal);
		}

		function CallDrawFigJ(figJSinLog,figJBarVal){
			var BarArrFigJ=[]
			var sinLogArrFigJ = []
			var minAge = 999;
			var maxAge = 0;
			figJBarVal.map(function(i){
				minAge=minAge>i.avg_age?i.avg_age:minAge;
				maxAge=maxAge<i.avg_age?i.avg_age:maxAge;
				BarArrFigJ.push(Math.round(i.avg_age));
				sinLogArrFigJ.push(i.county)
			})
			minAge-=2;
			maxAge+=1;
			
			var color = Chart.helpers.color;
			var dataFigJ = {
				labels: sinLogArrFigJ,
				datasets: [{
					type: 'bar',
					label: '參與活動平均年齡',
					backgroundColor: color("#0033cc").alpha(0.5).rgbString(),
					data: BarArrFigJ,
					borderColor: 'white',
					borderWidth: 2,
					yAxisID: 'y-axis-1'
				}]

			};

			var configFigJ = {
				type: 'bar',
				data: dataFigJ,
				options: {
					responsive: true,
					title: {
						display: true,
						text: '各縣市的平均年齡',
						fontSize: 24
					},
				    legend: {
				        display: false
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
								labelString: '平均年齡'
							},
							ticks: {
			                    suggestedMin: minAge,
			                    suggestedMax: maxAge,
				                fontSize: 14
			                },
						}],
					}
				}
			}

			var ctx_figJ = document.getElementById('canvas_figJ').getContext('2d');
			new Chart(ctx_figJ, configFigJ);
		}

		d3.csv("./data/j_com_1.csv", ).row(function(d) { 
			return {'a': d.a, 'b': parseInt(d.b),'c': d.c, 'd': parseInt(d.d)}; 
		}).get(function(error, rows) {
			figJ_comment_1=rows
			comJ1DataIsReady();
		});


		d3.csv("./data/j_fig.csv", ).row(function(d) { 
			return {'county': d.county, 'avg_age': parseInt(d.avg_age), 'cnt': parseInt(d.cnt)}; 
		}).get(function(error, rows) {
			figJ_data=rows;
			figJDataIsReady();
		});


