# Atlas de Conhecimento — CLAUDE.md

Esta é a fonte de verdade do projeto **Atlas**. Qualquer instrução aqui contida
tem precedência sobre suposições de bom senso genéricas. Os `CLAUDE.md` dentro
de cada pasta de domínio (ex.: `direito-penal/CLAUDE.md`) **complementam** este
arquivo — eles definem a persona/rigor de conteúdo daquele domínio específico;
este arquivo define as regras estruturais e de processo válidas para o
repositório inteiro.

## O que é o Atlas

O Atlas é um hub estático de **trilhas de conhecimento independentes**
("projetos"), cada uma uma árvore de disciplinas com pré-requisitos,
progressão pedagógica e conteúdo técnico/acadêmico denso. Não é um único
roadmap — é uma coleção de roadmaps autocontidos, cada um em sua própria pasta
na raiz, listados em `projects.json` e renderizados como cards em `index.html`
(a página inicial / hub).

Domínios ativos hoje (ver `projects.json` para a lista oficial): engenharia de
dados (Staff level), direito penal e processual penal, ciência do gatilho,
doutrina policial e perícia forense, engenharia de armamento e balística,
neurociência cognitiva, engenharia de dados (pós/PPC) e direito operacional.

## Arquitetura do repositório

```
/
├── index.html          # hub — lê projects.json e renderiza os cards
├── projects.json        # registro central de todos os projetos/domínios
├── iniciar-servidor.bat # sobe um http.server estático na raiz (porta 8000)
├── <dominio>/            # um projeto/trilha autocontido
│   ├── index.html        # viewer da trilha (fetch dos .md ou .json)
│   ├── CLAUDE.md          # (quando existir) governança de conteúdo do domínio
│   ├── INDICE.md          # (quando existir) índice mestre com DAG de pré-requisitos
│   └── disciplinas/       # um .md por disciplina
└── old/                  # arquivo morto — ver seção "Pastas especiais"
    ├── outros/            # material-fonte bruto (.docx/.md) já promovido ou sem uso atual
    └── study/             # app React/Vite/Express isolado, arquivado — ver seção própria
```

Stack: cada domínio é HTML estático + Tailwind via CDN + JS vanilla, sem build
step. Não há bundler nem framework nos domínios — isso é intencional (abrir e
funcionar via `file://` ou um `http.server` simples).

Este repositório usa git (inicializado nesta fase do projeto). Sempre revisar
`git status`/`git diff` antes de commitar, e preferir commits temáticos
separados a um único commit grande quando a mudança cobrir áreas distintas.

## Padrão de um domínio

Todo domínio novo deve seguir o padrão já adotado por 6 dos 8 domínios atuais
(`ciencia-do-gatilho`, `direito-operacional`, `doutrina-policial`,
`engenharia-armamento`, `engenharia-de-dados-pos`, `neurociencia-cognitiva`):

1. `index.html` — viewer que faz `fetch('disciplinas/{ID}-{slug}.md')` e
   renderiza markdown no cliente.
2. `disciplinas/D{domínio}.{disciplina}-{slug}.md` — um arquivo por
   disciplina. `slug` em minúsculas, ASCII, sem acento, palavras completas
   (não truncar no meio de uma palavra).
3. `CLAUDE.md` — governança de conteúdo daquele domínio (persona, critérios de
   qualidade, estrutura obrigatória de cada disciplina, o que evitar). Todo
   domínio deve ter um, seguindo o formato de `direito-penal/CLAUDE.md` ou
   `software-engineer/CLAUDE.md` como referência.
4. `INDICE.md` — índice mestre: tabela por domínio pedagógico (ID, nome,
   nível, carga horária, se é núcleo) + DAG de dependências entre domínios +
   carga horária total. Ver `direito-penal/INDICE.md` como referência.

`software-engineer/` usa um padrão alternativo (dados em
`data/index.json` + `data/conceitos.json` + `data/disciplinas/*.json`, sem
`INDICE.md` em markdown) porque antecede o padrão acima. Não migrar
retroativamente sem necessidade — mas **domínios novos usam o padrão
markdown**, que é mais simples de auditar e não exige parser de JSON no
viewer.

