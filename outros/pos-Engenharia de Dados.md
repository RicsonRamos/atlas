Perfeito. Vamos estruturar como um Projeto Pedagógico de Curso (PPC) de uma pós-graduação em Engenharia de Dados de alto nível, mantendo as disciplinas oficiais da Anhanguera e complementando com conteúdos exigidos pelo mercado.
PARTE I
Pós-Graduação em Engenharia de Dados
Módulo I – Fundamentos da Engenharia de Dados (200h)

Disciplina 1
Modelagem e Arquitetura de Data Warehouse
Carga Horária: 40 horas
Ementa
Fundamentos da Engenharia de Dados. Evolução dos sistemas de informação para plataformas analíticas. Conceitos de Business Intelligence (BI), Data Warehouse (DW), Data Mart e Operational Data Store (ODS). Arquiteturas Inmon, Kimball e Data Vault. Modelagem dimensional. Esquemas estrela (Star Schema) e floco de neve (Snowflake Schema). Tabelas fato e dimensão. Dimensões lentamente mutáveis (SCD). ETL aplicado ao Data Warehouse. Data Quality. Metadados. Governança aplicada ao ambiente analítico. Arquiteturas modernas de Data Lake e Lakehouse. Introdução ao Delta Lake, Apache Iceberg e Apache Hudi.

Objetivos
Ao final da disciplina o estudante deverá ser capaz de:
compreender a evolução dos ambientes analíticos;
projetar Data Warehouses corporativos;
elaborar modelos dimensionais;
identificar a melhor arquitetura conforme o cenário empresarial;
aplicar técnicas modernas de modelagem de dados.

Competências
Modelagem Dimensional
Arquitetura Corporativa de Dados
Engenharia Analítica
Modelagem Empresarial
Governança Analítica

Habilidades
O aluno será capaz de
construir Star Schema;
construir Snowflake Schema;
identificar tabelas fato;
modelar dimensões;
implementar Slowly Changing Dimensions;
projetar Data Marts;
construir arquitetura Lakehouse.

Conteúdo Programático
Unidade I
Introdução
Engenharia de Dados
Business Intelligence
Business Analytics
Data Warehouse
Data Lake
Lakehouse
Data Mesh

Unidade II
Arquiteturas
Arquitetura Inmon
Arquitetura Kimball
Arquitetura Data Vault
Arquitetura Lambda
Arquitetura Kappa

Unidade III
Modelagem Dimensional
Star Schema
Snowflake
Galaxy Schema
Fatos
Dimensões
Chaves Surrogates
Slowly Changing Dimensions
Junk Dimension
Degenerate Dimension

Unidade IV
Projeto
Modelagem Corporativa
Modelagem Incremental
Performance
Particionamento
Compressão
Indexação
Metadados

Unidade V
Arquiteturas Modernas
Delta Lake
Apache Iceberg
Apache Hudi
Medallion Architecture
Bronze Layer
Silver Layer
Gold Layer

Laboratórios
Projeto de um Data Warehouse para uma empresa de varejo.
Construção do modelo dimensional.
Criação do esquema estrela.
Carga incremental.
Validação dos dados.

Ferramentas
PostgreSQL
SQL Server
Oracle
MySQL
Power BI
Pentaho
Talend
Apache Spark
Delta Lake

Avaliação
Projeto prático (40%)
Exercícios (20%)
Estudo de caso (20%)
Avaliação teórica (20%)

Bibliografia Básica
Kimball, Ralph; Ross, Margy.
The Data Warehouse Toolkit.
3ª edição.
Inmon, William H.
Building the Data Warehouse.
Silberschatz, Abraham.
Database System Concepts.

Bibliografia Complementar
Golfarelli, Matteo.
Data Warehouse Design.
Harrington, Jan.
Relational Database Design.
Kleppmann, Martin.
Designing Data-Intensive Applications.
Date, C. J.
An Introduction to Database Systems.

Disciplina 2
Banco de Dados Relacional
Carga Horária: 40 horas
Ementa
Modelagem relacional. Álgebra relacional. Normalização. SQL ANSI. Integridade referencial. Índices. Views. Procedures. Triggers. Transações ACID. Controle de concorrência. Locks. MVCC. Otimização de consultas. Bancos OLTP e OLAP. Replicação. Backup. Alta disponibilidade.

Objetivos
Capacitar o aluno para
projetar bancos relacionais;
desenvolver consultas SQL avançadas;
otimizar consultas;
administrar ambientes corporativos.

Competências
SQL Avançado
Modelagem Relacional
Administração de Dados
Performance

Conteúdo Programático
Unidade I
Introdução aos Bancos Relacionais
Modelo entidade relacionamento
Modelo relacional
Chaves
Normalização

Unidade II
SQL
SELECT
JOIN
GROUP BY
WINDOW FUNCTIONS
CTE
Subqueries
Views
Stored Procedures
Functions
Triggers

Unidade III
Performance
Execution Plan
Indexes
Clustered Index
Bitmap Index
Hash Index
Materialized Views
Partitioning

Unidade IV
Transações
ACID
MVCC
Deadlock
Lock
Rollback
Commit
Isolation Levels

Unidade V
Alta Disponibilidade
Replication
Sharding
Backup
Recovery
Failover
Disaster Recovery

Laboratórios
Modelagem de banco corporativo.
Otimização de consultas SQL.
Criação de Procedures.
Implementação de índices.

Ferramentas
PostgreSQL
MySQL
Oracle
SQL Server
MariaDB

Bibliografia Básica
Silberschatz.
Database System Concepts.
Elmasri & Navathe.
Fundamentals of Database Systems.
Date.
Database Systems.

Bibliografia Complementar
Joe Celko.
SQL for Smarties.
Itzik Ben-Gan.
T-SQL Querying.
Markus Winand.
SQL Performance Explained.

