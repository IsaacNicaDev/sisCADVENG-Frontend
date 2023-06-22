import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getEnrolment_types, deleteEnrolment_types, createEnrolment_types, updateEnrolment_types } from "./services/EnrolmentTypeService";
import { StyledBodyModal } from "../Styles";

const EnrolmentTypeList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addEnrolment_types, setAddEnrolment_types] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        enrolment_types();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddEnrolment_types(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addEnrolment_types);
    }

    const enrolment_types = async () => {
        const data = await getEnrolment_types();
        setData(data);
    }

    const Enrolment_typesCreate = async () => {
        createEnrolment_types(addEnrolment_types).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const Enrolment_typesUpdate = async () => {
        updateEnrolment_types(addEnrolment_types.id, addEnrolment_types).then(response => {
            var newData = Data;
            newData.map(enrolment_types => {
                if (enrolment_types.id === addEnrolment_types.id) {
                    enrolment_types.name = addEnrolment_types.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const Enrolment_typesDelete = async () => {
        deleteEnrolment_types(addEnrolment_types.id).then(() => {
            setData(Data.filter(enrolment_types => enrolment_types.id !== addEnrolment_types.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const Enrolment_typesOption = (enrolment_types, op) => {
        setAddEnrolment_types(enrolment_types);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => Enrolment_typesOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => Enrolment_typesOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddEnrolment_types = (
        <StyledBodyModal>
            <h3>Agregar Tipo Ingreso</h3>
            <TextField label='Tipo Ingreso' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => Enrolment_typesCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateEnrolment_types = (
        <StyledBodyModal>
            <h3>Editar Tipo Ingreso</h3>
            <TextField label='Tipo Ingreso' name="name" onChange={handledChange} value={addEnrolment_types && addEnrolment_types.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => Enrolment_typesUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteEnrolment_types = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Tipo Ingreso <b>{addEnrolment_types && addEnrolment_types.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => Enrolment_typesDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Tipo Ingreso</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Tipo Ingreso</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Tipo Ingreso</TableCell>
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
                    {bodyAddEnrolment_types}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateEnrolment_types}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteEnrolment_types}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default EnrolmentTypeList;