# ML-03 — Ensembles e Gradient Boosting

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda a combinação de múltiplos modelos-base para redução de variância e de viés. Cobre *bagging* e Florestas Aleatórias (Random Forest) como agregação de árvores descorrelacionadas via *bootstrap* e subamostragem de atributos. Aprofunda o *boosting* como otimização sequencial no espaço de funções: AdaBoost e a formulação de *gradient boosting* (GBM), incluindo as implementações modernas XGBoost, LightGBM e CatBoost (regularização, crescimento por folha, tratamento nativo de categóricas). Aborda *stacking* e combinação heterogênea de modelos. Cobre a interpretação de ensembles: importância por permutação e valores SHAP (Shapley Additive Explanations), com suas garantias e limitações.

## Objetivos
1. Explicar por que a agregação de modelos descorrelacionados reduz a variância do preditor e demonstrar o papel da subamostragem de atributos na Random Forest.
2. Formular o *gradient boosting* como descida de gradiente no espaço de funções e ajustar seus hiperparâmetros críticos (taxa de aprendizado, profundidade, número de estimadores) com validação adequada.
3. Interpretar modelos de ensemble por importância de permutação e valores SHAP, reconhecendo armadilhas de atributos correlacionados.

## Pré-requisitos
ML-01 (viés-variância, árvores de decisão, validação cruzada).

## Conteúdo programático

**Fundamentos** — Sabedoria de comitês: erro de um agregado de $M$ preditores com variância individual $\sigma^2$ e correlação média $\rho$; árvores como modelos de baixa estabilidade (alta variância) ideais para agregação; a diferença estrutural entre *bagging* (paralelo, reduz variância) e *boosting* (sequencial, reduz viés).

**Teoria** — A variância do ensemble de médias:
$$\text{Var}\left[\frac{1}{M}\sum_{m=1}^{M} \hat{f}_m(x)\right] = \rho\,\sigma^2 + \frac{1-\rho}{M}\,\sigma^2$$
mostrando que o termo residual $\rho\,\sigma^2$ só cai com descorrelação — a motivação do sorteio de $\sqrt{p}$ atributos por nó na Random Forest. O *gradient boosting* como aproximação funcional iterativa: dado o risco $\mathcal{L} = \sum_i \ell(y_i, F(x_i))$, cada iteração ajusta uma árvore $h_m$ ao gradiente negativo (pseudo-resíduo)
$$r_{im} = -\left[\frac{\partial\, \ell(y_i, F(x_i))}{\partial F(x_i)}\right]_{F = F_{m-1}}, \qquad F_m(x) = F_{m-1}(x) + \nu\, h_m(x)$$
com taxa de aprendizado $\nu$ controlando o *shrinkage*. A função-objetivo regularizada do XGBoost com expansão de Taylor de 2ª ordem e penalização $\Omega(h) = \gamma T + \tfrac{1}{2}\lambda \|w\|^2$ sobre número de folhas e pesos. Valores SHAP como distribuição do ganho de predição entre atributos segundo o valor de Shapley da teoria dos jogos cooperativos, com as propriedades de eficiência e consistência.

**Aplicação prática** — Comparação controlada entre Random Forest e Gradient Boosting em dados tabulares sintéticos, com curva de validação sobre a taxa de aprendizado e importância por permutação.

## Código de Exemplo em Python (RF vs. GBM e Importância por Permutação)
```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.inspection import permutation_importance

X, y = make_classification(n_samples=1500, n_features=15, n_informative=6,
                           n_redundant=4, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# 1. Random Forest (bagging + subamostragem de atributos)
rf = RandomForestClassifier(n_estimators=300, max_features="sqrt", random_state=42)
print("RF  | AUC média (5-fold):",
      round(cross_val_score(rf, X_tr, y_tr, cv=5, scoring="roc_auc").mean(), 4))

# 2. Gradient Boosting com shrinkage — efeito da taxa de aprendizado
for nu in [1.0, 0.1, 0.01]:
    gbm = GradientBoostingClassifier(n_estimators=200, learning_rate=nu,
                                     max_depth=3, random_state=42)
    auc = cross_val_score(gbm, X_tr, y_tr, cv=5, scoring="roc_auc").mean()
    print(f"GBM | learning_rate={nu:<5} AUC média = {auc:.4f}")

# 3. Importância por permutação no conjunto de teste (evita viés de treino)
gbm_final = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                       max_depth=3, random_state=42).fit(X_tr, y_tr)
imp = permutation_importance(gbm_final, X_te, y_te, n_repeats=20,
                             random_state=42, scoring="roc_auc")
top = np.argsort(imp.importances_mean)[::-1][:5]
for i in top:
    print(f"Atributo x{i}: queda média de AUC = {imp.importances_mean[i]:.4f}")
```

