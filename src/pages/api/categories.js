import { query } from "../../lib/db";
import { areAllDataFilled, isItExists } from "./utils/validations";

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
    const { categoryName, description, orderNumber } = req.body;

    //VERIFIES THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled ([categoryName,orderNumber])) {
    
      //VERIFIES THAT THE CATEGORY DOES NOT EXISTS
      const verifyName = await isItExists("categorias","nombre_categoria",categoryName);
      if (!verifyName) {
        //INSERT A NEW CATEGORY
        const addCategory = await query(
          "INSERT INTO categorias (nombre_categoria,descripcion,numero_orden) VALUES($1, $2, $3) RETURNING *",
          [categoryName, description, orderNumber]
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
        error: "Be sure that description and order number are filled",
      });
      res.status(405).end();
    }
  }
}