Disciplina 3
Administração de Banco de Dados (DBA)
Carga Horária: 40 horas
Ementa
Arquitetura de SGBDs. Instalação e configuração de bancos de dados. Administração de usuários, permissões e papéis. Gerenciamento de armazenamento, tablespaces e arquivos de dados. Backup e recuperação. Monitoramento de desempenho. Alta disponibilidade, replicação, clusterização e disaster recovery. Segurança, auditoria e conformidade. Automação de tarefas administrativas.
Objetivos
Administrar ambientes de banco de dados corporativos.
Garantir disponibilidade, desempenho e segurança dos dados.
Planejar estratégias de backup e recuperação.
Implementar boas práticas de administração de SGBDs.
Competências
Administração de SGBDs.
Gestão de segurança em bancos de dados.
Planejamento de continuidade de serviços.
Monitoramento e otimização de desempenho.
Conteúdo Programático
Unidade I – Arquitetura de SGBDs
Componentes internos.
Processos e memória.
Armazenamento físico e lógico.
Tablespaces e datafiles.
Unidade II – Administração
Instalação e configuração.
Usuários e privilégios.
Papéis (roles).
Auditoria.
Criptografia.
Unidade III – Backup e Recuperação
Backup completo, incremental e diferencial.
Point-in-Time Recovery.
Logs de transação.
Estratégias de recuperação.
Unidade IV – Alta Disponibilidade
Replicação síncrona e assíncrona.
Clusterização.
Failover.
Balanceamento de carga.
Unidade V – Monitoramento
Métricas de desempenho.
Identificação de gargalos.
Automação com scripts.
Ferramentas de monitoramento.
Laboratórios
Instalação de PostgreSQL e MySQL.
Configuração de usuários e permissões.
Execução de backups e restauração.
Configuração de replicação.
Simulação de recuperação de desastres.
Ferramentas
PostgreSQL
MySQL
Oracle Database
Microsoft SQL Server
pgAdmin
Oracle Enterprise Manager
Bibliografia Básica
SILBERSCHATZ, Abraham; KORTH, Henry F.; SUDARSHAN, S. Database System Concepts.
ELMASRI, Ramez; NAVATHE, Shamkant. Fundamentals of Database Systems.
THOMAS, Darl Kuhn et al. PostgreSQL: Up and Running.
Bibliografia Complementar
KLEPPMANN, Martin. Designing Data-Intensive Applications.
DATE, C. J. An Introduction to Database Systems.
Documentação oficial do PostgreSQL e do MySQL.

PARTE II – Governança de Dados, Big Data e Bancos NoSQL (120h)
Esta parte aprofunda os fundamentos necessários para ambientes corporativos modernos de dados, com foco em governança, processamento distribuído e bancos de dados não relacionais.

Disciplina 4
Governança de Dados
Carga Horária: 40 horas
Ementa
Fundamentos da Governança de Dados. Estratégia de dados organizacionais. Estruturas de governança. Papéis e responsabilidades (Data Owner, Data Steward, Data Custodian). Frameworks DAMA-DMBOK, COBIT e TOGAF. Gestão da qualidade dos dados. Dados mestres (Master Data Management – MDM). Catálogo de dados. Metadados. Linhagem (Data Lineage). Segurança da informação. Privacidade de dados. LGPD aplicada à engenharia de dados. Políticas de retenção, classificação e descarte de dados. Indicadores de maturidade em governança. Governança em ambientes de Data Lake e Lakehouse.

Objetivos
Ao final da disciplina o estudante deverá ser capaz de:
estruturar um programa de governança de dados;
definir papéis e responsabilidades na gestão de dados;
aplicar práticas de qualidade e conformidade;
implementar políticas de segurança e privacidade;
utilizar frameworks de governança em ambientes corporativos.

Competências
Governança de Dados.
Gestão da Qualidade dos Dados.
Gestão de Metadados.
Conformidade Regulatória.
Segurança da Informação aplicada a Dados.

Habilidades
O aluno será capaz de:
criar políticas de governança;
definir indicadores de qualidade;
implementar catálogos de dados;
elaborar políticas de acesso;
mapear linhagem de dados;
aplicar requisitos da LGPD.

Conteúdo Programático
Unidade I – Introdução
Conceitos de Governança de Dados.
Valor estratégico dos dados.
Governança x Gestão de Dados.
Cultura Data Driven.

Unidade II – Frameworks
DAMA-DMBOK.
COBIT.
TOGAF.
ISO 27001.
ISO 8000.
CMMI Data Management.

Unidade III – Qualidade dos Dados
Data Profiling.
Data Cleansing.
Data Quality.
Data Observability.
Métricas de qualidade.

Unidade IV – Metadados
Catálogo de Dados.
Data Lineage.
Data Dictionary.
Glossário Corporativo.
Metadata Management.

Unidade V – LGPD e Segurança
Bases legais.
Dados pessoais.
Anonimização.
Pseudonimização.
Criptografia.
Controle de acesso.
Auditoria.

Laboratórios
Construção de Catálogo de Dados.
Implementação de políticas de governança.
Modelagem de papéis organizacionais.
Mapeamento de Data Lineage.
Classificação de dados sensíveis conforme a LGPD.

Ferramentas
Microsoft Purview.
Apache Atlas.
Collibra.
Alation.
OpenMetadata.
DataHub.

Avaliação
Projeto de Governança (40%).
Exercícios práticos (20%).
Estudos de caso (20%).
Avaliação teórica (20%).

Bibliografia Básica
DAMA International. DAMA-DMBOK: Data Management Body of Knowledge.
Ladley, John. Data Governance.
Loshin, David. Master Data Management.

Bibliografia Complementar
Khatri, Vijay; Brown, Carol. Designing Data Governance.
Kimball, Ralph. The Data Warehouse Toolkit.
Kleppmann, Martin. Designing Data-Intensive Applications.

