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
document.getElementById('addSec').addEventListener('click',addMoreOptions);
function addMoreOptions(){
    var div = document.createElement('div');

    div.className = 'option';

    div.innerHTML = '<select id="option '+(numOfOptions+1)+'">'+
                        '<option selected="selected">--Select a criteria--</option>\
                        <option >Admission Rate</option>\
                        <option>SAT Scores</option>\
                        <option>Region</option>\
                        <option>Net Price</option>\
                        <option>Diversity</option>\
                        <option>Religious Affiliation</option>\
                        <option>ACT Scores</option>\
                    </select>\
                    <br>';
    console.log(numOfOptions);

    numOfOptions++;
    switch(numOfOptions){
        case 1:
            document.getElementById('content').appendChild(div);
            var value2=null;
            var oldValue2=null;
            var option2=document.getElementById("option 2");
            option2.addEventListener('click',function(){
                oldValue2=value2;
                value2=option2.options[option2.selectedIndex].value;
                if(value2!=oldValue2){
                    console.log("you changed the value to: "+value2);
                }

            });
            numOfOptions++;
            break;
        case 2:
            document.getElementById('content').appendChild(div);
            var value3=null;
            var oldValue3=null;
            var option3=document.getElementById("option 3");
            option3.addEventListener('click',function(){
                oldValue3=value3;
                value3=option3.options[option3.selectedIndex].value;
                if(value3!=oldValue3){
                    console.log("you changed the value to: "+value3);
                }

            });
            var parent=document.getElementById("container");
            var child=document.getElementById("addSec");
            parent.removeChild(child);
            numOfOptions++;
            break;
    }

}
var value1=null;
var oldValue1=null;
var option1=document.getElementById("option 1");
option1.addEventListener('click',function(){
    oldValue1=value1;
    value1=option1.options[option1.selectedIndex].value;
    if(value1!=oldValue1){
        console.log("you changed the value to: "+value1);
    }

});
