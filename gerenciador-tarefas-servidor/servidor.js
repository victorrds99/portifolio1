const express = require('express');
const app = express();
const appBasePath = `${__dirname}/dist/gerenciador-tarefas`;

app.use('/', express.static(appBasePath));

app.get('*', (req, res) => {
    res.sendFile(`${appBasePath}/index.html`);
});

console.log('Executando servidor na porta 8080.');
app.listen(8080);