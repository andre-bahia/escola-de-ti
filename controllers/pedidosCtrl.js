'use script';
app.controller("pedidosCtrl", function($scope, $rootScope, $route, $window, $routeParams, $timeout) {


  //Inicializando os objetos
  $scope.pedido = {};


  //----------------------------------------------------------------------------------------------------------
  $scope.listar = function(){
    console.log("aqui");
  };

  //----------------------------------------------------------------------------------------------------------
  $scope.cadastrar = function(){
    $scope.tituloBtnSubmit = "Cadastrar";
    $scope.titulo = "Cadastro de pedidos";
  };

  //----------------------------------------------------------------------------------------------------------
  $scope.editar = function(){
    $scope.tituloBtnSubmit = "Alterar";
    $scope.titulo = "Alterar pedido"

    // Busca os dados do cliente que deseja editar passando o parametro usando uma diretiva do
    // angular $routeParams que pega o parametro passado na url

  };

  //----------------------------------------------------------------------------------------------------------
  $scope.confirmarExclusao = function(id, nome){
    $rootScope.btnDeleteMsg = "Deletar";
    $rootScope.msgModulo = "o Pedido";
    $('#mod-warning').modal('show',{
      backdrop: false
    });
    $rootScope.id = id;
    $rootScope.name = nome;
  };
  //Faz a requisição no back-end fazendo a exclusão do cliente passando o id como parametro
  //----------------------------------------------------------------------------------------------------------
  $rootScope.deletar = function(id, nome){

    $rootScope.loadingDelete = true;
    $rootScope.btnDeleteMsg = "Aguarde...";

  };

  //----------------------------------------------------------------------------------------------------------
  $scope.submit = function(client, address){
    $scope.loading = true;


    if(typeof client.id == "undefined"){
      var clientUrl = "store";
      var httpMethod = $http.post(BASE_URL + 'client/' + clientUrl, client);
    }else{
      var clientUrl = "update/"+client.id;
      var httpMethod = $http.put(BASE_URL + 'client/' + clientUrl, client);
    }


  };

  $scope.reset = function(){
    delete $scope.pedido;
    delete $scope.itens;
    $scope.appForm.$setPristine();
    $scope.appForm.$setUntouched();
  };

  //Inicializa controller
  $scope.init = function () {
    if ($route.current.method !== undefined) {
      $scope[$route.current.method]();
    }
  };
  $scope.init();
});
