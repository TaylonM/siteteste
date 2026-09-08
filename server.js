const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'troca-por-uma-chave-segura';
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  if (!process.env.SESSION_SECRET) {
    console.warn('AVISO: SESSION_SECRET não definido. Use uma chave segura em produção.');
  }
}

const produtos = [
  {
    id: 1,
    nome: 'Camisa Clássica Azul',
    categoria: 'masculino',
    preco: 89.9,
    precoOriginal: 129.9,
    descricao: 'Camisa clássica em tons de azul, perfeita para uso casual ou profissional',
    imagem: 'imagens%20das%20camisas/Azul-royal_78644643.avif',
    imagemAlt: 'Camisa clássica azul',
    rating: 5,
    material: '100% Algodão',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#1E3A8A', '#60A5FA', '#93C5FD'],
    novo: true
  },
  {
    id: 2,
    nome: 'Camisa Vermelha Moderna',
    categoria: 'unissex',
    preco: 79.9,
    precoOriginal: 119.9,
    descricao: 'Design moderno e minimalista em vermelho vibrante',
    imagem: 'imagens%20das%20camisas/90_camisa_polo_aleatory_marinho_listrada_3901_variacao_13081_2_ea1d9cd3754607e21b89292dbac926c2.webp',
    imagemAlt: 'Camisa vermelha moderna',
    rating: 4,
    material: 'Algodão com elastano',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#DC2626', '#EF4444', '#FCA5A5'],
    novo: false
  },
  {
    id: 3,
    nome: 'Camisa Preta Premium',
    categoria: 'masculino',
    preco: 99.9,
    precoOriginal: 149.9,
    descricao: 'Camisa premium em preto, ideal para qualquer ocasião',
    imagem: 'imagens%20das%20camisas/731914-500-685.webp',
    imagemAlt: 'Camisa preta premium',
    rating: 5,
    material: 'Algodão Premium',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#000000', '#1F2937', '#374151'],
    novo: true
  },
  {
    id: 4,
    nome: 'Camisa Branca Básica',
    categoria: 'unissex',
    preco: 59.9,
    precoOriginal: 99.9,
    descricao: 'Clássica camisa branca, essencial no guarda-roupa',
    imagem: 'imagens%20das%20camisas/camisa.webp',
    imagemAlt: 'Camisa branca básica',
    rating: 4,
    material: '100% Algodão',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#FFFFFF', '#F3F4F6', '#E5E7EB'],
    novo: false
  },
  {
    id: 5,
    nome: 'Camisa Rosa Feminina',
    categoria: 'feminino',
    preco: 89.9,
    precoOriginal: 129.9,
    descricao: 'Camisa feminina em rosa pastel com ajuste elegante',
    imagem: 'imagens%20das%20camisas/camisa%20feminina%201.webp',
    imagemAlt: 'Camisa rosa feminina',
    rating: 5,
    material: 'Algodão fino',
    tamanhos: ['P', 'M', 'G'],
    cores: ['#FFC0CB', '#FFB6C1', '#FFC0CB'],
    novo: true
  },
  {
    id: 6,
    nome: 'Camisa Verde Eco',
    categoria: 'unissex',
    preco: 94.9,
    precoOriginal: 139.9,
    descricao: 'Camisa sustentável em verde, feita com algodão orgânico',
    imagem: 'imagens%20das%20camisas/D_Q_NP_2X_685845-MLB81562840626_012025-E-camiseta-camisa-aleatory-listrada-original.webp',
    imagemAlt: 'Camisa verde eco',
    rating: 5,
    material: 'Algodão Orgânico',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#10B981', '#34D399', '#6EE7B7'],
    novo: true
  },
  {
    id: 7,
    nome: 'Camisa Amarela Vibrante',
    categoria: 'masculino',
    preco: 79.9,
    precoOriginal: 119.9,
    descricao: 'Camisa em amarelo vibrante para se destacar',
    imagem: 'imagens%20das%20camisas/M09DUQ02A2.avif',
    imagemAlt: 'Camisa amarela vibrante',
    rating: 4,
    material: 'Algodão com elastano',
    tamanhos: ['P', 'M', 'G'],
    cores: ['#FBBF24', '#FCD34D', '#FEF3C7'],
    novo: false
  },
  {
    id: 8,
    nome: 'Camisa Cinza Elegante',
    categoria: 'masculino',
    preco: 84.9,
    precoOriginal: 124.9,
    descricao: 'Camisa cinza elegante para looks sofisticados',
    imagem: 'imagens%20das%20camisas/90_camisa_polo_aleatory_marinho_listrada_3901_variacao_13081_2_ea1d9cd3754607e21b89292dbac926c2.webp',
    imagemAlt: 'Camisa cinza elegante',
    rating: 4,
    material: '100% Algodão',
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['#6B7280', '#9CA3AF', '#D1D5DB'],
    novo: false
  },
  {
    id: 9,
    nome: 'Camisa Roxa Estilosa',
    categoria: 'feminino',
    preco: 89.9,
    precoOriginal: 129.9,
    descricao: 'Camisa roxa com padrão moderno exclusivo',
    imagem: 'imagens%20das%20camisas/camisa%20feminina%202.webp',
    imagemAlt: 'Camisa roxa estilosa',
    rating: 5,
    material: 'Algodão fino',
    tamanhos: ['P', 'M', 'G'],
    cores: ['#8B5CF6', '#A78BFA', '#DDD6FE'],
    novo: true
  }
];

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  for (const file of [USERS_FILE, ORDERS_FILE]) {
    try {
      await fs.access(file);
      const content = await fs.readFile(file, 'utf-8');
      if (!content.trim()) {
        await fs.writeFile(file, '[]', 'utf-8');
      }
    } catch {
      await fs.writeFile(file, '[]', 'utf-8');
    }
  }
}

