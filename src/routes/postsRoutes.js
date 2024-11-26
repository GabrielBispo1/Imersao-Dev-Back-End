import express from "express";
import { listarPosts } from "../controllers/postsController.js";

// Encapsulando para exportar para outros arquivos
const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());

    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
};

export default routes;