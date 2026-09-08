# CamisetaStyle

Site e backend para a loja CamisetaStyle.

## Como rodar

1. Abra o terminal em `c:\Users\omeri\Desktop\aulas`
2. Rode `npm install`
3. Rode `npm start`
4. Acesse `http://localhost:3000`

## O que está incluído

- Front-end em HTML/CSS/JavaScript
- Backend Express para autenticação e pedidos
- Armazenamento de usuários e pedidos em `data/users.json` e `data/orders.json`
- Segurança básica com `helmet`, `express-session` e cookies `httpOnly`
- Cálculo de frete por CEP e total do carrinho
- Registro, login, perfil, checkout e logout

## Observações

- Para produção, defina `SESSION_SECRET` no ambiente.
- Use HTTPS em produção para que os cookies `secure` funcionem corretamente.
