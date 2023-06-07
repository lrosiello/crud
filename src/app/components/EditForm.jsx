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

const validateFields = (tableSelected, formData, setFieldErrors) => {
  const errors = {};

  Object.keys(columnLabels[tableSelected]).forEach((column) => {
    if (!formData[column]) {
      errors[column] = true;
    }
  });

  setFieldErrors(errors);

  return Object.keys(errors).length === 0;
};

const EditForm = ({
  data,
  categories,
  handleUpdate,
  handleCancel,
  isCategoryForm,
  selectedCategory
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
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
      const fieldsAreValid = validateFields(tableSelected, formData, setFieldErrors);
      const url = `${process.env.NEXT_PUBLIC_URL}/api/${tableSelected}/${data.id}`;
      console.log(format);
      console.log(url);

      if (!fieldsAreValid) {
        return;
      }

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
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setShowError(true);
      }
    } catch (error) {
      console.error("Error updating the item:", error);
      setErrorMessage("Error updating the item. Please check all fields.");
      setShowError(true);
    }
  };

  return (
    <>
      {showError && <div className="error-message">{errorMessage}</div>}
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
                {fieldErrors[column] && column !== "descripcion" && (
                  <div className="error-text">obligatory</div>
                )}
              </div>
            ))}
            {!isCategoryForm && categories && categories.length > 0 && (
              <div className="form-group">
                <label className="label">Category</label>
                
                <select
                  className="select-field"
                  value={formData.categoria}
                  onChange={(e) =>{
                    handleFieldChange("categoria", e.target.value);
                    console.log(formData.categoria); // Agregar el console.log aquí
                  }}
                  
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
        {showError && (
          <div className="error-message-container">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}
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
    </>
  );
};

export default EditForm;
