# FOR-01 — Medicina Legal

**Domínio:** 01 — Ciências Forenses (Perícia Criminal)
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda as bases doutrinárias e aplicadas da Medicina Legal como instrumento pericial de auxílio à Justiça. Cobre a Tanatologia Forense, com ênfase em cronotanatognose (estimativa do tempo de morte) e fenômenos cadavéricos. Aborda a Traumatologia Forense, analisando a morfologia de lesões causadas por energias de ordem mecânica, física, química e biológica. Estuda os protocolos de necropsia médico-legal, sexologia forense, antropologia de identificação e a elaboração técnica de relatórios periciais (laudos médico-legais).

## Objetivos
1. Classificar e diagnosticar os fenômenos cadavéricos (abióticos imediatos e consecutivos, transformadores destrutivos e conservadores) para estimativa do intervalo pós-morte.
2. Identificar e caracterizar o nexo de causalidade e os instrumentos produtores de lesões corporais traumáticas.
3. Redigir e auditar laudos e relatórios médico-legais em conformidade com as regras processuais penais.

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — O conceito de Medicina Legal e sua evolução histórica; a estrutura do Instituto Médico Legal (IML); perícia médica e o papel do perito oficial e do assistente técnico.

**Teoria** — A física e termodinâmica do resfriamento cadavérico (*algor mortis*). A estimativa do tempo de morte (Cronotanatognose) pode ser modelada de forma simplificada por meio da Lei de Resfriamento de Newton:
$$T(t) = T_{\text{env}} + (T_{\text{core}} - T_{\text{env}}) e^{-k t}$$
onde $T(t)$ é a temperatura retal do cadáver no instante $t$ (em horas pós-morte), $T_{\text{env}}$ é a temperatura constante do ambiente, $T_{\text{core}}$ é a temperatura normal do corpo humano em vida ($\approx 37^\circ\text{C}$), e $k$ é a constante de resfriamento que depende de fatores antropométricos do cadáver (massa corporal, presença de roupas) e vento do ambiente.
A caracterização morfológica de feridas por projéteis de arma de fogo (zona de tatuagem, zona de esfumaçamento, orlas de escoriação e contusão) para distinção entre disparos encostados, à curta distância e distantes.

**Aplicação prática** — Implementação em Python de um algoritmo de estimativa do intervalo pós-morte (IPM) utilizando o modelo térmico de resfriamento corporal baseado na diferença de temperatura retal medida no local do crime.

## Código de Exemplo em Python (Estimador de Intervalo Pós-Morte - IPM)
```python
import numpy as np

def estimar_horas_pos_morte(temp_retal_medida, temp_ambiente, constante_k=0.15):
    """
    Estima o intervalo pós-morte (em horas) com base na Lei de Resfriamento de Newton.
    temp_core = 37.0 °C (temperatura humana padrão em vida)
    constante_k varia de acordo com o corpo (massa, vestimentas) e ambiente.
    """
    temp_core = 37.0
    
    # Prevenir erros matemáticos de logaritmo com temperaturas inconsistentes
    if temp_retal_medida >= temp_core:
        return 0.0
    if temp_retal_medida <= temp_ambiente:
        print("Aviso: O corpo já atingiu o equilíbrio térmico com o ambiente. IPM impreciso.")
        temp_retal_medida = temp_ambiente + 0.1 # Pequeno ajuste para cálculo limite
        
    # Resolver a equação de resfriamento para t:
    # (T(t) - T_env) / (T_core - T_env) = e^(-k * t)
    # ln((T(t) - T_env) / (T_core - T_env)) = -k * t
    # t = - (1 / k) * ln((T(t) - T_env) / (T_core - T_env))
    
    razao = (temp_retal_medida - temp_ambiente) / (temp_core - temp_ambiente)
    tempo_estimado = - (1.0 / constante_k) * np.log(razao)
    
    return max(0.0, tempo_estimado)

# Cenário de teste: Corpo encontrado com temperatura retal de 29.5 °C em sala a 21.0 °C
temp_cad_medida = 29.5
temp_sala = 21.0
k_estimado = 0.08 # Coeficiente para corpo vestido de massa média

ipm_horas = estimar_horas_pos_morte(temp_cad_medida, temp_sala, k_estimado)
print("--- Estimador Termodinâmico Forense ---")
print(f"Temperatura do Cadáver: {temp_cad_medida} °C")
print(f"Temperatura do Ambiente: {temp_sala} °C")
print(f"Tempo estimado desde o óbito: {ipm_horas:.2f} horas ({int(ipm_horas)}h {int((ipm_horas%1)*60)}m)")
```

