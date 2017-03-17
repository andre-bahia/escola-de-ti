'use strict';
var app = angular.module("app", ["ngRoute"]).config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/pedido', {
    templateUrl: 'templates/pedido.html',
    controller: 'pedidosCtrl',
  })
  .when('/pedido/cadastrar', {
    templateUrl: 'templates/pedido-form.html',
    controller: 'pedidosCtrl',
    method: 'cadastrar'
  })
  .when('/pedido/:id/editar', {
    templateUrl: 'templates/pedido-form.html',
    controller: 'pedidosCtrl',
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
