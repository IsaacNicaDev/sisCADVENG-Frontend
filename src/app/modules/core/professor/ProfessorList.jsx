import { useState, useEffect } from "react";
import { InputLabel, MenuItem, Select, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getProfessors, deleteProfessor, createProfessor, updateProfessor } from "./services/ProfessorService";
import { StyledBodyModal } from "../Styles";

const ProfessorList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addProfessor, setAddProfessor] = useState({
        id: "",
        first_name: "",
        second_name: "",
        last_name: "",
        second_lastname: "",
        age: "",
        marital_status_id: "",
        phone: "",
        number_children: ""
    })
    useEffect(() => {
        Profesors();
    }, []);
   
    const handledChange = e => {
        const { name, value } = e.target;
        setAddProfessor(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addProfessor);
    }

    const Profesors = async () => {
        const data = await getProfessors();
        setData(data);
    }

    const professorCreate = async () => {
        createProfessor(addProfessor).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const profesorUpdate = async () => {
        updateProfessor(addProfessor.id, addProfessor).then(response => {
            var newData = Data;
            newData.map(professor => {
                if (professor.id === addProfessor.id) {
                    professor.first_name = addProfessor.first_name;
                    professor.second_name = addProfessor.second_name;
                    professor.last_name = addProfessor.last_name;
                    professor.second_lastname = addProfessor.second_lastname;
                    professor.age = addProfessor.age;
                    professor.marital_status_id = addProfessor.marital_status_id;
                    professor.phone = addProfessor.phone;
                    professor.number_children = addProfessor.number_children;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const professorDelete = async () => {
        deleteProfessor(addProfessor.id).then(() => {
            setData(Data.filter(professor => professor.id !== addProfessor.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const professorOption = (professor, op) => {
        setAddProfessor(professor);
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
            <TableCell align="center">{data.first_name}</TableCell>
            <TableCell align="center">{data.second_name}</TableCell>
            <TableCell align="center">{data.last_name}</TableCell>
            <TableCell align="center">{data.second_lastname}</TableCell>
            <TableCell align="center">{data.age}</TableCell>
            <TableCell align="center">{data.marital_status_id?.name || "No especificado"}</TableCell>
            <TableCell align="center">{data.phone}</TableCell>
            <TableCell align="center">{data.number_children}</TableCell>
            <TableCell align="center">
                <Box component='div'>
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => professorOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => professorOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyaddProfessor = (
        <StyledBodyModal>
              <Typography variant="h6" gutterBottom>Agregar Profesor</Typography>
            <TextField label='Primer Nombre' name="first_name" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Segundo Nombre' name="second_name" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Primer Apellido' name="last_name" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Segundo Apellido' name="second_lastname" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Edad' name="age" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Estado Civil' name="marital_status_id" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Teléfono' name="phone" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Número Hijos' name="number_children" onChange={handledChange} fullWidth margin="normal" />
            <Box mt={2} align="center">
                <Button variant="contained" onClick={() => professorCreate()} >Insertar</Button>
                <Button variant="contained" onClick={() => handledModalCreate()} sx={{ ml: 2 }}>
                    Cancelar
                </Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyupdateProfessor = (
        <StyledBodyModal>
            <h3>Editar Professor</h3>
            <TextField label='Professor' name="name" onChange={handledChange} value={addProfessor && addProfessor.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => profesorUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodydeleteProfessor = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Professor <b>{addProfessor && addProfessor.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => professorDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Profesor</Typography>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Profesor</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Primer Nombre</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Segundo Nombre</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Primer Apellido</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Segundo Apellido</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Edad</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Estado Civil</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Teléfono</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Número Hijos</TableCell>
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
                    {bodyaddProfessor}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyupdateProfessor}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodydeleteProfessor}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default ProfessorList;