function find(UniversityName,fn) {
    var xhr = new XMLHttpRequest();
    var url="http://localhost:3000/api/University/"+UniversityName;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            fn(resp);
        }
    };
    xhr.send();
}
