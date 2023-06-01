import { query } from "../../../lib/db";
import { areAllDataFilled, isItExists, fixSpaces } from "../utils/validations";

export default async function handler(req, res) {
  let message;
  let layer = null;

  //GET ELEMENT BY ID

  if (req.method === "GET") {
    const layerId = req.query.id;
    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const getLayerById = await query("SELECT * FROM capas WHERE id = $1", [
        layerId,
      ]);
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
      const deleteLayer = await query("DELETE FROM capas WHERE id = $1", [
        layerId,
      ]);

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

  //UPDATE A LAYER
  if (req.method === "PUT") {
    const layerId = req.query.id;

    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { description, orderNumber, category,available } = req.body;
      let { layerName } = req.body;
      //THIS DELETES THE EMPTY SPACES OF THE NAME
      const fixedElements = fixSpaces([layerName]);
      layerName = fixedElements[0];

      //VERIFIES IF DATA IS FILLED
      if (areAllDataFilled([layerName, orderNumber, category ,available])) {
        //CALL A FUNCTION TO VERIFY DATA FROM THE BODY

        //VERIFIES THAT THE CATEGORY EXISTS

        const categoryExists = await isItExists(
          "categorias",
          "nombre_categoria",
          category,
          layerId
        );

        if (categoryExists) {
          const updateLayer = await query(
            "UPDATE capas SET nombre_capa = $1, descripcion = $2, numero_orden = $3, categoria = $4, disponible = $5 WHERE id = $6",
            [layerName, description, orderNumber, category, available, layerId]
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
            categoria: category,
            disponible: available,
          };
          res
            .status(200)
            .json({ response: { message: message, layer: layer } });
        } else {
          res.status(500).json({ error: "That category does not exist" });
        }
      } else {
        res
          .status(500)
          .json({ error: "Be sure that description,order number, category and available are filled" });
      }
      
    }
  }
}