## Casos práticos
- **Caso 1**: Uma pessoa é encontrada morta em sua residência em avançado estado de putrefação (período gasoso). O laudo policial aponta morte ocorrida há 12 horas. Discutir a incoerência cronotanatognóstica com base na evolução dos fenômenos cadavéricos transformadores.
- **Caso 2**: Um indivíduo apresenta lesão pérfuro-contundente no tórax com orla de escoriação simétrica e ausência de resíduos de pólvora (tatuagem ou esfumaçamento) na pele. Avaliar a distância e a inclinação aproximada do disparo de arma de fogo.
- **Caso 3 (Caso Multivariável)**: Perícia médico-legal de uma vítima encontrada em terreno aberto florestal. O cadáver apresenta: (a) rigidez cadavérica completa; (b) livores de hipóstase fixos na região dorsal; (c) temperatura retal de 26,0 °C (ambiente médio de 18,0 °C); (d) feridas cortocontundentes na cabeça compatíveis com ação de machado. Desenhar o parecer pericial contendo: (a) estimativa matemática do intervalo pós-morte combinando os livores, a rigidez e o modelo de resfriamento térmico; (b) diagnóstico do instrumento produtor das lesões da cabeça; (c) indicação de coletas toxicológicas e biológicas necessárias para verificar se a vítima estava sedada antes do ataque.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Protocolo de Minnesota (ONU) | Manual sobre a prevenção e investigação eficaz de execuções extralegais, arbitrárias ou sumárias. | Estabelece diretrizes internacionais estritas para necropsias médico-legais independentes. |
| STJ - Súmula 361 (Adaptada) | A validade dos exames médico-legais e perícias exige a assinatura de perito oficial, ou dois peritos não oficiais nomeados pela autoridade. | Nula a perícia que não atenda aos requisitos de qualificação e designação legal. |

## Doutrina / Referências Técnicas
- FRANÇA, Genival Veloso de. *Medicina Legal*. 12ª Edição. Guanabara Koogan, 2020 (Referência nacional absoluta).
- CROCE, Delton; CROCE JÚNIOR, Delton. *Manual de Medicina Legal*. 9ª Edição. Saraiva, 2021.
- HENSGGE, Claus et al. *The Estimation of the Postmortem Interval from Body Cooling*. In: The Temperature Nomogram. Edward Arnold, 1995 (Seminal).

## Legislação Relacionada
- Código de Processo Penal (Decreto-Lei nº 3.689/1941), arts. 158 a 184: regulação das perícias em geral e do exame de corpo de delito.
- Lei nº 12.030/2009: dispõe sobre as perícias oficiais de natureza criminal no Brasil.

## Prática Profissional
- Atuação como Médico Legista oficial em Institutos de Medicina Legal (IML), realizando exames de corpo de delito em vítimas vivas e necropsias em cadáveres para determinar a causa jurídica da morte.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Os livores de hipóstase tornam-se insuscetíveis de mudança de posição (fixação dos livores) entre 8 e 12 horas após a parada circulatória.
- **Debate ativo pós-2023:** O uso de tomografia computadorizada multislice post-mortem (Virtopsia) como substituto parcial ou complementar da necropsia invasiva tradicional para detecção de trajetos tridimensionais de projéteis e traumas ósseos complexos.

## Questões Avançadas
- Como a presença de um cobertor térmico ou vestimentas pesadas altera matematicamente o fator de correção na equação termodinâmica do resfriamento corporal? *(pesquisa/termodinamica)*
- Explique o mecanismo fisiopatológico que resulta na fixação dos livores de hipóstase após a morte celular. *(pesquisa/fisiologia)*

## Exercícios
- Calcule o tempo estimado de morte de um indivíduo cuja temperatura retal medida no local de crime foi 32.0 °C, sabendo que a temperatura do ambiente era de 20.0 °C e a constante de resfriamento estimada para o corpo era k = 0.12.
- Descreva as diferenças fundamentais entre rigidez cadavérica (*rigor mortis*) e espasmo cadavérico, explicando qual delas pode indicar atitude de defesa da vítima no momento imediato do óbito.
- Para o caso multivariável da floresta, elabore um esquema sequencial (linha do tempo) cruzando os tempos prováveis indicados pela temperatura, livores e rigidez.

## Tags
#MedicinaLegal #Cronotanatognose #Tanatologia #Traumatologia #AlgorMortis #LaudoPericial
