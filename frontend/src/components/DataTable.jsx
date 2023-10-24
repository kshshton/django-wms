import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import {useEffect} from "react";


// function EditToolbar(props) {
//     const { setRows, setRowModesModel } = props;


    // const handleClick = () => {
    //     const id = randomId();
    //     setRows((oldRows) => [...oldRows, { id, name: '', category: '', quantity: 0 }]);
    //     setRowModesModel((oldModel) => ({
    //         ...oldModel,
    //         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    //     }));
    // };

    // return (
    //     <GridToolbarContainer>
    //         <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
    //             Add record
    //         </Button>
    //     </GridToolbarContainer>
    // );
// }

export default function DataTable() {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});


    useEffect(async () => {
        const data = await fetch('http://127.0.0.1:8000/api/products/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(r => r.json());

        setRows(data);
    });

    // const handleRowEditStop = (params, event) => {
    //     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    //         event.defaultMuiPrevented = true;
    //     }
    // };
    //
    // const handleEditClick = (id) => () => {
    //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // };
    //
    // const handleSaveClick = (id) => () => {
    //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    // };
    //
    // const handleDeleteClick = (id) => () => {
    //     setRows(rows.filter((row) => row.id !== id));
    // };
    //
    // const handleCancelClick = (id) => () => {
    //     setRowModesModel({
    //         ...rowModesModel,
    //         [id]: { mode: GridRowModes.View, ignoreModifications: true },
    //     });
    //
    //     const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow.isNew) {
    //         setRows(rows.filter((row) => row.id !== id));
    //     }
    // };
    //
    // const processRowUpdate = (newRow) => {
    //     const updatedRow = { ...newRow, isNew: false };
    //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //     return updatedRow;
    // };
    //
    // const handleRowModesModelChange = (newRowModesModel) => {
    //     setRowModesModel(newRowModesModel);
    // };

    const columns = [
        { field: 'id', headerName: 'Name', width: 180, editable: true },
        {
            field: 'id',
            headerName: 'Id',
            type: 'string',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            // onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            // onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        // onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        // onClick={handleDeleteClick(id)}
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
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
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
