# ML-02 — Aprendizado Não-Supervisionado e Representação

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** ML-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os métodos de aprendizado sem rótulos, nos quais a estrutura latente dos dados é o próprio objeto de estimação. Estuda algoritmos de agrupamento particional (k-means, k-medoids), hierárquico (aglomerativo com critérios de ligação), baseado em densidade (DBSCAN, HDBSCAN) e probabilístico (Misturas Gaussianas via Expectation-Maximization). Aborda a detecção de anomalias por isolamento (*Isolation Forest*), por densidade local (LOF) e por reconstrução. Introduz o aprendizado de representação: *autoencoders* (visão conceitual da compressão não-linear) e *embeddings* vetoriais como espaço semântico para dados de alta dimensão. Cobre critérios internos de validação de agrupamento (silhueta, Calinski-Harabasz, Davies-Bouldin) e o problema da escolha do número de grupos.

## Objetivos
1. Formular o agrupamento como problema de otimização (minimização de inércia intra-cluster e maximização de verossimilhança em misturas) e diagnosticar as condições de falha de cada família de algoritmo.
2. Projetar rotinas de detecção de anomalias não supervisionadas e avaliar seus resultados sem rótulos, usando critérios internos e inspeção estruturada.
3. Explicar o papel de *autoencoders* e *embeddings* como aprendizado de representação, relacionando compressão, redução de dimensionalidade e semântica vetorial.

## Pré-requisitos
ML-01 (viés-variância, validação e noções de distância em alta dimensão).

## Conteúdo programático

**Fundamentos** — A distinção entre aprender $p(y|x)$ (supervisionado) e aprender a estrutura de $p(x)$ (não-supervisionado); tarefas canônicas: agrupamento, detecção de anomalias, redução de dimensionalidade e aprendizado de representação; a inexistência de métrica de erro externa e suas consequências metodológicas.

**Teoria** — O k-means como minimização da soma de quadrados intra-cluster:
$$\min_{C_1,\dots,C_k} \sum_{j=1}^{k} \sum_{x_i \in C_j} \|x_i - \mu_j\|^2$$
com convergência garantida do algoritmo de Lloyd para ótimos locais (daí a inicialização k-means++). Misturas Gaussianas como modelo generativo $p(x) = \sum_{j=1}^{k} \pi_j \, \mathcal{N}(x \mid \mu_j, \Sigma_j)$, estimadas por Expectation-Maximization — o passo E calcula responsabilidades $\gamma_{ij}$ e o passo M re-estima $(\pi_j, \mu_j, \Sigma_j)$, com incremento monótono da log-verossimilhança. DBSCAN e a definição de ponto-núcleo via $\varepsilon$-vizinhança e `minPts`, robusto a ruído e a formas não convexas. O coeficiente de silhueta:
$$s(i) = \frac{b(i) - a(i)}{\max\{a(i), b(i)\}}$$
onde $a(i)$ é a distância média intra-cluster e $b(i)$ a distância média ao cluster vizinho mais próximo. *Isolation Forest*: anomalias exigem menos partições aleatórias para serem isoladas, e o escore deriva do comprimento médio de caminho $\mathbb{E}[h(x)]$ normalizado. *Autoencoder* como compressão não-linear que minimiza $\|x - g(f(x))\|^2$ com gargalo dimensional — a representação latente $f(x)$ como *embedding*.

**Aplicação prática** — Implementação de pipeline de segmentação com escolha de $k$ por silhueta, comparação k-means vs. DBSCAN em dados não convexos e detecção de anomalias com *Isolation Forest*.

## Código de Exemplo em Python (Segmentação e Anomalias)
```python
import numpy as np
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.ensemble import IsolationForest
from sklearn.metrics import silhouette_score

rng = np.random.RandomState(42)

# 1. Escolha de k por silhueta em dados convexos
X_blobs, _ = make_blobs(n_samples=600, centers=4, cluster_std=1.0, random_state=42)
for k in range(2, 7):
    rotulos = KMeans(n_clusters=k, n_init=10, random_state=42).fit_predict(X_blobs)
    print(f"k={k} | silhueta média = {silhouette_score(X_blobs, rotulos):.3f}")

# 2. Falha do k-means em formas não convexas vs. DBSCAN
X_luas, _ = make_moons(n_samples=400, noise=0.06, random_state=42)
km = KMeans(n_clusters=2, n_init=10, random_state=42).fit_predict(X_luas)
db = DBSCAN(eps=0.2, min_samples=8).fit_predict(X_luas)
print("Silhueta k-means (luas):", round(silhouette_score(X_luas, km), 3))
print("Grupos DBSCAN encontrados:", len(set(db) - {-1}), "| pontos de ruído:", int((db == -1).sum()))

# 3. Detecção de anomalias com Isolation Forest
X_normal = rng.normal(0, 1, size=(500, 2))
X_anomalo = rng.uniform(-6, 6, size=(15, 2))
X_total = np.vstack([X_normal, X_anomalo])
iso = IsolationForest(contamination=0.03, random_state=42).fit(X_total)
escores = iso.decision_function(X_total)
print("Escore médio (normais):", round(escores[:500].mean(), 3),
      "| escore médio (anômalos):", round(escores[500:].mean(), 3))
```

