import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getDepartaments, deleteDepartament, createDepartament, updateDepartament } from "./services/DepartamentService";
import { StyledBodyModal } from "../Styles";

const DepartamentList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addDepartament, setAddDepartament] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        departaments();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddDepartament(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addDepartament);
    }

    const departaments = async () => {
        const data = await getDepartaments();
        setData(data);
    }

    const departamentCreate = async () => {
        createDepartament(addDepartament).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentUpdate = async () => {
        updateDepartament(addDepartament.id, addDepartament).then(response => {
            var newData = Data;
            newData.map(departament => {
                if (departament.id === addDepartament.id) {
                    departament.name = addDepartament.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentDelete = async () => {
        deleteDepartament(addDepartament.id).then(() => {
            setData(Data.filter(departament => departament.id !== addDepartament.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentOption = (departament, op) => {
        setAddDepartament(departament);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => departamentOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => departamentOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddDepartament = (
        <StyledBodyModal>
            <h3>Agregar Departamento</h3>
            <TextField label='Departamento' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => departamentCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateDepartament = (
        <StyledBodyModal>
            <h3>Editar Departamento</h3>
            <TextField label='Departamento' name="name" onChange={handledChange} value={addDepartament && addDepartament.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => departamentUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteDepartament = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Departamento <b>{addDepartament && addDepartament.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => departamentDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Departamento</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Departamento</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Departamento</TableCell>
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
                    {bodyAddDepartament}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateDepartament}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteDepartament}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default DepartamentList;