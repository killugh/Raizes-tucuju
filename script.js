// script.js - Controle do Modal e Envio de Pedido via WhatsApp

// Número de WhatsApp (DDI + DDD + número, sem espaços)
const numeroWhatsApp = "5596984149642";

// Seleção de elementos (de forma dinâmica para funcionar em todas as páginas)
const btnComprar = document.querySelector("#btn-comprar");
const modal = document.querySelector("#modal-compra");
const fecharModalBtn = document.querySelector("#fechar-modal");
const cancelarPedidoBtn = document.querySelector("#cancelar-pedido");
const finalizarPedidoBtn = document.querySelector("#finalizar-pedido");
const inputQuantidade = document.querySelector("#quantidade");
const selectPagamento = document.querySelector("#pagamento");

let produtoSelecionado = "";

// Abrir Modal
if (btnComprar) {
    btnComprar.addEventListener("click", (e) => {
        produtoSelecionado = e.target.getAttribute("data-produto");
        modal.style.display = "flex";
        inputQuantidade.focus();
    });
}

// Fechar Modal
function fecharModal() {
    modal.style.display = "none";
}

if (fecharModalBtn) fecharModalBtn.addEventListener("click", fecharModal);
if (cancelarPedidoBtn) cancelarPedidoBtn.addEventListener("click", fecharModal);

// Finalizar Pedido → WhatsApp
function enviarPedidoWhatsApp() {
    const quantidade = inputQuantidade.value;
    const pagamento = selectPagamento.value;

    if (!quantidade || quantidade <= 0) {
        alert("Por favor, informe uma quantidade válida.");
        return;
    }

    fecharModal();

    // Mensagem CONF2 amigável ao usuário
    setTimeout(() => {
        alert("🍃 Seu pedido foi enviado! Vamos te atender pelo WhatsApp 📩");
    }, 300);

    // Criação da mensagem (MSG2)
    const mensagem = `Olá! Gostaria de fazer um pedido:%0A• Produto: ${produtoSelecionado}%0A• Quantidade: ${quantidade}%0A• Pagamento: ${pagamento}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    setTimeout(() => {
        window.open(url, "_blank");
    }, 600);
}

if (finalizarPedidoBtn) finalizarPedidoBtn.addEventListener("click", enviarPedidoWhatsApp);

// ENTER1 - Pressionar Enter finaliza o pedido
window.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex" && e.key === "Enter") {
        enviarPedidoWhatsApp();
    }
});
