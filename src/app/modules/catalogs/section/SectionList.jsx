import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSections, deleteSection, createSection, updateSection } from "./services/SectionService";
import { StyledBodyModal } from "../Styles";

const SectionList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addSection, setAddSection] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Sections();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddSection(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addSection);
    }

    const Sections = async () => {
        const data = await getSections();
        setData(data);
    }

    const sectionCreate = async () => {
        createSection(addSection).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const sectionUpdate = async () => {
        updateSection(addSection.id, addSection).then(response => {
            var newData = Data;
            newData.map(section => {
                if (section.id === addSection.id) {
                    section.name = addSection.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const sectionDelete = async () => {
        deleteSection(addSection.id).then(() => {
            setData(Data.filter(section => section.id !== addSection.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const sectionOption = (section, op) => {
        setAddSection(section);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => sectionOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => sectionOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddSection = (
        <StyledBodyModal>
            <h3>Agregar Sección</h3>
            <TextField label='Sección' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => sectionCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateSection = (
        <StyledBodyModal>
            <h3>Editar Sección</h3>
            <TextField label='Sección' name="name" onChange={handledChange} value={addSection && addSection.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => sectionUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteSection = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Sección <b>{addSection && addSection.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => sectionDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Sección</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Sección</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Sección</TableCell>
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
                    {bodyAddSection}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateSection}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteSection}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default SectionList;