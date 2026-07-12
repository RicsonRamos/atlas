import { useState, useEffect, useRef } from "react";


// ─── TRILHA CORE ──────────────────────────────────────────────────────────────
const TRILHA_CORE = [
  {
    id: "01",
    titulo: "Fundamentos Computacionais e Matemáticos",
    subtopicos: 18,
    cor: "#BD93F9",
    icon: "∑",
    trilha: "CORE",
    conceitos: [
      { nome: "Visão Geral: Fundamentos Computacionais e Matemáticos (Plataforma Interativa)", yt: "", page: "/pages/fundamentos-modulo-01.html" },
      { nome: "Lógica matemática e teoria dos conjuntos", yt: "https://www.youtube.com/results?search_query=lógica+matemática+teoria+conjuntos+computação", page: "/pages/logica-conjuntos.html" },
      { nome: "Computação e Lógica: A Arquitetura do Pensamento", yt: "https://www.youtube.com/results?search_query=portas+lógicas+álgebra+booleana+computação", page: "/pages/logica_1.html" },
      { nome: "Computação & Lógica: Tratado Interativo", yt: "https://www.youtube.com/results?search_query=teoria+da+computabilidade+lógica+matemática+computação", page: "/pages/logica_2.html" },
      { nome: "🧪 LogicLab: Laboratório Interativo de Lógica (Proposicional, Predicados, Fuzzy e Quântica)", yt: "", page: "/LogicLab/index.html" },
      { nome: "📐 Dicionário Interativo de Símbolos Matemáticos (Simboliza)", yt: "", page: "/SimbolosMatematicos/index.html" },
      { nome: "Matemática Discreta (UFF) — Prof. Luís Felipe Ignácio Cunha", yt: "https://www.youtube.com/playlist?list=PL6mfjjCaO1WrEJ0JKRyXO3QjaPkJaSvAS", page: "/pages/Prof. Luís Felipe Ignácio Cunha.html" },
      { nome: "Fundamentos Matemáticos da Computação (CK0181) — UFC", yt: "https://www.youtube.com/playlist?list=PL6mfjjCaO1WrEJ0JKRyXO3QjaPkJaSvAS", page: "/pages/Fundamentos Matemáticos da Computação (CK0181) (Graduação).html" },
      { nome: "Roadmap de Fundamentos Computacionais (Interativo)", yt: "https://www.youtube.com/playlist?list=PL6mfjjCaO1WrEJ0JKRyXO3QjaPkJaSvAS", page: "/pages/roadmap_fundamentos_computacionais.html" },
      { nome: "Álgebra linear aplicada: espaços vetoriais, SVD, distância de cosseno", yt: "https://www.youtube.com/results?search_query=SVD+singular+value+decomposition+cosine+distance+ML", page: "/pages/algebra-linear.html" },
      { nome: "Probabilidade e distribuições estatísticas (Normal, Binomial, Poisson, Dirichlet)", yt: "https://www.youtube.com/results?search_query=probabilidade+distribuições+estatísticas+dados", page: "/pages/explorador-de-distribuicoes.html" },
      { nome: "Estatística aplicada: média, mediana, variância, testes de hipótese, T-test, ANOVA", yt: "https://www.youtube.com/results?search_query=estatística+aplicada+testes+hipótese+dados", page: "/pages/estatistica-aplicada.html" },
      { nome: "Teorema de Bayes e classificadores bayesianos", yt: "https://www.youtube.com/results?search_query=teorema+bayes+classificadores+bayesianos", page: "/pages/teorema-de-bayes.html" },
      { nome: "Complexidade de algoritmos", yt: "https://www.youtube.com/results?search_query=big+O+notation+complexity+data+engineering", page: "/pages/big-o.html" },
      { nome: "Estruturas de dados: B+ Trees, Hash Tables, Bloom Filters, Heaps", yt: "https://www.youtube.com/results?search_query=B+tree+hash+table+bloom+filter+database+internals", page: "/pages/estruturas-de-dados.html" },
      { nome: "Grafos e DAGs — lineage, Airflow, BFS/DFS, ordenação topológica", yt: "https://www.youtube.com/results?search_query=DAG+directed+acyclic+graph+graph+theory+data+engineering", page: "/pages/grafos-orquestracao.html" },
      { nome: "Maturidade de Dados e IA (Visão Arquitetural e Mesh)", yt: "https://www.youtube.com/results?search_query=data+mesh+data+maturity+architecture", page: "/pages/maturidade-dados.html" },
    ],
  },
  {
    id: "02", titulo: "Ciência da Computação Aplicada", subtopicos: 28, cor: "#FF79C6", icon: "⚙", trilha: "CORE",
    conceitos: [
      { nome: "Sistemas Operacionais Unix: processos, threads, I/O assíncrono, cgroups, namespaces", yt: "https://www.youtube.com/results?search_query=operating+systems+processes+threads+async+io+unix" },
      { nome: "Redes: TCP/IP, HTTP/2, gRPC, TLS/mTLS — latência de pipelines", yt: "https://www.youtube.com/results?search_query=TCP+IP+gRPC+TLS+networking+fundamentals" },
      { nome: "Concorrência: modelos de ator, async/await, race conditions, multithreading", yt: "https://www.youtube.com/results?search_query=concurrency+async+await+actor+model+multithreading" },
      { nome: "Paginação de memória RAM, buffer pools e soquetes de rede", yt: "https://www.youtube.com/results?search_query=memory+paging+buffer+pool+sockets+operating+systems" },
      { nome: "Estruturas probabilísticas: Bloom Filters, HyperLogLog", yt: "https://www.youtube.com/results?search_query=bloom+filter+hyperloglog+probabilistic+data+structures" },
      { nome: "Algoritmos de busca binária, ordenação rápida e complexidade real", yt: "https://www.youtube.com/results?search_query=binary+search+quicksort+algorithm+complexity+analysis" },
    ],
  },
  {
    id: "03", titulo: "Engenharia de Software para Dados", subtopicos: 30, cor: "#8BE9FD", icon: "{}", trilha: "CORE",
    conceitos: [
      { nome: "Python avançado: Pydantic, Polars, typing estrito, async, Lambda/Map/Filter", yt: "https://www.youtube.com/results?search_query=python+pydantic+polars+async+typing+data+engineering" },
      { nome: "OOP aplicada a dados: Extractor, Transformer, Loader, SchemaManager", yt: "https://www.youtube.com/results?search_query=python+OOP+data+engineering+ETL+design+patterns" },
      { nome: "Git: trunk-based development, conventional commits, estratégias de merge", yt: "https://www.youtube.com/results?search_query=git+trunk+based+development+conventional+commits" },
      { nome: "Testes de dados: pytest + Great Expectations + contratos de dados", yt: "https://www.youtube.com/results?search_query=great+expectations+data+testing+pytest+contracts" },
      { nome: "CI/CD para pipelines: GitHub Actions, deploy de DAGs, dbt", yt: "https://www.youtube.com/results?search_query=CI+CD+data+pipelines+github+actions+dbt+airflow" },
      { nome: "Docker: multi-stage builds, volumes, variáveis de ambiente (.env), requirements.txt", yt: "https://www.youtube.com/results?search_query=docker+multi+stage+build+volumes+data+engineering" },
      { nome: "APIs de dados: REST, gRPC, OpenAPI como contrato de produto", yt: "https://www.youtube.com/results?search_query=REST+API+gRPC+OpenAPI+data+products+fastapi" },
      { nome: "Observabilidade de código: logging estruturado, tracing, profiling", yt: "https://www.youtube.com/results?search_query=structured+logging+tracing+profiling+python+observability" },
      { nome: "Geração de diagramas ER com Mermaid.js e dbdiagram.io", yt: "https://www.youtube.com/results?search_query=mermaid+js+ERD+entity+relationship+diagram+code" },
    ],
  },
  {
    id: "04", titulo: "Bancos de Dados e Armazenamento", subtopicos: 35, cor: "#50FA7B", icon: "🗄", trilha: "CORE",
    conceitos: [
      { nome: "SQL avançado: window functions, CTEs recursivas, LATERAL, EXPLAIN ANALYZE", yt: "https://www.youtube.com/results?search_query=SQL+window+functions+CTE+recursive+explain+analyze+advanced" },
      { nome: "Modelagem dimensional: Kimball star schema, SCD Tipos 1–6, fatos acumulativos", yt: "https://www.youtube.com/results?search_query=kimball+star+schema+SCD+slowly+changing+dimension" },
      { nome: "Data Vault 2.0: hubs, links, satellites, hash keys — ambientes distribuídos", yt: "https://www.youtube.com/results?search_query=data+vault+2.0+hubs+links+satellites+tutorial" },
      { nome: "Normalização até 3NF e abordagem Inmon", yt: "https://www.youtube.com/results?search_query=database+normalization+3NF+inmon+data+warehouse" },
      { nome: "Internals: MVCC, WAL, ARIES — recovery, locks e vacuum em produção", yt: "https://www.youtube.com/results?search_query=MVCC+WAL+ARIES+database+internals+recovery+locks" },
      { nome: "B+ Trees e LSM Trees: trade-offs de storage engine e compaction", yt: "https://www.youtube.com/results?search_query=B+tree+LSM+tree+log+structured+merge+storage+engine" },
      { nome: "Query optimizer: estatísticas de tabela, cardinalidade, CBO, AQE no Spark", yt: "https://www.youtube.com/results?search_query=query+optimizer+cost+based+optimization+cardinality+spark" },
      { nome: "Joins distribuídos: broadcast vs. shuffle, skew handling", yt: "https://www.youtube.com/results?search_query=spark+join+strategies+broadcast+shuffle+hash+sort+merge" },
      { nome: "Cubos analíticos OLAP e indexação física de alta performance", yt: "https://www.youtube.com/results?search_query=OLAP+cube+analytical+queries+columnar+index" },
    ],
  },
  {
    id: "05", titulo: "Engenharia de Dados — Fundamentos e Padrões", subtopicos: 36, cor: "#FFB86C", icon: "⇌", trilha: "CORE",
    conceitos: [
      { nome: "Ciclo de vida: Geração, Armazenamento, Ingestão, Transformação e Serviço", yt: "https://www.youtube.com/results?search_query=data+engineering+lifecycle+fundamentals+ingestion+serving" },
      { nome: "Padrões de ingestão: batch, micro-batch, streaming — trade-offs de latência e custo", yt: "https://www.youtube.com/results?search_query=batch+micro+batch+streaming+ingestion+patterns+tradeoffs" },
      { nome: "ELT vs. ETL: decisão arquitetural, não preferência de ferramenta", yt: "https://www.youtube.com/results?search_query=ELT+vs+ETL+data+engineering+architecture+decision" },
      { nome: "CDC log-based com Debezium: WAL como fonte de eventos", yt: "https://www.youtube.com/results?search_query=CDC+change+data+capture+debezium+WAL+postgres" },
      { nome: "Idempotência e reprocessamento seguro — fault-tolerant pipelines", yt: "https://www.youtube.com/results?search_query=idempotency+data+pipelines+reprocessing+fault+tolerant" },
      { nome: "Schema evolution: backward/forward compatibility, migração sem downtime", yt: "https://www.youtube.com/results?search_query=schema+evolution+backward+forward+compatibility+avro+protobuf" },
      { nome: "Apache Airflow: DAG design patterns, TaskFlow API, SLAs, alertas", yt: "https://www.youtube.com/results?search_query=apache+airflow+DAG+taskflow+API+SLA+production" },
      { nome: "dbt: materializations, testes, macros, semantic layer, linhagem", yt: "https://www.youtube.com/results?search_query=dbt+materializations+tests+macros+semantic+layer+lineage" },
      { nome: "Medallion Architecture: Bronze/Raw, Silver/Enriched, Gold/Curated", yt: "https://www.youtube.com/results?search_query=medallion+architecture+bronze+silver+gold+lakehouse" },
      { nome: "Parquet internals: compressão, column pruning, row groups, dictionary encoding", yt: "https://www.youtube.com/results?search_query=parquet+format+internals+column+pruning+compression+row+group" },
    ],
  },
  {
    id: "06", titulo: "Big Data — Processamento Distribuído", subtopicos: 30, cor: "#FF5555", icon: "⚡", trilha: "CORE",
    conceitos: [
      { nome: "Spark Core: RDDs, lazy evaluation, DAG de execução, Jobs/Stages/Tasks", yt: "https://www.youtube.com/results?search_query=apache+spark+RDD+lazy+evaluation+DAG+core+concepts" },
      { nome: "Catalyst Optimizer: plano lógico, físico e Whole-Stage CodeGen", yt: "https://www.youtube.com/results?search_query=spark+catalyst+optimizer+logical+physical+plan+codegen" },
      { nome: "Project Tungsten: off-heap memory, Kryo Serializer", yt: "https://www.youtube.com/results?search_query=spark+tungsten+off+heap+memory+kryo+serializer" },
      { nome: "AQE: coalescimento de partições, conversão dinâmica de join, Data Skew", yt: "https://www.youtube.com/results?search_query=spark+adaptive+query+execution+AQE+skew+partitions" },
      { nome: "Os 5 Ss do Spark: Shuffle, Spill, Skew, Small Files, Serialization", yt: "https://www.youtube.com/results?search_query=spark+shuffle+spill+skew+small+files+optimization" },
      { nome: "Kafka internals: log append-only, tópicos, partições, consumer groups, rebalancing", yt: "https://www.youtube.com/results?search_query=kafka+log+structured+storage+consumer+group+rebalancing" },
      { nome: "Semânticas de entrega: at-least-once, at-most-once, exactly-once (Kafka + Flink)", yt: "https://www.youtube.com/results?search_query=exactly+once+semantics+kafka+flink+delivery+guarantees" },
      { nome: "Flink: event time vs. processing time, watermarks, Consumer Lag", yt: "https://www.youtube.com/results?search_query=apache+flink+event+time+watermarks+consumer+lag+streaming" },
      { nome: "Spark Structured Streaming: Unbounded Table, modos Append/Update/Complete", yt: "https://www.youtube.com/results?search_query=spark+structured+streaming+unbounded+table+output+modes" },
      { nome: "Lambda vs. Kappa Architecture: decisão de trade-off", yt: "https://www.youtube.com/results?search_query=lambda+vs+kappa+architecture+streaming+batch+tradeoff" },
    ],
  },
  {
    id: "07", titulo: "Sistemas Distribuídos — Fundamentos", subtopicos: 38, cor: "#F1FA8C", icon: "◈", trilha: "CORE",
    conceitos: [
      { nome: "Teorema CAP e PACELC: implicações reais em Cassandra, DynamoDB, PostgreSQL", yt: "https://www.youtube.com/results?search_query=CAP+theorem+PACELC+cassandra+dynamodb+distributed" },
      { nome: "Modelos de consistência: linearizabilidade, sequential, causal, eventual", yt: "https://www.youtube.com/results?search_query=consistency+models+linearizability+eventual+consistency+distributed" },
      { nome: "Raft: leader election, log replication, term numbers — algoritmo concreto", yt: "https://www.youtube.com/results?search_query=raft+consensus+algorithm+leader+election+log+replication+visualization" },
      { nome: "Paxos: single-decree e multi-Paxos — base histórica do consenso", yt: "https://www.youtube.com/results?search_query=paxos+consensus+algorithm+distributed+systems+explained" },
      { nome: "Replicação leaderless (Dynamo-style): quorum R+W>N, sloppy quorum, anti-entropy", yt: "https://www.youtube.com/results?search_query=leaderless+replication+dynamo+quorum+sloppy+quorum" },
      { nome: "Consistent Hashing: virtual nodes, redistribuição — base de Cassandra e Kafka", yt: "https://www.youtube.com/results?search_query=consistent+hashing+virtual+nodes+cassandra+kafka" },
      { nome: "Two-Phase Commit e Sagas: rollback compensatório, orquestração vs. coreografia", yt: "https://www.youtube.com/results?search_query=two+phase+commit+saga+pattern+distributed+transactions" },
      { nome: "Vector clocks e Lamport timestamps: causalidade sem relógio global", yt: "https://www.youtube.com/results?search_query=vector+clocks+lamport+timestamps+causality+distributed+systems" },
      { nome: "Gossip protocol: convergência e detecção de falha — base de Cassandra e K8s", yt: "https://www.youtube.com/results?search_query=gossip+protocol+failure+detection+cassandra+kubernetes" },
      { nome: "Teorema FLP: impossibilidade de consenso em sistemas puramente assíncronos", yt: "https://www.youtube.com/results?search_query=FLP+impossibility+theorem+consensus+asynchronous+distributed" },
    ],
  },
  {
    id: "08", titulo: "Lakehouse, Data Platform e Formatos", subtopicos: 28, cor: "#BD93F9", icon: "△", trilha: "CORE",
    conceitos: [
      { nome: "Apache Iceberg spec v2: row-level deletes, equality deletes, hidden partitioning", yt: "https://www.youtube.com/results?search_query=apache+iceberg+spec+v2+row+level+deletes+hidden+partitioning" },
      { nome: "Delta Lake: transaction log como estrutura de dados, ACID sem locks", yt: "https://www.youtube.com/results?search_query=delta+lake+transaction+log+ACID+internals+time+travel" },
      { nome: "Apache Hudi: copy-on-write vs. merge-on-read, compaction jobs", yt: "https://www.youtube.com/results?search_query=apache+hudi+copy+on+write+merge+on+read+compaction" },
      { nome: "Time Travel e Schema Evolution em formatos de tabela modernos", yt: "https://www.youtube.com/results?search_query=time+travel+schema+evolution+iceberg+delta+hudi" },
      { nome: "Apache XTable: interoperabilidade omnidirecional entre formatos", yt: "https://www.youtube.com/results?search_query=apache+xtable+onetable+interoperability+iceberg+delta+hudi" },
      { nome: "Trino/Presto: federation, connector architecture, cost-based optimization", yt: "https://www.youtube.com/results?search_query=trino+presto+query+federation+connector+architecture+CBO" },
      { nome: "Apache Arrow: formato in-memory, zero-copy reads, UDFs otimizadas", yt: "https://www.youtube.com/results?search_query=apache+arrow+in+memory+zero+copy+UDF+pyspark" },
      { nome: "Object storage: consistência eventual no S3, list consistency", yt: "https://www.youtube.com/results?search_query=S3+object+storage+eventual+consistency+data+lake" },
      { nome: "Compressão: Zstd vs. Snappy vs. LZ4 — trade-off CPU vs. I/O", yt: "https://www.youtube.com/results?search_query=zstd+snappy+lz4+compression+comparison+parquet+spark" },
    ],
  },
  {
    id: "09", titulo: "Governança, Qualidade e Compliance", subtopicos: 32, cor: "#FF79C6", icon: "⚖", trilha: "CORE",
    conceitos: [
      { nome: "Data Contracts: estrutura, enforcement em pipelines — 'API dos dados'", yt: "https://www.youtube.com/results?search_query=data+contracts+engineering+pipeline+enforcement+schema" },
      { nome: "Data Quality dimensions: completeness, accuracy, consistency, timeliness, uniqueness", yt: "https://www.youtube.com/results?search_query=data+quality+dimensions+completeness+accuracy+timeliness" },
      { nome: "Great Expectations: expectations como código, checkpoints, data docs", yt: "https://www.youtube.com/results?search_query=great+expectations+data+quality+tutorial+checkpoints" },
      { nome: "Soda Core: SodaCL como linguagem declarativa de qualidade", yt: "https://www.youtube.com/results?search_query=soda+core+SodaCL+data+quality+checks+tutorial" },
      { nome: "Data Lineage: nível de coluna, integração dbt, Spark e DataHub", yt: "https://www.youtube.com/results?search_query=data+lineage+column+level+dbt+spark+datahub+openlineage" },
      { nome: "Data Observability: 5 pilares — freshness, distribution, volume, schema, lineage", yt: "https://www.youtube.com/results?search_query=data+observability+five+pillars+freshness+volume+schema" },
      { nome: "OpenMetadata e DataHub: ingestão de metadados, busca, ownership", yt: "https://www.youtube.com/results?search_query=openmetadata+datahub+metadata+catalog+data+governance" },
      { nome: "RBAC em dados: row-level security, column masking, ABAC", yt: "https://www.youtube.com/results?search_query=row+level+security+column+masking+RBAC+data+access+control" },
      { nome: "Mascaramento, tokenização e auditoria: Apache Ranger, OPA", yt: "https://www.youtube.com/results?search_query=apache+ranger+OPA+data+masking+tokenization+audit" },
      { nome: "LGPD e GDPR: direitos dos titulares, bases legais, impacto técnico em pipelines", yt: "https://www.youtube.com/results?search_query=LGPD+GDPR+data+engineering+compliance+pipeline+design" },
      { nome: "Data Retention e Data Classification: PII, sensível, público — enforcement técnico", yt: "https://www.youtube.com/results?search_query=data+retention+classification+PII+sensitive+data+governance" },
    ],
  },
  {
    id: "10", titulo: "Cloud e Infraestrutura para Dados", subtopicos: 36, cor: "#8BE9FD", icon: "☁", trilha: "CORE",
    conceitos: [
      { nome: "IAM: roles, policies, least privilege, RBAC em object storage (AWS S3)", yt: "https://www.youtube.com/results?search_query=AWS+IAM+roles+policies+least+privilege+S3+security" },
      { nome: "Networking: VPC, subnets, security groups, PrivateLink — isolamento de stacks", yt: "https://www.youtube.com/results?search_query=AWS+VPC+subnets+security+groups+privatelink+data+platform" },
      { nome: "Kubernetes: nós, namespaces, pods, deployments, services, ingress controllers", yt: "https://www.youtube.com/results?search_query=kubernetes+fundamentals+pods+deployments+services+namespaces" },
      { nome: "Spark on Kubernetes: Spark K8s Operator, Persistent Volumes (PV/PVC)", yt: "https://www.youtube.com/results?search_query=spark+on+kubernetes+operator+persistent+volume+data" },
      { nome: "Helm Charts: empacotamento e deploy repetível de aplicações de dados", yt: "https://www.youtube.com/results?search_query=helm+charts+kubernetes+deployment+data+applications" },
      { nome: "Terraform: state management, módulos, workspaces — IaC obrigatório", yt: "https://www.youtube.com/results?search_query=terraform+state+management+modules+workspaces+IaC+data" },
      { nome: "OpenTelemetry, Prometheus, Grafana — três pilares de observabilidade", yt: "https://www.youtube.com/results?search_query=opentelemetry+prometheus+grafana+observability+stack+kubernetes" },
      { nome: "FinOps: cost allocation, rightsizing, Reserved vs. Spot, vendor lock-in", yt: "https://www.youtube.com/results?search_query=finops+cloud+cost+optimization+rightsizing+spot+reserved+instances" },
    ],
  },
];

