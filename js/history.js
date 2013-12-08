function his_print(){
		var sum = 10;
		var succeed = 7;
		var fail = 2;
		var notstart = 1;
		var succeesrate = (succeed / sum)*100;
		
		document.write("歷史數據" +　"<br>");
		document.write("現已完成任務" + sum + "次，其中成功" + succeed + "次，失敗" + fail + "次，未開始" + notstart + "次。" + "<br>");
		document.write("任務成功率為" + succeesrate + "%。")
}