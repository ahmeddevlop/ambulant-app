import express from "express";
import {
  getClients,
  authClient,
  getProfile,
  inscClient,
  updateProfile,
  suppClient,
  getClientById,
  updateClient,
  getClientByCode,
  updateClientbycod,
} from "../controllers/clientController.js";

const router = express.Router();
router.route("/").get(getClients);
router.route("/login").post(authClient);
router.route("/profile").get(getProfile);
router.route("/:cod_cli").get(getClientByCode);
router.route("/majcli/:cod_cli").put(updateClientbycod);

router.route("/profile").put(updateClient);
//updateClientbycod dans le fichier clientController.js
router.route("/").post(inscClient);
router.route("/:id").delete(suppClient);
router.route("/:id").get(getClientById);
router.route("/:id").put(updateProfile);

export default router;
