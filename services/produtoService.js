app.factory("produtoService", produtoService);

function produtoService() {
  var produtos = [];

  function setProduto(produto){
    produtos.push(produto);
    console.log(produtos);
  }

  function getProdutos() {
    return produtos;
  }

  return {
    setProduto: setProduto,
    getProdutos: getProdutos
  };
}
