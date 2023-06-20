import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSubjects, deleteSubject, createSubject, updateSubject } from "./services/SubjectService";
import { StyledBodyModal } from "../Styles";

const SubjectList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addSubject, setAddSubject] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Subjects();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddSubject(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addSubject);
    }

    const Subjects = async () => {
        const data = await getSubjects();
        setData(data);
    }

    const subjectCreate = async () => {
        createSubject(addSubject).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const subjectUpdate = async () => {
        updateSubject(addSubject.id, addSubject).then(response => {
            var newData = Data;
            newData.map(subject => {
                if (subject.id === addSubject.id) {
                    subject.name = addSubject.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const subjectDelete = async () => {
        deleteSubject(addSubject.id).then(() => {
            setData(Data.filter(subject => subject.id !== addSubject.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const subjectOption = (subject, op) => {
        setAddSubject(subject);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => subjectOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => subjectOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddSubject = (
        <StyledBodyModal>
            <h3>Agregar Asignatura</h3>
            <TextField label='Asignatura' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => subjectCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateSubject = (
        <StyledBodyModal>
            <h3>Editar Asignatura</h3>
            <TextField label='Asignatura' name="name" onChange={handledChange} value={addSubject && addSubject.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => subjectUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteSubject = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Asignatura <b>{addSubject && addSubject.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => subjectDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Asignatura</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Asignatura</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Asignatura</TableCell>
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
                    {bodyAddSubject}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateSubject}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteSubject}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default SubjectList;