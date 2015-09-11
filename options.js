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

    div.innerHTML = '<select >\
                        <option selected="selected">--Select a criteria--</option>\
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
    if(numOfOptions<=2){
        document.getElementById('content').appendChild(div);
        if(numOfOptions==2){
            var parent=document.getElementById("container");
            var child=document.getElementById("addSec");
            parent.removeChild(child);
        }
        numOfOptions++;
    }

}
//document.getElementById("option1").valueOf()
