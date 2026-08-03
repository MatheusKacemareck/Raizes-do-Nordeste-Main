/*
=========================================
Raízes do Nordeste
carrinho.js
=========================================
*/

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const CUPOM = "RAIZES10";
let desconto = 0;

/* ===============================
SALVAR
=============================== */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarIcone();

}

/* ===============================
ADICIONAR PRODUTO
=============================== */

function adicionarCarrinho(id) {

    const produto = buscarProduto(id);

    if (!produto) return;

    const item = carrinho.find(p => p.id === id);

    if (item) {

        item.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1

        });

    }

    salvarCarrinho();

    alert(produto.nome + " adicionado ao carrinho.");

}

/* ===============================
REMOVER ITEM
=============================== */

function removerItem(id) {

    carrinho = carrinho.filter(item => item.id != id);

    salvarCarrinho();

    carregarCarrinho();

}

/* ===============================
AUMENTAR QUANTIDADE
=============================== */

function aumentarQuantidade(id) {

    const item = carrinho.find(p => p.id == id);

    if (!item) return;

    item.quantidade++;

    salvarCarrinho();

    carregarCarrinho();

}

/* ===============================
DIMINUIR QUANTIDADE
=============================== */

function diminuirQuantidade(id) {

    const item = carrinho.find(p => p.id == id);

    if (!item) return;

    item.quantidade--;

    if (item.quantidade <= 0) {

        removerItem(id);

        return;

    }

    salvarCarrinho();

    carregarCarrinho();

}

/* ===============================
TOTAL
=============================== */

function calcularTotal() {

    let total = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;

    });

    total -= desconto;

    if (total < 0)
        total = 0;

    return total;

}

/* ===============================
MOSTRAR CARRINHO
=============================== */

function carregarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    const total = document.getElementById("valorTotal");

    if (!lista)
        return;

    lista.innerHTML = "";

    carrinho.forEach(item => {

        lista.innerHTML += `

<div class="card-carrinho">

    <img src="${item.imagem}">

    <div class="dados">

        <h3>${item.nome}</h3>

        <p>

            R$ ${item.preco.toFixed(2)}

        </p>

        <div class="quantidade">

            <button
            onclick="diminuirQuantidade(${item.id})">

            -

            </button>

            <span>

                ${item.quantidade}

            </span>

            <button
            onclick="aumentarQuantidade(${item.id})">

            +

            </button>

        </div>

    </div>

    <button
    class="excluir"
    onclick="removerItem(${item.id})">

    🗑

    </button>

</div>

`;

    });

    if (total) {

        total.innerHTML =
            "R$ " + calcularTotal().toFixed(2);

    }

}

/* ===============================
ÍCONE
=============================== */

function atualizarIcone() {

    const icone =
        document.getElementById("itens-carrinho");

    if (!icone)
        return;

    let quantidade = 0;

    carrinho.forEach(item => {

        quantidade += item.quantidade;

    });

    icone.innerHTML = quantidade;

}

/* ===============================
LIMPAR
=============================== */

function limparCarrinho() {

    carrinho = [];

    desconto = 0;

    salvarCarrinho();

    carregarCarrinho();

}

/* ===============================
APLICAR CUPOM
=============================== */

function aplicarCupom() {

    const campo =
        document.getElementById("cupom");

    if (!campo)
        return;

    if (campo.value.toUpperCase() == CUPOM) {

        desconto = calcularTotal() * 0.10;

        alert("Cupom aplicado!");

    } else {

        desconto = 0;

        alert("Cupom inválido.");

    }

    carregarCarrinho();

}

/* ===============================
FINALIZAR
=============================== */

function finalizarPedido() {

    if (carrinho.length == 0) {

        alert("Carrinho vazio.");

        return;

    }

    window.location.href =
        "pagamento.html";

}

/* ===============================
PAGAMENTO
=============================== */

function pagamentoAprovado() {

    let pedidos =
        JSON.parse(localStorage.getItem("historico")) || [];

    pedidos.push({

        numero:
            Math.floor(Math.random() * 9000) + 1000,

        data:
            new Date().toLocaleDateString(),

        itens:
            carrinho,

        total:
            calcularTotal()

    });

    localStorage.setItem(
        "historico",
        JSON.stringify(pedidos)
    );

    limparCarrinho();

    window.location.href =
        "pedido.html";
    
}

/* ===============================
INICIALIZAÇÃO
=============================== */

document.addEventListener("DOMContentLoaded", () => {

    atualizarIcone();

    carregarCarrinho();

});