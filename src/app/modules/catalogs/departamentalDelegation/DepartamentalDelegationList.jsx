import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getDepartamentalDelegations, deleteDepartamentalDelegation, createDepartamentalDelegation, updateDepartamentalDelegation } from "./services/DepartamentalDelegationService";
import { StyledBodyModal } from "../Styles";

const DepartamentalDelegationList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addDepartamentalDelegation, setAddDepartamentalDelegation] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        departamentalDelegations();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddDepartamentalDelegation(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addDepartamentalDelegation);
    }

    const departamentalDelegations = async () => {
        const data = await getDepartamentalDelegations();
        setData(data);
    }

    const departamentalDelegationCreate = async () => {
        createDepartamentalDelegation(addDepartamentalDelegation).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentalDelegationUpdate = async () => {
        updateDepartamentalDelegation(addDepartamentalDelegation.id, addDepartamentalDelegation).then(response => {
            var newData = Data;
            newData.map(departamentalDelegation => {
                if (departamentalDelegation.id === addDepartamentalDelegation.id) {
                    departamentalDelegation.name = addDepartamentalDelegation.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentalDelegationDelete = async () => {
        deleteDepartamentalDelegation(addDepartamentalDelegation.id).then(() => {
            setData(Data.filter(departamentalDelegation => departamentalDelegation.id !== addDepartamentalDelegation.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const departamentalDelegationOption = (departamentalDelegation, op) => {
        setAddDepartamentalDelegation(departamentalDelegation);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => departamentalDelegationOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => departamentalDelegationOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddDepartamentalDelegation = (
        <StyledBodyModal>
            <h3>Agregar Delegación Departamental</h3>
            <TextField label='Delegación Departamental' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => departamentalDelegationCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const boduUpdateDepartamentalDelegation = (
        <StyledBodyModal>
            <h3>Editar Delegación Departamental</h3>
            <TextField label='Delegación Departamental' name="name" onChange={handledChange} value={addDepartamentalDelegation && addDepartamentalDelegation.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => departamentalDelegationUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteDepartamentalDelegation = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Delegación Departamental <b>{addDepartamentalDelegation && addDepartamentalDelegation.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => departamentalDelegationDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Delegación Departamental</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Delegación Departamental</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Delegación Departamental</TableCell>
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
                    {bodyAddDepartamentalDelegation}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {boduUpdateDepartamentalDelegation}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteDepartamentalDelegation}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default DepartamentalDelegationList;