// Camada padrão para lidar com as requisições (req) e respostas (res)

import fs from "fs"; // Importa o módulo fs do Node.js para realizar operações no sistema de arquivos
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js"; // Importa as funções para obter e criar posts do modelo de dados
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função para obter todos os posts do modelo de dados
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts em formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  const novoPost = req.body; // Obtém os dados do novo post enviados no corpo da requisição
  try {
    // Chama a função para criar um novo post no modelo de dados
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Obtém o nome original do arquivo da imagem
    alt: ""
  };
  try {
    // Chama a função para criar um novo post no modelo de dados
    const postCriado = await criarPost(novoPost);
    // Cria um novo nome para a imagem com o ID do post inserido
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

