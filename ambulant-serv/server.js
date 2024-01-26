import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import articleRoutes from "./routes/articleRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import commandeRoutes from "./routes/commandeRoutes.js";
import familleRoutes from "./routes/familleRoutes.js";
import uploadSftp from "./routes/uploadSftp.js";
import societeRoutes from "./routes/societeRoutes.js";
const app = express();

//dotenv.config c'est une  commande qui nous permet d'exploiter le fichier .env   avec le syntaxe process.env.le parametre a selectionné a traver le fichier .env
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
//api basique ping sur racine de serveur
app.use(fileUpload());
app.use("/api/articles", articleRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/familles", familleRoutes);
app.use("/api/uploadSftp", uploadSftp);
app.use("/api/societeRoutes", societeRoutes);
//app.use("/", (req, res) => res.json("Serveur marche!"));

//dans notre cas on va recupéré le port indiquer dans le fichier .env avec le syntaxe ci-dessous
const PORT = process.env.PORT || 5000;

try {
  //pour etablir une connexion avec la base mongodb a tarvers  le variable d'environnement inscrit dans le fichier .env
  const con = await mongoose.connect(process.env.CHAINE_MONGO);

  console.log(
    `Connexion avec base mongo faite avec succés! Base:${con.connection.db.namespace}`
  );
  app.listen(PORT, console.log(`Serveur Marche dans port ${PORT}!`));
} catch (error) {
  console.log(error.message);
}
