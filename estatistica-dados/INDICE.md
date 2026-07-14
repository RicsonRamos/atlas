# Índice Mestre — Estatística para Ciência de Dados em Python

10 disciplinas organizadas em 5 domínios pedagógicos. Arquivos completos em `disciplinas/`.

## Domínio 01 — Estatística Descritiva e Análise Exploratória (EDA)
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D01.01 | Medidas de Tendência Central, Dispersão e Forma | Foundation | 20-30h | Sim |
| D01.02 | Análise Gráfica e Visualização de Distribuições | Foundation | 20-30h | Sim |

## Domínio 02 — Teoria da Probabilidade e Distribuições
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D02.01 | Probabilidade Condicional, Teorema de Bayes e Variáveis Aleatórias | Foundation | 25-35h | Sim |
| D02.02 | Distribuições de Probabilidade e Teorema Central do Limite | Intermediate | 25-35h | Sim |

## Domínio 03 — Inferência Estatística e Testes de Hipóteses
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D03.01 | Amostragem, Estimação e Intervalos de Confiança | Intermediate | 30-40h | Sim |
| D03.02 | Testes de Hipóteses Paramétricos | Intermediate | 30-40h | Sim |
| D03.03 | Testes de Hipóteses Não-Paramétricos | Intermediate | 25-35h | Não |

## Domínio 04 — Correlação e Modelagem de Regressão
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D04.01 | Regressão Linear Simples e Múltipla | Intermediate | 30-40h | Sim |
| D04.02 | Regressão Logística e Modelos Lineares Generalizados | Advanced | 30-40h | Sim |

## Domínio 05 — Estatística Avançada e Inferência Causal
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D05.01 | Métodos Multivariados e Redução de Dimensionalidade | Advanced | 25-35h | Não |
| D05.02 | Testes A/B, Múltiplos Testes e Causalidade | Advanced (capstone) | 30-40h | Sim |

## DAG de dependências

```
D01.01/D01.02 (Exploratória) ──> D02.01/D02.02 (Probabilidade)
                                         │
                                         ▼
D03.01 (Estimação) ────────────────> D03.02/D03.03 (Testes de Hipóteses)
                                         │
                                         ▼
D04.01/D04.02 (Regressão) ─────────> D05.01/D05.02 (Avançado & Causal)
```

## Carga horária total
- Trilha núcleo (8 disciplinas): ~210-290h
- Trilha completa (10 disciplinas): ~265-365h
