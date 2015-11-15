//used to sign in to the users google account in order to use the GmailAPI
var signin = function (callback) {
    chrome.identity.getAuthToken({interactive: true}, callback);
};

function onGoogleLibraryLoaded() {
    signin(authorizationCallback);

}

var authorizationCallback = function (data) {
    gapi.auth.setToken({access_token: data});
    gapi.client.load('gmail', 'v1', function () {
        console.log("api loaded");
    });
};
//creates an http request for information on a certain university
function find(UniversityName,fn) {
    var xhr = new XMLHttpRequest();
    var url="http://collegefilter.azurewebsites.net/api/University/"+UniversityName+"/";
    console.log(url);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // resp is the response from that request
            try{
                var resp = JSON.parse(xhr.responseText);
                console.log(resp);
                fn(resp);
            }catch (err){
                fn(null);
            }

        }
    }
    xhr.send();
}
function getBlockedList(urlEncodedData,destinationLabel,callback){
    var XHR = new XMLHttpRequest();
    // We define what will happen if the data is successfully sent
    XHR.addEventListener('load', function(event) {
        //alert('Yeah! Data sent and response loaded.');
    });

    // We define what will happen in case of error
    XHR.addEventListener('error', function(event) {
        //alert('Oops! Something goes wrong.');
    });

    // We setup our request
    XHR.open('POST', 'http://collegefilter.azurewebsites.net/api/filter');

    // We add the required HTTP header to handle a form data POST request
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // And finally, We send our data.
    XHR.send(urlEncodedData);
    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            if (XHR.status === 200) {
                var resp = JSON.parse(XHR.responseText);
                console.log(resp);
                sortInbox(resp,destinationLabel);
            } else {
                calback("error");
                console.log(XHR.responseText);
            }


        }
    }
}

var destination;
var messagesToBeModified=new Array();
var domainsMoved=new Array();
/**
 * Gets a list of messages from the users inbox and checks if the messages are from the list
 * of unacceptables, if they are they are sent to the SPAM folder.
 *
 * @param {Array} theUnacceptables Array of domain names that the user does not want in their inbox
 */
function sortInbox(theUnacceptables,destinationLabel){
    destination=destinationLabel;
    listAllMessages("me",".edu",function(response){
        console.log(response);
        var messages=response;

        for(var i=0;i<messages.length;i++){
            getFromAddress(messages[i].id,function(fromAddress,messageId){
                if(fromAddress==null){
                    console.log("do nothing with "+messageId);
                }else{
                    if(fromAddress.indexOf(".")!=-1){
                        fromAddress=fromAddress.split("\.");
                        fromAddress=fromAddress[fromAddress.length-1];
                    }
                    var flag=true;
                    for(var w=0;w<theUnacceptables.length;w++){
                        if(theUnacceptables[w].match("^"+fromAddress+"\.edu")!=null){ //if the from address is in the list of unwanted colleges dispose of it
                            console.log(fromAddress+" does not pass the set criteria "+theUnacceptables[w]);
                            messagesToBeModified.push(messageId);
                            if(domainsMoved.indexOf(fromAddress+".edu")==-1){
                                domainsMoved.push(fromAddress+".edu");
                            }

                            flag=false;
                        }
                    }
                    if(flag){
                        console.log(fromAddress+" passes the set criteria");
                    }
                }
                if(i==messages.length){
                    console.log("this actually ran");
                    executeRequests();
                }
            });
        }

    });

}
/**
 * Moves the message from the Inbox to the folder that was selected prior
 *
 * @param {String} messageId ID of Message to send to the spam folder
 */
function moveToLabel(messageId,label){
    modifyMessage("me",messageId,new Array(label),new Array("INBOX"),function(){console.log(messageId+" moved to "+label);});
}
/**
 * Get the from address from a message, if the address is in <name@domain.edu> format
 *
 * @param {String} messageId the ID of the message that you want a from address for
 * @param {Function} callback Function to call when the request is complete.
 */
function getFromAddress(messageId,callback){
    var request=gapi.client.gmail.users.messages.get({
        'userId':'me',
        'id':messageId,
        'fields': 'payload'
    });
    request.execute(function(message){
        var headers=message.payload.headers;
        var regex=new RegExp('<.*@(.*).edu>');
        for(var i=0;i<headers.length;i++){
            if (headers[i].name == 'From'){
                //console.log("from header value: "+headers[i].value);
                var match=regex.exec(headers[i].value);
                //console.log("regex object: "+match);
                //console.log(match[1]);
                try{
                    callback(match[1],messageId);
                }
                catch(e){
                    if (e instanceof TypeError) {
                        callback(null,messageId);
                        console.log(e);
                    }
                }
            }

        }
    });
}

var numOfExecutions=0;
function executeRequests(){
    var execute=setInterval(function(){
        numOfExecutions++;
        var messageId=messagesToBeModified.pop();
        if(messageId){
            moveToLabel(messageId,destination);
        }
        if(messageId==null){
            clearInterval(execute);
        }
    },100);

}