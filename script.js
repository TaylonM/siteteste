const API_BASE = "";

const produtosFallback = [
    {
        id: 1,
        nome: "Camisa Clássica Azul",
        categoria: "masculino",
        preco: 89.90,
        precoOriginal: 129.90,
        descricao: "Camisa clássica em tons de azul, perfeita para uso casual ou profissional",
        imagem: "imagens%20das%20camisas/Azul-royal_78644643.avif",
        imagemAlt: "Camisa clássica azul",
        rating: 5,
        material: "100% Algodão",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#1E3A8A", "#60A5FA", "#93C5FD"],
        novo: true
    },
    {
        id: 2,
        nome: "Camisa Vermelha Moderna",
        categoria: "unissex",
        preco: 79.90,
        precoOriginal: 119.90,
        descricao: "Design moderno e minimalista em vermelho vibrante",
        imagem: "imagens%20das%20camisas/90_camisa_polo_aleatory_marinho_listrada_3901_variacao_13081_2_ea1d9cd3754607e21b89292dbac926c2.webp",
        imagemAlt: "Camisa vermelha moderna",
        rating: 4,
        material: "Algodão com elastano",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#DC2626", "#EF4444", "#FCA5A5"],
        novo: false
    },
    {
        id: 3,
        nome: "Camisa Preta Premium",
        categoria: "masculino",
        preco: 99.90,
        precoOriginal: 149.90,
        descricao: "Camisa premium em preto, ideal para qualquer ocasião",
        imagem: "imagens%20das%20camisas/731914-500-685.webp",
        imagemAlt: "Camisa preta premium",
        rating: 5,
        material: "Algodão Premium",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#000000", "#1F2937", "#374151"],
        novo: true
    },
    {
        id: 4,
        nome: "Camisa Branca Básica",
        categoria: "unissex",
        preco: 59.90,
        precoOriginal: 99.90,
        descricao: "Clássica camisa branca, essencial no guarda-roupa",
        imagem: "imagens%20das%20camisas/camisa.webp",
        imagemAlt: "Camisa branca básica",
        rating: 4,
        material: "100% Algodão",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#FFFFFF", "#F3F4F6", "#E5E7EB"],
        novo: false
    },
    {
        id: 5,
        nome: "Camisa Rosa Feminina",
        categoria: "feminino",
        preco: 89.90,
        precoOriginal: 129.90,
        descricao: "Camisa feminina em rosa pastel com ajuste elegante",
        imagem: "imagens%20das%20camisas/camisa%20feminina%201.webp",
        imagemAlt: "Camisa rosa feminina",
        rating: 5,
        material: "Algodão fino",
        tamanhos: ["P", "M", "G"],
        cores: ["#FFC0CB", "#FFB6C1", "#FFC0CB"],
        novo: true
    },
    {
        id: 6,
        nome: "Camisa Verde Eco",
        categoria: "unissex",
        preco: 94.90,
        precoOriginal: 139.90,
        descricao: "Camisa sustentável em verde, feita com algodão orgânico",
        imagem: "imagens%20das%20camisas/D_Q_NP_2X_685845-MLB81562840626_012025-E-camiseta-camisa-aleatory-listrada-original.webp",
        imagemAlt: "Camisa verde eco",
        rating: 5,
        material: "Algodão Orgânico",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#10B981", "#34D399", "#6EE7B7"],
        novo: true
    },
    {
        id: 7,
        nome: "Camisa Amarela Vibrante",
        categoria: "masculino",
        preco: 79.90,
        precoOriginal: 119.90,
        descricao: "Camisa em amarelo vibrante para se destacar",
        imagem: "imagens%20das%20camisas/M09DUQ02A2.avif",
        imagemAlt: "Camisa amarela vibrante",
        rating: 4,
        material: "Algodão com elastano",
        tamanhos: ["P", "M", "G"],
        cores: ["#FBBF24", "#FCD34D", "#FEF3C7"],
        novo: false
    },
    {
        id: 8,
        nome: "Camisa Cinza Elegante",
        categoria: "masculino",
        preco: 84.90,
        precoOriginal: 124.90,
        descricao: "Camisa cinza elegante para looks sofisticados",
        imagem: "imagens%20das%20camisas/90_camisa_polo_aleatory_marinho_listrada_3901_variacao_13081_2_ea1d9cd3754607e21b89292dbac926c2.webp",
        imagemAlt: "Camisa cinza elegante",
        rating: 4,
        material: "100% Algodão",
        tamanhos: ["P", "M", "G", "GG"],
        cores: ["#6B7280", "#9CA3AF", "#D1D5DB"],
        novo: false
    },
    {
        id: 9,
        nome: "Camisa Roxa Estilosa",
        categoria: "feminino",
        preco: 89.90,
        precoOriginal: 129.90,
        descricao: "Camisa roxa com padrão moderno exclusivo",
        imagem: "imagens%20das%20camisas/camisa%20feminina%202.webp",
        imagemAlt: "Camisa roxa estilosa",
        rating: 5,
        material: "Algodão fino",
        tamanhos: ["P", "M", "G"],
        cores: ["#8B5CF6", "#A78BFA", "#DDD6FE"],
        novo: true
    }
];