async function readJson(filePath) {
  try {
    const text = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(text || '[]');
  } catch (error) {
    return [];
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function sanitizeString(value) {
  return String(value || '').trim();
}

function validaEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validaCep(cep) {
  return /^[0-9]{5}-?[0-9]{3}$/.test(cep);
}

function getUserProfile(user) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    cpf: user.cpf,
    nascimento: user.nascimento,
    endereco: user.endereco,
    observacoes: user.observacoes,
    recebeNewsletter: user.recebeNewsletter,
    criadoEm: user.criadoEm
  };
}

app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '12kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  const pathLower = req.path.toLowerCase();
  if (
    pathLower === '/server.js' ||
    pathLower === '/package.json' ||
    pathLower === '/package-lock.json' ||
    pathLower === '/readme.md' ||
    pathLower.startsWith('/data') ||
    pathLower.endsWith('.json') ||
    pathLower.endsWith('.md') ||
    pathLower.endsWith('.lock')
  ) {
    return res.status(404).end();
  }
  next();
});

app.use(express.static(path.join(__dirname), { dotfiles: 'ignore', index: false }));

app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/api/register', async (req, res) => {
  const { nome, email, senha, telefone, cpf, nascimento, endereco, observacoes, recebeNewsletter } = req.body;

  if (!nome || !email || !senha || !telefone || !cpf || !nascimento || !endereco || !endereco.cep) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }
  if (!validaEmail(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }
  if (senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  }
  if (!validaCep(endereco.cep)) {
    return res.status(400).json({ message: 'CEP inválido.' });
  }

  const users = await readJson(USERS_FILE);
  const emailLower = email.toLowerCase();
  if (users.some(user => user.email === emailLower)) {
    return res.status(400).json({ message: 'Já existe uma conta registrada com esse e-mail.' });
  }

  const passwordHash = await bcrypt.hash(senha, 10);
  const newUser = {
    id: uuidv4(),
    nome: sanitizeString(nome),
    email: emailLower,
    telefone: sanitizeString(telefone),
    cpf: sanitizeString(cpf),
    nascimento: sanitizeString(nascimento),
    endereco: {
      rua: sanitizeString(endereco.rua),
      numero: sanitizeString(endereco.numero),
      bairro: sanitizeString(endereco.bairro),
      cidade: sanitizeString(endereco.cidade),
      estado: sanitizeString(endereco.estado),
      cep: endereco.cep.replace(/\D/g, ''),
      complemento: sanitizeString(endereco.complemento)
    },
    observacoes: sanitizeString(observacoes),
    recebeNewsletter: Boolean(recebeNewsletter),
    passwordHash,
    criadoEm: new Date().toISOString()
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);

  req.session.user = { id: newUser.id, nome: newUser.nome, email: newUser.email };
  res.json({ usuario: getUserProfile(newUser) });
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const users = await readJson(USERS_FILE);
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  const valid = await bcrypt.compare(senha, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  req.session.user = { id: user.id, nome: user.nome, email: user.email };
  res.json({ usuario: getUserProfile(user) });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Não foi possível encerrar a sessão.' });
    }
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/profile', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
  const users = await readJson(USERS_FILE);
  const user = users.find(u => u.id === req.session.user.id);
  if (!user) {
    return res.status(401).json({ message: 'Sessão inválida.' });
  }
  res.json({ usuario: getUserProfile(user) });
});

