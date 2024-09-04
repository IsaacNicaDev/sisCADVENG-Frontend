import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getLocations, deletelocations, createlocations, updatelocations } from "./services/LocationService";
import { StyledBodyModal } from "../Styles";

const LocationList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addLocation, setAddLocation] = useState({
        id: "",
        name: "",
        country_id: "",
        city_id: "",
        departament_id: "",
        zone_id: "",
        district_id: ""
        
    })
    useEffect(() => {
        Locations();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddLocation(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addLocation);
    }

    const Locations = async () => {
        const data = await getLocations();
        setData(data);
    }

    const locationCreate = async () => {
        createlocations(addLocation).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const locationUpdate = async () => {
        updatelocations(addLocation.id, addLocation).then(response => {
            var newData = Data;
            newData.map(location => {
                if (location.id === addLocation.id) {
                    location.country_id = addLocation.country_id;
                    location.city_id = addLocation.city_id;
                    location.departament_id = addLocation.departament_id;
                    location.zone_id = addLocation.zone_id;
                    location.district_id = addLocation.district_id;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const locationDelete = async () => {
        deletelocations(addLocation.id).then(() => {
            setData(Data.filter(location => location.id !== addLocation.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const locationOption = (location, op) => {
        setAddLocation(location);
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
            <TableCell align="center">{data.country_id}</TableCell>
            <TableCell align="center">{data.city_id}</TableCell>
            <TableCell align="center">{data.departament_id}</TableCell>
            <TableCell align="center">{data.zone_id}</TableCell>
            <TableCell align="center">{data.district_id}</TableCell>
            <TableCell align="center">
                <Box component='div'>
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => locationOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => locationOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddLocation = (
        <StyledBodyModal>
            <h3>Agregar Ubicación</h3>
            <TextField label='Ubicación' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => locationCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateLocation = (
        <StyledBodyModal>
            <h3>Editar Ubicación</h3>
            <TextField label='Ubicación' name="name" onChange={handledChange} value={addLocation && addLocation.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => locationUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteLocation = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar la Ubicación <b>{addLocation && addLocation.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => locationDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Ubicación</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Ubicación</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">País</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Ciudad</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Departamento</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Zona</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Barrio</TableCell>
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
                    {bodyAddLocation}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateLocation}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteLocation}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default LocationList;