		//var figK_data=[];
		//var figK_comment_1=[];

		function comK1DataIsReady(figK_comment_1) {
			var content_com_j_1 ="<ul>"
			figK_comment_1.map(function(comm){
				content_com_j_1+= '<li><p>細看鄉鎮區，人潮最多的鄉鎮區為 \
					<span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span> ，其平均年齡為\
					<span class="badge badge-pill fontCust badge-success">'+Math.round(comm.b)+'</span> ，次者\
					<span class="badge badge-pill fontCust badge-primary">'+comm.c+'</span> 地區的平均年齡為\
					<span class="badge badge-pill fontCust badge-success">'+Math.round(comm.d)+'</span> \
				</p></li>';
			})
			content_com_j_1+="</ul>";
			$("#fig_j_and_k #figK_comment_1").html(content_com_j_1);
		}

		function figKDataIsReady(figK_data) {
			var figKSinLog=[]
			var figKBarVal=[]
			figK_data.map(function(i){
				figKBarVal.push(i)
			});

			figKBarVal.sort(function(a,b){
				return b.cnt-a.cnt
			});
			CallDrawFigK(figKSinLog,figKBarVal);
		}

		function CallDrawFigK(figKSinLog,figKBarVal){
			var BarArrFigK=[]
			var sinLogArrFigK = []
			var minAge = 999;
			var maxAge = 0;
			figKBarVal.map(function(i){
				minAge=minAge>i.avg_age?i.avg_age:minAge;
				maxAge=maxAge<i.avg_age?i.avg_age:maxAge;
				BarArrFigK.push(Math.round(i.avg_age));
				sinLogArrFigK.push(i.town)
			})
			minAge-=2;
			maxAge+=1;
			var color = Chart.helpers.color;
			var dataFigK = {
				labels: sinLogArrFigK,
				datasets: [{
					label: '參與活動平均年齡',
					backgroundColor: color("#999900").alpha(0.5).rgbString(),
					data: BarArrFigK,
					borderColor: 'white',
					borderWidth: 2,
					xAxisID: 'x-axis-1'
				}]

			};

			var configFigK = {
				type: 'horizontalBar',
				data: dataFigK,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: '各行政區的平均年齡',
						fontSize: 18
					},
				    legend: {
				        display: false
				    },
					tooltips: {
						mode: 'index',
						intersect: false
					},
					scales: {
						xAxes: [{
							type: 'linear',
							display: true,
							position: 'bottom',
							id: 'x-axis-1',
							scaleLabel: {
								display: true,
								labelString: '平均年齡'
							},
							ticks: {
			                    suggestedMin: minAge,
			                    suggestedMax: maxAge,
			                    fontSize: 18,
			                }
						}],
					}
				}
			}

			var ctx_figK = document.getElementById('canvas_figK').getContext('2d');
			new Chart(ctx_figK, configFigK);
		}


        /*
		d3.csv("./data/k_com_1.csv", ).row(function(d) { 
			return {'a': d.a, 'b': parseInt(d.b),'c': d.c, 'd': parseInt(d.d)}; 
		}).get(function(error, rows) {
			figK_comment_1=rows
			comK1DataIsReady();
		});


		d3.csv("./data/k_fig.csv", ).row(function(d) { 
			return {'town': d.town, 'avg_age': parseInt(d.avg_age), 'cnt': parseInt(d.cnt)}; 
		}).get(function(error, rows) {
			figK_data=rows;
			figKDataIsReady();
		});
        */

