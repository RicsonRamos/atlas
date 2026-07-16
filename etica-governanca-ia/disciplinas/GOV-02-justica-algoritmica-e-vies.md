# GOV-02 — Justiça Algorítmica e Viés

**Domínio:** 01 — Ética e Governança de IA
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** GOV-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre a formalização matemática da equidade em decisões algorítmicas. Estuda as fontes de viés ao longo do pipeline: viés histórico nos dados, viés de representação amostral, viés de medição (proxies) e viés de agregação. Aprofunda as métricas de justiça de grupo — paridade demográfica, igualdade de oportunidades e chances equalizadas (*equalized odds*), paridade preditiva/calibração por grupo — e os teoremas de impossibilidade que provam sua incompatibilidade mútua sob prevalências distintas (Chouldechova; Kleinberg, Mullainathan e Raghavan), tendo o caso COMPAS/ProPublica como estudo canônico. Aborda justiça individual e contrafactual em nível conceitual, e as técnicas de mitigação em pré-processamento, treinamento (restrições) e pós-processamento (limiares por grupo), com seus custos e limites jurídicos.

## Objetivos
1. Identificar e classificar as fontes de viés em cada etapa do pipeline de dados e modelagem, distinguindo viés estatístico de discriminação juridicamente relevante.
2. Calcular e interpretar as métricas de justiça de grupo, demonstrando numericamente os teoremas de impossibilidade em dados com prevalências distintas.
3. Selecionar estratégias de mitigação (pré, in ou pós-processamento) adequadas ao contexto, avaliando o trade-off equidade-desempenho e a licitude da medida.

## Pré-requisitos
GOV-01 (princípios e matriz de custos como juízo de valor). Recomenda-se ML-01 para as métricas de classificação subjacentes.

## Conteúdo programático

**Fundamentos** — O ciclo do viés: dados históricos refletem decisões passadas discriminatórias → o modelo aprende e reproduz → as decisões do modelo geram os dados futuros (feedback loop, ex.: policiamento preditivo — ponte com T04); atributos protegidos e seus proxies (CEP, escolaridade); a diferença entre remover o atributo (*fairness through unawareness*, ineficaz) e tratar a disparidade.

**Teoria** — Para grupos $A \in \{0, 1\}$, predição $\hat{Y}$ e desfecho $Y$:
— **Paridade demográfica**: $P(\hat{Y}=1 \mid A=0) = P(\hat{Y}=1 \mid A=1)$;
— **Chances equalizadas**: $P(\hat{Y}=1 \mid A=a, Y=y)$ igual entre grupos para $y \in \{0,1\}$ (iguala TPR e FPR);
— **Paridade preditiva/calibração**: $P(Y=1 \mid \hat{Y}=1, A=a)$ igual entre grupos.
O teorema de Chouldechova: se as prevalências $P(Y=1 \mid A=a)$ diferem entre grupos, um classificador imperfeito não pode satisfazer simultaneamente calibração por grupo e igualdade de FPR/FNR — a relação
$$\text{FPR} = \frac{p}{1-p} \cdot \frac{1 - \text{VPP}}{\text{VPP}} \cdot \text{TPR}$$
(onde $p$ é a prevalência e VPP o valor preditivo positivo) força o conflito: fixados VPP e TPR iguais, prevalências diferentes implicam FPRs diferentes. O caso COMPAS como instância empírica: escores calibrados por grupo com FPR duas vezes maior para réus negros — ambas as partes da controvérsia estavam "certas" segundo métricas distintas. Mitigação: reponderação amostral (pré), regularização com restrição de equidade (in), limiares específicos por grupo (pós) — este último de licitude controversa em ordenamentos que vedam tratamento diferenciado explícito.

**Aplicação prática** — Auditoria de equidade completa em dados sintéticos com prevalências distintas por grupo, calculando as três famílias de métricas e demonstrando numericamente a impossibilidade.

## Código de Exemplo em Python (Auditoria de Métricas de Justiça)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. Populacao sintetica com prevalencias DISTINTAS por grupo (nucleo do teorema)
n = 6000
grupo = rng.binomial(1, 0.5, n)                       # A = 0 ou 1
prevalencia = np.where(grupo == 0, 0.20, 0.40)        # P(Y=1|A) difere
y = rng.binomial(1, prevalencia)

# 2. Escore imperfeito, porem igualmente informativo para ambos os grupos
escore = np.clip(0.5 * y + rng.normal(0.25, 0.18, n), 0, 1)
y_hat = (escore >= 0.5).astype(int)

def metricas(a):
    m = grupo == a
    tp = np.sum((y_hat == 1) & (y == 1) & m); fp = np.sum((y_hat == 1) & (y == 0) & m)
    fn = np.sum((y_hat == 0) & (y == 1) & m); tn = np.sum((y_hat == 0) & (y == 0) & m)
    return dict(
        taxa_positiva = (tp + fp) / m.sum(),          # paridade demografica
        tpr = tp / (tp + fn),                          # igualdade de oportunidades
        fpr = fp / (fp + tn),                          # chances equalizadas
        vpp = tp / (tp + fp),                          # paridade preditiva
    )

print(f"{'Métrica':<18}{'Grupo A=0':>12}{'Grupo A=1':>12}{'Disparidade':>14}")
m0, m1 = metricas(0), metricas(1)
for k in m0:
    print(f"{k:<18}{m0[k]:>12.3f}{m1[k]:>12.3f}{abs(m0[k]-m1[k]):>14.3f}")