## Casos práticos
- **Caso 1**: Um GBM de risco de crédito com `learning_rate=1.0` e 50 árvores supera o baseline no treino, mas degrada em produção. Diagnosticar a relação *shrinkage* × número de estimadores e propor re-tuning com *early stopping*.
- **Caso 2**: Em um modelo de Random Forest, a importância por impureza (Gini) aponta como principal atributo um identificador de alta cardinalidade sem valor causal. Explicar o viés de cardinalidade e justificar a migração para importância por permutação.
- **Caso 3**: Dois atributos fortemente correlacionados dividem entre si os valores SHAP, levando o gestor a subestimar o fator de risco real. Discutir a interpretação de SHAP sob multicolinearidade.
- **Caso 4 (Caso Multivariável)**: Projeto de detecção de evasão fiscal com dados tabulares mistos, classes desbalanceadas (2% de positivos) e exigência regulatória de explicação individual. Desenhar a solução contendo: (a) escolha entre RF, XGBoost/LightGBM e stacking com justificativa; (b) estratégia de reamostragem/pesos e métrica principal (PR-AUC); (c) protocolo de explicação por SHAP com salvaguardas para atributos correlacionados; (d) validação temporal para evitar vazamento.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 23053:2022 | Framework de sistemas de ML cobre seleção, treino e avaliação de modelos de ensemble no ciclo de vida. | Exige rastreabilidade de hiperparâmetros e dados de treino em documentação de conformidade. |
| TJUE, C-634/21 (SCHUFA, 2023) | Escoragem automatizada de crédito constitui decisão automatizada sob o art. 22 do GDPR. | Modelos de boosting usados em crédito na UE exigem salvaguardas de revisão humana e explicação — reforça a demanda por SHAP/XAI. |
| LGPD, art. 20 (ANPD) | Direito à revisão de decisões automatizadas e à informação sobre critérios utilizados. | A explicação por importância de atributos torna-se peça de compliance, não apenas ferramenta de depuração. |

## Doutrina / Referências Técnicas
- BREIMAN, Leo. *Random Forests*. Machine Learning, v. 45, p. 5-32, 2001 (paper seminal).
- FRIEDMAN, Jerome H. *Greedy Function Approximation: A Gradient Boosting Machine*. The Annals of Statistics, v. 29, n. 5, 2001 (paper seminal).
- CHEN, Tianqi & GUESTRIN, Carlos. *XGBoost: A Scalable Tree Boosting System*. KDD, 2016.
- LUNDBERG, Scott M. & LEE, Su-In. *A Unified Approach to Interpreting Model Predictions*. NeurIPS, 2017 (SHAP).
- ZHOU, Zhi-Hua. *Ensemble Methods: Foundations and Algorithms*. Chapman & Hall/CRC, 2012.

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), art. 20: revisão e explicação de decisões automatizadas de crédito, seleção e perfilamento.
- Regulamento (UE) 2024/1689 (EU AI Act): sistemas de escoragem de crédito e triagem classificados como alto risco (Anexo III), com requisitos de gestão de risco e documentação técnica.

## Prática Profissional
- Atuação como ML Engineer em modelagem tabular de risco (crédito, fraude, churn), entregando modelos de boosting tunados com *early stopping*, relatórios de importância por permutação/SHAP e documentação de hiperparâmetros para auditoria.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Para dados tabulares heterogêneos de porte pequeno/médio, ensembles de árvores (GBM) permanecem o baseline forte a ser batido, com custo computacional muito inferior ao de redes profundas.
- **Debate ativo pós-2023:** Se modelos de fundação para dados tabulares (como TabPFN e transformers tabulares, 2023-2025) finalmente superam gradient boosting fora de benchmarks curados — replicações independentes ainda divergem sobre robustez a escala e a deriva.
- **Debate ativo:** A validade de valores SHAP como "explicação" em sentido causal — a comunidade diverge sobre comunicar SHAP a leigos e reguladores como se indicasse contribuição causal do atributo.

## Questões Avançadas
- Derive o pseudo-resíduo do gradient boosting para a perda logística e mostre em que sentido o AdaBoost é um caso particular com perda exponencial. *(pesquisa/matemática)*
- Por que a descorrelação entre árvores impõe um teto assintótico à redução de variância do bagging, e como o parâmetro `max_features` negocia viés contra correlação? *(pesquisa)*
- Em que condições o stacking de modelos heterogêneos supera o melhor modelo individual, e como desenhar o *out-of-fold* para evitar vazamento no meta-modelo? *(pesquisa)*

## Exercícios
- Demonstre a fórmula da variância do ensemble correlacionado e calcule o limite quando $M \to \infty$.
- Reproduza o script da disciplina adicionando *early stopping* por conjunto de validação e compare o número efetivo de árvores para $\nu = 0{,}1$ e $\nu = 0{,}01$.
- Construa um exemplo sintético com dois atributos correlacionados ($\rho > 0{,}95$) e mostre numericamente a divisão de importância entre eles em SHAP e em permutação.
- Para o caso de evasão fiscal, escreva o plano de validação temporal (janelas de treino/teste) e a justificativa da métrica PR-AUC sobre ROC-AUC.

## Tags
#Ensembles #RandomForest #GradientBoosting #XGBoost
