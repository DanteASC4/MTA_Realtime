/* global $ */
/**** GET CURRENT TIME  ****/
function checkTime(i) {
  //format single-digit time like 03
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function startTime() {
  //Date object with time information
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  //single-digit formatting ^^^
  if (h > 12) {
    h = h - 12;
  }
  h = checkTime(h);
  m = checkTime(m);
  document.getElementById('time').innerHTML = h + ":" + m;
  t = setTimeout(function() {
    startTime(); //get every half-minute
  }, 30000);
}
startTime();
/**** GET CURRENT DATE  ****/
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd;
} 
if(mm<10){
  mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;
document.getElementById("date").innerHTML = today;
/**** MAIN MTA REQUEST  ****/
function makeRequest() {
  $.getJSON("http://127.0.0.1:5000", function (data) {// Object { downtown_canal: […], downtown_houston: […], downtown_spring: […], uptown_canal: [], uptown_houston: [], uptown_spring: […] }
    for(var i = 0; i < 3; i++) {
      //console.log(data.downtown_canal[i]); // Object { Route: "1", arrival_time: "21:53:45", delta: "0:03:17", direction: "DOWNTOWN", station: "Canal St" }
      $("#canal ul").append(
        '<li class="update"> \
          <div> \
            <img src="assets/img/1.jpg" class="train-logo" align="middle" /> \
            <h3>' + data.downtown_canal[i].direction + ' - ' + data.downtown_canal[i].delta.substr(2, 2) + ' mins</h3> \
          </div> \
        </li><br>'
      );
      console.log(data.downtown_canal[i]);
    }
  });
}
makeRequest();
setInterval(makeRequest, 30000);