var locations = [];
var map;
var infoWindow;

function initMap()   
	{   
		var coords = new google.maps.LatLng(51.110216, 17.032969);
		var mapOptions = {
		  zoom: 15,
		  center: coords,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  disableDefaultUI: true,
          disableDoubleClickZoom: true,
		  mapTypeControl: true,
		  mapTypeControlOptions:  
		 {  
			mapTypeIds: [  
				google.maps.MapTypeId.ROADMAP,  
				google.maps.MapTypeId.SATELLITE,  
				google.maps.MapTypeId.TERRAIN  
			],
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		},
		 scaleControl: true,  
		 navigationControl: true,
    navigationControlOptions:  
    {  
        style: google.maps.NavigationControlStyle.SMALL
    }
		};
		map = new google.maps.Map(document.getElementById("map"), mapOptions); 
        
        google.maps.event.addListener(map, "dblclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            addMarker(lat, lng);
        });
	}

function addMarker(lat, lng) {
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map
    });
    locations.push({lat: lat, lng: lng, marker: marker});
    appendToList(locations.length - 1, locations[locations.length - 1])
}

function appendToList(index, location) {
    $("#table").append(newListItem(location));
    $("#table tr td:last button:first").on("click", function () {
        showInfo(index);
    });
    $("#table tr td:last button:last").on("click", function () {
        removeItem(index);
    });
}

function newListItem(location) {
    return "<tr class='added'><td>" + location.lat + "</td>, <td>" + location.lng + "</td>  <td><button>Pokaz</button>  <button>Usun</button></td></tr>";
}

function showInfo(index) {
    if (infoWindow) {
        infoWindow.close();
    }
    infoWindow = new google.maps.InfoWindow({
        content: "To tutaj!"
    });
    infoWindow.open(map, locations[index].marker);
}

function removeItem(index) {
    locations[index].marker.setMap(null);
    locations.splice(index, 1);
    updateList();
}

function updateList() {
    $("#table .added").remove();
    $.each(locations, function (index, location) {
        appendToList(index, location);
    });
}
