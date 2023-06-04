import React, { useState } from "react";
import { Table, Pagination, Button, Message } from "rsuite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "./Confirmation";
import EditForm from "./EditForm";

const { Column, HeaderCell, Cell } = Table;

const Tables = ({
  data,
  columns,
  refresh,
  onDelete,
  categories,
  isCategoryTable,
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const [formData, setFormData] = useState(null);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const filteredData = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleDeleteConfirmation = (id) => {
    setSelectedItemId(id);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    await onDelete(selectedItemId, refresh);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (item) => {
    // Verificar si el campo 'categoria' existe en los datos del item
    const formData = isCategoryTable ? item : { ...item, categoria: null };
    setFormData(formData);
    setShowEditForm(true);
  };

  const handleUpdate = async (updatedData) => {
    // Update logic goes here
    console.log("Updated Data:", updatedData);
    // You can make an API request to update the data on the server
    // ...
    setShowEditForm(false);
    setMessage("Item updated successfully.");
    setMessageType("success");
    setShowMessage(true);
    refresh();
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setFormData(null);
  };

  return (
    <div className="table-container" style={{ marginTop: 2 }}>
      {showMessage && (
        <Message
          showIcon
          type={messageType}
          description={message}
          closable
          onClose={() => setShowMessage(false)}
        />
      )}
      <Table height={420} data={filteredData} className="responsive-table">
        {columns.map((column) => {
          return (
            <Column
              key={column.dataKey}
              width={column.width + 30}
              align={column.align}
              fixed={column.fixed}
            >
              <HeaderCell>{column.header}</HeaderCell>
              <Cell dataKey={column.dataKey} />
            </Column>
          );
        })}
        {/* Columna de Edición */}
        <Column width={100} align="center" fixed="right">
          <HeaderCell>Edit</HeaderCell>
          <Cell
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(rowData) => (
              <Button appearance="subtle" onClick={() => handleEdit(rowData)}>
                <EditIcon
                  onClick={() => handleEdit(rowData)}
                  style={{ cursor: "pointer" }}
                />
              </Button>
            )}
          </Cell>
        </Column>
        {/* Columna de Eliminación */}
        <Column width={100} align="center" fixed="right">
          <HeaderCell>Delete</HeaderCell>
          <Cell
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(rowData) => (
              <Button
                appearance="subtle"
                onClick={() => handleDeleteConfirmation(rowData.id)}
              >
                <DeleteForeverIcon
                  onClick={() => handleDeleteConfirmation(rowData.id)}
                  style={{ cursor: "pointer" }}
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
