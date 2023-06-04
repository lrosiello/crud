import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import { Button } from "rsuite";
  
  export default function Confirmation({
    showConfirmation,
    handleDelete,
    handleCancelDelete,
  }) {
    return (
      <Dialog
        open={showConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title" style={{backgroundColor:"#2e3a3ca7", boxShadow: '0 2px 4px rgba(110, 105, 105, 0.493)', paddingBottom:10}}>Confirmation</DialogTitle>
        <DialogContent style={{backgroundColor:"#5b798463" }}>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions style={{backgroundColor:"#2e3a3ca7", boxShadow: '0 -2px 4px rgba(110, 105, 105, 0.493)'}}>
          <Button onClick={handleDelete} style={{backgroundColor:"#D62424", color:"whitesmoke"}}>
            Delete
          </Button>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  