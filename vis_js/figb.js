		var figB_data=[];
		var figB_comment_1=[];
		function comB1DataIsReady() {
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
		function figbDataIsReady() {
			for (var i in figB_data){
				e=figB_data[i]
				if (e['sinlog']=='停留5分鐘以下'){
					reName='a#'+e['sinlog']
				}else if(e['sinlog']=='停留5-10分鐘'){
					reName='b#'+e['sinlog']
				}else if(e['sinlog']=='停留11-20分鐘'){
					reName='c#'+e['sinlog']
				}else if(e['sinlog']=='停留21-30分鐘'){
					reName='d#'+e['sinlog']
				}else if(e['sinlog']=='停留31-60分鐘'){
					reName='e#'+e['sinlog']
				}else if(e['sinlog']=='60分鐘以上'){
					reName='f#'+e['sinlog']
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
							window.chartColors.red,
							window.chartColors.orange,
							window.chartColors.yellow,
							window.chartColors.green,
							window.chartColors.blue,
							window.chartColors.grey,
						],
						label: '停留時間'
					}],
					labels: sinLogArrFigB
				},
				options: {
					responsive: true,
					legend: {
						position: 'bottom',
						labels: {
							fontSize: 14
						}
					},
					title: {
						display: true,
						text: '停留時間比例',
						fontSize: 24
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

		d3.csv("./data/b_com_1.csv", ).row(function(d) { 
		 	return {'a': d.a, 'b': d.b, 'c': d.c, 'd': d.d, 'e': d.e}; 
	    }).get(function(error, rows) {
	    	figB_comment_1=rows
	    	comB1DataIsReady();
	    });

		d3.csv("./data/b_fig.csv", ).row(function(d) { 
		 	return {'sinlog': d.sinlog, 'percent': parseFloat(d.percent)}; 
	    }).get(function(error, rows) {
	    	figB_data=rows;
	    	figbDataIsReady();
	    });
