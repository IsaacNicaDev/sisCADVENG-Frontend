import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getLanguages, deleteLanguage, createLanguage, updateLanguage } from "./services/LanguageService";
import { StyledBodyModal } from "../Styles";

const LanguageList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addLanguage, setAddLanguage] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        languages();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddLanguage(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addLanguage);
    }

    const languages = async () => {
        const data = await getLanguages();
        setData(data);
    }

    const languageCreate = async () => {
        createLanguage(addLanguage).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const languageUpdate = async () => {
        updateLanguage(addLanguage.id, addLanguage).then(response => {
            var newData = Data;
            newData.map(language => {
                if (language.id === addLanguage.id) {
                    language.name = addLanguage.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const languageDelete = async () => {
        deleteLanguage(addLanguage.id).then(() => {
            setData(Data.filter(language => language.id !== addLanguage.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const languageOption = (language, op) => {
        setAddLanguage(language);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => languageOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => languageOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddLanguage = (
        <StyledBodyModal>
            <h3>Agregar Idioma</h3>
            <TextField label='Idioma' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => languageCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateLanguage = (
        <StyledBodyModal>
            <h3>Editar Idioma</h3>
            <TextField label='Idioma' name="name" onChange={handledChange} value={addLanguage && addLanguage.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => languageUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteLanguage = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Idioma <b>{addLanguage && addLanguage.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => languageDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Idioma</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Idioma</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Idioma</TableCell>
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
                    {bodyAddLanguage}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateLanguage}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteLanguage}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default LanguageList;