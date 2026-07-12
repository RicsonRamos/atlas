import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Inicializar banco de dados SQLite local
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('❌ Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('✅ Banco de dados SQLite conectado.');
    db.run(`CREATE TABLE IF NOT EXISTS store (
      key TEXT PRIMARY KEY,
      value TEXT
    )`);
  }
});

// Helper function para buscar no DB
const getRow = (key) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT value FROM store WHERE key = ?', [key], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Helper function para inserir/atualizar no DB (REPLACE INTO é padrão SQLite)
const setRow = (key, value) => {
  return new Promise((resolve, reject) => {
    db.run('REPLACE INTO store (key, value) VALUES (?, ?)', [key, value], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Rota GET para resgatar dados
app.get('/api/progress/:key', async (req, res) => {
  try {
    const row = await getRow(req.params.key);
    if (row) {
      res.json({ value: row.value });
    } else {
      res.json({ value: null });
    }
  } catch (error) {
    console.error(`Erro GET /api/progress/${req.params.key}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Rota POST para salvar dados
app.post('/api/progress/:key', async (req, res) => {
  try {
    const { value } = req.body;
    // Garante que o valor salvo seja string (ex: stringify do objeto ou texto)
    const valStr = typeof value === 'string' ? value : JSON.stringify(value);
    await setRow(req.params.key, valStr);
    res.json({ success: true });
  } catch (error) {
    console.error(`Erro POST /api/progress/${req.params.key}:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 SQLite Backend de persistência rodando em http://localhost:${PORT}`);
});
