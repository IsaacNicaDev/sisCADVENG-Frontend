import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getGrades, deleteGrade, createGrade, updateGrade } from "./services/SubjectService";
import { StyledBodyModal } from "../Styles";

const GradeList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addGrade, setAddGrade] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Genders();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddGrade(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addGrade);
    }

    const Genders = async () => {
        const data = await getGrades();
        setData(data);
    }

    const genderCreate = async () => {
        createGrade(addGrade).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const genderUpdate = async () => {
        updateGrade(addGrade.id, addGrade).then(response => {
            var newData = Data;
            newData.map(gender => {
                if (gender.id === addGrade.id) {
                    gender.name = addGrade.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const genderDelete = async () => {
        deleteGrade(addGrade.id).then(() => {
            setData(Data.filter(gender => gender.id !== addGrade.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const GenderOption = (gender, op) => {
        setAddGrade(gender);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => GenderOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => GenderOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddGender = (
        <StyledBodyModal>
            <h3>Agregar Grado</h3>
            <TextField label='Grado' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => genderCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateGrade = (
        <StyledBodyModal>
            <h3>Editar Grado</h3>
            <TextField label='Grado' name="name" onChange={handledChange} value={addGrade && addGrade.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => genderUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteGrade = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Grado <b>{addGrade && addGrade.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => genderDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Grado</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Grado</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Grado</TableCell>
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
                    {bodyAddGender}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateGrade}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteGrade}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default GradeList;