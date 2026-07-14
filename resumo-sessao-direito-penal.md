# Resumo de Continuação — Expansão de Direito Penal para Nível Mestrado

Este documento consolida o estado do projeto após a conclusão, auditoria e validação do domínio `direito-penal/`. Ele serve de ponto de partida único para a próxima sessão de trabalho e descreve as tarefas pendentes.

---

## 1. Outstanding User Requests

Os seguintes pedidos e diretivas do usuário continuam pendentes e devem ser abordados na sequência do projeto:

*   **Expansão de `engenharia-de-dados-pos/` (13 disciplinas) para nível de Mestrado** [Status: `NOT STARTED / SUGGESTED`]
    *   *Objetivo*: Requer reescrever o `CLAUDE.md` local primeiro para reconciliar o escopo com o ementário PPC institucional e a trilha principal.
*   **Expansão de `software-engineer/` (73 disciplinas) para nível de Mestrado** [Status: `NOT STARTED / SUGGESTED`]
    *   *Objetivo*: Requer um workflow diferenciado para manipulação direta dos dados estruturados em formato JSON (`data/*.json`).
*   **Investigação do termo "Princípios de Copenhague"** [Status: `NOT STARTED / SUGGESTED`]
    *   *Objetivo*: Investigar a validade/veracidade do termo "Princípios de Copenhague" presente na Ementa de `D02.01` em [doutrina-policial/disciplinas/D02.01-armas-e-tecnologias.md](file:///C:/Users/Ramos/Downloads/atlas/doutrina-policial/disciplinas/D02.01-armas-e-tecnologias.md) (sinalizado como potencialmente não verificável por um agente anterior).

---

## 2. User Knowledge

Informações e decisões explícitas fornecidas pelo usuário:

*   **Validação da Proposta**: O usuário deu "ok" expresso para a proposta curricular de nível de mestrado com inclusão de casos práticos multivariáveis, novas exigências bibliográficas e a seção inédita `## Estado da arte e debates em aberto`.
*   **Diretivas Anteriores**: O padrão de expansão com pisos mínimos elevados foi validado nas sessões de `neurociencia-cognitiva/` e `engenharia-armamento/`.

---

## 3. Work Accomplished

O seguinte trabalho foi concluído e verificado com sucesso nesta sessão:

*   **Expansão Completa de `direito-penal/`**:
    *   O arquivo [CLAUDE.md](file:///C:/Users/Ramos/Downloads/atlas/direito-penal/CLAUDE.md) local foi atualizado para registrar a estrutura e pisos de nível de mestrado (3-4 Casos Práticos com pelo menos 1 multivariável, 3-5 Doutrinas reais e verificadas, nova seção obrigatória de debates em aberto, 2-3 Questões avançadas, 3-4 Exercícios e 3-4 Tags).
    *   Todas as 32 disciplinas foram expandidas concorrentemente em background por 4 subagentes clusterizados de forma independente e pedagógica (Cluster A: Fundamentos e Criminologia; Cluster B: Processo Geral e Crimes contra Pessoa/Patrimônio/Dignidade; Cluster C: Procedimentos Especiais, Leis Especiais e Execução; Cluster D: Penal Econômico, Crime Organizado e Prática Forense).
    *   Nenhum placeholder `TODO`, `FIXME` ou `XXX` restou nas disciplinas (auditoria via `Grep` confirmada).
    *   **Auditoria e Limpeza de Referências**: O subagente de auditoria `d436997a` realizou uma varredura completa da bibliografia de todas as 32 disciplinas e identificou **30 alucinações ou erros de obras doutrinárias** em 22 arquivos, que foram corrigidos manualmente e minuciosamente:
        1. Em `D01.03`, o livro de Juarez Cirino dos Santos foi corrigido de *A Moderna Teoria do Fato Típico* para o título real: *A Moderna Teoria do Fato Punível*.
        2. Em `D02.01`, a obra fictícia de Zaffaroni (*A Criminologia Midiática*) foi substituída por *A Questão Criminal*.
        3. Em `D02.04`, corrigiu-se a obra inexistente de Kai Ambos para a obra real traduzida no Brasil (*A Parte Geral do Direito Penal Internacional*) e adicionou-se seu consagrado *Tratado de Direito Penal Internacional* de 3 volumes no lugar da obra inexistente atribuída a Nilo Batista.
        4. Em `D03.01` e `D09.01`, o livro de Jacinto Miranda Coutinho foi corrigido para o título correto da coleção (*Mentalidade Inquisitória e Processo Penal no Brasil*), e as obras inexistentes de Geraldo Prado foram corrigidas para suas publicações reais (*Prova Penal e Sistema de Controles Epistêmicos*).
        5. Em `D03.02` e `D03.05`, o livro pós-morte atribuído a Antonio Magalhães Gomes Filho de 2023 foi corrigido para a sua clássica obra real (*Direito à Prova no Processo Penal*, 1997).
        6. Em `D03.03`, corrigiram-se o título de Aury Lopes Jr. (*Prisões Cautelares e Habeas Corpus*), a obra atribuída à Ministra Maria Thereza Assis Moura (substituída por *A Prova por Indícios no Processo Penal*) e a obra fictícia de Geraldo Prado (substituída por *A Cadeia de Custódia da Prova no Processo Penal*).
        7. Em `D03.06` e `D09.02`, corrigiram-se os títulos inexistentes de Geraldo Prado.
        8. Em `D04.01`, a autoria individual de Alice Bianchini em *Feminicídio* pela Almedina foi corrigida para a obra real coletiva (*Crimes Contra Mulheres*, Juspodivm, 2019).
        9. Em `D04.02`, removeu-se a alucinação de que Juarez Cirino dos Santos publicou um livro sobre Parte Especial, substituindo pelo clássico de Luiz Regis Prado (*Tratado de Direito Penal Brasileiro: Parte Especial*).
        10. Em `D04.03`, removeu-se a alucinação da obra conjunta de Alice Bianchini e Luiz Flávio Gomes.
        11. Em `D05.01`, corrigiu-se o título clássico de Hermínio Marques Porto.
        12. Em `D05.02`, corrigiu-se a edição e título da obra sobre cadeia de custódia de Geraldo Prado.
        13. Em `D05.03`, corrigiu-se o título do Código de Processo Penal Comentado de Fauzi Hassan Choukr.
        14. Em `D06.03`, atualizou-se a referência de Marcelo Crespo para o livro coordenado real recente de 2024 (RT).
        15. Em `D07.01`, corrigiram-se as obras de Geraldo Prado e Mariângela Gama de Magalhães Gomes (título e ano).
        16. Em `D07.02`, corrigiu-se o título completo da obra omissiva de Heloisa Estellita e o sobrenome atribuído ao autor Carlos Henrique Borlido Haddad.
        17. Em `D07.03`, removeram-se as alucinações de Heloisa Estellita (Singular, 2018) e Renato de Mello Jorge Silveira (LiberArs, 2021).
        18. Em `D08.01`, removeu-se o volume inexistente 4 do curso de Rogério Greco que versaria sobre Execução Penal, substituindo pelo clássico de Julio Fabbrini Mirabete.
        19. Em `D09.01`, corrigiram-se as alucinações de Leonardo Yarochewsky e o título incompleto da obra do Ministro Rogério Schietti Cruz.
        20. Em `D09.03`, removeu-se a coautoria fictícia entre Rodrigo Faucz e Luís Carlos Valois, inserindo o manual real de Rodrigo Faucz e Daniel Avelar, bem como a obra cautelar real do Ministro Rogério Schietti.
    *   **Git Commit**: O domínio foi commitado em sua integridade no commit **`d22fed1`** (*"Expandir direito-penal/ para nível mestrado (6º domínio replicando o piloto)"*), alterando exatamente 33 arquivos (32 disciplinas + CLAUDE.md), com 1384 inserções(+) e 953 remoções(-).
    *   **Limpeza do Workspace**: Todos os subagentes foram finalizados com `kill_all`.

---

## 4. Model Knowledge

*   **Fronteiras Temáticas Integradas**:
    *   *Juiz das Garantias* e a estrutura acusatória constitucional foram detalhadamente discutidos em `D03.01`, `D03.02` e `D09.03` após a modulação do STF nas ADIs 6298 et al.
    *   *Cegueira Deliberada (willful blindness)* foi discutida sob o prisma de dolo eventual em crimes tributários e lavagem de capitais em `D01.03`, `D07.02` e `D07.03`.
    *   *Reconhecimento de Pessoas*: O paradigma metrológico do art. 226 do CPP estabelecido pelo STJ no HC 568.693/SC foi inserido em `D03.04`, `D09.01` e `D09.02`.
    *   *Acordo de Não Persecução Penal (ANPP)*: Discutiu-se a retroatividade mitigada (Tema 1155/STJ) e os limites judiciais na discricionariedade do MP em `D05.03` e `D09.03`.
    *   *Descriminalização do Porte de Maconha (Tema 506/STF)* foi devidamente incorporada em `D01.01`, `D02.03` e `D06.01`. Nota-se que o texto corrigiu uma informação fática errônea pré-existente de que a descriminalização abrangia cocaína (o que é incorreto, limitando-se unicamente a maconha).
    *   *Estado de Coisas Inconstitucional (ADPF 347)*: Integrado nas disciplinas de política criminal e execução de pena (`D02.03` e `D08.01`).

---

## 5. Files and Code

### Edited Files
*   [C:/Users/Ramos/Downloads/atlas/direito-penal/CLAUDE.md](file:///C:/Users/Ramos/Downloads/atlas/direito-penal/CLAUDE.md)
*   As 32 disciplinas localizadas na pasta [direito-penal/disciplinas/](file:///C:/Users/Ramos/Downloads/atlas/direito-penal/disciplinas/).

---

## 6. Next Steps

O domínio de `direito-penal/` está **totalmente concluído e commitado**. A prioridade imediata do próximo turno é iniciar a expansão do domínio **`engenharia-de-dados-pos/`**.

### Instruções para o Próximo Agente:
1. Abra e leia o arquivo de governança do domínio: [C:/Users/Ramos/Downloads/atlas/engenharia-de-dados-pos/CLAUDE.md](file:///C:/Users/Ramos/Downloads/atlas/engenharia-de-dados-pos/CLAUDE.md).
2. Proponha a reconciliação do escopo e ementário com a trilha principal antes de iniciar as edições.
3. Repita o mesmo crivo rigoroso de auditoria de referências bibliográficas antes de submeter o commit final do domínio.
4. Lembre-se de ler a habilidade integrada [antigravity-guide](file:///C:/Users/Ramos/.gemini/antigravity-cli/builtin/skills/antigravity_guide/SKILL.md) se precisar tirar dúvidas sobre a CLI `agy` ou o funcionamento geral da arquitetura de agentes.
