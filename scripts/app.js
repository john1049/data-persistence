(function(){
	var app = angular.module('movieDB', ['ngRoute'])

	app.config(function($routeProvider){
		$routeProvider
		  .when('/', {
        templateUrl: 'views/welcome.html',
        controller: "MainController"

      })
      .when('/movie/:movieTitle', {
        templateUrl: 'views/movieDetail.html',
        controller: 'MovieController'

      })

      .otherwise( {redirectTo: '/'} )
      
	});
	app.controller('MainController', function($scope){
		$scope.welcome = "Welcome to The Movie Database";
		$scope.message = "Select a movie on the sidebar to see more details"
	});

	app.controller('MovieController', function($scope, $routeParams, $http, $location){
		$scope.movieTitle = $routeParams.movieTitle
		//removes dashes in movie title
		//$scope.movieTitle = $scope.movieTitle.replace(/-/g, " ");

		/*$http
		.get('/data/movies.json')
		.then(function(res){
        $scope.movie = res.data.filter(function(row) {
          //console.log(row);
          return row.title === $scope.movieTitle
        })[0]
       // console.log($scope.movie);
          $scope.next = function(){

          }

    });   */  


     $http 
    .get('/data/movies.json')
    .then(function(movieObj){
        $scope.movieObjLength = Object.keys(movieObj).length; 
      
      $scope.movie = movieObj.data.filter(function(row){
        return row.index === $scope.movieTitle;
      })[0];

    $scope.current = parseInt($scope.movieTitle);

        $scope.next = function(){
           if($scope.current < $scope.movieObjLength -1){
             $scope.current = $scope.current + 1;
              $location.path('/movie/' + $scope.current);
           }
           else{
              $scope.current = 0;
              $location.path('/movie/' + $scope.current);
           }
       };

      $scope.prev = function(){
        if($scope.current > 0){
            $scope.current = $scope.current - 1;
            $location.path('/movie/' + $scope.current);
          }
        else{
            $scope.current = $scope.movieObjLength - 1;
            $location.path('/movie/' + $scope.current);
           }
       };

    });  
	});
})();