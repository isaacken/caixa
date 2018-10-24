var produtos = new Array();
var lastCod = "";

$("#cadastrar-produto").on("click",function() {
  var produto = new Object();
  var valid = true;

  if ($("#cCodigo").val() == "") {
    valid = false;
    $("#cCodigo").addClass("is-invalid");
  } else {
    $("#cCodigo").removeClass("is-invalid");
  }

  if ($("#cDescricao").val() == "") {
    valid = false;
    $("#cDescricao").addClass("is-invalid");
  } else {
    $("#cDescricao").removeClass("is-invalid");
  }

  if ($("#cPreco").val() == "") {
    valid = false;
    $("#cPreco").addClass("is-invalid");
  } else {
    $("#cPreco").removeClass("is-invalid");
  }

  if ($("#cEstoque").val() == "") {
    valid = false;
    $("#cEstoque").addClass("is-invalid");
  } else {
    $("#cEstoque").removeClass("is-invalid");
  }

  produto.codigo = $("#cCodigo").val();
  produto.descricao = $("#cDescricao").val();
  produto.preco = $("#cPreco").val();
  produto.estoque = $("#cEstoque").val();

  if ($("#cImagem").prop("files")[0].name == "") {
    produto.imagem = "000.jpg";
  } else {
    produto.imagem = $("#cImagem").prop("files")[0].name;
  }

  if (produtos.find(p => p.codigo == produto.codigo)) {
    valid = false;
    $("#cCodigo").addClass("is-invalid");
  }

  if (valid) {
    produtos.push(produto);
    $("#cCodigo").val("");
    $("#cDescricao").val("");
    $("#cPreco").val("");
    $("#cEstoque").val("");
    $("#cImagem").prop("");

    alert("Produto cadastrado!");
  }
});

$("#search").on("keyup teste",function() {
  var codigo = $(this).val();

  if (codigo == lastCod) return;

  if (codigo.length == 3) {
    if (produtos.find(p => p.codigo = codigo)) {
      var produto = produtos.find(p => p.codigo = codigo);
      console.log(produto);
    } else {

    }

    $("#btn-adicionar").removeAttr("disabled");
  } else {
    $("#btn-adicionar").attr("disabled","disabled");
  }

  lastCod = codigo;
});
