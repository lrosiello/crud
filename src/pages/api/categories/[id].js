import { query } from "../../../lib/db";
import { areAllDataFilled,isItExists,fixSpaces } from "../utils/validations";

export default async function handler(req, res) {
  let message;

  //GET ELEMENT BY ID

  if (req.method === "GET") {
    const categoryId = req.query.id;
    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const getCategoryById = await query(
        "SELECT * FROM categorias WHERE id = $1",
        [categoryId]
      );
      if (getCategoryById.rowCount === 0) {
        res.status(500).json({ error: "This category does not exist" });
      } else {
        res.status(200).json({ getCategoryById });
      }
    }
  }

  if (req.method === "DELETE") {
    const categoryId = req.query.id;

    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deleteCategory = await query(
        "DELETE FROM categorias WHERE id = $1",
        [categoryId]
      );

      const rowCount = deleteCategory.rowCount;
      if (rowCount > 0) {
        message = "category deleted succesfully";
      } else {
        message = "could not delete, this id does not exists";
      }
      res
        .status(200)
        .json({ response: { message: message, categoryId: categoryId } });
    }
  }

  if (req.method === "PUT") {
    const categoryId = req.query.id;

    //VERIFIES IF ID INSERTED IS VALID
    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {

      const {description, orderNumber } = req.body;
      let {categoryName} = req.body;

      //THIS DELETES THE EMPTY SPACES OF THE NAME
      const fixedElements = fixSpaces([categoryName]);
      categoryName = fixedElements[0];
    
      //VERIFIES IF DATA IS FILLED
      if (areAllDataFilled ([categoryName,orderNumber])) { //CALL A FUNCTION TO VERIFY DATA FROM THE BODY

       //VERIFIES IF NAME OF CATEGORY ALREADY EXISTS
        const repeated = await isItExists("categorias","nombre_categoria",categoryName,categoryId);
        if (!repeated) {
          const updateCategory = await query(
            "UPDATE categorias SET nombre_categoria = $1, descripcion = $2, numero_orden = $3 WHERE id = $4",
            [categoryName, description, orderNumber, categoryId]
          );

          const rowCount = updateCategory.rowCount;
          if (rowCount > 0) {
            message = "category updated succesfully";
          } else {
            message = "error, could not update because id does not exists";
          }

          let category = {
            id: categoryId,
            nombre_categoria: categoryName,
            descripcion: description,
            numero_orden: orderNumber,
          };
          res
            .status(200)
            .json({ response: { message: message, category: category } });
        } else {
          res
            .status(500)
            .json({ error: "That category already exists, could not update" });
        }
      } else {
        res.status(500).json({
          error: "Be sure that description and order number are filled",
        });
      }
    }
  }
}
