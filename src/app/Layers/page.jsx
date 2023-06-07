"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";
import {getLayers, deleteLayer} from "../services/apiCalls";

export default function Layers() {
  const [layers, setLayers] = useState([]);


  useEffect(() => {
    fetchLayers();
  }, []);

  const fetchLayers = async () => {
    const layers = await getLayers();
    setLayers(layers);
  };

  const deleting = async (id) => {
    await deleteLayer(id);
    fetchLayers(); // Update layers after deleting
  };

  const columns = [
    {
      dataKey: "id",
      header: "Id",
      width: 50,
      align: "center",
      fixed: true,
    },
    {
      dataKey: "nombre_capa",
      header: "Layer name",
      width: 100,
      fixed: true,
    },
    {
      dataKey: "descripcion",
      header: "Description",
      width: 100,
    },
    {
      dataKey: "numero_orden",
      header: "Order number",
      width: 200,
    },
    {
      dataKey: "categoria",
      header: "Category",
      width: 200,
    },
    // Additional columns specific to layers
    // ...
  ];

  
  return (
    <div>
      <MainContainer
        page={
          <Tables
            data={layers}
            columns={columns}
            onDelete={deleting}
         
            isCategoryTable={false}
          />  
        }
      />
    </div>
  );
}