Disciplina 5
Interações entre Big Data e Cloud Computing
Carga Horária: 40 horas
Ementa
Fundamentos de Big Data. Características dos 5Vs. Computação em nuvem. Modelos IaaS, PaaS e SaaS. Arquiteturas distribuídas. Hadoop Ecosystem. Apache Spark. Processamento batch e streaming. Data Lakes. Armazenamento distribuído. Serviços gerenciados para engenharia de dados em AWS, Azure e Google Cloud. Escalabilidade, elasticidade, tolerância a falhas e otimização de custos.

Objetivos
compreender arquiteturas modernas de Big Data;
projetar soluções escaláveis em nuvem;
utilizar processamento distribuído;
selecionar serviços adequados para pipelines de dados.

Competências
Big Data.
Computação em Nuvem.
Arquiteturas Distribuídas.
Engenharia de Dados em Cloud.

Habilidades
O estudante será capaz de:
identificar arquiteturas Big Data;
utilizar processamento paralelo;
implementar pipelines em nuvem;
comparar soluções AWS, Azure e GCP;
otimizar custos operacionais.

Conteúdo Programático
Unidade I – Fundamentos
Big Data.
Os 5Vs.
Data Lake.
Lakehouse.
Processamento Distribuído.

Unidade II – Hadoop
HDFS.
YARN.
MapReduce.
Hive.
Pig.
HBase.
Sqoop.

Unidade III – Apache Spark
Spark Core.
Spark SQL.
DataFrames.
Spark Streaming.
MLlib.
GraphX.

Unidade IV – Cloud Computing
IaaS.
PaaS.
SaaS.
Containers.
Kubernetes.
Serverless.

Unidade V – Engenharia de Dados em Cloud
AWS
S3.
Glue.
Athena.
EMR.
Redshift.
Lake Formation.
Azure
Azure Data Factory.
Synapse Analytics.
Azure Databricks.
Blob Storage.
Google Cloud
BigQuery.
Dataflow.
Dataproc.
Cloud Storage.
Pub/Sub.

Laboratórios
Criação de Data Lake.
Processamento distribuído com Spark.
Execução de consultas analíticas.
Integração entre serviços cloud.
Comparação de desempenho entre plataformas.

Ferramentas
Apache Hadoop.
Apache Spark.
Databricks.
AWS.
Azure.
Google Cloud Platform.
Docker.

Avaliação
Projeto prático (40%).
Laboratórios (30%).
Estudos dirigidos (10%).
Avaliação teórica (20%).

Bibliografia Básica
White, Tom. Hadoop: The Definitive Guide.
Karau, Holden. Learning Spark.
Kleppmann, Martin. Designing Data-Intensive Applications.

Bibliografia Complementar
Chambers, Bill. Spark: The Definitive Guide.
Dean Wampler. Programming Spark.
Marz, Nathan. Big Data.

Disciplina 6
Bancos de Dados Não Relacionais (NoSQL)
Carga Horária: 40 horas
Ementa
Fundamentos dos bancos de dados NoSQL. Teorema CAP. Consistência eventual. Modelos chave-valor, documentos, colunar e grafos. MongoDB, Cassandra, Redis, Neo4j e Elasticsearch. Modelagem de dados NoSQL. Replicação. Particionamento. Escalabilidade horizontal. Casos de uso em aplicações distribuídas. Integração entre bancos relacionais e NoSQL.

Objetivos
Ao final da disciplina o estudante deverá:
compreender os diferentes modelos NoSQL;
selecionar a tecnologia adequada para cada cenário;
modelar bancos de dados distribuídos;
implementar soluções escaláveis.

Competências
Bancos NoSQL.
Arquiteturas Distribuídas.
Modelagem Não Relacional.
Escalabilidade.

Habilidades
O aluno será capaz de:
modelar documentos;
criar coleções;
configurar replicação;
implementar sharding;
desenvolver consultas em MongoDB;
administrar bancos distribuídos.

Conteúdo Programático
Unidade I – Introdução
Evolução dos bancos NoSQL.
CAP Theorem.
BASE.
Consistência Eventual.

Unidade II – Banco de Documentos
MongoDB.
BSON.
Collections.
Aggregation Framework.
Indexação.

Unidade III – Banco Colunar
Cassandra.
Column Families.
Replicação.
Particionamento.
Consistência.

Unidade IV – Chave-Valor
Redis.
Memcached.
Cache distribuído.
Persistência.

Unidade V – Grafos e Busca
Neo4j.
Cypher.
Elasticsearch.
OpenSearch.
Casos de uso.

Laboratórios
Instalação do MongoDB.
Modelagem de documentos.
Criação de índices.
Configuração de replicação.
Cluster Cassandra.
Consultas em Neo4j.
Implementação de cache com Redis.

Ferramentas
MongoDB.
Cassandra.
Redis.
Neo4j.
Elasticsearch.
Docker.
MongoDB Compass.

Avaliação
Projeto prático (40%).
Laboratórios (30%).
Exercícios (10%).
Avaliação teórica (20%).

Bibliografia Básica
Sadalage, Pramod J.; Fowler, Martin. NoSQL Distilled.
Chodorow, Kristina. MongoDB: The Definitive Guide.
Kleppmann, Martin. Designing Data-Intensive Applications.

Bibliografia Complementar
Hewitt, Eben. Cassandra: The Definitive Guide.
Robinson, Ian; Webber, Jim; Eifrem, Emil. Graph Databases.
Redmond, Eric; Wilson, Jim R. Seven Databases in Seven Weeks.

