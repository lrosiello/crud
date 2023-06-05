import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../styles/EditForm.css";

const columnLabels = {
  categories: {
    name: "Category Name",
    description: "Description",
    orderNumber: "Order Number",
    available: "Available",
  },
  layers: {
    name: "Layer Name",
    description: "Description",
    orderNumber: "Order Number",
    category: "Category",
    available: "Available",
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

const NewForm = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    itemType: "",
    name: "",
    description: "",
    orderNumber: "",
    category: "",
    available: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    // Lógica para enviar los datos del formulario a través de una solicitud HTTP
    // ...

    // Después de enviar los datos, puedes reiniciar el formulario o hacer cualquier otra acción necesaria
    setFormData({
      itemType: "",
      name: "",
      description: "",
      orderNumber: "",
      category: "",
      available: false,
    });
  };

  return (
    <>
      <Dialog open={true} onClose={handleCancel}>
        <DialogTitle
          style={{
            backgroundColor: "#2e3a3ca7",
            boxShadow: "0 -2px 4px rgba(110, 105, 105, 0.493)",
          }}
        >
          Create New Item
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#5b798463", paddingTop: 10 }}>
          <form className="edit-form new-form">
            {" "}
            {/* Agrega la clase CSS "new-form" para estilos personalizados */}
            <FormControl margin="normal" style={{ width: "200px", height: "60px" }}>
              <InputLabel>Table</InputLabel>
              <Select
                value={formData.itemType}
                onChange={(e) => handleFieldChange("itemType", e.target.value)}
              >
                <MenuItem value="categories">Categories</MenuItem>
                <MenuItem value="layers">Layers</MenuItem>
              </Select>
            </FormControl>
            {formData.itemType && (
              <>
                <div className="form-group">
                  <label className="label">{columnLabels[formData.itemType].name}:</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                  {fieldErrors.name && (
                    <div className="error-text">This field is required</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="label">{columnLabels[formData.itemType].description}:</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                  />
                  {fieldErrors.description && (
                    <div className="error-text">This field is required</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="label">{columnLabels[formData.itemType].orderNumber}:</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) =>
                      handleFieldChange("orderNumber", e.target.value)
                    }
                  />
                  {fieldErrors.orderNumber && (
                    <div className="error-text">This field is required</div>
                  )}
                </div>
                {formData.itemType === "layers" && (
                  <div className="form-group">
                    <label className="label">{columnLabels[formData.itemType].category}:</label>
                    <select
                      className="select-field"
                      value={formData.category}
                      onChange={(e) =>
                        handleFieldChange("category", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="category1">Category 1</option>
                      <option value="category2">Category 2</option>
                      {/* ... */}
                    </select>
                    {fieldErrors.category && (
                      <div className="error-text">This field is required</div>
                    )}
                  </div>
                )}
                <div className="form-group">
                  <label className="label">{columnLabels[formData.itemType].available}:</label>
                  <select
                    className="select-field"
                    value={formData.available}
                    onChange={(e) =>
                      handleFieldChange("available", e.target.value === "true")
                    }
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {fieldErrors.available && (
                    <div className="error-text">This field is required</div>
                  )}
                </div>
              </>
            )}
          </form>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: "#2e3a3ca7",
            boxShadow: "0 -2px 4px rgba(110, 105, 105, 0.493)",
          }}
        >
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
          <Button onClick={handleCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewForm;
