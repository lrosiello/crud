import { query } from "../../lib/db";

export default async function handler(req, res) {
  let categories;
  let message;

  if (req.method === "GET") {
    const categories = await query("SELECT * FROM categorias", []);
    res.status(200).json({ categories });
  } else {
    res.status(405).end();
  }

  if (req.method === "POST") {
    const { categoryName, description, orderNumber } = req.body;
    const addCategory = await query(
      "INSERT INTO categorias (nombre_categoria,descripcion,numero_orden) VALUES($1, $2, $3)",
      [categoryName, description, orderNumber]
    );

    if (addCategory.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    let category = {
      id: addCategory.insertId,
      nombre_categoria: categoryName,
      descripcion: description,
      numero_orden: orderNumber,
    };
    res
      .status(200)
      .json({ response: { message: message, category: category } });
  }

  if (req.method === "DELETE") {
    const categoryId = req.params.id;

    const deleteCategory = await query(
      "DELETE FROM categorias WHERE id = $1", [categoryId]
    )
    const result = deleteCategory.affectedRows;
    if(result){
      message = "success";
    }else{
      message = "error";
    }
    res
    .status(200)
    .json({ response: { message: message, categoryId: categoryId } });
  }
}



