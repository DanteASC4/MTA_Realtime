//Referencing dependencies and setting link for request package
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var requestSettings = {
  method: 'GET',
  url: ' http://datamine.mta.info/mta_esi.php?key=496acce84e029e8213c2aac23a2a6b25&feed_id=26',
  encoding: null
};
var Mta = require('mta-gtfs');
const fetch = require('node-fetch');
//var apiKeys = require('./config')

/*
NOTE: This is just trying to add all the dependencies with require.js so it works on a web server, will most likely just try to add them to package.json
require(['gtfs-realtime-bindings'], function(gtfsrealtimebindings){
  NOTE: Could be useful:https://javascriptexamples.info/code/mta.info-gtfs/
})
require(['request'], function(request){});
require(['mta-gtfs'], function(mtagtfs){})
require(['node-fetch'], function(nodefetch){})
*/

//Setting the api key for mta gtfs lib
var mta = new Mta({
  key: '496acce84e029e8213c2aac23a2a6b25', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

// All subway service updates
// mta.status('subway').then(function (result) {
// console.log(result);
// });

// Getting the ids, name, and lat/long for all subway stops, might be able to use geo JSON to convert long/lat
// mta.stop().then(function (result) {
// console.log(result);
// }).catch(function (err) {
// console.log(err);
// });

// This SHOULD given a single subway stop id (or an array of stop ids) and an optional feedId,
// give schedule data for both northbound and southbound trains. But it doesn't seem to be working correctly, will tinker with it more.

//Function to get minutes from epoch time
var minutes = (epoch) => {
  var myDate = new Date( epoch * 1000);
  var mins = myDate.getMinutes();
  return mins;
}
//Function to get date from epoch time
var time = epochTime => myDate = new Date( epochTime * 1000)

//This Targets one stop, with an ID of 638, if you check the route ID json file you'll see it's the spring street stop for the six, the result is schedule, which has two arrays, North and southbound
mta.schedule(638, 1).then(function (result) {
  //This is logging the arrivaltime of the second indexed arrival time for the southbound direction
  console.log(result.schedule[638].S[1].arrivalTime);
  //this is me setting a variable equal to the arrival time converted to a normal date with my above functions
  var bob = time(result.schedule[638].S[1].arrivalTime)
  //Console logging it!
  console.log(bob)
  //The data is outputted weirdly, but you can still access it with dot notation and array indexing, it seems to be a clutter of objects and nested arrays, which is annoying to sort through but not too bad.
});
//Ajax seems to not work, gonna try something else