// ─── TRILHA STAFF ─────────────────────────────────────────────────────────────
const TRILHA_STAFF = [
  {
    id: "11", titulo: "Machine Learning Clássico e Deep Learning", subtopicos: 38, cor: "#50FA7B", icon: "◉", trilha: "STAFF",
    conceitos: [
      { nome: "Ciclo de ML: EDA, divisão treino/teste, cross-validation, imputação de missing values", yt: "https://www.youtube.com/results?search_query=machine+learning+workflow+EDA+cross+validation+feature+engineering" },
      { nome: "Feature Engineering: One-Hot, Label, Target Encoding, transformações polinomiais", yt: "https://www.youtube.com/results?search_query=feature+engineering+encoding+categorical+variables+sklearn" },
      { nome: "Normalização e Padronização: MinMaxScaler, StandardScaler/Z-Score", yt: "https://www.youtube.com/results?search_query=normalization+standardization+minmax+zscore+sklearn" },
      { nome: "Algoritmos clássicos: Regressão Linear/Logística, KNN, Naive Bayes, K-Means", yt: "https://www.youtube.com/results?search_query=machine+learning+algorithms+regression+KNN+naive+bayes+kmeans" },
      { nome: "Métricas: Accuracy, Precision, Recall, F1, ROC/AUC, MAE, MSE, RMSE, R²", yt: "https://www.youtube.com/results?search_query=ML+metrics+precision+recall+F1+ROC+AUC+regression+evaluation" },
      { nome: "Bias-Variance Tradeoff: underfitting vs. overfitting — fundamento matemático", yt: "https://www.youtube.com/results?search_query=bias+variance+tradeoff+underfitting+overfitting+machine+learning" },
      { nome: "Ensemble: Bagging (Random Forest), Boosting (Gradient Boosting)", yt: "https://www.youtube.com/results?search_query=ensemble+methods+random+forest+gradient+boosting+bagging" },
      { nome: "XGBoost, LightGBM, CatBoost: DMatrix, Max Depth, Learning Rate, Objective Functions", yt: "https://www.youtube.com/results?search_query=XGBoost+LightGBM+CatBoost+hyperparameters+tuning+comparison" },
      { nome: "Deep Learning: ANN/MLP, Perceptron, funções de ativação (ReLU, Sigmoid, Softmax)", yt: "https://www.youtube.com/results?search_query=deep+learning+neural+network+activation+functions+perceptron" },
      { nome: "Backpropagation, otimizadores SGD/Adam, Vanishing/Exploding Gradients", yt: "https://www.youtube.com/results?search_query=backpropagation+SGD+Adam+vanishing+exploding+gradients+deep+learning" },
      { nome: "Regularização: Dropout, L1/L2, Batch Normalization, Layer Normalization", yt: "https://www.youtube.com/results?search_query=dropout+L1+L2+batch+normalization+layer+normalization+regularization" },
      { nome: "CNNs: conv layers, MaxPooling, ResNet — visão computacional", yt: "https://www.youtube.com/results?search_query=CNN+convolutional+neural+network+ResNet+computer+vision" },
      { nome: "RNNs, LSTMs e GRUs para dados sequenciais e séries temporais", yt: "https://www.youtube.com/results?search_query=RNN+LSTM+GRU+sequential+data+time+series+deep+learning" },
      { nome: "VAEs: espaço latente, truque de reparametrização, KL divergence", yt: "https://www.youtube.com/results?search_query=variational+autoencoder+VAE+latent+space+KL+divergence" },
      { nome: "GANs: minimax, gerador vs. discriminador, mode collapse", yt: "https://www.youtube.com/results?search_query=GAN+generative+adversarial+network+mode+collapse+minimax" },
      { nome: "Transfer Learning e fine-tuning: congelamento/descongelamento de camadas", yt: "https://www.youtube.com/results?search_query=transfer+learning+fine+tuning+layer+freezing+pytorch+keras" },
      { nome: "PyTorch e TensorFlow/Keras: frameworks industriais de deep learning", yt: "https://www.youtube.com/results?search_query=pytorch+tensorflow+keras+deep+learning+framework+tutorial" },
    ],
  },
  {
    id: "12", titulo: "IA Generativa, NLP Avançado e Infraestrutura GenAI", subtopicos: 32, cor: "#FFB86C", icon: "✦", trilha: "STAFF",
    conceitos: [
      { nome: "NLP: tokenização, lematização, stemização, TF-IDF, Bag of Words", yt: "https://www.youtube.com/results?search_query=NLP+tokenization+lemmatization+TF-IDF+bag+of+words+python" },
      { nome: "Word2Vec, GloVe: embeddings densos e proximidade semântica espacial", yt: "https://www.youtube.com/results?search_query=word2vec+glove+word+embeddings+semantic+similarity+NLP" },
      { nome: "NER e análise de sentimentos com LSTMs bidirecionais, spaCy, Hugging Face", yt: "https://www.youtube.com/results?search_query=NER+sentiment+analysis+LSTM+spacy+hugging+face+transformers" },
      { nome: "Arquitetura Transformer: Self-Attention, Positional Encoding, Encoder-Decoder (Vaswani)", yt: "https://www.youtube.com/results?search_query=transformer+architecture+attention+mechanism+positional+encoding+paper" },
      { nome: "Modelos de Difusão: adição de ruído gaussiano e denoising reverso", yt: "https://www.youtube.com/results?search_query=diffusion+models+gaussian+noise+denoising+stable+diffusion" },
      { nome: "Prompt Engineering: Zero-shot, Few-shot, CoT, Tree-of-Thoughts, ReAct", yt: "https://www.youtube.com/results?search_query=prompt+engineering+zero+shot+few+shot+chain+of+thought+ReAct" },
      { nome: "RAG: chunking semântico, busca híbrida BM25 + vetorial, re-ranking, RAGAS", yt: "https://www.youtube.com/results?search_query=RAG+retrieval+augmented+generation+BM25+reranking+RAGAS+evaluation" },
      { nome: "Embeddings como tipo de dado: geração, armazenamento, indexação, atualização", yt: "https://www.youtube.com/results?search_query=embeddings+vector+storage+indexing+update+pipeline+data+engineering" },
      { nome: "Vector databases: HNSW, IVF, pgvector, Qdrant, Milvus, Pinecone, Chroma", yt: "https://www.youtube.com/results?search_query=vector+database+HNSW+IVF+pgvector+qdrant+milvus+comparison" },
      { nome: "Pipelines de indexação RAG orquestrados com Airflow", yt: "https://www.youtube.com/results?search_query=RAG+indexing+pipeline+airflow+embedding+orchestration+production" },
      { nome: "Agentes de IA: LangChain, LlamaIndex, LangGraph, CrewAI — multi-agent systems", yt: "https://www.youtube.com/results?search_query=langchain+llamaindex+langgraph+crewai+multi+agent+AI+framework" },
      { nome: "Tool Calling com validação via Pydantic, controle de loops infinitos", yt: "https://www.youtube.com/results?search_query=tool+calling+function+calling+pydantic+validation+agents" },
      { nome: "LLM Serving: vLLM, Triton — Continuous Batching, PagedAttention, KV Cache", yt: "https://www.youtube.com/results?search_query=vLLM+triton+inference+server+continuous+batching+paged+attention" },
      { nome: "Speculative Decoding: modelos auxiliares para redução de latência TTFT", yt: "https://www.youtube.com/results?search_query=speculative+decoding+LLM+inference+latency+time+to+first+token" },
      { nome: "Quantização: FP8, AWQ, GPTQ, GGUF, bitsandbytes 4-bit", yt: "https://www.youtube.com/results?search_query=LLM+quantization+FP8+AWQ+GPTQ+GGUF+bitsandbytes+4bit" },
      { nome: "Fine-tuning eficiente: LoRA e QLoRA — adaptação de baixo posto", yt: "https://www.youtube.com/results?search_query=LoRA+QLoRA+fine+tuning+LLM+low+rank+adaptation+efficient" },
      { nome: "Observabilidade de sistemas GenAI: latência, custo por token, qualidade de retrieval", yt: "https://www.youtube.com/results?search_query=LLM+observability+latency+cost+per+token+retrieval+quality+monitoring" },
    ],
  },
  {
    id: "13", titulo: "MLOps, Feature Stores e Plataformas de ML", subtopicos: 22, cor: "#FF5555", icon: "◆", trilha: "STAFF",
    conceitos: [
      { nome: "MLOps: automação do ciclo de vida (prep → treino → validação → deploy → monitoramento)", yt: "https://www.youtube.com/results?search_query=MLOps+machine+learning+lifecycle+automation+devops+practices" },
      { nome: "MLflow, Comet ML, W&B: tracking de experimentos, model registry, artefatos", yt: "https://www.youtube.com/results?search_query=MLflow+weights+biases+experiment+tracking+model+registry" },
      { nome: "Feature Store: Feast, Hopsworks — online vs. offline, point-in-time correctness", yt: "https://www.youtube.com/results?search_query=feature+store+feast+hopsworks+online+offline+point+in+time" },
      { nome: "Model serving: FastAPI, TorchServe, Triton Inference Server", yt: "https://www.youtube.com/results?search_query=model+serving+fastapi+torchserve+triton+inference+production" },
      { nome: "KServe e Kubeflow Pipelines: deploy elástico de modelos com GPU/TPU", yt: "https://www.youtube.com/results?search_query=KServe+kubeflow+pipelines+model+deployment+GPU+kubernetes" },
      { nome: "Data Drift e Concept Drift: detecção com Evidently AI, Fiddler, SageMaker Monitor", yt: "https://www.youtube.com/results?search_query=data+drift+concept+drift+evidently+fiddler+sagemaker+monitoring" },
      { nome: "Data-Centric AI: curadoria, labeling e qualidade de dados como prioridade", yt: "https://www.youtube.com/results?search_query=data+centric+AI+Andrew+Ng+data+quality+labeling+curation" },
      { nome: "XAI: LIME e SHAP — explicabilidade post-hoc de modelos", yt: "https://www.youtube.com/results?search_query=explainable+AI+LIME+SHAP+model+interpretability+post+hoc" },
      { nome: "Viés algorítmico: viés cognitivo na amostragem, viés de confirmação, mitigação", yt: "https://www.youtube.com/results?search_query=algorithmic+bias+dataset+bias+fairness+AI+ethics+mitigation" },
    ],
  },
  {
    id: "14", titulo: "Arquitetura de Sistemas de Dados", subtopicos: 30, cor: "#F1FA8C", icon: "⬡", trilha: "STAFF",
    conceitos: [
      { nome: "Data Mesh: 4 princípios com implementação técnica — não apenas filosofia", yt: "https://www.youtube.com/results?search_query=data+mesh+four+principles+implementation+technical+zhamak" },
      { nome: "Data Products: output ports, SLAs, versionamento, discovery", yt: "https://www.youtube.com/results?search_query=data+products+output+ports+SLA+versioning+data+mesh+implementation" },
      { nome: "Data Contracts como primitivo de arquitetura: enforcement, evolução, breaking changes", yt: "https://www.youtube.com/results?search_query=data+contracts+architecture+breaking+changes+evolution+enforcement" },
      { nome: "Trade-off framework: Data Warehouse vs. Lakehouse vs. Data Lake", yt: "https://www.youtube.com/results?search_query=data+warehouse+lakehouse+data+lake+comparison+when+to+use" },
      { nome: "ADRs: Architecture Decision Records — estrutura e processo técnico", yt: "https://www.youtube.com/results?search_query=architecture+decision+records+ADR+template+process+engineering" },
      { nome: "Diagramas C4: Context, Container, Component — comunicar arquitetura", yt: "https://www.youtube.com/results?search_query=C4+model+architecture+diagrams+context+container+component" },
      { nome: "Staff Engineer archetypes: Tech Lead, Architect, Solver, Right Hand (Will Larson)", yt: "https://www.youtube.com/results?search_query=staff+engineer+archetypes+tech+lead+architect+will+larson" },
      { nome: "Engineering metrics: DORA, SLOs de pipelines, error budgets", yt: "https://www.youtube.com/results?search_query=DORA+metrics+SLO+error+budget+engineering+productivity" },
      { nome: "Disaster Recovery: RTO, RPO, multi-region, chaos engineering em pipelines", yt: "https://www.youtube.com/results?search_query=disaster+recovery+RTO+RPO+chaos+engineering+data+systems" },
      { nome: "Build vs. Buy vs. Open Source: TCO framework e negociação cloud", yt: "https://www.youtube.com/results?search_query=build+vs+buy+open+source+TCO+total+cost+ownership+engineering" },
      { nome: "Post-mortems sem culpa, runbooks, game days — cultura de incidentes", yt: "https://www.youtube.com/results?search_query=blameless+postmortem+runbook+game+day+incident+management+SRE" },
    ],
  },
];

