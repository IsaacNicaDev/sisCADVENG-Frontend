import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getMunicipalities, deleteMunicipality, createMunicipality, updateMunicipality } from "./services/MunicipalityService";
import { StyledBodyModal } from "../Styles";

const MunicipalityList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addMunicipality, setAddMunicipality] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Municipality();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddMunicipality(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addMunicipality);
    }

    const Municipality = async () => {
        const data = await getMunicipalities();
        setData(data);
    }

    const municipalityCreate = async () => {
        createMunicipality(addMunicipality).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const municipalityUpdate = async () => {
        updateMunicipality(addMunicipality.id, addMunicipality).then(response => {
            var newData = Data;
            newData.map(municipality => {
                if (municipality.id === addMunicipality.id) {
                    municipality.name = addMunicipality.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const minicipalityDelete = async () => {
        deleteMunicipality(addMunicipality.id).then(() => {
            setData(Data.filter(municipality => municipality.id !== addMunicipality.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const municipalityOption = (municipality, op) => {
        setAddMunicipality(municipality);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => municipalityOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => municipalityOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddMunicipality = (
        <StyledBodyModal>
            <h3>Agregar Municipalidad</h3>
            <TextField label='Municipalidad' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => municipalityCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateMunicipality = (
        <StyledBodyModal>
            <h3>Editar Municipalidad</h3>
            <TextField label='Municipalidad' name="name" onChange={handledChange} value={addMunicipality && addMunicipality.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => municipalityUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteMunicipality = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Municipalidad <b>{addMunicipality && addMunicipality.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => minicipalityDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> MUNICIPALIDAD</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Municipalidad</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Municipalidad</TableCell>
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
                    {bodyAddMunicipality}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateMunicipality}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteMunicipality}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default MunicipalityList;