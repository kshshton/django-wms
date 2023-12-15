import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { getAddress } from "../services/Orders/Address/getAddress";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "city",
    headerName: "City",
    width: 120,
  },
  {
    field: "state",
    headerName: "State",
    width: 120,
  },
  {
    field: "streetName",
    headerName: "Street",
    width: 150,
  },
  {
    field: "buildingNumber",
    headerName: "Building",
    width: 110,
  },
  {
    field: "apartmentNumber",
    headerName: "Apartment",
    width: 110,
  },
];

function AddressPopupContent(props) {
  const { onClose, selectedValue, open, id } = props;
  const [rows, setRows] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAddress(id);
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

export default function AddressPopup(props) {
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
      <AddressPopupContent id={props.id} open={open} onClose={handleClose} />
    </>
  );
}
