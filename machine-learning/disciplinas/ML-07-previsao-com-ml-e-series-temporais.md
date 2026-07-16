# ML-07 — Previsão com ML e Séries Temporais

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre a previsão (*forecasting*) com aprendizado de máquina, em recorte complementar aos modelos estatísticos clássicos (ARIMA/ETS, tratados na trilha de Estatística — EST-13): aqui o foco é transformar previsão em problema de regressão supervisionada. Estuda engenharia de atributos temporais: defasagens (*lags*), janelas móveis (médias, desvios), sazonalidade codificada e variáveis de calendário. Aprofunda a validação correta para dados dependentes do tempo: partição temporal, validação por janelas deslizantes/expansíveis e as armadilhas de vazamento de futuro. Cobre *gradient boosting* para previsão, modelos globais multi-série, previsão probabilística por quantis e métricas (MAE, RMSE, MAPE, pinball loss). Introduz modelos sequenciais neurais (RNN/LSTM) em nível de fundamento e o baseline ingênuo como critério de honestidade.

## Objetivos
1. Construir a matriz de atributos temporais (lags, janelas, calendário) que converte uma série em problema supervisionado sem vazamento de informação futura.
2. Projetar protocolos de backtesting com janelas deslizantes e comparar modelos contra baselines ingênuos e sazonais com métricas adequadas.
3. Produzir previsões probabilísticas por regressão quantílica e avaliá-las com perda pinball, comunicando incerteza a decisores.

## Pré-requisitos
ML-01 (regressão, validação e sobreajuste). Recomenda-se EST-13 (Séries Temporais clássicas) da trilha de Estatística para o recorte ARIMA/ETS.

## Conteúdo programático

**Fundamentos** — A estrutura de dependência temporal e por que embaralhar dados destrói a validade da avaliação; a decomposição informal tendência + sazonalidade + resíduo como guia de engenharia de atributos; baselines ingênuo ($\hat{y}_{t+1} = y_t$) e sazonal ($\hat{y}_{t+1} = y_{t+1-m}$) como piso de desempenho.

**Teoria** — A redução de previsão a regressão: aprender $f$ tal que
$$\hat{y}_{t+h} = f\!\left(y_t, y_{t-1}, \dots, y_{t-p},\; \bar{y}_{t}^{(w)},\; s_t,\; c_t\right)$$
onde $\bar{y}_{t}^{(w)}$ são estatísticas de janela, $s_t$ codificações sazonais (seno/cosseno de período $m$) e $c_t$ variáveis de calendário. Estratégias multi-horizonte: recursiva (realimenta previsões, acumula erro) versus direta (um modelo por horizonte $h$). Validação temporal: janelas de origem deslocada (*rolling origin*), nunca K-fold aleatório. Previsão probabilística por regressão quantílica, minimizando a perda pinball para o quantil $\tau$:
$$\mathcal{L}_\tau(y, \hat{y}) = \max\big(\tau\,(y - \hat{y}),\; (\tau - 1)\,(y - \hat{y})\big)$$
Métricas: MAE, RMSE, MAPE (e sua falha perto de zero), MASE (escalada pelo baseline ingênuo). Modelos globais: um único modelo treinado em muitas séries correlatas, com identificador de série como atributo — o paradigma vencedor das competições M5.

**Aplicação prática** — Pipeline completo de previsão com atributos de lag/janela, `TimeSeriesSplit` e comparação contra baseline sazonal.

## Código de Exemplo em Python (Backtesting com Janelas Temporais)
```python
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error

rng = np.random.RandomState(42)

# 1. Série sintética diária: tendência + sazonalidade semanal + ruído
n = 730
t = np.arange(n)
serie = 100 + 0.05 * t + 12 * np.sin(2 * np.pi * t / 7) + rng.normal(0, 3, n)
df = pd.DataFrame({"y": serie})

# 2. Engenharia de atributos temporais (somente informação passada)
for lag in [1, 7, 14]:
    df[f"lag_{lag}"] = df["y"].shift(lag)
df["media_movel_7"] = df["y"].shift(1).rolling(7).mean()
df["dia_semana_sen"] = np.sin(2 * np.pi * (t % 7) / 7)
df["dia_semana_cos"] = np.cos(2 * np.pi * (t % 7) / 7)
df = df.dropna().reset_index(drop=True)

X, y = df.drop(columns="y").values, df["y"].values

# 3. Backtesting com 5 janelas temporais (rolling origin)
tscv = TimeSeriesSplit(n_splits=5, test_size=60)
mae_modelo, mae_baseline = [], []
for treino, teste in tscv.split(X):
    gbm = GradientBoostingRegressor(n_estimators=300, learning_rate=0.05,
                                    max_depth=3, random_state=42)
    gbm.fit(X[treino], y[treino])
    pred = gbm.predict(X[teste])
    mae_modelo.append(mean_absolute_error(y[teste], pred))
    # baseline sazonal: valor de 7 dias atras (coluna lag_7)
    idx_lag7 = list(df.drop(columns="y").columns).index("lag_7")
    mae_baseline.append(mean_absolute_error(y[teste], X[teste][:, idx_lag7]))

print(f"MAE médio GBM:              {np.mean(mae_modelo):.3f}")
print(f"MAE médio baseline sazonal: {np.mean(mae_baseline):.3f}")
print(f"Ganho relativo: {100 * (1 - np.mean(mae_modelo)/np.mean(mae_baseline)):.1f}%")
```

