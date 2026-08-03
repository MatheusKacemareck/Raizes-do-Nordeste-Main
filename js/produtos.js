/*
=========================================
Raízes do Nordeste
produtos.js
=========================================
Responsável por:

- Lista de produtos
- Categorias
- Busca
- Filtros
- Montagem do cardápio
=========================================
*/


const produtos = [

    {
        id: 1,
        nome: "Tapioca de Carne de Sol",
        categoria: "Tapiocas",
        preco: 18.90,
        imagem: "img/produtos/tapioca-carne-sol.jpg",
        descricao: "Tapioca recheada com carne de sol desfiada e queijo coalho."
    },

    {
        id: 2,
        nome: "Tapioca de Frango",
        categoria: "Tapiocas",
        preco: 16.90,
        imagem: "img/produtos/tapioca-frango.jpg",
        descricao: "Frango temperado com queijo muçarela."
    },

    {
        id: 3,
        nome: "Cuscuz Completo",
        categoria: "Cuscuz",
        preco: 22.90,
        imagem: "img/produtos/cuscuz-completo.jpg",
        descricao: "Cuscuz nordestino com carne de sol, queijo e manteiga."
    },

    {
        id: 4,
        nome: "Cuscuz Simples",
        categoria: "Cuscuz",
        preco: 12.90,
        imagem: "img/produtos/cuscuz.jpg",
        descricao: "Cuscuz tradicional com manteiga."
    },

    {
        id: 5,
        nome: "Bolo de Rolo",
        categoria: "Sobremesas",
        preco: 9.90,
        imagem: "img/produtos/bolo-rolo.jpg",
        descricao: "Tradicional bolo de rolo pernambucano."
    },

    {
        id: 6,
        nome: "Pudim de Tapioca",
        categoria: "Sobremesas",
        preco: 11.90,
        imagem: "img/produtos/pudim.jpg",
        descricao: "Pudim artesanal de tapioca."
    },

    {
        id: 7,
        nome: "Café Regional",
        categoria: "Bebidas",
        preco: 6.00,
        imagem: "img/produtos/cafe.jpg",
        descricao: "Café coado na hora."
    },

    {
        id: 8,
        nome: "Suco de Cajá",
        categoria: "Bebidas",
        preco: 8.50,
        imagem: "img/produtos/caja.jpg",
        descricao: "Suco natural de cajá."
    }

];


/* =====================================
MONTAR CARDÁPIO
===================================== */

function carregarProdutos(lista = produtos){

    const container =
        document.getElementById("listaProdutos");

    if(!container) return;

    container.innerHTML = "";

    lista.forEach(produto=>{

        container.innerHTML += `

        <div class="card">

            <img
            src="${produto.imagem}"
            alt="${produto.nome}">

            <div class="info">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <div class="rodape-card">

                    <span>

                        R$ ${produto.preco.toFixed(2)}

                    </span>

                    <button
                    onclick="adicionarCarrinho(${produto.id})">

                        +

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}


/* =====================================
PESQUISA
===================================== */

function pesquisarProdutos(){

    const campo =
        document.getElementById("pesquisa");

    if(!campo) return;

    const texto =
        campo.value.toLowerCase();

    const resultado =
        produtos.filter(produto=>{

            return produto.nome
            .toLowerCase()
            .includes(texto);

        });

    carregarProdutos(resultado);

}


/* =====================================
FILTRO POR CATEGORIA
===================================== */

function filtrarCategoria(categoria){

    if(categoria=="Todos"){

        carregarProdutos();

        return;

    }

    const resultado =
        produtos.filter(produto=>{

            return produto.categoria
            == categoria;

        });

    carregarProdutos(resultado);

}


/* =====================================
BUSCAR PRODUTO PELO ID
===================================== */

function buscarProduto(id){

    return produtos.find(produto=>{

        return produto.id==id;

    });

}


/* =====================================
ABRIR DETALHES
===================================== */

function abrirProduto(id){

    localStorage.setItem(
        "produtoSelecionado",
        id
    );

    window.location.href =
        "produto.html";

}


/* =====================================
TELA produto.html
===================================== */

function carregarProduto(){

    const id =
    localStorage.getItem(
        "produtoSelecionado"
    );

    if(!id) return;

    const produto =
        buscarProduto(Number(id));

    if(!produto) return;

    document.getElementById("fotoProduto").src =
        produto.imagem;

    document.getElementById("nomeProduto").innerHTML =
        produto.nome;

    document.getElementById("descricaoProduto").innerHTML =
        produto.descricao;

    document.getElementById("precoProduto").innerHTML =
        "R$ "+produto.preco.toFixed(2);

}


/* =====================================
INICIALIZAÇÃO
===================================== */

document.addEventListener("DOMContentLoaded",()=>{

    carregarProdutos();

    carregarProduto();

});