'use strict';
var app = angular.module('artists', [ ]);
app.controller('artistsController', ['$scope', '$http', function($scope, $http) {
    $http(
    	{
    		method : 'JSONP',
    		url : 'http://api.ht.fuseamplify.com/api/artist/top',
    		params : {
    			aggregate : true,
    			callback : 'JSON_CALLBACK'	//this parameter is required by angular for JSONP requests
    		}
    	}
    ).success(
    	function(response) {
    		$scope.artists = response;
    	}
    ).error(
    	function(data, status, headers, config) {
    		console.log('error');
    	}
    );
}]);
app.filter('searchByName', function() {
	return function(artists, artistName) {
		artists = artists || [];
		artistName = artistName || '';
		var filtered = [];
		var letterMatch = new RegExp(artistName, 'i');
	    for (var i = 0; i < artists.length; i++) {
	      var item = artists[i];
	      if (letterMatch.test(item.name.substring(0, artistName.length))) {
	        filtered.push(item);
	      }
	    }
	    return filtered;
	};
});