print("\nCom prevalências distintas, igualar VPP (calibração) força FPRs distintos")
print("— e vice-versa. Escolher a métrica de justiça é escolher o que igualar.")
```

## Casos práticos
- **Caso 1**: Um modelo de crédito não usa raça, mas usa CEP e histórico de consumo. Demonstrar a discriminação por proxy medindo disparidade de aprovação e reconstruindo a correlação proxy-atributo protegido.
- **Caso 2**: Reproduzir a controvérsia COMPAS: dado um escore calibrado por grupo com prevalências distintas, calcular FPR/FNR por grupo e arbitrar tecnicamente o debate ProPublica × Northpointe.
- **Caso 3**: Um RH implanta triagem automática treinada em contratações históricas de uma empresa com 85% de homens no quadro técnico. Mapear as fontes de viés (histórico, representação, medição) e propor o desenho de mitigação em cada etapa.
- **Caso 4 (Caso Multivariável)**: Auditoria de equidade de um sistema de predição de reincidência para apoio a decisões cautelares. Desenhar: (a) escolha justificada da métrica primária de justiça dado o custo assimétrico do erro; (b) análise interseccional (grupo × faixa etária); (c) avaliação da licitude de limiares por grupo no ordenamento brasileiro; (d) monitoramento contínuo do feedback loop pós-implantação (ponte com GOV-05 e T04/GEO).

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Wisconsin v. Loomis (2016, Suprema Corte de Wisconsin) | Uso do COMPAS em sentença não viola devido processo, desde que com advertências sobre limitações e sem ser fator determinante. | Precedente central sobre escores de risco em justiça criminal; exige advertências formais de limitação. |
| ISO/IEC TR 24027:2021 | Taxonomia técnica de vieses em sistemas de IA e métodos de avaliação. | Base normativa para relatórios de auditoria de viés em conformidade. |
| Regulamento (UE) 2024/1689 (EU AI Act), art. 10 | Dados de treino de sistemas de alto risco devem ser examinados quanto a vieses que afetem direitos fundamentais. | Obriga documentação de análise de viés como condição de conformidade. |
| LGPD, art. 6º, IX (ANPD) | Princípio da não discriminação: vedado tratamento para fins discriminatórios ilícitos ou abusivos. | Disparidades não justificadas em decisões automatizadas são ilícito de tratamento de dados. |

## Doutrina / Referências Técnicas
- BAROCAS, Solon; HARDT, Moritz & NARAYANAN, Arvind. *Fairness and Machine Learning: Limitations and Opportunities*. MIT Press, 2023 (obra de referência).
- CHOULDECHOVA, Alexandra. *Fair Prediction with Disparate Impact: A Study of Bias in Recidivism Prediction Instruments*. Big Data, v. 5, n. 2, 2017 (teorema de impossibilidade).
- KLEINBERG, Jon; MULLAINATHAN, Sendhil & RAGHAVAN, Manish. *Inherent Trade-Offs in the Fair Determination of Risk Scores*. ITCS, 2017.
- HARDT, Moritz; PRICE, Eric & SREBRO, Nathan. *Equality of Opportunity in Supervised Learning*. NeurIPS, 2016.
- ANGWIN, Julia et al. *Machine Bias*. ProPublica, 2016 (investigação seminal do caso COMPAS).

## Legislação Relacionada
- Constituição Federal, art. 3º, IV e art. 5º, caput: vedação de discriminação como norma matriz.
- Lei nº 13.709/2018 (LGPD), arts. 6º, IX e 20: não discriminação e revisão de decisões automatizadas.
- Regulamento (UE) 2024/1689 (EU AI Act), arts. 9-10 e Anexo III: gestão de risco e dados para sistemas de alto risco (crédito, emprego, justiça).

## Prática Profissional
- Atuação como auditor algorítmico / cientista de dados de conformidade, executando auditorias de disparidade com métricas de grupo e interseccionais, laudos de impacto discriminatório e planos de mitigação com análise de licitude jurídica.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Não existe métrica de justiça universalmente correta; os teoremas de impossibilidade obrigam uma escolha normativa explícita e documentada por contexto — omiti-la é a única opção indefensável.
- **Debate ativo pós-2023:** Medição de viés em modelos generativos e LLMs — benchmarks de viés (2023-2025) mostram resultados instáveis a paráfrases do prompt, e não há consenso sobre o que constitui "disparidade" em geração aberta de texto.
- **Debate ativo:** Equidade sob deslocamento de distribuição — garantias de fairness medidas no treino degradam silenciosamente em produção, e a literatura diverge sobre auditoria estática versus monitoramento contínuo obrigatório.

## Questões Avançadas
- Derive a relação entre FPR, TPR, prevalência e VPP usada no teorema de Chouldechova e mostre o conflito quando as prevalências diferem. *(pesquisa/matemática)*
- Limiares de decisão distintos por grupo são medida de equalização ou discriminação direta? Confronte a resposta técnica com o art. 5º da CF e o art. 6º, IX da LGPD. *(pesquisa/jurídico)*
- Como distinguir, em auditoria, disparidade causada por viés de medição do rótulo (ex.: prisões como proxy de crime) de disparidade de base? *(pesquisa)*

## Exercícios
- Reproduza o script igualando as prevalências dos grupos e verifique que as quatro métricas convergem — confirmando que a impossibilidade nasce da diferença de base.
- Implemente o pós-processamento de limiares por grupo que iguala TPRs e meça o custo em acurácia global e em VPP por grupo.
- Analise um dataset público (ex.: Adult/Census) medindo paridade demográfica e chances equalizadas para gênero, com intervalo de confiança por bootstrap.
- Para o caso de reincidência, redija a seção do laudo que justifica a métrica primária escolhida e registra as métricas conscientemente preteridas.

## Tags
#EticaIA #GovernancaIA #JusticaAlgoritmica