Competências consolidadas ao final da Parte II
Ao concluir este módulo, o estudante estará apto a:
Projetar programas de Governança de Dados baseados no DAMA-DMBOK.
Implementar controles de qualidade, catálogo e linhagem de dados.
Desenvolver arquiteturas de Big Data em ambientes distribuídos.
Utilizar serviços de dados em AWS, Azure e Google Cloud.
Modelar e administrar bancos NoSQL para diferentes padrões de uso.
Selecionar tecnologias adequadas para aplicações analíticas e transacionais de alta escala.
Na Parte III, serão desenvolvidas as disciplinas Machine Learning, Projeto em Ciência de Dados com Soluções para Processamento Paralelo e Distribuído de Dados e Gerenciamento do Desempenho do Banco de Dados (Tuning), incluindo projetos práticos, otimização de consultas, fundamentos de IA aplicada e processamento distribuído com Spark.

PARTE III – Machine Learning, Projeto Integrador e Performance (120h)
Nesta etapa final do núcleo técnico, o foco é conectar engenharia de dados com ciência de dados aplicada, otimização de sistemas e entrega de soluções reais em escala.

Disciplina 7
Machine Learning
Carga Horária: 40 horas
Ementa
Fundamentos de Machine Learning. Tipos de aprendizado: supervisionado, não supervisionado e por reforço. Pipeline de dados para Machine Learning. Engenharia de atributos (Feature Engineering). Preparação e limpeza de dados. Modelos de regressão e classificação. Árvores de decisão, Random Forest e Gradient Boosting. Clustering (K-Means, DBSCAN). Avaliação de modelos (accuracy, precision, recall, F1-score, ROC-AUC). Overfitting e underfitting. Validação cruzada. Introdução a redes neurais. Noções de MLOps e deploy de modelos em produção.

Objetivos
compreender os fundamentos de aprendizado de máquina;
construir pipelines básicos de ML;
aplicar modelos supervisionados e não supervisionados;
avaliar performance de modelos;
integrar ML com pipelines de dados.

Competências
Modelagem preditiva
Engenharia de atributos
Avaliação de modelos
Fundamentos de IA aplicada

Habilidades
O aluno será capaz de:
treinar modelos supervisionados;
aplicar algoritmos de clustering;
preparar datasets para ML;
avaliar métricas de desempenho;
integrar modelos em pipelines de dados.

Conteúdo Programático
Unidade I – Fundamentos
O que é Machine Learning
Tipos de aprendizado
Ciclo de vida de modelos
Pipeline de ML

Unidade II – Aprendizado Supervisionado
Regressão linear
Regressão logística
Árvores de decisão
Random Forest
Gradient Boosting

Unidade III – Aprendizado Não Supervisionado
K-Means
DBSCAN
PCA (Análise de Componentes Principais)
Redução de dimensionalidade

Unidade IV – Avaliação de Modelos
Matriz de confusão
Precision e Recall
ROC Curve
Cross-validation
Bias vs Variance

Unidade V – Introdução a MLOps
Versionamento de modelos
Deploy básico
Monitoramento de modelos
Introdução a pipelines automatizados

Laboratórios
Construção de modelo de churn
Classificação de clientes
Clusterização de dados de clientes
Avaliação de métricas reais
Pipeline simples com Python

Ferramentas
Python
Scikit-learn
Pandas
NumPy
Jupyter Notebook
MLflow (introdução)

Bibliografia Básica
Géron, Aurélien. Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow.
Bishop, Christopher. Pattern Recognition and Machine Learning.
James, Gareth et al. An Introduction to Statistical Learning.

Bibliografia Complementar
Chollet, François. Deep Learning with Python.
Goodfellow, Ian. Deep Learning.
Witten, Ian. Data Mining: Practical Machine Learning Tools.

Disciplina 8
Projeto em Ciência de Dados com Processamento Paralelo e Distribuído
Carga Horária: 40 horas
Ementa
Desenvolvimento de projetos de engenharia de dados em escala. Arquiteturas distribuídas. Processamento paralelo com Apache Spark. Integração de dados estruturados e não estruturados. Construção de Data Lake. ETL/ELT em ambientes cloud. Pipelines de dados. Streaming de dados em tempo real. Processamento batch vs streaming. Arquitetura Lambda e Kappa aplicada. Orquestração de workflows. Deploy de soluções em nuvem.

Objetivos
desenvolver projetos completos de engenharia de dados;
integrar múltiplas fontes de dados;
aplicar processamento distribuído;
construir pipelines end-to-end;
simular ambiente corporativo real.

Competências
Engenharia de pipelines
Processamento distribuído
Arquitetura de dados
Integração de sistemas

Habilidades
O aluno será capaz de:
construir pipelines ETL/ELT;
processar grandes volumes de dados;
integrar APIs e bancos de dados;
implementar soluções em Spark;
orquestrar workflows de dados.

Conteúdo Programático
Unidade I – Arquitetura de Projeto
Arquitetura de dados moderna
Data Lake
Lakehouse
Arquitetura Lambda
Arquitetura Kappa

Unidade II – Processamento Distribuído
Apache Spark
RDDs
DataFrames
Spark SQL
Spark Streaming

Unidade III – Pipelines de Dados
ETL vs ELT
Ingestão de dados
Transformação
Carga incremental
APIs de dados

Unidade IV – Streaming
Dados em tempo real
Kafka (introdução)
Processamento contínuo
Event-driven architecture

Unidade V – Projeto Final
Integração de múltiplas fontes
Construção de pipeline completo
Deploy em nuvem
Monitoramento

Laboratórios
Pipeline de vendas em tempo real
Integração API + banco de dados
Processamento em Spark
Streaming com eventos simulados
Projeto final completo

Ferramentas
Apache Spark
Kafka (introdução)
Python
Airflow (conceitual)
AWS / Azure / GCP (conceitual)
Docker

Bibliografia Básica
Kleppmann, Martin. Designing Data-Intensive Applications.
Karau, Holden. Learning Spark.
White, Tom. Hadoop: The Definitive Guide.

