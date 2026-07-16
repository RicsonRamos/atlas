# ML-04 — Redes Neurais e Deep Learning

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-03
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os fundamentos matemáticos e computacionais das redes neurais artificiais. Estuda o perceptron multicamadas (MLP), funções de ativação (sigmoide, tanh, ReLU e variantes) e o teorema da aproximação universal. Aprofunda o algoritmo de retropropagação (*backpropagation*) como aplicação sistemática da regra da cadeia sobre o grafo computacional. Cobre otimizadores de primeira ordem (SGD, momentum, RMSProp, Adam), inicialização de pesos, e as patologias de gradiente (desvanecimento e explosão). Aborda técnicas de regularização específicas de redes profundas: *dropout*, *batch normalization*, *early stopping* e aumento de dados. Introduz as arquiteturas convolucionais (CNN) e recorrentes (RNN/LSTM) em nível de fundamento, preparando ML-05 e ML-06.

## Objetivos
1. Derivar a retropropagação para um MLP de uma camada oculta e explicar o papel do grafo computacional na diferenciação automática.
2. Comparar otimizadores (SGD, momentum, Adam) quanto a velocidade de convergência, sensibilidade a hiperparâmetros e generalização.
3. Diagnosticar e mitigar sobreajuste e patologias de gradiente com dropout, batch normalization, inicialização adequada e early stopping.

## Pré-requisitos
ML-03 (noção de otimização iterativa por gradiente e regularização).

## Conteúdo programático

**Fundamentos** — O neurônio artificial como composição de transformação afim e não-linearidade $a = \phi(Wx + b)$; profundidade como composição de funções e aprendizado hierárquico de representações; o teorema da aproximação universal (Cybenko/Hornik) e por que ele não garante aprendizado eficiente.

**Teoria** — A retropropagação como regra da cadeia no grafo computacional. Para a camada $l$ com pré-ativação $z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$, o erro retropropagado é
$$\delta^{(l)} = \left(W^{(l+1)}\right)^{T} \delta^{(l+1)} \odot \phi'\!\left(z^{(l)}\right), \qquad \frac{\partial \mathcal{L}}{\partial W^{(l)}} = \delta^{(l)} \left(a^{(l-1)}\right)^{T}$$
A atualização de Adam com momentos adaptativos:
$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t, \quad v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2, \quad \theta_t = \theta_{t-1} - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$$
O desvanecimento de gradiente como produto de jacobianas com norma inferior a 1 ao longo da profundidade, e o papel da ReLU e das inicializações de Glorot/He na preservação da escala do sinal. *Dropout* como treinamento de um ensemble implícito de sub-redes com máscara de Bernoulli $p$; *batch normalization* como reparametrização que estabiliza a distribuição das pré-ativações. Convolução como compartilhamento de pesos com equivariância translacional; recorrência como compartilhamento de pesos no tempo.

**Aplicação prática** — Implementação de um MLP com retropropagação manual em NumPy (sem frameworks), validando o gradiente analítico por diferenças finitas.

## Código de Exemplo em Python (MLP com Backpropagation Manual)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. Dados sintéticos: problema XOR expandido com ruído
X = rng.uniform(-1, 1, size=(400, 2))
y = ((X[:, 0] * X[:, 1]) > 0).astype(float).reshape(-1, 1)  # classes em quadrantes

# 2. Inicialização de He para uma camada oculta ReLU
n_oculta = 16
W1 = rng.normal(0, np.sqrt(2 / 2), size=(2, n_oculta)); b1 = np.zeros((1, n_oculta))
W2 = rng.normal(0, np.sqrt(2 / n_oculta), size=(n_oculta, 1)); b2 = np.zeros((1, 1))

def sigmoide(z): return 1 / (1 + np.exp(-z))

eta = 0.5
for epoca in range(2001):
    # Forward
    z1 = X @ W1 + b1
    a1 = np.maximum(0, z1)              # ReLU
    z2 = a1 @ W2 + b2
    a2 = sigmoide(z2)                   # probabilidade
    perda = -np.mean(y * np.log(a2 + 1e-9) + (1 - y) * np.log(1 - a2 + 1e-9))

    # Backward (regra da cadeia)
    delta2 = (a2 - y) / len(X)                      # dL/dz2 (entropia cruzada + sigmoide)
    dW2 = a1.T @ delta2; db2 = delta2.sum(0, keepdims=True)
    delta1 = (delta2 @ W2.T) * (z1 > 0)             # dL/dz1 com derivada da ReLU
    dW1 = X.T @ delta1; db1 = delta1.sum(0, keepdims=True)

    # Atualização SGD (batch completo)
    W2 -= eta * dW2; b2 -= eta * db2
    W1 -= eta * dW1; b1 -= eta * db1

    if epoca % 500 == 0:
        acc = ((a2 > 0.5) == y).mean()
        print(f"época {epoca:4d} | perda = {perda:.4f} | acurácia = {acc:.3f}")
