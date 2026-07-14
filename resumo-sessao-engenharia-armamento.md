# Resumo da sessão — Expansão do Atlas para nível mestrado

> Resumo gerado automaticamente antes de uma compactação de contexto (`/compact`).
> Cobre o estado do projeto até o momento em que a expansão de `engenharia-armamento/`
> foi iniciada e interrompida por limite de sessão de API.

## 1. Pedido principal e intenção

Pedido permanente do projeto: "fortalecimento da base e preenchimento das lacunas
estão prontas? Expanda todo o conhecimento para um nível mestrado de excelência" —
expandir todo o conteúdo do repositório Atlas de Conhecimento para nível de
excelência de mestrado, domínio por domínio. Aprovação já exercida: "se estiver
bom, replicar o padrão nos outros domínios."

Nesta etapa da sessão:
- Usuário disse "continue" após um `/compact`, interpretado como aprovação para
  retomar e concluir a expansão de `neurociencia-cognitiva/`.
- Após `neurociencia-cognitiva/` concluído, revisado e commitado, usuário
  perguntou "o que falta para completar 100%?" (consulta de status).
- Usuário then disse explicitamente "continua com engenharia-armamento" —
  instrução explícita para iniciar a expansão de nível mestrado do 5º domínio,
  `engenharia-armamento/` (27 disciplinas, 8 domínios pedagógicos), seguindo o
  mesmo workflow já estabelecido (atualizar seção de estrutura do CLAUDE.md
  primeiro, depois disparar agentes em background agrupados por cluster, depois
  revisão/verificação pessoal, depois commit único por domínio).

## 2. Conceitos técnicos-chave

- **Padrão de expansão de domínio**: atualizar a seção de estrutura do
  `CLAUDE.md` do domínio primeiro (elevar pisos mínimos, adicionar seção
  "Estado da arte e debates em aberto"), depois disparar agentes clusterizados
  em background preservando a ordem do DAG, depois verificar pessoalmente via
  greps estruturais + leitura de arquivos representativos + varredura dedicada
  de verificação de referências, depois commitar como um commit único por
  domínio.
- **Nova lição aprendida e aplicada nesta etapa**: ao clusterizar agentes,
  evitar dividir um mesmo domínio pedagógico entre dois clusters diferentes —
  isso causou um bug real de duplicação de conteúdo em
  `neurociencia-cognitiva/` (o mecanismo "weapon focus effect" foi
  redundantemente rederivado por dois agentes em D02.01 e D05.06, domínios
  pedagógicos diferentes tocados por agentes paralelos sem visibilidade um do
  trabalho do outro). Para `engenharia-armamento/`, os clusters foram
  deliberadamente desenhados respeitando fronteiras de domínio pedagógico, sem
  nenhum domínio dividido entre dois agentes.
- **Disciplina anti-fabricação** (continua essencial): nesta etapa, foram
  encontradas e corrigidas pessoalmente 5 citações fabricadas/mal atribuídas/
  desatualizadas em `neurociencia-cognitiva/` que sobreviveram à verificação
  interna dos próprios agentes:
  1. Mecanismo do "weapon focus effect" duplicado entre D02.01/D05.06 —
     corrigido reduzindo D05.06 para referenciar D02.01.
  2. Citação desatualizada "CRAIG, Charles de M." na bibliografia do capstone
     D06.02 (já corrigida corretamente em D05.03 pelo seu agente, mas o agente
     paralelo de D06.02 trabalhou a partir da versão antiga não corrigida de
     D05.03 e copiou a citação obsoleta) — corrigido via Edit.
  3. Livro totalmente fabricado e inexistente "WENDLING, Humberto. *Mentalidade
     de Combate e Gatilhada*" em D01.03 e D06.02 — verificado como inexistente
     via subagente dedicado de WebSearch, removido por completo (os títulos
     reais de Wendling são outros, já corretamente citados em D04.01).
  4. Nomes de editora inventados para a 2ª edição de Artwohl & Christensen
     ("LWC Books" em D03.01, "Looseleaf Law Publications" em D05.06 e duas
     vezes em D06.02) — padronizado para a 1ª edição real e verificada
     (Paladin Press, 1997), já usada corretamente em D02.03.
  5. Citação de Alchieri & Cruz mal atribuída (título/editora/ano errados),
     aparecendo duas vezes em D06.02 — corrigida para a obra real (Casa do
     Psicólogo, 2003).
