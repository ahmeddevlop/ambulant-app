import express from "express";
import {
  ajoutCommande,
  getCommandeById,
  commandeListe,
  commandesListe,
  clientCommandeListe,
  commandeDelete,
  update_remis,
  cmdnonremis,
  findByDate,
  findByDateRep,
  commandesListeCode,
  findByCodeComm,
  updateCommande,
  findAllCmdByDate,
  totCmdeParMois,
  totCmdeParMoisRep,
} from "../controllers/commandeController.js";

const router = express.Router();
router.route("/").post(ajoutCommande);
router.route("/mescommandes").get(commandeListe);
router.route("/cmdParCode/:cod_cli").get(commandesListeCode);
router.route("/cmdParCodeComm/:cod_comm").get(findByCodeComm);

router.route("/client/mescommandes/:id").get(clientCommandeListe);
router.route("/remis").get(cmdnonremis);

router.route("/:id").get(getCommandeById);
router.route("/cmdByDate/:deb/:fin/:cod_cli").get(findByDate);
router.route("/cmdByDateRep/:deb/:fin/:cod_rep").get(findByDateRep);
router.route("/cmdByDateAll/:deb/:fin").get(findAllCmdByDate);

/*router.route('/:id/paie').put(protege, updateCommandePaie)*/
router.route("/").get(commandesListe);
router.route("/totcmd/:deb/:fin").get(totCmdeParMois);
router.route("/totcmd/:deb/:fin/:rep").get(totCmdeParMoisRep);

router.route("/:id").delete(commandeDelete);
router.route("/:id").put(updateCommande);

router.route("/remis/:id").put(update_remis);

export default router;
