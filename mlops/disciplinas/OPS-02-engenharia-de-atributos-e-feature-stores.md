# OPS-02 — Engenharia de Atributos e Feature Stores

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** OPS-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina aborda a engenharia de atributos sob a ótica de sistemas de produção. Explora a arquitetura de Feature Stores corporativas, detalhando a separação entre camadas de armazenamento offline (Data Lake/Warehouse) e online (bancos de dados de baixíssima latência como Redis). Analisa a consistência treino-serviço (*training-serving skew*), estratégias de materialização de dados, e a matemática de junções históricas com correção temporal (*point-in-time correctness*). Ensina o uso prático de frameworks líderes de mercado (como Feast ou Hopsworks) para registrar, servir e monitorar atributos de machine learning.

## Objetivos
1. Projetar a arquitetura lógica e física de uma Feature Store unificando o serviço offline e online de atributos.
2. Implementar junções históricas robustas que evitem o vazamento de dados futuros no conjunto de treino (*data leakage*).
3. Desenvolver rotinas de materialização e ingestão em tempo real de novos atributos para modelos em produção.

## Pré-requisitos
OPS-01 Ciclo de Vida de Modelos (MLLC) e noções de banco de dados SQL.

## Conteúdo programático

**Fundamentos** — O problem do silo de atributos e cálculo duplicado em equipes de ciência de dados; o conceito de Feature Store; a divisão entre barramento offline (para treinamento em lote) e barramento online (para inferência em tempo real com baixa latência).

**Teoria** — A formulação de consistência temporal e junção histórica com correção pontual (*point-in-time join*):
$$t_{\text{evento}} \leq t_{\text{observação}}$$
Garantir que, para qualquer registro histórico de treino observado no instante $t_{\text{observação}}$, o valor do atributo utilizado seja o estado mais recente calculado no instante $t_{\text{evento}}$, impedindo que informações do futuro vazem para o estimador. A modelagem matemática de consistência treino-serviço (*training-serving skew*) como a divergência de distribuição de probabilidade de atributos calculada em duas infraestruturas de tempo distintas.

**Aplicação prática** — Implementação de rotina em Python para simular a ingestão de registros e uma junção histórica de atributos baseada em carimbos de data/hora (timestamps), garantindo a integridade temporal dos dados de treino.

## Código de Exemplo em Python (Junção Histórica Point-in-Time)
```python
import pandas as pd
import numpy as np

# 1. Tabela de Eventos (Eventos de interesse - ex: quando o cliente fez uma compra)
compras = pd.DataFrame([
    {"cliente_id": 1001, "timestamp": pd.Timestamp("2026-07-01 10:30:00"), "label_fraude": 0},
    {"cliente_id": 1001, "timestamp": pd.Timestamp("2026-07-01 15:45:00"), "label_fraude": 1},
    {"cliente_id": 1002, "timestamp": pd.Timestamp("2026-07-01 11:15:00"), "label_fraude": 0}
])

# 2. Tabela de Atributos Históricos (Calculados assincronamente em lote)
atributos_score = pd.DataFrame([
    {"cliente_id": 1001, "timestamp": pd.Timestamp("2026-07-01 09:00:00"), "score_credito": 650},
    {"cliente_id": 1001, "timestamp": pd.Timestamp("2026-07-01 12:00:00"), "score_credito": 620},
    {"cliente_id": 1001, "timestamp": pd.Timestamp("2026-07-01 16:00:00"), "score_credito": 400}, # Futuro para a compra das 15:45
    {"cliente_id": 1002, "timestamp": pd.Timestamp("2026-07-01 08:00:00"), "score_credito": 800}
])

# Ordenar tabelas obrigatoriamente para a mesclagem temporal
compras = compras.sort_values("timestamp")
atributos_score = atributos_score.sort_values("timestamp")

# 3. Executar o Point-in-Time Join (usando pandas merge_asof)
# Busca o atributo mais recente disponível ANTES ou NO MOMENTO da compra
dataset_treino = pd.merge_asof(
    compras, 
    atributos_score, 
    on="timestamp", 
    by="cliente_id", 
    direction="backward" # Busca o passado mais próximo
)

print("--- Dataset de Treino com Point-in-Time Correctness ---")
print(dataset_treino)
```

