var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MapController', ['mapResource', '$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', function(mapResource, $scope, uiGmapGoogleMapApi, uiGmapIsReady) {

    var trailArray = mapResource.get();
    // North Bend is at the following lat, long
    var centerLatitude = document.getElementById('startPointLat') || 47.4957;
    var centerLongitude = document.getElementById('startPointLon') || -121.7868;
    var zoom = document.getElementById('startZoom') || 8;
    // 50 miles = 80450 meters
    var drivingRadius = document.getElementById('drivingRadius') || 80450;

    $scope.map = {
      center: {
        latitude: centerLatitude,
        longitude: centerLongitude
      },
      zoom: zoom,
      bounds: {}
    };

    $scope.circles = [{
      id: 1,
      center: {
        latitude: centerLatitude,
        longitude: centerLongitude
      },
      radius: drivingRadius,
      stroke: {
        color: '#000000',
        weight: 2,
        opacity: 0.5
      },
      fill: {
        color: '#BADA55',
        opacity: 0.2
      },
      geodesic: true, // optional: defaults to false
      draggable: false, // optional: defaults to false
      clickable: false, // optional: defaults to true
      editable: false, // optional: defaults to false
      visible: true, // optional: defaults to true
      control: {}
    }];

    var generateTrailMarkers = function(trailArray) {
      $scope.trailMarkers = [];
      for (var i = 0; i < trailArray.length && i < 50; i++) {
        var marker = {
          title: trailArray[i].trailName,
          latitude: trailArray[i].lat,
          longitude: trailArray[i].lon,
          options: {
            draggable: false
          },
          id: i,
          hikeDist: trailArray[i].hikeDistance,
          precipProb: trailArray[i].precipProbability,

          events: {
            mouseover: function(markere, eventName, args) {
              $scope.hikeDist = markere.model.hikeDist;
              $scope.trailName = markere.model.title;
              $scope.precipProb = markere.model.precipProbability;
              $scope.coords = {
                latitude: markere.model.latitude,
                longitude: markere.model.longitude
              };
              $scope.windowoptions = {
                pixelOffset: new google.maps.Size(-1, -25, 'px', 'px')
              };
              $scope.windowshow = true;
            }
          }
        };
        $scope.trailMarkers.push(marker);
      }

      $scope.map.trailMarkers = $scope.trailMarkers;
    };
    uiGmapGoogleMapApi.then(function(maps) {
      uiGmapIsReady.promise(1).then(function(instances) {
        generateTrailMarkers(trailArray);
      })
    }).catch(function(err) {});
  }]);
};
