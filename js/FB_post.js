var body = ['Test',
			'Test2',
			'Test3',
			'Test4',
			'Test5',
			'Test6'];
var count = 5;
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