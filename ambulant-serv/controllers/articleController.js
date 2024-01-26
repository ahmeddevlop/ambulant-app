import express from "express";
import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";

// @desc    Crée article
// @route   POST /api/articles
// @access  Private/Admin

const getAllarticles = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Article.countDocuments({ code_soc: req.params.code_soc });
  let articles;
  console.log(page + " " + pageSize);
  if (req.query.limite == "N") {
    console.log("non limite");
    articles = await Article.find({ code_soc: req.params.code_soc });
  } else {
    console.log("avec limite");
    articles = await Article.find({ code_soc: req.params.code_soc })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }

  res.json({ articles, page, pages: Math.ceil(count / pageSize) });
  console.log("article :" + articles);
});

const nvCreeArticle = async (req, res) => {
  //req :contient le body=les données a saisir
  //res :le resulatat a retourné
  try {
    let article = new Article({
      nom: req.body.nom,
      prix_1: req.body.prix_1,
      prix_2: req.body.prix_2,
      prix_3: req.body.prix_3,
      prix_achat: req.body.prix_achat,
      //utilisateur: req.utilisateur._id,
      image: req.body.image,
      categorie: req.body.categorie,
      marque: req.body.marque,
      num_stock: req.body.num_stock,
      numevaluation: req.body.numevaluation,
      description: req.body.description,
      code_art: req.body.code_art,
      famille: req.body.famille,
      lib_ar: req.body.lib_ar,
      partager: req.body.partager == "True" ? true : false,
      coiff: req.body.coiff,
      art_max: req.body.art_max,
      nbr_max: req.body.nbr_max,
      figurer: req.body.figurer,
      code_fam: req.body.code_fam,
      code_soc: req.body.code_soc,
    });
    const articleCree = await article.save();
    res.json(articleCree);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

// @desc Selectionner tous les articles
// @route GET /api/articles
// @accés public
const getArticles = asyncHandler(async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  let articles;
  const count = await Article.countDocuments({
    partager: true,
    code_soc: req.params.code_soc,
  });
  console.log(page + " " + pageSize);
  if (req.query.limite == "N") {
    articles = await Article.find({
      code_soc: req.params.code_soc,
    });
  } else {
    articles = await Article.find({
      code_soc: req.params.code_soc,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }

  res.json({ articles, page, pages: Math.ceil(count / pageSize) });
});

// @desc Selectionner un article par son ID
// @route GET /api/articles/:id
// @accés public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article non existant" });
  }
});
// @desc    Supp article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const suppArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "article removed" });
  } else {
    res.status(404);
    throw new Error("article not found");
  }
});

// @desc    Crée article
// @route   POST /api/articles
// @access  Private/Admin
//non utilisable
const creeArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    nom: "Sample name",
    prix_1: 1,
    prix_2: 1,
    prix_3: 2,
    utilisateur: req.utilisateur._id,
    image: "/images/sample.jpg",
    categorie: "sample categorie",
    marque: "sample marque",
    num_stock: 1,
    numevaluation: 0,
    description: "Sample description",
    code_art: "Sample code_art",
    famille: req.utilisateur._id,
    ART_MAX: req.utilisateur.ART_MAX,
    NBR_MAX: req.utilisateur.NBR_MAX,
    code_soc: req.body.code_soc,
  });
  const articleCree = await article.save();
  res.status(201).json(articleCree);
});
// @desc    mis a jour article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const {
    code_art,
    nom,
    prix_1,
    prix_2,
    prix_3,
    prix_achat,
    image,
    categorie,
    num_stock,
    description,
    marque,
    famille,
    lib_ar,
    partager,
    coiff,
    art_max,
    nbr_max,
    figurer,
    code_fam,
    code_soc,
  } = req.body;
  console.log(req.body);
  console.log(partager);
  const article = await Article.findById(req.params.id);
  if (article) {
    article.code_art = code_art || article.code_art;
    article.nom = nom || article.nom;
    article.prix_1 = prix_1 || article.prix_1;
    article.prix_2 = prix_2 || article.prix_2;
    article.prix_3 = prix_3 || article.prix_3;
    article.prix_achat = prix_achat || article.prix_achat;
    article.figurer = figurer || article.figurer;

    article.image = image || article.image;
    article.marque = marque || article.marque;
    article.categorie = categorie || article.categorie;
    article.num_stock = num_stock || article.num_stock;
    article.famille = famille || article.famille;
    article.description = description || article.description;
    article.lib_ar = lib_ar || article.lib_ar;
    //if partager="true" then true else
    article.code_soc = code_soc || article.code_soc;
    article.partager =
      partager == "True"
        ? true
        : partager == "False"
        ? false
        : article.partager;
    article.coiff = coiff || article.coiff;
    article.art_max = art_max || article.art_max;
    article.nbr_max = nbr_max || article.nbr_max;
    article.code_fam = code_fam || article.code_fam;
    article.code_soc = code_soc || article.code_soc;

    const articleUpdated = await article.save();
    res.status(201).json(articleUpdated);
  } else {
    res.status(404);
    throw new Error(`Article n'existe pas!`);
  }
});

