function find(UniversityName) {
    var apiUrl="http://localhost:3000/api/University";
    var id = UniversityName;
    $.getJSON(apiUrl + '/' + id)
        .done(function (data) {
            //console.log("find method "+data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log("error");
        });
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var temp=returnAPromise(23).value()+5;
      console.log(temp);
    find(request.university);
  });
function returnAPromise(i){
    return Promise.resolve(i+5);
}
