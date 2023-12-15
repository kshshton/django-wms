import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { getCustomer } from "../services/Orders/Customer/getCustomer";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "firstName",
    headerName: "Name",
    width: 120,
  },
  {
    field: "lastName",
    headerName: "Surname",
    width: 120,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
];

function CustomerPopupContent(props) {
  const { onClose, selectedValue, open, id } = props;
  const [rows, setRows] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomer(id);
      setRows(data);
    };

    fetchData();
  }, [id]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ height: 200, width: "100%" }}>
        <DataGrid rows={[rows]} columns={columns} pageSize={5} />
      </Box>
    </Dialog>
  );
}

export default function CustomerPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </Button>
      <CustomerPopupContent id={props.id} open={open} onClose={handleClose} />
    </>
  );
}
