

const fetch = (url,method,load,callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback("error" + xhr.responseType);
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('id',load)
  xhr.send();
};

const fetchObj = (url,method,load,callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.status,'status');
      callback(null, xhr.status);
    } else {
      callback('error');
    }
  };
  xhr.open(method, url, true);
  xhr.send(load);
};
