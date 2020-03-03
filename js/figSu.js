

		function comSu1DataIsReady(figSu_comment_1) {
			var content_com_Su_1 ="<ul>"
			figSu_comment_1.map(function(comm){
				content_com_Su_1+='<li><p>活動期間不重複的參與人數共有\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.a+'</span>人，在\
                                        <span class="badge badge-pill fontCust badge-dark">'+comm.b+'</span>人潮最高，現場當下約\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.c+'</span>人(以停留\
                                        <span class="badge badge-pill fontCust badge-secondary">'+comm.d+'</span>以上的計算)\
                                    </p></li>';

			});
			content_com_Su_1+="</ul>";
			$("#fig_Main_area #fig_Main_comment_1").html(content_com_Su_1);
		}


		function comSu2DataIsReady(figSu_comment_2) {
			var content_com_Su_2 ="<ul>"
			figSu_comment_2.map(function(comm){
				content_com_Su_2+='<li> <p> 縣市以\
                                        <span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span>的民眾最多，約有\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.b+'</span>人，其占整體活動的比例為\
                                        <span class="badge badge-pill fontCust badge-warning">'+Math.round(comm.c*100)+'%</span>，其次為\
                                        <span class="badge badge-pill fontCust badge-primary">'+comm.d+'</span>，兩者相差\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.e+'</span>人\
                                    </p> </li>';

			});
			content_com_Su_2+="</ul>";
			$("#fig_Main_area #fig_Main_comment_2").html(content_com_Su_2);
		}



		function comSu3DataIsReady(figSu_comment_3) {
			var content_com_Su_3 ="<ul>"
			figSu_comment_3.map(function(comm){
				content_com_Su_3+='<li> <p> 年齡層以\
                                        <span class="badge badge-pill fontCust badge-primary">'+comm.a+'</span>的族群最多，約有\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.b+'</span>人參與，其占整體活動的比例為\
                                        <span class="badge badge-pill fontCust badge-warning">'+Math.round(comm.c*100)+'%</span>\
                                    </p> </li>';

			});
			content_com_Su_3+="</ul>";
			$("#fig_Main_area #fig_Main_comment_3").html(content_com_Su_3);
		}



		function comSu4DataIsReady(figSu_comment_4) {
			var content_com_Su_4 ="<ul>"
			figSu_comment_4.map(function(comm){
				content_com_Su_4+='<li> <p> 性別比約為\
                                        <span class="badge badge-pill fontCust badge-danger">'+Math.round(comm.a*100)+'%</span>，性別人數相差約\
                                        <span class="badge badge-pill fontCust badge-success">'+comm.b+'</span>人\
                                    </p> </li>';

			});
			content_com_Su_4+="</ul>";
			$("#fig_Main_area #fig_Main_comment_4").html(content_com_Su_4);
		}

