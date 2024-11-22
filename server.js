import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// criando uma rota
app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
});