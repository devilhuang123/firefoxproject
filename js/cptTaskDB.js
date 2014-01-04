/*var cptTaskEx = 
{
	Id : parseInt(cptId),
	StartTime : startTime,
	TargetTime : targetTime,
	Type : type,
	LastTime : lastTime,
	Result : result
};*/
var db;

function cptTaskDBInit() {
	console.log("cptDB init");  	
  
  	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  
  	// open database
  	var request = window.indexedDB.open("cptTaskDB", 1);
   
  // these two event handlers act on the database being opened successfully, or not
  	request.onerror = function(event) 
  	{
    	console.log = "Error loading database.";
  	};
  
  	request.onsuccess = function(event) 
  	{
    	console.log = "Database initialised.";
    
    	// store the result of opening the database in the db variable. This is used a lot below
    	db = request.result;
  	};
  	
  	// This event handles the event whereby a new version of the database needs to be created
  	// Either one has not been created before, or a new version number has been submitted via the
  	// window.indexedDB.open line above
  	//it is only implemented in recent browsers
  	request.onupgradeneeded = function(event) 
  	{ 
    	var db = event.target.result;
    
	    db.onerror = function(event) 
	    {
	      	console.log = "Error loading database.";
	    };
	
	    // Create an objectStore for this database
	    
	    var objectStore = db.createObjectStore("cptTaskDB", { keyPath: "cptTask" });
	    
	    // define what data items the objectStore will contain
	    
	    objectStore.createIndex("StartTime", "StartTime", { unique: false });
	    objectStore.createIndex("TargetTime", "TargetTime", { unique: false });
	    objectStore.createIndex("Type", "Type", { unique: false });
	    objectStore.createIndex("LastTime", "LastTime", { unique: false });
	    objectStore.createIndex("Result", "Result", { unique: false });
	
    	console.log = "Object store created.";
  	};
  	
  	
}



function addCptTask()
{
	/*IndexDBObject("cptTasks").OnDbReaady = function(indexDbObject)
	{
		indexDbObject.AddArray(tasksDemo).onsuccess = function(evt)
		{
			indexDbObject.AllTask().OnAllTasksGot = function(arr) {
				var list = CreateList(arr);
				console.log("CreateList");
				section.appendChild(list);
				section.setAttribute('class', "list-scrollable");
			};
		};
	};*/
}


function displayData() 
{
	var objectStore = db.transaction('cptTaskDB').objectStore('cptTaskDB');
    objectStore.openCursor().onsuccess = function(event)
    {
    	var cursor = event.target.result;
        // if there is still another cursor to go, keep runing this code
        if(cursor) 
        {
          // create a list item to put each data item inside when displaying it
          var listItem = document.createElement('li');
          
          // check which suffix the deadline day of the month needs
          /*if(cursor.value.day == 1 || cursor.value.day == 21 || cursor.value.day == 31) 
          {
            daySuffix = "st";
          }
          else if(cursor.value.day == 2 || cursor.value.day == 22) 
          {
            daySuffix = "nd";
          }
          else if(cursor.value.day == 3 || cursor.value.day == 23) 
          {
            daySuffix = "rd";
          }
          else
          {
            daySuffix = "th";  
          }*/
          
          // build the to-do list entry and put it into the list item via innerHTML.
          listItem.innerHTML = cursor.value.taskTitle + ' — ' + cursor.value.hours + ':' + cursor.value.minutes + ', ' + cursor.value.month + ' ' + cursor.value.day + daySuffix + ' ' + cursor.value.year + '.';
          
          if(cursor.value.notified == "yes") 
          {
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "rgba(255,0,0,0.5)";
          }

          // put the item item inside the task list
          taskList.appendChild(listItem);  
          
          // create a delete button inside each list item, giving it an event handler so that it runs the deleteButton()
          // function when clicked
          var deleteButton = document.createElement('button');
          listItem.appendChild(deleteButton);
          deleteButton.innerHTML = 'X';
          // here we are setting a data attribute on our delete button to say what task we want deleted if it is clicked! 
          deleteButton.setAttribute('data-task', cursor.value.taskTitle);
          deleteButton.setAttribute('data-alarmId', cursor.value.alarmId);
          deleteButton.onclick = function(event)
          {
            deleteItem(event);
          }
          
          // continue on to the next item in the cursor
          cursor.continue();
        
        // if there are no more cursor items to iterate through, say so, and exit the function 
        }
        else
        {
          console.log = "Entries all displayed.";
        }
      }
}