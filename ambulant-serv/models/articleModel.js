import mongoose from "mongoose";
const evaluationsSchema = mongoose.Schema(
  {
    nom: { type: String, required: false },
    rating: { type: Number, required: false },
    commentaire: { type: String, required: false },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
  },
  { timestamps: true }
);

const articleSchema = mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
    famille: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Famille",
    },
    sous_famille: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "sous_famille",
    },
    code_art: {
      type: String,
      required: false,
    },
    nom: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    marque: {
      type: String,
      required: false,
    },
    categorie: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    prix_1: {
      type: Number,
      required: false,
      //G1
    },
    prix_2: {
      type: Number,
      required: false,
      //G2
    },
    prix_3: {
      type: Number,
      required: false,
      //G3
    },
    prix_achat: {
      type: Number,
      required: false,
    },
    num_stock: {
      type: Number,
      required: false,
    },
    code_soc: {
      type: String,
      required: false,
    },
    evaluations: [evaluationsSchema],
    evaluation: {
      type: Number,
      required: false,
      default: 0,
    },
    numevaluation: {
      type: Number,
      required: false,
      default: 0,
    },
    lib_ar: {
      type: String,
      required: false,
    },
    partager: {
      type: Boolean,
      required: true,
      default: true,
    },
    marque: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Marque",
    },
    coiff: {
      type: Number,
      required: false,
      default: 1,
    },
    art_max: {
      type: String,
      required: false,
      default: "N",
    },
    nbr_max: {
      type: Number,
      required: false,
    },
    figurer: {
      type: String,
      required: false,
      default: "O",
    },
    code_fam: {
      type: String,
      required: true,
    },
    code_soc: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);
export default Article;
