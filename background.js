function find(UniversityName) {
    var apiUrl="http://localhost:1337/api/University";
    var id = UniversityName;
    $.getJSON(apiUrl + '/' + id)
        .done(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log("error");
        });
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    find(request.university);
    sendResponse({farewell: "goodbye"});
  });