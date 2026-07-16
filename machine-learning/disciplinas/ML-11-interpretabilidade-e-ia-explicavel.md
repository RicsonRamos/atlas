# ML-11 — Interpretabilidade e IA Explicável (XAI)

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Advanced (capstone)
**Pré-requisitos:** ML-09
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina atua como o capstone da trilha de Machine Learning, abordando as metodologias e técnicas de Interpretabilidade e Inteligência Artificial Explicável (XAI - *Explainable AI*). Estuda a diferença conceitual e matemática entre interpretabilidade intrínseca (modelos transparentes) e explicações *post-hoc* (modelos caixa-preta). Detalha os métodos locais de explicação (LIME, valores SHAP), os métodos globais (gráficos de dependência parcial - PDP, importância global de atributos), explicações baseadas em contraexemplo (*counterfactual explanations*), e os desafios ético-legais de auditoria algorítmica para fins de responsabilização civil e criminal.

## Objetivos
1. Diferenciar matematicamente explicações baseadas em perturbação local (LIME) de atribuições aditivas de recursos baseadas na teoria dos jogos (SHAP).
2. Calcular valores exatos de Shapley para explicar a contribuição individual de recursos em previsões de modelos preditivos.
3. Projetar relatórios de explicabilidade de modelos preditivos destinados a auditoria jurídica e conformidade com marcos regulatórios de IA.

## Pré-requisitos
ML-09

## Conteúdo programático

**Fundamentos** — O trade-off entre acurácia e explicabilidade de modelos preditivos; modelos inerentemente interpretáveis (Regressão Linear, Árvores de Decisão curtas, Regras de Associação) vs. modelos caixa-preta (Deep Learning, Gradient Boosting, SVMs).

**Teoria** — A teoria por trás dos valores de Shapley oriunda da Teoria dos Jogos Cooperativos. A atribuição de peso de um recurso $i$ a uma previsão é o valor de Shapley $\phi_i(v)$, definido como:
$$\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(|N| - |S| - 1)!}{|N|!} (v(S \cup \{i\}) - v(S))$$
onde $N$ é o conjunto total de recursos (jogadores), $S$ é um subconjunto de recursos que não contém $i$, e $v(S)$ é a função característica que representa a previsão obtida com o subconjunto de recursos $S$.
Os quatro axiomas fundamentais de SHAP: Eficiência (a soma dos SHAP values é igual à diferença entre a previsão e o valor esperado médio), Simetria (atributos com igual contribuição recebem igual SHAP value), Jogador Nulo (atributos sem contribuição recebem valor zero), e Aditividade (para soma de previsões, os SHAP values se somam).
A formulação do LIME (*Local Interpretable Model-agnostic Explanations*), que aproxima o comportamento local de um modelo complexo $f$ por meio de um modelo linear interpretável $g$ em torno de uma instância de teste $x$.
O conceito de Explicações Contrafactuais: encontrar a menor perturbação $\delta$ em $x$ tal que a previsão de $x + \delta$ mude de classe (ex.: "Se sua renda fosse R$ 500 maior, o crédito seria aprovado").

**Aplicação prática** — Implementação em Python de um script para calcular o valor de Shapley exato para uma previsão de modelo linear contendo 3 variáveis independentes cooperantes.

## Código de Exemplo em Python (Cálculo de Shapley Exato)
```python
import math
from itertools import combinations

# 1. Definir o conjunto de atributos (jogadores)
N = ['idade', 'renda', 'historico_credito']
n = len(N)

# 2. Simular a função característica v(S) que retorna a previsão do modelo (probabilidade de aprovação)
# com base em subconjuntos de atributos ativos
previsoes_subconjuntos = {
    (): 0.20,                         # Média populacional sem dados
    ('idade',): 0.25,
    ('renda',): 0.35,
    ('historico_credito',): 0.50,
    ('idade', 'renda'): 0.45,
    ('idade', 'historico_credito'): 0.65,
    ('renda', 'historico_credito'): 0.80,
    ('idade', 'renda', 'historico_credito'): 0.90 # Previsão final com todos os dados
}

def obter_previsao_v(S):
    # Ordenar o subconjunto para busca no dicionário
    chave = tuple(sorted(list(S)))
    return previsoes_subconjuntos[chave]

def calcular_shapley_atributo(atributo, conjunto_total):
    phi_i = 0.0
    outros_atributos = [a for a in conjunto_total if a != atributo]
    n_total = len(conjunto_total)
    
    # Iterar por todos os subconjuntos possíveis que não contêm o atributo
    for r in range(len(outros_atributos) + 1):
        for S in combinations(outros_atributos, r):
            cardinalidade_S = len(S)
            # Peso combinatório baseado no fatorial do método de Shapley
            peso = (math.factorial(cardinalidade_S) * math.factorial(n_total - cardinalidade_S - 1)) / math.factorial(n_total)
            # Contribuição marginal do atributo i ao subconjunto S
            S_com_i = set(S) | {atributo}
            contrib_marginal = obter_previsao_v(S_com_i) - obter_previsao_v(S)
            phi_i += peso * contrib_marginal
    return phi_i

print("--- Cálculo de Atribuição de Recursos (Valores SHAP) ---")
for at in N:
    valor_shap = calcular_shapley_atributo(at, N)
    print(f"Contribuição (SHAP Value) de '{at}': {valor_shap:+.4f}")

# Validação do axioma de eficiência: soma dos SHAP values = Previsão final - Média base
soma_shap = sum(calcular_shapley_atributo(at, N) for at in N)
diferenca = obter_previsao_v(N) - obter_previsao_v([])
print(f"\nSoma dos Valores SHAP: {soma_shap:.4f}")
print(f"Previsão Final ({obter_previsao_v(N)}) - Previsão Média ({obter_previsao_v([])}): {diferenca:.4f}")
assert abs(soma_shap - diferenca) < 1e-9
print("Axioma de Eficiência verificado com sucesso!")
```

