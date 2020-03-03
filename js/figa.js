//var figA_data=[];
//		var figA_comment_1=[];
//		var figA_comment_2=[];


		function comA2DataIsReady(figA_comment_2) {
			var content_com_a_1 ='<ul>'
			for(var com1 in figA_comment_2){
				content_com_a_1+='<li><p>在 \
				<span class="badge badge-pill fontCust badge-dark">'+figA_comment_2[com1]['a']+'</span> 時候，活動人潮達到最高峰，現場當下約有 \
				<span class="badge badge-pill fontCust badge-success">'+figA_comment_2[com1]['b']+'</span> 人</p></li>';
			}
			content_com_a_1+="</ul>"
			$("#fig_A #figA_comment_2").html(content_com_a_1);
		}

		function comA1DataIsReady(figA_comment_1) {
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
		function figaDataIsReady(figA_data) {
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

				if (e.sinlog=='停留10分鐘以下'){
					reName='a#'+e.sinlog
				}else if(e.sinlog=='停留11-60分鐘'){
					reName='b#'+e.sinlog
				}else if(e.sinlog=='停留61-120分鐘'){
					reName='c#'+e.sinlog
				}else if(e.sinlog=='停留120分鐘以上'){
					reName='d#'+e.sinlog
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
						backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: dataArrFigA[1],
					}, {
						label: sinArrFigA[2],
						backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
						borderColor: window.chartColors.green,
						fill: false,
						data: dataArrFigA[2],
					}, {
						label: sinArrFigA[3],
						backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
						borderColor: window.chartColors.orange,
						fill: false,
						data: dataArrFigA[3],
					}]
				},
				options: {
				    responsive: true,
				    maintainAspectRatio: false,
					title: {
						display: true,
						text: '不同族群各時間點當下的人潮',
						fontSize: 20
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
							scaleLabel: {
								display: true,
								labelString: '不重複人次',
								fontSize: 18
							},
							ticks: {
				                fontSize: 18
				            }
						}]
					},
					legend: {
			            labels: {
							fontSize: 18,
							boxHeight: 5
						}
			        }
				}
			};
			var ctx_figa = document.getElementById('canvas_figA').getContext('2d');
			new Chart(ctx_figa, configFigA);
		}

		function getActiveCSVData(url, para) {
		    var _deferred = $.Deferred();
		    $.ajax({
		        type: "POST",
		        url: url,
		        data: para,
		        dataType: "json",
		        success: function (data) {
					return _deferred.resolve(data)
		        }
		    });
		    return _deferred.promise();
		}

		function getCSVData(url, para, map_function, data_proccess_function) {
		    $.ajax({
		        type: "POST",
		        url: url,
		        data: para,
		        dataType: "json",
		        success: function (data) {
                    if(data.result=='success'){
		                rows = $.csv.toObjects(data.csv_data);
		                rows = rows.map(map_function);
		                data_proccess_function(rows);
                    } else {
                        alert(data.result);
                    }
		        }
		    });
		}

		function activeCSVDataMapping(data, para, map_function, data_proccess_function) {
		    var mapping = para['type'];
		    if (data[mapping] != undefined) {
		        var csv_data = data[mapping];
		        rows = $.csv.toObjects(csv_data);
		        rows = rows.map(map_function);
		        data_proccess_function(rows);
		    }
		}
        
