import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    cod_cli: {
      type: String,
      required: true,
    },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
    societe: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Societe",
    },
    code_soc: {
      type: String,
      required: false,
    },
    nom_cli: {
      type: String,
      required: true,
    },
    abrv_cli: {
      type: String,
      required: false,
    },
    photo_cli: {
      type: String,
      required: false,
    },
    adr_cli: {
      type: String,
      required: false,
    },
    ville_cli: {
      type: String,
      required: false,
    },
    tel_cli: {
      type: String,
      required: true,
    },
    email_cli: {
      type: String,
      required: false,
    },
    cod_tarif: {
      type: String,
      required: false,
    },
    cod_rep: {
      type: String,
      required: false,
    },
    is_Admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    REP_GERCLI: {
      type: String,
      required: true,
      default: "O",
    },
    is_Rep: {
      type: Boolean,
      required: false,
      default: false,
    },
    nivcli_cloud: {
      type: String,
      required: true,
      default: "F",
    },
    cod_tva: {
      type: String,
      required: false,
    },
    chiffre: {
      type: Number,
      default: 0,
      required: false,
    },
    solde: {
      type: Number,
      default: 0,
      required: false,
    },
    groupe: {
      type: String,

      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
