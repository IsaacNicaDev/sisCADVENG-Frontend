import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box, spacing } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getGenders, deleteGender, createGender, updateGender } from "./services/GendersService";
import { modal } from "../Styles";

const GendersList = () => {
    const [genderData, setGenderData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addGender, setAddGender] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Genders();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddGender(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addGender);
    }

    const Genders = async () => {
        const data = await getGenders();
        setGenderData(data);
    }

    const genderCreate = async () => {
        createGender(addGender).then(response => {
            setGenderData(genderData.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const genderUpdate = async () => {
        updateGender(addGender.id, addGender).then(response => {
            var newData = genderData;
            newData.map(gender => {
                if (gender.id === addGender.id) {
                    gender.name = addGender.name;
                }
            });
            setGenderData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const genderDelete = async () => {
        deleteGender(addGender.id).then(() => {
            setGenderData(genderData.filter(gender => gender.id !== addGender.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const GenderOption = (gender, op) => {
        setAddGender(gender);
        (op === "Edit") ? handledModalUpdate()
            :
            handledModalDelete()
    }

    const rows = genderData.map((data) =>
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
        <Box sx={modal}>
            <h3>Agregar Género</h3>
            <TextField label='Género' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => genderCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </Box>
    )

    const bodyUpdateGender = (
        <Box sx={modal}>
            <h3>Editar Género</h3>
            <TextField label='Género' name="name" onChange={handledChange} value={addGender && addGender.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => genderUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </Box>
    )

    const bodyDeleteGender = (
        <Box sx={modal}>
            <p>Estás seguro que deseas eliminar el Género <b>{addGender && addGender.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => genderDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </Box>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Género</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Género</Button>
            <br/><br/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Sexo</TableCell>
                            <TableCell align="center">Acciones</TableCell>
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
                    {bodyUpdateGender}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteGender}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default GendersList;