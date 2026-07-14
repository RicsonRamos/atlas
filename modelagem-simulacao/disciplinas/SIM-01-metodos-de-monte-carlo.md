# SIM-01 — Métodos de Monte Carlo

**Domínio:** 01 — Modelagem, Simulação e Otimização Computacional
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os fundamentos teóricos e a implementação computacional dos Métodos de Monte Carlo (MC). Aborda a geração de variáveis pseudoaleatórias por inversão de transformada e aceitação-rejeição. Estuda a integração estocástica de Monte Carlo, análise de convergência através da Lei Forte dos Grandes Números e do Teorema Central do Limite. Cobre técnicas avançadas de redução de variância (amostragem por importância, variáveis antitéticas e variáveis de controle) e modelagem de propagação de incerteza em sistemas físicos e financeiros.

## Objetivos
1. Formular analiticamente o estimador de Monte Carlo para integração multidimensional e calcular seus limites de erro estatístico.
2. Implementar algoritmos de simulação estocástica aplicando técnicas de redução de variância para acelerar a convergência do estimador.
3. Projetar simulações de Monte Carlo para propagação de incerteza em modelos de engenharia ou decisão operacional.

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — A definição histórica e conceitual de métodos estocásticos de simulação; o papel do determinismo computacional na geração de números pseudoaleatórios; amostragem direta de distribuições conhecidas.

**Teoria** — A integração de Monte Carlo consiste em aproximar a integral de uma função $h(x)$ sob a densidade de probabilidade $f(x)$ em um domínio $\Omega$:
$$I = \int_{\Omega} h(x) f(x) dx = \mathbb{E}[h(X)]$$
O estimador de Monte Carlo $\hat{I}_N$ para uma amostra de tamanho $N$ de variáveis aleatórias independentes e identicamente distribuídas (i.i.d.) $X_1, X_2, \dots, X_N$ obtidas de $f(x)$ é:
$$\hat{I}_N = \frac{1}{N} \sum_{i=1}^N h(X_i)$$
Pela Lei Forte dos Grandes Números, $\hat{I}_N \xrightarrow{a.s.} I$ quando $N \to \infty$. Pelo Teorema Central do Limite (TCL), o erro de aproximação se distribui assintoticamente como uma normal com variância decrescendo a uma taxa de $1/\sqrt{N}$:
$$\sigma_{\hat{I}_N} = \frac{\sigma_{h(X)}}{\sqrt{N}}$$
A técnica de Amostragem por Importância (*Importance Sampling*), que reduz a variância amostrando de uma distribuição de proposta $g(x)$ em vez da densidade original $f(x)$:
$$I = \int_{\Omega} h(x) \frac{f(x)}{g(x)} g(x) dx = \mathbb{E}_g\left[ h(X) \frac{f(X)}{g(X)} \right]$$

**Aplicação prática** — Implementação em Python de um simulador de Monte Carlo para estimar o valor de $\pi$ por meio da área do círculo inscrito em um quadrado unitário, calculando o intervalo de confiança e a taxa de convergência do erro.

## Código de Exemplo em Python (Estimação de Pi via Monte Carlo)
```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Configurar semente aleatória fixa para reprodutibilidade
np.random.seed(42)

def estimar_pi_monte_carlo(N):
    # Gerar N pontos aleatórios em 2D dentro do quadrado [-1, 1] x [-1, 1]
    pontos = np.random.uniform(-1.0, 1.0, (N, 2))
    
    # Calcular a distância radial quadrada ao centro (0, 0)
    distancia_quadrada = pontos[:, 0]**2 + pontos[:, 1]**2
    
    # Pontos dentro do círculo de raio 1 (distância <= 1)
    dentro_circulo = distancia_quadrada <= 1.0
    pontos_dentro = np.sum(dentro_circulo)
    
    # Estimativa de pi: 4 * (pontos dentro / total pontos)
    pi_estimado = 4.0 * pontos_dentro / N
    
    # Cálculo do erro padrão estatístico do estimador binomial
    proporcao_estimada = pontos_dentro / N
    variancia_proporcao = proporcao_estimada * (1.0 - proporcao_estimada) / N
    erro_padrao = 4.0 * np.sqrt(variancia_proporcao)
    
    return pi_estimado, erro_padrao

# Simular para diferentes tamanhos de amostra N
tamanhos_amostra = [100, 1000, 10000, 100000]
print("--- Simulação de Monte Carlo para Estimação de Pi ---")
for N in tamanhos_amostra:
    pi_est, erro = estimar_pi_monte_carlo(N)
    distorcao = abs(pi_est - np.pi)
    print(f"N: {N:7d} | Estimativa: {pi_est:.5f} | Erro Padrão: ±{erro:.5f} | Desvio Real: {distorcao:.5f}")
```