### `projects.json`

Todo domínio com `index.html` publicável deve ter uma entrada em
`projects.json` na raiz, com os campos: `id` (= nome da pasta), `titulo`,
`subtitulo`, `descricao`, `url` (relativa à raiz), `dominios` (nº de domínios
pedagógicos do `INDICE.md`), `disciplinas` (nº total de disciplinas), `cor`
(`amber|indigo|emerald|rose`), `icone` (emoji ou entidade HTML) e `status`
(`ativo|em construção`). Os números de `dominios`/`disciplinas` são
derivados — sempre que o conteúdo de um domínio mudar, reconferir e atualizar
esses números manualmente (não há automação hoje).

## Fluxo obrigatório para editar conteúdo de qualquer domínio

Esta regra vale para qualquer edição de disciplina existente, criação de
disciplina nova, ou reorganização de domínio — não apenas para "grandes"
mudanças:

1. Ler todos os arquivos relacionados (`INDICE.md`, `CLAUDE.md` do domínio,
   e as disciplinas vizinhas) antes de propor qualquer alteração.
2. Identificar inconsistências com o restante do roadmap (conceito
   duplicado, pré-requisito quebrado, sobreposição com outro domínio ou até
   com outro projeto do Atlas).
3. Montar um plano explícito e apresentá-lo, explicando: por que a mudança é
   necessária, o impacto nas demais disciplinas/domínios, e possíveis
   efeitos colaterais.
4. Aguardar aprovação explícita do usuário antes de implementar.

Nunca implementar mudanças estruturais (nova disciplina, fusão, divisão,
reordenação de pré-requisitos) sem passar por esse fluxo. Correções pontuais
de erro factual/typo em uma disciplina já existente não exigem o fluxo
completo, mas ainda assim devem ser sinalizadas ao usuário.

**Regra de não-redundância:** cada conceito deve existir uma única vez dentro
de um domínio, e idealmente uma única vez em todo o Atlas — antes de criar
conteúdo sobre um tema, verificar se ele já é coberto em outro domínio. Uma
investigação já mapeou "Engenharia de Dados" em `software-engineer/` (Staff
level) e `engenharia-de-dados-pos/` (PPC formal) como trilhas distintas por
desenho, não redundância a consolidar (ver `engenharia-de-dados-pos/CLAUDE.md`,
seção "Relação com `software-engineer/`"); os rascunhos-fonte soltos que
tratavam do mesmo tema foram movidos para `old/outros/` (ver abaixo).

## Pastas especiais

### `old/`

Arquivo morto do Atlas: material divergente, já promovido, ou sem uso na fase
atual do projeto, mantido apenas por valor histórico/de referência — não é
servido pelo hub nem por nenhum domínio ativo. Nada em `old/` deve ser
referenciado por `index.html`/`FILE_MAP` de um domínio publicado. Contém duas
subpastas:

- **`old/outros/`** — ementas e material-fonte em `.docx`/`.md`/`.ipynb` que
  já foi promovido a um domínio publicado (conteúdo 100% incorporado,
  confirmado por comparação estrutural) ou que é redundante/incompleto demais
  para virar disciplina (ex.: o cluster de rascunhos soltos de Engenharia de
  Dados/Ciência de Dados/ML, todos redundantes com `software-engineer/` ou sem
  ementa formal). Também recebeu os protótipos HTML/notebook sem relação com
  o Atlas que antes estavam soltos em `study/` (direito, jurisprudência,
  lógica). Se um novo rascunho for adicionado aqui no futuro e depois
  promovido a domínio, seguir o "Padrão de um domínio" acima e então mover o
  arquivo-fonte correspondente para `old/outros/`.
- **`old/study/`** — app separado (React + Vite + TypeScript + Express +
  SQLite) chamado internamente "Roadmap interativo de Engenharia de Dados e
  IA". Nunca esteve registrado em `projects.json` e não seguia o padrão
  estático do resto do Atlas; arquivado por decisão explícita do usuário.
  `old/study/run.bat` ainda funciona se o app precisar ser reativado, mas não
  há expectativa de manutenção contínua enquanto estiver em `old/`.