let produtos = [];
let carrinho = [];
let filtroAtivo = "todos";
let produtosSelecionados = [];
let produtoEmModal = null;
let corSelecionada = null;
let usuarioLogado = null;

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeImageUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (/^javascript:/i.test(trimmed)) return '';
    return trimmed;
}

document.addEventListener("DOMContentLoaded", async () => {
    await iniciarApp();
    const botaoAdicionar = document.getElementById("btnAdicionarCarrinho");
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", adicionarAoCarrinho);
    }

    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const willOpen = !sidebar.classList.contains("expanded");
            sidebar.classList.toggle("expanded", willOpen);
        });

        sidebar.addEventListener("mouseleave", () => {
            if (!sidebar.classList.contains("expanded")) {
                sidebar.classList.remove("active");
            }
        });

        document.addEventListener("click", (event) => {
            if (sidebar.classList.contains("expanded")) {
                if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                    sidebar.classList.remove("expanded");
                }
                return;
            }
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove("active");
            }
        });
    }

    window.adicionarAoCarrinho = adicionarAoCarrinho;
    window.toggleCart = toggleCart;
    window.fecharModal = fecharModal;
    window.calcularFrete = calcularFrete;
    window.finalizarCompra = finalizarCompra;
    window.loginUsuario = loginUsuario;
    window.criarConta = criarConta;
    window.logoutUsuario = logoutUsuario;
    window.filtrar = filtrar;
    window.ordenarProdutos = ordenarProdutos;
    window.removerDoCarrinho = removerDoCarrinho;
    window.abrirModal = abrirModal;
    window.selecionarCor = selecionarCor;
});

async function iniciarApp() {
    await carregarUsuarioLogado();
    atualizarUsuarioStatus();
    await carregarProdutos();
    carregarCarrinho();
    carregarCadastro();
}

