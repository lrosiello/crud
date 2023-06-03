"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";

export default function Categories() {
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
      dataKey: "nombre_categoria",
      header: "Category name",
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
  ];

  const refreshCategories = async () => {
    await getCategories();
  };

  const deleteCategory = async (id, getCategories) => {
    try {
      // Request to the server
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      // Verifies if it worked
      if (res.status === 200) {
        console.log("Deleting was successful", id);
        // Render table again
        getCategories(); // Invoking getCategories to update the categories list
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
            data={categories}
            columns={columns}
            refresh={refreshCategories}
            onDelete={deleteCategory}
          />
        }
      />
    </div>
  );
}


