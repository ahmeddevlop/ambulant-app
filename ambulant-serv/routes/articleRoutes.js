import express from "express";
import {
  getArticles,
  getArticleById,
  suppArticle,
  creeArticle,
  updateArticle,
  getArticleByFamille,
  getAllArticleByFamille,
  getArticleByNom,
  evaluationArticle,
  nvCreeArticle,
  getArticleByCodeArt,
  getArticleByMarque,
  getAllarticles,
  getArticlefamnul,
} from "../controllers/articleController.js";

const router = express.Router();

router.route("/:code_soc").get(getArticles);
router.route("/all/:code_soc").get(getAllarticles);
//https://gestpro.globalsystempro.com/back/api/articles/all
router.route("/").post(creeArticle);
//par defaut post et put toujours avaient un body
router.route("/nv").post(nvCreeArticle);
router.route("/rechCodeArt/:code_art/:code_soc").get(getArticleByCodeArt);
router.route("/famNull").get(getArticlefamnul);

router.route("/details/:id").get(getArticleById);

router.route("/:nom").get(getArticleByNom);
router.route("/:id").delete(suppArticle);
// const { data } = await Axios.get(`${uri}/api/articles/famille/${itemId}`);
router.route("/:id").put(updateArticle);
router.route("/famille/:id/:code_soc").get(getArticleByFamille);
//Axios.get(`${uri}/api/articles/famille/${itemId}`);
//Axios.get(`${uri}/api/articles/famille/${itemId
router.route("/familleall/:id/:code_soc").get(getAllArticleByFamille);
router.route("/marque/:id").get(getArticleByMarque);
router.route("/evaluation/:id").put(evaluationArticle);
export default router;