Bibliografia Complementar
Wampler, Dean. Programming Spark.
Marz, Nathan. Big Data.
Chambers, Bill. Spark: The Definitive Guide.

Disciplina 9
Gerenciamento de Desempenho de Banco de Dados (Tuning)
Carga Horária: 40 horas
Ementa
Otimização de desempenho em bancos de dados. Análise de planos de execução. Indexação avançada. Particionamento de tabelas. Tuning de queries SQL. Cache e memória. Arquitetura de armazenamento. Monitoramento de bancos de dados. Ajuste de parâmetros de SGBD. Escalabilidade vertical e horizontal. Replicação e balanceamento de carga. Performance em ambientes OLTP e OLAP.

Objetivos
otimizar performance de bancos de dados;
analisar e melhorar queries SQL;
identificar gargalos de sistemas;
aplicar estratégias de escalabilidade;
monitorar ambientes de produção.

Competências
Performance de bancos de dados
Otimização SQL
Arquitetura de armazenamento
Monitoramento de sistemas

Habilidades
O aluno será capaz de:
interpretar execution plans;
otimizar queries complexas;
implementar índices eficientes;
ajustar parâmetros de SGBD;
reduzir latência de sistemas.

Conteúdo Programático
Unidade I – Fundamentos de Performance
Métricas de desempenho
Gargalos de sistemas
OLTP vs OLAP
Latência e throughput

Unidade II – SQL Tuning
Análise de queries
Execution Plan
JOIN optimization
Subqueries vs CTE

Unidade III – Indexação
B-Tree
Hash Index
Bitmap Index
Índices compostos

Unidade IV – Arquitetura e Memória
Buffer cache
Disk I/O
Partitioning
Sharding

Unidade V – Monitoramento
Logs de banco de dados
Métricas de CPU e memória
Alertas
Ferramentas de observabilidade

Laboratórios
Otimização de queries reais
Análise de plano de execução
Ajuste de índices
Simulação de carga
Diagnóstico de lentidão

Ferramentas
PostgreSQL
MySQL
Oracle Database
SQL Server
pgAdmin
Prometheus (introdução)

Bibliografia Básica
Markus Winand. SQL Performance Explained.
Silberschatz. Database System Concepts.
Date, C. J. Database Systems.

Bibliografia Complementar
Kleppmann, Martin. Designing Data-Intensive Applications.
Garcia-Molina. Database Systems.
Kimball, Ralph. Data Warehouse Toolkit.

Competências finais do curso (perfil do egresso)
Ao concluir a especialização completa, o profissional estará apto a:
projetar arquiteturas modernas de dados (DW, Data Lake, Lakehouse);
implementar pipelines distribuídos em cloud;
trabalhar com Big Data e processamento em larga escala;
desenvolver soluções com NoSQL e bancos relacionais otimizados;
aplicar fundamentos de Machine Learning em pipelines de dados;
otimizar performance de sistemas críticos;
atuar como Engenheiro de Dados júnior/pleno em ambientes corporativos.

PARTE IV – Arquiteturas Avançadas, DevOps de Dados e Integração Profissional (120h)
Esta parte final consolida o curso em um nível mais próximo do mercado profissional moderno, conectando engenharia de dados com práticas de engenharia de software, automação, escalabilidade e arquitetura corporativa.

Disciplina 10
Engenharia de Dados em Nuvem (AWS, Azure e GCP)
Carga Horária: 40 horas
Ementa
Arquitetura de dados em nuvem. Serviços gerenciados para engenharia de dados. Computação distribuída em cloud. Storage escalável (object storage e data lake). Pipelines serverless. Integração entre serviços de dados. Arquiteturas multi-cloud. Segurança em cloud computing. IAM (Identity and Access Management). Observabilidade e monitoramento em nuvem. Otimização de custos (FinOps). Data platforms modernas.

Objetivos
projetar arquiteturas de dados em nuvem;
utilizar serviços gerenciados de dados;
construir pipelines escaláveis;
aplicar boas práticas de segurança;
otimizar custos de infraestrutura.

Conteúdo Programático
Unidade I – Fundamentos de Cloud Data Engineering
Arquiteturas cloud-first
Data platforms modernas
Infraestrutura como serviço (IaaS)
Plataforma como serviço (PaaS)
Serverless

Unidade II – AWS para Engenharia de Dados
S3 (Data Lake)
Glue (ETL)
Athena (query serverless)
Redshift (DW)
EMR (Spark/Hadoop)
Lake Formation

Unidade III – Azure Data Stack
Azure Data Factory
Azure Synapse Analytics
Azure Databricks
Blob Storage
Event Hubs

Unidade IV – Google Cloud Platform
BigQuery
Dataflow
Dataproc
Pub/Sub
Cloud Storage

Unidade V – Segurança e FinOps
IAM
Controle de acesso
Criptografia
Governança em cloud
Otimização de custos
Monitoramento e logs

Ferramentas
AWS
Azure
Google Cloud Platform
Terraform (introdução)
Docker

Bibliografia
Kleppmann, Martin. Designing Data-Intensive Applications
Richards, Mike. Fundamentals of Software Architecture
AWS, Azure e GCP official documentation

Disciplina 11
DataOps, Orquestração e Automação de Pipelines
Carga Horária: 40 horas
Ementa
DataOps como disciplina de engenharia. CI/CD para dados. Orquestração de pipelines. Automação de workflows. Versionamento de dados. Testes em pipelines. Monitoramento de dados em produção. Airflow e ferramentas equivalentes. Integração com DevOps. Data reliability engineering (DRE). Observabilidade de dados.

Objetivos
automatizar pipelines de dados;
implementar CI/CD para dados;
monitorar pipelines em produção;
reduzir falhas em sistemas de dados;
aplicar práticas de engenharia confiável.

Conteúdo Programático
Unidade I – Fundamentos de DataOps
Conceito de DataOps
Diferença entre DevOps e DataOps
Ciclo de vida de dados

