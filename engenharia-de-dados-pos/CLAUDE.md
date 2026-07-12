# Projeto: Pós-Graduação em Engenharia de Dados (PPC)

## Missão

Manter o ementário deste domínio fiel ao **Projeto Pedagógico de Curso (PPC)**
de uma pós-graduação lato sensu em Engenharia de Dados, com base nas
disciplinas oficiais de instituição (Anhanguera) complementadas com conteúdo
de mercado. O rascunho-fonte original está em
`outros/pos-Engenharia de Dados.md`; a fonte de verdade para qualquer edição,
porém, são os arquivos já promovidos em `disciplinas/`.

Isto **não** é uma trilha Staff/Principal. É formação acadêmica formal de
nível introdutório a intermediário (perfil de egresso declarado nas próprias
disciplinas: "Engenheiro de Dados júnior/pleno"). Prioridade: fidelidade ao
formato institucional do PPC, não profundidade máxima por disciplina.

## Relação com `software-engineer/`

Existe um projeto irmão, `software-engineer/`, que cobre Engenharia de Dados
em nível Staff/Principal/Research (ver `software-engineer/CLAUDE.md`) com 73
disciplinas e rigor de "conhecimento esperado de um Staff Engineer em
empresas como Google, Meta, Databricks ou Snowflake". `engenharia-de-dados-pos/`
e `software-engineer/` **vão se sobrepor conceitualmente** — ambos tratam de
Data Warehouse, Spark, cloud, NoSQL, governança, streaming etc. Isso é
esperado e não deve ser "corrigido" fundindo os dois domínios: são públicos e
profundidades diferentes por desenho (ver `CLAUDE.md` raiz, seção "Melhorias
identificadas", item 3). Ao editar disciplinas aqui:

- Não copiar profundidade/rigor de `software-engineer/` para este domínio —
  isso descaracterizaria o PPC (que é formação de entrada, não avançada).
- Não remover um tópico daqui só porque ele "já existe" em
  `software-engineer/` — os domínios são trilhas independentes com públicos
  diferentes, cada um deve ser autocontido.
- Ao criar conteúdo novo neste domínio, ainda assim checar se o tema já é
  tratado em `software-engineer/` ou em `outros/` (regra de não-redundância
  do `CLAUDE.md` raiz) para decidir conscientemente se a sobreposição é
  proposital (nível introdutório vs. avançado do mesmo tema) ou acidental
  (duplicação de conteúdo no mesmo nível).

## Papel

Atue como um comitê pedagógico composto por:

- coordenadores pedagógicos de pós-graduação lato sensu;
- professores de Engenharia de Dados, Banco de Dados e Big Data;
- representantes de mercado (engenheiros de dados seniores atuantes);
- especialistas em governança de dados e LGPD.

Avalie o ementário como uma instituição de ensino superior avaliaria um PPC
para credenciamento: fidelidade a carga horária, ementa, objetivos,
competências, habilidades e conteúdo programático declarados — não como um
roadmap de mercado livre.

## Princípio central: fidelidade ao formato PPC

Diferente de outros domínios do Atlas (que têm liberdade de reorganizar
disciplinas livremente), este domínio documenta um curso já estruturado
institucionalmente. A prioridade é:

- preservar carga horária, ementa, objetivos, competências, habilidades e
  conteúdo programático por unidade tal como declarados no PPC;
- complementar (não substituir) com conteúdo de mercado quando o PPC for
  raso em um tópico já citado (ex.: Kafka é citado como "introdução" em
  D03.02 e D04.02 — pode ser aprofundado, mas sem inflar a disciplina para
  além do escopo de uma pós lato sensu);
- qualquer proposta de fusão, divisão ou reordenação de disciplinas deve
  justificar explicitamente por que o PPC original está incorreto ou
  incompleto, não apenas "poderia ser melhor organizado".

## Estrutura desejada por disciplina

Com base nas 13 disciplinas já promovidas, a estrutura real observada (nem
toda disciplina usa todas as seções — ver inconsistências abaixo) é:

1. **Título** (`# Disciplina N` + `## Nome da disciplina`)
2. **Carga Horária** (ex.: "40 horas")
3. **Ementa** (parágrafo único, denso, lista os temas cobertos)
4. **Objetivos** (lista de capacidades ao final da disciplina)
5. **Competências** (lista curta de competências macro)
6. **Habilidades** (lista de "o aluno será capaz de")
7. **Conteúdo Programático** — dividido em **Unidade I a V**, cada unidade
   com uma lista de tópicos/subtemas
8. **Laboratórios** (atividades práticas aplicadas)
9. **Ferramentas** (tecnologias nomeadas oficialmente — nunca inventadas)
10. **Avaliação** (critérios com peso percentual, quando presente)
11. **Bibliografia Básica** e **Bibliografia Complementar** (autor, obra;
    priorizar referências clássicas/reconhecidas, como já ocorre)

Este é o "formato completo" (visto em D01.01, D02.01, D02.02, D02.03,
D03.01-D03.03). Toda disciplina **nova** deve seguir este formato completo.

## Estrutura desejada por disciplina — exceção do Projeto Final Integrador

D04.04 (capstone) usa um formato diferente e legítimo por ser projeto, não
disciplina teórica: Ementa, Objetivos, **Estrutura do Projeto** (problema de
negócio, arquitetura, implementação, governança, entrega final) em vez de
Conteúdo Programático por Unidade, Ferramentas, Bibliografia. Preservar essa
diferença — não forçar D04.04 ao formato padrão de 11 seções.

## Inconsistências observadas (não corrigir sem aprovação)

Registradas aqui para não se perderem, seguindo a mesma lógica do backlog do
`CLAUDE.md` raiz — nenhuma foi corrigida nesta rodada, pois exigiria alterar
`disciplinas/*.md` (fora do escopo desta tarefa) e o fluxo obrigatório abaixo:

1. **Carga horária do Módulo I inconsistente.** O rascunho-fonte declara
   "Módulo I – Fundamentos da Engenharia de Dados (200h)", mas as 3
   disciplinas do módulo (D01.01-D01.03) somam apenas 120h. Não há uma 4ª
   disciplina "perdida" identificável no rascunho-fonte.
2. **Carga horária do Projeto Final Integrador (D04.04) não declarada.** O
   campo "Carga Horária" existe no arquivo mas está vazio.
3. **Módulo IV com seções incompletas em relação aos módulos I-III.** As
   disciplinas D04.01, D04.02 e D04.03 não têm as seções Competências,
   Habilidades, Laboratórios nem Avaliação (presentes nas demais 9
   disciplinas), e usam "Bibliografia" única em vez de
   Básica/Complementar separadas. Pode ser lacuna do PPC original ou
   material ainda não finalizado.
4. **D04.04 contém conteúdo fora do escopo PPC.** Após a seção
   "Competências finais do curso completo", o arquivo
   `disciplinas/D04.04-projeto-final-integrador.md` inclui um extenso bloco
   informal de "gap para nível pleno" e "6 projetos de portfólio" (com
   emojis e tom de conselho de carreira) que não é ementa/PPC — parece
   conteúdo do rascunho-fonte que vazou para o arquivo promovido. Isso viola
   o princípio de fidelidade ao formato PPC deste domínio e o padrão "sem
   emojis" do `CLAUDE.md` raiz. Fica registrado como candidato a limpeza
   futura (mover para `outros/` ou remover), mediante aprovação.

## Processo obrigatório para editar conteúdo deste domínio

Segue integralmente o "Fluxo obrigatório para editar conteúdo de qualquer
domínio" do `CLAUDE.md` raiz, com os pontos de atenção específicos deste
domínio:

1. Ler tudo: este `CLAUDE.md`, o `INDICE.md`, a disciplina-alvo e as
   disciplinas vizinhas do mesmo módulo (e, quando a mudança tocar um tema
   também coberto em `software-engineer/`, ler a disciplina equivalente lá
   também).
2. Identificar inconsistências: contra o restante do PPC (carga horária,
   seções faltantes, pré-requisitos), contra `outros/pos-Engenharia de
   Dados.md` (o rascunho original — divergências podem indicar erro de
   promoção, não decisão editorial), e contra `software-engineer/` (checar
   se a mudança cria sobreposição *acidental* de nível, não apenas conceitual
   esperada).
3. Montar um plano explícito: o que muda, por que o PPC/rascunho-fonte
   justifica a mudança (ou por que se afasta dele deliberadamente), impacto
   em carga horária total e no `INDICE.md`, e se algo em
   `software-engineer/` precisa ser referenciado ou ajustado em paralelo.
4. Aguardar aprovação explícita do usuário antes de implementar. Correções
   pontuais de erro factual/typo não exigem o fluxo completo, mas ainda
   devem ser sinalizadas.

Nunca gerar disciplina nova "porque falta um tema de mercado" sem antes
confirmar que o PPC institucional realmente não cobre esse tema em nenhuma
unidade existente — o objetivo é documentar fielmente um curso já
credenciado, não redesenhar um roadmap livre.

## Objetivo final

Manter um ementário PPC completo, coerente e fiel ao padrão institucional
(Anhanguera) complementado com conteúdo de mercado quando a ementa já citar
o tema, servindo como referência confiável de "o que uma pós lato sensu em
Engenharia de Dados cobre" — deixando claro, sempre que necessário, que este
é o nível de entrada do Atlas para Engenharia de Dados, e que
`software-engineer/` é o destino para quem busca profundidade Staff/Principal
no mesmo tema.
