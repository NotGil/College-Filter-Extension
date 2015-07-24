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
    document.getElementById('location').textContent = "Location: " +jsonObj[0].city+","+jsonObj[0].state;
    document.getElementById('description').textContent=formatDescription(jsonObj);
    document.getElementById('admissionRate').textContent = "Admission Rate: "+jsonObj[0].percentAdmitted.total+"%";
    document.getElementById('satm').textContent="SAT Math: "+jsonObj[0].sat.math25thPercentileScore+"-"+jsonObj[0].sat.math75thPercentileScore;
    document.getElementById('satr').textContent="SAT Reading: "+jsonObj[0].sat.reading25thPercentileScore+"-"+jsonObj[0].sat.reading75thPercentileScore;
    document.getElementById('satw').textContent="SAT Writing: "+jsonObj[0].sat.writing25thPercentileScore+"-"+jsonObj[0].sat.writing75thPercentileScore;


}
function formatDescription(j){
    //A large 4 year college located in a large city setting
    var description="";
    //Large four-year, primarily nonresidential
    var bit= j[0].carnegieClassification.sizeSetting;
    var size=bit.split(",")[0];
    size=size.toLowerCase();
    //"City: Large"
    var tidbit=j[0].urbanization;
    var split=tidbit.split(":");
    var urbanization=split[1]+ " "+ split[0];
    urbanization=urbanization.toLowerCase();
    description="A "+size+" college located in a "+urbanization+" setting";
    return description;
}