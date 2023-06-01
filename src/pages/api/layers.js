import { query } from "../../lib/db";
import { areAllDataFilled,isItExists,fixSpaces } from "./utils/validations";

export default async function handler(req, res) {
  let message;
  let layer;


  //GET ALL LAYERS
  if (req.method === "GET") {
    const layers = await query("SELECT * FROM capas", []);
    res.status(200).json({ layers });
  } 
  
  //CREATE A NEW LAYER
  else if (req.method === "POST") {

    const { description, orderNumber,category,available } = req.body;
    let { layerName } = req.body;
    //THIS DELETES THE EMPTY SPACES OF THE NAME
    const fixedElements = fixSpaces([layerName]);
    layerName = fixedElements[0];
    
    //VERIFIES THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled([layerName,orderNumber,category,available])) {

      //VERIFIES THAT THE CATEGORY EXISTS
   
      const categoryExists = await isItExists("categorias","nombre_categoria",category);
      
      if (categoryExists) {
        //INSERT A NEW LAYER
        const addLayer = await query(
          "INSERT INTO capas (nombre_capa,descripcion,numero_orden,categoria,disponible) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [layerName, description, orderNumber, category, available]
        );
        //IT TAKES DATA FROM THE LAYER ADDED
        if (addLayer.rowCount > 0) {
          const layerId = addLayer.rows[0].id;
          if (layerId) {
            message = "success";
            layer = {
              id: layerId,
              nombre_capa: layerName,
              descripcion: description,
              numero_orden: orderNumber,
              categoria:category,
              disponible:available,
            };
          } else {
            message = "error";
            layer = null;
          }
          //RESPONSES
          res
            .status(200)
            .json({ response: { message: message, layer: layer } });
        }
      } else {
        res
          .status(500)
          .json({ error: "That category does not exist" });
      }
    } else {
      res.status(500).json({
        error: "Be sure that description,order number, category and available are filled",
      });
      res.status(405).end();
    }
  }
}
