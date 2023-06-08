"use client"
import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import MainContainer from "../components/MainContainer";
import { getLayers, deleteLayer, getCategories } from "../services/apiCalls";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import EditForm from "../components/EditForm";

export default function Layers() {
  const [layers, setLayers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchLayers();
    fetchCategories();
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

  const [isCreating, setIsCreating] = useState(false);

  const handleNewItemClick = () => {
    setShowForm(true);
    setIsCreating(true);
  };
  const handleCreateItem = () => {
    setShowForm(false);
    fetchLayers();
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
                Add New Layer
              </h3>
            </div>

            <Tables
              data={layers}
              columns={columns}
              onDelete={deleting}
              categories={categories}
              isCategoryTable={false}
              refresh={fetchLayers}
            />
            {showForm && <EditForm data={{}} categories={categories} 
            isCategoryForm={false} isCreateForm={true} 
            handleCreate={handleCreateItem}
            handleCancel={() => setShowForm(false)} />}
          </>
        }
      />
    </div>
  );
}