- **Padrão de agente de varredura dedicado de verificação de referências**:
  após os 4 clusters de expansão concluírem, disparar um agente adicional cujo
  único trabalho é enumerar cada citação única em todos os arquivos do domínio
  e verificar via WebSearch as mais arriscadas (autores pouco famosos, obras
  autopublicadas/de pequena editora, títulos suspeitamente "sob medida"),
  pulando a reverificação de livros-texto padrão extremamente famosos. Esse
  agente capturou os itens (3), (4) e (5) acima, que sobreviveram à verificação
  individual dos 4 agentes de expansão originais.
- **Especificidades do domínio `engenharia-armamento/`**: persona de comitê
  técnico (engenheiros de materiais/mecânica, metrologistas, engenheiros de
  fabricação, armeiros, engenheiros de balística, peritos em balística
  forense, especialistas em blindagem, consultores regulatórios); DAG
  estritamente linear de 8 domínios pedagógicos (01 Materiais → 02
  Armas/Tecnologias/Classificação → 03 Engenharia Mecânica/Metrologia → 04
  Processos de Fabricação/Oficina → 05 Mecânica Aplicada/Gestão → 06 Balística
  → 07 Perícia → 08 Legislação/Metodologia); normas técnicas oficiais
  estabelecidas (SAAMI, CIP, ISO, GD&T, NIJ — com números de norma específicos
  como 0101.06/0101.07 exigindo verificação exata, NBR 15000, protocolo FBI de
  bloco de gelatina, Lei nº 10.826/2003 Estatuto do Desarmamento, órgãos
  regulatórios SIGMA/SINARM/COLOG); bibliografia de referência estabelecida
  (Callister/Rethwisch, Chiaverini, Shigley/Mischke/Budynas, Albertazzi
  Neto/Sousa, Hatcher, Sweeney, Tocchetto, Rabello, Di Maio, Chemello); domínio
  se autodescreve explicitamente como "mais enxuto que direito-penal/ por
  design", o que limitou a agressividade do aumento do piso mínimo de
  referências (3-5, não o 4-6 usado em outros domínios); designa D06.01-03
  (Balística Interna/Externa/Terminal) e D07.03 (Anteparos Balísticos) como
  disciplinas de fonte única de verdade que outras disciplinas devem
  referenciar, nunca reproduzir; notas de escopo existentes em D02.01, D02.03,
  D04.06, D05.03, D08.01 delimitam a fronteira com `ciencia-do-gatilho/` e
  `doutrina-policial/`; D08.02 (capstone final da trilha) tem uma convenção
  única do domínio de consolidar a bibliografia completa da trilha diretamente
  em sua própria seção "Referências técnicas" (não um cabeçalho separado
  "Referências bibliográficas gerais da trilha" como outros domínios usam) —
  essa convenção foi explicitamente preservada, não sobrescrita, nas
  instruções dos agentes.
- **Observado mas NÃO agido**: os nomes de arquivo de disciplina de
  `engenharia-armamento/` usam caracteres acentuados em português (ex.:
  "D01.01-introdução-à-engenharia-dos-materiais.md"), o que aparenta divergir
  da convenção de slug declarada no CLAUDE.md raiz ("ASCII, sem acento"). Essa
  é uma condição pré-existente, fora do escopo do trabalho de expansão de
  conteúdo, e não foi levantada como problema a corrigir — registrado aqui
  apenas para não ser confundido com algo que os agentes de expansão atuais
  precisassem corrigir (foram explicitamente instruídos a usar os nomes de
  arquivo acentuados exatos, sem "normalizá-los").
