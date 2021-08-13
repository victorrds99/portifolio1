const uuidv4 = require('uuid/v4');

const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@12345',
  database : 'tarefas'
});

if (!conn) {
  conn.connect();
}


let tarefas = [
  { id: '1', nome: 'Aprender React', concluida: true },
  { id: '2', nome: 'Estudar padrões de projetos', concluida: false },
  { id: '3', nome: 'Aprender Java', concluida: false },
  { id: '4', nome: 'Estudar React usando hooks', concluida: false }
];

function listarTarefaId(req, res) {
  const id = req.params.id;
  conn.query(
    'SELECT * FROM tarefa WHERE idtarefa = ?;',
    [id],
    (error, results) => {
      if (error) {
        console.log('Erro obtendo dados', error);
        res.status(500).json({ 'erro': 'Erro obtendo dados' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ 'erro': 'Tarefa não encontrada.' });
        return;
      }
      res.json(results[0]);
   });
}

  function cadastrarTarefa(req, res) {
    if (!req.body['nome']) {
      res.status(400).json({ erro: 'Nome da tarefa obrigatória.' });
      return;
    }
    conn.query(
      'INSERT INTO tarefas.tarefa (nome, concluida) VALUES (?, 0);',
      [req.body['nome']],
      (error, results) => {
        if (error) {
          console.log('Erro inserindo dados', error);
          res.status(500).json({ 'erro': 'Erro inserindo dados' });
        }
        console.log(results);
        res.json({ id: results.insertId });
     });
  }

  function atualizarTarefa(req, res) {
    if (!req.body['nome'] && !req.body['concluido']) {
      res.status(400).json({ erro: 'Requisição inválida.' });
      return;
    }
    const id = req.params.id;
    conn.query(
      'UPDATE tarefa SET nome=?, concluida=? WHERE idtarefa=?;',
      [req.body['nome'], req.body['concluido'], id],
      (error, results) => {
        if (error) {
          console.log('Erro atualizando dados', error);
          res.status(500).json({ 'erro': 'Erro atualizando dados' });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ erro: 'Tarefa não encontrada.' });
          return;
        }
        res.json({
          id: id,
          nome: req.body['nome'],
          concluido: req.body['concluido']
        });
     });
  }

  function removerTarefa(req, res) {
    const id = req.params.id;
    conn.query(
      'DELETE FROM tarefa WHERE idtarefa=?;',
      [id],
      (error, results) => {
        if (error) {
          console.log('Erro removendo dados', error);
          res.status(500).json({ 'erro': 'Erro removendo dados' });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ 'erro': 'Tarefa não encontrada.' });
          return;
        }
        res.json({ msg: 'Tarefa removida com sucesso!' });
      });
  }

  function concluirTarefa(req, res) {
    const id = req.params.id;
    conn.query(
      'SELECT * FROM tarefa WHERE idtarefa = ?;',
      [id],
      (error, resultsSel) => {
        if (error) {
          console.log('Erro obtendo dados', error);
          res.status(500).json({ 'erro': 'Erro obtendo dados' });
          return;
        }
        if (resultsSel.length === 0) {
          res.status(404).json({ 'erro': 'Tarefa não encontrada.' });
          return;
        }
        conn.query(
          'UPDATE tarefa SET concluida=? WHERE idtarefa=?;',
          [!resultsSel[0].concluida, id],
          (error, results) => {
            if (error) {
              console.log('Erro concluindo tarefa', error);
              res.status(500).json({ 'erro': 'Erro concluindo tarefa' });
              return;
            }
            if (results.affectedRows === 0) {
              res.status(404).json({ 'erro': 'Tarefa não encontrada.' });
              return;
            }
            res.json({ msg: 'Tarefa concluída com sucesso!' });
        });
     });
  }


  function listarTarefas(req, res) {
    const pagina = req.query['pag'] || 1;
    const ordem = req.query['ordem']; // ASC, DESC
    const filtroTarefa = req.query['filtro-tarefa'];
    const itensPorPagina = req.query['itens-por-pagina'] || 3;
    // total de tarefas
    conn.query(
      'SELECT COUNT(*) as total FROM tarefa;',
      [],
      (error, resultsTotal) => {
        if (error) {
          console.log('Erro obtendo dados', error);
          res.status(500).json({ 'erro': 'Erro obtendo dados' });
          return;
        }
        const total = resultsTotal[0].total;
        // paginacao
        conn.query(
          'SELECT * FROM tarefa ORDER BY nome ' +
          (ordem === 'ASC' ? 'ASC' : 'DESC') +
          ' LIMIT ? OFFSET ?;',
          [itensPorPagina, (pagina - 1) * itensPorPagina],
          (error, results) => {
            if (error) {
              console.log('Erro obtendo dados', error);
              res.status(500).json({ 'erro': 'Erro obtendo dados' });
              return;
            }
            res.json({
              totalItens: total,
              tarefas: results,
              pagina: pagina
            });
        });
     });
  }

  module.exports = {
    listarTarefaId,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa,
    listarTarefas
}