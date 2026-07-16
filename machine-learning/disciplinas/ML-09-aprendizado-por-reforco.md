# ML-09 — Aprendizado por Reforço

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre o aprendizado por interação com um ambiente, formalizado como Processo de Decisão de Markov (MDP): estados, ações, transições, recompensas e fator de desconto. Estuda as equações de Bellman para funções de valor de estado e de ação, e a dicotomia entre métodos baseados em valor (Q-learning, SARSA) e baseados em política (*policy gradient*, em nível conceitual). Aprofunda o Q-learning tabular: atualização por diferença temporal, convergência e o dilema exploração-explotação (política ε-gulosa). Aborda a extensão por aproximação de função (Deep Q-Networks, conceitual), o *replay buffer* e a instabilidade do treino. Discute aplicações de decisão sequencial (alocação de recursos, controle, jogos) e o papel do RL no alinhamento de LLMs (RLHF, em ponte com ML-06 e GOV-06), com atenção aos riscos de especificação incorreta de recompensa.

## Objetivos
1. Formalizar problemas de decisão sequencial como MDPs e derivar as equações de Bellman de avaliação e otimalidade.
2. Implementar Q-learning tabular com política ε-gulosa e analisar sua convergência empírica em um ambiente de grade.
3. Diagnosticar falhas de especificação de recompensa (*reward hacking*) e discutir seus riscos em aplicações reais e no alinhamento de modelos.

## Pré-requisitos
ML-01 (fundamentos de otimização e avaliação empírica).

## Conteúdo programático

**Fundamentos** — O laço agente-ambiente: em cada passo o agente observa $s_t$, age $a_t$, recebe $r_{t+1}$ e transita para $s_{t+1}$; a propriedade de Markov; retorno descontado $G_t = \sum_{k=0}^{\infty} \gamma^k r_{t+k+1}$; diferenças estruturais para o aprendizado supervisionado (dados não i.i.d., feedback avaliativo e atrasado).

