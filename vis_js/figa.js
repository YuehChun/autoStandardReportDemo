var figA_data=[];
		var figA_comment_1=[];
		var figA_comment_2=[];


		function comA2DataIsReady() {
			var content_com_a_1 ='<ul>'
			for(var com1 in figA_comment_2){
				content_com_a_1+='<li><p>在 \
				<span class="badge badge-pill fontCust badge-dark">'+figA_comment_2[com1]['a']+'</span> 時候，活動人潮達到最高峰，現場當下約有 \
				<span class="badge badge-pill fontCust badge-success">'+figA_comment_2[com1]['b']+'</span> 人</p></li>';
			}
			content_com_a_1+="</ul>"
			$("#fig_A #figA_comment_2").html(content_com_a_1);
		}

		function comA1DataIsReady() {
			var content_com_a_2 ='<ul>'
			for(var com1 in figA_comment_1){
				content_com_a_2+='<li><p>在活動期間 \
				<span class="badge badge-pill fontCust badge-primary ">'+figA_comment_1[com1]['a']+'</span> 的族群於 \
				<span class="badge badge-pill fontCust badge-dark">'+figA_comment_1[com1]['b']+'</span> 時候人潮達到最高峰，現場當下約有 \
				<span class="badge badge-pill fontCust badge-success">'+figA_comment_1[com1]['c']+'</span> 人</p></li>';
			}
			content_com_a_2+="</ul>"
			$("#fig_A #figA_comment_1").html(content_com_a_2);
		}
		function figaDataIsReady() {
			var a_data=[]
			var sinLogArrFigA=[]
			var timeLogArrFigA=[]
			var time_axisFigA=[]
			var dataSinArrFigA = []
			for (var i in figA_data){
				e=figA_data[i]
				if(!(e.time_a in a_data)){
					a_data[e.time_a]=[]
				}
				if (e.sinlog=='停留5分鐘以下'){
					reName='a#'+e.sinlog
				}else if(e.sinlog=='停留5-10分鐘'){
					reName='b#'+e.sinlog
				}else if(e.sinlog=='停留11-20分鐘'){
					reName='c#'+e.sinlog
				}else if(e.sinlog=='停留21-30分鐘'){
					reName='d#'+e.sinlog
				}else if(e.sinlog=='停留31-60分鐘'){
					reName='e#'+e.sinlog
				}else if(e.sinlog=='60分鐘以上'){
					reName='f#'+e.sinlog
				}
				if(sinLogArrFigA.indexOf(reName)==-1){
					sinLogArrFigA.push(reName)
				}
				if(timeLogArrFigA.indexOf(e.time_a)==-1){
					timeLogArrFigA.push(e.time_a)
				}
				a_data[e.time_a][reName]=e.cnt
			}
			timeLogArrFigA.sort();
			sinLogArrFigA.sort();
			for(var i in sinLogArrFigA){
				dataSinArrFigA[sinLogArrFigA[i]]=[]
			}

			for (var j in timeLogArrFigA){
				timea=timeLogArrFigA[j]
				for(var i in sinLogArrFigA){
					if(sinLogArrFigA[i] in a_data[timea]){
						cnt=a_data[timea][sinLogArrFigA[i]]
					}else{
						cnt=0
					}
					dataSinArrFigA[sinLogArrFigA[i]].push(cnt)
				}
				time_axisFigA.push(timea);
			}
			CallDrawFigA(time_axisFigA,dataSinArrFigA);
		}

		function CallDrawFigA(time_axisFigA,dataSinArrFigA){
			var timeFormat = 'HH:mm';
			var i=0
			var dataArrFigA=[]
			var sinArrFigA=[]
			for(var a in dataSinArrFigA){
				dataArrFigA[i]=dataSinArrFigA[a];
				sinArrFigA[i]=a.split('#')[1]
				i+=1;
			}

			var color = Chart.helpers.color;
			var configFigA = {
				type: 'line',
				data: {
					labels: time_axisFigA,
					datasets: [{
						label: sinArrFigA[0],
						backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
						borderColor: window.chartColors.red,
						fill: false,
						data: dataArrFigA[0],
					}, {
						label: sinArrFigA[1],
						backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
						borderColor: window.chartColors.orange,
						fill: false,
						data: dataArrFigA[1],
					}, {
						label: sinArrFigA[2],
						backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
						borderColor: window.chartColors.yellow,
						fill: false,
						data: dataArrFigA[2],
					}, {
						label: sinArrFigA[3],
						backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
						borderColor: window.chartColors.green,
						fill: false,
						data: dataArrFigA[3],
					}, {
						label: sinArrFigA[4],
						backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: dataArrFigA[4],
					}]
				},
				options: {
					responsive: true,
					title: {
						display: true,
						text: '不同族群各時間點當下的人潮',
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
							scaleLabel: {
								display: true,
								labelString: '不重複人次',
								fontSize: 14
							},
							ticks: {
				                fontSize: 14
				            }
						}]
					},
					legend: {
			            labels: {
				               fontSize: 20
			            }
			        }
				}
			};
			var ctx_figa = document.getElementById('canvas_figA').getContext('2d');
			new Chart(ctx_figa, configFigA);
		}

		d3.csv("./data/a_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': parseInt(d.c, 10)}; 
	    }).get(function(error, rows) {
	    	figA_comment_1=rows
	    	comA1DataIsReady();
	    });
		d3.csv("./data/a_com_2.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b':  parseInt(d.b, 10)}; 
	    }).get(function(error, rows) {
	    	figA_comment_2=rows
	    	comA2DataIsReady();
	    });

		d3.csv("./data/a_fig.csv", ).row(function(d) { 
		 	return {'time_a': d.time_a, 'sinlog': d.sinlog, 'cnt': parseInt(d.cnt, 10)}; 
	    }).get(function(error, rows) {
	    	figA_data=rows;
	    	figaDataIsReady();
	    });