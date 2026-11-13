const pesquisa = document.getElementById("busca-albuns");
const linhas = document.querySelectorAll(".tabela-publicacoes tbody tr");
const filtroFavoritos = document.getElementById("apenas-favoritos");
if (pesquisa && filtroFavoritos) {
    function filtrarAlbuns() {
        const texto = pesquisa.value.toLowerCase();
        for (let i = 0; i < linhas.length; i++) {
            const album = linhas[i].textContent.toLowerCase();
            const identificador = linhas[i].getAttribute("data-album");
            let mostrar = album.includes(texto);
            if (filtroFavoritos.checked) {
                if (localStorage.getItem("favorito-" + identificador) !== "sim") {
                    mostrar = false;
                }
            }
            if (mostrar) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
    pesquisa.addEventListener("input", filtrarAlbuns);
    filtroFavoritos.addEventListener("change", filtrarAlbuns);
    filtrarAlbuns();
}

const botaoFavorito = document.getElementById("botao-favorito");
if (botaoFavorito) {
    const album = botaoFavorito.getAttribute("data-album");
    const chave = "favorito-" + album;
    function atualizarFavorito() {
        if (localStorage.getItem(chave) === "sim") {
            botaoFavorito.textContent = "Remover dos favoritos";
        } else {
            botaoFavorito.textContent = "Adicionar aos favoritos";
        }
    }
    botaoFavorito.addEventListener("click", function() {
        if (localStorage.getItem(chave) === "sim") {
            localStorage.removeItem(chave);
        } else {
            localStorage.setItem(chave, "sim");
        }
        atualizarFavorito();
    });
    atualizarFavorito();
}

const formulario = document.getElementById("formulario-contato");
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome");
        const mensagem = document.getElementById("mensagem");
        const resultado = document.getElementById("resultado-contato");
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }
        if (nome.value.trim().length < 3 ||
            mensagem.value.trim().length < 10) {
            resultado.textContent = "Preencha os campos corretamente.";
            return;
        }
        resultado.textContent = "Formulário preenchido corretamente! Esta é uma simulação de envio.";
        formulario.reset();
    });
}