Unidade II – Orquestração de Dados
Apache Airflow
DAGs (Directed Acyclic Graphs)
Scheduling
Dependências de tarefas

Unidade III – CI/CD para Dados
Versionamento com Git
Pipelines automatizados
Testes de dados
Deploy contínuo

Unidade IV – Observabilidade de Dados
Data quality monitoring
Logs e métricas
Alertas
Data downtime

Unidade V – Data Reliability Engineering
SLA de dados
SLO e SLI
Resiliência de pipelines
Recuperação de falhas

Ferramentas
Apache Airflow
Git
GitHub Actions
dbt (introdução)
Docker

Bibliografia
Kleppmann, Martin. Designing Data-Intensive Applications
Humble, Jez. Continuous Delivery
Reis, Max. Data Engineering Design Patterns

Disciplina 12
Arquiteturas Modernas de Dados (Data Mesh e Data Fabric)
Carga Horária: 40 horas
Ementa
Evolução das arquiteturas de dados. Limitações de Data Lakes tradicionais. Data Mesh: princípios, domínios, descentralização e produtos de dados. Data Fabric: integração inteligente de dados. Arquiteturas distribuídas organizacionais. Cultura data-driven. Governança federada. Interoperabilidade entre sistemas. Plataformas de dados corporativas.

Objetivos
compreender arquiteturas modernas corporativas;
diferenciar Data Mesh e Data Fabric;
aplicar princípios de descentralização de dados;
projetar ecossistemas de dados escaláveis;
integrar governança com autonomia de domínio.

Conteúdo Programático
Unidade I – Evolução Arquitetural
Data Warehouse tradicional
Data Lake
Lakehouse
Limitações de arquiteturas centralizadas

Unidade II – Data Mesh
Conceito e princípios
Domínios de dados
Data as a product
Infraestrutura self-service
Governança federada

Unidade III – Data Fabric
Integração inteligente
Automação de pipelines
Metadata-driven architecture
Catálogo inteligente

Unidade IV – Arquitetura Organizacional
Times de dados
Estrutura descentralizada
Responsabilidade por domínio
Escalabilidade organizacional

Unidade V – Casos de Uso
Empresas globais
Bancos e fintechs
E-commerce em escala
Plataformas digitais

Ferramentas
DataHub
Apache Atlas
Collibra
Snowflake (conceitual)
Databricks

Bibliografia
Zhamak Dehghani. Data Mesh
Kleppmann, Martin. Designing Data-Intensive Applications
AWS Architecture Center

Disciplina 13
Projeto Final Integrador – Engenharia de Dados
Carga Horária
Ementa
Desenvolvimento de projeto completo de engenharia de dados. Integração de todas as disciplinas do curso. Construção de pipeline end-to-end. Ingestão, transformação e consumo de dados. Implementação em cloud. Modelagem de dados corporativos. Aplicação de governança e segurança. Entrega de solução funcional.

Objetivos
consolidar conhecimentos do curso;
desenvolver solução real de engenharia de dados;
integrar tecnologias aprendidas;
simular ambiente corporativo profissional;
apresentar projeto técnico completo.

Estrutura do Projeto
1. Problema de Negócio
Definição de caso real (ex: e-commerce, banco, logística)
2. Arquitetura
Data Lake
Pipeline ETL/ELT
Cloud provider
Ferramentas
3. Implementação
Ingestão de dados
Processamento distribuído
Banco analítico
Dashboard ou API
4. Governança
Segurança
LGPD
Qualidade de dados
5. Entrega Final
Documentação técnica
Apresentação
Demonstração funcional

Ferramentas
Apache Spark
Airflow
AWS / Azure / GCP
Python
SQL
Docker

Bibliografia
Kleppmann, Martin. Designing Data-Intensive Applications
Kimball, Ralph. Data Warehouse Toolkit
Wampler, Dean. Programming Spark

Competências finais do curso completo
Ao concluir toda a especialização, o profissional será capaz de:
projetar arquiteturas modernas de dados em escala;
construir pipelines de dados em cloud;
trabalhar com Big Data, NoSQL e SQL avançado;
aplicar Machine Learning em pipelines produtivos;
implementar DataOps e automação de dados;
desenhar arquiteturas Data Mesh e Data Fabric;
atuar como Engenheiro de Dados em ambientes corporativos reais.

A parte importante aqui é: essa pós da Anhanguera te dá base sólida de engenharia de dados, mas não te coloca automaticamente em nível pleno. Para chegar lá, você precisa cobrir o “buraco entre teoria acadêmica e prática de produção”.
Abaixo está o mapa direto do que ela não ensina bem (ou não ensina) e o que você precisa estudar fora.

MAPA DE GAP – Engenheiro de Dados Pleno (vs Pós Anhanguera)
1. O que a pós ensina bem (base forte)
Você sai confortável com:
SQL e modelagem de dados
Data Warehouse (Kimball/Inmon)
NoSQL (conceitual)
Big Data (Spark/Hadoop introdutório)
Cloud (visão geral AWS/Azure/GCP)
Governança (teórica)
Machine Learning básico (conceito)
Tuning e banco de dados
👉 Isso te coloca em nível: júnior sólido / júnior avançado

2. O que a pós NÃO ensina (gap para nível pleno)
2.1 Programação real de Engenharia de Dados (GRANDE GAP)
O que falta:
Python avançado aplicado a dados (produção)
Estrutura de projetos profissionais
POO aplicada a pipelines
APIs (FastAPI)
Manipulação de arquivos grandes em produção
Código escalável e modular
O que estudar:
Python avançado (pandas + pyspark + typing)
FastAPI
Poetry / virtualenv / packaging
Clean Architecture aplicada a dados

