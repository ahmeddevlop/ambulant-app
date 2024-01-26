import express from "express";

import {
  getFamilles,
  getFamilleById,
  suppFamille,
  creeFamille,
  updateFamille,
  getFamilleByNom,
  getFamilleByCodeFam,
} from "../controllers/familleController.js";
const router = express.Router();

router.route("/").post(creeFamille);

router.route("/:code_soc").get(getFamilles);
router.route("/:nom/:code_soc").get(getFamilleByNom);
router.route("/rechCodeFam/:code_fam").get(getFamilleByCodeFam);

router.route("/:id").get(getFamilleById);

router.route("/:id").delete(suppFamille);

router.route("/:id").put(updateFamille);

export default router;
