# Plataforma Ecommerce

Uma plataforma de ecommerce moderna e escalável.

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas antes de começar:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/<MarcosAtlas>/plataforma-ecommerce.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd plataforma-ecommerce
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Configuração

Antes de iniciar o projeto, configure as variáveis de ambiente necessárias. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
REACT_APP_API_URL=https://sua-api.com
REACT_APP_API_KEY=sua-chave-api
```

Certifique-se de substituir os valores pelos dados reais do seu ambiente.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera os arquivos de produção na pasta `build`.
- `npm run test`: Executa os testes automatizados.
- `npm run lint`: Verifica o código em busca de problemas de estilo ou erros.
- `npm run deploy`: Realiza o deploy no GitHub Pages.

## Estrutura do Projeto

Uma visão geral da estrutura de diretórios do projeto:

```
plataforma-ecommerce/
├── public/          # Arquivos públicos (HTML, ícones, etc.)
├── src/             # Código-fonte do projeto
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas principais
│   ├── services/    # Serviços e chamadas de API
│   ├── styles/      # Arquivos de estilo (CSS/SASS)
│   └── utils/       # Funções utilitárias
├── .env             # Variáveis de ambiente
├── package.json     # Configuração do npm
└── README.md        # Documentação do projeto
```

## Deploy

Para realizar o deploy no GitHub Pages:

1. Configure o campo `homepage` no `package.json` com a URL do seu GitHub Pages:

   ```json
   "homepage": "https://<seu-usuario>.github.io/plataforma-ecommerce"
   ```

2. Execute o comando de deploy:

   ```bash
   npm run deploy
   ```

O site estará disponível na URL configurada.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m "Minha nova feature"`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.