2.2 Ferramentas reais de mercado (GAP CRÍTICO)
A pós menciona, mas não te ensina de verdade:
Falta prática de:
Apache Kafka (produção real)
Apache Airflow (DAGs complexos)
dbt (padrão moderno de mercado)
Terraform (infra como código)
Docker/Kubernetes real
O que estudar:
Kafka (event streaming real)
Airflow (produção de DAGs)
dbt (transformação moderna ELT)
Terraform básico
Docker + deploy simples

2.3 Engenharia de Streaming (GRANDE GAP)
O que falta:
arquitetura de eventos real
streaming em produção
tolerância a falhas
exatamente-once vs at-least-once
O que estudar:
Kafka Streams
Spark Structured Streaming avançado
Event-driven architecture
Sistemas distribuídos (conceitos reais)

2.4 Cloud de verdade (GAP PRÁTICO)
A pós mostra serviços, mas não te prepara para uso real.
Falta:
arquitetura completa na nuvem
deploy real de pipelines
custos (FinOps de verdade)
IAM complexo
arquitetura escalável
O que estudar:
AWS na prática (S3 + Glue + Lambda + Athena + Redshift)
Terraform
arquitetura serverless
segurança IAM

2.5 Data Engineering moderno (GAP ATUAL DO MERCADO)
O que NÃO aparece forte:
Data Lakehouse real (Delta / Iceberg)
Data Mesh na prática
Data Contracts
Data Observability (monitoramento real)
Data Quality em produção
O que estudar:
Delta Lake / Apache Iceberg
Great Expectations
Monte Carlo (conceito)
Data contracts
arquitetura medallion real

2.6 Cultura de produção (GAP MAIS IMPORTANTE)
Isso separa júnior de pleno.
Falta na pós:
deploy em produção
incidentes reais
logs e monitoramento
SLA/SLO
debugging de pipelines quebrados
O que estudar:
observabilidade (Prometheus / Grafana)
logging estruturado
incident management
troubleshooting real de pipelines

2.7 Engenharia de software aplicada a dados (GAP OCULTO)
Falta:
testes automatizados de dados
CI/CD real
versionamento de pipeline
arquitetura de código
O que estudar:
pytest
GitHub Actions
dbt tests
arquitetura modular

2.8 Machine Learning (GAP GRANDE)
A pós só toca no básico.
Falta:
ML em produção (MLOps)
feature store
pipelines de ML reais
deploy de modelos
O que estudar:
MLflow
MLOps básico
APIs com modelos
feature engineering avançado

3. O QUE REALMENTE TE LEVA A PLENO
Se você quiser virar pleno de verdade, precisa dominar:
🔴 Essencial (obrigatório)
Python avançado
SQL forte (nível otimização)
Spark (de verdade)
Airflow
Kafka
Cloud (AWS ou Azure ou GCP profundo)
Docker

🟡 Diferencial de pleno
dbt
Terraform
Data Lakehouse (Iceberg/Delta)
Data quality tools
CI/CD

🟢 Nível acima de pleno
Data Mesh
Streaming avançado
arquitetura distribuída
system design

4. VERDADE DIRETA (sem romantizar)
Essa pós te dá:
✔ base acadêmica sólida
✔ visão geral da área
✔ currículo melhorado
Mas NÃO te dá:
❌ experiência real de pipeline
❌ domínio de ferramentas modernas
❌ maturidade de produção
❌ nível pleno sozinho

5. CAMINHO REAL (resumo prático)
Se você fizer:
essa pós (base teórica)
3 a 6 projetos reais no GitHub
estudo focado em tools (Kafka, Airflow, Spark, Cloud)
simular pipelines reais
👉 você chega em:
Pleno inicial em 8–18 meses


Aqui vão 3 projetos de portfólio que realmente elevam você ao nível de Engenheiro de Dados pleno, porque simulam problemas reais de empresa (ingestão, escala, streaming, cloud, qualidade e consumo de dados). Não são “projetinhos de curso” — são projetos de produção simulada.

1. Data Lakehouse Completo (Batch + ELT + Analytics)
🎯 Ideia
Construir um Data Lakehouse moderno simulando uma empresa de e-commerce (vendas, clientes, produtos, pagamentos).

🧱 Arquitetura
Ingestão: API + arquivos CSV + banco relacional
Armazenamento: Data Lake (S3 local via MinIO ou AWS S3)
Processamento: Apache Spark
Transformação: dbt ou Spark SQL
Camadas: Bronze / Silver / Gold
Consumo: Power BI / Metabase

🔥 O que você implementa
Ingestão
API simulando vendas
Batch de CSV diário
Extração de banco PostgreSQL
Processamento
Spark para limpeza e padronização
Deduplicação
Tratamento de dados faltantes
Modelagem
Star schema (fato vendas)
Dimensões (cliente, produto, tempo)
Camadas
Bronze: dados crus
Silver: tratados
Gold: métricas de negócio

☁️ Nível pleno que isso demonstra
arquitetura de Data Lakehouse
ETL/ELT real
modelagem dimensional
pipelines em escala
separação por camadas

💡 Diferencial forte
Adicionar:
Airflow para orquestração
Great Expectations para qualidade de dados

2. Pipeline de Streaming em Tempo Real (Kafka + Spark)
🎯 Ideia
Simular uma plataforma de eventos em tempo real (tipo Uber, iFood ou Pix).

🧱 Arquitetura
Producer: API gerando eventos
Kafka: streaming de eventos
Spark Streaming: processamento
Sink: banco analítico (PostgreSQL ou ClickHouse)

🔥 O que você implementa
Produção de eventos
eventos de pedidos
localização
status de pagamento
Streaming
consumo via Kafka
processamento em Spark Structured Streaming
Regras em tempo real
detectar fraude simples
calcular tempo médio de entrega
identificar pico de pedidos

📊 Saídas
dashboards em tempo real
métricas agregadas
alertas simples

