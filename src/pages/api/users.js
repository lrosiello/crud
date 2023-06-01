import { query } from "../../lib/db";
import { areAllDataFilled, isItExists, fixSpaces } from "./utils/validations";

export default async function handler(req, res) {
  let message;
  let user;

  // GET ALL USERS
  if (req.method === "GET") {
    const users = await query("SELECT * FROM usuarios", []);
    res.status(200).json({ users });
  }

  // CREATE A NEW USER
  else if (req.method === "POST") {
    const { nombre, apellido, email, pass } = req.body;

    // VERIFY THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled([nombre, apellido, email, pass])) {

      // THIS DELETES THE EMPTY SPACES OF THE NAME AND EMAIL
      const fixedElements = fixSpaces([nombre, apellido, email]);
      const fixedNombre = fixedElements[0];
      const fixedApellido = fixedElements[1];
      const fixedEmail = fixedElements[2];

      // VERIFIES THAT THE EMAIL DOES NOT ALREADY EXIST
      const verifyEmail = await isItExists("usuarios", "email", fixedEmail);
      if (!verifyEmail) {
        // INSERT A NEW USER
        const addUser = await query(
          "INSERT INTO usuarios (nombre, apellido, email, pass) VALUES($1, $2, $3, $4) RETURNING *",
          [fixedNombre, fixedApellido, fixedEmail, pass]
        );

        // GET DATA FROM THE USER ADDED
        if (addUser.rowCount > 0) {
          const userId = addUser.rows[0].id;
          if (userId) {
            message = "success";
            user = {
              id: userId,
              nombre: fixedNombre,
              apellido: fixedApellido,
              email: fixedEmail,
              pass: pass,
            };
          } else {
            message = "error";
            user = null;
          }
          // RESPONSES
          res
            .status(200)
            .json({ response: { message: message, user: user } });
        }
      } else {
        res
          .status(500)
          .json({ error: "That email already exists, could not create" });
      }
    } else {
      res.status(500).json({
        error: "Be sure that all fields (nombre, apellido, email, pass) are filled",
      });
      res.status(405).end();
    }
  }
}
