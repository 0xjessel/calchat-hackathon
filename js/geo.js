function initiate_geolocation() {
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
	} else {
		yqlgeo.get('visitor', normalize_yql_response);
	}
}
			
function handle_geolocation_query(position) {
	var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +  
                    position.coords.longitude + "&zoom=16&size=300x400&markers=color:blue|label:S|" +  
                    position.coords.latitude + ',' + position.coords.longitude;  
  
	jQuery(document.getElementById("map")).attr("src", image_url);
}
			
function handle_errors(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED: 
			alert("user did not share geolocation");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("could not detect current position");
			break;
		case error.TIMEOUT:
			alert("retrieving position timed out");
			break;
		default:
			alert("unknown error");
			break;
	}
}

function normalize_yql_response(response) {
	if (response.error) {
		var error = {code:0};
		handle_error(error);
		return;
	}
	
	var position = {
		coords: {
			latitude: response.place.centroid.latitude,
			longitude: response.place.centroid.longitude
		},
		address: {
			city: response.place.locality2.content,
			region: response.place.admin1.content,
			country: response.place.country.content
		}
	};
	
	handle_geolocation_query(position);
}