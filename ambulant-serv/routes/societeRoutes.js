import {
  creerSociete,
  listeSocietes,
  updateSociete,
  detailsSociete,
} from "../controllers/societeController.js";
import express from "express";

const router = express.Router();

router.route("/").post(creerSociete);
router.route("/").get(listeSocietes);
router.route("/:id").put(updateSociete);
router.route("/:id").get(detailsSociete);
export default router;
