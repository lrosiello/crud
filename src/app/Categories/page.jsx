"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";
import {getCategories, deleteCategory} from "../services/apiCalls";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const deleting = async (id) => {
    await deleteCategory(id);
    fetchCategories(); // Update categories after deleting
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





  return (
    <div>
      <MainContainer
        page={
          <Tables
            data={categories}
            columns={columns}
            onDelete={deleting}
            isCategoryTable={true}
          />
        }
      />
      
    </div>
  );
}


