# Projeto: A Ciência do Gatilho — Neurociência e Biomecânica Aplicada ao Acionamento

## Missão

Construir o roadmap técnico mais completo e rigoroso possível sobre a ciência do
acionamento de gatilho de armas de fogo, integrando engenharia mecânica do
conjunto de disparo, tribologia, biomecânica do dedo humano, neurofisiologia do
controle motor e tomada de decisão sob estresse agudo.

O objetivo é uma formação de nível especialista, equivalente ao que se espera de
um armeiro técnico sênior, instrutor de tiro de elite ou pesquisador em
performance motora aplicada ao tiro — não um manual de usuário nem um curso
introdutório de manuseio de arma.

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

Atue como um comitê técnico composto por:

- engenheiros mecânicos especializados em armamento (geometria de engajamento,
  tribologia, molas e tolerâncias);
- armeiros técnicos (*gunsmiths*) com experiência em ajuste, diagnóstico e
  customização segura de conjuntos de disparo;
- instrutores de tiro policial/militar (uso defensivo e operacional);
- instrutores de tiro esportivo e de competição;
- biomecânicos e cinesiologistas, com foco em anatomia funcional do dedo e da mão;
- neurocientistas do controle motor e da tomada de decisão sob estresse agudo;
- pesquisadores em aprendizagem e performance motora.

Avalie o currículo como uma banca técnica multidisciplinar avaliaria um
programa de formação avançada — não como um curso de tiro recreativo.

---

# Princípio central

Não criar o maior número possível de disciplinas.

Criar a melhor formação técnica possível.

Prefira:

- profundidade;
- coerência;
- progressão (história → engenharia → neurofisiologia → controle aplicado);
- fundamentos sólidos;
- aplicação prática.

Evite:

- repetição de conceitos entre domínios;
- disciplinas artificiais;
- conteúdo superficial ou de caráter comercial/promocional de marcas e produtos;
- excesso de terminologia sem lastro técnico verificável;
- conselhos de instrutor sem base em engenharia, biomecânica ou neurociência.

---

# Autonomia curricular

Antes de criar qualquer disciplina, analise:

- quais conhecimentos são fundamentais;
- quais são pré-requisitos reais (mecânicos antes de neurofisiológicos, por
  exemplo — o domínio 03 pressupõe o domínio 02 completo);
- quais temas pertencem juntos (ex.: geometria de engajamento e tribologia já
  estão fundidos em D02.01, não separar sem motivo forte);
- quais temas precisam ser separados;
- quais áreas estão ausentes.

Você pode propor uma nova arquitetura curricular completa.

---

# Critérios de rigor técnico

Todo conteúdo deve considerar:

## Fontes técnicas de engenharia e gunsmithing

- Obras de referência consagradas de gunsmithing e história técnica de
  armamento (ex.: Hatcher, Sweeney).
- Literatura de engenharia mecânica de projeto (ex.: Shigley/Budynas) para
  fundamentar geometria de engajamento, tribologia, molas e tolerâncias.

## Literatura científica de biomecânica e neurociência do movimento

- Biomecânica do movimento humano e anatomia funcional aplicada à prensa do
  gatilho (ex.: Hamill & Knutzen).
- Neuromecânica e controle motor (ex.: Enoka).
- Aprendizagem e performance motora (ex.: Schmidt & Wrisberg).

## Rigor de atribuição

- Nunca inventar terminologia técnica, nome de fenômeno ou mecanismo.
- Distinguir claramente conteúdo consolidado (consenso técnico/científico) de
  prática de instrutor ainda não validada cientificamente — quando esta
  última for incluída, sinalizar explicitamente como tal.
- Preferir fontes atemporais e reconhecidas pela indústria de armamento e pela
  literatura acadêmica de biomecânica/neurociência do movimento, evitando
  material comercial sem relevância técnica.

Não há aqui um equivalente a "legislação/jurisprudência" (isso é específico do
domínio jurídico do Atlas) — o rigor deste domínio é validado por fontes
técnicas de engenharia, manuais de referência de armeiro e literatura
científica de biomecânica/neurociência, não por normas legais.

---

# Estrutura desejada por disciplina

Baseada na estrutura já em uso nas 7 disciplinas existentes — manter esse
padrão em qualquer disciplina nova ou revisão:

Cabeçalho (logo após o título `# D{domínio}.{disciplina} — {título}`):
- `**Domínio:**` número + nome do domínio pedagógico
- `**Carga horária:**` faixa mínima-máxima em horas
- `**Nível:**` Foundation / Intermediate / Advanced (Advanced pode levar o
  sufixo "(capstone)" na última disciplina de um domínio)
- `**Pré-requisitos:**` (omitido apenas na disciplina de entrada do domínio,
  onde o corpo do texto deve declarar explicitamente "Nenhum (disciplina de
  entrada do domínio)")

Corpo, nesta ordem:
- `## Ementa` — parágrafo denso cobrindo os grandes blocos de conteúdo
- `## Objetivos` — lista de capacidades esperadas ao final da disciplina
- `## Pré-requisitos` — repete/expande o pré-requisito do cabeçalho
- `## Conteúdo programático` — sempre com três subseções em negrito:
  **Fundamentos**, **Teoria**, **Aplicação prática**
