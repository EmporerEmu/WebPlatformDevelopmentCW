$(document).ready(function () {
	let url = window.location.href.toString();
	var h3 = document.createElement("h3");
	var div = document.getElementById("shareDisplay");
    var date = new Date().toISOString().substring(0, 10);
	url = url.concat("/",date);
    h3.innerHTML = url;

	div.append(h3);
});
