# Índice Mestre — Neurociência Cognitiva

22 disciplinas em 6 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — Fundamentos da Neurociência e Comportamento
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D01.01 | Introdução à Neurociência Estrutural e Funcional | Foundation | 26-32h |
| D01.02 | Introdução ao Comportamento Humano e Psicofisiologia | Foundation | 24-30h |
| D01.03 | Neurociência e Comportamento Humano Aplicado à Pistola de Combate | Intermediate | 26-32h |

## Domínio 02 — Identificação, Treinamento e Aspectos Legais
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D02.01 | Identificação de Ameaças e Percepção Visual | Intermediate | 24-30h |
| D02.02 | Treinamento em Seco (Dry Fire) e Aprendizado Motor | Intermediate | 22-28h |
| D02.03 | Porte de Arma, Legítima Defesa e Excesso no Emprego de Armas | Intermediate | 20-26h |

## Domínio 03 — Combate, Balística e Mentalidade Tática
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D03.01 | Fisiologia do Estresse Agudo no Combate | Advanced | 28-36h |
| D03.02 | Balística Aplicada ao Combate e Escolha do Conjunto | Advanced | 20-26h |
| D03.03 | Cognição, Mentalidade Tática e Armas Longas no Confronto | Advanced | 22-28h |
| D03.04 | Psicomotricidade, Biomecânica e Estrutura de Treinamento | Advanced (capstone do domínio) | 24-30h |

## Domínio 04 — Sociedade, Estresse, Resiliência e Psicologia
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D04.01 | Conflitos, Violência e Sociedade | Advanced | 20-26h |
| D04.02 | Consequências do Combate e o Custo do Estresse | Advanced | 24-30h |
| D04.03 | Resiliência Humana e Psicologia Positiva Aplicada | Advanced | 22-28h |
| D04.04 | Ética e Moral Aplicadas ao Combate e ao Cotidiano | Advanced (capstone do domínio) | 18-24h |

## Domínio 05 — Performance, Metodologia e Comportamento
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D05.01 | A Alta Performance e o Equilíbrio em Combate | Advanced | 24-30h |
| D05.02 | Metodologia Aplicada ao Ensino de Habilidades Operacionais | Advanced | 20-26h |
| D05.03 | Análise do Comportamento Aplicada ao Universo Policial/Militar | Advanced | 22-28h |
| D05.04 | Psicopatologia, Transtornos e Neurodesenvolvimento no Contexto Criminal | Advanced | 24-30h |
| D05.05 | Traumas Pós-Combate: Neurociência, Personalidade e Reintegração | Advanced | 26-32h |
| D05.06 | Estresse, Tomada de Decisão e Comportamento em Situações de Violência | Advanced (capstone do domínio) | 22-28h |

## Domínio 06 — Nutrição e Comportamento
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D06.01 | Nutrição e Relação com o Comportamento Humano em Combate | Advanced | 20-26h |
| D06.02 | Do Credenciamento ao Atendimento Psicológico Policial | Advanced (capstone da trilha) | 22-28h |

## DAG de dependências

A trilha é predominantemente linear entre domínios: cada domínio parte da
última disciplina do domínio anterior como pré-requisito de entrada, e dentro
de cada domínio as disciplinas formam uma cadeia interna (D0X.01 → D0X.02 →
...). Duas disciplinas do Domínio 05 declaram pré-requisito cruzado explícito
com domínios já concluídos na cadeia principal (não alteram a ordem, apenas
reforçam a dependência de conteúdo já visto):

```
01 Fundamentos da Neurociência e Comportamento   (raiz — D01.01 sem pré-requisito)
        │
        ▼
02 Identificação, Treinamento e Aspectos Legais
        │
        ▼
03 Combate, Balística e Mentalidade Tática ───────────┐
        │                                              │ (D03.01 referenciado
        ▼                                              │  por D05.06)
04 Sociedade, Estresse, Resiliência e Psicologia ──┐    │
        │                                          │    │
        ▼                                          │    │ (D04.02 referenciado
05 Performance, Metodologia e Comportamento  <──────┴────┘  por D05.05)
        │
        ▼
06 Nutrição e Comportamento
```

Domínio 01 é a raiz do DAG (D01.01 — "Introdução à Neurociência Estrutural e
Funcional" — é a única disciplina de toda a trilha sem pré-requisito
declarado). Os domínios 02 a 06 dependem integralmente da conclusão do
domínio anterior; D05.05 e D05.06 adicionalmente declaram pré-requisito
explícito de conteúdo dos domínios 04 e 03, respectivamente, mas isso não
cria nenhum ciclo nem atalho — esses domínios já foram cursados nesse ponto
da cadeia linear.

## Carga horária total
- Trilha completa (22 disciplinas): 500-634h
