# ML-05 — Visão Computacional

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-04
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre o processamento e a interpretação automática de imagens por redes convolucionais. Estuda a operação de convolução discreta, mapas de atributos (*feature maps*), *pooling*, campos receptivos e o cálculo de dimensões de saída. Aborda as arquiteturas de referência (LeNet, VGG, ResNet e as conexões residuais que viabilizam profundidade extrema) e os paradigmas das tarefas visuais: classificação, detecção de objetos (família R-CNN e detectores de estágio único como YOLO, em nível conceitual) e segmentação semântica/de instância. Cobre aumento de dados (*data augmentation*) e transferência de aprendizado (*transfer learning*). Discute a aplicação forense e investigativa — reconhecimento de padrões, OCR e análise de imagens — em ligação com as trilhas de Ciências Forenses e de Inteligência Analítica, incluindo seus limites de confiabilidade pericial.

## Objetivos
1. Explicar a convolução como operação linear com compartilhamento de pesos e equivariância translacional, calculando dimensões de saída, campos receptivos e número de parâmetros.
2. Comparar as arquiteturas clássicas (VGG, ResNet) e os paradigmas de detecção/segmentação quanto a custo computacional, precisão e casos de uso.
3. Avaliar criticamente o uso de visão computacional em contexto forense (OCR de placas, comparação de imagens), reconhecendo taxas de erro, vieses e requisitos de validação pericial.

## Pré-requisitos
ML-04 (redes neurais, retropropagação e regularização).

## Conteúdo programático

**Fundamentos** — A imagem como tensor $H \times W \times C$; por que MLPs densos são inviáveis para imagens (explosão de parâmetros e perda da estrutura espacial); hierarquia de atributos visuais: bordas → texturas → partes → objetos.

**Teoria** — A convolução discreta 2D com kernel $K$ de tamanho $k \times k$:
$$S(i, j) = (I * K)(i, j) = \sum_{m}\sum_{n} I(i+m,\, j+n)\, K(m, n)$$
Dimensão de saída com *padding* $p$ e *stride* $s$:
$$H_{out} = \left\lfloor \frac{H_{in} + 2p - k}{s} \right\rfloor + 1$$
O bloco residual da ResNet, $y = \mathcal{F}(x, \{W_i\}) + x$, como atalho de identidade que permite gradientes diretos através de dezenas de camadas, mitigando a degradação do treino em redes muito profundas. *Max pooling* como subamostragem com invariância local a translação. Detecção de objetos: proposta de regiões e refinamento (Faster R-CNN) versus regressão direta de caixas em grade (YOLO), com a métrica IoU (interseção sobre união) e mAP. Transferência de aprendizado: congelamento de camadas iniciais (atributos genéricos) e re-treino do topo (atributos específicos da tarefa).

**Aplicação prática** — Implementação da convolução 2D em NumPy puro, aplicando kernels clássicos de detecção de borda (Sobel) e verificando o cálculo de dimensões, sem dependência de frameworks de deep learning.

## Código de Exemplo em Python (Convolução 2D e Detecção de Bordas)
```python
import numpy as np

rng = np.random.RandomState(42)

def conv2d(imagem, kernel, stride=1):
    k = kernel.shape[0]
    h_out = (imagem.shape[0] - k) // stride + 1
    w_out = (imagem.shape[1] - k) // stride + 1
    saida = np.zeros((h_out, w_out))
    for i in range(h_out):
        for j in range(w_out):
            regiao = imagem[i*stride:i*stride+k, j*stride:j*stride+k]
            saida[i, j] = np.sum(regiao * kernel)
    return saida

# 1. Imagem sintética 32x32: um quadrado claro sobre fundo escuro
img = np.zeros((32, 32)); img[8:24, 8:24] = 1.0
img += rng.normal(0, 0.05, img.shape)  # ruído de sensor

# 2. Kernels de Sobel (gradientes horizontais e verticais)
sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=float)
sobel_y = sobel_x.T

gx = conv2d(img, sobel_x)
gy = conv2d(img, sobel_y)
magnitude = np.sqrt(gx**2 + gy**2)

print("Dimensão de entrada:", img.shape, "| dimensão de saída:", magnitude.shape)
print("Resposta média no interior (sem borda):", round(magnitude[10:20, 10:20].mean(), 3))
print("Resposta máxima (nas bordas do quadrado):", round(magnitude.max(), 3))

# 3. Verificação da fórmula de dimensão: (32 + 2*0 - 3)//1 + 1 = 30
assert magnitude.shape == (30, 30)
print("Fórmula de dimensão de saída verificada.")
```