## Casos práticos
- **Caso 1**: Uma operadora de telecom segmenta clientes com k-means e obtém um cluster gigante e três minúsculos. Diagnosticar o efeito de variáveis em escalas diferentes (ausência de padronização) e de outliers sobre os centróides.
- **Caso 2**: Um sistema antifraude baseado em *Isolation Forest* passa a marcar como anômalos clientes legítimos após uma campanha promocional que mudou o padrão de compra. Discutir deriva de distribuição em detectores não supervisionados e recalibração do parâmetro de contaminação.
- **Caso 3**: Uma equipe forense agrupa documentos apreendidos usando *embeddings* textuais e agrupamento hierárquico. Justificar a escolha da distância de cosseno sobre a euclidiana em vetores esparsos de alta dimensão.
- **Caso 4 (Caso Multivariável)**: Projeto de segmentação de ocorrências criminais com variáveis contínuas (hora, valor), categóricas (tipo penal) e geográficas (lat/lon). Desenhar a metodologia contendo: (a) estratégia de codificação e padronização mista; (b) escolha entre k-means, GMM e DBSCAN com justificativa pela geometria esperada dos grupos; (c) protocolo de validação interna e inspeção qualitativa com especialista de domínio.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 23053:2022 | Estabelece o framework de referência para sistemas que usam aprendizado de máquina, incluindo etapas de preparação e modelagem não supervisionada. | Estrutura a documentação de pipelines de segmentação e detecção de anomalias em auditorias de conformidade. |
| ANPD / LGPD (perfilamento) | A formação de perfis por agrupamento de titulares configura tratamento de dados e sujeita-se aos princípios de finalidade e não discriminação. | Segmentações de clientes exigem base legal documentada e avaliação de impacto quando afetam ofertas e preços. |

## Doutrina / Referências Técnicas
- HASTIE, Trevor; TIBSHIRANI, Robert & FRIEDMAN, Jerome. *The Elements of Statistical Learning*. 2ª Edição. Springer, 2009 (Capítulo 14 — Unsupervised Learning).
- BISHOP, Christopher M. *Pattern Recognition and Machine Learning*. Springer, 2006 (Capítulo 9 — Mixture Models and EM).
- LIU, Fei Tony; TING, Kai Ming & ZHOU, Zhi-Hua. *Isolation Forest*. IEEE International Conference on Data Mining (ICDM), 2008 (paper seminal).
- ESTER, Martin et al. *A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise (DBSCAN)*. KDD, 1996 (paper seminal).

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), art. 6º, IX (não discriminação) e art. 12 (anonimização): agrupamentos que reidentifiquem titulares descaracterizam a anonimização.
- Lei nº 13.709/2018 (LGPD), art. 20: revisão de decisões automatizadas baseadas em perfis, inclusive perfis construídos por agrupamento não supervisionado.

## Prática Profissional
- Atuação como Cientista de Dados em segmentação de clientes, detecção de fraude e triagem de anomalias operacionais, entregando pipelines reprodutíveis com critérios internos de validação e documentação das escolhas de distância, escala e número de grupos.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Não existe algoritmo de agrupamento universalmente superior (teorema *no free lunch* aplicado a clustering); a escolha deve derivar da geometria assumida dos grupos e da robustez desejada a ruído.
- **Debate ativo pós-2023:** Se *embeddings* de modelos de fundação (texto e imagem) tornam obsoletos os pipelines clássicos de engenharia de atributos para clustering — agrupar no espaço latente de um modelo pré-treinado frequentemente supera o espaço bruto, mas herda vieses e é de difícil auditoria.
- **Debate ativo:** A confiabilidade de métricas internas (silhueta, Davies-Bouldin) como proxy de utilidade real do agrupamento, dado que otimizá-las pode divergir do objetivo de negócio ou pericial.

## Questões Avançadas
- Por que o passo de Expectation-Maximization nunca diminui a log-verossimilhança, e em que sentido o k-means é um caso-limite de GMM com covariâncias esféricas e responsabilidades binárias? *(pesquisa/matemática)*
- Em detecção de anomalias sem rótulos, como distinguir metodologicamente "anomalia estatística" de "evento de interesse operacional" sem contaminar o detector com supervisão implícita? *(pesquisa)*

## Exercícios
- Demonstre que a atualização de centróides do k-means (média dos pontos atribuídos) é a solução ótima do subproblema de minimização da inércia com atribuições fixas.
- Implemente em Python o coeficiente de silhueta manualmente (sem `silhouette_score`) e valide o resultado contra o scikit-learn no dataset de blobs.
- Compare k-means, GMM e DBSCAN no dataset `make_moons` variando ruído, e produza uma tabela com silhueta, número de grupos encontrados e pontos descartados como ruído.
- Para o caso multivariável de ocorrências criminais, escreva o pseudocódigo do pipeline completo, incluindo o tratamento de variáveis categóricas e a etapa de validação com especialista.

## Tags
#MachineLearning #IA #DeepLearning
