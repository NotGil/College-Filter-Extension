
//creates an http request for information on a certain university
function find(UniversityName,fn) {

    var xhr = new XMLHttpRequest();
    var url="http://collegefilter.azurewebsites.net/api/University/"+UniversityName+"/";
    console.log(url);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // resp is the response from that request
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            //if(resp[0].name==null) {
            ////send error report here
            //}
            //else{
                fn(resp);
            //}
        }
    }
    xhr.send();
}