## Casos práticos
- **Caso 1**: Um classificador de imagens médicas com 96% de acurácia falha em hospital com outro fabricante de scanner. Diagnosticar deslocamento de domínio (*domain shift*) e propor aumento de dados e validação multi-sítio.
- **Caso 2**: Um sistema de OCR de placas veiculares apresenta taxa de erro 4 vezes maior à noite e sob chuva. Discutir estratificação da avaliação por condição de captura e o risco jurídico de autuação automática sem revisão.
- **Caso 3**: Uma equipe treina um detector YOLO para armas em CFTV e observa falsos positivos sistemáticos com guarda-chuvas. Analisar viés de coocorrência do conjunto de treino e desenho de conjunto negativo difícil (*hard negatives*).
- **Caso 4 (Caso Multivariável)**: Projeto pericial de comparação automática de imagens de câmeras corporais com padrões de referência. Desenhar: (a) pipeline com pré-processamento e transferência de aprendizado; (b) protocolo de validação com taxas de falso positivo/negativo estratificadas por resolução e iluminação; (c) limites do laudo — o sistema como triagem, nunca como prova autônoma (ligação com a trilha de Ciências Forenses); (d) documentação de versão e semente para reprodutibilidade.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Regulamento (UE) 2024/1689 (EU AI Act), art. 5 | Proíbe identificação biométrica remota em tempo real em espaços públicos, salvo exceções taxativas. | Sistemas de reconhecimento facial para segurança pública enfrentam vedação como regra na UE; projetos brasileiros observam o precedente. |
| ISO/IEC 24027:2021 | Viés em sistemas de IA e tomada de decisão auxiliada por IA — inclui vieses de dados de imagem. | Exige avaliação documentada de desempenho estratificado (etnia, iluminação, ângulo) em sistemas de visão. |
| ANPD / LGPD (dados biométricos) | Imagem facial é dado pessoal sensível (art. 5º, II), exigindo base legal qualificada. | Coleta e treino com faces demandam consentimento específico ou hipóteses legais estritas. |

## Doutrina / Referências Técnicas
- SZELISKI, Richard. *Computer Vision: Algorithms and Applications*. 2ª Edição. Springer, 2022 (obra de referência).
- LECUN, Yann et al. *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, v. 86, n. 11, 1998 (LeNet — paper seminal).
- HE, Kaiming et al. *Deep Residual Learning for Image Recognition*. CVPR, 2016 (ResNet).
- REN, Shaoqing et al. *Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks*. NeurIPS, 2015.
- GOODFELLOW, Ian; BENGIO, Yoshua & COURVILLE, Aaron. *Deep Learning*. MIT Press, 2016 (Capítulo 9 — Convolutional Networks).

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), art. 5º, II e art. 11: tratamento de dado biométrico (imagem facial) como dado sensível.
- Regulamento (UE) 2024/1689 (EU AI Act), art. 5 e Anexo III: vedações e classificação de alto risco para biometria e vigilância.
- Lei nº 12.965/2014 (Marco Civil), art. 7º: proteção da intimidade na coleta de imagens em serviços conectados.

## Prática Profissional
- Atuação como ML Engineer / Cientista de Dados em triagem visual (inspeção industrial, OCR documental, análise de CFTV), entregando modelos com avaliação estratificada por condição de captura e relatórios de limitação de uso para fins probatórios.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Transferência de aprendizado a partir de modelos pré-treinados é o ponto de partida padrão; treinar visão do zero só se justifica com dados massivos e domínio muito distante do natural.
- **Debate ativo pós-2023:** Vision Transformers (ViT) e modelos de fundação visual (como o Segment Anything Model, 2023) versus CNNs — se a indução convolucional ainda é vantajosa em regimes de poucos dados, ou se atenção + escala domina em todos os cenários.
- **Debate ativo:** Confiabilidade pericial do reconhecimento facial — divergência entre desempenho de benchmark e desempenho operacional (imagens degradadas), com casos documentados de prisões indevidas alimentando propostas de moratória.

## Questões Avançadas
- Demonstre que a convolução seguida de max pooling é equivariante a translações inteiras da entrada, mas não a rotações — e o que isso implica para aumento de dados. *(pesquisa/matemática)*
- Por que conexões residuais mitigam a degradação de redes profundas mesmo sem resolver o desvanecimento de gradiente clássico? *(pesquisa)*
- Quais requisitos metodológicos um laudo pericial baseado em visão computacional deve atender para não configurar prova de confiabilidade indeterminada? *(pesquisa/jurídico)*

## Exercícios
- Calcule à mão o número de parâmetros de uma camada convolucional com 64 filtros $3\times3$ sobre entrada de 32 canais (com viés) e compare com uma camada densa equivalente.
- Estenda o script da disciplina com stride 2 e padding 1, verificando a fórmula de dimensão de saída.
- Implemente max pooling $2\times2$ em NumPy e mostre seu efeito sobre a magnitude do gradiente de Sobel.
- Para o caso multivariável pericial, redija a seção de "limitações metodológicas" do laudo, cobrindo taxas de erro estratificadas e a vedação de uso como prova autônoma.

## Tags
#VisaoComputacional #CNN #TransferLearning #DeteccaoDeObjetos