## Casos práticos
- **Caso 1**: Uma fintech de pagamentos instantâneos implementou um modelo de detecção de fraudes. No treino offline, o modelo usou variáveis como "média de transações nos últimos 10 minutos" calculadas via Spark SQL. Em produção, devido à falta de sincronia e latência de escrita no banco operacional (NoSQL), os dados demoravam 30 segundos para atualizar. Como resultado, a taxa de falsos negativos triplicou.
- **Caso 2**: Um cientista de dados treinou um modelo de cancelamento de assinaturas (churn) usando uma query SQL que buscava o saldo médio mensal atual de cada cliente. Ao colocar em produção, o modelo apresentou péssimo desempenho porque os clientes que já haviam cancelado a assinatura tinham saldo zerado no banco (vazamento temporal de dados futuros).
- **Caso 3 (Caso Multivariável)**: Desenho lógico do pipeline de dados de uma Feature Store para um sistema de score de crédito dinâmico. O sistema precisa atualizar atributos a cada transação via streaming (Kafka) e servir esses atributos em menos de 10ms via Redis para o modelo de inferência online, mantendo um log persistente no BigQuery para treinamento mensal do modelo.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 23053:2022 | Define conceitos de pipelines de dados para inteligência artificial, exigindo conformidade de transformações. | Garante a padronização das transformações de atributos em ambientes de experimentação e produção. |
| LGPD (Art. 6º - Qualidade) | Direito do titular à exatidão, clareza, relevância e atualização dos dados tratados em sistemas automatizados. | Obriga o monitoramento de distorções e inconsistências temporais no cálculo de features individuais de usuários. |

## Doutrina / Referências Técnicas
- KARIMOV, J. et al. *Feature Stores for Machine Learning: An Overview*. IEEE Access, 2021.
- FEAST (Documentation). *Concepts: Entities, Feature Views, Online and Offline Stores*. Feast.dev.
- LIN, Y. et al. *Training-Serving Skew: Prevention and Detection in Industrial ML Systems*. KDD, 2020.

## Legislação Relacionada
- Lei Geral de Proteção de Dados (LGPD) - Artigo 6º, Inciso V (Requisito de Qualidade de Dados).
- Marco Civil da Internet (Lei nº 12.965/2014) - Dever de clareza nas políticas de retenção e tratamento de dados históricos de conexão.

## Prática Profissional
- Configuração de Feature Views em repositórios Git, definição de pipelines de materialização periódica ( Feast Job) e acoplamento de engines de processamento de fluxo (Flink/Spark) à Feature Store corporativa.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Feature Stores com suporte nativo a controle declarativo de infraestrutura (Features-as-Code) são fundamentais para evitar descompassos operacionais entre equipes de engenharia e ciência de dados.
- **Debate ativo pós-2023:** Feature Stores centralizadas versus arquiteturas descentralizadas de Data Mesh, discutindo-se a viabilidade técnica e financeira de manter bases de dados de cache online sob altas taxas de escrita.

## Questões Avançadas
- Discorra sobre como a consistência entre o código de transformação de variáveis offline (usando PySpark) e o código online (usando Java/Python nativo) é garantida por meio da serialização unificada de Feature Views. *(pesquisa/sistemas)*
- Qual o impacto de um "out-of-order event" (evento atrasado que chega ao barramento de mensagens com timestamp antigo) na integridade de uma Feature Store online e como mitigá-lo? *(pesquisa)*

## Exercícios
- Modifique o script de exemplo para calcular a junção histórica considerando uma janela temporal limite (ex: não aceitar atributos calculados há mais de 24 horas antes do evento de compra).
- Implemente em pandas um pipeline simulando a transformação de uma variável numérica bruta em uma variável normalizada e certifique-se de que os mesmos parâmetros de normalização (média e desvio padrão do treino) sejam salvos para uso na inferência online.
- Desenhe o diagrama lógico de fluxo de dados mostrando a escrita paralela na Feature Store offline (Parquet) e online (Redis) a partir de um barramento Kafka.

## Tags
#MLOps #Pipeline #Producao
