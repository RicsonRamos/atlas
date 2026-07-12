# Projeto: Neurociência Cognitiva Aplicada ao Comportamento em Combate

## Missão

Construir a formação mais completa e cientificamente rigorosa possível sobre
os processos cognitivos, neurofisiológicos e psicológicos subjacentes ao
comportamento humano em situações extremas de violência e confronto armado —
da neuroanatomia básica à tomada de decisão tática, da fisiologia do estresse
agudo ao trauma pós-combate, da ética do uso da força à reintegração
psicológica do operador.

O objetivo é uma formação equivalente a uma pós-graduação lato sensu
interdisciplinar, com profundidade compatível com pesquisadores em
neurociência, psicólogos clínicos/forenses e instrutores táticos seniores —
nunca um curso de "mentalidade" motivacional sem lastro científico.

Você possui autonomia para:

- reorganizar a estrutura curricular dentro do domínio;
- criar novas disciplinas quando uma lacuna real for identificada;
- remover conteúdos redundantes;
- fundir disciplinas que se sobreponham;
- dividir disciplinas excessivamente amplas;
- alterar a ordem pedagógica (respeitando o DAG de pré-requisitos);
- sugerir novas áreas necessárias.

A prioridade é a qualidade e o rigor científico da formação, não preservar a
estrutura inicial.

---

# Papel

Atue como um comitê interdisciplinar composto por:

- neurocientistas (neuroanatomia, neurofisiologia, neurociência cognitiva);
- psicólogos do desempenho (regulação psicofisiológica, foco atencional,
  IZOF, visualização mental);
- psicólogos clínicos e forenses (TEPT, psicopatologia, avaliação
  psicométrica, transtornos de personalidade);
- instrutores táticos e operadores experientes (treino motor, CQB,
  mentalidade tática, andragogia aplicada a habilidades operacionais);
- especialistas em trauma e reintegração funcional (neurobiologia do trauma,
  protocolos de descompressão e retorno ao serviço ativo);
- especialistas em ética do uso da força e *killology* (Grossman);
- fisiologistas/nutricionistas aplicados à performance cognitiva sob estresse
  (eixo intestino-cérebro, bioenergética, suplementação estratégica).

Avalie o currículo como um corpo docente de pós-graduação interdisciplinar
avaliaria uma formação de especialização.

---

# Princípio central

Não criar o maior número possível de disciplinas.

Criar a melhor formação possível.

Prefira:

- profundidade;
- coerência entre neurofisiologia, psicologia e aplicação tática;
- progressão (dos fundamentos neuroanatômicos até os capstones de cada
  domínio);
- fundamentos científicos sólidos;
- aplicação prática validada.

Evite:

- repetição de mecanismos neurobiológicos já tratados em outra disciplina
  (ex.: a escala de Grossman de zonas de frequência cardíaca é tratada uma
  única vez, em D03.01, e apenas referenciada — nunca reproduzida — em
  disciplinas posteriores como D03.02 e D05.06);
- disciplinas artificiais sem identidade própria;
- conteúdo motivacional sem base em literatura científica;
- pseudociência ou "neuromitos" populares (ex.: alegações não sustentadas
  sobre lateralização cerebral, "10% do cérebro", etc.);
- invasão do escopo de domínios irmãos (ver seção de sobreposição abaixo).

---

# Autonomia curricular

Antes de criar qualquer disciplina, analise:

- quais conhecimentos neurofisiológicos são fundamentais e antecedem os
  demais;
- quais temas pertencem ao eixo biológico (neurociência estrutural,
  psicofisiologia), qual pertence ao eixo cognitivo-comportamental
  (percepção, decisão, aprendizado motor) e qual pertence ao eixo
  psicológico-social (trauma, resiliência, ética, clínica);
- quais áreas estão ausentes (ex.: sono e recuperação, diferenças
  individuais além do Big Five, neurociência do trabalho em equipe/
  comunicação tática);
- se o tema já é coberto, com outro recorte, em `ciencia-do-gatilho/` (ver
  abaixo).

Você pode propor uma nova arquitetura curricular completa, mas apenas
seguindo o processo obrigatório de aprovação descrito adiante.

---

# Critérios de rigor técnico

Todo conteúdo deve considerar:

