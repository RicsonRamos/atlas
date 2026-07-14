# MAT-01 — Estrutura e Propriedades dos Materiais

**Domínio:** 01 — Ciência dos Materiais e Engenharia de Impacto
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟡 Conceitual/Acadêmico

## Ementa
Esta disciplina estuda as bases microestruturais que determinam o comportamento macroscópico dos materiais de engenharia. Cobre as ligações químicas atômicas (metálica, iônica, covalente), cristalografia e arranjos atômicos espaciais (redes de Bravais, índices de Miller). Analisa imperfeições cristalinas (defeitos pontuais, discordâncias lineares e contornos de grão). Aborda os diagramas de fase binários e transformações de fase metalúrgicas fora do equilíbrio (martensita) e a difração de raios-X (DRX) como ferramenta de caracterização cristalográfica.

## Objetivos
1. Identificar e quantificar planos e direções cristalográficas utilizando índices de Miller em redes cúbicas.
2. Explicar como imperfeições cristalinas e discordâncias governam o processo de deformação plástica microscópica.
3. Calcular parâmetros de célula unitária e espaçamento interplanar utilizando a formulação matemática da Lei de Bragg.

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — Estrutura atômica e ligações secundárias (van der Waals); energias de ligação; células unitárias de empacotamento cúbico de faces centradas (CFC), cúbico de corpo centrado (CCC) e hexagonal compacto (HC); fator de empacotamento atômico (FEA).

**Teoria** — A física da difração de raios-X para caracterização microestrutural. A difração ocorre quando ondas eletromagnéticas incidentes sofrem interferência construtiva ao interagir com planos atômicos paralelos, regida pela Lei de Bragg:
$$\lambda = 2 d_{hkl} \sin(\theta)$$
onde $\lambda$ é o comprimento de onda do raio-X incidente, $\theta$ é o ângulo de difração medido, e $d_{hkl}$ é o espaçamento interplanar entre os planos cristalinos correspondentes aos índices de Miller $(h, k, l)$.
Para sistemas cristalinos cúbicos (como ferro $\alpha$ e aços martensíticos), o espaçamento interplanar $d_{hkl}$ se relaciona com o parâmetro de rede $a$ (tamanho da aresta da célula unitária) por:
$$d_{hkl} = \frac{a}{\sqrt{h^2 + k^2 + l^2}}$$
Os mecanismos de movimentação de discordâncias (defeito linear) ao longo de planos de escorregamento preferenciais e como o travamento dessas discordâncias em contornos de grão (lei de Hall-Petch) aumenta o limite de escoamento.

**Aplicação prática** — Implementação em Python de um resolvedor analítico para calcular o espaçamento interplanar $d_{hkl}$ e estimar o parâmetro de rede $a$ a partir de picos de difração de raios-X medidos experimentalmente.

## Código de Exemplo em Python (Analidador de Difração de Raios-X - DRX)
```python
import numpy as np

def calcular_parametro_rede_cubica(angulo_theta_graus, indices_hkl, comprimento_onda_nm=0.15406):
    """
    Calcula o parâmetro de rede 'a' para uma estrutura cúbica usando a Lei de Bragg.
    comprimento_onda_nm = 0.15406 nm (padrão de emissão Cu-Ka)
    indices_hkl = tupla (h, k, l) correspondente ao plano cristalino
    """
    h, k, l = indices_hkl
    # Converter ângulo theta de graus para radianos
    theta_rad = np.radians(angulo_theta_graus)
    
    # 1. Lei de Bragg: d = lambda / (2 * sin(theta))
    d_hkl = comprimento_onda_nm / (2.0 * np.sin(theta_rad))
    
    # 2. Relação cúbica: a = d * sqrt(h^2 + k^2 + l^2)
    fator_escala = np.sqrt(h**2 + k**2 + l**2)
    parametro_a = d_hkl * fator_escala
    
    return d_hkl, parametro_a

# Teste com pico medido para o Ferro-alpha (plano cúbico CCC 110) a theta = 22.3 graus
angulo_pico = 22.3
plano = (1, 1, 0)

d_espacamento, parametro_a = calcular_parametro_rede_cubica(angulo_pico, plano)
print("--- Analisador Cristalográfico (Lei de Bragg) ---")
print(f"Plano de Miller analisado: {plano}")
print(f"Espaçamento Interplanar (d_110): {d_espacamento:.5f} nm")
print(f"Parâmetro de Rede Estimado (a): {parametro_a:.5f} nm ({parametro_a * 10:.3f} Å)")
```

