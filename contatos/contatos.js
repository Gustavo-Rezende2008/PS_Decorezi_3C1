const formulario = document.querySelector("#formulario-contato");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador-mensagem");
const avisoEnvio = document.querySelector("#aviso-envio");
const cabecalho = document.querySelector(".header");
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

const EMAIL_EMPRESA = "loremipsun@gmail.com";
const LIMITE_MENSAGEM = 1000;

cabecalho.classList.add("menu-interativo");

function fecharMenu() {
    cabecalho.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
    const menuEstaAberto = cabecalho.classList.toggle("menu-aberto");

    botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
    botaoMenu.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
});

menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) {
        fecharMenu();
    }
});

document.addEventListener("click", (evento) => {
    if (!cabecalho.contains(evento.target)) {
        fecharMenu();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && cabecalho.classList.contains("menu-aberto")) {
        fecharMenu();
        botaoMenu.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        fecharMenu();
    }
});

mensagem.addEventListener("input", () => {
    contador.textContent = `${mensagem.value.length}/${LIMITE_MENSAGEM}`;
    mensagem.setCustomValidity("");
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = mensagem.value.trim();

    if (!texto) {
        mensagem.setCustomValidity("Digite uma mensagem antes de enviar.");
        mensagem.reportValidity();
        mensagem.focus();
        return;
    }

    mensagem.setCustomValidity("");

    const assunto = encodeURIComponent("Contato pelo site da Decorize");
    const corpo = encodeURIComponent(texto);
    const linkEmail = `mailto:${EMAIL_EMPRESA}?subject=${assunto}&body=${corpo}`;

    avisoEnvio.textContent = "Abrindo seu aplicativo de e-mail...";
    window.location.href = linkEmail;
});