const ALL = [...TRILHA_CORE, ...TRILHA_STAFF];
const TOTAL_SUB = ALL.reduce((a, b) => a + b.subtopicos, 0);
const TOTAL_CONCEITOS = ALL.reduce((a, b) => a + b.conceitos.length, 0);

const VIEWS = [
  { k: "dashboard", label: "📊 Dashboard" },
  { k: "core", label: "🧠 Trilha Core" },
  { k: "staff", label: "🚀 Trilha Staff" },
  { k: "foco", label: "🎯 Estudo Focado" },
  { k: "busca", label: "🔍 Buscar" },
];

// ─── TIMER HELPER ─────────────────────────────────────────────────────────────
function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function ProgressBar({ value, max, cor, height = 6 }: { value: number; max: number; cor: string; height?: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ background: "#ffffff10", borderRadius: 99, overflow: "hidden", height }}>
      <div style={{ width: `${pct}%`, height: "100%", background: cor, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function YTBtn({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 9px", background: "#FF000020", border: "1px solid #FF000050", borderRadius: 5, color: "#ff5555", fontSize: "0.62rem", fontWeight: 800, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#FF000040")}
      onMouseLeave={e => (e.currentTarget.style.background = "#FF000020")}
    >▶ YT</a>
  );
}

function Checkbox({ checked, onChange, label, color, href }: { checked: boolean; onChange: () => void; label: string; color: string; href?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%" }}>
      <div
        onClick={onChange}
        style={{ position: "relative", width: 16, height: 16, marginTop: 2, flexShrink: 0, cursor: "pointer" }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, height: 16, width: 16,
          backgroundColor: checked ? color : "transparent",
          borderRadius: 4, border: `2px solid ${checked ? color : "#2a2a40"}`,
          transition: "all 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: checked ? `0 0 8px ${color}50` : "none"
        }}>
          {checked && (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
      {href ? (
        <a href={href} style={{
          fontSize: "0.78rem",
          color: checked ? "#505080" : "#e8e8f0",
          textDecoration: checked ? "line-through" : "none",
          transition: "all 0.2s ease",
          lineHeight: 1.45,
          flex: 1,
          cursor: "pointer"
        }}
          onMouseEnter={e => e.currentTarget.style.color = color}
          onMouseLeave={e => e.currentTarget.style.color = checked ? "#505080" : "#e8e8f0"}
        >
          {label}
        </a>
      ) : (
        <span
          onClick={onChange}
          style={{
            fontSize: "0.78rem",
            color: checked ? "#505080" : "#a0a0c0",
            textDecoration: checked ? "line-through" : "none",
            transition: "all 0.2s ease",
            lineHeight: 1.45,
            flex: 1,
            cursor: "pointer"
          }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── STOPWATCH CARD ───────────────────────────────────────────────────────────
function StopwatchCard({ studySeconds, isTimerRunning, onToggle, onReset }: {
  studySeconds: number;
  isTimerRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}) {
  const hours = Math.floor(studySeconds / 3600);
  const displayTime = formatTime(studySeconds);

  return (
    <div style={{
      background: "linear-gradient(135deg, #111120 0%, #14142a 100%)",
      border: `1px solid ${isTimerRunning ? "#00F5D440" : "#1e1e35"}`,
      borderRadius: 12,
      padding: "1.1rem 1.2rem",
      display: "flex",
      alignItems: "center",
      gap: "1.2rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: isTimerRunning ? "0 0 25px #00F5D415" : "none",
      transition: "all 0.4s ease"
    }}>
      {/* Glow background */}
      <div style={{
        position: "absolute", top: "-30%", right: "-5%", width: 120, height: 120,
        borderRadius: "50%", background: isTimerRunning ? "#00F5D410" : "#6C63FF08",
        filter: "blur(30px)", transition: "all 0.4s ease"
      }} />

      {/* Timer icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: isTimerRunning ? "#00F5D415" : "#6C63FF12",
        border: `1px solid ${isTimerRunning ? "#00F5D440" : "#6C63FF30"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", transition: "all 0.3s ease"
      }}>
        {isTimerRunning ? "⏱" : "⏰"}
      </div>

      {/* Time display */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 800, color: isTimerRunning ? "#00F5D4" : "#505080", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
          ⏱ Cronômetro de Estudo
        </div>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "1.8rem",
          fontWeight: 900,
          color: isTimerRunning ? "#00F5D4" : "#e8e8f0",
          letterSpacing: "0.05em",
          lineHeight: 1,
          transition: "color 0.3s ease",
          textShadow: isTimerRunning ? "0 0 20px #00F5D460" : "none"
        }}>
          {displayTime}
        </div>
        <div style={{ fontSize: "0.62rem", color: "#40407a", marginTop: 3 }}>
          {hours > 0 ? `${hours}h de estudo acumuladas` : "Inicie o cronômetro para registrar seu tempo"}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        <button
          onClick={onToggle}
          style={{
            padding: "0.4rem 0.9rem",
            borderRadius: 7,
            border: "none",
            cursor: "pointer",
            fontSize: "0.72rem",
            fontWeight: 800,
            background: isTimerRunning
              ? "linear-gradient(135deg, #FF5555 0%, #cc3333 100%)"
              : "linear-gradient(135deg, #00F5D4 0%, #00b4a0 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: isTimerRunning ? "0 3px 12px #FF555540" : "0 3px 12px #00F5D440",
            transition: "all 0.2s ease",
            minWidth: 90,
            justifyContent: "center"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.opacity = "0.9"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
        >
          {isTimerRunning ? "⏸ Pausar" : "▶ Iniciar"}
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: 7,
            border: "1px solid #2a2a40",
            cursor: "pointer",
            fontSize: "0.68rem",
            fontWeight: 700,
            background: "transparent",
            color: "#505080",
            display: "flex",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#ffffff08"; e.currentTarget.style.color = "#8080b0"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#505080"; }}
        >
          🔄 Resetar
        </button>
      </div>
    </div>
  );
}

// ─── BLOCO CARD ───────────────────────────────────────────────────────────────
function BlocoCard({ bloco, progresso, toggleConcept, onSelectBlock, blockChecks, toggleBlock }: {
  bloco: any;
  progresso: Record<string, boolean>;
  toggleConcept: (blocoId: string, idx: number) => void;
  onSelectBlock: (id: string) => void;
  blockChecks: Record<string, boolean>;
  toggleBlock: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isStaff = parseInt(bloco.id) >= 11;

  const completedLocal = bloco.conceitos.filter((_: any, idx: number) => progresso[`${bloco.id}_${idx}`]).length;
  const totalLocal = bloco.conceitos.length;
  const percentLocal = totalLocal > 0 ? Math.round((completedLocal / totalLocal) * 100) : 0;
  const isBlockChecked = !!blockChecks[bloco.id];

  return (
    <div style={{
      border: "1px solid",
      borderColor: isBlockChecked ? bloco.cor + "70" : open ? bloco.cor + "55" : "#1e1e35",
      borderRadius: 10, overflow: "hidden",
      transition: "border-color 0.2s",
      boxShadow: isBlockChecked ? `0 0 16px ${bloco.cor}20` : open ? `0 0 20px ${bloco.cor}15` : "none"
    }}>

      {/* ── Block-level checkbox strip ── */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "0.4rem 1rem",
          background: isBlockChecked ? bloco.cor + "0c" : "#08081500",
          borderBottom: `1px solid ${isBlockChecked ? bloco.cor + "25" : "#0f0f20"}`,
          transition: "background 0.2s"
        }}
        onClick={e => e.stopPropagation()}
      >
        <Checkbox
          checked={isBlockChecked}
          onChange={() => toggleBlock(bloco.id)}
          label={isBlockChecked ? `Tópico ${bloco.id} marcado como revisado ✓` : `Marcar tópico ${bloco.id} como revisado`}
          color={bloco.cor}
        />
      </div>

      {/* ── Accordion header button ── */}
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "0.8rem 1rem", background: open ? bloco.cor + "08" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ width: 36, height: 36, borderRadius: 8, background: bloco.cor + "20", border: `1px solid ${bloco.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: bloco.cor, flexShrink: 0 }}>{bloco.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 800, color: bloco.cor, letterSpacing: "0.15em" }}>{bloco.id}</span>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#e8e8f0", lineHeight: 1.3 }}>{bloco.titulo}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.67rem", color: "#5050a0" }}>{bloco.subtopicos} subtópicos · {totalLocal} conceitos</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: isStaff ? "#FF006E20" : "#6C63FF20", color: isStaff ? "#ff4d9e" : "#9988ff" }}>
              {isStaff ? "STAFF" : "CORE"}
            </span>
            {percentLocal > 0 && (
              <span style={{ fontSize: "0.62rem", fontWeight: 800, color: percentLocal === 100 ? "#00F5D4" : bloco.cor }}>
                {percentLocal}% {percentLocal === 100 ? "🏆" : `(${completedLocal}/${totalLocal})`}
              </span>
            )}
          </div>
          {percentLocal > 0 && (
            <div style={{ marginTop: 6, maxWidth: 120 }}>
              <ProgressBar value={completedLocal} max={totalLocal} cor={percentLocal === 100 ? "#00F5D4" : bloco.cor} height={3} />
            </div>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onSelectBlock(bloco.id); }}
          style={{ background: bloco.cor + "15", border: `1px solid ${bloco.cor}35`, borderRadius: 5, color: bloco.cor, fontSize: "0.62rem", fontWeight: 700, padding: "3px 8px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3, marginRight: 4, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = bloco.cor + "30"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = bloco.cor + "15"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          🎯 Foco
        </button>

        <span style={{ color: "#4040a0", fontSize: "0.8rem", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>▶</span>
      </button>

      {/* ── Expanded: subtopics with checkboxes ── */}
      {open && (
        <div style={{ borderTop: `1px solid ${bloco.cor}20`, background: "#0a0a16" }}>
          {bloco.conceitos.map((c: any, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.55rem 1rem", borderBottom: i < bloco.conceitos.length - 1 ? "1px solid #0f0f20" : "none" }}>
              <span style={{ fontSize: "0.6rem", color: bloco.cor, fontWeight: 800, flexShrink: 0, width: 18, textAlign: "right" }}>{String(i + 1).padStart(2, "0")}</span>
              <div style={{ flex: 1 }}>
                <Checkbox
                  checked={!!progresso[`${bloco.id}_${i}`]}
                  onChange={() => toggleConcept(bloco.id, i)}
                  label={c.nome}
                  color={bloco.cor}
                  href={c.page}
                />
              </div>
              {c.yt && <YTBtn url={c.yt} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ progresso, onSelectBlock, stats, studySeconds, isTimerRunning, onTimerToggle, onTimerReset }: {
  progresso: Record<string, boolean>;
  onSelectBlock: (id: string) => void;
  stats: any;
  studySeconds: number;
  isTimerRunning: boolean;
  onTimerToggle: () => void;
  onTimerReset: () => void;
}) {
  let nextConcept: any = null;
  let nextBlock: any = null;

  for (let b of ALL) {
    const uncheckedIndex = b.conceitos.findIndex((_: any, idx: number) => !progresso[`${b.id}_${idx}`]);
    if (uncheckedIndex !== -1) {
      nextConcept = b.conceitos[uncheckedIndex];
      nextBlock = b;
      break;
    }
  }

  const radius = 42;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * stats.totalPercent) / 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

      {/* ── Stopwatch Card ── */}
      <StopwatchCard
        studySeconds={studySeconds}
        isTimerRunning={isTimerRunning}
        onToggle={onTimerToggle}
        onReset={onTimerReset}
      />

      {/* ── Radial progress + next topic ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.8rem" }}>

        {/* Card Anel de Progresso */}
        <div style={{ background: "#111120", border: "1px solid #1e1e35", borderRadius: 12, padding: "1.2rem", display: "flex", alignItems: "center", gap: "1.2rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 100, height: 100, borderRadius: "50%", background: "#6C63FF10", filter: "blur(20px)" }} />

          <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#1e1e35" strokeWidth={strokeWidth} />
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="url(#progressGrad)" strokeWidth={strokeWidth}
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C63FF" />
                  <stop offset="100%" stopColor="#00B4D8" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#f0f0ff", lineHeight: 1 }}>{stats.totalPercent}%</span>
              <span style={{ fontSize: "0.55rem", color: "#505080", textTransform: "uppercase", fontWeight: 700, marginTop: 2 }}>Geral</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "#e8e8f0" }}>Seu Progresso</h3>
            <p style={{ margin: "4px 0 10px 0", fontSize: "0.72rem", color: "#60608b" }}>Consolidação dos 14 blocos de Engenharia de Dados e Inteligência Artificial.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#e8e8f0" }}>{stats.totalCompleted} <span style={{ fontSize: "0.65rem", color: "#40407a", fontWeight: 400 }}>/ {stats.totalTotal}</span></div>
                <div style={{ fontSize: "0.6rem", color: "#505080", textTransform: "uppercase", fontWeight: 700 }}>Conceitos</div>
              </div>
              <div style={{ width: 1, background: "#1e1e35" }} />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#E9C46A" }}>
                  {Math.floor(studySeconds / 3600)}h{Math.floor((studySeconds % 3600) / 60)}m
                  <span style={{ fontSize: "0.65rem", color: "#40407a", fontWeight: 400 }}> registradas</span>
                </div>
                <div style={{ fontSize: "0.6rem", color: "#505080", textTransform: "uppercase", fontWeight: 700 }}>Horas Estudo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Próximo Tópico */}
        <div style={{ background: "#111120", border: "1px solid #1e1e35", borderRadius: 12, padding: "1.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          {nextConcept ? (
            <>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.58rem", fontWeight: 800, color: nextBlock.cor, textTransform: "uppercase", letterSpacing: "0.12em", background: nextBlock.cor + "18", padding: "2px 6px", borderRadius: 4 }}>
                    PRÓXIMO TÓPICO
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#40407a" }}>Bloco {nextBlock.id}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>{nextBlock.icon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "0.82rem", fontWeight: 800, color: "#e8e8f0", lineHeight: 1.3 }}>
                      {nextConcept.nome}
                    </h4>
                    <p style={{ margin: "3px 0 0 0", fontSize: "0.68rem", color: "#505080" }}>
                      Módulo: {nextBlock.titulo}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectBlock(nextBlock.id)}
                style={{
                  marginTop: 12, width: "100%",
                  background: `linear-gradient(135deg, ${nextBlock.cor} 0%, ${nextBlock.cor}dd 100%)`,
                  border: "none", borderRadius: 6, color: "#fff", padding: "0.45rem",
                  fontSize: "0.73rem", fontWeight: 800, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  boxShadow: `0 4px 12px ${nextBlock.cor}30`, transition: "all 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 15px ${nextBlock.cor}45`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 12px ${nextBlock.cor}30`; }}
              >
                🎯 Retomar Estudos (Bloco {nextBlock.id}) →
              </button>
            </>
          ) : (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0.5rem" }}>
              <span style={{ fontSize: "2rem", marginBottom: 6 }}>🏆</span>
              <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "#00F5D4" }}>Grade Concluída!</h4>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.68rem", color: "#505080" }}>Parabéns, você completou todos os conceitos do roadmap!</p>
            </div>
          )}
        </div>
      </div>

      {/* ── KPIs Secundários (Core e Staff) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
        {[
          { label: "Trilha Core", value: `${stats.coreCompleted} / ${stats.coreTotal}`, percent: stats.corePercent, sub: "Blocos 01 ao 10", cor: "#BD93F9", subtext: "Fundamentos & DE" },
          { label: "Trilha Staff", value: `${stats.staffCompleted} / ${stats.staffTotal}`, percent: stats.staffPercent, sub: "Blocos 11 ao 14", cor: "#FFB86C", subtext: "ML, GenAI & Arq." },
        ].map(k => (
          <div key={k.label} style={{ background: "#111120", border: `1px solid ${k.cor}25`, borderRadius: 10, padding: "0.8rem 1rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: "0.6rem", fontWeight: 800, color: k.cor, textTransform: "uppercase", letterSpacing: "0.08em" }}>{k.label}</span>
                <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#f0f0ff", marginTop: 2 }}>{k.value}</div>
              </div>
              <span style={{ fontSize: "0.9rem", fontWeight: 900, color: k.cor }}>{k.percent}%</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={k.percent} max={100} cor={k.cor} height={5} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.58rem", color: "#40407a", marginTop: 5 }}>
              <span>{k.sub}</span>
              <span>{k.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Progresso por Bloco (Checkpoints) ── */}
      <div style={{ background: "#111120", border: "1px solid #1e1e35", borderRadius: 12, padding: "1.1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.9rem" }}>
          <h3 style={{ margin: 0, fontSize: "0.68rem", fontWeight: 800, color: "#5050a0", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            📌 Checkpoints — Progresso por Bloco
          </h3>
          <span style={{ fontSize: "0.58rem", color: "#40407a" }}>Clique no bloco para focar</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ALL.map(b => {
            const bCompleted = b.conceitos.filter((_: any, idx: number) => progresso[`${b.id}_${idx}`]).length;
            const bTotal = b.conceitos.length;
            const bPercent = bTotal > 0 ? Math.round((bCompleted / bTotal) * 100) : 0;
            const isStaff = parseInt(b.id) >= 11;

            return (
              <button
                key={b.id}
                onClick={() => onSelectBlock(b.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  background: "transparent", border: "none", padding: "6px 8px",
                  borderRadius: 8, cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#ffffff06")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* ID + icon */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, width: 46 }}>
                  <span style={{ fontSize: "0.58rem", fontWeight: 800, color: bPercent === 100 ? "#00F5D4" : b.cor, width: 18, textAlign: "right" }}>{b.id}</span>
                  <span style={{ fontSize: "0.85rem" }}>{b.icon}</span>
                </div>

                {/* Title */}
                <span style={{ width: 150, fontSize: "0.7rem", color: bPercent === 100 ? "#606090" : "#a0a0c0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {b.titulo}
                </span>

                {/* Trail badge */}
                <span style={{ fontSize: "0.52rem", fontWeight: 800, padding: "1px 5px", borderRadius: 3, background: isStaff ? "#FF006E18" : "#6C63FF18", color: isStaff ? "#ff4d9e" : "#9988ff", flexShrink: 0 }}>
                  {isStaff ? "STAFF" : "CORE"}
                </span>

                {/* Progress bar */}
                <div style={{ flex: 1 }}>
                  <ProgressBar value={bPercent} max={100} cor={bPercent === 100 ? "#00F5D4" : b.cor} height={7} />
                </div>

                {/* Percent label */}
                <span style={{ width: 58, fontSize: "0.68rem", fontWeight: 700, color: bPercent === 100 ? "#00F5D4" : b.cor, textAlign: "right", flexShrink: 0 }}>
                  {bPercent === 100 ? "100% 🏆" : `${bCompleted}/${bTotal}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Resumo por Trilha ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.8rem" }}>
        {[
          { trilha: "Core", blocos: TRILHA_CORE, cor: "#BD93F9", textCor: "#9988ff" },
          { trilha: "Staff", blocos: TRILHA_STAFF, cor: "#FFB86C", textCor: "#ff4d9e" },
        ].map(({ trilha, blocos, cor, textCor }) => (
          <div key={trilha} style={{ background: "#111120", border: `1px solid ${cor}25`, borderRadius: 12, padding: "1rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, color: textCor, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Trilha {trilha}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {blocos.map((b: any) => {
                const bCompleted = b.conceitos.filter((_: any, idx: number) => progresso[`${b.id}_${idx}`]).length;
                const bTotal = b.conceitos.length;
                const bPercent = bTotal > 0 ? Math.round((bCompleted / bTotal) * 100) : 0;

                return (
                  <div key={b.id} onClick={() => onSelectBlock(b.id)}
                    style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "2px 4px", borderRadius: 4, transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#ffffff03")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: "0.72rem", flexShrink: 0 }}>{b.icon}</span>
                    <span style={{ flex: 1, fontSize: "0.68rem", color: bPercent === 100 ? "#8080a5" : "#a0a0c0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.titulo}</span>
                    <span style={{ fontSize: "0.63rem", fontWeight: 700, color: bPercent === 100 ? "#00F5D4" : b.cor, flexShrink: 0 }}>
                      {bPercent === 100 ? "100% 🏆" : `${bCompleted}/${bTotal}`}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #1a1a30", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.63rem", color: "#4040a0" }}>Total {trilha}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: textCor }}>
                {blocos.reduce((a: number, b: any) => a + b.conceitos.filter((_: any, idx: number) => progresso[`${b.id}_${idx}`]).length, 0)} / {blocos.reduce((a: number, b: any) => a + b.conceitos.length, 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MODO FOCO (ESTUDO NAVEGÁVEL) ─────────────────────────────────────────────
function ModoFoco({ blocoId, progresso, toggleConcept, setBlocoId }: {
  blocoId: string;
  progresso: Record<string, boolean>;
  toggleConcept: (blocoId: string, idx: number) => void;
  setBlocoId: (id: string) => void;
}) {
  const bloco = ALL.find(b => b.id === blocoId) || ALL[0];
  const currentIndex = ALL.findIndex(b => b.id === bloco.id);
  const prevBlock = currentIndex > 0 ? ALL[currentIndex - 1] : null;
  const nextBlock = currentIndex < ALL.length - 1 ? ALL[currentIndex + 1] : null;

  const completedLocal = bloco.conceitos.filter((_: any, idx: number) => progresso[`${bloco.id}_${idx}`]).length;
  const totalLocal = bloco.conceitos.length;
  const percentLocal = totalLocal > 0 ? Math.round((completedLocal / totalLocal) * 100) : 0;
  const isStaff = parseInt(bloco.id) >= 11;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Barra superior de Navegação e Seletor */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", background: "#111120", border: "1px solid #1e1e35", borderRadius: 10, padding: "0.6rem 0.9rem" }}>

        {/* Seletor Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#505080", textTransform: "uppercase" }}>Módulo:</span>
          <select
            value={bloco.id}
            onChange={e => setBlocoId(e.target.value)}
            style={{ background: "#0d0d14", border: "1px solid #2a2a40", borderRadius: 6, color: "#e8e8f0", padding: "0.3rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", outline: "none" }}
          >
            {ALL.map(b => (
              <option key={b.id} value={b.id} style={{ background: "#0d0d14", color: "#e8e8f0" }}>
                {b.id} - {b.icon} {b.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Botões Avançar/Voltar */}
        <div style={{ display: "flex", gap: 6 }}>
          <button disabled={!prevBlock} onClick={() => prevBlock && setBlocoId(prevBlock.id)}
            style={{ padding: "0.35rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: prevBlock ? "#1e1e35" : "#0d0d14", color: prevBlock ? "#e0e0f0" : "#303050", border: "1px solid", borderColor: prevBlock ? "#2a2a40" : "#141424", borderRadius: 6, cursor: prevBlock ? "pointer" : "default", transition: "all 0.15s" }}>
            ← Voltar
          </button>
          <button disabled={!nextBlock} onClick={() => nextBlock && setBlocoId(nextBlock.id)}
            style={{ padding: "0.35rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: nextBlock ? "#6C63FF" : "#0d0d14", color: nextBlock ? "#fff" : "#303050", border: "1px solid", borderColor: nextBlock ? "#6C63FF" : "#141424", borderRadius: 6, cursor: nextBlock ? "pointer" : "default", transition: "all 0.15s", boxShadow: nextBlock ? "0 2px 8px #6C63FF30" : "none" }}>
            Avançar →
          </button>
        </div>
      </div>

      {/* Conteúdo Principal do Bloco */}
      <div style={{ border: "1px solid", borderColor: bloco.cor + "55", borderRadius: 12, overflow: "hidden", background: "#0c0c16", boxShadow: `0 0 30px ${bloco.cor}10` }}>

        {/* Banner do Bloco */}
        <div style={{ background: `linear-gradient(135deg, ${bloco.cor}18 0%, ${bloco.cor}03 100%)`, borderBottom: `1px solid ${bloco.cor}25`, padding: "1.2rem 1.4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 44, height: 44, borderRadius: 10, background: bloco.cor + "20", border: `1px solid ${bloco.cor}45`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", color: bloco.cor }}>
              {bloco.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.6rem", fontWeight: 800, color: bloco.cor, letterSpacing: "0.18em" }}>BLOCO {bloco.id}</span>
                <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: isStaff ? "#FF006E20" : "#6C63FF20", color: isStaff ? "#ff4d9e" : "#9988ff" }}>
                  Trilha {bloco.trilha}
                </span>
              </div>
              <h2 style={{ margin: "3px 0 0 0", fontWeight: 800, fontSize: "1.15rem", color: "#f0f0ff", lineHeight: 1.3 }}>{bloco.titulo}</h2>
            </div>
          </div>

          {/* Barra de Progresso Local */}
          <div style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.68rem", marginBottom: 5 }}>
              <span style={{ color: "#60608b" }}>Progresso do Bloco: <strong style={{ color: bloco.cor }}>{completedLocal} de {totalLocal} conceitos</strong></span>
              <span style={{ fontWeight: 800, color: percentLocal === 100 ? "#00F5D4" : bloco.cor }}>
                {percentLocal}% {percentLocal === 100 ? "🏆 Concluído!" : ""}
              </span>
            </div>
            <ProgressBar value={completedLocal} max={totalLocal} cor={percentLocal === 100 ? "#00F5D4" : bloco.cor} height={8} />
          </div>
        </div>

        {/* Mensagem de Celebração */}
        {percentLocal === 100 && (
          <div style={{ background: "#00f5d40a", borderBottom: "1px solid #00f5d420", padding: "0.8rem 1.4rem", display: "flex", alignItems: "center", gap: 10, color: "#00f5d4" }}>
            <span style={{ fontSize: "1.3rem" }}>🏆</span>
            <div style={{ fontSize: "0.78rem" }}>
              <strong style={{ fontWeight: 800 }}>Excelente trabalho!</strong> Você completou todos os conceitos do bloco <strong>{bloco.titulo}</strong>.{" "}
              {nextBlock ? `Pronto para seguir para o Bloco ${nextBlock.id}?` : "Você finalizou todas as trilhas!"}
            </div>
            {nextBlock && (
              <button onClick={() => setBlocoId(nextBlock.id)}
                style={{ marginLeft: "auto", background: "#00F5D418", border: "1px solid #00F5D440", borderRadius: 5, color: "#00F5D4", fontSize: "0.65rem", fontWeight: 800, padding: "4px 10px", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#00F5D428")}
                onMouseLeave={e => (e.currentTarget.style.background = "#00F5D418")}
              >
                Próximo Bloco →
              </button>
            )}
          </div>
        )}

        {/* Lista de Subtópicos com Checkbox */}
        <div style={{ background: "#080810" }}>
          {bloco.conceitos.map((c: any, i: number) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "0.7rem 1.4rem",
              borderBottom: i < bloco.conceitos.length - 1 ? "1px solid #101024" : "none",
              background: progresso[`${bloco.id}_${i}`] ? "#00f5d402" : "transparent",
              transition: "background 0.2s"
            }}>
              <span style={{ fontSize: "0.65rem", color: progresso[`${bloco.id}_${i}`] ? "#303055" : bloco.cor, fontWeight: 800, width: 20, textAlign: "right" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1 }}>
                <Checkbox
                  checked={!!progresso[`${bloco.id}_${i}`]}
                  onChange={() => toggleConcept(bloco.id, i)}
                  label={c.nome}
                  color={bloco.cor}
                  href={c.page}
                />
              </div>
              {c.yt && <YTBtn url={c.yt} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BUSCA ────────────────────────────────────────────────────────────────────
function Busca({ progresso, toggleConcept }: {
  progresso: Record<string, boolean>;
  toggleConcept: (blocoId: string, idx: number) => void;
}) {
  const [q, setQ] = useState("");
  const results = q.length < 2 ? [] : ALL.flatMap(b =>
    b.conceitos
      .map((c: any, index: number) => ({ ...c, bloco: b, index }))
      .filter((item: any) => item.nome.toLowerCase().includes(q.toLowerCase()) || item.bloco.titulo.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4040a0", fontSize: "1rem" }}>⌕</span>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="Buscar: Kafka, dbt, LGPD, Raft, LoRA, SHAP, XGBoost..."
          style={{ width: "100%", background: "#111120", border: "1px solid #2a2a40", borderRadius: 8, padding: "0.65rem 2rem 0.65rem 2.2rem", color: "#e0e0f0", fontSize: "0.83rem", outline: "none", boxSizing: "border-box" }}
        />
        {q && <button onClick={() => setQ("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5050a0", cursor: "pointer", fontSize: "1rem" }}>✕</button>}
      </div>

      {q.length >= 2 && (
        <div style={{ marginBottom: "0.6rem", fontSize: "0.7rem", color: "#5050a0" }}>
          {results.length} resultado{results.length !== 1 ? "s" : ""} para "<span style={{ color: "#9988ff" }}>{q}</span>"
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {results.map((r: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.6rem 0.85rem", background: "#111120", border: `1px solid ${r.bloco.cor}30`, borderRadius: 8 }}>
            <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>{r.bloco.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: r.bloco.cor, marginBottom: 2 }}>Bloco {r.bloco.id} — {r.bloco.titulo}</div>
              <Checkbox
                checked={!!progresso[`${r.bloco.id}_${r.index}`]}
                onChange={() => toggleConcept(r.bloco.id, r.index)}
                label={r.nome}
                color={r.bloco.cor}
                href={r.page}
              />
            </div>
            {r.yt && <YTBtn url={r.yt} />}
          </div>
        ))}
        {q.length >= 2 && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", fontSize: "0.82rem", color: "#4040a0" }}>
            Nenhum tópico encontrado para "<span style={{ color: "#6C63FF" }}>{q}</span>"
          </div>
        )}
        {q.length < 2 && (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>⌕</div>
            <div style={{ fontSize: "0.82rem", color: "#4040a0", marginBottom: 6 }}>Digite pelo menos 2 caracteres para buscar entre {TOTAL_CONCEITOS} tópicos</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              {["Kafka", "Spark", "dbt", "LoRA", "LGPD", "SHAP", "Raft", "RAG", "XGBoost", "Iceberg"].map(s => (
                <button key={s} onClick={() => setQ(s)} style={{ padding: "3px 10px", background: "#6C63FF18", border: "1px solid #6C63FF30", borderRadius: 5, color: "#9988ff", fontSize: "0.7rem", cursor: "pointer" }}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos adicionais injetados
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  @keyframes timerPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .pulse-hover:hover {
    animation: pulse 0.8s ease infinite;
  }
  .timer-running {
    animation: timerPulse 1s ease infinite;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0d0d14;
  }
  ::-webkit-scrollbar-thumb {
    background: #1e1e35;
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6C63FF88;
  }
`;

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("dashboard");
  const [blocoFocoId, setBlocoFocoId] = useState("01");
  const [progresso, setProgresso] = useState<Record<string, boolean>>({});
  const [blockChecks, setBlockChecks] = useState<Record<string, boolean>>({});
  const [studySeconds, setStudySeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Helper API Functions ──
  const API_URL = "http://localhost:3001/api/progress";

  const saveToAPI = (key: string, value: any) => {
    fetch(`${API_URL}/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    }).catch(e => console.error("Erro ao salvar no backend", e));
  };

  // ── Load all saved data from Backend ──
  useEffect(() => {
    const loadData = async () => {
      try {
        const resProg = await fetch(`${API_URL}/de_ai_roadmap_progress`);
        const dataProg = await resProg.json();
        if (dataProg.value) setProgresso(JSON.parse(dataProg.value));

        const resBlocks = await fetch(`${API_URL}/de_ai_roadmap_blocks`);
        const dataBlocks = await resBlocks.json();
        if (dataBlocks.value) setBlockChecks(JSON.parse(dataBlocks.value));

        const resTimer = await fetch(`${API_URL}/de_ai_roadmap_timer`);
        const dataTimer = await resTimer.json();
        if (dataTimer.value) setStudySeconds(parseInt(dataTimer.value, 10) || 0);
      } catch (e) {
        console.error("Erro ao carregar dados do Backend SQLite:", e);
      }
    };
    loadData();
  }, []);

  // ── Timer tick ──
  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setStudySeconds(prev => {
          const next = prev + 1;
          saveToAPI("de_ai_roadmap_timer", String(next));
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isTimerRunning]);

  // ── Save timer on page unload ──
  useEffect(() => {
    const handleUnload = () => {
      setIsTimerRunning(false);
      saveToAPI("de_ai_roadmap_timer", String(studySeconds));
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [studySeconds]);

  // ── Toggle concept checkbox ──
  const toggleConcept = (blocoId: string, index: number) => {
    const key = `${blocoId}_${index}`;
    setProgresso(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      saveToAPI("de_ai_roadmap_progress", JSON.stringify(updated));
      return updated;
    });
  };

  // ── Toggle block-level checkbox ──
  const toggleBlock = (blocoId: string) => {
    setBlockChecks(prev => {
      const updated = { ...prev, [blocoId]: !prev[blocoId] };
      saveToAPI("de_ai_roadmap_blocks", JSON.stringify(updated));
      return updated;
    });
  };

  // ── Timer controls ──
  const handleTimerToggle = () => setIsTimerRunning(r => !r);
  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setStudySeconds(0);
    saveToAPI("de_ai_roadmap_timer", "0");
  };

  // ── Stats ──
  const getStats = () => {
    let coreCompleted = 0, coreTotal = 0, staffCompleted = 0, staffTotal = 0;
    TRILHA_CORE.forEach(b => {
      b.conceitos.forEach((_: any, idx: number) => {
        coreTotal++;
        if (progresso[`${b.id}_${idx}`]) coreCompleted++;
      });
    });
    TRILHA_STAFF.forEach(b => {
      b.conceitos.forEach((_: any, idx: number) => {
        staffTotal++;
        if (progresso[`${b.id}_${idx}`]) staffCompleted++;
      });
    });
    const totalTotal = coreTotal + staffTotal;
    const totalCompleted = coreCompleted + staffCompleted;
    return {
      coreTotal, coreCompleted, corePercent: coreTotal > 0 ? Math.round((coreCompleted / coreTotal) * 100) : 0,
      staffTotal, staffCompleted, staffPercent: staffTotal > 0 ? Math.round((staffCompleted / staffTotal) * 100) : 0,
      totalTotal, totalCompleted, totalPercent: totalTotal > 0 ? Math.round((totalCompleted / totalTotal) * 100) : 0
    };
  };

  const stats = getStats();

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d14", color: "#e8e8f0", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #0d0d14 0%, #1a1a2e 60%, #16213e 100%)", borderBottom: "1px solid #1e1e35", padding: "1.2rem 1.25rem 1rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                {[
                  { label: "Grade Revisada", cor: "#BD93F9" },
                  { label: "14 Blocos", cor: "#8BE9FD" },
                  { label: "▶ YouTube Links", cor: "#BD93F9" },
                  { label: "ML + GenAI + DE", cor: "#FFB86C" },
                ].map(t => (
                  <span key={t.label} style={{ fontSize: "0.57rem", fontWeight: 800, letterSpacing: "0.12em", color: t.cor, textTransform: "uppercase", background: t.cor + "18", padding: "2px 7px", borderRadius: 4 }}>{t.label}</span>
                ))}
              </div>
              <h1 style={{ margin: "0 0 0.2rem", fontSize: "clamp(1.05rem, 3vw, 1.5rem)", fontWeight: 800, color: "#f0f0ff" }}>
                Engenharia de Dados e Plataformas de IA
              </h1>
              <p style={{ margin: 0, fontSize: "0.73rem", color: "#4a4a6a" }}>
                {TOTAL_SUB} subtópicos · {TOTAL_CONCEITOS} links de estudo · Core (01–10) + Staff (11–14) · <strong style={{ color: "#00F5D4" }}>{stats.totalPercent}% Concluído</strong>
              </p>
            </div>

            {/* Timer mini display in header */}
            <div
              onClick={handleTimerToggle}
              style={{
                display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
                background: isTimerRunning ? "#00F5D412" : "#ffffff08",
                border: `1px solid ${isTimerRunning ? "#00F5D430" : "#1e1e35"}`,
                borderRadius: 8, padding: "0.4rem 0.8rem",
                transition: "all 0.3s ease",
              }}
              title={isTimerRunning ? "Clique para pausar" : "Clique para iniciar"}
            >
              <span style={{ fontSize: "0.85rem" }}>{isTimerRunning ? "⏱" : "⏰"}</span>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.82rem", fontWeight: 800,
                color: isTimerRunning ? "#00F5D4" : "#606080",
                letterSpacing: "0.05em"
              }}>
                {formatTime(studySeconds)}
              </span>
              <span style={{ fontSize: "0.55rem", color: isTimerRunning ? "#00F5D480" : "#404060", fontWeight: 700 }}>
                {isTimerRunning ? "PAUSAR" : "INICIAR"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <div style={{ background: "#0f0f1c", borderBottom: "1px solid #1a1a30", padding: "0.45rem 1.25rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", gap: 5, flexWrap: "wrap" }}>
          {VIEWS.map(v => (
            <button key={v.k} onClick={() => setView(v.k)} style={{ padding: "0.27rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: view === v.k ? "#6C63FF" : "transparent", color: view === v.k ? "#fff" : "#505080", border: "1px solid", borderColor: view === v.k ? "#6C63FF" : "#1e1e35", borderRadius: 6, cursor: "pointer", transition: "all 0.15s" }}>
              {v.label}
            </button>
          ))}
          <a href="/pages/hackerrank-clone.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: "0.27rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: "transparent", color: "#50FA7B", border: "1px solid #50FA7B", borderRadius: 6, cursor: "pointer", transition: "all 0.15s", marginLeft: 'auto' }}>
            💻 Python Lab (HackerRank)
          </a>
          <a href="/LogicLab/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: "0.27rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: "transparent", color: "#BD93F9", border: "1px solid #BD93F9", borderRadius: 6, cursor: "pointer", transition: "all 0.15s", marginLeft: '10px' }}>
            🧪 LogicLab (Laboratório de Lógica)
          </a>
          <a href="/SimbolosMatematicos/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: "0.27rem 0.8rem", fontSize: "0.73rem", fontWeight: 700, background: "transparent", color: "#00E5FF", border: "1px solid #00E5FF", borderRadius: 6, cursor: "pointer", transition: "all 0.15s", marginLeft: '10px' }}>
            📐 Símbolos Matemáticos
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "1.1rem 1rem 3rem" }}>

        {view === "dashboard" && (
          <Dashboard
            progresso={progresso}
            onSelectBlock={(id) => { setBlocoFocoId(id); setView("foco"); }}
            stats={stats}
            studySeconds={studySeconds}
            isTimerRunning={isTimerRunning}
            onTimerToggle={handleTimerToggle}
            onTimerReset={handleTimerReset}
          />
        )}

        {view === "core" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "0.65rem 0.9rem", background: "#6C63FF10", border: "1px solid #6C63FF28", borderRadius: 8, marginBottom: 2 }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9988ff" }}>Trilha Core</span>
              <span style={{ fontSize: "0.68rem", color: "#4a4a6a", marginLeft: 8 }}>Blocos 01–10 · {TRILHA_CORE.reduce((a, b) => a + b.subtopicos, 0)} subtópicos · Engenheiro Pleno / Sênior</span>
            </div>
            {TRILHA_CORE.map((b, i) => (
              <BlocoCard
                key={i}
                bloco={b}
                progresso={progresso}
                toggleConcept={toggleConcept}
                onSelectBlock={(id) => { setBlocoFocoId(id); setView("foco"); }}
                blockChecks={blockChecks}
                toggleBlock={toggleBlock}
              />
            ))}
          </div>
        )}

        {view === "staff" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "0.65rem 0.9rem", background: "#FF006E10", border: "1px solid #FF006E28", borderRadius: 8, marginBottom: 2 }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff4d9e" }}>Trilha Staff / Advanced</span>
              <span style={{ fontSize: "0.68rem", color: "#4a4a6a", marginLeft: 8 }}>Blocos 11–14 · {TRILHA_STAFF.reduce((a, b) => a + b.subtopicos, 0)} subtópicos · Pré-req: Trilha Core completa</span>
            </div>
            {TRILHA_STAFF.map((b, i) => (
              <BlocoCard
                key={i}
                bloco={b}
                progresso={progresso}
                toggleConcept={toggleConcept}
                onSelectBlock={(id) => { setBlocoFocoId(id); setView("foco"); }}
                blockChecks={blockChecks}
                toggleBlock={toggleBlock}
              />
            ))}
          </div>
        )}

        {view === "foco" && (
          <ModoFoco
            blocoId={blocoFocoId}
            progresso={progresso}
            toggleConcept={toggleConcept}
            setBlocoId={setBlocoFocoId}
          />
        )}

        {view === "busca" && (
          <Busca
            progresso={progresso}
            toggleConcept={toggleConcept}
          />
        )}
      </div>
    </div>
  );
}
