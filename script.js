var produtos = new Array();
var lastCod = "";
var produto = new Object();
var qtd = 0;
var total = 0;

$("#cadastrar-produto").on("click",function() {
  produto = new Object();
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
  produto.preco = parseFloat($("#cPreco").val().replace(",","."));
  produto.estoque = parseInt($("#cEstoque").val());

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
    if (produto = produtos.find(p => p.codigo == codigo)) {
      $("#codigo").html(produto.codigo);
      $("#descricao").html(produto.descricao);
      $("#preco").html("R$"+produto.preco.toFixed(2).replace(".",","));
      $("#total").html("R$0,00");
      $("#estoque").html(produto.estoque);
      $("#imagem").attr("src","img/"+produto.imagem);
      $("#quantidade").html("0");

      $("#addProd").removeAttr("disabled");
      $("#remProd").removeAttr("disabled");
    } else {
      $("#btn-adicionar").attr("disabled","disabled");
      $("#addProd").attr("disabled","disabled");
      $("#remProd").attr("disabled","disabled");
      limparDetalhes();
    }
  } else {
    produto.estoque+=qtd;
    $("#btn-adicionar").attr("disabled","disabled");
    $("#addProd").attr("disabled","disabled");
    $("#remProd").attr("disabled","disabled");
    limparDetalhes();
  }

  lastCod = codigo;
});

function limparDetalhes() {
  $("#imagem").attr("src","img/000.jpg");
  $("#codigo").html("");
  $("#descricao").html("");
  $("#preco").html("");
  $("#total").html("");
  $("#estoque").html("");
  $("#quantidade").html("0");

  qtd = 0;
  produto = new Object();
}

$("#addProd").on("click",function() {
  if (produto.estoque > 0) {
    qtd = parseInt($("#quantidade").html());
    qtd++;
    $("#quantidade").html(qtd);
    produto.estoque = parseInt($("#estoque").html());
    produto.estoque--;
    $("#estoque").html(produto.estoque);
    $("#total").html("R$"+(produto.preco*qtd).toFixed(2).replace(".",","));

    if (produto.estoque == 0) {
      $("#addProd").attr("disabled","disabled");
    }

    if (qtd > 0) {
      $("#remProd").removeAttr("disabled");
      $("#btn-adicionar").removeAttr("disabled");
    }
  }
});

$("#remProd").on("click",function() {
  qtd = parseInt($("#quantidade").html());

  if (qtd > 0) {
    qtd--;
    $("#quantidade").html(qtd);
    produto.estoque = parseInt($("#estoque").html());
    produto.estoque++;
    $("#estoque").html(produto.estoque);
    $("#total").html("R$"+(produto.preco*qtd).toFixed(2).replace(".",","));

    if (qtd == 0) {
      $("#remProd").attr("disabled","disabled");
      $("#btn-adicionar").attr("disabled","disabled");
    }

    if (produto.estoque > 0) {
      $("#addProd").removeAttr("disabled");
    }
  }
});

$("#btn-adicionar").on("click",function(e) {
  e.preventDefault();

  $("#carrinho-vazio").remove();
  $("#carrinho tbody").append("<tr>"+
    "<td>"+produto.codigo+"</td>"+
    "<td>"+produto.descricao+"</td>"+
    "<td>x"+qtd+"</td>"+
    "<td>R$"+produto.preco.toFixed(2).replace(".",",")+"</td>"+
    "<td>R$"+(qtd*produto.preco).toFixed(2).replace(".",",")+"</td>"+
  "</tr>");

  total+=qtd*produto.preco;
  $("#total-carrinho span").html("R$"+total.toFixed(2).replace(".",","));

  limparDetalhes();
  $("#btn-adicionar").attr("disabled","disabled");
  $("#addProd").attr("disabled","disabled");
  $("#remProd").attr("disabled","disabled");
});
