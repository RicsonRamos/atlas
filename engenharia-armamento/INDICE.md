# Índice Mestre — Engenharia de Armamento e Balística

27 disciplinas em 8 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — Materiais e Evolução Industrial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D01.01 | Introdução à Engenharia dos Materiais | Foundation | 26-32h |
| D01.02 | Evolução dos Materiais e as Revoluções Industriais | Foundation | 18-24h |
| D01.03 | Engenharia dos Materiais Aplicada | Intermediate | 24-30h |

## Domínio 02 — Armas, Tecnologias e Classificação
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D02.01 | Armas e Tecnologias | Intermediate | 24-30h |
| D02.02 | Calibres e Munições Contemporâneas | Intermediate | 22-28h |
| D02.03 | Classificação das Armas de Fogo | Intermediate | 18-24h |

## Domínio 03 — Engenharia Mecânica e Metrologia
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D03.01 | Introdução à Engenharia Mecânica | Intermediate | 24-30h |
| D03.02 | Engenharia Mecânica Aplicada I | Intermediate | 20-26h |
| D03.03 | Metrologia | Intermediate | 20-26h |

## Domínio 04 — Processos de Fabricação e Oficina
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D04.01 | Processo de Fabricação de Canos Martelados | Advanced | 18-24h |
| D04.02 | Limagem, Torneamento e Fresagem | Advanced | 20-26h |
| D04.03 | Soldagem e Têmpera Aplicadas | Advanced | 22-28h |
| D04.04 | Acabamento em Armas de Fogo | Advanced | 16-22h |
| D04.05 | Restauração e Fabricação de Coronhas, Talas e Empunhaduras | Advanced | 18-24h |
| D04.06 | Customização em Armas de Fogo (Gunsmithing) | Advanced (capstone do domínio) | 20-26h |

## Domínio 05 — Mecânica Aplicada e Gestão
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D05.01 | Mecânica Aplicada às Armas Curtas e Longas | Advanced | 26-32h |
| D05.02 | Mecânica Geral das Armas de Fogo | Advanced | 24-30h |
| D05.03 | CAEx e Aquisição de Peças | Advanced | 14-20h |
| D05.04 | Gestão Aplicada às Oficinas de Armas | Advanced (capstone do domínio) | 16-22h |

## Domínio 06 — Balística
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D06.01 | Balística Interna | Advanced | 26-32h |
| D06.02 | Balística Externa | Advanced | 26-32h |
| D06.03 | Balística Terminal e Efeitos | Advanced (capstone do domínio) | 26-32h |

## Domínio 07 — Perícia e Contexto Pericial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D07.01 | Balística Forense | Specialist | 24-30h |
| D07.02 | Perícia e Análise de Armas | Specialist | 22-28h |
| D07.03 | Anteparos Balísticos | Specialist (capstone da trilha) | 22-28h |

## Domínio 08 — Legislação e Metodologia
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D08.01 | Legislação Aplicada às Armas | Specialist | 16-22h |
| D08.02 | Metodologia do Estudo e Produção Acadêmica | Specialist (capstone da trilha) | 14-20h |

## DAG de dependências

O domínio 01 é a raiz da trilha (disciplina de entrada D01.01 sem pré-requisito). Os demais domínios formam uma cadeia estritamente linear: cada domínio tem como pré-requisito de entrada a disciplina capstone (ou última disciplina) do domínio anterior — confirmado pelas seções de Pré-requisitos de cada disciplina de abertura (D02.01→D01.03, D03.01→D02.03, D04.01→D03.03, D05.01→D04.06, D06.01→D05.04, D07.01→D06.03, D08.01→D07.03). A única dependência dupla é D07.03 (Anteparos Balísticos), que exige tanto D07.02 quanto D06.03 — ambas já cobertas pela cadeia principal.

```
01 Materiais e Evolução Industrial
   └──> 02 Armas, Tecnologias e Classificação
          └──> 03 Engenharia Mecânica e Metrologia
                 └──> 04 Processos de Fabricação e Oficina
                        └──> 05 Mecânica Aplicada e Gestão
                               └──> 06 Balística
                                      └──> 07 Perícia e Contexto Pericial
                                             └──> 08 Legislação e Metodologia
```

Progressão pedagógica subjacente: fundamentos (materiais) → teoria (mecânica/metrologia) → processos (fabricação/oficina) → aplicação (mecânica comparada/gestão) → balística (interna/externa/terminal) → perícia (forense/análise/anteparos) → enquadramento normativo e produção técnico-científica (capstone final).

## Carga horária total
- Trilha completa (27 disciplinas): 566-728h
