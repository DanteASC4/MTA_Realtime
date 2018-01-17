#import dependencies
import time, datetime, os, socket, json
from google.transit import gtfs_realtime_pb2
from urllib.request import urlopen
#epoch time to mintues
def epoch_to_time(epoch):
	return str(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(epoch)))
#fetches mta data
def fetch_data(feed_id, station_id, station_name, direction):
	times = []
	feed = gtfs_realtime_pb2.FeedMessage()
	response = urlopen('http://datamine.mta.info/mta_esi.php?key=%s&feed_id=%d' % ('496acce84e029e8213c2aac23a2a6b25', feed_id))
	feed.ParseFromString(response.read())
	for i in range(len(feed.entity)):
		stop_time_update = feed.entity[i].trip_update.stop_time_update
		for j in range((len(stop_time_update))):
			if stop_time_update[j].stop_id == station_id:
				current = str(datetime.datetime.now())[11:19]; FMT = '%H:%M:%S';
				arrival = epoch_to_time(stop_time_update[j].arrival.time)[11:19]
				tdelta = datetime.datetime.strptime(arrival, FMT) - datetime.datetime.strptime(current, FMT)
				times.append(json.dumps({
					"station": station_name,
					"direction": direction,
					"Route": feed.entity[i].trip_update.trip.route_id,
					"arrival_time": arrival,
					"delta": str(tdelta)
				}))
	return times
#putting everything together
def main():
	nexttime = time.time()
	while True:
		print("server running, yo")
		###################################
		### SPRING ST (E, C, ~A) ##########
		###################################
		return fetch_data(26, "A33N", "Spring St", "UPTOWN")
		return fetch_data(26, "A33S", "Spring St", "DOWNTOWN")
		###################################
		### HOUSON ST (1, ~2, ~3) #########
		###################################
		return fetch_data(1,  "134N", "Houston St", "UPTOWN")
		return fetch_data(1,  "134S", "Houston St", "DOWNTOWN")
		###################################
		### CANAL ST (1, 2, 3, A, C, E) ###
		###################################
		return fetch_data(1,  "135N", "Canal St", "UPTOWN")
		return fetch_data(1,  "135S", "Canal St", "DOWNTOWN")
		#fetch data every 60 seconds
		nexttime += 60
		sleeptime = nexttime - time.time()
		if sleeptime > 0:
			time.sleep(sleeptime)
#run script
main()