import conectarAoBanco from "../config/dbConfig.js"  // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função assíncrona para buscar todos os posts do banco de dados
export default async function getTodosPosts() {
    // Seleciona o banco de dados "Imersão-instabytes"
    const db = conexao.db("Imersão-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}