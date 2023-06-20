import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getModalities, deleteModality, createModality, updateModality } from "./services/ModalityService";
import { StyledBodyModal } from "../Styles";

const ModalityList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addModality, setAddModality] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Madalities();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddModality(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addModality);
    }

    const Madalities = async () => {
        const data = await getModalities();
        setData(data);
    }

    const modalityCreate = async () => {
        createModality(addModality).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const modalityUpdate = async () => {
        updateModality(addModality.id, addModality).then(response => {
            var newData = Data;
            newData.map(modality => {
                if (modality.id === addModality.id) {
                    modality.name = addModality.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const modalityDelete = async () => {
        deleteModality(addModality.id).then(() => {
            setData(Data.filter(modality => modality.id !== addModality.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const modalityOption = (modality, op) => {
        setAddModality(modality);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => modalityOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => modalityOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddModality = (
        <StyledBodyModal>
            <h3>Agregar Modalidad</h3>
            <TextField label='Modalidad' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => modalityCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateModality = (
        <StyledBodyModal>
            <h3>Editar Modalidad</h3>
            <TextField label='Modalidad' name="name" onChange={handledChange} value={addModality && addModality.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => modalityUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteModality = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Modalidad <b>{addModality && addModality.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => modalityDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Modalidad</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Modalidad</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Modalidad</TableCell>
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
                    {bodyAddModality}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateModality}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteModality}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default ModalityList;