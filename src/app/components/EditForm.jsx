import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../styles/EditForm.css";

const columnLabels = {
  categories: {
    nombre_categoria: "Name",
    descripcion: "Description",
    numero_orden: "Order Number",
  },
  layers: {
    nombre_capa: "Name",
    descripcion: "Description",
    numero_orden: "Order Number",
  },
};

const EditForm = ({
  data,
  categories,
  handleUpdate,
  handleCancel,
  isCategoryForm,
}) => {
  const [formData, setFormData] = useState(data);
  let tableSelected;
  if (isCategoryForm) {
    tableSelected = "categories";
  } else {
    tableSelected = "layers";
  }
  console.log(formData);

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let format;
  
      if (isCategoryForm) {
        format = {
          categoryName: formData.nombre_categoria,
          description: formData.descripcion,
          orderNumber: formData.numero_orden,
          available: formData.disponible,
        };
      } else {
        format = {
          layerName: formData.nombre_capa,
          description: formData.descripcion,
          orderNumber: formData.numero_orden,
          category: formData.categoria,
          available: formData.disponible,
        };
      }
  
      const url = `${process.env.NEXT_PUBLIC_URL}/api/${tableSelected}/${data.id}`;
      console.log(format)
      console.log(url)
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(format),
      });
  
      if (response.ok) {
        handleUpdate(formData);
      } else {
        console.error(`Error updating ${tableSelected}:`, response.status);
      }
    } catch (error) {
      console.error(`Error updating ${tableSelected}:`, error);
    }
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle
        style={{
          backgroundColor: "#2e3a3ca7",
          boxShadow: "0 2px 4px rgba(110, 105, 105, 0.493)",
        }}
      >
        Edit Item
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "#5b798463", paddingTop: 10 }}>
        <form className="edit-form">
          {Object.keys(columnLabels[tableSelected]).map((column) => (
            <div className="form-group" key={column}>
              <label className="label">
                {columnLabels[tableSelected][column]}
              </label>
              <input
                className="input-field"
                type="text"
                value={formData[column] || ""}
                onChange={(e) => handleFieldChange(column, e.target.value)}
              />
            </div>
          ))}
          {!isCategoryForm && categories && categories.length > 0 && (
            <div className="form-group">
              <label className="label">Category</label>
              <select
                className="select-field"
                value={formData.categoria}
                onChange={(e) => handleFieldChange("categoria", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.nombre_categoria}>
                    {category.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!isCategoryForm && (
            <div className="form-group">
              <label className="label">Available</label>
              <select
                className="select-field"
                value={formData.disponible}
                onChange={(e) =>
                  handleFieldChange("disponible", e.target.value === "true")
                }
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          )}
          {isCategoryForm && (
            <div className="form-group">
              <label className="label">Available</label>
              <select
                className="select-field"
                value={formData.disponible}
                onChange={(e) =>
                  handleFieldChange("disponible", e.target.value === "true")
                }
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          )}
        </form>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: "#2e3a3ca7",
          boxShadow: "0 -2px 4px rgba(110, 105, 105, 0.493)",
        }}
      >
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Update
        </Button>
        <Button onClick={handleCancel} variant="contained" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
