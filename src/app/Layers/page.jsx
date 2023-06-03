"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";

export default function Layers() {
  const [layers, setLayers] = useState([]);

  async function getLayers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/layers`);
    const response = await res.json();
    setLayers(response.layers.rows);
  }

  useEffect(() => {
    getLayers();
  }, []);

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
      header: "Nombre Capa",
      width: 100,
      fixed: true,
    },
    {
      dataKey: "descripcion",
      header: "Descripción",
      width: 100,
    },
    {
      dataKey: "numero_orden",
      header: "Número de Orden",
      width: 200,
    },
    {
        dataKey: "categoria",
        header: "Categoria",
        width: 200,
      },
    // Additional columns specific to layers
    // ...
  ];

  return (
    <div>
      <MainContainer page={<Tables data={layers} columns={columns} />} />
    </div>
  );
}
