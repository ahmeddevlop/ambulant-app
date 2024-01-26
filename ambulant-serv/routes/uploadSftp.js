//import multer from "multer";
//import sftpStorage from "multer-sftp";
import express from "express";
import path from "path";
import Client from "ssh2-sftp-client";
const router = express.Router();
const client = new Client();
const options = {
  host: "gestpro.globalsystempro.com",
  port: "22",
  username: "gestpro",
  password: "F0yYsZvxFhuJrjO",
  algorithms: {
    kex: [
      "diffie-hellman-group1-sha1",
      "ecdh-sha2-nistp256",
      "ecdh-sha2-nistp384",
      "ecdh-sha2-nistp521",
      "diffie-hellman-group-exchange-sha256",
      "diffie-hellman-group14-sha1",
    ],
    cipher: [
      "3des-cbc",
      "aes128-ctr",
      "aes192-ctr",
      "aes256-ctr",
      "aes128-gcm",
      "aes128-gcm@openssh.com",
      "aes256-gcm",
      "aes256-gcm@openssh.com",
    ],
    serverHostKey: [
      "ssh-rsa",
      "ecdsa-sha2-nistp256",
      "ecdsa-sha2-nistp384",
      "ecdsa-sha2-nistp521",
    ],
    hmac: ["hmac-sha2-256", "hmac-sha2-512", "hmac-sha1"],
  },
};

router.route("/").post(async (req, res) => {
  console.log(`Connecting to ${options.host}:${options.port}`);
  try {
    const resCon = await client.connect(options);
    if (resCon) {
      console.log("connection sftp faite avec succés!");
    }

    const resupload = await client.put(
      Buffer.from(req.files.file.data),
      `/home/gestpro/public_html/uploads/` + req.files.file.name
    );
    console.log(resupload);
    resCon.end();
    await client.end();
    res.send(`/uploads/${req.files.file.name}`);
  } catch (err) {
    console.log("Failed to connect:", err);
  }
});
/*
const storage = sftpStorage({
  sftp: {
    host: "gestpro.globalsystempro.com",
    port: 22,
    username: "gestpro",
    password: "F0yYsZvxFhuJrjO",
  },
  destination: (req, file, cb) => cb(null, "/imgtest"),
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});



router.post("/", upload.single("file"), (req, res) => {
  console.log(req.file);
  try {
    console.log(req.file);
    res.send(`/uploads/${req.file.filename}`);
    //console.log(`/uploads/${req.file.filename}`);
  } catch (error) {
    console.log(`upload.single error: ${error}`);
    return res.sendStatus(500);
  }
});
*/
export default router;
