/**
 * Created by Gilberto on 7/24/2015.
 */
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

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    var formElement = document.getElementById("form");
    sendData(formElement);
    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
function sendData(formElement) {
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
        alert('Oups! Something goes wrong.');
    });

    // We setup our request
    XHR.open('POST', 'http://localhost:1337/api/filter');

    // We add the required HTTP header to handle a form data POST request
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // And finally, We send our data.
    XHR.send(urlEncodedData);
    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(XHR.responseText);
            console.log(resp);
            listMessages("me",".edu",50,function(response){console.log(response)});
        }
    }
}