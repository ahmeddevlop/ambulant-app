import asyncHandler from "express-async-handler";
import Societe from "../models/societeModel.js";

//@type:POST
//@desc:Creer une nouvelle société
//@api:/api/societe/
const creerSociete = asyncHandler(async (req, res) => {
  const {
    code_soc,
    nom_soc,
    abrv_soc,
    adr_soc,
    tva_soc,
    tel_soc,
    logo_soc,
    nom_soc_ar,
    mdp_soc,
  } = req.body;
  //console.log(code_soc);
  const societe = await Societe.findOne({ code_soc });
  if (societe) {
    console.log(societe);
    res.json({ message: "Sociéte déja existante!" });
  } else {
    const createdSociete = await Societe.create({
      code_soc,
      nom_soc,
      abrv_soc,
      adr_soc,
      tva_soc,
      tel_soc,
      logo_soc,
      nom_soc_ar,
      mdp_soc,
    });
    res.json(createdSociete);
  }
});
//@type:GET
//@desc:récupération de la liste sociétés
//@api:/api/societe/
//le controller qui selctionne la liste des societes avec la requet societe.find (base mongodb dans notre cas)
const listeSocietes = asyncHandler(async (req, res) => {
  const societes = await Societe.find({});
  //le resultat de la requet a la base est actualiser dans le variable societes
  //si la liste des societes est vid alors a envoyer un message d'erreur vers le frontend que se soit c# ou react our react nativ....
  if (societes?.length == 0) {
    res.status(404).json({ message: "Pas des sociétés!" });
  } else {
    //   si il ya des donnée alors en rtour la liste  des societe sous form json vers le frontend
    res.json(societes);
  }
});
//@type:PUT
//@desc:mis a jour des donnés
//@api:/api/societe/:id
const updateSociete = asyncHandler(async (req, res) => {
  try {
    const {
      code_soc,
      nom_soc,
      abrv_soc,
      adr_soc,
      tel_soc,
      tva_soc,
      nom_soc_ar,
      mdp_soc,
    } = req.body;
    const societe = await Societe.findById(req.params.id);
    if (!societe) {
      throw new Error("Société n'existe pas!");
    } else {
      societe.code_soc = code_soc || societe.code_soc;
      societe.nom_soc = nom_soc || societe.nom_soc;
      societe.abrv_soc = abrv_soc || societe.abrv_soc;
      societe.adr_soc = adr_soc || societe.adr_soc;
      societe.tel_soc = tel_soc || societe.tel_soc;
      societe.tva_soc = tva_soc || societe.tva_soc;
      societe.nom_soc_ar = nom_soc_ar || societe.nom_soc_ar;
      societe.mdp_soc = mdp_soc || societe.mdp_soc;

      const updatedSociete = await societe.save();
      res.json(updatedSociete);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:GET
//@desc:détails de societes
//@api:/api/societe/:id

const detailsSociete = asyncHandler(async (req, res) => {
  const societe = await Societe.findById(req.params.id);
  if (societe) {
    res.json(societe);
  } else {
    res.status(404).json("Société n'existe pas!");
  }
});
export { creerSociete, listeSocietes, updateSociete, detailsSociete };
