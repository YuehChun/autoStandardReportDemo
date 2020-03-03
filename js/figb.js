		//var figB_data=[];
		//var figB_comment_1=[];
		function comB1DataIsReady(figB_comment_1) {
			var content_com_b_1 ='<ul>'
			for(var com1 in figB_comment_1){
				content_com_b_1+=
							'<li><p> 停留時間區間以 <span class="badge badge-pill fontCust badge-primary"> '+figB_comment_1[com1]['a']+'</span> \
							族群的人占比最高為 <span class="badge badge-pill fontCust badge-info"> '+figB_comment_1[com1]['b']+'%</span>\
							，其次為　<span class="badge badge-pill fontCust badge-primary">'+figB_comment_1[com1]['c']+'</span>　\
							族群，其占比為　<span class="badge badge-pill fontCust badge-info"> '+figB_comment_1[com1]['d']+' % </span> \
							，前兩者差異為<span class="badge badge-pill fontCust badge-warning"> '+figB_comment_1[com1]['e']+'% </span></p></li>';
			}
			content_com_b_1+="</ul>";
			$("#fig_b_and_c #figB_comment_1").html(content_com_b_1);
		}
		var figBSinLog=[]
		var figBValLog=[]
		
		function figbDataIsReady(figB_data) {
			for (var i in figB_data){
				e=figB_data[i]
				if (e.sinlog=='停留10分鐘以下'){
					reName='a#'+e.sinlog
				}else if(e.sinlog=='停留11-60分鐘'){
					reName='b#'+e.sinlog
				}else if(e.sinlog=='停留61-120分鐘'){
					reName='c#'+e.sinlog
				}else if(e.sinlog=='停留120分鐘以上'){
					reName='d#'+e.sinlog
				}

				if(figBSinLog.indexOf(reName)==-1){
					figBSinLog.push(reName)
				}
				if(!(reName in figBValLog)){
					figBValLog[reName]=e['percent']
				}
			}
			figBSinLog.sort();
			CallDrawFigB(figBSinLog,figBValLog);
		}

		function CallDrawFigB(figBSinLog,figBValLog){
			var dataArrFigb=[]
			var sinLogArrFigB = []
			for(var a in figBSinLog){
				dataArrFigb.push(Math.round(figBValLog[figBSinLog[a]]*100));
				sinLogArrFigB.push(figBSinLog[a].split("#")[1])
			}
			
			var configFigB = {
				type: 'doughnut',
				data: {
					datasets: [{
						data: dataArrFigb,
						backgroundColor: [
							window.chartColors.grey,
							window.chartColors.blue,
							window.chartColors.orange,
							window.chartColors.green,
						],
						label: '停留時間'
					}],
					labels: sinLogArrFigB
				},
				options: {
				    responsive: true,
				    maintainAspectRatio: false,
					legend: {
						position: 'bottom',
						labels: {
							fontSize: 18
						}
					},
					title: {
						display: true,
						text: '停留時間比例',
						fontSize: 18
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
				}
			};

			var ctx_figb = document.getElementById('canvas_figb').getContext('2d');
			new Chart(ctx_figb, configFigB);
		}

