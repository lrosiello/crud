import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../styles/EditForm.css";
import { updating, creating } from "../services/apiCalls";

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
    if (column !== "descripcion" && !formData[column]) {
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
  isCreateForm, // Prop que indica si es un formulario de creación
  isCategoryForm,
  handleCreate,
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

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let format = formattingPackage();
    
  
      const fieldsAreValid = validateFields(
        tableSelected,
        formData,
        setFieldErrors
      );
      let url;

      if (isCreateForm) {
        url = `${process.env.NEXT_PUBLIC_URL}/api/${tableSelected}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_URL}/api/${tableSelected}/${data.id}`;
      }

      if (!fieldsAreValid) {
        return;
      }

      let response;

      if (isCreateForm) {
        response = await creating(url, format);
      } else {
        response = await updating(url, data.id, format);
      }

      if (response.ok) {
        if (isCreateForm) {
          handleCreate(formData);
        } else {
          handleUpdate(formData);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setShowError(true);
      }
    } catch (error) {
      console.error("Error updating/creating the item:", error);
      setErrorMessage(
        "Error updating/creating the item. Please check all fields."
      );
      setShowError(true);
    }
  };

  const formattingPackage = () => {
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
    for (let field in format) {
      if (format.hasOwnProperty(field) && format[field] === undefined) {
        format[field] = "";
      }
    }
    return format;
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
          {isCreateForm ? "Create" : "Edit"} Item
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
                  onChange={(e) =>
                    handleFieldChange("categoria", e.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.nombre_categoria}>
                      {category.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
            {isCreateForm ? "Create" : "Update"}
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