**Teoria** — A equação de Bellman de otimalidade para a função de valor de ação:
$$Q^{*}(s, a) = \mathbb{E}\left[r_{t+1} + \gamma \max_{a'} Q^{*}(s_{t+1}, a') \,\middle|\, s_t = s,\, a_t = a\right]$$
A atualização do Q-learning por diferença temporal (off-policy):
$$Q(s, a) \leftarrow Q(s, a) + \alpha \left[ r + \gamma \max_{a'} Q(s', a') - Q(s, a) \right]$$
com taxa de aprendizado $\alpha$ e convergência garantida (tabular) sob visita infinita a todos os pares estado-ação e condições de Robbins-Monro sobre $\alpha$. SARSA como variante on-policy (usa a ação efetivamente tomada). O dilema exploração-explotação e a política ε-gulosa com decaimento. Aproximação de função: substituir a tabela por rede neural $Q_\theta$ (DQN), com *replay buffer* e rede-alvo para estabilizar o alvo móvel — a "tríade mortal" (aproximação + bootstrap + off-policy) como fonte de divergência. *Policy gradient* em nível conceitual: otimizar diretamente $J(\theta) = \mathbb{E}_{\pi_\theta}[G]$ pelo teorema do gradiente de política. RLHF: modelo de recompensa aprendido de preferências humanas guiando o ajuste da política do LLM.

**Aplicação prática** — Q-learning tabular completo em um mundo-grade com obstáculo, mostrando a curva de aprendizado e a política ótima aprendida.

## Código de Exemplo em Python (Q-Learning em Mundo-Grade)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. Mundo-grade 4x4: inicio em (0,0), objetivo em (3,3), buraco em (1,2) e (2,1)
LADO = 4
OBJETIVO, BURACOS = 15, {6, 9}          # indices lineares
ACOES = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # cima, baixo, esq, dir

def passo(s, a):
    lin, col = divmod(s, LADO)
    dl, dc = ACOES[a]
    lin2, col2 = min(max(lin + dl, 0), LADO - 1), min(max(col + dc, 0), LADO - 1)
    s2 = lin2 * LADO + col2
    if s2 == OBJETIVO: return s2, 10.0, True
    if s2 in BURACOS:  return s2, -10.0, True
    return s2, -0.1, False               # custo de passo incentiva caminho curto

# 2. Q-learning tabular com epsilon-guloso decaindo
Q = np.zeros((LADO * LADO, 4))
alpha, gamma = 0.2, 0.95
retornos = []
for ep in range(1500):
    eps = max(0.05, 1.0 - ep / 1000)
    s, fim, G = 0, False, 0.0
    while not fim:
        a = rng.randint(4) if rng.rand() < eps else int(np.argmax(Q[s]))
        s2, r, fim = passo(s, a)
        Q[s, a] += alpha * (r + gamma * (0 if fim else Q[s2].max()) - Q[s, a])
        s, G = s2, G + r
    retornos.append(G)

print("Retorno médio (primeiros 100 episódios):", round(np.mean(retornos[:100]), 2))
print("Retorno médio (últimos 100 episódios): ", round(np.mean(retornos[-100:]), 2))

# 3. Politica aprendida (setas por estado)
setas = np.array(["↑", "↓", "←", "→"])
politica = setas[np.argmax(Q, axis=1)].reshape(LADO, LADO)
politica[1, 2] = politica[2, 1] = "☠"; politica[3, 3] = "★"
print(politica)
```

## Casos práticos
- **Caso 1**: Um agente de precificação dinâmica aprende a colapsar o preço para ganhar volume, destruindo a margem. Diagnosticar recompensa mal especificada (receita vs. lucro) e redesenhar a função de recompensa com restrições.
- **Caso 2**: Um DQN de controle de semáforos funciona em simulador e falha na via real. Discutir a lacuna simulação-realidade (*sim-to-real*), aleatorização de domínio e validação progressiva.
- **Caso 3**: Em um jogo, o agente descobre um bug que gera recompensa infinita sem completar o objetivo. Analisar *reward hacking* como problema de especificação e suas analogias em RLHF de LLMs (ligação com GOV-06).
- **Caso 4 (Caso Multivariável)**: Projeto de alocação dinâmica de viaturas por RL em simulador de despacho, com estados de demanda, posições e tempos de resposta. Desenhar: (a) formulação do MDP (estado, ação, recompensa multiobjetivo tempo/cobertura); (b) protocolo de treino em simulador calibrado com dados históricos e validação contrafactual; (c) salvaguardas de implantação — sombra (shadow mode) antes de decisão autônoma; (d) análise de equidade territorial da política aprendida.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 22989:2022 | Define terminologia de agentes e aprendizado por reforço no vocabulário normativo de IA. | Padroniza a descrição de sistemas agênticos em documentação técnica. |
| Regulamento (UE) 2024/1689 (EU AI Act), Anexo III | Sistemas autônomos de decisão em infraestrutura crítica e segurança são de alto risco. | Agentes de RL em despacho, tráfego ou energia exigem supervisão humana e registro de decisões. |
| NIST AI RMF 1.0 (2023) | Gestão de risco cobre comportamento emergente e objetivos mal especificados. | Projetos de RL devem documentar a função de recompensa e testes de comportamento indesejado. |

## Doutrina / Referências Técnicas
- SUTTON, Richard S. & BARTO, Andrew G. *Reinforcement Learning: An Introduction*. 2ª Edição. MIT Press, 2018 (obra de referência).
- WATKINS, Christopher J. C. H. & DAYAN, Peter. *Q-learning*. Machine Learning, v. 8, p. 279-292, 1992 (paper seminal).
- MNIH, Volodymyr et al. *Human-level Control through Deep Reinforcement Learning*. Nature, v. 518, 2015 (DQN).
- SILVER, David et al. *Mastering the Game of Go with Deep Neural Networks and Tree Search*. Nature, v. 529, 2016 (AlphaGo).
- PUTERMAN, Martin L. *Markov Decision Processes: Discrete Stochastic Dynamic Programming*. Wiley, 1994.

## Legislação Relacionada
- Regulamento (UE) 2024/1689 (EU AI Act), arts. 9 e 14: gestão de risco e supervisão humana para sistemas autônomos de alto risco.
- Lei nº 13.709/2018 (LGPD), art. 20: decisões automatizadas sequenciais (precificação, alocação) permanecem revisáveis quando afetam titulares.

## Prática Profissional
- Atuação como ML Engineer / Pesquisador Aplicado em otimização de decisão sequencial (alocação de recursos, precificação, controle operacional), entregando agentes validados em simulador, análises de sensibilidade da recompensa e planos de implantação em modo sombra.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** RL exige simulador confiável ou volume massivo de interação; em problemas com bons dados históricos e sem dinâmica de longo prazo, formulações supervisionadas ou de bandit costumam ser mais robustas e auditáveis.
- **Debate ativo pós-2023:** RLHF versus métodos de otimização direta de preferências (DPO, 2023) no alinhamento de LLMs — se o modelo de recompensa explícito é necessário ou se a otimização direta é mais estável e barata; resultados comparativos seguem disputados.
- **Debate ativo:** A confiabilidade de agentes de RL em ambientes abertos — generalização fora do simulador, *reward hacking* e comportamento emergente permanecem sem garantias formais satisfatórias.

## Questões Avançadas
- Demonstre que o operador de Bellman de otimalidade é uma contração de fator $\gamma$ na norma do supremo, e o que isso garante para a iteração de valor. *(pesquisa/matemática)*
- Por que a combinação de aproximação de função, bootstrap e aprendizado off-policy ("tríade mortal") pode divergir, e como replay buffer e rede-alvo mitigam o problema? *(pesquisa)*
- Em RLHF, que falhas do modelo de recompensa humano levam a sobreotimização (lei de Goodhart), e como detectá-las? *(pesquisa — ligação com GOV-06)*

## Exercícios
- Resolva à mão a iteração de valor para um MDP de 3 estados com $\gamma = 0{,}9$ até convergência de $10^{-2}$.
- Modifique o script para SARSA e compare a política aprendida perto dos buracos com a do Q-learning, explicando a diferença on/off-policy.
- Trace a curva de retorno por episódio com médias móveis de 50 e identifique o efeito do decaimento de ε.
- Para o caso das viaturas, escreva três formulações alternativas de recompensa e analise o comportamento perverso que cada uma pode induzir.

## Tags
#MachineLearning #IA #DeepLearning
