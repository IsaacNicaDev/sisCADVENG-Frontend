import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getEducational_Institutions, deleteEducational_Institution, createEducational_Institution, updateEducational_Institution } from "./services/Educational_InstitutionService";
import { StyledBodyModal } from "../Styles";

const Educational_InstitutionList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addEducational_Institution, setAddEducational_Institution] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Educational_Institutions();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddEducational_Institution(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addEducational_Institution);
    }

    const Educational_Institutions = async () => {
        const data = await getEducational_Institutions();
        setData(data);
    }

    const Educational_InstitutionCreate = async () => {
        createEducational_Institution(addEducational_Institution).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const Educational_InstitutionUpdate = async () => {
        updateEducational_Institution(addEducational_Institution.id, addEducational_Institution).then(response => {
            var newData = Data;
            newData.map(educational_Institution => {
                if (educational_Institution.id === addEducational_Institution.id) {
                    educational_Institution.name = addEducational_Institution.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const Educational_InstitutionDelete = async () => {
        deleteEducational_Institution(addEducational_Institution.id).then(() => {
            setData(Data.filter(educational_Institution => educational_Institution.id !== addEducational_Institution.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const Educational_InstitutionOption = (educational_Institution, op) => {
        setAddEducational_Institution(educational_Institution);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => Educational_InstitutionOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => Educational_InstitutionOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddEducational_Institution = (
        <StyledBodyModal>
            <h3>Agregar Institución Educativa</h3>
            <TextField label='Institución Educativa' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => Educational_InstitutionCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateEducational_Institution = (
        <StyledBodyModal>
            <h3>Editar Institución Educativa</h3>
            <TextField label='Institución Educativa' name="name" onChange={handledChange} value={addEducational_Institution && addEducational_Institution.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => Educational_InstitutionUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteEducational_Institution = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Institución Educativa <b>{addEducational_Institution && addEducational_Institution.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => Educational_InstitutionDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Institución Educativa</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Institución Educativa</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Institución Educativa</TableCell>
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
                    {bodyAddEducational_Institution}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateEducational_Institution}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteEducational_Institution}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default Educational_InstitutionList;