// @desc Selectionner un article par son Famille
// @route GET /api/articles/famille/:id
// @accés public
const getArticleByFamille = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const famille = req.params.id;
  const articles = await Article.find({
    famille: req.params.id,
    partager: true,
    code_soc: req.params.code_soc,
  });
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Articles de ce famille non existant" });
  }
});
const getAllArticleByFamille = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const famille = req.params.id;
  const articles = await Article.find({
    famille: req.params.id,
    code_soc: req.params.code_soc,
  });
  if (articles) {
    res.json(articles);
    console.log(articles);
  } else {
    res.status(404).json({ message: "Articles de ce famille non existant" });
  }
});

const getArticleByMarque = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  //const marque = req.params.id;
  const articles = await Article.find({
    marque: req.params.id,
    partager: true,
    code_soc: req.params.code_soc,
  });
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Articles de ce famille non existant" });
  }
});
// @desc Selectionner un famille par son Nom
// @route GET /api/famille/:nom
// @accés public
const getArticleByNom = asyncHandler(async (req, res) => {
  console.log("Debut requette");

  console.log(req.params.nom);
  const article = req.params.nom.toUpperCase();
  //const co = lib_fam.substr(0, famille.length)

  const articles = await Article.find({
    nom: { $regex: article, $options: "i" },
  });
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Articles non existant" });
  }
});
const getArticleByCodeArt = async (req, res) => {
  console.log(req.params);
  const article = await Article.findOne({
    code_art: req.params.code_art,
    code_soc: req.params.code_soc,
  });
  if (article) {
    console.log("existe");
    res.json(article);
    console.log(article);
  } else {
    res.status(404).json({ message: "Article non existant" });
  }
};
const getArticlefamnul = async (req, res) => {
  const articles = await Article.find({
    code_fam: null,
  });
  if (articles) {
    res.json(articles);
    console.log(articles);
  } else {
    res.status(404).json({ message: "Pas des articles du fam null" });
  }
};
const evaluationArticle = asyncHandler(async (req, res) => {
  const { nom, commentaire, rating, utilisateur } = req.body;

  const article = await Article.findById(req.params.id);
  if (article) {
    article.evaluations.push({ nom, commentaire, rating, utilisateur });
    /*
    article.evaluations.nom=req.body.nom
    article.evaluations.rating=req.body.rating
    article.evaluations.commentaire=req.body.commentaire 
    article.evaluations.utilisateur=req.body.utilisateur*/
    console.log(article.evaluations);
    const articleUpdated = await article.save();

    res.status(201).json(articleUpdated);
  } else {
    res.status(404).json({ message: "Article nexiste pas!" });
  }
});
export {
  getArticles,
  getArticleById,
  suppArticle,
  creeArticle,
  updateArticle,
  getArticleByFamille,
  getArticleByNom,
  evaluationArticle,
  nvCreeArticle,
  getArticleByCodeArt,
  getArticleByMarque,
  getAllarticles,
  getAllArticleByFamille,
  getArticlefamnul,
};
