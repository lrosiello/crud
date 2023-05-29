import { query } from "../../../lib/db";
import { areAllDataFilled } from "../utils/validations";

export default async function handler(req, res) {
  let message;

  //GET ELEMENT BY ID

  if (req.method === "GET") {
    const layerId = req.query.id;
    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const getLayerById = await query(
        "SELECT * FROM capas WHERE id = $1",
        [layerId]
      );
      if (getLayerById.rowCount === 0) {
        res.status(500).json({ error: "This layer does not exist" });
      } else {
        res.status(200).json({ getLayerById });
      }
    }
  }

  if (req.method === "DELETE") {
    const layerId = req.query.id;

    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deleteLayer = await query(
        "DELETE FROM capas WHERE id = $1",
        [layerId]
      );

      const rowCount = deleteLayer.rowCount;
      if (rowCount > 0) {
        message = "layer deleted succesfully";
      } else {
        message = "could not delete, this id does not exists";
      }
      res
        .status(200)
        .json({ response: { message: message, layerId: layerId } });
    }
  }

  if (req.method === "PUT") {
    const layerId = req.query.id;

    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { layerName, description, orderNumber,category } = req.body;
     

      //VERIFIES THAT THE LAYER DOES NOT EXISTS
      const verifyName = await query(
        "SELECT nombre_capa FROM capas WHERE nombre_capa = $1 AND id != $2",
        [layerName, layerId]
      );
      //VERIFIES IF DATA IS FILLED
      if (areAllDataFilled ([layerName,orderNumber,category])) { //CALL A FUNCTION TO VERIFY DATA FROM THE BODY

        if (verifyName.rowCount === 0) {
          const updateLayer = await query(
            "UPDATE capas SET nombre_capa = $1, descripcion = $2, numero_orden = $3, categoria = $4 WHERE id = $5",
            [layerName, description, orderNumber, category, layerId]
          );

          const rowCount = updateLayer.rowCount;
          if (rowCount > 0) {
            message = "layer updated succesfully";
          } else {
            message = "error, could not update because id does not exists";
          }

          layer = {
            id: layerId,
            nombre_capa: layerName,
            descripcion: description,
            numero_orden: orderNumber,
            categoria:category
          };
          res
            .status(200)
            .json({ response: { message: message, layer: layer } });
        } else {
          res
            .status(500)
            .json({ error: "That layer already exists, could not update" });
        }
      } else {
        res.status(500).json({
          error: "Be sure that description and order number are filled",
        });
      }
    }
  }
}
