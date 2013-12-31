var body = ['Test',
			'Test2',
			'Test3',
			'Test4',
			'Test5',
			'Test6'];
var count = 5;
function do_post()
{
	
        /*var attachment = {
                'name':'Quiz',
                'href':'http://apps.facebook.com/your_apps/',
                'description':'good!',
                'caption':'{*actor*} is very smart!',
                'comments_xid':'1',
                'media':[
                                {
                                        'type':'image',
                                        'src':'http://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Facebook.svg/200px-Facebook.svg.png',
                                        'href':'http://zh.wikipedia.org/wiki/Facebook'
                                }
                ]
        };*/
        //Facebook.streamPublish( ''  , attachment , null , null , 'Message:' , null , false  );
//        FB.Connect.streamPublish( '' , attachment , null , null , 'Message:' , null , false  );
	/*
	FB.login(function(response) {
   		// handle the response
   		if (response.authResponse) {
     			var body = ['ABC' , 'DEF','測試'];
	
				FB.api('/me/feed', 'post', { message: body[2] }, function(response) {
				  if (!response || response.error) {
				    alert('Error occured');
				  } else {
				  	//alert('Post Name' + response.name);
				  }
				});		

   		} else {
     		//console.log('User cancelled login or did not fully authorize.');
   		}
 	}, {scope: 'publish_actions,publish_stream'});*/
	
	/*FB.api('/me', function(response) {
		document.write('Post name'+ response.name);
      	alert('Post Name\n'+ response.name);
    });*/

/*function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            init();
        }
    }, {scope: 'publish_actions,publish_stream'});
}
	login();*/
	FB.api('/me/feed', 'post', { message: body[count%6] }, function(response) {
	  if (!response || response.error) {
	    alert('Error occured');
	    //document.location.href="https://m.facebook.com/dialog/oauth/?client_id=534601883297900&redirect_uri=http://web.cc.ncu.edu.tw/~102522071/fb.html&scope=publish_actions,publish_stream";
	  } else {
	  	
	  	//alert('Post Name' + response.name);
	  }
	});		
	count++;

}