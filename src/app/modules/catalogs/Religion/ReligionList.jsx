import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getReligions, deleteReligion, createReligion, updateReligion } from "./services/ReligionService";
import { StyledBodyModal } from "../Styles";

const ReligionList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addReligion, setAddReligion] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        religion();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddReligion(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addReligion);
    }

    const religion = async () => {
        const data = await getReligions();
        setData(data);
    }

    const religionCreate = async () => {
        createReligion(addReligion).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const religionUpdate = async () => {
        updateReligion(addReligion.id, addReligion).then(response => {
            var newData = Data;
            newData.map(religion => {
                if (religion.id === addReligion.id) {
                    religion.name = addReligion.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const religionDelete = async () => {
        deleteReligion(addReligion.id).then(() => {
            setData(Data.filter(religion => religion.id !== addReligion.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const religionOption = (religion, op) => {
        setAddReligion(religion);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => religionOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => religionOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddReligion = (
        <StyledBodyModal>
            <h3>Agregar Religion</h3>
            <TextField label='Religion' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => religionCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateReligion = (
        <StyledBodyModal>
            <h3>Editar Religion</h3>
            <TextField label='Religion' name="name" onChange={handledChange} value={addReligion && addReligion.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => religionUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteReligion = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Religion <b>{addReligion && addReligion.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => religionDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Religión</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Religion</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Religion</TableCell>
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
                    {bodyAddReligion}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateReligion}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteReligion}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default ReligionList;