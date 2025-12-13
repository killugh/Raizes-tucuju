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

// Variáveis globais
let produtoSelecionado = "";
let precoSelecionado = 0;
let imagemSelecionada = "";

// ------------------------------------------------------------
// FUNÇÃO: Abrir Modal ao clicar no botão "Comprar"
// ------------------------------------------------------------
if (btnComprar) {
    btnComprar.addEventListener("click", (e) => {
        produtoSelecionado = e.target.getAttribute("data-produto");
        precoSelecionado = Number(e.target.getAttribute("data-preco"));
        imagemSelecionada = e.target.getAttribute("data-imagem");

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
// FUNÇÃO: Adicionar ao Carrinho
// ------------------------------------------------------------
function adicionarAoCarrinho() {
    const quantidade = Number(inputQuantidade.value);
    const pagamento = selectPagamento.value;

    if (!quantidade || quantidade <= 0) {
        alert("Informe uma quantidade válida.");
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: produtoSelecionado,
        quantidade: quantidade,
        pagamento: pagamento,
        preco: precoSelecionado,
        imagem: imagemSelecionada
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    fecharModal();

    alert("🛒 Produto adicionado ao carrinho!");
}

if (finalizarPedidoBtn) {
    finalizarPedidoBtn.addEventListener("click", adicionarAoCarrinho);
}



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

// ------------------------------------------------------------
// SISTEMA DE CARRINHO (JS4)
// ------------------------------------------------------------

// Carregar carrinho existente ou criar novo
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Botões que adicionam ao carrinho (em cada página de produto)
const btnAdicionarCarrinho = document.querySelector(".abrir-modal");

if (btnAdicionarCarrinho) {
    btnAdicionarCarrinho.addEventListener("click", () => {
        const nome = btnAdicionarCarrinho.getAttribute("data-produto");
        const imagem = document.querySelector(".produto-imagem img").src;
        const preco = parseFloat(
            document.querySelector(".produto-preco").textContent.replace("R$", "").replace(",", ".")
        );
        const quantidade = parseFloat(inputQuantidade.value);

        // Salva no carrinho
        carrinho.push({
            nome: nome,
            imagem: imagem,
            preco: preco,
            quantidade: quantidade
        });

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("🛒 Produto adicionado ao carrinho com sucesso!");
    });
}