async function carregarUsuarioLogado() {
    try {
        const response = await fetch(`${API_BASE}/api/profile`, { credentials: "include" });
        if (!response.ok) {
            usuarioLogado = null;
            return;
        }
        const data = await response.json();
        usuarioLogado = data.usuario;
    } catch {
        usuarioLogado = null;
    }
}

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_BASE}/api/produtos`);
        if (!response.ok) throw new Error("Erro ao carregar produtos");
        produtos = await response.json();
    } catch {
        produtos = produtosFallback;
    }
    produtosSelecionados = [...produtos];
    renderizarProdutos();
}

function renderizarProdutos() {
    const grid = document.getElementById("produtosGrid");
    if (!grid) return;
    grid.innerHTML = "";

    produtosSelecionados.forEach(produto => {
        const imageUrl = sanitizeImageUrl(produto.imagem);
        const card = document.createElement("div");
        card.className = "produto-card";

        const imagemDiv = document.createElement("div");
        imagemDiv.className = "produto-imagem";
        if (imageUrl) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = escapeHtml(produto.imagemAlt || produto.nome);
            imagemDiv.appendChild(img);
        }
        if (produto.novo) {
            const badge = document.createElement("span");
            badge.className = "produto-badge";
            badge.textContent = "NOVO";
            imagemDiv.appendChild(badge);
        }

        const infoDiv = document.createElement("div");
        infoDiv.className = "produto-info";

        const categoriaDiv = document.createElement("div");
        categoriaDiv.className = "produto-categoria";
        categoriaDiv.textContent = produto.categoria;

        const nomeDiv = document.createElement("div");
        nomeDiv.className = "produto-nome";
        nomeDiv.textContent = produto.nome;

        const descricaoDiv = document.createElement("div");
        descricaoDiv.className = "produto-descricao";
        descricaoDiv.textContent = produto.descricao;

        const avaliacaoDiv = document.createElement("div");
        avaliacaoDiv.className = "produto-avaliacao";
        for (let i = 0; i < produto.rating; i += 1) {
            const star = document.createElement("span");
            star.className = "estrela";
            star.textContent = "★";
            avaliacaoDiv.appendChild(star);
        }
        for (let i = produto.rating; i < 5; i += 1) {
            const star = document.createElement("span");
            star.style.color = '#ddd';
            star.textContent = "★";
            avaliacaoDiv.appendChild(star);
        }

        const precoDiv = document.createElement("div");
        precoDiv.className = "produto-preco";
        precoDiv.innerHTML = `
            <span>
                <span class="preco-valor">R$ ${produto.preco.toFixed(2)}</span>
                <span class="preco-original">R$ ${produto.precoOriginal.toFixed(2)}</span>
            </span>
        `;

        const button = document.createElement("button");
        button.className = "btn-comprar";
        button.type = "button";
        button.textContent = "Ver Detalhes";
        button.addEventListener('click', () => abrirModal(produto.id));

        infoDiv.appendChild(categoriaDiv);
        infoDiv.appendChild(nomeDiv);
        infoDiv.appendChild(descricaoDiv);
        infoDiv.appendChild(avaliacaoDiv);
        infoDiv.appendChild(precoDiv);
        infoDiv.appendChild(button);

        card.appendChild(imagemDiv);
        card.appendChild(infoDiv);
        grid.appendChild(card);
    });
}

function filtrar(categoria, event) {
    filtroAtivo = categoria;
    document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("active"));
    if (event && event.target) event.target.classList.add("active");
    produtosSelecionados = categoria === "todos" ? [...produtos] : produtos.filter(p => p.categoria === categoria);
    renderizarProdutos();
}

function ordenarProdutos(tipo) {
    produtosSelecionados.sort((a, b) => {
        if (tipo === "popular") return b.rating - a.rating;
        if (tipo === "preco-baixo") return a.preco - b.preco;
        if (tipo === "preco-alto") return b.preco - a.preco;
        if (tipo === "novo") return (b.novo - a.novo);
        return 0;
    });
    renderizarProdutos();
}

function abrirModal(id) {
    produtoEmModal = produtos.find(p => p.id === id);
    if (!produtoEmModal) return;

    corSelecionada = produtoEmModal.cores[0];
    const modalImg = document.getElementById("modalImg");
    const modalNome = document.getElementById("modalNome");
    const modalDescricao = document.getElementById("modalDescricao");
    const modalCategoria = document.getElementById("modalCategoria");
    const modalMaterial = document.getElementById("modalMaterial");
    const modalTamanhos = document.getElementById("modalTamanhos");
    const modalPreco = document.getElementById("modalPreco");

    const imagemUrl = sanitizeImageUrl(produtoEmModal.imagem);
    modalImg.innerHTML = '';
    if (imagemUrl) {
        const img = document.createElement('img');
        img.src = imagemUrl;
        img.alt = escapeHtml(produtoEmModal.imagemAlt || produtoEmModal.nome);
        modalImg.appendChild(img);
    }
    modalNome.textContent = produtoEmModal.nome;
    modalDescricao.textContent = produtoEmModal.descricao;
    modalCategoria.textContent = produtoEmModal.categoria.charAt(0).toUpperCase() + produtoEmModal.categoria.slice(1);
    modalMaterial.textContent = produtoEmModal.material;
    modalTamanhos.textContent = produtoEmModal.tamanhos.join(", ");
    modalPreco.textContent = `R$ ${produtoEmModal.preco.toFixed(2)}`;
    document.getElementById("quantidade").value = 1;
    document.getElementById("selecionarTamanho").value = "";

    const coresContainer = document.getElementById("coresContainer");
    coresContainer.innerHTML = "";
    produtoEmModal.cores.forEach(cor => {
        const corDiv = document.createElement("div");
        corDiv.className = "cor-opcao" + (cor === corSelecionada ? " selecionada" : "");
        corDiv.style.backgroundColor = cor;
        corDiv.onclick = event => selecionarCor(cor, event);
        coresContainer.appendChild(corDiv);
    });

    document.getElementById("modalProduto").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function fecharModal() {
    const modal = document.getElementById("modalProduto");
    const overlay = document.getElementById("overlay");
    if (modal) modal.style.display = "none";
    if (overlay) overlay.style.display = "none";
    produtoEmModal = null;
    corSelecionada = null;
}

function selecionarCor(cor, event) {
    corSelecionada = cor;
    document.querySelectorAll(".cor-opcao").forEach(opcao => opcao.classList.remove("selecionada"));
    if (event && event.target) event.target.classList.add("selecionada");
}

function adicionarAoCarrinho() {
    if (!produtoEmModal) {
        alert("Selecione um produto antes de adicionar ao carrinho.");
        return;
    }

    const tamanhoSelect = document.getElementById("selecionarTamanho");
    const tamanho = tamanhoSelect ? tamanhoSelect.value : "";
    if (!tamanho) {
        alert("Por favor, selecione um tamanho!");
        return;
    }
    const quantidadeInput = document.getElementById("quantidade");
    const quantidade = parseInt(quantidadeInput ? quantidadeInput.value : "1", 10);
    if (quantidade < 1) {
        alert("Quantidade inválida!");
        return;
    }

    const item = {
        id: produtoEmModal.id,
        nome: produtoEmModal.nome,
        preco: produtoEmModal.preco,
        quantidade,
        tamanho,
        cor: corSelecionada,
        imagem: produtoEmModal.imagem
    };

    const itemExistente = carrinho.find(p => p.id === item.id && p.tamanho === item.tamanho && p.cor === item.cor);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push(item);
    }

    salvarCarrinho();
    atualizarCarrinho();
    fecharModal();
    mostrarMensagemFrete("", false);
    alert("✓ Produto adicionado ao carrinho com sucesso!");
}

function atualizarCarrinho() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const totalCarrinho = document.getElementById("totalCarrinho");
    if (!cartCount || !cartItems || !totalCarrinho) return;

    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    cartCount.textContent = totalItens;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        totalCarrinho.textContent = "R$ 0,00";
        const shipping = document.getElementById("shippingCostDisplay");
        if (shipping) shipping.textContent = "Frete: R$ 0,00";
        return;
    }

    cartItems.innerHTML = '';
    carrinho.forEach((item, index) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'carrinho-item';

        const imagemDiv = document.createElement('div');
        imagemDiv.className = 'carrinho-item-imagem';
        const imagemUrl = sanitizeImageUrl(item.imagem);
        if (imagemUrl) {
          const img = document.createElement('img');
          img.src = imagemUrl;
          img.alt = escapeHtml(item.nome);
          imagemDiv.appendChild(img);
        }

        const infoDiv = document.createElement('div');
        infoDiv.className = 'carrinho-item-info';

        const nomeDiv = document.createElement('div');
        nomeDiv.className = 'carrinho-item-nome';
        nomeDiv.textContent = item.nome;

        const detalhesDiv = document.createElement('div');
        detalhesDiv.className = 'carrinho-item-detalhes';
        detalhesDiv.innerHTML = `Tamanho: <strong>${escapeHtml(item.tamanho)}</strong> | Qtd: <strong>${item.quantidade}</strong>`;

        const precoDiv = document.createElement('div');
        precoDiv.className = 'carrinho-item-preco';
        precoDiv.textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;

        const removerDiv = document.createElement('div');
        removerDiv.className = 'carrinho-item-remover';
        removerDiv.textContent = '✕';
        removerDiv.addEventListener('click', () => removerDoCarrinho(index));

        infoDiv.appendChild(nomeDiv);
        infoDiv.appendChild(detalhesDiv);
        infoDiv.appendChild(precoDiv);

        itemWrapper.appendChild(imagemDiv);
        itemWrapper.appendChild(infoDiv);
        itemWrapper.appendChild(removerDiv);

        cartItems.appendChild(itemWrapper);
    });

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
    mostrarMensagemFrete("", false);
}

function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("overlay");
    if (!sidebar || !overlay) return;
    if (sidebar.style.display === "flex") {
        sidebar.style.display = "none";
        overlay.style.display = "none";
        return;
    }
    sidebar.style.display = "flex";
    overlay.style.display = "block";
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
        try {
            const parsed = JSON.parse(carrinhoSalvo);
            carrinho = Array.isArray(parsed) ? parsed : [];
        } catch {
            carrinho = [];
            localStorage.removeItem("carrinho");
        }
        atualizarCarrinho();
    }
}

function carregarCadastro() {
    const form = document.getElementById("formCadastro");
    if (!form || !usuarioLogado) return;
    fetch(`${API_BASE}/api/profile`, {
        credentials: "include"
    })
    .then(response => response.ok ? response.json() : null)
    .then(data => {
        if (!data || !data.usuario) return;
        const perfil = data.usuario;
        form.nome.value = perfil.nome || "";
        form.email.value = perfil.email || "";
        form.telefone.value = perfil.telefone || "";
        form.cpf.value = perfil.cpf || "";
        form.nascimento.value = perfil.nascimento || "";
        form.rua.value = perfil.endereco?.rua || "";
        form.numero.value = perfil.endereco?.numero || "";
        form.bairro.value = perfil.endereco?.bairro || "";
        form.cidade.value = perfil.endereco?.cidade || "";
        form.estado.value = perfil.endereco?.estado || "";
        form.cep.value = perfil.endereco?.cep || "";
        form.complemento.value = perfil.endereco?.complemento || "";
        form.observacoes.value = perfil.observacoes || "";
        form.recebeNewsletter.checked = perfil.recebeNewsletter || false;
    })
    .catch(() => {});
}

function atualizarUsuarioStatus() {
    const status = document.getElementById("userStatus");
    if (!status) return;
    status.textContent = '';
    if (usuarioLogado) {
        const saudacao = document.createTextNode(`Olá, ${usuarioLogado.nome} | `);
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Sair';
        logoutLink.addEventListener('click', event => {
            event.preventDefault();
            logoutUsuario();
        });
        status.appendChild(saudacao);
        status.appendChild(logoutLink);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.textContent = 'Entrar';
        status.appendChild(loginLink);
    }
}

async function criarConta(event) {
    event.preventDefault();
    const form = document.getElementById("formCadastro");
    if (!form) return;

    const senha = form.senha.value.trim();
    const confirmarSenha = form.confirmarSenha.value.trim();
    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const cadastro = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        senha,
        telefone: form.telefone.value.trim(),
        cpf: form.cpf.value.trim(),
        nascimento: form.nascimento.value,
        endereco: {
            rua: form.rua.value.trim(),
            numero: form.numero.value.trim(),
            bairro: form.bairro.value.trim(),
            cidade: form.cidade.value.trim(),
            estado: form.estado.value.trim(),
            cep: form.cep.value.trim(),
            complemento: form.complemento.value.trim()
        },
        observacoes: form.observacoes.value.trim(),
        recebeNewsletter: form.recebeNewsletter.checked
    };

    try {
        const response = await fetch(`${API_BASE}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(cadastro)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Erro ao registrar.");
        usuarioLogado = { nome: data.usuario.nome, email: data.usuario.email };
        atualizarUsuarioStatus();
        document.getElementById("cadastroMensagem").innerHTML = "Conta criada com sucesso! Redirecionando...";
        setTimeout(() => window.location.href = "index.html", 1500);
    } catch (error) {
        alert(error.message);
    }
}

