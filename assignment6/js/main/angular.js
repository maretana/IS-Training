'use strict';
var ArtistsNamespace = window.ArtistsNamespace || {};
(function(pContext) {
	pContext.getInitialsArray = function(artistsArray) {
		var initials = [];
		for (var i = 0, len = artistsArray.length; i < len; i++) {
			var artist = artistsArray[i],
				initial = artist.name.substring(0,1);
			if (initials.indexOf(initial) === -1) {
				initials.push(initial);
			}
		}
		return initials;
	};
})(ArtistsNamespace);

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
    		$scope.initials = ArtistsNamespace.getInitialsArray($scope.artists);
    		$scope.jsonReady = true;
    	}
    ).error(
    	function(data, status, headers, config) {
    		console.log('error');
    		console.log(arguments);
    	}
    );
}]);
app.filter('searchByName', function() {
	return function(pArtists, pArtistName) {
		var artists = pArtists || [],		//fix to prevent undefined arguments
			artistName = pArtistName || '',	//fix to prevent undefined arguments
			filtered = [],
			letterMatch = new RegExp(artistName, 'i');

	    for (var i = 0; i < artists.length; i++) {
	      var item = artists[i];
	      if (letterMatch.test(item.name.substring(0, artistName.length))) {
	        filtered.push(item);
	      }
	    }

	    return filtered;
	};
});
