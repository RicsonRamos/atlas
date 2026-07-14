# OPS-01 — Ciclo de Vida de Modelos (MLLC)

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda o Ciclo de Vida de Modelos de Machine Learning (MLLC - *Machine Learning Lifecycle*). Cobre as fases de preparação de dados estruturados, engenharia de atributos, experimentação, treinamento distribuído, avaliação, empacotamento, implantação, monitoramento e retreinamento contínuo. Explora ferramentas de controle de versão de dados (DVC) e rastreamento de experimentos (MLflow). Discute reprodutibilidade técnica de código, dados e ambiente operacional, além da governança e linhagem de modelos preditivos em sistemas de produção corporativos.

## Objetivos
1. Projetar um pipeline de MLOps contendo controle de versão de dados e código unificados.
2. Implementar logs de métricas de treinamento, parâmetros e artefatos de modelos preditivos de forma agnóstica e reprodutível.
3. Projetar a governança operacional de modelos mitigando riscos de degradação preditiva.

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — As diferenças estruturais entre Engenharia de Software convencional (DevOps) e Engenharia de Machine Learning (MLOps); as fontes de incerteza em ML (código, dados e hiperparâmetros); a anatomia de um experimento de ML.

**Teoria** — A formulação de reprodutibilidade operacional de modelos:
$$M = (C, D_v, H)$$
onde um modelo em produção $M$ é univocamente determinado pelo código fonte versionado $C$ (Git), o conjunto de dados sob o snapshot de versão $D_v$ (DVC) e a tupla de hiperparâmetros de treinamento $H$.
A representação matemática de controle de linhagem de artefatos por meio de grafos direcionados acíclicos (DAGs) de dados. A modelagem estrutural de logs de experimentos e run tracking utilizando MLflow.

**Aplicação prática** — Implementação de script em Python simulando o ciclo de rastreamento de experimentos, registrando parâmetros de modelo (taxa de aprendizado, número de estimadores), métricas (acurácia, F1-Score) e salvando o modelo serializado localmente.

## Código de Exemplo em Python (Rastreamento de Experimento de ML)
```python
import json
import os
import time
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

# 1. Preparação de dados (seed fixa para reprodutibilidade)
X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Configurar parâmetros do experimento
parametros = {
    "n_estimators": 50,
    "max_depth": 5,
    "random_state": 42
}

print("--- Inicializando Experimento de ML ---")
inicio = time.time()

# 3. Treinar o modelo
modelo = RandomForestClassifier(**parametros)
modelo.fit(X_train, y_train)

# 4. Avaliar métricas do modelo
previsoes = modelo.predict(X_test)
acuracia = accuracy_score(y_test, previsoes)
f1 = f1_score(y_test, previsoes, average='binary')
tempo_execucao = time.time() - inicio

# 5. Estruturar o Log de Experimentos (Simulando MLflow / Meta-Store)
run_log = {
    "run_id": "run_rf_classifier_101",
    "params": parametros,
    "metrics": {
        "accuracy": round(acuracia, 4),
        "f1_score": round(f1, 4),
        "execution_time_seconds": round(tempo_execucao, 3)
    },
    "artifacts": {
        "model_path": "models/random_forest_v1.json"
    }
}

# Criar pasta de destino se não existir
os.makedirs("models", exist_ok=True)

# Salvar o run_log como metadado de linhagem
with open("models/run_metadata.json", "w") as f:
    json.dump(run_log, f, indent=4)

print("Parâmetros registrados:", run_log["params"])
print("Métricas registradas:", run_log["metrics"])
print("Metadados salvos em 'models/run_metadata.json' com sucesso!")
```

