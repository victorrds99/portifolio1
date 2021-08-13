const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  listarTarefaId,
  cadastrarTarefa,
  atualizarTarefa, 
  removerTarefa,
  concluirTarefa,
  listarTarefas
} = require('./gerenciador-tarefas.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// listar uma tarefa por id - get
app.get('/gerenciador-tarefas/:id', listarTarefaId);

// cadastrar uma tarefa - post
app.post('/gerenciador-tarefas', cadastrarTarefa);

app.put('/gerenciador-tarefas/:id', atualizarTarefa);

// remover uma tarefa - delete
app.delete('/gerenciador-tarefas/:id', removerTarefa);

app.put('/gerenciador-tarefas/:id/concluir',concluirTarefa);

// listar todas as tarefas - get
app.get('/gerenciador-tarefas', listarTarefas);

app.listen(port, () => console.log(`BOA PA NOIS!!!! Servidor inicializado na porta ${port}`));
