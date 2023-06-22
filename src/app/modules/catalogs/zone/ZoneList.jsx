import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getZones, deleteZone, createZone, updateZone } from "./services/ZoneService";
import { StyledBodyModal } from "../Styles";

const ZoneList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addZone, setAddZone] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        zones();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddZone(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addZone);
    }

    const zones = async () => {
        const data = await getZones();
        setData(data);
    }

    const zoneCreate = async () => {
        createZone(addZone).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const zoneUpdate = async () => {
        updateZone(addZone.id, addZone).then(response => {
            var newData = Data;
            newData.map(zone => {
                if (zone.id === addZone.id) {
                    zone.name = addZone.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const zoneDelete = async () => {
        deleteZone(addZone.id).then(() => {
            setData(Data.filter(zone => zone.id !== addZone.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const zoneOption = (zone, op) => {
        setAddZone(zone);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => zoneOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => zoneOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddZone = (
        <StyledBodyModal>
            <h3>Agregar Zona</h3>
            <TextField label='Zona' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => zoneCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateZone = (
        <StyledBodyModal>
            <h3>Editar Zona</h3>
            <TextField label='Zona' name="name" onChange={handledChange} value={addZone && addZone.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => zoneUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteZone = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Zona <b>{addZone && addZone.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => zoneDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Zona</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Zona</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Zona</TableCell>
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
                    {bodyAddZone}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateZone}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteZone}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default ZoneList;