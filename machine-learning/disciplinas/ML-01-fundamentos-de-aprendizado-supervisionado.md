# ML-01 — Fundamentos de Aprendizado Supervisionado

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre as bases conceituais, matemáticas e práticas do aprendizado de máquina supervisionado. Aborda a modelagem preditiva sob a perspectiva estatística de tomada de decisão. Estuda o dilema viés-variância (*bias-variance trade-off*), métodos de regularização ($\text{L1}$ e $\text{L2}$), e protocolos rigorosos de validação de modelos (validação cruzada, partição temporal). Analisa os algoritmos de base de regressão e classificação: k-Vizinhos Mais Próximos (kNN), Árvores de Decisão e Máquinas de Vetores de Suporte (SVM). Cobre métricas avançadas de avaliação de performance e diagnóstico de calibração.

## Objetivos
1. Formular a decomposição matemática do erro quadrático médio em termos de viés, variância e ruído irredutível.
2. Aplicar regularizações de Lasso e Ridge para mitigar o sobreajuste em modelos lineares multidimensionais.
3. Projetar e executar estratégias robustas de validação cruzada e avaliar modelos por meio de curvas ROC/AUC e calibração de probabilidade.

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — A definição de aprendizado supervisionado como estimativa de uma função mapeadora $f: X \to Y$ a partir de pares rotulados; o conceito de erro de generalização; sobreajuste (*overfitting*) e subajuste (*underfitting*).

**Teoria** — A decomposição do Erro Quadrático Médio ($\text{MSE}$):
$$\text{MSE}(x) = \mathbb{E}[(y - \hat{f}(x))^2] = \text{Bias}[\hat{f}(x)]^2 + \text{Var}[\hat{f}(x)] + \sigma^2$$
onde $\text{Bias}[\hat{f}(x)] = \mathbb{E}[\hat{f}(x)] - f(x)$ é o erro sistemático do modelo, $\text{Var}[\hat{f}(x)] = \mathbb{E}[(\hat{f}(x) - \mathbb{E}[\hat{f}(x)])^2]$ mede a sensibilidade a variações no conjunto de treino, e $\sigma^2$ é o ruído irredutível dos dados.
Regularização $\text{L2}$ (Ridge Regression), que penaliza pesos via norma Euclidiana quadrada:
$$\min_{w} \sum_{i=1}^n (y_i - x_i^T w)^2 + \lambda \|w\|_2^2$$
Regularização $\text{L1}$ (Lasso Regression), que induz esparsidade nos coeficientes via norma Manhattan:
$$\min_{w} \sum_{i=1}^n (y_i - x_i^T w)^2 + \lambda \|w\|_1$$
O funcionamento matemático de hiperplanos separadores e margens em Máquinas de Vetores de Suporte (SVM) com o truque do kernel (*kernel trick*). Métricas de matriz de confusão: Sensibilidade, Especificidade, F1-Score e cálculo da área sob a curva ROC (AUC).

**Aplicação prática** — Implementação de rotina em Python para treinar um classificador linear com regularização Lasso/Ridge, ajustando o hiperparâmetro $\lambda$ ($\alpha$ no scikit-learn) por meio de busca em grade (*GridSearch*) e validação cruzada K-Fold.

## Código de Exemplo em Python (Regularização e Validação Cruzada)
```python
import numpy as np
import pandas as pd
from sklearn.linear_model import RidgeClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.datasets import make_classification
from sklearn.metrics import roc_auc_score

# 1. Gerar dataset sintético com semente aleatória fixa para reprodutibilidade
X, y = make_classification(n_samples=500, n_features=20, n_informative=10, random_state=42)

# 2. Configurar o classificador Ridge (regularização L2)
modelo = RidgeClassifier()

# 3. Definir grade de busca para o parâmetro alfa (lambda de penalização)
param_grid = {'alpha': np.logspace(-3, 3, 7)}

# 4. Configurar validação cruzada k-fold estratificada (5 dobras)
cv_estratificado = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# 5. Executar busca em grade com validação cruzada
busca = GridSearchCV(estimator=modelo, param_grid=param_grid, cv=cv_estratificado, scoring='roc_auc')
busca.fit(X, y)

print("Melhor parâmetro alpha encontrado:", busca.best_params_)
print("Melhor escore ROC/AUC de Validação Cruzada:", busca.best_score_)
```

