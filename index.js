const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect(error => {
    if (error) console.log(error)
    else {
        Tabelas.init(conexao);
        app.listen(3000, () => console.log('servidor executando na porta 3000'));
    }
})

const app = customExpress();


app.get('/', (req, res) => res.send('Servidor rodando, tudo ok'))
