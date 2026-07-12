/**
 * ============================================================
 * LogicLab — parser.js
 * Parser de Expressões Lógicas
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Parser = (function () {
    'use strict';

    // Tipos de Token
    const TokenType = {
        VAR: 'VAR',
        AND: 'AND',
        OR: 'OR',
        NOT: 'NOT',
        XOR: 'XOR',
        NAND: 'NAND',
        NOR: 'NOR',
        IMPL: 'IMPL',
        BICONDITIONAL: 'BICONDITIONAL',
        LPAREN: 'LPAREN',
        RPAREN: 'RPAREN',
        EOF: 'EOF'
    };

    // Mapeamento de texto/símbolos para tokens
    const operatorMap = {
        '∧': TokenType.AND, '&&': TokenType.AND, 'AND': TokenType.AND,
        '∨': TokenType.OR, '||': TokenType.OR, 'OR': TokenType.OR,
        '¬': TokenType.NOT, '!': TokenType.NOT, '~': TokenType.NOT, 'NOT': TokenType.NOT,
        '⊕': TokenType.XOR, '^': TokenType.XOR, 'XOR': TokenType.XOR,
        '→': TokenType.IMPL, '->': TokenType.IMPL,
        '↔': TokenType.BICONDITIONAL, '<->': TokenType.BICONDITIONAL,
        'NAND': TokenType.NAND,
        'NOR': TokenType.NOR
    };

    // Precedência de Operadores (maior número = maior precedência)
    const precedence = {
        [TokenType.NOT]: 6,
        [TokenType.AND]: 5,
        [TokenType.NAND]: 5,
        [TokenType.XOR]: 4,
        [TokenType.OR]: 3,
        [TokenType.NOR]: 3,
        [TokenType.IMPL]: 2,
        [TokenType.BICONDITIONAL]: 1
    };

    // 1. Tokenizador
    function tokenize(expression) {
        const tokens = [];
        let i = 0;
        
        while (i < expression.length) {
            let char = expression[i];
            
            // Espaços em branco
            if (/\s/.test(char)) {
                i++;
                continue;
            }
            
            // Parênteses
            if (char === '(') {
                tokens.push({ type: TokenType.LPAREN, value: '(' });
                i++;
                continue;
            }
            if (char === ')') {
                tokens.push({ type: TokenType.RPAREN, value: ')' });
                i++;
                continue;
            }
            
            // Multi-char operators (->, <->, &&, ||)
            if (expression.slice(i, i+3) === '<->') {
                tokens.push({ type: TokenType.BICONDITIONAL, value: '<->' });
                i += 3;
                continue;
            }
            if (expression.slice(i, i+2) === '->') {
                tokens.push({ type: TokenType.IMPL, value: '->' });
                i += 2;
                continue;
            }
            if (expression.slice(i, i+2) === '&&') {
                tokens.push({ type: TokenType.AND, value: '&&' });
                i += 2;
                continue;
            }
            if (expression.slice(i, i+2) === '||') {
                tokens.push({ type: TokenType.OR, value: '||' });
                i += 2;
                continue;
            }

            // Operadores unicode ou de um char (∧, ∨, ¬, ⊕, →, ↔, !, ~, ^)
            if (operatorMap[char]) {
                tokens.push({ type: operatorMap[char], value: char });
                i++;
                continue;
            }
            
            // Variáveis e palavras-chave (AND, OR, NOT, NAND, NOR, XOR, A, B, Var1)
            if (/[a-zA-Z_]/.test(char)) {
                let text = '';
                while (i < expression.length && /[a-zA-Z0-9_]/.test(expression[i])) {
                    text += expression[i];
                    i++;
                }
                let upperText = text.toUpperCase();
                if (operatorMap[upperText]) {
                    tokens.push({ type: operatorMap[upperText], value: text });
                } else {
                    tokens.push({ type: TokenType.VAR, name: text });
                }
                continue;
            }
            
            throw new Error(`Caractere inválido: ${char} na posição ${i}`);
        }
        
        tokens.push({ type: TokenType.EOF });
        return tokens;
    }

    // 2. Parser (Recursive Descent)
    function parse(tokens) {
        let pos = 0;
        
        function current() {
            return tokens[pos];
        }
        
        function consume(type) {
            if (current().type === type) {
                pos++;
                return tokens[pos - 1];
            }
            throw new Error(`Esperado ${type}, mas encontrado ${current().type}`);
        }
        
        function parseExpression(minPreced) {
            let left = parsePrimary();
            
            while (
                current().type !== TokenType.EOF && 
                current().type !== TokenType.RPAREN && 
                precedence[current().type] >= minPreced
            ) {
                let opToken = current();
                let opPreced = precedence[opToken.type];
                consume(opToken.type);
                
                // Associatividade (todos esquerda para direita exceto talvez IMPL, mas vamos manter simples)
                let right = parseExpression(opPreced + 1);
                
                left = {
                    type: opToken.type,
                    left: left,
                    right: right
                };
            }
            
            return left;
        }
        
        function parsePrimary() {
            let token = current();
            
            if (token.type === TokenType.NOT) {
                consume(TokenType.NOT);
                let child = parseExpression(precedence[TokenType.NOT]);
                return {
                    type: TokenType.NOT,
                    child: child
                };
            }
            
            if (token.type === TokenType.LPAREN) {
                consume(TokenType.LPAREN);
                let expr = parseExpression(0);
                consume(TokenType.RPAREN);
                return expr;
            }
            
            if (token.type === TokenType.VAR) {
                consume(TokenType.VAR);
                return {
                    type: TokenType.VAR,
                    name: token.name
                };
            }
            
            throw new Error(`Token inesperado: ${token.value || token.type}`);
        }
        
        if (tokens.length === 1 && tokens[0].type === TokenType.EOF) {
            throw new Error("Expressão vazia.");
        }

        let ast = parseExpression(0);
        
        if (current().type !== TokenType.EOF) {
            throw new Error(`Tokens extras após parse completo: ${current().value}`);
        }
        
        return ast;
    }

    // 3. Avaliação (Evaluation)
    function evaluate(ast, variables) {
        if (!ast) return false;
        
        switch (ast.type) {
            case TokenType.VAR:
                if (variables[ast.name] === undefined) {
                    throw new Error(`Valor da variável ${ast.name} não definido.`);
                }
                return !!variables[ast.name];
            
            case TokenType.NOT:
                return !evaluate(ast.child, variables);
                
            case TokenType.AND:
                return evaluate(ast.left, variables) && evaluate(ast.right, variables);
                
            case TokenType.OR:
                return evaluate(ast.left, variables) || evaluate(ast.right, variables);
                
            case TokenType.XOR:
                return evaluate(ast.left, variables) !== evaluate(ast.right, variables);
                
            case TokenType.NAND:
                return !(evaluate(ast.left, variables) && evaluate(ast.right, variables));
                
            case TokenType.NOR:
                return !(evaluate(ast.left, variables) || evaluate(ast.right, variables));
                
            case TokenType.IMPL:
                // A -> B = !A || B
                return !evaluate(ast.left, variables) || evaluate(ast.right, variables);
                
            case TokenType.BICONDITIONAL:
                return evaluate(ast.left, variables) === evaluate(ast.right, variables);
                
            default:
                throw new Error(`Tipo de nó AST desconhecido: ${ast.type}`);
        }
    }

    // Extrair Variáveis Únicas
    function extractVariables(ast) {
        let vars = new Set();
        
        function traverse(node) {
            if (!node) return;
            if (node.type === TokenType.VAR) {
                vars.add(node.name);
            } else if (node.type === TokenType.NOT) {
                traverse(node.child);
            } else {
                traverse(node.left);
                traverse(node.right);
            }
        }
        
        traverse(ast);
        return Array.from(vars).sort();
    }

    // Obter sub-expressões para Tabela Verdade Passo-a-Passo
    function getSubExpressions(ast) {
        let subs = [];
        
        function traverse(node) {
            if (!node) return;
            if (node.type === TokenType.VAR) {
                return; // variáveis puras não são "sub-expressões"
            }
            if (node.type === TokenType.NOT) {
                traverse(node.child);
                subs.push(node);
            } else {
                traverse(node.left);
                traverse(node.right);
                subs.push(node);
            }
        }
        
        traverse(ast);
        // Retorna array de ASTs, mantendo unicidade baseado na representação em string
        let uniqueSubs = [];
        let seen = new Set();
        for (let sub of subs) {
            let str = toUnicode(sub);
            if (!seen.has(str)) {
                seen.add(str);
                uniqueSubs.push(sub);
            }
        }
        return uniqueSubs;
    }

    // Gerar Tabela Verdade
    function generateTruthTable(ast) {
        const vars = extractVariables(ast);
        if (vars.length > 8) {
            throw new Error("Muitas variáveis (máximo 8 suportado para performance).");
        }
        
        const subs = getSubExpressions(ast);
        // Header = vars + sub-expressões + final
        const headers = [...vars];
        const subStr = subs.map(s => toUnicode(s));
        
        // Se a expressão final não está já como última sub, adiciona
        const finalStr = toUnicode(ast);
        if (subStr[subStr.length - 1] !== finalStr && finalStr.length > 1) {
            subs.push(ast);
            subStr.push(finalStr);
        }
        
        headers.push(...subStr);
        
        const rows = [];
        const numRows = Math.pow(2, vars.length);
        
        for (let i = 0; i < numRows; i++) {
            let row = [];
            let varAssignments = {};
            
            // Atribuir valores (contagem binária invertida, V F)
            for (let j = 0; j < vars.length; j++) {
                let val = (i & (1 << (vars.length - 1 - j))) === 0; // Começa com TTTT, TTTF...
                varAssignments[vars[j]] = val;
                row.push(val);
            }
            
            // Avaliar sub-expressões
            for (let sub of subs) {
                row.push(evaluate(sub, varAssignments));
            }
            
            rows.push(row);
        }
        
        // Se for só uma variável pura
        if (ast.type === TokenType.VAR) {
             const simpleRows = [];
             for (let i = 0; i < 2; i++) {
                 let val = i === 0;
                 simpleRows.push([val, val]);
             }
             return {
                 headers: [ast.name, ast.name],
                 rows: simpleRows
             };
        }
        
        // Desduplicar headers duplicados (ex: se expr inteira = sub-expr final)
        const uniqueHeaders = [];
        const uniqueIndices = [];
        headers.forEach((h, idx) => {
            if (uniqueHeaders.indexOf(h) === -1 || idx === headers.length -1) {
                 uniqueHeaders.push(h);
                 uniqueIndices.push(idx);
            }
        });
        
        // Forçar que a última coluna seja o resultado final para manter a interface consistente
        if (uniqueHeaders[uniqueHeaders.length-1] !== finalStr) {
            uniqueHeaders.pop();
            uniqueHeaders.push(finalStr);
        }

        const filteredRows = rows.map(r => {
             return uniqueIndices.map(idx => r[idx]);
        });
        
        return {
            headers: uniqueHeaders,
            rows: filteredRows
        };
    }

    // Stringify (Para display)
    function toUnicode(ast, parentPreced = 0) {
        if (!ast) return "";
        if (ast.type === TokenType.VAR) return ast.name;
        
        const preced = precedence[ast.type];
        const isUnary = ast.type === TokenType.NOT;
        const needsParens = parentPreced > preced;
        
        let opSym = '';
        switch (ast.type) {
            case TokenType.AND: opSym = ' ∧ '; break;
            case TokenType.OR: opSym = ' ∨ '; break;
            case TokenType.NOT: opSym = '¬'; break;
            case TokenType.XOR: opSym = ' ⊕ '; break;
            case TokenType.IMPL: opSym = ' → '; break;
            case TokenType.BICONDITIONAL: opSym = ' ↔ '; break;
            case TokenType.NAND: opSym = ' NAND '; break;
            case TokenType.NOR: opSym = ' NOR '; break;
        }
        
        let result = '';
        if (isUnary) {
            result = opSym + toUnicode(ast.child, preced);
        } else {
            result = toUnicode(ast.left, preced) + opSym + toUnicode(ast.right, preced);
        }
        
        return needsParens ? `(${result})` : result;
    }
    
    // LaTeX export
    function toLatex(ast, parentPreced = 0) {
        if (!ast) return "";
        if (ast.type === TokenType.VAR) return ast.name;
        
        const preced = precedence[ast.type];
        const isUnary = ast.type === TokenType.NOT;
        const needsParens = parentPreced > preced;
        
        let opSym = '';
        switch (ast.type) {
            case TokenType.AND: opSym = ' \\land '; break;
            case TokenType.OR: opSym = ' \\lor '; break;
            case TokenType.NOT: opSym = '\\lnot '; break;
            case TokenType.XOR: opSym = ' \\oplus '; break;
            case TokenType.IMPL: opSym = ' \\rightarrow '; break;
            case TokenType.BICONDITIONAL: opSym = ' \\leftrightarrow '; break;
            case TokenType.NAND: opSym = ' \\uparrow '; break;
            case TokenType.NOR: opSym = ' \\downarrow '; break;
        }
        
        let result = '';
        if (isUnary) {
            result = opSym + toLatex(ast.child, preced);
        } else {
            result = toLatex(ast.left, preced) + opSym + toLatex(ast.right, preced);
        }
        
        return needsParens ? `(${result})` : result;
    }

    function parseExpression(expressionString) {
        const tokens = tokenize(expressionString);
        return parse(tokens);
    }

    return {
        tokenize,
        parse,
        evaluate,
        extractVariables,
        getSubExpressions,
        generateTruthTable,
        toUnicode,
        toLatex,
        parseExpression,
        TokenType
    };

})();