async function loginUsuario(event) {
    event.preventDefault();
    const form = document.getElementById("formLogin");
    if (!form) return;

    const email = form.emailLogin.value.trim();
    const senha = form.senhaLogin.value.trim();
    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, senha })
        });
        const data = await response.json();
        const mensagem = document.getElementById("loginMensagem");
        if (!response.ok) {
            mensagem.textContent = data.message || "E-mail ou senha inválidos. Tente novamente.";
            return;
        }
        usuarioLogado = { nome: data.usuario.nome, email: data.usuario.email };
        atualizarUsuarioStatus();
        mensagem.textContent = "Login efetuado! Redirecionando para a loja...";
        setTimeout(() => window.location.href = "index.html", 1200);
    } catch {
        document.getElementById("loginMensagem").innerHTML = "Erro no servidor. Tente novamente mais tarde.";
    }
}

async function logoutUsuario() {
    try {
        await fetch(`${API_BASE}/api/logout`, {
            method: "POST",
            credentials: "include"
        });
    } catch {}
    usuarioLogado = null;
    atualizarUsuarioStatus();
    window.location.href = "index.html";
}

function mostrarMensagemFrete(texto, mostrar = true) {
    const mensagem = document.getElementById("freteMensagem");
    if (!mensagem) return;
    mensagem.style.display = mostrar ? "block" : "none";
    mensagem.textContent = texto;
}

