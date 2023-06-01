import { query } from "../../lib/db";
import { areAllDataFilled, isItExists , fixSpaces } from "./utils/validations";

export default async function handler(req, res) {
  let message;
  let category;


  //GET ALL CATEGORIES
  if (req.method === "GET") {
    const categories = await query("SELECT * FROM categorias", []);
    res.status(200).json({ categories });
  } 
  
  //CREATE A NEW CATEGORY
  else if (req.method === "POST") {
    const {description, orderNumber, available } = req.body;
    let {categoryName} = req.body;

    //VERIFIES THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled ([categoryName,orderNumber,available])) {

      //THIS DELETES THE EMPTY SPACES OF THE NAME
      const fixedElements = fixSpaces([categoryName]);
      categoryName = fixedElements[0];
    
      //VERIFIES THAT THE CATEGORY DOES NOT EXISTS
      const verifyName = await isItExists("categorias","nombre_categoria",categoryName);
      if (!verifyName) {
        //INSERT A NEW CATEGORY
        const addCategory = await query(
          "INSERT INTO categorias (nombre_categoria,descripcion,numero_orden,disponible) VALUES($1, $2, $3, $4) RETURNING *",
          [categoryName, description, orderNumber, available]
        );
        //IT TAKES DATA FROM THE CATEGORY ADDED
        if (addCategory.rowCount > 0) {
          const categoryId = addCategory.rows[0].id;
          if (categoryId) {
            message = "success";
            category = {
              id: categoryId,
              nombre_categoria: categoryName,
              descripcion: description,
              numero_orden: orderNumber,
              disponible: available,
            };
          } else {
            message = "error";
            category = null;
          }
          //RESPONSES
          res
            .status(200)
            .json({ response: { message: message, category: category } });
        }
      } else {
        res
          .status(500)
          .json({ error: "That category already exists, could not create" });
      }
    } else {
      res.status(500).json({
        error: "Be sure that description and order number, even (available) are filled",
      });
      res.status(405).end();
    }
  }
}
