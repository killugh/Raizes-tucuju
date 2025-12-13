// cart.js - Lógica do Carrinho

// Carregar carrinho salvo no localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Atualiza o carrinho na página
function atualizarCarrinho() {
    cartContainer.innerHTML = "";

    if (carrinho.length === 0) {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        cartTotal.textContent = "R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach((item, index) => {
        const itemHTML = document.createElement("div");
        itemHTML.classList.add("cart-item");

        itemHTML.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.nome}</div>
                <div class="cart-item-qty">Quantidade: ${item.quantidade}</div>
                <div class="cart-item-price">Preço: R$ ${item.preco}</div>
            </div>
            <button class="cart-item-remove" data-index="${index}">Remover</button>
        `;

        cartContainer.appendChild(itemHTML);
        total += item.preco * item.quantidade;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;

    // Botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', removerItem);
    });
}

// Remover item
function removerItem(event) {
    const index = event.target.dataset.index;
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Finalizar compra via WhatsApp
const btnFinalizar = document.querySelector('.finalizar');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        let mensagem = 'Olá! Gostaria de finalizar meu pedido:%0A%0A';

        carrinho.forEach(item => {
            mensagem += `• ${item.nome} - Quantidade: ${item.quantidade} - Preço: R$ ${item.preco}%0A`;
        });

        let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

        const numero = '5596984149642';
        const url = `https://wa.me/${numero}?text=${mensagem}`;

        window.open(url, '_blank');
        localStorage.removeItem("carrinho");
        carrinho = [];
        atualizarCarrinho();

    });
}


// Inicialização
document.addEventListener("DOMContentLoaded", atualizarCarrinho);





