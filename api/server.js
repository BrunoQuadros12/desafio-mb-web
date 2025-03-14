const express = require("express");
const cors = require('cors');

const PORT = 3220;
const corsOptions = {
    origin: 'http://localhost:3220/',
    methods: 'GET,POST', 
    optionsSuccessStatus: 200 
};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/data", (req, res) => {
  const receivedData = req.body;
  
  if (!receivedData.email || !receivedData.name || !receivedData.document || !receivedData.date || !receivedData.phone || !receivedData.password) {
    return res.status(400).json({ error: "Dados são obrigatórios" });
  }

  setTimeout(() => {
    res.json({
      message: "Dados recebidos com sucesso",
      data: receivedData,
    });
  }, 4000);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
});