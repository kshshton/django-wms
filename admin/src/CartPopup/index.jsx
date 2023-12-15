import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { getCart } from "../services/Orders/Cart/getCart";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    align: "center",
    width: 80,
  },
  {
    field: "sectorName",
    headerName: "Sector",
    width: 110,
  },
];

function CartPopupContent(props) {
  const { onClose, selectedValue, open, id } = props;
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getCart(id);
      setRows(data);
    };

    fetchData();
  }, [id]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Box>
    </Dialog>
  );
}

export default function CartPopup(props) {
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
      <CartPopupContent id={props.id} open={open} onClose={handleClose} />
    </>
  );
}
