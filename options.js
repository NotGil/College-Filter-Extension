/**
 * Created by Gilberto on 7/24/2015.
 */

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
// Saves options to chrome.storage.sync.
//function save_options() {
//    console.log("adfjaldskfjal;s");
    //var color = document.getElementById('color').value;
    //var likesColor = document.getElementById('like').checked;
    //chrome.storage.sync.set({
    //    favoriteColor: color,
    //    likesColor: likesColor
    //}, function() {
    //    // Update status to let user know options were saved.
    //    var status = document.getElementById('status');
    //    status.textContent = 'Options saved.';
    //    setTimeout(function() {
    //        status.textContent = '';
    //    }, 750);
    //});
//}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
//function restore_options() {
//    // Use default value color = 'red' and likesColor = true.
//    chrome.storage.sync.get({
//        favoriteColor: 'red',
//        likesColor: true
//    }, function(items) {
//        document.getElementById('color').value = items.favoriteColor;
//        document.getElementById('like').checked = items.likesColor;
//    });
//}
//document.addEventListener('DOMContentLoaded', restore_options);
//document.getElementById('save').addEventListener('click',
//    save_options);


var numOfOptions=1;
var submitButton=document.getElementById("submit");
var addAnotherLink=document.getElementById("addSec");
document.getElementById('addSec').addEventListener('click',addMoreOptions);
function addMoreOptions(){
    var parent=document.getElementById("form");
    var div = document.createElement('div');

    div.className = 'criteria';
    var name=numOfOptions==1?"second":"third";
    div.id=name;
    div.innerHTML='<select id="option '+(numOfOptions+1)+'" name="'+name+'">'+
                       '<option selected="selected" value=null>--Select a criteria--</option>\
                        <option value="admission">Admission Rate</option>\
                        <option value="SATScores">SAT Scores</option>\
                        <option value="region">Region</option>\
                        <option value="netPrice">Net Price</option>\
                        <option value="religion">Religious Affiliation</option>\
                        <option value="ACTScores">ACT Scores</option>\
                    </select>\
                    <br>';
    switch (numOfOptions){
        case 1:
            document.getElementById('form').appendChild(div);
            parent.removeChild(addAnotherLink);
            parent.appendChild(addAnotherLink);
            parent.removeChild(submitButton);
            parent.appendChild(submitButton);
            option2();
            numOfOptions++;
            break;
        case 2:
            document.getElementById('form').appendChild(div);
            option3();
            var child=document.getElementById("addSec");
            parent.removeChild(child);
            parent.removeChild(submitButton);
            parent.appendChild(submitButton);
            numOfOptions++;
            break;

    }

}
function displayOption(whichOption,index){

    var parent=document.getElementById(whichOption);
    var div=document.createElement('div');
    div.className='userData';
    switch(index){
        case 1:
            try{
                var child=parent.lastElementChild;
                parent.removeChild(child);
            }catch(err){}
            console.log(whichOption);
            div.innerHTML='Admission Rate lower than <input type="text" name="admission">';
            parent.appendChild(div);
            break;
        case 2:
            try{
                var child=parent.lastElementChild;
                parent.removeChild(child);
            }catch(err){}
            div.innerHTML='Math SAT higher than <input type="text" name="SATScores" size="4"><br>\
                           Reading SAT Scores higher than <input type="text" name="SATScores" size="4"><br>\
                           Writing SAT Scores higher than <input type="text" name="SATScores" size="4">';
            parent.appendChild(div);
            break;
        case 3:
            try{
                var child=parent.lastElementChild;
                parent.removeChild(child);
            }catch(err){}
            //dropdown <select> menu
            div.innerHTML='<select name="region">\
                                <option value="SouthEast">SouthEast</option>\
                                <option value="Far West">Far West</option>\
                                <option value="Southwest">Southwest</option>\
                                <option value="Plains">Plains</option>\
                                <option value="Rocky Mountains">Rocky Mountains</option>\
                                <option value="New England">New England</option>\
                                <option value="Mid East">Mid East</option>\
                                <option value="Great Lakes">Great Lakes</option>\
                            </select>';
            parent.appendChild(div);
            break;
        case 4:
            //Net Price max
            break;
    }

}
var option1=document.getElementById("option 1");
var value1=null;
value1=option1.options[option1.selectedIndex].value;
var oldValue1=null;
option1.addEventListener('click',function(){
    oldValue1=value1;
    value1=option1.options[option1.selectedIndex].value;
    if(value1!=oldValue1){
        console.log("you changed the value of option 1 to: "+value1);
        displayOption("first",option1.selectedIndex);
    }

});
function option2(){
    var option2=document.getElementById("option 2");
    var value2=null;
    value2=option2.options[option2.selectedIndex].value;
    var oldValue2=null;
    option2.addEventListener('click',function(){
        oldValue2=value2;
        value2=option2.options[option2.selectedIndex].value;
        if(value2!=oldValue2){
            console.log("you changed the value of option 2 to: "+value2);
            displayOption("second",option2.selectedIndex);
        }

    });
}
function option3(){
    var option3=document.getElementById("option 3");
    var value3=null;
    value3=option3.options[option3.selectedIndex].value;
    var oldValue3=null;
    option3.addEventListener('click',function(){
        oldValue3=value3;
        value3=option3.options[option3.selectedIndex].value;
        if(value3!=oldValue3){
            console.log("you changed the value of option 3 to: "+value3);
            displayOption("third",option3.selectedIndex);
        }

    });
}

