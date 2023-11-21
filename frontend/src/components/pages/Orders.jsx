import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {getOrders, getUsers} from "../../utils/Database.js";


export default function Orders() {
    const url = "http://127.0.0.1:8000/api/orders";
    const [users, setUsers] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(() => {
        const fetchData = async () => {
            const orders = await getOrders();
            const users = await getUsers();

            const rows = orders.map(order => ({
                id: order.id,
                complete: order.complete,
                cartURL: `${url}/${order.id}/cart`,
                addressURL: `${url}/${order.id}/address`,
                customerURL: `${url}/${order.id}/customer`,
            }));

            setRows(rows);
            setUsers(users);
        };

        fetchData();
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        const target = rows.find(obj => obj.id === id);

        fetch(`http://127.0.0.1:8000/api/orders/${target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(r => r.json());
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        fetch(`http://127.0.0.1:8000/api/orders/${updatedRow.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                complete: updatedRow.complete,
                userId: updatedRow.userId
            })
        }).then(r => r.json());

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            width: 180,
        },
        {
            field: 'cartURL',
            headerName: 'Cart',
            width: 180,
            renderCell: param => (
                <a href={param.value}>OPEN</a>
            )
        },
        {
            field: 'addressURL',
            headerName: 'Address',
            width: 180,
            renderCell: param => (
                <a href={param.value}>OPEN</a>
            )
        },
        {
            field: 'customerURL',
            headerName: 'Customer',
            width: 180,
            renderCell: param => (
                <a href={param.value}>OPEN</a>
            )
        },
        {
            field: 'user',
            headerName: 'User',
            width: 100,
            editable: true,
            type: 'singleSelect',
            valueOptions: () => users?.map(user => user.name)
        },
        {
            field: 'complete',
            headerName: 'Complete',
            width: 100,
            editable: true,
            type: 'singleSelect',
            valueOptions: [
                true,
                false
            ],
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
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
                    toolbar: GridToolbarContainer,
                }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel},
                }}
            />
        </Box>
    );
}
