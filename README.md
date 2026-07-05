# henrique.dev — site pessoal

Site de portfólio servido via Nginx + Docker, com deploy automático via GitHub Actions (self-hosted runner).

## Estrutura

```
public/
├── index.html        ← página única; seções são shells preenchidos pelo JS
├── style.css         ← todos os estilos, sem preprocessador
├── translations.js   ← conteúdo PT/EN (objeto TRANSLATIONS)
├── main.js           ← lógica de renderização e toggle de idioma
└── img/              ← badges das certificações
nginx.conf
docker-compose.yml
```

## Setup inicial no servidor

### 1. Criar a rede Docker

```bash
docker network create homelab
```

### 2. Clonar o repositório

```bash
git clone https://github.com/HenriqueANunes/portifolio.git
cd portifolio
```

### 3. Subir o container

```bash
docker compose up -d
```

### 4. Configurar o self-hosted runner

No GitHub: **Settings → Actions → Runners → New self-hosted runner → Linux**.

Siga as instruções geradas. No final, instale como serviço:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

## Deploy

Qualquer commit na `main` dispara o workflow `.github/workflows/deploy.yml`, que:
1. Faz `git pull` no servidor
2. Roda `docker compose up -d`

O Nginx serve os arquivos estáticos da pasta `public/` sem rebuild de imagem. Edições em `public/` ficam disponíveis imediatamente.

## Atualizar conteúdo

Todo o texto do site está em `public/translations.js`. Edite as chaves nos objetos `TRANSLATIONS.pt` e `TRANSLATIONS.en` e faça push — o deploy é automático.
