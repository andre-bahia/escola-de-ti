'use script';
app.controller("clientesCtrl", function($scope, $http, $rootScope, $route, $window, $routeParams, $timeout) {


  //Inicializando os objetos
  $scope.client = {};
  $scope.address = {};


  // Faz uma requisição na rota de client e traz todos para a listar
  //----------------------------------------------------------------------------------------------------------
  $scope.listar = function(){
    console.log("aqui");
    $http.get(BASE_URL + 'client').success(function (data) {
      $scope.clients = data;
      console.log($scope.clients);
    });
  };

  //----------------------------------------------------------------------------------------------------------
  //Método cadastrar
  $scope.cadastrar = function(){
    $scope.tituloBtnSubmit = "Cadastrar";
    $scope.titulo = "Cadastro de cliente";
  };

  //----------------------------------------------------------------------------------------------------------
  //Método editar
  $scope.editar = function(){
    $scope.tituloBtnSubmit = "Alterar";
    $scope.titulo = "Alterar cliente"

    // Busca os dados do cliente que deseja editar passando o parametro usando uma diretiva do
    // angular $routeParams que pega o parametro passado na url
    $http.get(BASE_URL + 'client/show/' + $routeParams.id).success(function(data){
      $scope.client = data;
      $http.get(BASE_URL + 'client/address/show/'+ data.id).success(function(address){
        $scope.address = address[0];
      });
    });
  };

  //----------------------------------------------------------------------------------------------------------
  $scope.confirmarExclusao = function(id, nome){
    $rootScope.btnDeleteMsg = "Deletar";
    $rootScope.msgModulo = "o Cliente";
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
    $http.delete(BASE_URL+'client/destroy/'+id).success(function(){
      $scope.listar();

      $timeout(function(){
        $rootScope.loadingDelete = false;
        $('#mod-warning').modal('hide');
        $rootScope.btnDeleteMsg = "Deletar";
      }, 1000);

    }).error(function(error){
      console.log('Não é Possivel fazer a exclusão');
    });
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

    httpMethod.success(function(data){
      //Recebendo o valor do id do cliente que já foi salvo na tabela
      var client_id = data.id;
      $scope.address.client_id = client_id;

      if(typeof address.id == "undefined"){
        var addressUrl = "store";
        var httpMethod = $http.post(BASE_URL + 'client/address/' + addressUrl, address);
      }else{
        var addressUrl = "update/"+address.id;
        var httpMethod = $http.put(BASE_URL + 'client/address/' + addressUrl, address);
      }
      httpMethod.success(function(address) {
        console.log(address);

      }).error(function(error){
        console.log(error);

      });

      $timeout(function(){
        $scope.loading = false;
        $scope.reset();
        $window.location.href = '#/clientes';
      }, 3000);

    }).error(function(){
      $scope.loading = false;
      $scope.reset();
      $window.location.href = '#/clientes';
    });
  };

  $scope.buscaCep = function(cep) {
    $http.get('https://viacep.com.br/ws/' + cep + '/json/').success(function(resultCep){
      //Atribuir as variaveis uma por uma pois já tinha feito o back todo em ingles,
      //e as resposta desse webservise vem em portugues
      if (resultCep.erro == true) {
        alert("Informe um cep válido");
      }else {
        $scope.address.address = resultCep.logradouro;
        $scope.address.neighborhood = resultCep.bairro;
        $scope.address.city = resultCep.localidade;
        $scope.address.state = resultCep.uf;
        $scope.address.zip_code = resultCep.cep;
      }
    });
  };

  $scope.reset = function(){
    delete $scope.client;
    delete $scope.address;
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
