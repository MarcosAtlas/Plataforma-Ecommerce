require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const redis = require('redis');

// Middleware
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ecommerce',
};

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

// Rotas
app.get('/', (req, res) => {
  res.send('Bem-vindo à plataforma de e-commerce!');
});

app.get('/health', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.ping();
    await redisClient.ping();
    res.status(200).send('Conexão com o banco de dados e Redis está funcionando!');
    connection.end();
  } catch (error) {
    res.status(500).send('Erro ao conectar ao banco de dados ou Redis.');
  }
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