## Casos práticos
- **Caso 1**: Uma engrenagem de aço balístico quebra prematuramente por fadiga. A análise metalúrgica revela que o processo de tempera não transformou completamente a austenita em martensita, deixando fases residuais CFC macias no núcleo da peça.
- **Caso 2**: Um lote de chapas de alumínio de grau aeronáutico apresenta ductilidade anormalmente alta e baixo limite de escoamento devido a um recozimento excessivo que promoveu o crescimento exagerado de grãos cristalinos.
- **Caso 3 (Caso Multivariável)**: Investigação de falha mecânica de placa cerâmica de blindagem balística (Alumina) após estocagem sob variações extremas de temperatura. A placa trincou sem sofrer impacto direto. Desenhar a metodologia de perícia microestrutural contendo: (a) análise por DRX para identificar mudanças de fase cristalográfica induzidas termicamente; (b) estimativa da densidade de defeitos pontuais e discordâncias nas bordas das trincas; (c) correlação das tensões residuais atômicas com a presença de impurezas intersticiais de fabricação.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ASTM E975 | Método padrão para determinação por raios-X de austenita retida em aços temperados de baixa liga. | Exige calibração estrita dos equipamentos de DRX para liberação de lotes de aço blindado. |
| Exército Brasileiro / DFPC | Normativas sobre controle químico-metalúrgico de ligas de aço destinadas a componentes essenciais de armamentos e blindagens. | Laudos de ensaio de DRX devem certificar a pureza cristalográfica da liga metálica. |

## Doutrina / Referências Técnicas
- CALLISTER, William D.; RETHWISCH, David G. *Ciência e Engenharia de Materiais: Uma Introdução*. 10ª Edição. LTC, 2020 (Bíblia da ciência dos materiais).
- SHACKELFORD, James F. *Introduction to Materials Science for Engineers*. 8ª Edição. Pearson, 2015.
- CULLITY, B. D.; STOCK, S. R. *Elements of X-Ray Diffraction*. 3ª Edição. Prentice Hall, 2001 (Referência clássica para DRX).

## Legislação Relacionada
- Decreto nº 10.030/2019 (Aprova o Regulamento de Produtos Controlados - RPC): controle sobre matérias-primas e insumos metálicos de alta resistência mecânica de uso militar.
- Portaria nº 189-EME/2020: aprova as normas reguladoras para a avaliação de conformidade de produtos controlados pelo Exército.

## Prática Profissional
- Atuação como engenheiro metalurgista em plantas de tratamento térmico de aços especiais ou pesquisador de desenvolvimento de cerâmicas avançadas em indústrias de defesa, controlando ciclos térmicos e assinando relatórios de conformidade cristalográfica.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** A presença de discordâncias é a única explicação física plausível para a disparidade de 100 a 1000 vezes entre a resistência teórica perfeita de um cristal e a resistência real medida em ensaios macroscópicos.
- **Debate ativo pós-2023:** O controle e manipulação de defeitos cristalinos em escala nanométrica por meio de tratamentos de choque a laser (*laser shock peening*) para criar ligas com resistência à tração e ductilidade simultaneamente elevadas, quebrando o trade-off metalúrgico clássico.

## Questões Avançadas
- Deduza analiticamente a Lei de Bragg considerando a geometria da interferência construtiva de dois feixes paralelos que refletem em planos atômicos adjacentes. *(pesquisa/fisica)*
- Por que a transformação martensítica em aços é classificada como adifusional (sem difusão atômica) e qual a sua relação com a distorção tetragonal da célula CCC para TCC? *(pesquisa/metalurgia)*

## Exercícios
- Determine o espaçamento interplanar d_200 para o Cobre (estrutura CFC, parâmetro de rede a = 0.3615 nm).
- Esboce uma célula unitária CCC e represente graficamente o plano cristalográfico com índices de Miller (1, 1, 0).
- Para o caso da blindagem de Alumina trincada, descreva a sequência de operações para medir o parâmetro de rede e identificar a fase cristalográfica exata.

## Tags
#CienciaMateriais #EngenhariaImpacto #Fisica
