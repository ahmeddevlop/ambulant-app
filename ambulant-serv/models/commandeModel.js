import mongoose from "mongoose";
const commandeSchema = mongoose.Schema(
  {
    societe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Societe",
    },
    code_soc: {
      type: String,
      required: true,
    },
    nom_soc: {
      type: String,
      required: true,
    },
    commandeId: {
      type: Number,
      required: false,
    },

    chariotListe: [
      {
        nom: { type: String, required: false },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        prix: { type: Number, required: false },
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
      },
    ],

    resultatpaiement: {
      id: { type: String },
      etat: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    articlesPrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxePrix: {
      type: Number,
      required: false,
      default: 0.0,
    },
    livraisonPrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalePrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaie: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_paiement: {
      type: Date,
    },
    isLivree: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_livraison: {
      type: Date,
    },
    cmd_remis: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Commande = mongoose.model("Commande", commandeSchema);
export default Commande;
