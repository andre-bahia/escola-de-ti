'use strict';
var app = angular.module("app", ["ngRoute"]).config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/clientes', {
    templateUrl: 'templates/clientes.html',
    controller: 'clientesCtrl',
  })
  .when('/clientes/cadastrar', {
    templateUrl: 'templates/clientes-form.html',
    controller: 'clientesCtrl',
    method: 'cadastrar'
  })
  .when('/clientes/:id/editar', {
    templateUrl: 'templates/clientes-form.html',
    controller: 'clientesCtrl',
    method: 'editar'
  })
  .when('/produtos', {
    templateUrl: 'templates/produtos.html',
    controller: 'produtoCtrl',
    method:'listar'
  })
  .when('/produtos/cadastrar', {
    templateUrl: 'templates/produtos-form.html',
    controller: 'produtoCtrl',
    method: 'cadastrar'
  })
  .when('/produtos/:id/editar', {
    templateUrl: 'templates/produtos-form.html',
    controller: 'produtoCtrl',
    method: 'editar'
  })
  .otherwise({
    redirectTo: '/'
  });
});
