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
        fillDestinationSelection();
    });
};
// Saves options to chrome.storage.sync.
function save_options() {
    console.log("adfjaldskfjal;s");
    var testScores;
    if (document.getElementById('SAT').checked) {
        testScores = document.getElementById('SAT').value;
    }else{
        testScores = document.getElementById('ACT').value;
    }
    chrome.storage.sync.set({
        scores:testScores
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        scores: 'SAT'
    }, function(items) {
        if(items.scores=='SAT'){
            document.getElementById('SAT').checked=true;
        }else {
            document.getElementById('ACT').checked = true;
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('SAT').addEventListener('click',
    save_options);
document.getElementById('ACT').addEventListener('click',
    save_options);


var numOfOptions=1;
var submitButton=document.getElementById("submit");

function fillDestinationSelection(){
    listLabels("me",function(resp){
        var selectList=document.getElementById("destination");
       for(var i=0;i<resp.length;i++){
           //console.log(resp[i].type);
           if(resp[i].type=="user"){
               var option=document.createElement("option");
               option.value=resp[i].id;
               option.text=resp[i].name;
               selectList.appendChild(option);
           }

       }
    });

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
            div.innerHTML='Move emails with admission rates higher than <input type="text" name="admission" maxlength="2" size="1">%';
            parent.appendChild(div);
            break;
        case 2:
            try{
                var child=parent.lastElementChild;
                parent.removeChild(child);
            }catch(err){}
            //dropdown <select> menu
            div.innerHTML='Move emails that are NOT from the <select name="region">\
                                <option selected="selected"value=null>--Select a region--</option>\
                                <option value="Southeast AL AR FL GA KY LA MS NC SC TN VA WV">SouthEast</option>\
                                <option value="Far West AK CA HI NV OR WA">Far West</option>\
                                <option value="Southwest AZ NM OK TX">Southwest</option>\
                                <option value="Plains IA KS MN MO NE ND SD">Plains</option>\
                                <option value="Rocky Mountains CO ID MT UT WY">Rocky Mountains</option>\
                                <option value="New England CT ME MA NH RI VT">New England</option>\
                                <option value="Mid East DE DC MD NJ NY PA">Mid East</option>\
                                <option value="Great Lakes IL IN MI OH WI">Great Lakes</option>\
                            </select>';
            parent.appendChild(div);
            break;
        case 3:
        {
            try{
                var child=parent.lastElementChild;
                parent.removeChild(child);
            }catch(err){}
            //dropdown <select> menu
            div.innerHTML='Move emails that are NOT <select name="religion">\
                                <option selected="selected"value=null>--Select a religious affiliation--</option>\
                                <option value="African Methodist Episcopal Zion Church">African Methodist Episcopal Zion Church</option>\
                                <option value="African Methodist Episcopal">African Methodist Episcopal</option>\
                                <option value="American Baptist">American Baptist</option>\
                                <option value="American Evangelical Lutheran Church">American Evangelical Lutheran Church</option>\
                                <option value="Assemblies of God Church">Assemblies of God Church</option>\
                                <option value="Baptist">Baptist</option>\
                                <option value="Brethren Church">Brethren Church</option>\
                                <option value="Christ and Missionary Alliance Church">Christ and Missionary Alliance Church</option>\
                                <option value="Christian Church Disciples of Christ">Christian Church Disciples of Christ</option>\
                                <option value="Christian Churches and Churches of Christ">Christian Churches and Churches of Christ</option>\
                                <option value="Christian Methodist Episcopal">Christian Methodist Episcopal</option>\
                                <option value="Christian Reformed Church">Christian Reformed Church</option>\
                                <option value="Church of Brethren">Church of Brethren</option>\
                                <option value="Church of God">Church of God</option>\
                                <option value="Church of the Nazarene">Church of the Nazarene</option>\
                                <option value="Churches of Christ">Churches of Christ</option>\
                                <option value="Cumberland Presbyterian">Cumberland Presbyterian</option>\
                                <option value="Episcopal Church Reformed">Episcopal Church Reformed</option>\
                                <option value="Evangelical Christian">Evangelical Christian</option>\
                                <option value="Evangelical Congregational Church">Evangelical Congregational Church</option>\
                                <option value="Evangelical Covenant Church of America">Evangelical Covenant Church of America</option>\
                                <option value="Evangelical Free Church of America">Evangelical Free Church of America</option>\
                                <option value="Evangelical Lutheran Church">Evangelical Lutheran Church</option>\
                                <option value="Free Methodist">Free Methodist</option>\
                                <option value="Free Will Baptist Church">Free Will Baptist Church</option>\
                                <option value="Friends">Friends</option>\
                                <option value="Greek Orthodox">Greek Orthodox</option>\
                                <option value="Interdenominational">Interdenominational</option>\
                                <option value="Jewish">Jewish</option>\
                                <option value="Latter Day Saints Mormon Church">Latter Day Saints Mormon Church</option>\
                                <option value="Lutheran Church - Missouri Synod">Lutheran Church - Missouri Synod</option>\
                                <option value="Lutheran Church in America">Lutheran Church in America</option>\
                                <option value="Mennonite Brethren Church">Mennonite Brethren Church</option>\
                                <option value="Mennonite Church">Mennonite Church</option>\
                                <option value="Missionary Church Inc">Missionary Church Inc</option>\
                                <option value="Moravian Church">Moravian Church</option>\
                                <option value="Multiple Protestant Denomination">Multiple Protestant Denomination</option>\
                                <option value="North American Baptist">North American Baptist</option>\
                                <option value="Original Free Will Baptist">Original Free Will Baptist</option>\
                                <option value="Other Protestant">Other Protestant</option>\
                                <option value="Pentecostal Holiness Church">Pentecostal Holiness Church</option>\
                                <option value="Presbyterian Church USA">Presbyterian Church USA</option>\
                                <option value="Presbyterian">Presbyterian</option>\
                                <option value="Protestant Episcopal">Protestant Episcopal</option>\
                                <option value="Reformed Church in America">Reformed Church in America</option>\
                                <option value="Reformed Presbyterian Church">Reformed Presbyterian Church</option>\
                                <option value="Roman Catholic">Roman Catholic</option>\
                                <option value="Russian Orthodox">Russian Orthodox</option>\
                                <option value="Seventh Day Adventists">Seventh Day Adventists</option>\
                                <option value="Southern Baptist">Southern Baptist</option>\
                                <option value="The Presbyterian Church in America">The Presbyterian Church in America</option>\
                                <option value="Undenominational">Undenominational</option>\
                                <option value="Unitarian Universalist">Unitarian Universalist</option>\
                                <option value="United Brethren Church">United Brethren Church</option>\
                                <option value="United Church of Christ">United Church of Christ</option>\
                                <option value="United Methodist">United Methodist</option>\
                                <option value="Wesleyan">Wesleyan</option>\
                                <option value="Wisconsin Evangelical Lutheran Synod">Wisconsin Evangelical Lutheran Synod</option>\
                                <option value="Not applicable">Not applicable</option>\
                                <option value="Other none of the above">Other</option>\
                            </select>';
            parent.appendChild(div);
            break;}
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

//catches the form submission event so it does not create a new window
var form = document.getElementById('form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    if(validateForm()){
        document.getElementById("submit").disabled=true;
        sendData();
    }else{
        //displayError("Please Complete Form");
    }

    // You must return false to prevent the default form behavior
    return false;
}
function validateForm(){
    var option1=document.getElementById("option 1");
    var destinationFolder=document.getElementById("destination");
    if(option1.selectedIndex==0){
        return false;
    }
    else{
        //check for input for admission,region,and religion
        if(option1.selectedIndex==1){
            var num=(document.getElementsByName("admission")[0].value);
            if(isNaN(num)||num==""){
                return false;
            }
        }
        else{
            var list=document.getElementsByName(option1.options[option1.selectedIndex].value)[0];
            if(list.selectedIndex==0){
                return false;
            }
        }

    }
    if(destinationFolder.selectedIndex==0){
        return false;
    }
    return true;

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
    XHR.open('POST', 'http://collegefilter.azurewebsites.net/api/filter');
    //XHR.open('POST', 'http://localhost:3000/api/filter');

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
                sortInbox(resp);
            } else {
                document.getElementById("statusText").innerHTML="Error:"+XHR.statusText+" "+XHR.responseText;
                console.log(XHR.responseText);
            }


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
    listAllMessages("me",".edu",function(response){
        console.log(response);
        var messages=response;
        for(var i=0;i<messages.length;i++){
            getFromAddress(messages[i].id,function(fromAddress,messageId){
                if(fromAddress==null){
                    console.log("do nothing with "+messageId);
                }else{
                    var flag=true;
                    for(var w=0;w<theUnacceptables.length;w++){
                        if(theUnacceptables[w].match("^"+fromAddress)!=null){ //if the from address is in the list of unwanted colleges dispose of it
                            console.log(fromAddress+" does not pass the set criteria "+theUnacceptables[w]);
                            getDestinationLabel();
                            moveToLabel(messageId);
                            flag=false;
                        }
                    }
                    if(flag){
                        console.log(fromAddress+" passes the set criteria");
                    }
                }

            });
        }
        document.getElementById("submit").disabled=false;
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
 * Moves the message from the Inbox to the folder that was selected prior
 *
 * @param {String} messageId ID of Message to send to the spam folder
 */
function moveToLabel(messageId){
    var label=getDestinationLabel();
    modifyMessage("me",messageId,new Array(label),new Array("INBOX"),function(){console.log(messageId+" moved to "+label);});
}
function getDestinationLabel(){
    var selectList=document.getElementById("destination");
    selected=selectList.options[selectList.selectedIndex].value;
    return selected;
}