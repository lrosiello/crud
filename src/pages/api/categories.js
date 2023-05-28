import { query } from "../../lib/db";

export default async function handler(req, res) {

  let message;
  

  if (req.method === "GET") {
    const categories = await query("SELECT * FROM categorias", []);
    res.status(200).json({ categories });
  } else {
    res.status(405).end();
  }

  if (req.method === "POST") {
    let category;
    const { categoryName, description, orderNumber } = req.body;
    const addCategory = await query(
      "INSERT INTO categorias (nombre_categoria,descripcion,numero_orden) VALUES($1, $2, $3)",
      [categoryName, description, orderNumber]
    );

    if (addCategory.rows.length > 0) {
      const categoryId = addCategory.rows[0].id;
      if(categoryId){
        message = "success";
        category = {
          id: categoryId,
          nombre_categoria: categoryName,
          descripcion: description,
          numero_orden: orderNumber,
        };
      }else {
        message = "error";
        category = null;
      } 
    }
    res
      .status(200)
      .json({ response: { message: message, category: category } });
  }

  



  
}



