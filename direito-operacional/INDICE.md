# Índice Mestre — Direito Operacional e o Ambiente de Confronto

21 disciplinas em 10 domínios. Arquivos completos em `disciplinas/`.

## Domínio 01 — Sistema Persecutório e Fundamentos do Direito Operacional
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D01.01 | O Sistema Persecutório e a Realidade de Campo | Foundation | 24-32h |
| D01.02 | Teoria da Polícia e Modelos de Policiamento | Foundation | 22-28h |

## Domínio 02 — Criminologia Aplicada à Atividade Policial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D02.01 | Gênese das Facções e Crime Organizado Transnacional | Intermediate | 24-30h |
| D02.02 | Modelos de Política Criminal em Confronto | Intermediate | 26-32h |
| D02.03 | Criminologia Contemporânea Avançada | Advanced (capstone do domínio) | 30-38h |

## Domínio 03 — Legislação Penal Especial na Atividade Policial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D03.01 | Abuso de Autoridade e Legislação de Garantias | Advanced | 28-36h |
| D03.02 | Criminalidade Gravosa e Legislação Correlata | Advanced (capstone do domínio) | 20-26h |

## Domínio 04 — Uso Diferenciado da Força (UDF) e Razoabilidade
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D04.01 | Modelos Normativos de UDF e Razoabilidade | Advanced | 26-34h |

## Domínio 05 — Garantias Constitucionais e Processuais Penais Operacionais
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D05.01 | Inquérito Policial e Defesa Técnica na Investigação | Advanced | 22-28h |
| D05.02 | Ponderação de Direitos Fundamentais na Atividade Policial | Advanced | 26-32h |
| D05.03 | Ciências Policiais e Dinâmica Procedimental da Rua | Advanced (capstone do domínio) | 20-26h |

## Domínio 06 — Interseções Interdisciplinares: Direito Civil Operacional e Crise
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D06.01 | Direito Civil na Atividade Policial | Advanced | 22-28h |
| D06.02 | Doutrina de Gerenciamento de Crises (Panorama Jurídico-Institucional) | Advanced (capstone do domínio) | 16-22h |

## Domínio 07 — Guerra Informacional e Insurgência Criminal
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D07.01 | Guerra de Narrativas e Lawfare | Specialist | 20-26h |
| D07.02 | Insurgência Criminal e Microssoberania | Specialist (capstone do domínio) | 22-28h |

## Domínio 08 — Resultado Morte, Vitimização e Letalidade Policial
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D08.01 | Vitimização Policial e Custo Humano | Specialist | 20-26h |
| D08.02 | Letalidade Policial e Controle do Uso da Força | Specialist (capstone do domínio) | 26-32h |

## Domínio 09 — Gestão Estratégica e Psicologia Aplicada
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D09.01 | Gestão Estratégica de Segurança Pública | Specialist | 22-28h |
| D09.02 | Psicologia Aplicada à Atividade Policial (Dimensão Institucional) | Specialist (capstone do domínio) | 18-24h |

## Domínio 10 — Controle da Atividade Policial e Direito Administrativo Operacional
| ID | Disciplina | Nível | Carga |
|---|---|---|---|
| D10.01 | Direito Administrativo Aplicado à Atividade Policial | Specialist | 26-32h |
| D10.02 | Controle Interno e Externo da Atividade Policial | Specialist (capstone da trilha) | 26-32h |

## DAG de dependências

Dentro de cada domínio, as disciplinas seguem sequência linear estrita (.01 → .02 → .03),
declarada no cabeçalho `Pré-requisitos` de cada arquivo. Entre domínios, apenas duas
dependências fortes (pré-requisito interno a esta trilha) estão declaradas nas disciplinas
de entrada; as demais disciplinas de entrada apontam apenas "recomendações" de
conhecimento prévio em *outras* trilhas do Atlas (direito-penal, doutrina-policial),
que não bloqueiam a progressão dentro de direito-operacional — por isso os domínios
correspondentes são tratados como raízes do DAG interno.

```
01 Sistema Persecutório e Fundamentos ──> 02 Criminologia Aplicada ──> 07 Guerra Informacional
                                                                          e Insurgência Criminal

03 Legislação Penal Especial na Atividade Policial      (raiz — pré-requisito externo: trilha "Direito Penal")
04 Uso Diferenciado da Força (UDF) e Razoabilidade       (raiz — pré-requisito externo: trilha "Doutrina Policial")
05 Garantias Constitucionais e Proc. Penais Operacionais (raiz — pré-requisito externo: trilha "Direito Penal")
06 Direito Civil Operacional e Crise ──> 10 Controle da Atividade Policial e Direito Administrativo Operacional
08 Resultado Morte, Vitimização e Letalidade Policial    (raiz — sem pré-requisito declarado)
09 Gestão Estratégica e Psicologia Aplicada              (raiz — pré-requisito externo: trilha "Doutrina Policial")
```

## Carga horária total
- 21 disciplinas: 486-620h
