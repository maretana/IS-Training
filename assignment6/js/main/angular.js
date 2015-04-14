'use strict';
var app = angular.module('artists', []);
app.controller('artistsController', ['$scope', '$http', function($scope, $http) {
    $http(
    	{
    		method : 'JSONP',
    		url : 'http://api.ht.fuseamplify.com/api/artist/top',
    		params : {
    			aggregate : true,
    			callback : 'JSON_CALLBACK'
    		}
    	}
    ).success(
    	function(response) {
    		console.log(response);
    	}
    ).error(
    	function(data, status, headers, config) {
    		console.log('error');
    	}
    );
}]);