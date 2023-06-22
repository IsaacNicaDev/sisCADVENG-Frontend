import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getMaritalStatus, deleteMaritalStatus, createMaritalStatus, updateMaritalStatus } from "./services/MaritalStatusService";
import { StyledBodyModal } from "../Styles";

const MaritalStatusList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addMaritalStatus, setAssMaritalStatus] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        maritalStatus();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAssMaritalStatus(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addMaritalStatus);
    }

    const maritalStatus = async () => {
        const data = await getMaritalStatus();
        setData(data);
    }

    const maritalStatusCreate = async () => {
        createMaritalStatus(addMaritalStatus).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const maritalStatusUpdate = async () => {
        updateMaritalStatus(addMaritalStatus.id, addMaritalStatus).then(response => {
            var newData = Data;
            newData.map(maritalStatus => {
                if (maritalStatus.id === addMaritalStatus.id) {
                    maritalStatus.name = addMaritalStatus.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const maritalStatusDelete = async () => {
        deleteMaritalStatus(addMaritalStatus.id).then(() => {
            setData(Data.filter(maritalStatus => maritalStatus.id !== addMaritalStatus.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const maritalStatusOption = (maritalStatus, op) => {
        setAssMaritalStatus(maritalStatus);
        (op === "Edit") ? handledModalUpdate()
            :
            handledModalDelete()
    }

    const rows = Data.map((data) =>
        <TableRow
            key={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">{data.id}</TableCell>
            <TableCell align="center">{data.name}</TableCell>
            <TableCell align="center">
                <Box component='div'>
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => maritalStatusOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => maritalStatusOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
                </Box>
            </TableCell>
        </TableRow>
    )

    const handledModalCreate = () => {
        setModalAdd(!modalAdd);
    }

    const handledModalUpdate = () => {
        setModalUpdate(!modalUpdate);
    }

    const handledModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const bodyAddMaritalStatus = (
        <StyledBodyModal>
            <h3>Agregar Estado civil</h3>
            <TextField label='Estado civil' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => maritalStatusCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateMaritalStatus = (
        <StyledBodyModal>
            <h3>Editar Estado civil</h3>
            <TextField label='Estado civil' name="name" onChange={handledChange} value={addMaritalStatus && addMaritalStatus.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => maritalStatusUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteMaritalStatus = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Estado civil <b>{addMaritalStatus && addMaritalStatus.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => maritalStatusDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Estado civil</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Estado civil</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Estado civil</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <Modal
                    open={modalAdd}
                    onClose={handledModalCreate}>
                    {bodyAddMaritalStatus}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateMaritalStatus}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteMaritalStatus}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default MaritalStatusList;