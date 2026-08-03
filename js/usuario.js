    /*
====================================
Raízes do Nordeste
usuario.js
====================================
Responsável por:

- Cadastro
- Login
- Logout
- LGPD
- Perfil
- Fidelidade
- Histórico
====================================
*/


/* ==================================
CADASTRO
================================== */

function cadastrar() {

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("emailCadastro").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const senha = document.getElementById("senhaCadastro").value.trim();

    const aceitou =
        document.getElementById("aceitoLGPD").checked;


    if (!nome || !email || !telefone || !senha) {

        alert("Preencha todos os campos.");

        return;

    }

    if (!aceitou) {

        alert("É necessário aceitar a Política de Privacidade.");

        return;

    }


    const usuario = {

        nome,
        email,
        telefone,
        senha,
        pontos: 0,
        lgpd: true,
        unidade: ""

    };


    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";

}


/* ==================================
LOGIN
================================== */

function login() {

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value.trim();


    const usuario = JSON.parse(

        localStorage.getItem("usuario")

    );


    if (!usuario) {

        alert("Nenhum usuário cadastrado.");

        return;

    }


    if (

        usuario.email === email &&

        usuario.senha === senha

    ) {

        localStorage.setItem("logado", "true");

        alert("Bem-vindo " + usuario.nome + "!");

        window.location.href = "lgpd.html";

    }

    else {

        alert("E-mail ou senha inválidos.");

    }

}


/* ==================================
LOGOUT
================================== */

function logout() {

    localStorage.removeItem("logado");

    window.location.href = "login.html";

}


/* ==================================
LGPD
================================== */

function aceitarLGPD() {

    const aceite =

        document.getElementById("aceite");

    if (!aceite.checked) {

        alert(

            "Você precisa aceitar os termos."

        );

        return;

    }

    const usuario =

        JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {

        usuario.lgpd = true;

        localStorage.setItem(

            "usuario",

            JSON.stringify(usuario)

        );

    }

    window.location.href = "unidades.html";

}


/* ==================================
CARREGAR PERFIL
================================== */

function carregarPerfil() {

    const usuario =

        JSON.parse(localStorage.getItem("usuario"));

    if (!usuario)

        return;


    const nome =

        document.getElementById("perfilNome");

    const email =

        document.getElementById("perfilEmail");

    const telefone =

        document.getElementById("perfilTelefone");

    const unidade =

        document.getElementById("perfilUnidade");


    if (nome)

        nome.innerHTML = usuario.nome;

    if (email)

        email.innerHTML = usuario.email;

    if (telefone)

        telefone.innerHTML = usuario.telefone;

    if (unidade)

        unidade.innerHTML =

            usuario.unidade || "Não selecionada";

}


/* ==================================
UNIDADE FAVORITA
================================== */

function salvarUnidade(nomeUnidade){

    const usuario = JSON.parse(

        localStorage.getItem("usuario")

    );

    if(usuario){

        usuario.unidade = nomeUnidade;

        localStorage.setItem(

            "usuario",

            JSON.stringify(usuario)

        );

    }

    localStorage.setItem(

        "unidade",

        nomeUnidade

    );

}


/* ==================================
FIDELIDADE
================================== */

function carregarPontos() {

    const usuario =

        JSON.parse(localStorage.getItem("usuario"));

    if (!usuario)

        return;

    const pontos =

        document.getElementById("pontosUsuario");

    if (pontos)

        pontos.innerHTML = usuario.pontos + " pontos";

}


/* ==================================
ADICIONAR PONTOS
================================== */

function adicionarPontos(valor = 50) {

    const usuario =

        JSON.parse(localStorage.getItem("usuario"));

    if (!usuario)

        return;

    usuario.pontos += valor;

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

}


/* ==================================
SAUDAÇÃO
================================== */

function mostrarNomeUsuario() {

    const usuario =

        JSON.parse(localStorage.getItem("usuario"));

    const elemento =

        document.getElementById("nomeUsuario");

    if (usuario && elemento) {

        elemento.innerHTML =

            "Olá, " + usuario.nome;

    }

}


/* ==================================
HISTÓRICO
================================== */

function carregarHistorico() {

    const lista =

        document.getElementById("listaHistorico");

    if (!lista)

        return;

    const historico =

        JSON.parse(localStorage.getItem("historico")) || [];


    lista.innerHTML = "";


    if (historico.length === 0) {

        lista.innerHTML =

            "<p>Nenhum pedido encontrado.</p>";

        return;

    }


    historico.forEach(pedido => {

        lista.innerHTML += `

<div class="card">

    <div class="info">

        <h3>

        Pedido #${pedido.numero}

        </h3>

        <p>

        ${pedido.data}

        </p>

        <strong>

        R$ ${pedido.total.toFixed(2)}

        </strong>

    </div>

</div>

`;

    });

}


/* ==================================
EXCLUIR CONTA
================================== */

function excluirConta() {

    if (

        confirm(

            "Deseja realmente excluir sua conta?"

        )

    ) {

        localStorage.clear();

        alert("Conta removida.");

        window.location.href = "index.html";

    }

}


/* ==================================
INICIALIZAÇÃO
================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        carregarPerfil();

        carregarPontos();

        carregarHistorico();

        mostrarNomeUsuario();

    }

);