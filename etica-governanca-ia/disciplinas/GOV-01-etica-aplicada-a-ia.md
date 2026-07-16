# GOV-01 — Ética Aplicada à IA

**Domínio:** 01 — Ética e Governança de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre os fundamentos normativos da ética aplicada a sistemas de inteligência artificial. Estuda as tradições éticas relevantes (consequencialismo, deontologia, ética das virtudes) e sua tradução em princípios operacionais para IA: beneficência, não maleficência, autonomia, justiça e explicabilidade (o quinto princípio adicionado pela literatura de IA). Analisa comparativamente os frameworks internacionais — Princípios da OCDE (2019), Recomendação da UNESCO sobre Ética da IA (2021) e diretrizes setoriais — e o fenômeno da proliferação de códigos de ética sem mecanismos de aplicação (*ethics washing*). Aborda dilemas concretos: automação de decisões sobre pessoas, dupla utilização (*dual use*), opacidade e responsabilidade moral distribuída. Introduz o vocabulário que as demais disciplinas da trilha operacionalizam (viés em GOV-02, privacidade em GOV-03, regulação em GOV-04).

## Objetivos
1. Distinguir as principais tradições éticas e aplicá-las de forma estruturada a dilemas concretos de projeto e implantação de sistemas de IA.
2. Comparar os frameworks internacionais de princípios (OCDE, UNESCO) quanto a escopo, força normativa e lacunas de implementação.
3. Traduzir princípios abstratos em requisitos verificáveis de projeto, identificando quando um discurso ético carece de mecanismo de aplicação (*ethics washing*).

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — Por que a IA cria problemas éticos distintos dos de software convencional: escala, opacidade, autonomia decisória e assimetria de poder informacional; a diferença entre ética (autorregulação normativa), compliance (norma posta) e governança (estrutura de decisão e prestação de contas).

**Teoria** — O mapeamento de Floridi e Cowls dos cinco princípios: beneficência, não maleficência, autonomia, justiça e explicabilidade — este último como condição de possibilidade dos demais. A meta-análise de Jobin, Ienca e Vayena (84 códigos de ética) demonstrando convergência lexical (transparência, justiça) com divergência substantiva de interpretação e implementação. Formalização de trade-offs: uma decisão automatizada com limiar $\theta$ sobre escore $s(x)$ distribui erros entre falsos positivos (custo $c_{FP}$, suportado por um grupo) e falsos negativos (custo $c_{FN}$, suportado por outro); a escolha de $\theta$ que minimiza o custo esperado
$$\theta^{*} = \arg\min_{\theta} \; c_{FP} \cdot P(\hat{y}=1, y=0 \mid \theta) + c_{FN} \cdot P(\hat{y}=0, y=1 \mid \theta)$$
não é decisão técnica, mas juízo de valor sobre quem suporta o erro — o ponto de entrada da ética no pipeline. Responsabilidade moral distribuída (o "problema das muitas mãos") em sistemas com desenvolvedor, integrador, operador e usuário; dupla utilização e o dever de avaliação de impacto ex ante.

**Aplicação prática** — Simulação numérica de uma política de decisão automatizada mostrando como diferentes matrizes de custo (juízos de valor) deslocam o limiar ótimo e redistribuem os erros entre perfis de indivíduos.

## Código de Exemplo em Python (Limiar de Decisão como Juízo de Valor)
```python
import numpy as np

rng = np.random.RandomState(42)

# 1. Escores de um classificador para 2000 casos (ex.: triagem de benefício social)
n = 2000
y_verdadeiro = rng.binomial(1, 0.3, n)                    # 30% realmente elegíveis
escore = np.clip(0.6 * y_verdadeiro + rng.normal(0.2, 0.25, n), 0, 1)

def custo_esperado(theta, c_fp, c_fn):
    y_pred = (escore >= theta).astype(int)
    fp = np.sum((y_pred == 1) & (y_verdadeiro == 0))
    fn = np.sum((y_pred == 0) & (y_verdadeiro == 1))
    return (c_fp * fp + c_fn * fn) / n, fp, fn

# 2. Duas visoes eticas distintas sobre o MESMO modelo
cenarios = {
    "Priorizar erario (FP caro)":      dict(c_fp=5.0, c_fn=1.0),
    "Priorizar cidadao (FN caro)":     dict(c_fp=1.0, c_fn=5.0),
    "Neutra (custos iguais)":          dict(c_fp=1.0, c_fn=1.0),
}
thetas = np.linspace(0.05, 0.95, 91)
for nome, custos in cenarios.items():
    resultados = [custo_esperado(t, **custos)[0] for t in thetas]
    t_otimo = thetas[int(np.argmin(resultados))]
    _, fp, fn = custo_esperado(t_otimo, **custos)
    print(f"{nome:32s} | limiar ótimo = {t_otimo:.2f} | FP = {fp:4d} | FN = {fn:4d}")

print("\nMesmo modelo, mesma acurácia potencial — a matriz de custo (escolha ética)")
print("determina quem suporta o erro. Não existe limiar 'puramente técnico'.")
```

