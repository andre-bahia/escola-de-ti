app.controller("produtoCtrl", produtoCtrl);

function produtoCtrl($scope, $location, produtoService) {

	$scope.produto =  {};
	$scope.tituloBtnSubmit = "Enviar";

	console.log("teste");

	function setProduto(argument) {
		produtoService.setProduto(argument);
	}

	$scope.submit = function(produto) {
		console.log(produto);
		setProduto(produto);
		$location.path('produtos');
	}

	$scope.listar = function() {
		$scope.produtos = produtoService.getProdutos();
		console.log($scope.produtos);
	}

	$scope.listar();
}