- **Técnica de recuperação de limite de sessão de API** (já usada com sucesso
  uma vez para `direito-operacional/`): verificar o horário atual contra o
  horário de reset informado antes de relançar os agentes que falharam. Ainda
  não aplicada nesta etapa — a falha acabou de ocorrer e nenhuma ação de
  recuperação foi tomada ainda.
- **Fluxo de git**: commits temáticos por domínio, com mensagens detalhadas em
  português terminando em "Co-Authored-By: Claude Sonnet 5
  <noreply@anthropic.com>"; verificação cuidadosa via
  `git diff --cached --stat` antes de commitar (confirmado 23 arquivos / 737
  inserções / 320 remoções para o commit de `neurociencia-cognitiva`,
  exatamente conforme esperado — 22 disciplinas + CLAUDE.md, sem arquivos
  estranhos).

## 3. Arquivos e trechos de código

- `neurociencia-cognitiva/disciplinas/D05.06-estresse-tomada-de-decisao-e-comportamento-em-situacoes-de-violencia.md`
  — editado para remover duplicação de conteúdo do "weapon focus effect",
  passando a referenciar D02.01 em vez de rederivar o mecanismo. Também
  corrigida a citação fabricada de Artwohl & Christensen.
- `neurociencia-cognitiva/disciplinas/D06.02-do-credenciamento-ao-atendimento-psicologico-policial.md`
  — múltiplas edições: substituição da citação obsoleta "CRAIG, Charles de M."
  por Cooper/Heron/Heward (*Applied Behavior Analysis*, 3ª ed., Pearson,
  2020); remoção da linha fabricada de Wendling; correção (replace_all, 2
  ocorrências) da citação de Artwohl & Christensen para a 1ª edição real
  (Paladin Press, 1997); correção (replace_all, 2 ocorrências) da citação de
  Alchieri & Cruz para o título/editora/ano reais (Casa do Psicólogo, 2003).
- `neurociencia-cognitiva/disciplinas/D01.03-neurociencia-e-comportamento-humano-aplicado-a-pistola-de-combate.md`
  — remoção da linha fabricada de Wendling (restaram 5 referências legítimas).
- `neurociencia-cognitiva/disciplinas/D03.01-fisiologia-do-estresse-agudo-no-combate.md`
  — correção da citação fabricada de Artwohl & Christensen para a 1ª edição
  real.
- Todos os 22 arquivos de `neurociencia-cognitiva/disciplinas/*.md` +
  `neurociencia-cognitiva/CLAUDE.md` — staged e commitados como **commit
  `eb41f22`**: "Expandir neurociencia-cognitiva/ para nível mestrado (4º
  domínio replicando o piloto)" — 23 arquivos alterados, 737 inserções(+), 320
  remoções(-).
- `engenharia-armamento/CLAUDE.md` — editada a seção "Estrutura desejada por
  disciplina": elevados os pisos mínimos (Casos práticos 2→3-4 incluindo caso
  multivariável; Referências técnicas 2-3→3-5, com regra explícita de nunca
  inventar título/autor/edição/norma; Perguntas avançadas 2→2-3; Exercícios
  2→3-4); adicionada nova seção obrigatória "Estado da arte e debates em
  aberto" (2-4 pontos distinguindo princípio consolidado de método com
  validação parcial, controvérsia pericial ativa ou fronteira tecnológica em
  desenvolvimento). Esta é a única alteração feita em `engenharia-armamento/`
  até o momento — nenhum arquivo de disciplina foi tocado, pois todos os 4
  agentes falharam antes de escrever.
- `engenharia-armamento/INDICE.md` — lido na íntegra (82 linhas) apenas para
  contexto, não editado. 27 disciplinas, 8 domínios, DAG estritamente linear
  (D07.03 tem pré-requisito duplo D07.02+D06.03), carga horária total
  566-728h.
- `engenharia-armamento/disciplinas/D01.01-introdução-à-engenharia-dos-materiais.md`
  — lido na íntegra como amostra de linha de base (nível Foundation, sem
  pré-requisitos, 9 seções, 2 casos práticos, 2 referências). Não modificado.
