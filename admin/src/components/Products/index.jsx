import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenRefresh } from "../../services/Auth/TokenRefresh";
import { deleteProduct } from "../../services/Products/deleteProduct";
import { getProducts } from "../../services/Products/getProducts";
import { postProduct } from "../../services/Products/postProduct";
import { updateProduct } from "../../services/Products/updateProduct";
import { getSectors } from "../../services/Sectors/getSectors";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        quantity: "",
        category: "",
        sectorName: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));

    postProduct(id);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Products() {
  const [rows, setRows] = React.useState([]);
  const [sectors, setSectors] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === "undefined") navigate("/login");

    const fetchData = async () => {
      const domain = import.meta.env.VITE_BASE_URL;
      const port = import.meta.env.VITE_BASE_PORT;
      const products = await getProducts();
      const sectors = await getSectors();

      const updatedProducts = products.map((product) => {
        return {
          ...product,
          qr: `${domain}:${port}/products/${product.id}/qr`,
        };
      });

      setRows(updatedProducts);
      setSectors(sectors);
    };

    fetchData();
    tokenRefresh();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    const target = rows.find((obj) => obj.id === id);

    deleteProduct(target);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    updateProduct(updatedRow);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 180,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Buty", "Koszule", "Spodnie", "Kurtki"],
    },
    {
      field: "sectorName",
      headerName: "Sector",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: () => sectors?.map((sector) => sector.name),
    },
    {
      field: "qr",
      headerName: "QR",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => (
        <a href={param.value}>
          <IconButton>
            <QrCode2Icon />
          </IconButton>
        </a>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