## Casos práticos
- **Caso 1**: Um algoritmo de deep learning detecta câncer de pele a partir de biópsias com 99% de acurácia. A aplicação de mapas de calor por gradiente (Grad-CAM) revela que o modelo estava na verdade classificando as imagens com base na presença de uma régua milimétrica desenhada pelos médicos na pele do paciente, e não na lesão celular. Explicar o fenômeno de correlação espúria (*confounding variables*).
- **Caso 2**: Análise de laudo pericial que usa LIME para explicar a negativa de sinistro por IA de seguradora. O advogado de defesa contesta o laudo demonstrando que o LIME é instável localmente e fornece resultados diferentes para a mesma instância sob perturbações mínimas de ruído.
- **Caso 3 (Caso Multivariável)**: Projeto de auditoria do sistema de IA de admissão em programa habitacional do governo. O modelo utiliza redes neurais complexas. Cidadãos de determinada região periférica são rejeitados de forma sistemática. Desenhar a estratégia de explicabilidade exigida para fins de conformidade com o Ministério Público contendo: (a) cálculo e plotagem global de SHAP values para identificar se o CEP do candidato atua como variável de discriminação indireta (*redlining*); (b) desenvolvimento de um gerador de explicações contrafactuais para instruir os candidatos rejeitados sobre as ações necessárias para obter aprovação; (c) teste de robustez do modelo sob perturbações adversariais de atributos secundários.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC TR 24028:2020 | Trata da confiabilidade em sistemas de IA, detalhando os requisitos de explicabilidade e minimização de comportamento de caixa-preta. | Orienta a documentação de conformidade e auditorias algorítmicas governamentais. |
| ANPD / Direito à Explicação | O art. 20 da LGPD confere ao titular o direito de obter informações claras sobre os critérios e procedimentos utilizados na decisão automatizada. | Modifica a arquitetura dos sistemas para manter logs de inferência e cálculo de importância de atributos por transação. |

## Doutrina / Referências Técnicas
- LUNDBERG, Scott M. & LEE, Su-In. *A Unified Approach to Interpreting Model Predictions*. Advances in Neural Information Processing Systems (NeurIPS), 2017 (Paper seminal do SHAP).
- RIBEIRO, Marco Tulio; SINGH, Sameer & GUESTRIN, Carlos. *\"Why Should I Trust You?\": Explaining the Predictions of Any Classifier*. ACM SIGKDD, 2016 (Paper seminal do LIME).
- MOLNAR, Christoph. *Interpretable Machine Learning: A Guide for Making Black Box Models Explainable*. 2ª Edição, 2022.

## Legislação Relacionada
- Lei Geral de Proteção de Dados (Lei nº 13.709/2018), arts. 6º (princípio da transparência) e 20 (direito à revisão e explicação de decisões automatizadas).
- Projeto de Lei nº 2338/2023 (Marco Regulatório de IA no Brasil), arts. 5º e 12 (direito à explicabilidade e contestabilidade).

## Prática Profissional
- Elaboração de relatórios de explicabilidade de modelos preditivos (Model Cards de Auditoria) para instruir defesas judiciais corporativas em casos de alegação de discriminação algorítmica ou decisões de crédito abusivas.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Os valores SHAP constituem a única abordagem matemática agnóstica de modelo de atribuição aditiva de recursos que respeita simultaneamente os axiomas de eficiência, simetria, aditividade e jogador nulo da teoria dos jogos.
- **Debate ativo pós-2023:** Os limites da explicabilidade em Modelos de Linguagem de Grande Porte (LLMs/Transformers) baseados em atenção multi-cabeça — se a análise de matrizes de atenção é um indicativo real da lógica de geração de texto do modelo ou se constitui uma interpretação espúria pós-hoc.

## Questões Avançadas
- Qual a justificativa matemática para o cálculo aproximado (KernelSHAP) em relação ao cálculo exato do valor de Shapley quando o número de atributos ultrapassa 15? *(pesquisa/computacao)*
- Como o fenômeno da correlação de atributos (recursos dependentes) viola as premissas de independência na amostragem marginal de SHAP e quais modelos corrigem isso (ex.: TreeSHAP)? *(pesquisa/estatistica)*

## Exercícios
- Calcule manualmente o valor de Shapley de um recurso 'A' em um jogo cooperativo de dois recursos, dadas as previsões v() simuladas de cada combinação.
- Implemente uma função Python que receba uma previsão de um modelo linear clássico e mostre a decomposição da previsão comparando os coeficientes ponderados da instância com a média global da base de dados.
- Para o caso multivariável de habitação social, elabore um esboço de laudo explicativo (Model Card) que mostre visualmente a distribuição global dos valores SHAP.

## Tags
#XAI #Interpretabilidade #SHAP #LIME
