		//var figC_data=[];
		//var figC_comment_1=[];
		//var figC_comment_2=[];


		function comC1DataIsReady(figC_comment_1) {
			var content_com_c_1 ="<ul>"
			figC_comment_1.map(function(comm){
				content_com_c_1+='<li><p>活動期間\
					<span class="badge badge-pill fontCust badge-primary"> '+comm.a+'</span> 族群約有\
					<span class="badge badge-pill fontCust badge-success"> '+Math.round(comm.b)+'</span> 人，其平均停留時間為\
					<span class="badge badge-pill fontCust badge-secondary"> '+Math.round(comm.c)+'</span> 分鐘，\
					<span class="badge badge-pill fontCust badge-primary">停留10分鐘以上</span> 的共有\
					<span class="badge badge-pill fontCust badge-success"> '+Math.round(comm.d)+'</span> 人，總平均停留時間為\
					<span class="badge badge-pill fontCust badge-secondary"> '+Math.round(comm.e)+'</span> 分鐘\
				</p></li>';
			});
			content_com_c_1+="</ul>";
			$("#fig_b_and_c #figC_comment_1").html(content_com_c_1);
		}
		function figCDataIsReady(figC_data) {
			var figCSinLog=[]
			var figCBarVal=[]
			var figCLineVal=[]
			for (var i in figC_data){
				e=figC_data[i]
				if(e['sinlog']!='other'){
					if (e['sinlog']=='停留10分鐘以下'){
						reName='a#'+e['sinlog']
					}else if(e['sinlog']=='停留11-60分鐘'){
						reName='b#'+e['sinlog']
					}else if(e['sinlog']=='停留61-120分鐘'){
						reName='c#'+e['sinlog']
					}else if(e['sinlog']=='停留120分鐘以上'){
						reName='d#'+e['sinlog']
					}
					if(figCSinLog.indexOf(reName)==-1){
						figCSinLog.push(reName)
					}
					if(!(reName in figCBarVal)){
						figCBarVal[reName]=e['cnt']
					}
					if(!(reName in figCLineVal)){
						figCLineVal[reName]=e['avgTime']
					}
				}
			}
			figCSinLog.sort();
			console.log(figCSinLog)
			console.log(figCBarVal)
			console.log(figCLineVal)
			CallDrawFigC(figCSinLog,figCBarVal,figCLineVal);
		}

		function CallDrawFigC(figCSinLog,figCBarVal,figCLineVal){
			var BarArrFigC=[]
			var LineArrFigC=[]
			var sinLogArrFigC = []
			for(var a in figCSinLog){
				BarArrFigC.push(figCBarVal[figCSinLog[a]]);
				LineArrFigC.push(figCLineVal[figCSinLog[a]]);
				sinLogArrFigC.push(figCSinLog[a].split("#")[1])
			}
			
			var color = Chart.helpers.color;
			var dataFigC = {
				labels: sinLogArrFigC,
				datasets: [{
					type: 'line',
					label: '平均停留時間',
					backgroundColor: color(window.chartColors.orange).alpha(0.4).rgbString(),
					borderColor: window.chartColors.orange,
					borderWidth: 5,
					fill: false,
					data: LineArrFigC,
					yAxisID: 'y-axis-2'
				}, {
					type: 'bar',
					label: '人次',
					backgroundColor: window.chartColors.green,
					data: BarArrFigC,
					borderColor: 'white',
					borderWidth: 2,
					yAxisID: 'y-axis-1'
				}]

			};

			var configFigC = {
				type: 'bar',
				data: dataFigC,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: '族群人次及平均停留時間',
						fontSize: 18
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
								labelString: '不重複人次'
							},
							ticks: {
				                fontSize: 18
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
				                fontSize: 18
				            }
						}],
					}
				}
			}

			var ctx_figc = document.getElementById('canvas_figc').getContext('2d');
			new Chart(ctx_figc, configFigC);
		}