```

## Casos práticos
- **Caso 1**: Uma rede de 12 camadas com ativação sigmoide não aprende (perda estagnada). Diagnosticar desvanecimento de gradiente pela norma dos gradientes por camada e propor ReLU + inicialização de He.
- **Caso 2**: Um MLP atinge 99% de acurácia no treino e 71% na validação. Comparar o efeito isolado de dropout, weight decay e early stopping sobre a lacuna de generalização.
- **Caso 3**: Após trocar SGD por Adam, o time observa convergência mais rápida porém acurácia final de teste levemente inferior. Discutir o debate generalização de Adam vs. SGD com momentum e o papel do agendamento de taxa de aprendizado.
- **Caso 4 (Caso Multivariável)**: Projeto de rede neural para triagem de laudos com dados tabulares, texto curto e classe rara. Desenhar: (a) arquitetura (ramos por tipo de entrada e fusão); (b) função de perda ponderada para desbalanceamento; (c) protocolo de treino com early stopping e busca de taxa de aprendizado; (d) critério de comparação justa contra o baseline de gradient boosting (ML-03).

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 22989:2022 | Terminologia normativa para redes neurais, treinamento e inferência em sistemas de IA. | Uniformiza a descrição de arquiteturas em documentação técnica de conformidade. |
| ISO/IEC 24028:2020 | Trustworthiness em IA: robustez e limites de confiabilidade de modelos não determinísticos. | Exige registro de sementes, versões e condições de treino para reprodutibilidade de redes profundas. |
| ANPD / LGPD, art. 20 | Decisões automatizadas por redes neurais devem ser explicáveis em grau compatível com o risco. | Motiva o uso conjunto com técnicas de XAI (ML-11) quando a rede decide sobre direitos individuais. |

## Doutrina / Referências Técnicas
- GOODFELLOW, Ian; BENGIO, Yoshua & COURVILLE, Aaron. *Deep Learning*. MIT Press, 2016 (Capítulos 6-8 — obra de referência).
- RUMELHART, David E.; HINTON, Geoffrey E. & WILLIAMS, Ronald J. *Learning Representations by Back-propagating Errors*. Nature, v. 323, 1986 (paper seminal).
- LECUN, Yann; BENGIO, Yoshua & HINTON, Geoffrey. *Deep Learning*. Nature, v. 521, p. 436-444, 2015.
- KINGMA, Diederik P. & BA, Jimmy. *Adam: A Method for Stochastic Optimization*. ICLR, 2015.

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), art. 20: revisão de decisões automatizadas — aplicável a classificadores neurais em crédito, saúde e seleção.
- Regulamento (UE) 2024/1689 (EU AI Act), arts. 9-15: requisitos de gestão de risco, dados e documentação técnica para sistemas de alto risco baseados em redes profundas.

## Prática Profissional
- Atuação como ML Engineer no treino e depuração de redes profundas: curvas de aprendizado, verificação de gradiente, tuning de otimizadores e entrega de modelos reprodutíveis (sementes e versões fixadas) prontos para produtização (trilha OPS).

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Redes profundas exigem validação empírica disciplinada (curvas de treino/validação, verificação de gradiente, ablações) — intuições analíticas de modelos rasos não se transferem diretamente.
- **Debate ativo pós-2023:** O fenômeno de *grokking* e a dupla descida (*double descent*) — por que redes sobreparametrizadas generalizam após memorizar, desafiando a teoria clássica de viés-variância; explicações via regularização implícita do SGD seguem disputadas.
- **Debate ativo:** Leis de escala (*scaling laws*) versus inovação arquitetural — se ganhos futuros virão majoritariamente de mais dados/computação ou de novas arquiteturas e objetivos de treino.

## Questões Avançadas
- Derive a expressão $\delta^{(l)}$ da retropropagação para uma rede com ativação tanh e mostre onde surge o fator de desvanecimento. *(pesquisa/matemática)*
- Por que batch normalization permite taxas de aprendizado maiores, e qual é a crítica ao argumento original de "covariate shift interno"? *(pesquisa)*
- Em que sentido dropout aproxima a média de um ensemble exponencialmente grande de sub-redes, e quando essa aproximação falha? *(pesquisa)*

## Exercícios
- Valide numericamente o gradiente do script da disciplina por diferenças finitas centradas ($\epsilon = 10^{-5}$) para 3 pesos escolhidos.
- Modifique o script para incluir momentum ($\beta = 0{,}9$) e compare o número de épocas até perda < 0,10.
- Treine o mesmo MLP com inicialização $\mathcal{N}(0, 1)$ (sem He) e explique o comportamento observado da perda inicial.
- Para o caso multivariável de triagem de laudos, especifique a matriz de custo de erro e a métrica de seleção de limiar de decisão.

## Tags
#MachineLearning #IA #DeepLearning
