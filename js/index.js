'use strict'
var mySearch = "";

function getSearch () {
  mySearch = document.getElementById("searchInput").value;
  
  console.log(typeof(mySearch));
  if (mySearch == null || mySearch.trim() == "") {
	  window.open("https://en.wikipedia.org/wiki/Special:Random");
    return null;
  };
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
  
  // Worst API documentation ever, but finally got this working
  // **IDEA** - allow user to decide how many articles to display (limit=2 looks like the URL piece to play with for this)
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&search=' + mySearch + '&callback=?', function(response) {
    if (typeof response[1] == undefined || response[1].length < 1) {
      alert("Your search returned no results.");
      return null;
    }
    loadResults(response);
  });
}

function loadResults(myResults) {
  console.log(myResults);
  for (var i = 0; i < myResults[1].length; i++) {
    var a = document.createElement("a");
    a.href = myResults[3][i];
    a.target="_blank";
    a.id="a"+(i+1);
    a.className="myLinks";
    document.getElementById("results").appendChild(a);
    var div = document.createElement("div");
    div.id = "div"+(i+1); //I DONT THINK I NEED THIS, TEST IT LATER
    div.className = "resultsDiv";
    div.style.width = "95%";
    div.style.height = "100px";
    div.style.background = "white";
    div.style.color = "grey";
    document.getElementById(a.id).appendChild(div);
    var h4 = document.createElement("h4");
    h4.className = "resultsHead";
    h4.innerHTML = myResults[1][i]; //Article title
    document.getElementById(div.id).appendChild(h4);
    var p = document.createElement("p");
    p.className = "resultsBody";
    p.innerHTML = myResults[2][i];
    document.getElementById(div.id).appendChild(p);
  }
}

//Hover for random instructions
$("#searchInput").hover(function() {
  $("#randomInstruct").fadeTo(250, 1);
}, function() {
  $("#randomInstruct").fadeTo(350, 0);
});