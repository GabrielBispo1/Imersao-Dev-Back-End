import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"  // Importa a função para conectar ao banco de dados

// Esta linha estabelece a conexão com o banco de dados. A string de conexão é obtida 
// da variável de ambiente STRING_CONEXAO. A função conectarAoBanco, localizada em 
// config/dbConfig.js, provavelmente contém a lógica para se conectar ao banco de dados 
// (MongoDB, por exemplo) usando essa string.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "Imersão-instabytes". Essa linha assume que a função 
  // conectarAoBanco retorna um cliente de banco de dados que permite selecionar 
  // bancos de dados.
  const db = conexao.db("Imersão-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados. As coleções são como tabelas 
  // em bancos de dados relacionais, armazenando os documentos (registros).
  const colecao = db.collection("posts");
  // Executa uma operação de busca em toda a coleção "posts" e retorna um array com 
  // todos os documentos encontrados.
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados e a coleção, como na função anterior.
  const db = conexao.db("Imersão-instabytes");
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção. O parâmetro novoPost contém os dados 
  // do novo post a ser inserido. A função insertOne retorna um objeto que contém 
  // informações sobre a operação de inserção, como o ID do documento inserido.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("Imersão-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}