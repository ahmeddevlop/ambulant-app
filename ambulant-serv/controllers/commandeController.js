import { format } from "morgan";
import Commande from "../models/commandeModel.js";
import asyncHandler from "express-async-handler";

// @desc Crée nouveau commande
// @route POST /api/commandes
// @accés privé
//le 22/07/2023 :la fonction ajoutCommande est un controllor qui prend comme parametre d'entrer req.body(cod_cli,cod_rep....)
//a partir de la composante "commanderecap.js"
{
  /*  dispatch(
        creerCommande({
          client: cliR ? repInfo._id : client._id,
          nom_cli: cliR ? repInfo.nom_cli : client.nom_cli,
          cod_cli: cliR ? repInfo.cod_cli : client.cod_cli,
          chariotListe: chariotListe,
          livraisonAdresse: livraisonAdresse,
          methodepaiement: methodePaie,
          articlesPrix: chariot.articlesPrix,
          livraisonPrix: chariot.livraisonPrix,
          totalePrix: chariot.totalePrix,
          date_livraison: date_livraison,
          cod_rep: client.cod_cli,
        }) */
}

const ajoutCommande = asyncHandler(async (req, res) => {
  const {
    chariotListe,
    nom_soc,
    articlesPrix,
    livraisonPrix,
    taxePrix,
    totalePrix,
    date_livraison,
    societe,
    code_soc,
  } = req.body;

  if (articlesPrix && articlesPrix.length === 0) {
    res.status(400);
    throw new Error(`Pas d'articles commandée`);
    return;
  } else {
    const commande = new Commande({
      nom_soc,
      chariotListe,
      date_livraison,
      articlesPrix,
      livraisonPrix,
      taxePrix,
      totalePrix,
      societe,
      code_soc,
    });

    const commandeCree = await commande.save();
    console.log("commande creer avec succes");
    res.status(201).json(commandeCree);
  }
});