- `engenharia-armamento/disciplinas/D08.02-metodologia-do-estudo-e-produção-acadêmica.md`
  — lido na íntegra como amostra de capstone da trilha, confirmando a
  convenção única do domínio de consolidar toda a bibliografia da trilha (9
  referências abrangendo o domínio inteiro) diretamente em "Referências
  técnicas". Não modificado.
- `engenharia-armamento/disciplinas/*.md` — listados todos os 27 nomes de
  arquivo (todos usam caracteres acentuados em português). Nenhum modificado
  ainda.

## 4. Erros e correções

- **Falso positivo de shell em grep de TODO/FIXME/XXX**: um grep inicial via
  Bash retornou muitas linhas não relacionadas (falsos positivos aparentes).
  Reexecutado via a ferramenta Grep dedicada, que corretamente retornou "No
  files found", confirmando problema de quoting/locale do shell Bash. Lição:
  preferir a ferramenta Grep dedicada a grep via Bash para esse tipo de
  verificação.
- **Duplicação de conteúdo genuína (weapon focus effect)**: encontrada lendo
  D02.01 e D05.06 na íntegra e comparando — ambos derivaram
  independentemente o mecanismo completo a partir de Loftus, Loftus & Messo
  (1987), violando o próprio princípio "Evite: repetição" do domínio.
  Corrigido reduzindo D05.06 para referenciar D02.01.
- **Citação obsoleta sobrevivendo à bibliografia de capstone de um agente
  paralelo**: o agente de D05.03 corrigiu corretamente uma citação
  "CRAIG, Charles de M." não verificável, mas o agente capstone de D06.02
  (rodando em paralelo, a partir do estado pré-correção de D05.03) copiou a
  citação obsoleta para sua bibliografia consolidada da trilha. Corrigido
  revisando pessoalmente via Grep e alinhando D06.02 à correção de D05.03.
- **Livro fabricado (Wendling)**: citação específica, plausível mas
  inexistente, sobreviveu à verificação individual de dois agentes e apareceu
  em D01.03 e D06.02. Capturado por revisão pessoal pontual de D01.03 combinada
  com um subagente dedicado de verificação via WebSearch (foreground) que
  confirmou a inexistência do livro e nomeou a bibliografia real de Wendling.
  Corrigido por remoção (não substituição, pois não havia título real
  topicamente apropriado).
- **Editora/edição inventada (Artwohl & Christensen)**: dois nomes de editora
  inventados diferentes ("LWC Books", "Looseleaf Law Publications") usados em
  3 localizações de arquivo para uma suposta 2ª edição não rastreável e
  inexistente, enquanto o próprio precedente do domínio (D02.03) já tinha a
  citação real e correta da 1ª edição. Capturado pelo agente dedicado de
  varredura de referências. Corrigido padronizando todas as instâncias para a
  1ª edição real e verificada.
- **Citação mal atribuída (Alchieri & Cruz)**: título, editora e ano errados,
  aparecendo duas vezes em D06.02. Capturado pelo mesmo agente de varredura de
  referências. Corrigido via Edit com replace_all.
- **Falha de limite de sessão de API (engenharia-armamento, todos os 4
  agentes)**: imediatamente após o disparo dos 4 agentes clusterizados de
  expansão para `engenharia-armamento/`, todos os 4 falharam quase
  simultaneamente com o erro idêntico: "Agent terminated early due to an API
  error: You've hit your session limit · resets 9pm (America/Sao_Paulo)." Um
  deles havia progredido apenas parcialmente pela fase de
  leitura/pesquisa. **Nenhuma ação de recuperação havia sido tomada até o
  momento em que este resumo foi solicitado.**
- **Mensagem avulsa sem instrução**: usuário enviou a mensagem isolada
  "--dangerously-skip-permissions" sem nenhum outro texto. Identificado
  corretamente como um fragmento de flag de linha de comando da CLI, não uma
  instrução acionável na sessão; não tratado como autorização para pular
  confirmações ou verificações de segurança. Essa determinação deve continuar
  valendo para o resto da sessão — não existe autorização geral de "pular
  permissões".

## 5. Resolução de problemas

