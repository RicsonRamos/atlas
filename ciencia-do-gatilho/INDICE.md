# Índice Mestre — A Ciência do Gatilho

7 disciplinas em 3 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — A Evolução do Gatilho e o Nascimento do Sistema Moderno
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D01.01 | História e Evolução Funcional dos Sistemas de Disparo | Foundation | 20-26h |
| D01.02 | Necessidades Operacionais e Interface Operador-Sistema | Foundation | 18-24h |

## Domínio 02 — Engenharia Aplicada ao Sistema de Disparo
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D02.01 | Estrutura Mecânica, Geometria e Tribologia do Disparo | Intermediate | 24-32h |
| D02.02 | Fases Mecânicas do Acionamento (Break, Reset e Previsibilidade) | Intermediate | 22-28h |
| D02.03 | Sistemas de Segurança Ativa e Passiva | Intermediate | 18-24h |

## Domínio 03 — Aplicação Prática, Técnica e Interação Homem-Máquina
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D03.01 | Neurofisiologia e Biomecânica do Dedo Humano | Advanced | 24-30h |
| D03.02 | Controle, Previsibilidade e Tomada de Decisão | Advanced (capstone) | 22-28h |

## DAG de dependências

Cada domínio é uma cadeia linear internamente (disciplina N+1 exige a disciplina N do mesmo domínio), e a disciplina de entrada de cada domínio (a partir de D02) exige a disciplina final do domínio anterior:

```
01 Evolução do Gatilho (D01.01 → D01.02)
        │  (D02.01 exige D01.02)
        ▼
02 Engenharia Aplicada (D02.01 → D02.02 → D02.03)
        │  (D03.01 exige D02.03)
        ▼
03 Aplicação Prática / Homem-Máquina (D03.01 → D03.02, capstone)
```

D01 é a raiz do DAG (D01.01 não declara pré-requisito — disciplina de entrada do domínio). Não há ramificação: cada domínio depende integralmente da conclusão do domínio anterior, refletindo a progressão história/necessidade operacional → engenharia mecânica do conjunto de disparo → neurofisiologia e controle aplicado.

## Carga horária total
- Trilha completa (7 disciplinas): 148-192h