## Casos práticos
- **Caso 1**: Uma fintech desenvolve um modelo de crédito cujos resultados não podem ser reproduzidos pela equipe de auditoria devido a alterações na base de dados de treinamento ocorridas após o treino do modelo. Analisar a ausência de snapshots de versionamento de dados com DVC.
- **Caso 2**: Um modelo preditivo de churn em produção é atualizado com um novo script de treinamento contendo melhorias de precisão. Em produção, contudo, o modelo apresenta latência 10 vezes maior por falta de rastreamento e teste de carga em estágio de validação (staging).
- **Caso 3 (Caso Multivariável)**: Desenho do fluxo de MLOps de um sistema de recomendação de notícias de portal de mídia digital. O fluxo deve prever retreinamento diário automatizado. Mapear o pipeline contendo: (a) versionamento e linhagem de dados para cada lote diário; (b) critérios de validação automática para promoção de modelo da fase de staging para produção baseados em thresholds mínimos de desempenho e de latência; (c) protocolo de rollback automático caso o modelo de produção apresente degradação de acurácia em tempo real.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 38507:2022 | Governança corporativa das implicações do uso de Inteligência Artificial pelas organizações. | Exige relatórios e trilhas de auditoria contínuas para decisões tomadas por modelos de produção. |
| ANPD (Governança de IA) | Sistemas que realizam decisões automatizadas de perfil de consumo devem manter documentação histórica dos modelos aplicados por até 5 anos. | Obriga o uso de registros históricos de linhagem de dados (data lineage) e registros de modelos em produção. |

## Doutrina / Referências Técnicas
- TREVEIL, Mark et al. *Introducing MLOps: How to Scale Machine Learning in the Enterprise*. O'Reilly Media, 2020.
- AMERSHI, Saleema et al. *Software Engineering for Machine Learning: A Case Study*. IEEE/ACM 41st International Conference on Software Engineering, 2019.
- SCULLEY, D. et al. *Hidden Technical Debt in Machine Learning Systems*. Advances in Neural Information Processing Systems (NeurIPS), 2015 (Seminal).

## Legislação Relacionada
- Lei Geral de Proteção de Dados (LGPD), art. 20: o direito do titular dos dados de obter informações sobre os critérios utilizados em decisões automatizadas.
- Código de Defesa do Consumidor (Lei nº 8.078/1990), art. 6º: direito à informação clara e adequada sobre produtos e serviços fornecidos por inteligência algorítmica.

## Prática Profissional
- Atuação como Engenheiro de MLOps em infraestruturas corporativas de nuvem, desenhando fluxos automatizados de treinamento de modelos e registrando metadados em bancos de dados de monitoramento operacional.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** O controle de versão de dados de entrada por hashes de arquivos (como feito pelo DVC acoplado ao Git) é a única estratégia segura para garantir a auditoria técnica de modelos de ML em produção.
- **Debate ativo pós-2023:** O trade-off entre reprodutibilidade determinística absoluta de modelos de deep learning massivos e a performance de hardware ( GPUs) sob cálculos paralelos não-determinísticos inerentes a operações de ponto flutuante.

## Questões Avançadas
- Explique como o débito técnico em sistemas de ML se manifesta de forma invisível através de "vazamento de feedback" (feedback loops) quando as saídas do modelo afetam os dados de treino futuros. *(pesquisa/mlops)*
- Descreva como a linhagem de dados estruturada por snapshots de metadados difere de soluções de data backup clássicas. *(pesquisa)*

## Exercícios
- Calcule a assinatura de hash sha256 de um conjunto de dados sintético gerado com Pandas e use este hash para simular um snapshot de versão DVC.
- Modifique o script de exemplo para salvar automaticamente os artefatos de treinamento (o modelo serializado como arquivo pickle ou json) em uma pasta estruturada contendo o timestamp da execução.
- Para o caso multivariável de recomendação de notícias, desenhe a arquitetura do banco de dados de logs para armazenar os hashes dos dados de entrada, parâmetros de treinamento e escores F1 obtidos.

## Tags
#MLOps #Lifecyle #LinhagemDeDados #DVC #MLflow #Reprodutibilidade