## Casos práticos
- **Caso 1**: Uma prefeitura implanta triagem automatizada de denúncias com o limiar padrão de 0,5 do framework. Demonstrar que a omissão da discussão de custos de erro foi, ela própria, uma decisão ética não deliberada.
- **Caso 2**: Uma empresa publica um código de ética de IA com sete princípios, mas sem comitê, orçamento ou processo de veto a projetos. Analisar o caso como *ethics washing* e propor os mecanismos mínimos de aplicação.
- **Caso 3**: Um laboratório desenvolve modelo de análise de imagens médicas e recebe proposta de adaptação para vigilância. Estruturar a avaliação de dupla utilização e os critérios de recusa.
- **Caso 4 (Caso Multivariável)**: Projeto de sistema de priorização de atendimento social com escore de vulnerabilidade. Desenhar a deliberação ética completa: (a) partes afetadas e assimetrias de poder; (b) matriz de custos de erro construída com participação dos afetados; (c) princípios OCDE/UNESCO mapeados em requisitos verificáveis; (d) mecanismo de contestação individual e revisão periódica (ponte com GOV-05).

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| OCDE — Princípios de IA (2019, atualizados 2024) | Crescimento inclusivo, valores humanos, transparência, robustez e accountability como base intergovernamental. | Referência para políticas nacionais (inclusive a EBIA brasileira) e para due diligence de projetos. |
| UNESCO — Recomendação sobre a Ética da IA (2021) | Primeiro instrumento global normativo; inclui avaliação de impacto ético e proibição de pontuação social. | 190+ Estados signatários; base para leis nacionais e avaliações de impacto ético (EIA). |
| CNJ, Resolução nº 332/2020 | Ética, transparência e governança na produção e uso de IA no Judiciário. | Sistemas judiciais de apoio à decisão exigem controle humano e não discriminação documentada. |

## Doutrina / Referências Técnicas
- FLORIDI, Luciano & COWLS, Josh. *A Unified Framework of Five Principles for AI in Society*. Harvard Data Science Review, v. 1, n. 1, 2019 (paper seminal).
- JOBIN, Anna; IENCA, Marcello & VAYENA, Effy. *The Global Landscape of AI Ethics Guidelines*. Nature Machine Intelligence, v. 1, p. 389-399, 2019.
- COECKELBERGH, Mark. *AI Ethics*. MIT Press, 2020.
- RUSSELL, Stuart. *Human Compatible: Artificial Intelligence and the Problem of Control*. Viking, 2019.

## Legislação Relacionada
- Constituição Federal, art. 5º (dignidade, igualdade, devido processo) como matriz dos princípios de IA no ordenamento brasileiro.
- Lei nº 13.709/2018 (LGPD), art. 6º: princípios de finalidade, necessidade, transparência e não discriminação como ética positivada.
- PL 2338/2023 (marco legal da IA no Brasil): fundamentos de centralidade da pessoa humana e categorização de risco (em tramitação).

## Prática Profissional
- Atuação como especialista em ética de IA / analista de governança em comitês de revisão de projetos, elaborando avaliações de impacto ético, matrizes de custo de erro deliberadas e pareceres de dupla utilização para aprovação de sistemas.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Princípios sem mecanismos (comitês com poder de veto, avaliação de impacto, auditoria) não alteram o comportamento de organizações — a literatura pós-2019 é praticamente unânime sobre a insuficiência do "principialismo" puro.
- **Debate ativo pós-2023:** A disputa de prioridades entre riscos existenciais/de fronteira (cartas de 2023, cúpulas de segurança de IA) e danos presentes (discriminação, vigilância, precarização) — quem define a agenda ética da IA e com quais consequências distributivas.
- **Debate ativo:** Se a explicabilidade deve ser princípio autônomo ou meio subordinado à contestabilidade — sistemas contestáveis porém opacos versus explicáveis porém incontestáveis.

## Questões Avançadas
- A escolha do limiar de decisão pode ser delegada a otimização automática sem esvaziar a responsabilidade moral do operador? Fundamente com o problema das muitas mãos. *(pesquisa/ética)*
- Em que condições um princípio de "autonomia humana" proíbe a automação total de uma decisão mesmo quando o modelo supera peritos humanos em acurácia? *(pesquisa)*

## Exercícios
- Reproduza o script variando a prevalência de elegíveis (10%, 30%, 50%) e analise como a base de casos altera o efeito distributivo de cada matriz de custo.
- Mapeie os cinco princípios de Floridi-Cowls em requisitos verificáveis para um sistema real de sua escolha, indicando o teste de aceitação de cada um.
- Compare os textos da OCDE e da UNESCO e identifique duas obrigações presentes em um e ausentes no outro, explicando a consequência prática da lacuna.
- Para o caso multivariável de priorização social, redija a ata de deliberação da matriz de custos com a justificativa de cada valor atribuído.

## Tags
#EticaIA #GovernancaIA #JusticaAlgoritmica
