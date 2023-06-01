import { query } from "../../../lib/db";
import { areAllDataFilled, isItExists, fixSpaces } from "../utils/validations";

export default async function handler(req, res) {
  let message;

  // GET USER BY ID
  if (req.method === "GET") {
    const userId = req.query.id;
    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const getUserById = await query(
        "SELECT * FROM usuarios WHERE id = $1",
        [userId]
      );
      if (getUserById.rowCount === 0) {
        res.status(500).json({ error: "This user does not exist" });
      } else {
        res.status(200).json({ getUserById });
      }
    }
  }

  // DELETE USER BY ID
  if (req.method === "DELETE") {
    const userId = req.query.id;

    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deleteUser = await query("DELETE FROM usuarios WHERE id = $1", [
        userId,
      ]);

      const rowCount = deleteUser.rowCount;
      if (rowCount > 0) {
        message = "User deleted successfully";
      } else {
        message = "Could not delete, this id does not exist";
      }
      res
        .status(200)
        .json({ response: { message: message, userId: userId } });
    }
  }

  // UPDATE USER BY ID
  if (req.method === "PUT") {
    const userId = req.query.id;

    // VERIFY IF INSERTED ID IS VALID
    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { nombre, apellido, email, pass } = req.body;

      // THIS DELETES THE EMPTY SPACES OF THE NAME AND EMAIL
      const fixedElements = fixSpaces([nombre, apellido, email]);
      const fixedNombre = fixedElements[0];
      const fixedApellido = fixedElements[1];
      const fixedEmail = fixedElements[2];

      // VERIFY IF DATA IS FILLED
      if (areAllDataFilled([nombre, apellido, email, pass])) {

        // VERIFY IF EMAIL ALREADY EXISTS
        const repeated = await isItExists("usuarios", "email", fixedEmail, userId);
        if (!repeated) {
          const updateUser = await query(
            "UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, pass = $4 WHERE id = $5",
            [fixedNombre, fixedApellido, fixedEmail, pass, userId]
          );

          const rowCount = updateUser.rowCount;
          if (rowCount > 0) {
            message = "User updated successfully";
          } else {
            message = "Error, could not update because id does not exist";
          }

          let user = {
            id: userId,
            nombre: fixedNombre,
            apellido: fixedApellido,
            email: fixedEmail,
            pass: pass,
          };
          res
            .status(200)
            .json({ response: { message: message, user: user } });
        } else {
          res
            .status(500)
            .json({ error: "That email already exists, could not update" });
        }
      } else {
        res.status(500).json({
          error: "Be sure that all fields (nombre, apellido, email, pass) are filled",
        });
      }
    }
  }
}