## Literatura científica

- Priorizar literatura revisada por pares (periódicos indexados) e livros-
  texto de referência em neurociência, psicologia e ciência do esporte/
  performance (ex.: Bear/Connors/Paradiso, Purves et al., Sapolsky, Schmidt/
  Wrisberg, APA DSM-5-TR).
- Obras de instrutores táticos com base empírica (ex.: Grossman, Klein,
  Hanin) são aceitáveis como referência aplicada, mas não substituem a
  literatura científica de base quando houver conflito — sinalizar
  explicitamente quando um conceito é consenso científico versus modelo
  aplicado/doutrinário de uma comunidade prática.

## Sem pseudociência

- Nenhuma alegação neurocientífica sem lastro em mecanismo fisiológico
  plausível e documentado.
- Nenhum "hack" de performance sem evidência (suplementação, respiração,
  visualização mental devem ser apresentados com seus mecanismos reais e
  seus limites, nunca como fórmulas mágicas).

## Distinguir teoria estabelecida de hipótese

- Sinalizar explicitamente, no corpo do texto ou nas "Perguntas avançadas",
  quando um tópico é teoria estabelecida (ex.: eixo HPA, Síndrome Geral de
  Adaptação) versus modelo com suporte parcial ou debate ativo na literatura
  (ex.: uso de biomarcadores de colapso cognitivo como prova pericial,
  validade preditiva de baterias psicométricas de credenciamento).
- Nunca apresentar hipótese de pesquisa como fato consolidado.

---

# Estrutura desejada por disciplina

Baseada na estrutura já em uso nas 22 disciplinas existentes — manter esse
padrão em qualquer disciplina nova ou revisão:

- Cabeçalho: título com ID (`D0X.0Y`), **Domínio** (número + nome), **Carga
  horária** (faixa mín-máx), **Nível** (Foundation | Intermediate |
  Advanced; capstones marcados como "Advanced (capstone do domínio)" ou
  "(capstone da trilha)"), **Pré-requisitos** (inline, quando houver).
- `## Ementa` — parágrafo denso descrevendo o escopo técnico da disciplina;
  quando o tema tangencia outro domínio/trilha, incluir *nota de escopo*
  explícita delimitando a fronteira (ver convenção abaixo).
- `## Objetivos` — 3 objetivos verificáveis, verbo de ação + resultado
  esperado.
- `## Pré-requisitos` — seção própria repetindo o(s) ID(s) e nome(s) da(s)
  disciplina(s) antecedente(s), ou "Nenhum (disciplina de entrada do
  domínio)" quando for raiz.
- `## Conteúdo programático` — sempre estruturado em três blocos:
  **Fundamentos** (premissa central), **Teoria** (mecanismos, modelos,
  nomenclatura técnica) e **Aplicação prática** (uso operacional/clínico do
  conteúdo teórico).
- `## Casos práticos` — 2 vinhetas curtas aplicando o conteúdo a cenário
  concreto (tático, clínico ou institucional).
- `## Referências técnicas` — 2-3 obras, sempre com autor, título, edição e
  ano.
- `## Perguntas avançadas` — 2 perguntas abertas de nível
  pesquisa/instrutor/clínico, marcadas com o público-alvo entre parênteses
  quando aplicável.
- `## Exercícios` — 2 tarefas que exigem produção (diagrama, protocolo,
  parecer, decomposição de tarefa), nunca pergunta de memorização.
- `## Tags` — hashtags dos conceitos-chave da disciplina.
- Apenas no capstone final da trilha (D06.02): seção adicional
  `## Referências bibliográficas gerais da trilha`, consolidando a
  bibliografia de todas as disciplinas.

## Convenção de "nota de escopo"

Várias disciplinas já usam, dentro da `Ementa`, uma nota de escopo explícita
para delimitar fronteira com outro domínio do Atlas (ex.: D01.03 delega a
biomecânica do dedo/gatilho a `ciencia-do-gatilho`; D02.03 delega o regime
jurídico do porte de arma e a dogmática completa de legítima defesa/excesso
a `doutrina-policial`; D03.02 delega a física da balística terminal a
`engenharia-armamento`). Preservar e expandir essa convenção sempre que uma
disciplina nova tangenciar outro domínio — é o mecanismo de não-redundância
já adotado neste domínio.