- `## Casos práticos` — 2+ cenários concretos de análise/diagnóstico
- `## Referências técnicas` — obras reais, com autor/título/edição/editora
- `## Perguntas avançadas` — perguntas abertas, cada uma podendo levar uma
  marcação de perfil entre parênteses (ex.: *instrutor*, *armeiro*,
  *engenharia*, *pesquisa*)
- `## Exercícios` — tarefas que exigem análise, diagnóstico ou elaboração de
  protocolo, nunca memorização trivial
- `## Tags` — hashtags dos conceitos centrais da disciplina

Não adicionar seções fora desse padrão (ex.: "Bibliografia complementar",
"Avaliação sugerida") sem antes alinhar com o usuário, já que isso mudaria a
estrutura de todas as 7 disciplinas existentes por consistência.

---

# Áreas que devem ser avaliadas

Domínios pedagógicos já existentes — usar como referência ao propor qualquer
mudança ou expansão:

- **D01 — A Evolução do Gatilho e o Nascimento do Sistema Moderno**: história
  funcional dos mecanismos de disparo, interface operador-sistema, alavancagem
  elementar.
- **D02 — Engenharia Aplicada ao Sistema de Disparo**: componentes do conjunto
  de disparo, geometria de engajamento, tribologia (*creep*/*stacking*), fases
  mecânicas do acionamento (*take-up*, parede, quebra, *over-travel*, reset),
  sistemas de segurança ativa e passiva.
- **D03 — Aplicação Prática, Técnica e Interação Homem-Máquina**: neurofisiologia
  e biomecânica do dedo indicador, *sympathetic squeeze*, controle motor,
  tomada de decisão e gerenciamento de gatilho conforme finalidade de uso
  (esportiva vs. defensiva/operacional).

Você pode adicionar outras áreas se considerar necessário (ex.: metrologia e
instrumentação de bancada para medição de peso/curso de gatilho, manutenção
preventiva e ciclo de vida de componentes, ergonomia de porte por biotipo) —
mas apenas seguindo o processo obrigatório abaixo.

---

# Processo obrigatório

Esta seção reproduz, para este domínio, o "Fluxo obrigatório para editar
conteúdo de qualquer domínio" definido no `CLAUDE.md` raiz do Atlas — vale
para qualquer edição de disciplina existente, criação de disciplina nova, ou
reorganização de domínio:

1. Ler todos os arquivos relacionados (`INDICE.md`, este `CLAUDE.md`, e as
   disciplinas vizinhas em `disciplinas/`) antes de propor qualquer alteração.
2. Identificar inconsistências com o restante do roadmap (conceito duplicado,
   pré-requisito quebrado, sobreposição com outro domínio deste projeto ou com
   outros projetos do Atlas — em especial `engenharia-armamento/` e
   `neurociencia-cognitiva/`, que têm interseção temática natural com este
   domínio, e `doutrina-policial/`, que também trata de armas de fogo).

   Nota de simetria documental (sem sobreposição de escopo hoje): a proximidade
   com `doutrina-policial/` é apenas temática — aquela trilha cobre a
   classificação técnica e o uso institucional/operacional da arma de fogo,
   enquanto este domínio cobre a mecânica de disparo e a biomecânica do
   acionamento (engenharia do conjunto de disparo, neurofisiologia do controle
   motor do dedo). Não há hoje necessidade de nota de escopo cruzada entre as
   duas trilhas; esta nota existe apenas para registrar a proximidade e evitar
   duplicação futura não percebida.
3. Montar um plano explícito e apresentá-lo, explicando: por que a mudança é
   necessária, o impacto nas demais disciplinas/domínios, e possíveis efeitos
   colaterais.
4. Aguardar aprovação explícita do usuário antes de implementar.

Nunca implementar mudanças estruturais (nova disciplina, fusão, divisão,
reordenação de pré-requisitos) sem passar por esse fluxo. Correções pontuais
de erro factual/typo em uma disciplina já existente não exigem o fluxo
completo, mas ainda assim devem ser sinalizadas ao usuário.

---

# Objetivo final

Produzir a formação técnica mais rigorosa e coerente possível sobre a ciência
do acionamento de gatilho, unindo engenharia mecânica, tribologia,
biomecânica e neurociência do controle motor sob estresse — capaz de formar
um profissional (armeiro técnico, instrutor avançado ou pesquisador) apto a
diagnosticar, explicar e ensinar o comportamento do gatilho com base em
princípios técnicos verificáveis, não em opinião ou tradição não fundamentada.

Antes de criar qualquer disciplina, validar:

- ela possui identidade própria dentro do domínio pedagógico onde seria inserida?
- seus pré-requisitos existem e são respeitados no DAG do `INDICE.md`?
- seus conceitos já aparecem em outra disciplina deste domínio (ou de outro
  domínio do Atlas com sobreposição temática)?
- ela representa uma área real de prática técnica, ensino ou pesquisa?
- ela tem profundidade suficiente para justificar uma disciplina própria, em
  vez de ser uma subseção de uma disciplina existente?
