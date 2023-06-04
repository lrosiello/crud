"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";

export default function Layers() {
  const [layers, setLayers] = useState([]);

  async function getLayers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/layers`);
    const response = await res.json();
    const sortedLayers = response.layers.rows.sort(
      (a, b) => a.numero_orden - b.numero_orden
    );
    setLayers(sortedLayers);
  }

  useEffect(() => {
    getLayers();
  }, []);

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
    const response = await res.json();
    const sortedCategories = response.categories.rows.sort(
      (a, b) => a.numero_orden - b.numero_orden
    );
    setCategories(sortedCategories);
  }

  useEffect(() => {
    getCategories();
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

  const refreshLayers = async () => {
    await getLayers();
  };

  const deleteLayer = async (id, getLayers) => {
    try {
      // Request to the server
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/layers/${id}`,
        {
          method: "DELETE",
        }
      );
      // Verifies if it worked
      if (res.status === 200) {
        console.log("Deleting was successful", id);
        // Render table again
        getLayers(); // Invoking getLayers to update the layers list
      } else {
        console.log("Error eliminating: ", id);
      }
    } catch (error) {
      console.error("Error eliminating: ", error);
    }
  };

  return (
    <div>
      <MainContainer
        page={
          <Tables
            data={layers}
            columns={columns}
            refresh={refreshLayers}
            onDelete={deleteLayer}
            categories={categories}
            isCategoryTable={false}
          />  
        }
      />
    </div>
  );
}
