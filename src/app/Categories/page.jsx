"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
    const response = await res.json();
    setCategories(response.categories.rows);
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
      dataKey: "nombre_categoria",
      header: "Nombre Categoría",
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
  ];

  return (
    <div>
      <MainContainer page={<Tables data={categories} columns={columns} />} />
    </div>
  );
}
