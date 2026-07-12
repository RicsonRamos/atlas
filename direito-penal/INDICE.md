# Índice Mestre — Pós-Graduação em Direito Penal e Processo Penal

32 disciplinas em 9 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — Fundamentos e Teoria Geral do Direito Penal
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D01.01 | Princípios Constitucionais do Direito Penal | Foundation | 24-32h | Sim |
| D01.02 | Hermenêutica Penal e Teoria da Interpretação Jurídica | Foundation | 20-28h | Não |
| D01.03 | Teoria Geral do Crime | Foundation | 40-50h | Sim |
| D01.04 | Teoria da Pena e Concurso de Crimes | Foundation | 32-40h | Sim |
| D01.05 | Aplicação da Lei Penal e Extinção da Punibilidade | Foundation | 24-30h | Sim |

## Domínio 02 — Criminologia, Política Criminal e Direitos Humanos
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D02.01 | Criminologia Geral e Teorias da Criminalidade | Intermediate | 28-34h | Sim |
| D02.02 | Vitimologia e Justiça Restaurativa | Intermediate | 20-26h | Não |
| D02.03 | Política Criminal e Sistema Prisional | Intermediate | 28-34h | Sim |
| D02.04 | Direitos Humanos e Direito Penal Internacional | Advanced | 28-34h | Não |

## Domínio 03 — Teoria Geral do Processo Penal
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D03.01 | Princípios e Garantias do Processo Penal | Foundation | 28-34h | Sim |
| D03.02 | Inquérito Policial e Ação Penal | Foundation | 26-32h | Sim |
| D03.03 | Prisões Cautelares e Medidas Diversas | Foundation | 28-34h | Sim |
| D03.04 | Prova no Processo Penal | Intermediate | 32-40h | Sim |
| D03.05 | Medicina Legal e Perícia Criminal | Intermediate | 26-32h | Não |
| D03.06 | Sentença, Recursos e Ações Autônomas de Impugnação | Intermediate | 32-40h | Sim |

## Domínio 04 — Direito Penal: Parte Especial
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D04.01 | Crimes contra a Pessoa | Intermediate | 40-50h | Sim |
| D04.02 | Crimes contra o Patrimônio | Intermediate | 36-44h | Sim |
| D04.03 | Crimes contra a Dignidade Sexual | Intermediate | 28-34h | Sim |
| D04.04 | Crimes contra a Administração Pública e a Fé Pública | Intermediate | 32-40h | Sim |

## Domínio 05 — Processo Penal: Procedimentos e Institutos Especiais
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D05.01 | Tribunal do Júri | Advanced | 36-44h | Sim |
| D05.02 | Cadeia de Custódia da Prova | Advanced | 36-44h | Sim |
| D05.03 | Justiça Penal Consensual e Juizados Especiais Criminais | Advanced | 36-44h | Sim |

## Domínio 06 — Legislação Penal Especial
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D06.01 | Lei de Drogas | Advanced | 36-44h | Sim |
| D06.02 | Lei Maria da Penha e Violência de Gênero | Advanced | 36-44h | Sim |
| D06.03 | Crimes Digitais | Advanced | 24-30h | Não |

## Domínio 07 — Direito Penal Econômico e Criminalidade Organizada
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D07.01 | Organizações Criminosas e Colaboração Premiada | Specialist | 32-40h | Sim |
| D07.02 | Crimes Tributários e Contra o Sistema Financeiro | Specialist | 28-34h | Não |
| D07.03 | Lavagem de Capitais e Compliance Criminal | Specialist | 28-34h | Não |

## Domínio 08 — Execução Penal
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D08.01 | Execução Penal | Advanced | 36-44h | Sim |

## Domínio 09 — Prática Criminal (capstone)
| ID | Disciplina | Nível | Carga | Núcleo |
|---|---|---|---|---|
| D09.01 | Técnicas de Atuação na Advocacia Criminal | Specialist | 32-40h | Sim |
| D09.02 | Prática Processual Penal: Peças e Simulações | Specialist | 36-44h | Sim |
| D09.03 | Pacote Anticrime: Reformas Estruturais do Sistema de Justiça Criminal | Specialist (capstone) | 20-28h | Sim |

## DAG de dependências

```
01 Fundamentos ──┬──> 02 Criminologia/Política Criminal/DH
                 ├──> 03 Processo Penal Geral ──┬──> 05 Processo Penal Especial (+04)
                 ├──> 04 Parte Especial ─────────┘
                 ├──> 06 Legislação Penal Especial      (precisa 01+03+04)
                 ├──> 07 Direito Penal Econômico/Crim. Organizada  (precisa 01+03+04)
                 └──> 08 Execução Penal                  (precisa 01+03)

01+02+03+04+05+06+07+08 ──> 09 Prática Criminal (capstone)
```

## Carga horária total
- Trilha núcleo (25 disciplinas): ~890h
- Trilha completa (32 disciplinas): ~1030-1150h
