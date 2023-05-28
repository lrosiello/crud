import { query } from "../../../lib/db";

export default async function handler(req, res) {
  let message;


  
  if (req.method === "DELETE") {
    const categoryId = req.query.id;

    const deleteCategory = await query(
      "DELETE FROM categorias WHERE id = $1", [categoryId]
    );

    const rowCount = deleteCategory.rowCount;
    if (rowCount > 0) {
      message = "success";
    } else {
      message = "error";
    }

    res
      .status(200)
      .json({ response: { message: message, categoryId: categoryId } });
  }


  if (req.method === "PUT") {
    const categoryId = req.query.id;
    const { categoryName, description, orderNumber } = req.body;
  
    const updateCategory = await query(
      "UPDATE categorias SET nombre_categoria = $1, descripcion = $2, numero_orden = $3 WHERE id = $4",
      [categoryName, description, orderNumber, categoryId]
    );
  
    const rowCount = updateCategory.rowCount;
    if (rowCount > 0) {
      message = "success";
    } else {
      message = "error";
    }
  
    let category = {
      id: categoryId,
      nombre_categoria: categoryName,
      descripcion: description,
      numero_orden: orderNumber,
    };
    res.status(200).json({ response: { message: message, category: category } });
  }
  
}