async function calcularFrete() {
    const cep = document.getElementById("cepFrete").value.trim();
    const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    if (!cep) {
        mostrarMensagemFrete("Informe um CEP válido para calcular o frete.");
        return;
    }
    if (carrinho.length === 0) {
        mostrarMensagemFrete("Adicione produtos ao carrinho antes de calcular o frete.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/frete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cep, valorTotal: total })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Falha ao calcular frete.");
        const shipping = document.getElementById("shippingCostDisplay");
        if (shipping) {
            shipping.textContent = `Frete: R$ ${data.valor.toFixed(2)}`;
            shipping.dataset.valor = data.valor;
        }
        mostrarMensagemFrete(`Prazo estimado: ${data.prazo} dias úteis.`, true);
    } catch (error) {
        mostrarMensagemFrete(error.message);
    }
}

async function finalizarCompra() {
    if (!usuarioLogado) {
        alert("Você precisa fazer login para finalizar a compra.");
        window.location.href = "login.html";
        return;
    }
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const cep = document.getElementById("cepFrete").value.trim();
    const shipping = document.getElementById("shippingCostDisplay");
    const freteValor = shipping ? parseFloat(shipping.dataset.valor || "0") : 0;
    if (!cep || isNaN(freteValor) || freteValor < 0) {
        alert("Calcule o frete antes de finalizar a compra.");
        return;
    }

    const pedido = {
        itens: carrinho,
        cep,
        frete: freteValor,
        totalProdutos: carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0),
        totalPedido: carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0) + freteValor,
        criadoEm: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_BASE}/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(pedido)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Não foi possível concluir o pedido.");
        alert("Pedido finalizado com sucesso! Número do pedido: " + data.pedidoId);
        carrinho = [];
        salvarCarrinho();
        atualizarCarrinho();
        mostrarMensagemFrete("", false);
        document.getElementById("cepFrete").value = "";
        const shipping = document.getElementById("shippingCostDisplay");
        if (shipping) {
            shipping.textContent = "Frete: R$ 0,00";
            shipping.dataset.valor = 0;
        }
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("click", (e) => {
    const modal = document.getElementById("modalProduto");
    if (e.target === modal) fecharModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharModal();
        const cartSidebar = document.getElementById("cartSidebar");
        const overlay = document.getElementById("overlay");
        if (cartSidebar) cartSidebar.style.display = "none";
        if (overlay) overlay.style.display = "none";
    }
});