//catches the form submission event so it does not create a new window
var form = document.getElementById('form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    sendData();
    // You must return false to prevent the default form behavior
    return false;
}
/**
 * Creates and sends a http request for a list of colleges that do not meet the criteria
 *
 */
function sendData() {
    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;

    //// We turn the data object into an array of URL encoded key value pairs.
    //for(name in data) {
    //    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    //}

    var first=document.getElementsByName("first")[0];
    var second=document.getElementsByName("second")[0];
    var third=document.getElementsByName("third")[0];

    urlEncodedDataPairs.push(encodeURIComponent("first") + '=' + encodeURIComponent(first[first.selectedIndex].value));
    urlEncodedDataPairs.push(encodeURIComponent(first[first.selectedIndex].value) + '=' + encodeURIComponent(document.getElementsByName(first[first.selectedIndex].value)[0].value));

    // We combine the pairs into a single string and replace all encoded spaces to
    // the plus character to match the behaviour of the web browser form submit.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // We define what will happen if the data is successfully sent
    XHR.addEventListener('load', function(event) {
        alert('Yeah! Data sent and response loaded.');
    });

    // We define what will happen in case of error
    XHR.addEventListener('error', function(event) {
        alert('Oops! Something goes wrong.');
    });

    // We setup our request
    XHR.open('POST', 'http://localhost:3000/api/filter');

    // We add the required HTTP header to handle a form data POST request
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // And finally, We send our data.
    XHR.send(urlEncodedData);
    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(XHR.responseText);
            console.log(resp);
            sortInbox(resp);

        }
    }
}

/**
 * Gets a list of messages from the users inbox and checks if the messages are from the list
 * of unacceptables, if they are they are sent to the SPAM folder.
 *
 * @param {Array} theUnacceptables Array of domain names that the user does not want in their inbox
 */
function sortInbox(theUnacceptables){
    listMessages("me",".edu",10,function(response){
        console.log(response.messages);
        var messages=response.messages;
        for(var i=0;i<messages.length;i++){
            getFromAddress(messages[i].id,function(fromAddress,messageId){
                if(fromAddress==null){
                    console.log("do nothing with "+messageId);
                }else{
                    var flag=true;
                    for(var w=0;w<theUnacceptables.length;w++){
                        if(theUnacceptables[w].match("^"+fromAddress)!=null){ //if the from address is in the list of unwanted colleges dispose of it
                            console.log(fromAddress+" does not pass the set criteria "+theUnacceptables[w]);
                            moveToSpam(messageId);
                            //moveToSpam(messages[i].id);
                            flag=false;
                        }
                    }
                    if(flag){
                        console.log(fromAddress+" passes the set criteria");
                    }
                }

            });
        }
    });
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
        var regex=new RegExp('<.*@(.*.edu)>');
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
/**
 * Mark a message as spam and move away from inbox
 *
 * @param {String} messageId ID of Message to send to the spam folder
 */
function moveToSpam(messageId){
    console.log("move to spam running");
    modifyMessage("me",messageId,new Array("SPAM"),new Array("INBOX"),function(){console.log(messageId+" moved to spam");});
}