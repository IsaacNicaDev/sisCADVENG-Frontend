import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCities, deleteCity, createCity, updateCity } from "./services/CityService";
import { StyledBodyModal } from "../Styles";

const CityList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addCity, setAddCity] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Cities();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddCity(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addCity);
    }

    const Cities = async () => {
        const data = await getCities();
        setData(data);
    }

    const cityCreate = async () => {
        createCity(addCity).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const cityUpdate = async () => {
        updateCity(addCity.id, addCity).then(response => {
            var newData = Data;
            newData.map(city => {
                if (city.id === addCity.id) {
                    city.name = addCity.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const cityDelete = async () => {
        deleteCity(addCity.id).then(() => {
            setData(Data.filter(city => city.id !== addCity.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const cityOption = (city, op) => {
        setAddCity(city);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => cityOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => cityOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddCity = (
        <StyledBodyModal>
            <h3>Agregar Ciudad</h3>
            <TextField label='Ciudad' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => cityCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateCity = (
        <StyledBodyModal>
            <h3>Editar Ciudad</h3>
            <TextField label='Ciudad' name="name" onChange={handledChange} value={addCity && addCity.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => cityUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteCity = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Ciudad <b>{addCity && addCity.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => cityDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Ciudad</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Ciudad</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Ciudad</TableCell>
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
                    {bodyAddCity}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateCity}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteCity}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default CityList;