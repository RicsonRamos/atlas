# Índice Mestre — Engenharia de Dados (Pós)

13 disciplinas em 4 módulos. Arquivos completos em `disciplinas/`.

Este é o ementário oficial (PPC — Projeto Pedagógico de Curso) de uma
pós-graduação lato sensu em Engenharia de Dados, com base em disciplinas
oficiais de instituição (Anhanguera) complementadas com conteúdo de mercado.
Rascunho-fonte original: `outros/pos-Engenharia de Dados.md`. Nível de
formação: júnior sólido a pleno inicial — ver `CLAUDE.md` deste domínio para
a distinção em relação a `software-engineer/` (trilha Staff/Principal, nível
avançado).

## Módulo I — Fundamentos da Engenharia de Dados
| ID | Disciplina | Carga |
|---|---|---|
| D01.01 | Modelagem e Arquitetura de Data Warehouse | 40h |
| D01.02 | Banco de Dados Relacional | 40h |
| D01.03 | Administração de Banco de Dados (DBA) | 40h |

Subtotal do módulo (disciplinas): 120h. **Nota:** o cabeçalho do
rascunho-fonte declara este módulo como "200h", mas a soma das 3 disciplinas
efetivamente promovidas é 120h — divergência do material de origem, não
corrigida nesta indexação (ver seção de inconsistências em `CLAUDE.md`).

## Módulo II — Governança de Dados, Big Data e Bancos NoSQL
| ID | Disciplina | Carga |
|---|---|---|
| D02.01 | Governança de Dados | 40h |
| D02.02 | Interações entre Big Data e Cloud Computing | 40h |
| D02.03 | Bancos de Dados Não Relacionais (NoSQL) | 40h |

Subtotal do módulo: 120h (consistente com o cabeçalho-fonte).

## Módulo III — Machine Learning, Projeto Integrador e Performance
| ID | Disciplina | Carga |
|---|---|---|
| D03.01 | Machine Learning | 40h |
| D03.02 | Projeto em Ciência de Dados com Processamento Paralelo e Distribuído | 40h |
| D03.03 | Gerenciamento de Desempenho de Banco de Dados (Tuning) | 40h |

Subtotal do módulo: 120h (consistente com o cabeçalho-fonte).

## Módulo IV — Arquiteturas Avançadas, DevOps de Dados e Integração Profissional
| ID | Disciplina | Carga |
|---|---|---|
| D04.01 | Engenharia de Dados em Nuvem (AWS, Azure e GCP) | 40h |
| D04.02 | DataOps, Orquestração e Automação de Pipelines | 40h |
| D04.03 | Arquiteturas Modernas de Dados (Data Mesh e Data Fabric) | 40h |
| D04.04 | Projeto Final Integrador – Engenharia de Dados | não informada no arquivo-fonte |

Subtotal do módulo (D04.01–D04.03): 120h + Projeto Final Integrador (carga
não declarada).

## Progressão entre módulos

O PPC é sequencial por desenho: cada módulo consolida competências exigidas
pelo módulo seguinte, e a última disciplina de cada módulo (à exceção do IV)
sinaliza explicitamente essa transição no próprio texto da ementa
("Competências consolidadas ao final da Parte II" → "Na Parte III, serão
desenvolvidas..."; "Competências finais do curso" ao fim do Módulo III →
Módulo IV como integração final ao nível de mercado). Não há pré-requisitos
formais *dentro* de cada módulo (as 3-4 disciplinas de um mesmo módulo podem,
em tese, ser cursadas em qualquer ordem interna), mas a ordem *entre* módulos
é linear:

```
Módulo I  (Fundamentos)
   └──> Módulo II  (Governança, Big Data, NoSQL)
           └──> Módulo III  (ML, Processamento Distribuído, Tuning)
                   └──> Módulo IV  (Cloud, DataOps, Data Mesh/Fabric)
                           └──> D04.04 Projeto Final Integrador (capstone,
                                requer todas as disciplinas anteriores)
```

D04.04 é explicitamente capstone: sua ementa declara "integração de todas as
disciplinas do curso" e exige aplicação conjunta de modelagem, cloud,
governança e segurança trabalhadas nos módulos I-IV.

## Carga horária total

- Soma das cargas horárias declaradas por disciplina (12 de 13 disciplinas
  informam "40 horas"): **480h**.
- D04.04 (Projeto Final Integrador) não declara carga horária no
  arquivo-fonte — carga total do curso é, portanto, **480h + Projeto Final
  Integrador (a determinar)**.
- Os cabeçalhos de módulo do rascunho-fonte somam 560h (200+120+120+120), mas
  esse número não bate com a soma real das disciplinas promovidas (480h) nem
  incorpora a carga do projeto final; tratar 480h+ como o número confiável
  até que a divergência seja resolvida (ver `CLAUDE.md`).
