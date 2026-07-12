# Índice Mestre — Doutrina Policial e Perícia Forense

19 disciplinas em 7 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — Introdução a Armas de Fogo e Contexto
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D01.01 | Classificação das Armas de Fogo e Tecnologia (Contexto Operacional) | Foundation | 18-24h |
| D01.02 | Calibres, Munições e Identificação Operacional | Foundation | 16-22h |
| D01.03 | Referencial Histórico, Evolutivo e História da Violência | Foundation | 18-24h |

## Domínio 02 — Legislação Aplicada e Procedimentos Legais
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D02.01 | Sociedade, Armas e Direitos Humanos | Intermediate | 22-28h |
| D02.02 | Estatuto do Desarmamento, Decretos e Legislação Correlata | Intermediate | 30-38h |
| D02.03 | Legítima Defesa Aplicada e Excessos no Emprego de Arma de Fogo | Advanced | 28-36h |

## Domínio 03 — Explosivos, IMPO e Recargas
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D03.01 | Noções sobre Explosivos Aplicados | Advanced | 20-26h |
| D03.02 | Instrumentos de Menor Potencial Ofensivo (IMPO) | Advanced | 22-28h |
| D03.03 | Recarga e Customização de Munições (Pistola e Fuzil) | Advanced (capstone do domínio) | 22-28h |

## Domínio 04 — Balística e Contexto Pericial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D04.01 | As Três Vertentes Clássicas da Balística (Panorama Operacional) | Advanced | 14-20h |
| D04.02 | Química Forense e Cadeia de Custódia em Exames Balísticos | Advanced | 22-28h |
| D04.03 | Seleção Operacional de Anteparos Balísticos | Advanced (capstone do domínio) | 14-20h |

## Domínio 05 — Tiro de Precisão: Armas, Balística e Equipamentos
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D05.01 | Balística Aplicada ao Tiro de Precisão Policial | Specialist | 18-24h |
| D05.02 | Teoria da Zeragem e Sistemas de Armas de Precisão | Specialist (capstone do domínio) | 24-30h |

## Domínio 06 — Planejamento e Autodefesa
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D06.01 | Planejamento e Prevenção Defensiva Contra o Crime | Advanced | 20-26h |
| D06.02 | Atendimento Pré-Hospitalar (APH) Tático e Cotidiano | Advanced (capstone do domínio) | 24-30h |

## Domínio 07 — Aspectos Operacionais e Mentalidade de Combatente
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D07.01 | Mentalidade, Cognição e Doutrina de Treinamento Policial | Advanced | 16-22h |
| D07.02 | Aspectos Operacionais, Uso Seletivo da Força e Agressor Ativo | Advanced | 24-30h |
| D07.03 | Análise e Estatística: Crimes com Armas de Fogo | Advanced (capstone da trilha) | 20-26h |

## DAG de dependências

```
01 Introdução a Armas de Fogo e Contexto        (raiz — D01.01 sem pré-requisito)
   └──> 02 Legislação Aplicada e Procedimentos Legais
          └──> 03 Explosivos, IMPO e Recargas
                 └──> 04 Balística e Contexto Pericial
                        └──> 05 Tiro de Precisão: Armas, Balística e Equipamentos
                               └──> 06 Planejamento e Autodefesa
                                      └──> 07 Aspectos Operacionais e Mentalidade de Combatente (capstone da trilha)
```

Diferente de outras trilhas do Atlas (que ramificam em domínios paralelos), esta é uma
cadeia **estritamente linear**: cada domínio depende apenas do domínio imediatamente
anterior, e a disciplina de entrada de cada domínio (exceto o 01) declara como
pré-requisito a última disciplina — o capstone — do domínio anterior. Não há domínios
paralelos nem disciplinas eletivas declaradas; a progressão é sempre D01.01 → D01.02 →
D01.03 → D02.01 → ... → D07.03, do reconhecimento técnico de armas e munições em campo
até a doutrina de resposta a incidentes críticos e análise criminal.

## Carga horária total
- 19 disciplinas, 7 domínios: **392-510h**
