const $domConteudo = document.querySelector("#conteudo");
const heightadjustment = () => $domConteudo.style.height = `${window.innerHeight}px`;

window.onload = heightadjustment;