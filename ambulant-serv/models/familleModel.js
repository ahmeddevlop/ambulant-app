import mongoose from "mongoose";

const familleSchema = mongoose.Schema({
  societe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Societe",
  },

  lib_fam: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  code_fam: {
    type: String,
    required: false,
  },
  lib_ar_fam: {
    type: String,
    required: false,
  },
  code_soc: {
    type: String,
    required: false,
  },
});
const Famille = mongoose.model("Famille", familleSchema);

export default Famille;