app.post('/api/frete', (req, res) => {
  const { cep } = req.body;
  if (!cep || !validaCep(cep)) {
    return res.status(400).json({ message: 'CEP inválido para frete.' });
  }

  const cleanCep = cep.replace(/\D/g, '');
  const distancia = 10 + (Number(cleanCep.slice(0, 3)) % 1000);
  const valor = distancia <= 100 ? 0 : 15.90 + Math.floor((distancia - 100) / 500) * 5;
  const prazo = 2 + Math.ceil(distancia / 250);

  res.json({ cep: cleanCep, valor: Number(valor.toFixed(2)), prazo });
});

app.post('/api/checkout', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário precisa estar logado para finalizar a compra.' });
  }

  const { itens, cep, frete, totalProdutos, totalPedido } = req.body;
  if (!Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ message: 'O carrinho está vazio.' });
  }
  if (!cep || !validaCep(cep)) {
    return res.status(400).json({ message: 'CEP inválido para entrega.' });
  }
  if (typeof frete !== 'number' || frete < 0) {
    return res.status(400).json({ message: 'Valor de frete inválido.' });
  }

  const itensProcessados = [];
  for (const item of itens) {
    const quantidade = Number(item.quantidade);
    const preco = Number(item.preco);
    if (!item || !item.id || !item.nome || quantidade <= 0 || preco < 0) {
      return res.status(400).json({ message: 'Dados inválidos no item do pedido.' });
    }
    itensProcessados.push({
      id: item.id,
      nome: sanitizeString(item.nome),
      preco,
      quantidade,
      tamanho: sanitizeString(item.tamanho),
      cor: sanitizeString(item.cor)
    });
  }

  const totalProdutosCalculado = Number(itensProcessados.reduce((sum, item) => sum + item.preco * item.quantidade, 0).toFixed(2));
  const totalPedidoCalculado = Number((totalProdutosCalculado + Number(frete)).toFixed(2));

  if (Math.abs(Number(totalProdutos) - totalProdutosCalculado) > 0.01 || Math.abs(Number(totalPedido) - totalPedidoCalculado) > 0.01) {
    return res.status(400).json({ message: 'Totais do pedido não correspondem aos itens ou frete.' });
  }

  const orders = await readJson(ORDERS_FILE);
  const orderId = uuidv4();
  const order = {
    id: orderId,
    usuarioId: req.session.user.id,
    itens: itensProcessados,
    cep: cep.replace(/\D/g, ''),
    frete: Number(frete),
    totalProdutos: totalProdutosCalculado,
    totalPedido: totalPedidoCalculado,
    criadoEm: new Date().toISOString()
  };

  orders.push(order);
  await writeJson(ORDERS_FILE, orders);
  res.json({ pedidoId: orderId });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

ensureDataFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