☁️ Nível pleno que isso demonstra
arquitetura event-driven
streaming real
Kafka básico funcional
processamento contínuo
engenharia de dados em tempo real

💡 Diferencial forte
Adicionar:
schema registry
exactly-once / at-least-once explicação
monitoramento de lag do Kafka

3. Plataforma de Dados em Cloud (AWS ou equivalente)
🎯 Ideia
Simular uma empresa real rodando tudo em cloud (arquitetura de produção).

🧱 Arquitetura
S3 (Data Lake)
Glue / Spark (ETL)
Athena (consulta SQL)
Redshift ou BigQuery (DW)
Airflow (orquestração)
IAM (segurança)

🔥 O que você implementa
Ingestão
dados de API + batch + streaming leve
Pipeline
ETL automatizado
jobs agendados
Governança
controle de acesso
versionamento de dados
organização por buckets

📊 Saídas
consultas analíticas com SQL
dashboards
pipeline totalmente automatizado

☁️ Nível pleno que isso demonstra
arquitetura cloud real
uso de serviços gerenciados
visão de produção
segurança e governança
engenharia de dados moderna

💡 Diferencial forte
Adicionar:
Terraform (infra como código)
CI/CD com GitHub Actions
monitoramento simples (logs + métricas)

🚀 COMO ISSO TE COLOCA EM NÍVEL PLENO
Se você tiver esses 3 projetos bem feitos:
Você demonstra:
batch + streaming + cloud
arquitetura moderna completa
ferramentas reais do mercado
visão de produção
capacidade de desenhar sistemas

🧠 O que recrutador vê
Ele pensa:
“Esse cara não só estudou, ele construiu sistemas de dados reais.”

🔥 RESUMO DIRETO
Projeto
Habilidade demonstrada
Lakehouse
modelagem + ETL + BI
Streaming Kafka
tempo real + eventos
Cloud Platform
arquitetura profissional


Boa. Vou te dar mais 3 projetos diferentes dos anteriores, focados em áreas que o mercado realmente cobra e que aumentam bastante o nível do seu portfólio (principalmente para vagas pleno: observabilidade, governança e sistemas distribuídos).

4. Plataforma de Qualidade de Dados e Observabilidade (Data Quality + Monitoring)
🎯 Ideia
Construir um sistema que monitora a qualidade dos dados em pipelines reais, como empresas fazem para evitar “data downtime”.

🧱 Arquitetura
Pipelines de dados (Spark ou Python)
Camada de validação (Great Expectations)
Banco de métricas (PostgreSQL)
Dashboard (Metabase / Grafana)
Alertas (email ou webhook)

🔥 O que você implementa
Validação de dados
schema validation
valores nulos
duplicidade
ranges inválidos
consistência entre tabelas
Monitoramento contínuo
checks automáticos em cada pipeline
histórico de qualidade dos dados
Métricas
% de dados válidos
falhas por pipeline
tendência de erros ao longo do tempo

📊 Saídas
dashboard de qualidade de dados
alertas automáticos de falhas
histórico de confiabilidade dos dados

💡 Nível pleno que isso demonstra
data observability (muito valorizado hoje)
engenharia de confiabilidade de dados
maturidade de produção
pensamento de “produto de dados”

5. Sistema de Governança de Dados com Catálogo e Linhagem
🎯 Ideia
Simular uma empresa grande com milhares de datasets e criar um sistema de governança completo.

🧱 Arquitetura
Banco de metadados (PostgreSQL)
Catálogo de dados (OpenMetadata ou simulação própria)
Pipeline de ingestão de metadados
Interface simples (Streamlit ou dashboard web)

🔥 O que você implementa
Catálogo de dados
datasets disponíveis
descrição de tabelas
owner dos dados
frequência de atualização
Data lineage (linhagem)
de onde o dado veio
quais transformações sofreu
onde ele é consumido
Classificação de dados
sensível
público
interno

📊 Saídas
catálogo navegável de dados
mapa de dependências entre tabelas
rastreabilidade completa

💡 Nível pleno que isso demonstra
governança de dados real
visão corporativa de dados
maturidade em arquitetura
alinhamento com LGPD

6. Sistema de Detecção de Fraude em Tempo Real (Streaming + Regras + ML leve)
🎯 Ideia
Simular detecção de fraude em transações financeiras ou e-commerce em tempo real.

🧱 Arquitetura
Kafka (event streaming)
Spark Streaming (processamento)
Banco de regras (PostgreSQL ou Redis)
Modelo simples de ML (Scikit-learn)
Dashboard de alertas

🔥 O que você implementa
Eventos
transações de compra
login de usuário
mudanças de IP/localização
Regras de fraude
múltiplas compras em segundos
uso de cartão em locais diferentes
comportamento anômalo
ML leve
modelo de classificação simples
score de risco

📊 Saídas
lista de transações suspeitas
score de fraude em tempo real
dashboard de alertas

💡 Nível pleno que isso demonstra
streaming + decisão em tempo real
integração de regras + ML
arquitetura orientada a eventos
pensamento de sistemas críticos

🚀 RESUMO DOS 6 PROJETOS (PORTFÓLIO FORTE DE PLENO)
Batch / Lakehouse
Data Lakehouse completo
Streaming
Pipeline Kafka em tempo real
Sistema de fraude em streaming
Cloud / Arquitetura
Plataforma de dados em cloud
Qualidade / Governança
Observabilidade de dados
Catálogo e linhagem de dados

🧠 O que isso prova para o mercado
Se você fizer bem esses projetos, você demonstra:
arquitetura de dados completa
batch + streaming + cloud
governança e qualidade
pensamento de produção
capacidade de desenhar sistemas reais

🔥 Resultado real
Com esses 6 projetos no GitHub bem feitos:
👉 você deixa de parecer “aluno de pós”
👉 e passa a parecer engenheiro de dados pleno em transição ou júnior forte



