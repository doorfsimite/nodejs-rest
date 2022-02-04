
const moment = require('moment');
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = { ...atendimento, dataCriacao, data }

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }
            , {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ser pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        }

        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(201).json(resultados)
            }
        })

    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (error, resultados) => {
            if (error) {
                res.status(500).json(error)
            }
            else {
                res.json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (error, resultados) => {
            if (error) {
                res.status(500).json(error)
            }
            else {
                res.json(resultados[0])
            }
        })
    }

    alteraPorId(id, valores, res) {
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
            
        }
        conexao.query(sql, [valores, id], (error, resultados) => {
            if (error) {
                res.status(500).json(error)
            }
            else {
                res.json(resultados)
            }
        })
    }

    deletePorId(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id=?`;
       
        conexao.query(sql,  id, (error, resultados) => {
            if (error) {
                res.status(500).json(error)
            }
            else {
                res.json({id})
            }
        })
    }
}
module.exports = new Atendimento;