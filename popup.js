var signin = function (callback) {
    chrome.identity.getAuthToken({interactive: true}, callback);
};

function onGoogleLibraryLoaded() {
    signin(authorizationCallback);
}

var authorizationCallback = function (data) {
    gapi.auth.setToken({access_token: data});
    gapi.client.load('gmail', 'v1', function () {
        //console.log("api loaded");
        getFromAddress();
    });
};
function getHashFromUrl(url) {
    return url.substr(url.lastIndexOf("#") + 1);
}
var getMessageIdFromUrl = function (url) {
    var hash = getHashFromUrl(url);
    return hash.substr(hash.lastIndexOf("/") + 1);
};
var tablink;
chrome.tabs.getSelected(null,function(tab){
    tablink = tab.url;
    //console.log(tablink);
});
function getFromAddress(){
    var messageId=getMessageIdFromUrl(tablink);
    var request=gapi.client.gmail.users.messages.get({
        'userId':'me',
        'id':messageId,
        'fields': 'payload'
    });
    request.execute(function(message){
        var headers=message.payload.headers;
        var regex=new RegExp('@(.*).edu>');
        for(var i=0;i<headers.length;i++){
             if (headers[i].name == 'From'){
                 //console.log(headers[i].value);
                 var match=regex.exec(headers[i].value);
                 console.log(match);
                 //console.log(match[1]);
                 chrome.extension.getBackgroundPage().find(match[1],function(r){
                     displayInfo(r);
                     console.log(r);
                 });
             }
                 
         }
    });
}
function displayInfo(jsonObj){
    document.getElementById('name').textContent = "Name: "+ jsonObj[0].name;
    document.getElementById('city').textContent = "City: " +jsonObj[0].city;
    document.getElementById('state').textContent = "State: "+jsonObj[0].state;
    document.getElementById('admissionRate').textContent = "Admission Rate: "+jsonObj[0].percentAdmitted.total+"%";


}