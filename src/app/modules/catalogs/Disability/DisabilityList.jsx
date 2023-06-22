import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getDisabilities, deleteDisability, createDisability, updateDisability } from "./services/DisabilityService";
import { StyledBodyModal } from "../Styles";

const DisabilityList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addDisability, setAddDisability] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        disability();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddDisability(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addDisability);
    }

    const disability = async () => {
        const data = await getDisabilities();
        setData(data);
    }

    const disabilityCreate = async () => {
        createDisability(addDisability).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const disabilityUpdate = async () => {
        updateDisability(addDisability.id, addDisability).then(response => {
            var newData = Data;
            newData.map(disability => {
                if (disability.id === addDisability.id) {
                    disability.name = addDisability.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const disabilityDelete = async () => {
        deleteDisability(addDisability.id).then(() => {
            setData(Data.filter(disability => disability.id !== addDisability.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const disabilityOption = (disability, op) => {
        setAddDisability(disability);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => disabilityOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => disabilityOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddDisability = (
        <StyledBodyModal>
            <h3>Agregar Discapacidad</h3>
            <TextField label='Discapacidad' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => disabilityCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateDiscapacity = (
        <StyledBodyModal>
            <h3>Editar Discapacidad</h3>
            <TextField label='Discapacidad' name="name" onChange={handledChange} value={addDisability && addDisability.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => disabilityUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteDiscapacity = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Discapacidad <b>{addDisability && addDisability.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => disabilityDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Discapacidad</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Discapacidad</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Discapacidad</TableCell>
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
                    {bodyAddDisability}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateDiscapacity}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteDiscapacity}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default DisabilityList;