//Require dependencies
var GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const fetch = require("node-fetch");
var Mta = require("mta-gtfs");
//Epoch time to minutes
var minutes = (epoch) => {
	var myDate = new Date(epoch * 1000);
	var mins = myDate.getMinutes();
	return mins;
}
//Epoch time to date
var time = epochTime => myDate = new Date(epochTime * 1000);
/******************** FETCHING MTA DATA ********************/
var apiKey = "496acce84e029e8213c2aac23a2a6b25";
var mta = new Mta({ key: apiKey });
//Spring St (6 train)
mta.schedule(638, 1).then(function(result) {
	console.log(result.schedule[638].S[0].arrivalTime);
	var at = time(result.schedule[638].S[0].arrivalTime);
	console.log(at);
});