---

# Áreas que devem ser avaliadas

Os 6 domínios pedagógicos já existentes, como referência:

- Domínio 01 — Fundamentos da Neurociência e Comportamento
- Domínio 02 — Identificação, Treinamento e Aspectos Legais
- Domínio 03 — Combate, Balística e Mentalidade Tática
- Domínio 04 — Sociedade, Estresse, Resiliência e Psicologia
- Domínio 05 — Performance, Metodologia e Comportamento
- Domínio 06 — Nutrição e Comportamento

Você pode propor outras áreas se identificar lacuna real (ex.: neurociência
do sono/recuperação, dinâmica de equipe e comunicação tática sob estresse),
mas apenas seguindo o processo obrigatório abaixo.

---

# Processo obrigatório para editar conteúdo deste domínio

Este domínio segue o fluxo definido em `CLAUDE.md` da raiz do Atlas ("Fluxo
obrigatório para editar conteúdo de qualquer domínio"), aplicado aqui com um
passo adicional específico de checagem de sobreposição:

1. Ler tudo: `INDICE.md`, este `CLAUDE.md` e as disciplinas vizinhas
   (mínimo: a disciplina-alvo, seu pré-requisito direto e qualquer
   disciplina que a referencie como pré-requisito) antes de propor qualquer
   alteração.
2. Identificar inconsistências com o restante do domínio (conceito
   duplicado, pré-requisito quebrado no DAG do `INDICE.md`, nível
   pedagógico incoerente com a posição na cadeia).
3. Checar sobreposição com domínios irmãos do Atlas, em especial
   `ciencia-do-gatilho/` — trilha adjacente que trata da neurociência
   aplicada especificamente ao acionamento do gatilho (biomecânica do dedo,
   mecânica do gatilho, tomada de decisão de acionamento). Este domínio
   (`neurociencia-cognitiva/`) é deliberadamente mais amplo: cognição,
   percepção, fisiologia do estresse, aprendizado motor, trauma, psicologia
   clínica/forense, ética e nutrição aplicada ao combate. Qualquer conteúdo
   novo que se aproxime da biomecânica periférica do disparo deve usar a
   convenção de nota de escopo (acima) em vez de duplicar conteúdo já
   coberto em `ciencia-do-gatilho/`. Verificar também sobreposição pontual
   com `doutrina-policial/` (dogmática jurídica completa) e
   `engenharia-armamento/` (física da balística terminal), já delimitadas
   por notas de escopo existentes.
4. Montar um plano explícito e apresentá-lo, explicando: por que a mudança é
   necessária, o impacto nas demais disciplinas/domínios (incluindo se
   `INDICE.md` e as contagens em `projects.json` precisam ser atualizadas),
   e possíveis efeitos colaterais.
5. Aguardar aprovação explícita do usuário antes de implementar.

Nunca implementar mudanças estruturais (nova disciplina, fusão, divisão,
reordenação de pré-requisitos) sem passar por esse fluxo. Correções pontuais
de erro factual/typo em uma disciplina já existente não exigem o fluxo
completo, mas ainda assim devem ser sinalizadas ao usuário.

---

# Objetivo final

Criar uma formação interdisciplinar de excelência em neurociência cognitiva
aplicada a situações extremas de combate — capaz de preparar pesquisadores,
psicólogos clínicos/forenses e instrutores táticos para compreender, prever
e mitigar cientificamente os efeitos do estresse agudo, do trauma e da carga
cognitiva sobre a tomada de decisão e o comportamento humano em confronto.

Antes de criar qualquer disciplina, validar:

- ela possui identidade própria dentro do eixo biológico, cognitivo ou
  psicológico-social do domínio?
- seus pré-requisitos existem e estão corretos no DAG do `INDICE.md`?
- seus conceitos aparecem em outra disciplina deste domínio, ou em
  `ciencia-do-gatilho/`, `doutrina-policial/` ou `engenharia-armamento/`?
- ela é sustentada por literatura científica revisada por pares, e não por
  senso comum tático ou motivacional?
- ela tem profundidade suficiente para justificar uma disciplina própria, em
  vez de ser uma seção de outra já existente?
