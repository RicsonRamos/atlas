# ML-08 — Sistemas de Recomendação

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-03
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os sistemas que ordenam itens por relevância estimada para cada usuário. Estuda a filtragem colaborativa por vizinhança (usuário-usuário e item-item) e por fatoração de matrizes (decomposição em fatores latentes, otimizada por SGD ou ALS), incluindo o tratamento de vieses de usuário e item. Aborda modelos baseados em conteúdo, sistemas híbridos e o problema de partida a frio (*cold start*). Cobre o feedback implícito (cliques, tempo de exposição) versus explícito (notas), e a avaliação de ranqueamento: Precision@k, Recall@k, MAP e NDCG, com protocolos de partição temporal. Discute os efeitos sistêmicos: bolhas de filtro, vieses de popularidade e exposição, e os deveres de transparência de sistemas de recomendação sob a regulação de plataformas.

## Objetivos
1. Formular a fatoração de matrizes como problema de otimização regularizado e implementar seu treinamento por gradiente estocástico.
2. Avaliar recomendadores com métricas de ranqueamento (NDCG, MAP) sob partição temporal, reconhecendo as distorções do feedback implícito enviesado.
3. Analisar criticamente efeitos de bolha de filtro e viés de popularidade, propondo mecanismos de diversificação e as salvaguardas exigidas pela regulação de plataformas.

## Pré-requisitos
ML-03 (otimização por gradiente, regularização e validação).

## Conteúdo programático

**Fundamentos** — A matriz de interações usuário × item e sua esparsidade extrema (>99%); feedback explícito vs. implícito e o problema dos negativos não observados; vizinhança por similaridade de cosseno entre vetores de interação.

**Teoria** — Fatoração de matrizes com vieses: a predição
$$\hat{r}_{ui} = \mu + b_u + b_i + p_u^{T} q_i$$
onde $\mu$ é a média global, $b_u, b_i$ os vieses de usuário e item, e $p_u, q_i \in \mathbb{R}^{f}$ os fatores latentes. O objetivo regularizado:
$$\min_{p, q, b} \sum_{(u,i) \in \mathcal{K}} \left(r_{ui} - \hat{r}_{ui}\right)^2 + \lambda\left(\|p_u\|^2 + \|q_i\|^2 + b_u^2 + b_i^2\right)$$
com atualizações SGD $p_u \leftarrow p_u + \eta\,(e_{ui}\, q_i - \lambda\, p_u)$ e simétrica para $q_i$. O NDCG@k como ganho descontado pela posição:
$$\text{DCG@k} = \sum_{j=1}^{k} \frac{rel_j}{\log_2(j+1)}, \qquad \text{NDCG@k} = \frac{\text{DCG@k}}{\text{IDCG@k}}$$
premiando acertos no topo do ranking. Partida a frio e híbridos conteúdo+colaborativo; viés de popularidade como profecia autorrealizável do log de treino; diversificação (re-ranking) como correção deliberada.

**Aplicação prática** — Implementação de fatoração de matrizes com vieses por SGD em NumPy sobre matriz sintética esparsa, com avaliação por RMSE e Precision@k em partição temporal simulada.

## Código de Exemplo em Python (Fatoração de Matrizes por SGD)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. Matriz sintética: 60 usuários x 40 itens, 2 fatores latentes verdadeiros
n_u, n_i, f_true = 60, 40, 2
P_true = rng.normal(0, 1, (n_u, f_true))
Q_true = rng.normal(0, 1, (n_i, f_true))
R_cheia = 3.5 + P_true @ Q_true.T + rng.normal(0, 0.3, (n_u, n_i))

# 2. Observar apenas 12% das celulas (esparsidade realista)
mascara = rng.rand(n_u, n_i) < 0.12
obs = [(u, i, R_cheia[u, i]) for u in range(n_u) for i in range(n_i) if mascara[u, i]]
rng.shuffle(obs)
treino, teste = obs[:int(0.8 * len(obs))], obs[int(0.8 * len(obs)):]

# 3. Fatoracao com vieses via SGD
f, eta, lam = 4, 0.02, 0.05
mu = np.mean([r for _, _, r in treino])
bu, bi = np.zeros(n_u), np.zeros(n_i)
P = rng.normal(0, 0.1, (n_u, f)); Q = rng.normal(0, 0.1, (n_i, f))

for epoca in range(30):
    for u, i, r in treino:
        erro = r - (mu + bu[u] + bi[i] + P[u] @ Q[i])
        bu[u] += eta * (erro - lam * bu[u])
        bi[i] += eta * (erro - lam * bi[i])
        P[u], Q[i] = (P[u] + eta * (erro * Q[i] - lam * P[u]),
                      Q[i] + eta * (erro * P[u] - lam * Q[i]))

def rmse(pares):
    erros = [(r - (mu + bu[u] + bi[i] + P[u] @ Q[i]))**2 for u, i, r in pares]
    return np.sqrt(np.mean(erros))

print(f"RMSE treino: {rmse(treino):.3f} | RMSE teste: {rmse(teste):.3f}")
print(f"Baseline (média global) teste: "
      f"{np.sqrt(np.mean([(r - mu)**2 for _, _, r in teste])):.3f}")