## Estilo de conteúdo

Regras válidas para todo o Atlas, além do que cada `CLAUDE.md` de domínio já
define:

- Sem emojis nem floreios de marketing no corpo do conteúdo técnico/jurídico
  (emojis são aceitáveis apenas na UI do hub/viewer, como ícones de card).
  Cada domínio pode ter estilo de nível diferente, mas a regra é sempre
  "profundidade > quantidade de disciplinas".
- Usar nomes oficiais de institutos/algoritmos/normas — nunca inventar
  terminologia.
- Toda disciplina nova deve declarar pré-requisitos reais e respeitá-los no
  DAG do `INDICE.md`.

### Divergência terminológica entre domínios (decisão consciente, não pendência)

Uma auditoria identificou três pontos em que os `CLAUDE.md` de domínio usam
nomenclatura diferente para o mesmo elemento estrutural. Isso é registrado
aqui como **decisão consciente**, não como inconsistência a corrigir:

- **Nome da seção de perguntas abertas**: `## Perguntas avançadas`
  (`ciencia-do-gatilho/`, `doutrina-policial/`, `engenharia-armamento/`,
  `neurociencia-cognitiva/`) vs. `## Questões avançadas`
  (`direito-operacional/`, `direito-penal/`).
- **Escala de Nível**: `Foundation/Intermediate/Advanced`
  (`ciencia-do-gatilho/`, `neurociencia-cognitiva/`) vs.
  `Foundation/Intermediate/Advanced/Specialist` (`direito-operacional/`,
  `direito-penal/`, `doutrina-policial/`, `engenharia-armamento/`).
- **Sufixo de capstone**: `(capstone)` (`ciencia-do-gatilho/`,
  `direito-penal/`) vs. `(capstone do domínio)` / `(capstone da trilha)`
  (`direito-operacional/`, `doutrina-policial/`, `engenharia-armamento/`,
  `neurociencia-cognitiva/`).

Essas divergências **não serão padronizadas retroativamente** — o custo de
reescrever os 88 arquivos de disciplina já publicados é alto e o benefício,
baixo (nenhuma delas quebra o viewer, o fetch de markdown ou o DAG de
pré-requisitos; cada domínio é internamente consistente). Ao criar um domínio
novo, escolher uma das convenções acima (ou uma nova) e documentá-la
explicitamente no `CLAUDE.md` daquele domínio, mantendo consistência interna
com as próprias disciplinas.

## Como rodar localmente

- Hub + domínios estáticos: `iniciar-servidor.bat` (sobe
  `python -m http.server 8000` na raiz e abre `http://localhost:8000`).
- `old/study/` (arquivado, ver "Pastas especiais"): `old/study/run.bat`
  (verifica Node, roda `npm install` se necessário, depois `npm run dev`,
  expondo Vite em `http://localhost:5173` + backend Express/SQLite em
  `:3001`).

## Melhorias identificadas (backlog)

Este é um levantamento vivo — atualizar conforme itens forem resolvidos ou
novos forem encontrados. Nenhum destes itens deve ser executado sem seguir o
"Fluxo obrigatório" acima e sem aprovação explícita do usuário.

1. **Contagens em `projects.json` não são verificadas automaticamente** —
   `dominios`/`disciplinas` são digitados à mão e podem divergir do conteúdo
   real de cada domínio à medida que ele evolui. Última verificação manual
   (auditoria completa dos 8 domínios) não encontrou divergência.

Itens já resolvidos nesta fase do projeto (histórico, não repetir): controle
de versão git inicializado; os 8 domínios agora têm `CLAUDE.md`/`INDICE.md`
próprios (ou `data/index.json` no caso de `software-engineer/`); a relação
entre `software-engineer/` e `engenharia-de-dados-pos/` foi investigada e
documentada como sobreposição intencional, não redundância; backups órfãos de
`software-engineer/` (`data_backup_fase3/`, `.legacy.html`) removidos; os 54
slugs de arquivo truncados/desatualizados em 5 domínios foram corrigidos;
`outros/` e `study/` foram movidos para `old/` (ver "Pastas especiais").
