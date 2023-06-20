import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getEducationalLevels, deleteEducationalLevel, createEducationalLevel, updateEducationalLevel } from "./services/EducacionalLevelService";
import { StyledBodyModal } from "../Styles";

const EducationalLevelList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addEducaionalLevel, setAddEducaionalLevel] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        educationalLevel();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddEducaionalLevel(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addEducaionalLevel);
    }

    const educationalLevel = async () => {
        const data = await getEducationalLevels();
        setData(data);
    }

    const educationalLevelCreate = async () => {
        createEducationalLevel(addEducaionalLevel).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const educationalLevelUpdate = async () => {
        updateEducationalLevel(addEducaionalLevel.id, addEducaionalLevel).then(response => {
            var newData = Data;
            newData.map(educationalLevel => {
                if (educationalLevel.id === addEducaionalLevel.id) {
                    educationalLevel.name = addEducaionalLevel.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const educationalLevelDelete = async () => {
        deleteEducationalLevel(addEducaionalLevel.id).then(() => {
            setData(Data.filter(educationalLevel => educationalLevel.id !== addEducaionalLevel.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const educationalLevelOption = (educationalLevel, op) => {
        setAddEducaionalLevel(educationalLevel);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => educationalLevelOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => educationalLevelOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddEducationalLevel = (
        <StyledBodyModal>
            <h3>Agregar Nivel Educativo</h3>
            <TextField label='Nivel Educativo' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => educationalLevelCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateEducationalLevel = (
        <StyledBodyModal>
            <h3>Editar Nivel Educativo</h3>
            <TextField label='Nivel Educativo' name="name" onChange={handledChange} value={addEducaionalLevel && addEducaionalLevel.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => educationalLevelUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteEducationalLevel = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Nivel Educativo <b>{addEducaionalLevel && addEducaionalLevel.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => educationalLevelDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Nivel Educativo</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Nivel Educativo</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Nivel Educativo</TableCell>
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
                    {bodyAddEducationalLevel}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateEducationalLevel}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteEducationalLevel}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default EducationalLevelList;