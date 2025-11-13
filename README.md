<<<<<<< HEAD
# cadastro
=======
# Projeto: Cadastro (trabalho escolar)

Este projeto é um pequeno app Next.js que permite cadastrar usuários (nome + email) e guarda os dados em um banco MongoDB.

Principais arquivos:
- `pages/index.js` — frontend com formulário e lista de usuários
- `pages/api/users.js` — API para GET/POST de usuários
- `lib/mongodb.js` — helper para conectar ao MongoDB usando `MONGODB_URI`

Como rodar localmente
1. Instale dependências:

```powershell
npm install
```

2. Crie um arquivo `.env.local` na raiz com a variável de ambiente:

```
MONGODB_URI=your-mongodb-connection-string
```

3. Rode em desenvolvimento:

```powershell
npm run dev
```

Abra http://localhost:3000

Criando o MongoDB Atlas (resumo rápido)
1. Vá para https://www.mongodb.com/atlas e crie uma conta ou faça login.
2. Crie um novo cluster grátis (Shared Cluster).
3. No cluster, crie um database user (username + password) e configure IP whitelist para permitir seu IP (ou 0.0.0.0/0 para testes).
4. Clique em Connect → Connect your application e copie a connection string (começa com `mongodb+srv://`). Substitua `<password>` pelo password do usuário e, se quiser, adicione `?retryWrites=true&w=majority`.

Deploy no Vercel
1. Crie uma conta em https://vercel.com/ e conecte seu GitHub.
2. Faça push do repositório para o GitHub (veja abaixo). No Vercel, escolha importar do GitHub e selecione o repositório.
3. Em Settings → Environment Variables do projeto Vercel, adicione `MONGODB_URI` com a mesma string do Atlas.
4. Deploy. O Vercel roda `npm install` e `npm run build` automaticamente.

Push para o seu repositório GitHub
1. No terminal, execute (no diretório do projeto):

```powershell
git init
git add .
git commit -m "Initial commit: cadastro app"
git branch -M main
git remote add origin https://github.com/SabrinyVeloso/cadastro-.git
git push -u origin main
```

Observações e próximos passos
- Se o push falhar por autenticação, certifique-se de que seu GitHub CLI/credenciais estão configuradas ou use token/SSH.
- Ao implantar no Vercel, adicione a variável `MONGODB_URI` nas Environment Variables do projeto (Production).
- Para apresentação escolar, você pode capturar a URL pública do Vercel e entregar.
>>>>>>> 7556998 (docs: add README with setup and deploy steps)
