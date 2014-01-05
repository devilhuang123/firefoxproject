/*失敗文*/
var body = ['天啊，原來我是個戰鬥力只有5的渣',
			'今對佛前求懺悔',
			'我只會說說，遇到事情只會躲在棉被裡哭哭',
			'吾命休矣!',
			'I am loser.',
			'各位親愛的鄉親父老們大家午安大家好，我不小心中了樂透頭獎，超爽的~'];
/*勝利文*/
var body_2 = ['此人在"我要努力向上"中，世界排名第3',
			  '又完成任務了，根本a piece of cake!',
			  '此人足智多謀，可與共事',
			  '一個努力型天才誕生了，不要害羞，快膜拜他',
			  '青春，伴著藍調Jazz，周遊列國',
			  '電影「不可能的任務」拒絕我去試鏡，原因很明顯'];
var count = 1;	
var count_2 = 1;
/*PO失敗文*/
function do_post()
{
	FB.api('/me/feed', 'post', { message: body[count%6] }, function(response) {
	  if (!response || response.error) {
	    alert('Error occured');
	  } else {

	  }
	});		
	count++;

}
/*PO勝利文*/
function do_post_2()
{
	FB.api('/me/feed', 'post', { message: body_2[count_2%6] }, function(response) {
	  if (!response || response.error) {
	    alert('Error occured');
	  } else {

	  }
	});		
	count_2++;

}