import express from "express"; // Importa a biblioteca Express para criar a aplicação web
import multer from "multer"; // Importa a biblioteca Multer para lidar com uploads de arquivos

// Importa as funções controladoras para posts vindas de outro arquivo
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original: file.originalname
    cb(null, file.originalname);
  }
});

// Cria uma instância do upload do Multer com as configurações de armazenamento
const upload = multer({dest:"./uploads", storage}); // Pode ser redundante com storage

// Função para encapsular as rotas e exportá-las
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());

  // Rota GET para listar todos os posts - manipuladores de rotas definidos em postsController.js
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post - manipuladores de rotas definidos em postsController.js
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem utilizando o middleware upload.single('imagem'), para uma única imagem
  // O manipulador de rota para upload da imagem está definido em postsController.js
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes; // Exporta a função routes para uso em outros arquivos