## Casos práticos
- **Caso 1**: Um modelo preditivo de aprovação de crédito bancário apresenta acurácia de 98% em dados históricos, mas quando colocado em produção, aprova dezenas de transações fraudulentas. Diagnosticar o vazamento de dados (*data leakage*) e o desbalanceamento de classes.
- **Caso 2**: Um algoritmo kNN de classificação de imagens de satélite apresenta queda brusca de acurácia de 92% para 55% após a adição de novas variáveis brutas irrelevantes. Explicar o fenômeno sob a ótica da maldição da dimensionalidade (*curse of dimensionality*).
- **Caso 3 (Caso Multivariável)**: Projeto de um modelo de classificação de risco de evasão escolar (churn) em uma universidade pública. O analista dispõe de notas, frequência, renda familiar e histórico de acesso ao portal do aluno. O modelo apresenta alta variância no treino em relação à validação. Desenhar a metodologia para mitigar a variância contendo: (a) escolha e aplicação de técnica de regularização; (b) balanceamento da métrica de avaliação entre falsos positivos e falsos negativos; (c) desenho de um protocolo de cross-validation que previna vazamento temporal de dados de alunos matriculados em anos diferentes.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 22989:2022 | Estabelece conceitos e terminologia padrão para sistemas de Inteligência Artificial e Aprendizado Supervisionado. | Padroniza a nomenclatura técnica em laudos e documentação de conformidade empresarial. |
| ANPD (Guia de IA e Dados) | O uso de aprendizado supervisionado para decisões que afetem direitos individuais exige auditoria prévia de acurácia e calibração. | Exige documentação técnica das métricas de performance obtidas em fases de validação cruzada. |

## Doutrina / Referências Técnicas
- HASTIE, Trevor; TIBSHIRANI, Robert & FRIEDMAN, Jerome. *The Elements of Statistical Learning: Data Mining, Inference, and Prediction*. 2ª Edição. Springer, 2009 (Capítulos 2 e 7 - Seminal).
- JAMES, Gareth et al. *An Introduction to Statistical Learning: with Applications in R/Python*. Springer, 2021 (Capítulos 3 e 5).
- BISHOP, Christopher M. *Pattern Recognition and Machine Learning*. Springer, 2006.

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), art. 20: direito do titular de dados à explicação e revisão de decisões tomadas unicamente com base em tratamento automatizado de dados.
- Marco Civil da Internet (Lei nº 12.965/2014), art. 7º: direitos do usuário à clareza e transparência no tratamento de dados de navegação.

## Prática Profissional
- Atuação como Engenheiro de Machine Learning em equipes de engenharia de dados, desenvolvendo scripts de validação de modelos estruturados e integrando pipelines automatizados de detecção de vazamento de dados de treino.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** A validação cruzada por blocos temporais (time-series split) é a única técnica estatística válida para dados dependentes do tempo, sob risco de gerar previsões infladas por vazamento de informação do futuro.
- **Debate ativo pós-2023:** Os limites práticos e matemáticos de métricas clássicas de desempenho (como a curva ROC/AUC) em conjuntos de dados massivamente desbalanceados com taxas de eventos raros inferiores a 0,01% — debate sobre se a curva Precision-Recall (PR-AUC) deveria substituir formalmente o ROC em todos os cenários de fraude e anomalia.

## Questões Avançadas
- Como a regularização L1 (Lasso) atua como um seletor natural de variáveis de entrada no modelo em termos geométricos (formato do espaço de restrição de parâmetros)? *(pesquisa/matematica)*
- Por que a distância euclidiana simples falha no kNN à medida que o número de variáveis preditoras (dimensionalidade) tende ao infinito? *(pesquisa)*

## Exercícios
- Demonstre analiticamente a decomposição do erro quadrático médio de um estimador $\hat{\theta}$ que possui viés constante.
- Implemente em Python uma busca em grade manual (sem usar `GridSearchCV` do scikit-learn) para encontrar a melhor penalização Ridge para um problema de regressão sintético.
- Para o caso multivariável da evasão escolar, desenhe o grafo de fluxo do pipeline de modelagem, desde o carregamento até o cálculo do F1-score final.

## Tags
#AprendizadoSupervisionado #Regularizacao #ViesVariancia #CrossValidation #CurvaROC
