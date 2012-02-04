jQuery(window).ready(function() {
	jQuery("#btnInit").click(initiate_geolocation);
});
			
function initiate_geolocation() {
	navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
}
			
function handle_geolocation_query(position) {
	alert('Lat: ' + position.coords.latitude + ' ' + 
		  'Lon: ' + position.coords.longitude);
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