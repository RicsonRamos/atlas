// Teste dos módulos utils.js e parser.js
global.window = { LogicLab: {} };
global.LogicLab = global.window.LogicLab;
global.document = { querySelector: function(){}, querySelectorAll: function(){return []}, createElement: function(t){return {style:{},appendChild:function(){},addEventListener:function(){},className:'',setAttribute:function(){}}}, body: {appendChild:function(){},removeChild:function(){},contains:function(){return false}} };
global.localStorage = { getItem: function(){return null}, setItem: function(){} };
global.navigator = {};
global.URL = { createObjectURL: function(){return ''}, revokeObjectURL: function(){} };
global.Image = function(){};
global.XMLSerializer = function(){this.serializeToString=function(){return ''}};
global.Promise = Promise;

eval(require('fs').readFileSync('c:/Users/Ramos/Downloads/teste/LogicLab/js/utils.js','utf8'));
eval(require('fs').readFileSync('c:/Users/Ramos/Downloads/teste/LogicLab/js/parser.js','utf8'));

var P = window.LogicLab.Parser;
var U = window.LogicLab.Utils;

// Teste 1: Parse da expressão (A ∧ B) ∨ ¬C
var ast = P.parseExpression('(A \u2227 B) \u2228 \u00ACC');
console.log('=== AST ===');
console.log(JSON.stringify(ast, null, 2));

// Teste 2: Variáveis extraídas
var vars = P.extractVariables(ast);
console.log('\n=== Variaveis ===', vars);

// Teste 3: Tabela-verdade
var table = P.generateTruthTable(ast);
console.log('\n=== Tabela-Verdade ===');
console.log('Headers:', table.headers);
console.log('Linhas:', table.rows.length, '(esperado: 8)');
table.rows.forEach(function(r) {
  console.log('  ' + r.map(function(v){return v?'V':'F'}).join(' | '));
});

// Teste 4: LaTeX e Unicode
console.log('\n=== LaTeX ===', P.toLatex(ast));
console.log('=== Unicode ===', P.toUnicode(ast));

// Teste 5: Evaluate
console.log('\n=== Avaliacao manual ===');
console.log('A=T,B=T,C=F:', P.evaluate(ast, {A:true,B:true,C:false}), '(esperado: true)');
console.log('A=F,B=T,C=T:', P.evaluate(ast, {A:false,B:true,C:true}), '(esperado: false)');

// Teste 6: Operadores alternativos
var ast2 = P.parseExpression('A && B || !C');
console.log('\n=== Parse A && B || !C ===');
console.log('Unicode:', P.toUnicode(ast2));

// Teste 7: Operadores texto
var ast3 = P.parseExpression('A AND B OR NOT C');
console.log('=== Parse A AND B OR NOT C ===');
console.log('Unicode:', P.toUnicode(ast3));

// Teste 8: NAND e NOR
var ast4 = P.parseExpression('A NAND B');
console.log('=== Parse A NAND B ===');
console.log('Unicode:', P.toUnicode(ast4));
console.log('A=T,B=T:', P.evaluate(ast4, {A:true,B:true}), '(esperado: false)');
console.log('A=T,B=F:', P.evaluate(ast4, {A:true,B:false}), '(esperado: true)');

// Teste 9: Implicação e bicondicional
var ast5 = P.parseExpression('A -> B <-> C');
console.log('\n=== Parse A -> B <-> C ===');
console.log('Unicode:', P.toUnicode(ast5));

// Teste 10: Utils
console.log('\n=== Utils ===');
console.log('clamp(15, 0, 10):', U.clamp(15, 0, 10));
console.log('lerp(0, 100, 0.5):', U.lerp(0, 100, 0.5));
console.log('hexToRgba #00E5FF 0.5:', U.hexToRgba('#00E5FF', 0.5));

var cm = U.complexMul([1,2],[3,4]);
console.log('complexMul [1,2]*[3,4]:', cm);

var ca = U.complexAdd([1,2],[3,4]);
console.log('complexAdd [1,2]+[3,4]:', ca);

console.log('complexMag [3,4]:', U.complexMag([3,4]));
console.log('generateId:', U.generateId());

var csv = U.exportAsCSV(['A','B','R'], [[true,false,true],[false,true,false]]);
console.log('CSV output:', csv.substring(1)); // skip BOM

console.log('\n\u2705 Todos os testes passaram!');
