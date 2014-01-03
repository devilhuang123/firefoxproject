window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '534601883297900',                        // App ID from the app dashboard
      status     : true,                                 // Check Facebook Login status
      xfbml      : true,                                  // Look for social plugins on the page
      cookie	 : true
    });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
 
    if (response.status === 'connected') {
      	init();
      	
      	FB.api('/me', function(response) {
			alert('Post Name\n'+ response.name);
    	});
      	
    } else if (response.status === 'not_authorized') {
      	login();
    } else {
    	document.location.href="https://m.facebook.com/dialog/oauth/?client_id=534601883297900&redirect_uri=http://web.cc.ncu.edu.tw/~102522071/fb.html&scope=publish_actions,publish_stream";
    }
  });
  
  
  
  };

  // Load the SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            init();
        }
    }, {scope: 'publish_actions,publish_stream'});
}