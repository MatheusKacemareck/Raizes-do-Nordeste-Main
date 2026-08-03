let carrinho = [];
let quantidadeItens = 0;

const produtos = [

{
    id:1,
    nome:"Tapioca de Carne de Sol",
    preco:18.90,
    categoria:"Tapiocas",
    imagem:"img/produtos/tapioca1.jpg"
},

...
]

function adicionarCarrinho(nome, preco){

    carrinho.push({
        nome,
        preco
    });

    quantidadeItens++;

    document.getElementById("itens-carrinho").innerText =
        quantidadeItens;

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
}

function abrirCarrinho(){

    window.location.href = "carrinho.html";
}

function finalizarPedido(){

    window.location.href =
        "pagamento.html";
}

function pagar(){

    // Simula pagamento aprovado
    alert("Pagamento aprovado!");

    // Recupera os pontos atuais
    let pontos = Number(localStorage.getItem("pontos")) || 0;

    // Adiciona 50 pontos
    pontos += 50;

    // Salva novamente
    localStorage.setItem("pontos", pontos);

    // Vai para a tela do pedido
    window.location.href = "pedido.html";

}

function carregarPontos(){

    const pontos = localStorage.getItem("pontos") || 0;

    const elemento = document.getElementById("pontosUsuario");

    if(elemento){
        elemento.innerHTML = pontos + " pontos";
    }

}

function obterCarrinho(){

    return JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

}

function carregarCarrinho(){

    const itens =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    const lista =
        document.getElementById("lista-carrinho");

    const totalElemento =
        document.getElementById("total");

    if(!lista) return;

    let total = 0;

    lista.innerHTML = "";

    itens.forEach(item => {

        total += item.preco;

        lista.innerHTML += `
            <div class="produto-info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
        `;

    });

    totalElemento.innerHTML =
        `Total: R$ ${total.toFixed(2)}`;

}

function selecionarUnidade(nome){

    localStorage.setItem(
        "unidade",
        nome
    );

    window.location.href =
        "cardapio.html";

}

function carregarUnidade(){

    const unidade =
        localStorage.getItem("unidade");

    const elemento =
        document.getElementById(
            "unidadeSelecionada"
        );

    if(elemento && unidade){

        elemento.innerHTML =
            unidade;

    }

}

function aceitarLGPD(){

    const aceite =
        document.getElementById(
            "aceite"
        );

    if(!aceite.checked){

        alert(
            "Você precisa aceitar."
        );

        return;

    }

    localStorage.setItem(
        "lgpd",
        true
    );

    window.location.href =
        "cadastro.html";

}

// ========================
// INICIALIZAÇÃO DE FUNÇÕES
// ========================

document.addEventListener("DOMContentLoaded", () => {

    carregarCarrinho();

    carregarUnidade();

    carregarPontos();

});