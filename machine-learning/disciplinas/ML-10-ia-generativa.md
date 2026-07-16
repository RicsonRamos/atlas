# ML-10 — IA Generativa

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-05
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os modelos que aprendem a distribuição dos dados para sintetizar novas amostras. Estuda as três famílias dominantes: autoencoders variacionais (VAE) e o limite inferior da evidência (ELBO); redes adversárias generativas (GAN) como jogo de minimax entre gerador e discriminador; e modelos de difusão, que aprendem a reverter um processo gradual de adição de ruído. Aborda geração condicional (classe, texto-para-imagem) e a avaliação de modelos generativos (FID, precisão/cobertura, avaliação humana). Discute os riscos: *deepfakes* e mídia sintética (ponte com N4 — perícia de autenticidade de vídeo, FOR-12), proveniência e marca d'água de conteúdo (C2PA), memorização de dados de treino e os litígios de direitos autorais — em ligação com N6 (GOV) e T03 (Direito Digital).

## Objetivos
1. Comparar VAEs, GANs e modelos de difusão quanto a objetivo de treino, estabilidade, qualidade e cobertura da distribuição gerada.
2. Formular o processo de difusão direto (forward) e explicar como a rede aprende o processo reverso de remoção de ruído.
3. Avaliar riscos de mídia sintética — deepfakes, memorização e proveniência — e as contramedidas técnicas e regulatórias de detecção e rotulagem.

## Pré-requisitos
ML-05 (redes convolucionais e representações visuais).

## Conteúdo programático

**Fundamentos** — Modelagem generativa como estimação de $p(x)$ versus discriminativa $p(y|x)$; amostragem como objetivo; o espaço latente como parametrização de baixa dimensão da variedade dos dados; geração condicional $p(x|c)$.

**Teoria** — O jogo minimax da GAN:
$$\min_{G} \max_{D} \; \mathbb{E}_{x \sim p_{dados}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$
com equilíbrio teórico quando $p_G = p_{dados}$, e as patologias práticas: colapso de modos e instabilidade do treino adversário. O VAE maximiza o ELBO:
$$\log p(x) \geq \mathbb{E}_{q_\phi(z|x)}\left[\log p_\theta(x|z)\right] - \text{KL}\!\left(q_\phi(z|x) \,\|\, p(z)\right)$$
equilibrando reconstrução e regularidade do latente. Difusão: o processo direto adiciona ruído gaussiano em $T$ passos com agenda $\{\beta_t\}$, com a forma fechada
$$x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1 - \bar{\alpha}_t}\, \epsilon, \qquad \bar{\alpha}_t = \prod_{s=1}^{t}(1 - \beta_s)$$
e a rede $\epsilon_\theta(x_t, t)$ é treinada para prever o ruído $\epsilon$, permitindo reverter a difusão amostrando de $p_\theta(x_{t-1}|x_t)$. Difusão latente (geração no espaço comprimido) como viabilizador computacional do texto-para-imagem. Avaliação: FID como distância entre estatísticas gaussianas de atributos, e seu ponto cego para memorização. Detecção de mídia sintética e proveniência criptográfica (assinatura na captura vs. detecção a posteriori).

**Aplicação prática** — Demonstração numérica do processo de difusão direto (destruição progressiva do sinal e curva de SNR) e da reconstrução aproximada de $x_0$ a partir de $x_t$ com o ruído conhecido — o esqueleto matemático do treino de modelos de difusão.

## Código de Exemplo em Python (Processo de Difusão Direto e Reconstrução)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. "Imagem" sintética 1D: sinal com duas regiões (analogia de estrutura visual)
x0 = np.concatenate([np.ones(32), -np.ones(32)]) + rng.normal(0, 0.02, 64)

# 2. Agenda linear de ruido (T = 200 passos)
T = 200
beta = np.linspace(1e-4, 0.02, T)
alpha_bar = np.cumprod(1 - beta)

def difundir(x0, t, eps):
    """Forma fechada do processo direto: x_t ~ q(x_t | x_0)."""
    return np.sqrt(alpha_bar[t]) * x0 + np.sqrt(1 - alpha_bar[t]) * eps

print("Relação sinal-ruído ao longo da difusão:")
for t in [0, 49, 99, 149, 199]:
    eps = rng.normal(0, 1, x0.shape)
    xt = difundir(x0, t, eps)
    snr = alpha_bar[t] / (1 - alpha_bar[t])
    corr = np.corrcoef(x0, xt)[0, 1]
    print(f"t={t+1:3d} | SNR = {snr:8.3f} | correlação com x0 = {corr:.3f}")

# 3. O que a rede de difusão aprende: dado x_t e o ruído, recuperar x0
t = 149
eps = rng.normal(0, 1, x0.shape)
xt = difundir(x0, t, eps)
x0_hat = (xt - np.sqrt(1 - alpha_bar[t]) * eps) / np.sqrt(alpha_bar[t])
print("\nErro de reconstrução com ruído conhecido (deve ser ~0):",
      round(float(np.abs(x0 - x0_hat).max()), 10))
