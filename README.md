# rodrigoge.com.br

Portfólio de Rodrigo em Next.js (App Router), TypeScript, Tailwind CSS,
Motion e next-intl. Geist Sans e Geist Mono configuradas. Lucide disponível
para as próximas seções.

## Executar localmente

Requer Node.js 20.9 ou superior.

```sh
npm install
npm run dev
```

A página `/` abre em português. A versão inglesa está em `/en`.
O seletor EN/PT mantém o idioma na URL. A preferência do navegador não
substitui o português na página principal.

## Estrutura

- `src/components/hero.tsx`: seção Hero e seletor de idioma.
- `src/components/about.tsx`: seção Sobre mim.
- `src/components/projects.tsx`: projetos pessoais com mockups mobile e web.
- `src/data/projects.ts`: projetos, tecnologias e links públicos.
- `src/components/experience.tsx`: timeline de experiências profissionais.
- `src/components/contact.tsx`: contatos, redes sociais e rodapé.
- `src/data/contact.ts`: e-mail e URLs dos perfis; o link do LinkedIn aparece
  quando sua URL estiver preenchida.
- `src/app/globals.css`: composição, sublinhados e adaptações responsivas.
- `messages/pt.json` e `messages/en.json`: textos e metadados.
- `public/images/rodrigo-cutout.png`: retrato com transparência preparado
  com imagegen a partir da ilustração fornecida.

## Vercel

Importe o repositório como um projeto Next.js na Vercel, usando as
configurações padrão do framework.

Não foram criados testes nem executados instalação, compilação ou servidor
de desenvolvimento nesta implementação; a validação será manual.
