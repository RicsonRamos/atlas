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

Este é o "formato completo" (visto em D01.01, D02.01, D02.02, D02.03). Toda
disciplina **nova** deve seguir este formato completo. D03.01-D03.03 chegam
perto (têm Habilidades) mas não têm Avaliação — ver item 6 de
"Inconsistências observadas" abaixo.

## Estrutura desejada por disciplina — exceção do Projeto Final Integrador

D04.04 (capstone) usa um formato diferente e legítimo por ser projeto, não
disciplina teórica: Ementa, Objetivos, **Estrutura do Projeto** (problema de
negócio, arquitetura, implementação, governança, entrega final) em vez de
Conteúdo Programático por Unidade, Ferramentas, Bibliografia. Preservar essa
diferença — não forçar D04.04 ao formato padrão de 11 seções.

## Inconsistências observadas

Registradas aqui para não se perderem, seguindo a mesma lógica do backlog do
`CLAUDE.md` raiz. Ao investigar cada uma contra `outros/pos-Engenharia de
Dados.md` (o rascunho-fonte), ficou claro que só uma delas era um defeito de
promoção; as demais são lacunas do próprio PPC institucional, presentes
já no rascunho-fonte — corrigi-las exigiria inventar conteúdo acadêmico
(carga horária, competências, habilidades, critérios de avaliação) sem
nenhuma fonte, o que viola o princípio de fidelidade ao PPC deste domínio.
Por isso só o item 4 foi corrigido; os itens 1-3, 5 e 6 seguem documentados
como gaps conhecidos do PPC original, não como bugs de arquivo:

1. **Carga horária do Módulo I "200h" no rascunho-fonte vs. 120h reais.**
   O rascunho declara "Módulo I – Fundamentos da Engenharia de Dados (200h)",
   mas as 3 disciplinas do módulo (D01.01-D01.03) somam 120h — no próprio
   rascunho, não só na promoção. Não há uma 4ª disciplina "perdida"
   identificável em nenhuma fonte. **Não corrigido**: não há base para somar
   80h a nenhuma disciplina existente sem inventar carga. `INDICE.md` já usa
   o valor real (120h) e documenta a divergência.
2. **Carga horária do Projeto Final Integrador (D04.04) não declarada.**
   O campo "Carga Horária" já está vazio no rascunho-fonte (linha
   correspondente a "Disciplina 13"), não é um campo perdido na promoção.
   **Não corrigido**: preencher exigiria estimar um número sem fonte
   institucional.
3. **Módulo IV com seções incompletas em relação aos módulos I-III.**
   Confirmado contra o rascunho-fonte: D04.01, D04.02 e D04.03 já não têm
   Competências/Habilidades/Laboratórios/Avaliação nem
   Bibliografia Básica/Complementar separadas no PPC original — a promoção
   foi fiel. **Não corrigido**: escrever essas seções do zero seria
   fabricar conteúdo curricular não credenciado, não uma correção de
   transcrição.
4. **D04.04 continha conteúdo fora do escopo PPC — CORRIGIDO.** Após a
   seção "Competências finais do curso completo",
   `disciplinas/D04.04-projeto-final-integrador.md` tinha um extenso bloco
   informal de "mapa de gap para nível pleno" e "6 projetos de portfólio"
   (emojis, tom de conselho de carreira) que vazou do rascunho-fonte para o
   arquivo promovido — isso violava tanto a fidelidade ao formato PPC deste
   domínio quanto o padrão "sem emojis" do `CLAUDE.md` raiz. Removido; o
   arquivo agora termina em "atuar como Engenheiro de Dados em ambientes
   corporativos reais." O conteúdo removido continua disponível em
   `outros/pos-Engenharia de Dados.md` para quem quiser reaproveitá-lo como
   material de apoio extracurricular (não PPC).
5. **Habilidades ausente em D01.02 e D01.03.** Diferente das outras 11
   disciplinas do curso, `D01.02-banco-de-dados-relacional.md` (Disciplina 2
   no rascunho-fonte) e `D01.03-administração-de-banco-de-dados-dba.md`
   (Disciplina 3) não têm seção "Habilidades". Confirmado contra o
   rascunho-fonte: nenhuma das duas tem essa seção lá — o rascunho pula
   direto de Competências para Conteúdo Programático em ambos os casos.
   **Não corrigido**: escrever a seção do zero seria fabricar conteúdo
   curricular ("o aluno será capaz de...") sem base institucional.
6. **Avaliação ausente em 5 disciplinas (D01.02, D01.03, D03.01, D03.02,
   D03.03).** D01.01, D02.01, D02.02 e D02.03 têm seção "Avaliação" com
   critérios e pesos percentuais; estas cinco não têm. Confirmado contra o
   rascunho-fonte: nas Disciplinas 2, 3, 7, 8 e 9 do PPC original a seção
   "Avaliação" já não existe — a promoção foi fiel. **Não corrigido**:
   definir pesos e critérios de avaliação sem fonte institucional seria
   inventar conteúdo curricular, o mesmo motivo do item 3.

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
