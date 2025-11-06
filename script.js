// --- Abrir Modal ---
const btnComprar = document.getElementById("btn-comprar");
const modalCompra = document.getElementById("modal-compra");
const btnFecharModal = document.getElementById("fechar-modal");
const btnFinalizarPedido = document.getElementById("finalizar-pedido");

// Verifica se o botão existe (para funcionar em todas as páginas sem erro)
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        modalCompra.style.display = "flex";
    });
}

// --- Fechar Modal pelo botão X ---
if (btnFecharModal) {
    btnFecharModal.addEventListener("click", () => {
        modalCompra.style.display = "none";
    });
}

// --- Finalizar Pedido ---
if (btnFinalizarPedido) {
    btnFinalizarPedido.addEventListener("click", () => {
        alert("✅ Obrigado pela sua compra! Seu pedido foi registrado com sucesso e logo entraremos em contato. 🍅");
        
        // F1: fecha automaticamente
        modalCompra.style.display = "none";
    });
}

// --- Fechar clicando fora do modal ---
window.addEventListener("click", (event) => {
    if (event.target === modalCompra) {
        modalCompra.style.display = "none";
    }
});
