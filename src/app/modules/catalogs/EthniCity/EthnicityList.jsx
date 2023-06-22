import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getEthnicities, deleteEthnicity, createEthnicity, updateEthnicity } from "./services/EthniCityService";
import { StyledBodyModal } from "../Styles";

const EthnicityList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addEthnicity, setAddEthnicity] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        ethnicity();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddEthnicity(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addEthnicity);
    }

    const ethnicity = async () => {
        const data = await getEthnicities();
        setData(data);
    }

    const ethnicityCreate = async () => {
        createEthnicity(addEthnicity).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const ethnicityUpdate = async () => {
        updateEthnicity(addEthnicity.id, addEthnicity).then(response => {
            var newData = Data;
            newData.map(ethnicity => {
                if (ethnicity.id === addEthnicity.id) {
                    ethnicity.name = addEthnicity.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const ethnicityDelete = async () => {
        deleteEthnicity(addEthnicity.id).then(() => {
            setData(Data.filter(ethnicity => ethnicity.id !== addEthnicity.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const ethnicityOption = (ethnicity, op) => {
        setAddEthnicity(ethnicity);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => ethnicityOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => ethnicityOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddEthnicity = (
        <StyledBodyModal>
            <h3>Agregar Etnia</h3>
            <TextField label='Etnia' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => ethnicityCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateEthnicity = (
        <StyledBodyModal>
            <h3>Editar Etnia</h3>
            <TextField label='Etnia' name="name" onChange={handledChange} value={addEthnicity && addEthnicity.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => ethnicityUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteEthnicity = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Etnia <b>{addEthnicity && addEthnicity.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => ethnicityDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Etnia</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Etnia</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Etnia</TableCell>
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
                    {bodyAddEthnicity}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateEthnicity}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteEthnicity}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default EthnicityList;