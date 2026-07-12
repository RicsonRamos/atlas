const fs = require('fs');

let html = fs.readFileSync('public/pages/big-o.html', 'utf8');

const newTopic = `  {
    id: 'advanced_structures',
    title: '6. Estruturas de dados avançadas',
    icon: GitBranch,
    content: \`Estruturas hierárquicas e especializadas para manter dados ordenados, balanceados ou priorizados de forma eficiente.\`,
    subsections: [
      {
        title: 'Árvores',
        text: 'Estruturas de dados hierárquicas não-lineares compostas por um nó raiz, folhas e galhos. Ótimas para representar hierarquias.'
      },
      {
        title: 'Árvores Binárias de Busca (BST)',
        text: 'Cada nó tem até 2 filhos. Filhos à esquerda são menores, à direita são maiores. Permite buscas em $O(\\\\log N)$ no caso médio.'
      },
      {
        title: 'Heaps',
        text: 'Árvores binárias quase completas usadas para implementar filas de prioridade. Permite extrair o máximo/mínimo em $O(\\\\log N)$.'
      },
      {
        title: 'Árvores balanceadas',
        text: 'Árvores como AVL e Red-Black que se auto-balanceiam após inserções/remoções para garantir que a altura permaneça $O(\\\\log N)$, evitando o pior caso de $O(N)$.'
      }
    ]
  },
  {
    id: 'graphs',`;

html = html.replace("  {\n    id: 'graphs',", newTopic);

const newSwitch = `case 'advanced_structures': return 'graphs';
      case 'graphs': return 'graphs';`;

html = html.replace("case 'graphs': return 'graphs';", newSwitch);

fs.writeFileSync('public/pages/big-o.html', html, 'utf8');
console.log('Added topic 6 to big-o.html');
