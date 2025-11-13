// script.js - Controle do Modal, Envio de Pedido via WhatsApp e Sistema de Busca

// ------------------------------------------------------------
// CONFIGURAÇÃO DO WHATSAPP
// ------------------------------------------------------------
// Número de WhatsApp (DDI + DDD + número, sem espaços)
const numeroWhatsApp = "5596984149642";

// ------------------------------------------------------------
// ELEMENTOS DO MODAL (válido para todas as páginas de produto)
// ------------------------------------------------------------
const btnComprar = document.querySelector("#btn-comprar");
const modal = document.querySelector("#modal-compra");
const fecharModalBtn = document.querySelector("#fechar-modal");
const cancelarPedidoBtn = document.querySelector("#cancelar-pedido");
const finalizarPedidoBtn = document.querySelector("#finalizar-pedido");
const inputQuantidade = document.querySelector("#quantidade");
const selectPagamento = document.querySelector("#pagamento");

let produtoSelecionado = ""; // Guarda o nome do produto selecionado

// ------------------------------------------------------------
// FUNÇÃO: Abrir Modal ao clicar no botão "Comprar"
// ------------------------------------------------------------
if (btnComprar) {
    btnComprar.addEventListener("click", (e) => {
        produtoSelecionado = e.target.getAttribute("data-produto");
        modal.style.display = "flex";
        inputQuantidade.focus();
    });
}

// ------------------------------------------------------------
// FUNÇÃO: Fechar Modal
// ------------------------------------------------------------
function fecharModal() {
    modal.style.display = "none";
}

if (fecharModalBtn) fecharModalBtn.addEventListener("click", fecharModal);
if (cancelarPedidoBtn) cancelarPedidoBtn.addEventListener("click", fecharModal);

// ------------------------------------------------------------
// FUNÇÃO: Finalizar Pedido → WhatsApp
// ------------------------------------------------------------
function enviarPedidoWhatsApp() {
    const quantidade = inputQuantidade.value;
    const pagamento = selectPagamento.value;

    if (!quantidade || quantidade <= 0) {
        alert("Por favor, informe uma quantidade válida.");
        return;
    }

    fecharModal();

    // Exibe mensagem de confirmação (CONF2)
    setTimeout(() => {
        alert("🍃 Seu pedido foi enviado! Vamos te atender pelo WhatsApp 📩");
    }, 300);

    // Criação da mensagem (MSG2)
    const mensagem = `Olá! Gostaria de fazer um pedido:%0A• Produto: ${produtoSelecionado}%0A• Quantidade: ${quantidade}%0A• Pagamento: ${pagamento}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    // Abre o WhatsApp após a confirmação
    setTimeout(() => {
        window.open(url, "_blank");
    }, 600);
}

if (finalizarPedidoBtn) finalizarPedidoBtn.addEventListener("click", enviarPedidoWhatsApp);

// ENTER1 - Pressionar Enter finaliza o pedido
window.addEventListener("keydown", (e) => {
    if (modal && modal.style.display === "flex" && e.key === "Enter") {
        enviarPedidoWhatsApp();
    }
});

// ------------------------------------------------------------
// SISTEMA DE BUSCA NO INDEX (UP2 + UP3)
// ------------------------------------------------------------

const campoPesquisa = document.querySelector("#campo-pesquisa"); // Campo de texto
const mensagemNenhumProduto = document.querySelector("#mensagem-nenhum-produto"); // Mensagem de "Nenhum produto encontrado"
const productsGrid = document.querySelector(".products-grid"); // Grid dos produtos

// Ativa somente no index.html
if (campoPesquisa) {
    campoPesquisa.addEventListener("input", filtrarProdutos); // UP3: Busca instantânea

    function filtrarProdutos() {
        const termo = campoPesquisa.value.toLowerCase().trim();
        const produtos = document.querySelectorAll(".product-card");

        let encontrados = 0;

        produtos.forEach(produto => {
            const nomeProduto = produto.querySelector(".product-title").textContent.toLowerCase();

            // Se combina com o termo ou o termo está vazio, exibe
            if (nomeProduto.includes(termo) || termo === "") {
                produto.style.display = "block";
                encontrados++;
            } else {
                produto.style.display = "none";
            }
        });

        // UP2 + POSNF2: Se nenhum encontrado → mostra mensagem e esconde grid
        if (encontrados === 0) {
            if (mensagemNenhumProduto) mensagemNenhumProduto.style.display = "block";
            if (productsGrid) productsGrid.style.display = "none";
        } else {
            if (mensagemNenhumProduto) mensagemNenhumProduto.style.display = "none";
            if (productsGrid) productsGrid.style.display = "grid";
        }
    }
}

// ====== FILTRO DE CATEGORIAS ======
const botoesCategoria = document.querySelectorAll(".btn-categoria");
const produtos = document.querySelectorAll(".product-card");

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        // Remove a classe ativo dos outros botões
        botoesCategoria.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        const categoria = botao.getAttribute("data-categoria");

        produtos.forEach(produto => {
            const categoriaProduto = produto.getAttribute("data-categoria");

            if (categoria === "todos" || categoriaProduto === categoria) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    });
});
