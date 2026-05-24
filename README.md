# henrique.dev — site pessoal

Site de portfólio servido via Nginx + Docker, com deploy automático via GitHub Actions (self-hosted runner).

## Estrutura

```
site/
├── .github/workflows/deploy.yml   ← CI/CD
├── html/
│   └── index.html                 ← o site
├── nginx.conf
├── docker-compose.yml
└── README.md
```

## Setup inicial no servidor

### 1. Clonar o repositório

```bash
cd ~/homelab
git clone https://github.com/HenriqueANunes/seu-site.git site
cd site
```

### 2. Subir o container

```bash
docker compose up -d
```

### 3. Configurar o self-hosted runner

No GitHub: Settings → Actions → Runners → New self-hosted runner → Linux.

Siga as instruções geradas. No final, instale como serviço:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

O runner vai rodar em background e executar o deploy automaticamente a cada `git push` na branch `main`.

## Deploy

Qualquer commit na `main` dispara o workflow `.github/workflows/deploy.yml`, que:
1. Faz `git pull` no servidor
2. Roda `docker compose up -d`

O Nginx serve os arquivos estáticos da pasta `html/` sem rebuild de imagem.