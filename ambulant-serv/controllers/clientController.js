import Client from "../models/clientModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc Selectionner tous les clients
// @route GET /api/clients
// @accés public/Admin

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});

  res.json(clients);
});
const getClientByCode = async (req, res) => {
  const client = await Client.findOne({ cod_cli: req.params.cod_cli });
  res.json(client);
};
// @desc authentifier utilisateur et get token
// @route POST /api/utilisateurs/login
// @accés post
const authClient = asyncHandler(async (req, res) => {
  console.log("avant req.body");
  console.log(req.body);
  const { nom_cli, cod_cli } = req.body;

  console.log(nom_cli);

  /* test requet */

  const client = await Client.findOne({ abrv_cli: nom_cli, cod_cli });
  console.log("client existant :" + client);
  if (client) {
    console.log(client);
    res.json({
      _id: client._id,
      cod_cli: client.cod_cli,
      nom_cli: client.nom_cli,
      adr_cli: client.adr_cli,
      email_cli: client.email_cli,
      tel_cli: client.tel_cli,
      cod_tarif: client.cod_tarif,
      photo_cli: client.photo_cli,
      cod_tarif: client.cod_tarif,
      nivcli_cloud: client.nivcli_cloud,
      is_Rep: client.is_Rep,
      cod_rep: client.cod_rep,
      is_Admin: client.is_Admin,
      abrv_cli: client.abrv_cli,
      REP_GERCLI: client.REP_GERCLI,
      chiffre: client.chiffre,
      code_soc: client.code_soc,
      solde: client.solde,
      groupe: client.groupe,
      token: generateToken(client._id),
    });
  } else {
    res.status(404).json({ message: "Vérifier vos information!" });
  }
});
// @desc retourner le profile de l'utilisateur
// @route GET /api/utilisateurs/profile
// @accés Privé
const getProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.client._id);
  if (client) {
    res.json({
      _id: client._id,
      cod_cli: client.cod_cli,
      nom_cli: client.nom_cli,
      adr_cli: client.adr_cli,
      tel_cli: client.tel_cli,
      email_cli: client.email_cli,
      cod_tarif: client.cod_tarif,
      photo_cli: client.photo_cli,
      is_Admin: client.is_Admin,
      nivcli_cloud: client.nivcli_cloud,
      solde: client.solde,
      REP_GERCLI: client.REP_GERCLI,
      chiffre: client.chiffre,
    });
  } else {
    res.status(404);
    throw new Error("Client non existant");
  }
});
// @desc inscription nouveau utilisateur
// @route POST /api/utilisateurs
// @accés public
const inscClient = asyncHandler(async (req, res) => {
  console.log("dans route creer client");
  try {
    const {
      cod_cli,
      nom_cli,
      adr_cli,
      tel_cli,
      photo_cli,
      cod_tarif,
      email_cli,
      cod_rep,
      is_Rep,
      nivcli_cloud,
      cod_tva,
      solde,
      is_Admin,
      abrv_cli,
      REP_GERCLI,
      chiffre,
      code_soc,
    } = req.body;
    console.log("body:");
    console.log(req.body);
    const clientExist = await Client.findOne({ cod_cli });
    console.log(clientExist);
    if (clientExist) {
      res.json("Client déja exist");
      console.log("exist:" + clientExist);
    } else {
      const client = await Client.create({
        cod_cli,
        nom_cli,
        adr_cli,
        tel_cli,
        photo_cli,
        email_cli,
        cod_tarif,
        cod_rep,
        abrv_cli,
        is_Rep: is_Admin == "R" || is_Admin == true ? true : false,
        nivcli_cloud,
        cod_tva,
        solde,
        REP_GERCLI,
        chiffre,
        code_soc,
        is_Admin: is_Admin == "A" ? true : false,
      });

      res.json({
        _id: client._id,
        cod_cli: client.cod_cli,
        nom_cli: client.nom_cli,
        email_cli: client.email_cli,
        adr_cli: client.adr_cli,
        tel_cli: client.tel_cli,
        cod_tarif: client.cod_tarif,
        photo_cli: client.photo_cli,
        cod_rep: client.cod_rep,
        nivcli_cloud: client.nivcli_cloud,
        is_Rep: client.is_Rep,
        cod_tva: client.cod_tva,
        solde: client.solde,
        is_Admin: client.is_Admin,
        abrv_cli: client.abrv_cli,
        REP_GERCLI: client.REP_GERCLI,
        chiffre: client.chiffre,
        code_soc: client.code_soc,
        token: generateToken(client._id),
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    } else {
      res.status(500);
      throw new Error("erreur de serveur!");
    }
  }
});
// @desc Mis a jour le profile de l'utilisateur
// @route PUT /api/utilisateurs/profile
// @accés Privé
const updateProfile = async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    client.nom_cli = req.body.nom_cli || client.nom_cli;
    client.email_cli = req.body.email_cli || client.email_cli;
    client.tel_cli = req.body.tel_cli || client.tel_cli;
    client.photo_cli = req.body.photo_cli || client.photo_cli;
    client.adr_cli = req.body.adr_cli || client.adr_cli;
    client.cod_tarif = req.body.cod_tarif || client.cod_tarif;
    client.is_Rep = req.body.is_Rep || client.is_Rep;
    client.is_Admin = req.body.is_Admin || client.is_Admin;
    client.nivcli_cloud = req.body.nivcli_cloud || client.nivcli_cloud;
    client.chiffre = req.body.chiffre || client.chiffre;
    client.code_soc = req.body.code_soc || client.code_soc;

    if (req.body.cod_cli) {
      client.cod_cli = req.body.cod_cli;
    }
    if (!req.body.cod_rep) {
      client.cod_rep = "";
    } else {
      client.cod_rep = req.body.cod_rep || client.cod_rep;
    }
    const updatedClient = await client.save();
    res.json({
      _id: updatedClient._id,
      cod_cli: updatedClient.cod_cli,
      nom_cli: updatedClient.nom_cli,
      email_cli: updatedClient.email_cli,
      adr_cli: updatedClient.adr_cli,
      tel_cli: updatedClient.tel_cli,
      cod_tarif: updatedClient.cod_tarif,
      photo_cli: updatedClient.photo_cli,
      is_Rep: updatedClient.is_Rep,
      solde: updatedClient.solde,
      is_Admin: updatedClient.is_Admin,
      nivcli_cloud: updatedClient.nivcli_cloud,
      chiffre: updatedClient.chiffre,

      token: generateToken(updatedClient._id),
    });
    console.log(updatedClient);
  } else {
    res.status(404);
    throw new Error("Client non existantes");
  }
};
//req est envoyer par le frontend qui peut etre un composant react web ou autre programme comme c# ou react native
// le req contient la requet http,les params,et le body
//sous le req on trouve le params=cod_cli et le body qui contient nom_cli,cod_cli,adr_cli....
const updateClientbycod = async (req, res) => {
  console.log(req.params.cod_cli);
  try {
    let client = await Client.findOne({ cod_cli: req.params.cod_cli });
    //var clirech = await client.PutAsync(adr_api + reader[0].ToString(), donnJson);

    if (client) {
      //c'est préparation de la mise ajour a affecter au niveau de la base de donnée
      client.nom_cli = req.body.nom_cli || client.nom_cli;
      client.email_cli = req.body.email_cli || client.email_cli;
      client.tel_cli = req.body.tel_cli || client.tel_cli;
      client.photo_cli = req.body.photo_cli || client.photo_cli;
      client.adr_cli = req.body.adr_cli || client.adr_cli;
      client.cod_tarif = req.body.cod_tarif || client.cod_tarif;
      client.is_Rep = req.body.is_Rep = "R" ? true : false;
      client.nivcli_cloud = req.body.nivcli_cloud || client.nivcli_cloud;
      client.abrv_cli = req.body.abrv_cli || client.abrv_cli;

      client.solde = req.body.solde || client.solde;
      client.cod_rep = req.body.cod_rep || client.cod_rep;
      client.ville_cli = req.body.ville_cli || client.ville_cli;
      client.chiffre = req.body.chiffre || client.chiffre;
      client.code_soc = req.body.code_soc || client.code_soc;

      client.is_Admin = req.body.is_Admin
        ? req.body.is_Admin == "A"
          ? true
          : false
        : client.is_Admin;
      client.REP_GERCLI = req.body.REP_GERCLI || client.REP_GERCLI;
      //a ce niveau on lance la réalisation de la mise ajour reel dans la base
      const updatedClient = await client.save();

      res.json(updatedClient);

      console.log(updatedClient);
    } else {
      res.status(404).json({ message: "Client non existantes" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" });
    console.log(error);
  }
};

// @desc Supprimer un utilisateur
// @route DELETE /api/utilisateurs/:id
// @accés Privé/Admin
const suppClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (client) {
    await client.remove();
    res.json({ message: "Client supprimer!" });
  } else {
    res.status(404);
    throw new Error("Client non existant!");
  }
});

// @desc Selectionner client  by id
// @route GET /api/utilisateurs/:id
// @accés privé/Admin
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client non existant!");
  }
});
// @desc Mis a jour  client
// @route PUT /api/utilisateurs/:id
// @accés Privé/admin
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  //console.log(req.body);
  if (client) {
    //console.log(req.body);
    client.nom_cli = req.body.nom_cli || client.nom_cli;
    client.email_cli = req.body.email_cli || client.email_cli;
    client.tel_cli = req.body.tel_cli || client.tel_cli;
    client.photo_cli = req.body.photo_cli || client.photo_cli;
    client.adr_cli = req.body.adr_cli || client.adr_cli;
    client.cod_tarif = req.body.cod_tarif || client.cod_tarif;
    client.cod_rep = req.body.cod_rep || client.cod_rep;
    client.is_Rep = req.body.is_Rep || client.is_Rep;
    client.solde = req.body.solde || client.solde;
    client.is_Admin = req.body.is_Admin || client.is_Admin;
    client.nivcli_cloud = req.body.nivcli_cloud || client.nivcli_cloud;
    client.abrv_cli = req.body.abrv_cli || client.abrv_cli;
    client.REP_GERCLI = req.body.REP_GERCLI || client.REP_GERCLI;
    client.chiffre = req.body.chiffre || client.chiffre;
    client.code_soc = req.body.code_soc || client.code_soc;

    const updatedClient = await client.save();
    res.json({
      _id: updatedClient._id,
      cod_cli: updatedClient.cod_cli,
      nom_cli: updatedClient.nom_cli,
      email_cli: updatedClient.email_cli,
      adr_cli: updatedClient.adr_cli,
      tel_cli: updatedClient.tel_cli,
      cod_tarif: updatedClient.cod_tarif,
      photo_cli: updatedClient.photo_cli,
      cod_rep: updatedClient.cod_rep,
      is_Rep: updatedClient.is_Rep,
      solde: updatedClient.solde,
      is_Admin: updatedClient.is_Admin,
      nivcli_cloud: updatedClient.nivcli_cloud,
      abrv_cli: updatedClient.abrv_cli,
      REP_GERCLI: updatedClient.REP_GERCLI,
      chiffre: updatedClient.chiffre,
      code_soc: updatedClient.code_soc,
    });
  } else {
    res.status(404);
    throw new Error("Client non existant");
  }
});

export {
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
};