## Casos práticos
- **Caso 1**: Um modelo de previsão de demanda com R² de 0,98 em validação aleatória colapsa em produção. Diagnosticar o vazamento temporal do K-fold embaralhado e reconstruir a avaliação com janelas deslizantes.
- **Caso 2**: A previsão de ocorrências policiais por região funciona bem no agregado, mas falha em bairros de baixa contagem. Discutir MAPE perto de zero, métricas para contagens (Poisson deviance) e agregação hierárquica.
- **Caso 3**: Um varejista compara um modelo por loja contra um modelo global com 800 lojas. Analisar o trade-off entre especialização local e força estatística compartilhada do modelo global.
- **Caso 4 (Caso Multivariável)**: Projeto de previsão de chamadas 190 por hora, com feriados, eventos de massa e clima. Desenhar: (a) atributos de calendário e exógenos com disponibilidade garantida no momento da previsão; (b) previsão por quantis (P50/P90) para dimensionamento de plantão; (c) backtesting com pelo menos 8 origens e comparação com baseline sazonal semanal; (d) plano de monitoramento de deriva pós-implantação (ligação com OPS-04).

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 23053:2022 | Ciclo de vida de ML inclui especificação de dados de treino e avaliação — crítica em dados temporais. | Documentação deve explicitar o corte temporal de treino/teste para evitar avaliação viciada. |
| Regulamento (UE) 2024/1689 (EU AI Act), Anexo III | Previsão aplicada a policiamento e serviços essenciais pode configurar alto risco. | Sistemas de previsão de demanda policial exigem gestão de risco, registro e supervisão humana. |
| ANPD / LGPD, art. 6º, I (finalidade) | Uso de dados históricos pessoais para previsão exige compatibilidade com a finalidade original da coleta. | Séries derivadas de dados individuais (ex.: chamadas) devem ser agregadas/anonimizadas quando possível. |

## Doutrina / Referências Técnicas
- HYNDMAN, Rob J. & ATHANASOPOULOS, George. *Forecasting: Principles and Practice*. 3ª Edição. OTexts, 2021 (obra de referência aberta).
- BOX, George E. P. & JENKINS, Gwilym M. *Time Series Analysis: Forecasting and Control*. Holden-Day, 1970 (clássico seminal).
- BERGMEIR, Christoph & BENÍTEZ, José M. *On the Use of Cross-validation for Time Series Predictor Evaluation*. Information Sciences, v. 191, 2012.
- MAKRIDAKIS, Spyros; SPILIOTIS, Evangelos & ASSIMAKOPOULOS, Vassilios. *The M5 Accuracy Competition: Results, Findings and Conclusions*. International Journal of Forecasting, v. 38, n. 4, 2022.

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), arts. 6º e 12: finalidade e anonimização em séries derivadas de dados pessoais.
- Regulamento (UE) 2024/1689 (EU AI Act), Anexo III: classificação de risco para previsão em segurança pública e infraestrutura crítica.

## Prática Profissional
- Atuação como Cientista de Dados / ML Engineer em previsão de demanda, capacidade e risco operacional, entregando pipelines de backtesting reprodutíveis, previsões por quantis para decisão sob incerteza e relatórios de comparação contra baselines.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Nenhum modelo de previsão deve ser reportado sem comparação contra baseline ingênuo/sazonal (MASE); as competições M demonstraram repetidamente que métodos simples vencem modelos complexos mal validados.
- **Debate ativo pós-2023:** Modelos de fundação para séries temporais (TimeGPT 2023, Chronos e Moirai 2024) — se pré-treino massivo em séries heterogêneas transfere de verdade para domínios específicos ou se gradient boosting com bons atributos permanece imbatível em custo-benefício; avaliações independentes divergem.
- **Debate ativo:** Previsão pontual versus probabilística como padrão de entrega — a comunidade converge para quantis, mas a adoção por decisores e o desenho de incentivos de acurácia seguem abertos.

## Questões Avançadas
- Demonstre que a perda pinball é minimizada em expectativa pelo quantil $\tau$ da distribuição condicional. *(pesquisa/matemática)*
- Por que a estratégia recursiva multi-horizonte acumula viés quando o modelo de 1 passo é enviesado, e em que condições a estratégia direta é preferível? *(pesquisa)*
- Que salvaguardas metodológicas impedem que a previsão de ocorrências policiais realimente o viés de patrulhamento histórico (feedback loop)? *(pesquisa/ético — ligação com GOV-02)*

## Exercícios
- Construa manualmente (papel) a matriz de treino com lags {1, 7} e janela móvel de 3 para uma série de 12 pontos, marcando as linhas descartadas.
- Modifique o script para prever o horizonte h=7 com estratégia direta e compare o MAE contra a estratégia recursiva.
- Substitua o GBM por regressão quantílica (`GradientBoostingRegressor(loss="quantile")`) para P10/P50/P90 e calcule a cobertura empírica do intervalo.
- Para o caso das chamadas 190, especifique quais variáveis exógenas estariam disponíveis às 18h do dia anterior e quais vazariam futuro.

## Tags
#MachineLearning #IA #DeepLearning
