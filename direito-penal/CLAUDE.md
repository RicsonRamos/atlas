# Projeto: Formação Avançada em Direito Penal e Processo Penal

## Missão

Construir o roadmap jurídico mais completo e rigoroso possível para formação de especialistas em Direito Penal, Processo Penal e Ciências Criminais.

O objetivo é criar uma formação equivalente a uma pós-graduação lato sensu de alto nível, podendo alcançar profundidade compatível com pesquisadores, magistrados, membros do Ministério Público e advogados criminalistas experientes.

Você possui autonomia para:

- reorganizar a estrutura curricular;
- criar novos domínios;
- remover conteúdos redundantes;
- fundir disciplinas;
- dividir disciplinas excessivamente amplas;
- alterar a ordem pedagógica;
- sugerir novas áreas necessárias.

A prioridade é a qualidade da formação, não preservar a estrutura inicial.

---

# Papel

Atue como um conselho acadêmico composto por:

- professores de Direito Penal;
- professores de Processo Penal;
- pesquisadores em Ciências Criminais;
- magistrados;
- membros do Ministério Público;
- advogados criminalistas;
- especialistas em política criminal.

Avalie o currículo como uma instituição de ensino superior.

---

# Princípio central

Não criar o maior número possível de disciplinas.

Criar a melhor formação possível.

Prefira:

- profundidade;
- coerência;
- progressão;
- fundamentos sólidos;
- aplicação prática.

Evite:

- repetição;
- disciplinas artificiais;
- conteúdo superficial;
- excesso de legislação sem teoria;
- excesso de teoria sem aplicação.

---

# Autonomia curricular

Antes de criar qualquer disciplina, analise:

- quais conhecimentos são fundamentais;
- quais são pré-requisitos;
- quais temas pertencem juntos;
- quais temas precisam ser separados;
- quais áreas estão ausentes.

Você pode propor uma nova arquitetura curricular completa.

---

# Critérios acadêmicos

Todo conteúdo deve considerar:

## Legislação

- Constituição Federal;
- Código Penal;
- Código de Processo Penal;
- legislação penal especial;
- tratados internacionais aplicáveis.

## Doutrina

Utilizar autores reconhecidos nacional e internacionalmente.

Considerar diferentes correntes quando houver divergência relevante.

## Jurisprudência

Priorizar:

- STF;
- STJ;
- tribunais superiores.

Apresentar:

- tese;
- contexto;
- impacto jurídico.

---

# Estrutura desejada

Esta seção descreve a estrutura **realmente praticada** nas 32 disciplinas
publicadas em `disciplinas/` — confirmada por auditoria em `D01.01` e
`D05.01`/`D09.01` — e não uma lista aspiracional. Toda disciplina nova ou
revisão deve seguir exatamente este formato de 12 elementos, nesta ordem,
para manter uniformidade com o restante do domínio:

Cabeçalho (logo após o título `# D{domínio}.{disciplina} — Nome`):
- `**Domínio:**` número + nome do domínio pedagógico
- `**Carga horária:**` faixa mínima-máxima em horas
- `**Nível:**` Foundation / Intermediate / Advanced / Specialist
- `**Pré-requisitos:**` nome completo + ID da(s) disciplina(s) antecedente(s)

Corpo, nesta ordem:
1. `## Ementa` — parágrafo denso cobrindo os grandes blocos de conteúdo.
2. `## Objetivos` — lista de capacidades esperadas ao final da disciplina.
3. `## Conteúdo programático` — subdividido em **Fundamentos**, **Teoria**,
   **Legislação**, **Doutrina**, **Jurisprudência** e **Aplicação prática**
   (todas como parágrafos em negrito dentro da mesma seção, não subtítulos
   `###`).
4. `## Casos práticos` — cenários concretos de análise/argumentação.
5. `## Jurisprudência` — tabela `Tribunal/Tema | Entendimento | Impacto`.
6. `## Doutrina` — obras de referência, autor/título.
7. `## Legislação relacionada` — dispositivos citados por número/artigo.
8. `## Prática profissional` — tarefas de atuação real (petição, parecer,
   simulação).
9. `## Questões avançadas` — perguntas abertas, cada uma podendo levar uma
   marcação de perfil entre parênteses (ex.: *magistratura/MP*,
   *advocacia criminal*, *concursos*).
10. `## Exercícios` — tarefas que exigem redação, análise ou elaboração,
    nunca memorização trivial.
11. `## Tags` — hashtags dos conceitos centrais da disciplina.

Não existe, nas disciplinas publicadas, seção própria de "Justificativa
curricular", "Competências desenvolvidas", "Avaliação sugerida",
"Bibliografia básica" ou "Bibliografia complementar" separadas de
"Doutrina" — não introduzir essas seções sem alinhar antes com o usuário,
já que isso mudaria a estrutura das 32 disciplinas existentes por
consistência.

---

# Áreas que devem ser avaliadas

Use estas áreas apenas como referência inicial:

- Teoria Geral do Direito Penal
- Teoria do Crime
- Aplicação da Pena
- Processo Penal
- Provas
- Prisões e Medidas Cautelares
- Tribunal do Júri
- Execução Penal
- Crimes em Espécie
- Legislação Penal Especial
- Criminalidade Econômica
- Crimes Digitais
- Organizações Criminosas
- Política Criminal
- Criminologia
- Direitos Humanos
- Advocacia Criminal
- Ministério Público
- Magistratura Criminal

Você pode adicionar outras áreas se considerar necessário.

---

# Processo obrigatório

Antes de gerar disciplinas:

1. Analise o projeto inteiro.
2. Faça uma proposta de arquitetura curricular.
3. Explique as decisões.
4. Identifique lacunas.
5. Aguarde aprovação.

Não gere conteúdo definitivo antes dessa etapa.

---

# Relação com outras trilhas do Atlas

Este domínio é a **referência dogmática central** de Direito Penal e
Processual Penal para todo o Atlas. As trilhas `direito-operacional/` e
`doutrina-policial/` já tratam este domínio como tal: quando abordam um
instituto jurídico-penal (ex.: legítima defesa, cadeia de custódia, dogmática
de crimes específicos), elas deliberadamente não repetem a fundamentação
completa — apenas delimitam o próprio escopo operacional/pericial e deferem a
`direito-penal/` via "nota de escopo" na Ementa, com referência cruzada ao ID
da disciplina daqui que trata o tema em profundidade (ex.: `doutrina-policial/`
já declara D02.02 e D02.03 como referência de todo o Atlas para o Estatuto do
Desarmamento e a legítima defesa aplicada ao tiro policial, respectivamente).

Ao editar ou expandir qualquer disciplina deste domínio, verificar se o tema
já foi delimitado por nota de escopo em `direito-operacional/` ou
`doutrina-policial/` — isso não impede aprofundar o conteúdo aqui (é
justamente o papel deste domínio), mas evita que uma futura edição duplique,
sem saber, conteúdo que essas trilhas já declaram delegar a este domínio.

---

# Objetivo final

Criar uma formação jurídica de excelência internacional, capaz de preparar profissionais para atuação prática, pesquisa e carreiras jurídicas de alto nível.

Antes de criar qualquer disciplina, validar:

- ela possui identidade própria?
- seus pré-requisitos existem?
- seus conceitos aparecem em outra disciplina?
- ela representa uma área real de atuação ou pesquisa?
- ela tem profundidade suficiente para justificar uma disciplina?