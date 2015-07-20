function find(UniversityName, fn) {
    var apiUrl="http://localhost:3000/api/University";
    var id = UniversityName;
    $.getJSON(apiUrl + '/' + id)
        .done(function (data) {
            //console.log("find method "+data);
            fn(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log("error");
        });
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //find(request.university,function(data){
    //    sendResponse({res: data});
    //    console.log(data);
    //});
      var apiUrl="http://localhost:3000/api/University";
      var id = request.university;
      $.getJSON(apiUrl + '/' + id)
          .done(function (data) {
              console.log(data);
              sendResponse(data);
          })
          .fail(function (jqXHR, textStatus, err) {
              console.log("error");
          });


  });