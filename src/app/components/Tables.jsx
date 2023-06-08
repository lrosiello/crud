import React, { useState } from "react";
import { Table, Pagination, Button } from "rsuite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "./Confirmation";
import EditForm from "./EditForm";

const { Column, HeaderCell, Cell } = Table;

const Tables = ({
  data,
  columns,
  onDelete,
  categories,
  isCategoryTable,
  refresh,
}) => {


  //CONFIGURATIONS FROM RSUITE
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const filteredData = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  //DELETE AND CONFIRMATION
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(selectedItemId, refresh);
      setShowConfirmation(false);
      setSuccessMessage("The element has been deleted successfully.");
      setShowSuccessMessage(true);
    } catch (error) {
      // Handle API error
      setErrorMessage(error.response.data.error || "An error occurred.");
      setShowErrorMessage(true);
    }
  };
  const handleDeleteConfirmation = (id) => {
    setSelectedItemId(id);
    setShowConfirmation(true);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  //EDIT FORM AND SELECTED ITEM
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleEdit = (item) => {
    const formData = isCategoryTable ? item : { ...item};
    setFormData(formData);
    setShowEditForm(true);
  };
  const handleUpdate = async () => {
    try {
      setShowEditForm(false);
      setSuccessMessage("Item updated successfully.");
      setErrorMessage(null);
      setShowSuccessMessage(true); // Show success message
      await refresh(); // Call the refresh function to update the data
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
      setSuccessMessage(null);
    }
  };
  const handleCancelEdit = () => {
    setShowEditForm(false);
    setFormData(null);
  };


  //MESSAGERS
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCloseMessage = () => {
    setShowSuccessMessage(false);
  };


  //DATA
  const [formData, setFormData] = useState(null);


  //-------------------------------------------TABLES--------------------------------------------------------------
  return (
    <div className="table-container" style={{ marginTop: 2  ,backgroundColor:"595e5a83"}}>
      {showSuccessMessage && (
         <div
         className="message-popup message-success message-container"
         onClick={handleCloseMessage}
         style={{ backgroundColor: "lightgreen" }} 
       >
         <span className="message-text">{successMessage}</span>
         <span className="message-close" style={{ marginLeft: "auto", cursor: "pointer" }}>X</span>
       </div>
      )}

      <Table height={420} data={filteredData} className="responsive-table" >
        {columns.map((column) => {
          return (
            <Column style={{backgroundColor:"#595e5a83" ,color:"whitesmoke"}}
              key={column.dataKey}
              align={column.align}
              fixed={column.fixed}
            >
              <HeaderCell >{column.header}</HeaderCell>
              <Cell dataKey={column.dataKey} />
            </Column>
          );
        })}
        {/* Columna de Edición */}
        <Column width={100} align="center" fixed="right" >
          <HeaderCell style={{backgroundColor:"#595e5a83",color:"whitesmoke"}}>Edit</HeaderCell >
          <Cell
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"#595e5a83"}}
            
          >
            {(rowData) => (
              <Button appearance="subtle" onClick={() => handleEdit(rowData)}>
                <EditIcon
                  onClick={() => handleEdit(rowData)}
                  style={{ cursor: "pointer", color:"#26707a83"}}
                />
              </Button>
            )}
          </Cell>
        </Column>
        {/* Columna de Eliminación */}
        <Column width={100} align="center" fixed="right">
          <HeaderCell style={{backgroundColor:"#595e5a83",color:"whitesmoke"}}>Delete</HeaderCell >
          <Cell
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            backgroundColor:"#595e5a83"
            }}
          >
            {(rowData) => (
              <Button
                appearance="subtle"
                onClick={() => handleDeleteConfirmation(rowData.id)}
              >
                <DeleteForeverIcon
                  onClick={() => handleDeleteConfirmation(rowData.id)}
                  style={{ cursor: "pointer",color:"darkred" }}
                />
              </Button>
            )}
          </Cell>
        </Column>
      </Table>
      <Confirmation
        showConfirmation={showConfirmation}
        selectedItemId={selectedItemId}
        handleDeleteConfirmation={handleDeleteConfirmation}
        handleDelete={handleDelete}
        handleCancelDelete={handleCancelDelete}
      />
      {showEditForm && (
        <EditForm
          data={formData}
          categories={categories}
          isCategoryForm={isCategoryTable}
          handleUpdate={handleUpdate}
          handleCancel={handleCancelEdit}
          selectedCategory={formData.categoria}
        />
        
      )}
      <div
        style={{
          padding: 20,
          backgroundColor: "#bae2df48",
          color: "#c1e3e1dd",
        }}
      >
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="lg"
          layout={["total", "-", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          renderLengthMenu={() => null}
        />
      </div>
    </div>
  );
};

export default Tables;