```

## Casos práticos
- **Caso 1**: Um marketplace observa que 1% dos produtos concentra 60% das recomendações. Diagnosticar viés de popularidade realimentado pelo log e propor re-ranking com cota de cauda longa, medindo o custo em NDCG.
- **Caso 2**: Um streaming avalia o recomendador com partição aleatória e reporta ganho de 15%; em teste A/B online o ganho desaparece. Explicar o vazamento temporal e o descompasso entre métrica offline e engajamento online.
- **Caso 3**: Usuários novos recebem recomendações erráticas nas duas primeiras semanas. Desenhar estratégia de partida a frio com atributos de conteúdo e exploração controlada (bandits em nível conceitual).
- **Caso 4 (Caso Multivariável)**: Projeto de recomendador de trilhas de capacitação para servidores públicos, com feedback implícito (conclusão de módulos), restrições de equidade entre unidades e catálogo dinâmico. Desenhar: (a) modelagem híbrida conteúdo+colaborativa; (b) protocolo de avaliação temporal com NDCG@10 e cobertura de catálogo; (c) auditoria de disparidade de exposição entre grupos (ligação com GOV-02); (d) mecanismo de explicação da recomendação ao usuário.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Regulamento (UE) 2022/2065 (DSA), art. 27 | Plataformas devem explicar os principais parâmetros de seus sistemas de recomendação e oferecer alternativas não baseadas em perfilamento (para VLOPs). | Recomendadores de grandes plataformas exigem documentação pública de parâmetros e opção de feed não personalizado. |
| Regulamento (UE) 2024/1689 (EU AI Act) | Sistemas de recomendação de VLOPs interagem com obrigações de avaliação de risco sistêmico. | Avaliações de risco devem considerar efeitos de amplificação e bolhas informacionais. |
| LGPD, arts. 12 e 20 (ANPD) | Perfilamento para personalização é tratamento de dados pessoais; decisões automatizadas são revisáveis. | Recomendação personalizada exige base legal, transparência e possibilidade de contestação. |

## Doutrina / Referências Técnicas
- KOREN, Yehuda; BELL, Robert & VOLINSKY, Chris. *Matrix Factorization Techniques for Recommender Systems*. IEEE Computer, v. 42, n. 8, 2009 (paper seminal do Netflix Prize).
- RICCI, Francesco; ROKACH, Lior & SHAPIRA, Bracha (eds.). *Recommender Systems Handbook*. 3ª Edição. Springer, 2022.
- AGGARWAL, Charu C. *Recommender Systems: The Textbook*. Springer, 2016.
- HU, Yifan; KOREN, Yehuda & VOLINSKY, Chris. *Collaborative Filtering for Implicit Feedback Datasets*. ICDM, 2008.

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), arts. 9º, 12 e 20: transparência do perfilamento e revisão de decisões automatizadas.
- Regulamento (UE) 2022/2065 (Digital Services Act), arts. 27 e 38: transparência de recomendadores e opção sem perfilamento.
- Lei nº 12.965/2014 (Marco Civil), art. 7º, IX: consentimento expresso sobre coleta e uso de dados para personalização.

## Prática Profissional
- Atuação como ML Engineer em personalização (e-commerce, mídia, educação), entregando modelos de fatoração/híbridos com avaliação de ranqueamento temporal, painéis de cobertura/diversidade e documentação de transparência exigida pela regulação de plataformas.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Métricas offline de ranqueamento são necessárias mas insuficientes — a validação definitiva de recomendadores exige experimentação online controlada (teste A/B), com atenção a efeitos de rede.
- **Debate ativo pós-2023:** Recomendação generativa — LLMs como recomendadores conversacionais (2023-2025) versus fatoração clássica: estudos divergem sobre ganho real fora de cenários de partida a frio, e o custo de inferência muda a economia do sistema.
- **Debate ativo:** Como medir e regular "bolhas de filtro" — a literatura empírica diverge sobre a magnitude do efeito, enquanto DSA e propostas nacionais exigem mitigação de um fenômeno ainda mal quantificado.

## Questões Avançadas
- Derive as atualizações SGD da fatoração com vieses a partir do gradiente do objetivo regularizado. *(pesquisa/matemática)*
- Por que a avaliação com negativos amostrados aleatoriamente superestima o desempenho sob feedback implícito, e como o viés de exposição corrompe o rótulo "não interagiu"? *(pesquisa)*
- Em que condições impor diversidade via re-ranking melhora o engajamento de longo prazo mesmo reduzindo o NDCG imediato? *(pesquisa)*

## Exercícios
- Demonstre que, com fatores fixos, o viés ótimo de item $b_i$ é a média regularizada dos resíduos das interações do item.
- Modifique o script para $f \in \{2, 8, 32\}$ e trace RMSE treino/teste, identificando o ponto de sobreajuste.
- Implemente Precision@5 e NDCG@5 sobre o modelo treinado, tratando como relevantes as notas acima da média do usuário.
- Para o caso multivariável de capacitação, defina a métrica de disparidade de exposição entre unidades e o procedimento de auditoria mensal.

## Tags
#MachineLearning #IA #DeepLearning
