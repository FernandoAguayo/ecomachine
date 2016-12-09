import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {State} from '/imports/api/state';

angular.module('starter', [angularMeteor, uiRouter]).controller('viewHelperController', function ($scope, $stateParams) {
    $scope.helpers({
        user() {
            return State.findOne({
                usuario: $stateParams.tipo
            });
        }
    });
}).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
        abstract: true
        , template: '<div ui-view></div>'
        , controller: ['$scope', '$reactive', '$state', ($scope, $reactive, $state) => {
            $reactive(this).attach($scope);
            State.find({}).observe({
                changed(doc) {
                    switch (doc.tipo) {
                    case "Boton":
                        $state.go('root.finished');
                        break;
                     case "Aluminio":
                            console.log("esto es Aluminio");
                        break;    
                     case "Pet":
                            console.log("esto es Pet");
                        break;
                            
                    default:
                        $state.go('root.main', doc);
                    }
                }
            });
            this.subscribe('state.status');
            }]
    }).state('root.main', {
        url: "/main/:tipo"
        , templateUrl: "templates/main.html"
        , controller: ['$scope', '$reactive', '$state', ($scope, $reactive, $state) => {
            $reactive(this).attach($scope);
            }]
    }).state('root.welcome', {
        url: "/welcome"
        , templateUrl: "templates/welcome.html"
        , controller: ['$scope', '$reactive', '$state', ($scope, $reactive, $state) => {
            $reactive(this).attach($scope);
            }]
    }).state('root.finished', {
        url: "/finished"
        , templateUrl: "templates/finished.html"
    })
    $urlRouterProvider.otherwise('/welcome');
});