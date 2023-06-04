import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../styles/EditForm.css";

const EditForm = ({ data, categories, handleUpdate, handleCancel }) => {
  const [formData, setFormData] = useState(data);

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "available" && value === "") {
      // IF USER DID NOT SELECTED THE AVAILABLE
      value = true;
    }
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  
  
  const handleSubmit = async () => {
    try {
      // Realizar solicitud PUT a la API
      const response = await fetch(`/api/categories/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: formData.nombre_categoria,
          description: formData.descripcion,
          orderNumber: formData.numero_orden,
          available: formData.disponible,
          // Asegúrate de incluir otros campos si es necesario
        }),
      });
      console.log(formData)
      if (response.ok) {
        // Actualizar la categoría en la base de datos fue exitoso
        
        handleUpdate(formData);
      } else {
        // Manejar el caso de error en la solicitud de actualización
        console.error("Error updating category:", response.status);
        // Mostrar un mensaje de error si es necesario
      }
    } catch (error) {
      console.error("Error updating category:", error);
      // Mostrar un mensaje de error si es necesario
    }
  };
  
  

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle style={{ backgroundColor: "#2e3a3ca7", boxShadow: '0 2px 4px rgba(110, 105, 105, 0.493)' }}>Edit Item</DialogTitle>
      <DialogContent style={{ backgroundColor: "#5b798463", paddingTop: 10 }}>
        <form className="edit-form">
          <div className="form-group">
            <label className="label">Name</label>
            <input
              className="input-field"
              type="text"
              value={formData.nombre_categoria || ""}
              onChange={(e) =>
                handleFieldChange("nombre_categoria", e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <input
              className="input-field"
              type="text"
              value={formData.descripcion || ""}
              onChange={(e) => handleFieldChange("descripcion", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Order Number</label>
            <input
              className="input-field"
              type="text"
              value={formData.numero_orden || ""}
              onChange={(e) =>
                handleFieldChange("numero_orden", e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label className="label">Available</label>
            <select
              className="select-field"
              value={formData.disponible}
              onChange={(e) => handleFieldChange("disponible", e.target.value)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          {categories && categories.length > 0 && (
            <div className="form-group">
              <label className="label">Category</label>
              <select
                className="select-field"
                value={formData.categoria}
                onChange={(e) => handleFieldChange("categoria", e.target.value)}
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.nombre_categoria}
                  >
                    {category.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#2e3a3ca7", boxShadow: '0 -2px 4px rgba(110, 105, 105, 0.493)' }}>
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
