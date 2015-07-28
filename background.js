function find(UniversityName,fn) {

    var xhr = new XMLHttpRequest();
    var url="http://collegefilter.azurewebsites.net/api/University/"+UniversityName+"/";
    console.log(url);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            //if(resp[0].name==null) {
            ////send error report here
            //}
            //else{
                fn(resp);
            //}
        }
    };
    xhr.send();
}