// @desc Get Commande by ID
// @route GET /api/commandes/:id
// @accés privé
const getCommandeById = asyncHandler(async (req, res) => {
  const commande = await Commande.findById(req.params.id).populate(
    "utilisateur",
    "nom email"
  );
  if (commande) {
    res.json(commande);
  } else {
    res.status(404);
    throw new Error(`Commande n'existe pas!`);
  }
});
// @desc Mis a jour commande payée
// @route PUT /api/commandes/:id/paie
// @accés privé
/*const updateCommandePaie = asyncHandler(async (req, res) => {
  const commande = await Commande.findById(req.params.id)
  if (commande) {
    commande.isPaie = true
    commande.date_paiement = Date.now()
    commande.resultatpaiement = {
      id: req.body.id,
      etat: req.body.etat,
      update_time: req.body.update_time,
      email: req.body.payeur.email,
    }
    const updatedCommande = await commande.save()
    res.json(updatedCommande)
  } else {
    res.status(404)
    throw new Error(`Commande n'existe pas!`)
  }
})*/
// @desc liste commandes d'utilisateur
// @route GET /api/commandes/mescommandes
// @accés privé
const commandeListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({
    utilisateur: req.utilisateur._id,
  });

  res.json(commandes);

  console.log(commandes);
});
//goroupement total commande par mois
const totCmdeParMois = async (req, res) => {
  console.log(req);
  try {
    const commandes = await Commande.aggregate([
      {
        $addFields: {
          formatD: {
            $dateToString: { format: "%m-%Y", date: "$date_livraison" },
          },
        },
      },
      {
        $match: {
          formatD: { $gte: req.params.deb, $lte: req.params.fin },
        },
      },
      {
        $group: {
          _id: { dt: "$formatD" },
          tot: { $sum: "$totalePrix" },
          count: { $sum: 1 },
        },
      },
    ]).sort({
      formatD: -1,
    });

    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
//fin groupement commande par mois
const totCmdeParMoisRep = async (req, res) => {
  console.log(req);
  try {
    const commandes = await Commande.aggregate([
      {
        $addFields: {
          formatD: {
            $dateToString: { format: "%m-%Y", date: "$date_livraison" },
          },
        },
      },
      {
        $match: {
          formatD: { $gte: req.params.deb, $lte: req.params.fin },
          cod_rep: req.params.rep,
        },
      },
      {
        $group: {
          _id: { dt: "$formatD" },
          tot: { $sum: "$totalePrix" },
          count: { $sum: 1 },
        },
      },
    ]).sort({
      formatD: -1,
    });
    console.log(commandes);
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
// @desc liste commandes
// @route GET /api/commandes
// @accés privé/admin
const commandesListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({});

  res.json(commandes);
});

const cmdnonremis = async (req, res) => {
  const commandes = await Commande.find({ cmd_remis: false });
  let tabRes = [];
  console.log(commandes);
  // commandes.map(cmd=>if(cmd.cod_rep != null){tabRes.push([...tabRes,cmd])})
  res.json(commandes);
};
// @desc liste commandes Client
// @route GET /api/commandes/client/mescommandes
// @accés privé
const clientCommandeListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({ client: req.params.id }).sort({
    date_livraison: -1,
  });

  res.json(commandes);
});
// @desc delete commande Client
// @route DELETE /api/commandes/:id
// @accés privé
const commandeDelete = asyncHandler(async (req, res) => {
  const commande = await Commande.findById(req.params.id);
  if (commande) {
    await commande.remove();
    res.json({ message: "Commande supprimer avec succes" });
  } else {
    res.status(404);
    throw new Error("Commande not found");
  }
});
const updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (commande) {
      commande.isLivree = true;

      const updatedCommande = await commande.save();
      res.json(updatedCommande);
    } else {
      res.status(404);
      throw new Error(`Commande n'existe pas!`);
    }
  } catch (error) {
    console.log(error);
  }
};
const update_remis = async (req, res) => {
  try {
    {
      /* id c"est un parametre depuis c#*/
    }
    const commande = await Commande.findById(req.params.id);
    if (commande) {
      commande.cmd_remis = true;

      const updatedCommande = await commande.save();
      res.json(updatedCommande);
    } else {
      res.status(404);
      throw new Error(`Commande n'existe pas!`);
    }
  } catch (error) {
    console.log(error);
  }
};
const findByDate = async (req, res) => {
  let deb = new Date(req.params.deb);
  let fin = new Date(req.params.fin);
  deb =
    deb.getFullYear() +
    "-" +
    ("0" + (deb.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + deb.getDate()).slice(-2);
  fin =
    fin.getFullYear() +
    "-" +
    ("0" + (fin.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + fin.getDate()).slice(-2);
  console.log(deb);
  console.log(fin);
  try {
    const commandes = await Commande.aggregate([
      {
        $addFields: {
          formatD: {
            $dateToString: { format: "%Y-%m-%d", date: "$date_livraison" },
          },
        },
      },
      {
        $match: {
          formatD: { $gte: deb, $lte: fin },
          cod_cli: req.params.cod_cli,
          // isLivree: req.params.li,
        },
      },
    ]).sort({ date_livraison: -1 });
    res.json(commandes);
    console.log("commande ye sid ahmed :" + commandes);
  } catch (error) {
    console.log(error);
  }
};
//-------------commande de tous les clients
const findAllCmdByDate = async (req, res) => {
  let deb = new Date(req.params.deb);
  let fin = new Date(req.params.fin);

  deb =
    deb.getFullYear() +
    "-" +
    ("0" + (deb.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + deb.getDate()).slice(-2);

  fin =
    fin.getFullYear() +
    "-" +
    ("0" + (fin.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + fin.getDate()).slice(-2);

  console.log("deb:" + deb);
  console.log("fin:" + fin);
  try {
    const commandes = await Commande.aggregate([
      {
        $addFields: {
          formatD: {
            $dateToString: { format: "%Y-%m-%d", date: "$date_livraison" },
          },
        },
      },
      {
        $match: {
          formatD: { $gte: deb, $lte: fin },
        },
      },
    ]);
    res.json(commandes);
  } catch (error) {
    console.log(error);
  }
};
//-------------fin

const findByDateRep = async (req, res) => {
  let deb = new Date(req.params.deb);
  let fin = new Date(req.params.fin);
  let repres = req.params.cod_rep;
  console.log("req.params.cod_rep,; " + req.params.cod_rep);
  console.log("repres :" + repres);
  deb =
    deb.getFullYear() +
    "-" +
    ("0" + (deb.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + deb.getDate()).slice(-2);

  fin =
    fin.getFullYear() +
    "-" +
    ("0" + (fin.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + fin.getDate()).slice(-2);
  console.log(deb);
  console.log(fin);
  console.log("repres :" + repres);
  try {
    const commandes = await Commande.aggregate([
      {
        $addFields: {
          formatD: {
            $dateToString: { format: "%Y-%m-%d", date: "$date_livraison" },
          },
        },
      },
      {
        $match: {
          formatD: { $gte: deb, $lte: fin },
          cod_rep: repres,
        },
      },
    ]);
    res.json(commandes);
    //console.log(commandes);
  } catch (error) {
    console.log(error);
  }
};
const findByCodeComm = async (req, res) => {
  console.log(req.params.cod_comm);
  try {
    const commande = await Commande.findOne({
      commandeId: req.params.cod_comm,
    });
    if (commande) {
      res.json(commande);
    } else {
      res.status(404).json({ message: "Pas de commande de ce code!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
const commandesListeCode = async (req, res) => {
  console.log(req.params);
  try {
    const commandes = await Commande.find({ cod_cli: req.params.cod_cli }).sort(
      { date_livraison: -1 }
    );
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
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
};