print("Na prática, a rede epsilon_theta(x_t, t) aprende a ESTIMAR esse ruído.")
```

## Casos práticos
- **Caso 1**: Uma GAN de rostos sintéticos para aumento de dados gera sempre as mesmas 12 fisionomias. Diagnosticar colapso de modos e comparar mitigação (minibatch discrimination) contra a migração para difusão.
- **Caso 2**: Um modelo texto-para-imagem reproduz quase pixel a pixel uma fotografia de seu conjunto de treino. Discutir memorização, o ponto cego do FID e as implicações autorais (ligação com T03).
- **Caso 3**: Um vídeo deepfake de autoridade pública circula em período eleitoral. Estruturar a resposta pericial: detecção por artefatos, verificação de proveniência (C2PA) e limites de confiabilidade do laudo (ligação com FOR-12).
- **Caso 4 (Caso Multivariável)**: Projeto de geração de dados sintéticos tabulares para compartilhamento interinstitucional de microdados sensíveis. Desenhar: (a) escolha de modelo generativo e métricas de fidelidade estatística; (b) avaliação de risco de reidentificação e ataques de inferência de pertencimento; (c) comparação com anonimização clássica e privacidade diferencial (ligação com GOV-03); (d) termos de uso e rotulagem do dataset como sintético.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Regulamento (UE) 2024/1689 (EU AI Act), art. 50 | Conteúdo sintético deve ser identificável como tal (marcação legível por máquina); deepfakes exigem rotulagem. | Provedores de geradores devem embutir marca d'água/metadados; publicadores devem rotular mídia sintética. |
| TSE, Resolução nº 23.732/2024 | Disciplina o uso de IA em propaganda eleitoral: rotulagem obrigatória de conteúdo sintético e vedação de deepfakes prejudiciais. | Campanhas devem declarar uso de IA generativa; deepfake eleitoral enseja remoção e sanções. |
| C2PA (Coalition for Content Provenance and Authenticity) | Padrão técnico de credenciais de conteúdo assinadas criptograficamente na captura/edição. | Base técnica para verificação de proveniência em perícia de autenticidade de mídia. |

## Doutrina / Referências Técnicas
- GOODFELLOW, Ian et al. *Generative Adversarial Nets*. NeurIPS, 2014 (paper seminal).
- KINGMA, Diederik P. & WELLING, Max. *Auto-Encoding Variational Bayes*. ICLR, 2014 (VAE).
- HO, Jonathan; JAIN, Ajay & ABBEEL, Pieter. *Denoising Diffusion Probabilistic Models*. NeurIPS, 2020 (DDPM).
- ROMBACH, Robin et al. *High-Resolution Image Synthesis with Latent Diffusion Models*. CVPR, 2022 (difusão latente).
- MIRSKY, Yisroel & LEE, Wenke. *The Creation and Detection of Deepfakes: A Survey*. ACM Computing Surveys, v. 54, n. 1, 2021.

## Legislação Relacionada
- Regulamento (UE) 2024/1689 (EU AI Act), art. 50: transparência de conteúdo gerado e manipulado por IA.
- Lei nº 9.610/1998 (Direitos Autorais) e PL 2338/2023: uso de obras protegidas no treino de modelos generativos — matéria em disputa legislativa e judicial.
- Código Penal, art. 216-B, § 1º (Lei nº 13.772/2018) e Lei nº 14.811/2024: criminalização de montagens e mídia íntima manipulada.

## Prática Profissional
- Atuação como ML Engineer em geração de dados sintéticos, aumento de dados e ferramentas criativas, entregando avaliações de fidelidade/memorização, mecanismos de rotulagem de conteúdo sintético e pareceres de risco para uso institucional.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Modelos de difusão superaram GANs em qualidade e cobertura para síntese de imagens de propósito geral, ao custo de amostragem mais lenta — mitigada por destilação e amostradores rápidos.
- **Debate ativo pós-2023:** A eficácia real de marcas d'água em conteúdo gerado — ataques de remoção e a fragilidade de detectores estatísticos (2023-2025) alimentam a dúvida sobre se a rotulagem obrigatória do AI Act é tecnicamente exequível em escala.
- **Debate ativo pós-2023:** Se o treino em obras protegidas configura uso justo/limitação legal — litígios em curso (imprensa e artistas contra provedores de modelos) devem definir a economia dos dados de treino.

## Questões Avançadas
- Derive a forma fechada $q(x_t|x_0)$ do processo de difusão direto a partir da composição de passos gaussianos. *(pesquisa/matemática)*
- Por que o discriminador ótimo da GAN leva o objetivo do gerador à divergência de Jensen-Shannon, e como isso explica gradientes fracos no início do treino? *(pesquisa)*
- Detecção a posteriori de deepfake tende a uma corrida armamentista perdida? Compare tecnicamente com proveniência criptográfica na captura. *(pesquisa — ligação com FOR-12)*

## Exercícios
- Calcule $\bar{\alpha}_t$ para uma agenda linear com $T = 10$ e trace a curva de SNR correspondente.
- Modifique o script para uma agenda cossenoidal de ruído e compare a degradação da correlação com $x_0$.
- Implemente a métrica precisão/cobertura em um exemplo 2D sintético (gaussianas), mostrando um caso de alta precisão com baixa cobertura (colapso de modos).
- Para o caso dos microdados sintéticos, desenhe o protocolo de ataque de inferência de pertencimento e o critério de aprovação para liberação do dataset.

## Tags
#MachineLearning #IA #DeepLearning
