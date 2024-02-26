import express from "express";
import "dotenv/config";
import router from "./routes"; // Assurez-vous que le chemin est correct

const cors = require("cors");

const app = express();
const PORT = process.env.APP_PORT;

//middleware pour accépter les requetes du frontend

// Configuration des options CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Remplacez cela par l'URL de votre front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
    optionsSuccessStatus: 204, // Répondre avec un code 204 si la requête CORS pré-vérification est réussie
};

app.use(cors(corsOptions));

app.use(express.json());

// Utilisez le routeur pour vos routes d'API
app.use(router);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
