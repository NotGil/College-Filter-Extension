/**
 * Created by Gilberto on 7/24/2015.
 */
// Saves options to chrome.storage.sync.
function save_options() {
    console.log("adfjaldskfjal;s");
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
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
        favoriteColor: 'red',
        likesColor: true
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('region').addEventListener('click',function(){
    var state=document.getElementById('region').checked;
    var dropdown=document.getElementById('_region');
    if(state==true){
        dropdown.setAttribute('class','optional');
    }else{
        dropdown.setAttribute('class','hide');
    }
});
document.getElementById('testScores').addEventListener('click',function(){
    var state=document.getElementById('testScores').checked;
    var dropdown=document.getElementById('_testScores');
    if(state==true){
        dropdown.setAttribute('class','optional');
    }else{
        dropdown.setAttribute('class','hide');
    }
});
document.getElementById('sat').addEventListener('click',function(){
    var state=document.getElementById('sat').checked;
    var max=document.getElementById('_sat');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('act').addEventListener('click',function(){
    var state=document.getElementById('act').checked;
    var max=document.getElementById('_act');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('type').addEventListener('click',function(){
    var state=document.getElementById('type').checked;
    var max=document.getElementById('_type');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('religion').addEventListener('click',function(){
    var state=document.getElementById('religion').checked;
    var max=document.getElementById('_religion');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('histblack').addEventListener('click',function(){
    var state=document.getElementById('histblack').checked;
    var max=document.getElementById('_histblack');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('setting').addEventListener('click',function(){
    var state=document.getElementById('setting').checked;
    var max=document.getElementById('_setting');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
document.getElementById('credits').addEventListener('click',function(){
    var state=document.getElementById('credits').checked;
    var max=document.getElementById('_credits');
    if(state==true){
        max.setAttribute('class','optional');
    }else{
        max.setAttribute('class','hide');
    }
});
