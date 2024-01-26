import express from "express";
import Famille from "../models/familleModel.js";
import asyncHandler from "express-async-handler";

const getFamilles = asyncHandler(async (req, res) => {
  console.log("dans get fam par code soc");
  console.log(req.params);
  const familles = await Famille.find({ code_soc: req.params.code_soc });

  res.json(familles);
});

// @desc Selectionner un article par son ID
// @route GET /api/articles/:id
// @accés public
const getFamilleById = asyncHandler(async (req, res) => {
  const famille = await Famille.findById(req.params.id);
  if (famille) {
    res.json(famille);
  } else {
    res.status(404).json({ message: "Famille non existant" });
  }
});
// @desc    Supp article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const suppFamille = asyncHandler(async (req, res) => {
  const famille = await Famille.findById(req.params.id);

  if (famille) {
    await famille.remove();
    res.json({ message: "famille removed" });
  } else {
    res.status(404);
    throw new Error("famille not found");
  }
});

// @desc    Crée article
// @route   POST /api/articles
// @access  Private/Admin
const creeFamille = async (req, res) => {
  try {
    console.log(req.body);
    const famExist = await Famille.findOne({ code_fam: req.body.code_fam });
    if (famExist) {
      res.status(401).json({ message: "famille deja exist!" });
    } else {
      const famille = new Famille({
        lib_fam: req.body.lib_fam,
        image: req.body.image,
        description: req.body.description,
        code_fam: req.body.code_fam,
        societe: req.body.societe,
        lib_ar_fam: req.body.lib_ar_fam,
        code_soc: req.body.code_soc,
      });
      const familleCree = await famille.save();
      res.json(familleCree);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// @desc    mis a jour article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateFamille = asyncHandler(async (req, res) => {
  const { lib_fam, image, description, lib_ar_fam } = req.body;
  const famille = await Famille.findById(req.params.id);
  if (famille) {
    famille.lib_fam = lib_fam || famille.lib_fam;
    //article.code_art = code_art || article.code_art;
    famille.image = image || famille.image;
    famille.description = description || famille.description;
    famille.lib_ar_fam = lib_ar_fam || famille.lib_ar_fam;
    const familleUpdated = await famille.save();
    res.status(201).json(familleUpdated);
  } else {
    res.status(404);
    throw new Error(`Famille n'existe pas!`);
  }
});
// @desc Selectionner un famille par son Nom
// @route GET /api/famille/:nom
// @accés public
const getFamilleByNom = asyncHandler(async (req, res) => {
  console.log("Debut requette");

  console.log(req.params.nom);
  const famille = req.params.nom.toUpperCase();
  //const co = lib_fam.substr(0, famille.length)

  const familles = await Famille.find({
    lib_fam: { $regex: famille, $options: "i" },
    code_soc: req.params.code_soc,
  });
  if (familles) {
    res.json(familles);
  } else {
    res.status(404).json({ message: "Articles de ce famille non existant" });
  }
});
const getFamilleByCodeFam = asyncHandler(async (req, res) => {
  console.log(req.params.code_fam);
  const famille = await Famille.findOne({
    code_fam: req.params.code_fam,
  });
  if (famille) {
    res.json(famille);
  } else {
    res.status(404).json({ message: " famille non existant" });
  }
});
export {
  getFamilles,
  getFamilleById,
  suppFamille,
  creeFamille,
  updateFamille,
  getFamilleByNom,
  getFamilleByCodeFam,
};