## Casos práticos
- **Caso 1**: Uma empresa aeroespacial precisa validar a espessura da blindagem térmica de uma sonda. O engenheiro modela a espessura usando distribuições gaussianas para representar as incertezas de fabricação e realiza 100.000 simulações de Monte Carlo para obter a probabilidade de falha catastrófica.
- **Caso 2**: Um algoritmo de simulação financeira de portfólios falha ao estimar o Value at Risk (VaR) de ativos durante crises devido ao uso de distribuições normais que subestimam caudas gordas (*fat tails*). Substituição por distribuições de cauda pesada (t-Student) via reamostragem de Monte Carlo.
- **Caso 3 (Caso Multivariável)**: Projeto de planejamento logístico de viaturas em uma rede de distribuição tática. O tempo de tráfego de cada trecho da rodovia é estocástico e depende de fatores como clima (chuvoso/seco), horário (pico/normal) e estado da via. Mapear o protocolo de Monte Carlo contendo: (a) definição das distribuições de probabilidade para cada variável aleatória de tempo de tráfego; (b) execução da simulação para determinar a probabilidade de completar a missão em menos de 120 minutos; (c) aplicação da técnica de Amostragem por Importância para estimar a probabilidade de atrasos raros superiores a 240 minutos (eventos de cauda longa).

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 31010:2019 | Gerenciamento de riscos — Técnicas de avaliação de risco. Define o método de Monte Carlo como padrão ouro para análise de incerteza em modelos de risco complexos. | Requer a documentação formal dos limites de confiança obtidos via simulações estocásticas. |
| ANPD / Decisões Automatizadas | Decisões automatizadas que envolvem predição de risco de crédito por modelagem probabilística de Monte Carlo devem garantir transparência metodológica. | Exige relatórios explicando as premissas de distribuição estatística adotadas nos simuladores. |

## Doutrina / Referências Técnicas
- ROBERT, Christian P. & CASELLA, George. *Monte Carlo Statistical Methods*. 2ª Edição. Springer, 2004.
- KROESE, Dirk P. et al. *Handbook of Monte Carlo Methods*. Wiley, 2011.
- RUBINSTEIN, Reuven Y. & KROESE, Dirk P. *Simulation and the Monte Carlo Method*. 3ª Edição. Wiley, 2016.

## Legislação Relacionada
- Lei de Introdução às Normas do Direito Brasileiro (LINDB), art. 22: exige a avaliação das consequências práticas das decisões públicas, justificando o uso de simulações probabilísticas em planejamentos de grande impacto.
- Regulamento Geral de Proteção de Dados (GDPR), art. 35: relatório de avaliação de impacto sobre a proteção de dados (DPIA) para fluxos contendo análise preditiva.

## Prática Profissional
- Elaboração de modelos matemáticos e simulações estocásticas em centros de pesquisa operacional militar, refinando estimativas de eficácia logística e dimensionamento de recursos de contingência.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Os métodos de Monte Carlo são a única técnica analiticamente robusta para calcular integrais e avaliar risco em problemas multidimensionais com centenas de parâmetros correlacionados.
- **Debate ativo pós-2023:** A integração dos métodos de Monte Carlo Clássicos com Redes Neurais Baseadas em Física (PINNs) para acelerar a simulação de equações diferenciais parciais em materiais avançados sob fratura dinâmica sem o custo computacional dos hidrocódigos tradicionais.

## Questões Avançadas
- Por que a taxa de convergência de Monte Carlo ($O(1/\sqrt{N})$) é independente do número de dimensões $d$ da integral, tornando-o imune à maldição da dimensionalidade para integração numérica? *(pesquisa/matematica)*
- Como a escolha inadequada de uma função de proposta $g(x)$ na Amostragem por Importância pode levar a um estimador com variância infinita? *(pesquisa/estatistica)*

## Exercícios
- Calcule a integral da função $h(x) = x^2$ no intervalo $[0, 1]$ usando estimador de Monte Carlo com $N = 1000$ amostras e compare com a solução analítica.
- Implemente em Python uma simulação de Monte Carlo comparando o uso de variáveis antitéticas em relação à amostragem convencional de Monte Carlo para redução de variância.
- Para o caso logístico multivariável, esboce o algoritmo (pseudocódigo) de propagação de tempo de tráfego integrando as três fontes de incerteza de rota.

## Tags
#Simulacao #Otimizacao #Modelagem