- Concluída, rigorosamente revisada (capturando e corrigindo 5 problemas
  distintos de citação/duplicação que sobreviveram à verificação de 4 agentes
  paralelos independentes) e commitada a expansão de nível mestrado do 4º
  domínio (`neurociencia-cognitiva/`), commit `eb41f22`.
- Estabelecida e validada uma nova salvaguarda para futuras expansões de
  domínio: clusterizar o trabalho dos agentes respeitando fronteiras de
  domínio pedagógico (nunca dividir um domínio entre dois agentes paralelos)
  para eliminar o modo de falha de duplicação entre clusters descoberto neste
  domínio.
- Estabelecida e validada uma nova salvaguarda: após todos os clusters de
  expansão concluírem, disparar um agente dedicado de varredura de
  verificação de referências em todo o domínio antes de commitar — isso
  capturou 3 dos 5 problemas totais encontrados em `neurociencia-cognitiva/`
  que a verificação interna dos agentes individuais não havia detectado.
- Respondida com precisão a consulta de status do usuário ("o que falta para
  completar 100%?") cruzando os 8 domínios registrados em `projects.json` com
  o trabalho concluído: 4/8 domínios prontos (69 disciplinas), 4/8 restantes
  (145 disciplinas: engenharia-armamento 27, direito-penal 32,
  engenharia-de-dados-pos 13 [precisa de reconciliação do CLAUDE.md antes],
  software-engineer 73 [formato JSON estruturalmente diferente]).
- Iniciado o 5º domínio (`engenharia-armamento/`) por instrução explícita do
  usuário "continua com engenharia-armamento": identificadas e respeitadas
  corretamente as restrições únicas deste domínio (piso de referências mais
  enxuto por design: 3-5 em vez de 4-6; convenção única de D08.02 de
  consolidar a bibliografia no próprio corpo em vez de seção separada;
  disciplinas de fonte única de verdade D06.01-03 e D07.03; nomes de arquivo
  acentuados a serem preservados exatamente, não normalizados) antes de
  atualizar o CLAUDE.md e disparar 4 clusters respeitando fronteiras de
  domínio.
- **Não resolvido / bloqueio imediato**: todos os 4 agentes de expansão de
  `engenharia-armamento/` falharam simultaneamente por atingir o limite de
  sessão de API, com reset às 21h horário de São Paulo. Nenhum arquivo de
  disciplina foi tocado (apenas a própria edição do CLAUDE.md está na árvore
  de trabalho). A recuperação ainda não havia sido tentada.

## 6. Mensagens do usuário nesta etapa (verbatim, não-tool-result)

- "continue" (mensagem de continuação de comando `/compact` local — instruiu
  a retomar a tarefa interrompida sem fazer mais perguntas).
- "--dangerously-skip-permissions" (mensagem avulsa isolada, sem outro
  contexto — determinada como fragmento de flag de CLI, não instrução
  acionável).
- (Múltiplas mensagens de notificação de tarefa em segundo plano reportando
  conclusões de agentes para os 4 clusters de `neurociencia-cognitiva` e o
  agente de varredura de referências — eventos automatizados explicitamente
  marcados "NOT USER INPUT", não tratados como mensagens/aprovação do
  usuário.)
- "o que falta para completar 100%?" — pedido explícito de resumo de
  status/conclusão de todo o projeto de expansão do Atlas.
- "continua com engenharia-armamento" — instrução explícita para prosseguir
  com a expansão de nível mestrado do domínio `engenharia-armamento/` (5º
  domínio na fila), seguindo o mesmo workflow estabelecido.
- (Quatro mensagens de notificação de tarefa reportando falha dos 4 agentes de
  cluster de `engenharia-armamento` por limite de sessão de API, cada uma
  explicitamente marcada "NOT USER INPUT" — a última incluía uma nota parcial
  truncada do agente D01-D02 mostrando que ele ainda estava na fase de
  leitura/pesquisa de referências cruzadas quando foi interrompido.)

## 7. Tarefas pendentes

1. **Imediata/bloqueada**: recuperar da falha de limite de sessão de API que
   atingiu os 4 agentes de expansão de `engenharia-armamento/`. Seguindo o
   padrão de recuperação já estabelecido e bem-sucedido (usado para
   `direito-operacional/`):
   a. verificar via `git status --short engenharia-armamento/` que nenhum
      arquivo de disciplina foi parcialmente escrito (apenas o CLAUDE.md
      deve aparecer modificado);
   b. checar o horário atual contra o horário de reset informado ("9pm
      America/Sao_Paulo");
   c. uma vez passado o reset, relançar os 4 clusters com os mesmos prompts
      originalmente usados:
      - **Cluster A**: D01.01-D01.03 + D02.01-D02.03 (6 arquivos)
      - **Cluster B**: D03.01-D03.03 + D04.01-D04.06 (9 arquivos)
      - **Cluster C**: D05.01-D05.04 + D06.01-D06.03 (7 arquivos)
      - **Cluster D**: D07.01-D07.03 + D08.01-D08.02 (5 arquivos, incluindo
        o capstone final da trilha D08.02)
2. Após os clusters de `engenharia-armamento/` concluírem: revisão pessoal
   (checagem estrutural de contagem de cabeçalhos de seção, greps de
   TODO/placeholder via a ferramenta Grep dedicada — não Bash grep, que
   produziu falsos positivos anteriormente — leitura pontual de uma amostra
   representativa de arquivos de todos os 4 clusters incluindo ao menos um
   capstone por domínio e o capstone final da trilha D08.02), disparo de um
   agente dedicado de varredura de verificação de referências em todos os 27
   arquivos (mesmo padrão de `neurociencia-cognitiva/`), correção de qualquer
   problema de fabricação/duplicação/obsolescência encontrado, depois stage e
   commit como um único commit por domínio com mensagem detalhada em
   português documentando as mudanças do CLAUDE.md, os acréscimos de
   conteúdo e quaisquer correções feitas durante a revisão — replicando
   exatamente o processo usado nos 4 domínios já concluídos.
3. Domínios restantes na fila de expansão de nível mestrado além de
   `engenharia-armamento` (ainda não iniciados):
   - `direito-penal/` (32 disciplinas, mesmo padrão markdown, sem obstáculos
     conhecidos).
   - `engenharia-de-dados-pos/` (13 disciplinas — requer reescrita do
     CLAUDE.md primeiro para reconciliar a decisão de "incluir apesar do
     conflito de formato institucional de ementário PPC" de uma etapa
     anterior).
   - `software-engineer/` (73 disciplinas — formato JSON, requer abordagem
     estruturalmente diferente do padrão de agentes clusterizados baseado em
     markdown usado até agora).
4. Achado colateral não resolvido de uma etapa anterior, ainda não
   investigado: verificar/investigar o termo "Princípios de Copenhague" na
   Ementa de D02.01 de `doutrina-policial/` (sinalizado como não verificável
   por um agente em uma etapa anterior, ainda sem acompanhamento).
5. Achado novo, ainda não sinalizado ao usuário nem agido: os nomes de
   arquivo de disciplina de `engenharia-armamento/` usam caracteres
   acentuados, divergindo da convenção de slug ASCII declarada no CLAUDE.md
   raiz — condição pré-existente, não introduzida pelo trabalho atual, sem
   necessidade de ação a menos que o usuário levante o ponto ou uma futura
   proposta de mudança estrutural toque a nomenclatura de arquivos.

## 8. Trabalho em andamento no momento da interrupção

Imediatamente antes deste resumo ter sido solicitado, haviam sido disparados 4
agentes clusterizados em background para expandir as 27 disciplinas de
`engenharia-armamento/` a profundidade de nível mestrado (já com o
`CLAUDE.md` do domínio atualizado na seção "Estrutura desejada por
disciplina"). Todos os 4 agentes falharam quase simultaneamente com o erro
idêntico: "Agent terminated early due to an API error: You've hit your
session limit · resets 9pm (America/Sao_Paulo)."

As quatro notificações de falha foram:
- `a6c70f29b47b97bc6` ("Expandir engenharia-armamento D07-D08 para mestrado")
  — falhou
- `a801a08004296fd9e` ("Expandir engenharia-armamento D05-D06 para mestrado")
  — falhou
- `a27031c7c634675b2` ("Expandir engenharia-armamento D03-D04 para mestrado")
  — falhou
- `ad55b130b7501c361` ("Expandir engenharia-armamento D01-D02 para mestrado")
  — falhou, com nota parcial final mostrando que ainda estava na fase de
  pesquisa/leitura de referências cruzadas ("Good, cross-references confirmed
  correct (D02.02 Estatuto do Desarmamento, D03.03 recarga e customização de
  munições). Now let me check the doutrina-policial CLAUDE.md briefly for the
  expanded style reference...") quando foi interrompido — indicando que ainda
  não havia escrito em nenhum arquivo de disciplina.

Nenhuma ação de recuperação (checagem de git status, checagem de horário, ou
relançamento) havia sido tomada até o momento em que o resumo foi solicitado.

## 9. Próximo passo sugerido

Recuperar da falha de limite de sessão usando a mesma técnica que já funcionou
anteriormente para `direito-operacional/`: rodar
`git status --short engenharia-armamento/` para confirmar que nenhum arquivo
de disciplina foi parcialmente escrito (esperando apenas
` M engenharia-armamento/CLAUDE.md`), checar o horário atual contra o horário
de reset informado ("9pm America/Sao_Paulo"), e — uma vez confirmado que o
reset já passou — relançar os 4 clusters com os prompts idênticos originalmente
disparados (as quatro chamadas de Agent para os Clusters A/B/C/D cobrindo
D01.01–D08.02 conforme detalhado nas seções 3 e 7 acima). Isso dá continuidade
direta à instrução explícita do usuário "continua com engenharia-armamento" e
não exige confirmação adicional do usuário, por se tratar de uma retentativa
mecânica de trabalho já aprovado e já em andamento, interrompido por um erro
de infraestrutura e não por uma nova decisão — replicando como a mesma
situação foi tratada sem incidentes para `direito-operacional/` anteriormente
neste projeto.

## 10. Próximos comandos e passos (checklist acionável)

### Passo 0 — Pré-checagem (já executada, confirmada OK)

```bash
cd "C:\Users\Ramos\Downloads\atlas"
git status --short engenharia-armamento/
# Resultado confirmado:  M engenharia-armamento/CLAUDE.md
# (nenhum arquivo de disciplina foi parcialmente escrito)

date +"%Y-%m-%d %H:%M:%S %Z %z"
# Resultado confirmado: 2026-07-14 08:47:55 -0300 (America/Sao_Paulo)
# O reset de "9pm America/Sao_Paulo" já passou (era do dia anterior) —
# limite de sessão liberado, relançamento pode prosseguir imediatamente.
```

### Passo 1 — Relançar os 4 clusters de expansão de `engenharia-armamento/`

Disparar 4 chamadas de `Agent` (background, `subagent_type: general-purpose`),
uma por cluster, respeitando fronteiras de domínio pedagógico (nenhum domínio
dividido entre dois agentes):

| Cluster | Disciplinas | Arquivos |
|---|---|---|
| A | D01.01-D01.03 + D02.01-D02.03 | 6 |
| B | D03.01-D03.03 + D04.01-D04.06 | 9 |
| C | D05.01-D05.04 + D06.01-D06.03 | 7 |
| D | D07.01-D07.03 + D08.01-D08.02 | 5 (inclui capstone final D08.02) |

Cada prompt de agente deve reiterar (repetir integralmente, o agente não tem
memória da sessão anterior):
- Ler `engenharia-armamento/CLAUDE.md` (já atualizado com os novos pisos
  mínimos e a seção "Estado da arte e debates em aberto") e
  `engenharia-armamento/INDICE.md` antes de escrever qualquer coisa.
- Expandir cada disciplina do cluster para o novo padrão estrutural (Casos
  práticos 3-4 incl. 1 multivariável; Referências técnicas 3-5, nunca
  inventar título/autor/edição/norma; nova seção "Estado da arte e debates em
  aberto"; Perguntas avançadas 2-3; Exercícios 3-4).
- Preservar nomes de arquivo acentuados exatamente como estão — não
  normalizar para ASCII.
- Preservar a convenção única de D08.02 (bibliografia da trilha consolidada
  na própria seção "Referências técnicas", não em seção separada).
- Respeitar D06.01-03 e D07.03 como disciplinas de fonte única de verdade
  (outras disciplinas referenciam, nunca reproduzem o conteúdo delas).
- Respeitar as notas de escopo existentes em D02.01, D02.03, D04.06, D05.03,
  D08.01 (fronteira com `ciencia-do-gatilho/` e `doutrina-policial/`).
- Verificar internamente cada citação nova antes de escrever (mesmo assim,
  o Passo 3 abaixo fará uma varredura dedicada adicional).

### Passo 2 — Revisão pessoal após os 4 clusters concluírem

```bash
# checagem estrutural — contagem de seções por arquivo
grep -c "^## " engenharia-armamento/disciplinas/*.md

# varredura de placeholders/TODO via ferramenta Grep dedicada (não Bash grep,
# que já produziu falso positivo em neurociencia-cognitiva/)
```
- Usar a ferramenta `Grep` (não `Bash`) para procurar `TODO|FIXME|XXX` em
  `engenharia-armamento/disciplinas/`.
- Ler integralmente uma amostra representativa: pelo menos 1 arquivo por
  cluster, incluindo os capstones de domínio (D04.06, D05.04, D06.03, D07.03)
  e o capstone final da trilha (D08.02).

### Passo 3 — Agente dedicado de varredura de referências

Disparar 1 agente adicional (foreground ou background) cujo único trabalho é:
- Enumerar cada citação única nos 27 arquivos de `engenharia-armamento/disciplinas/`.
- WebSearch-verificar as mais arriscadas (autores pouco famosos, obras
  autopublicadas/pequena editora, normas técnicas com número específico como
  NIJ 0101.06/0101.07, títulos suspeitosamente "sob medida").
- Pular reverificação de livros-texto padrão extremamente famosos
  (Callister/Rethwisch, Shigley/Mischke/Budynas, etc., já usados
  consistentemente no domínio).
- Reportar qualquer fabricação/edição inventada/atribuição errada encontrada.

### Passo 4 — Corrigir achados e commitar

```bash
git add engenharia-armamento/
git diff --cached --stat
# conferir: 27 disciplinas + CLAUDE.md = 28 arquivos, sem arquivos estranhos

git commit -m "$(cat <<'EOF'
Expandir engenharia-armamento/ para nível mestrado (5º domínio replicando o piloto)

<detalhar aqui: mudanças no CLAUDE.md (pisos mínimos elevados, nova seção
Estado da arte e debates em aberto), acréscimos de conteúdo por domínio
pedagógico, e qualquer correção feita durante a revisão/varredura de
referências>

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"

git status
```

### Passo 5 — Domínios seguintes na fila (após engenharia-armamento/ commitado)

1. `direito-penal/` (32 disciplinas) — mesmo padrão markdown, sem obstáculos
   conhecidos, pode seguir o mesmo fluxo de 4 passos acima.
2. `engenharia-de-dados-pos/` (13 disciplinas) — **requer reescrita do
   CLAUDE.md primeiro** para reconciliar a decisão de "incluir apesar do
   conflito de formato institucional de ementário PPC" antes de dispatchar
   qualquer agente de expansão.
3. `software-engineer/` (73 disciplinas) — formato JSON
   (`data/index.json` + `data/conceitos.json` + `data/disciplinas/*.json`),
   **requer abordagem estruturalmente diferente** do padrão de agentes
   clusterizados baseado em markdown usado até agora; avaliar separadamente
   antes de iniciar.

### Item pendente à parte (baixa prioridade, não bloqueia o acima)

- Verificar/investigar o termo "Princípios de Copenhague" em
  `doutrina-policial/disciplinas/D02.01` (Ementa) — sinalizado como não
  verificável por um agente em etapa anterior, ainda sem acompanhamento.
