"use client";
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";
import { getCategories, deleteCategory } from "../services/apiCalls";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import EditForm from "../components/EditForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  const [isCreating, setIsCreating] = useState(false);

  const handleNewItemClick = () => {
    setShowForm(true);
    setIsCreating(true);
  };
  const handleCreateItem = () => {
    setShowForm(false);
    fetchCategories();
  };



  return (
    <div>
      <MainContainer
        page={
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={handleNewItemClick}>
                <AddIcon style={{ color: "whitesmoke", fontSize: 40 }} />
              </IconButton>
              <h3 style={{ alignSelf: "center", marginLeft: 5 }}>
                Insert new category
              </h3>
            </div>

            <Tables
              data={categories}
              columns={columns}
              onDelete={deleting}
              isCategoryTable={true}
              refresh={fetchCategories}
            />
            {showForm && <EditForm data={{}}  
            isCategoryForm={true} isCreateForm={true} 
            handleCreate={handleCreateItem}
            handleCancel={() => setShowForm(false)} />}
          </>
        }
      />
    </div>
  );
}
