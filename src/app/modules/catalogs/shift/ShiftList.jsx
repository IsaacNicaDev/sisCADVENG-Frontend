import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getShifts, deleteShift, createShift, updateShift } from "./services/ShiftService";
import { StyledBodyModal } from "../Styles";

const ShiftList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addShift, setAddShift] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Shifts();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddShift(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addShift);
    }

    const Shifts = async () => {
        const data = await getShifts();
        setData(data);
    }

    const shiftCreate = async () => {
        createShift(addShift).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const shiftUpdate = async () => {
        updateShift(addShift.id, addShift).then(response => {
            var newData = Data;
            newData.map(shift => {
                if (shift.id === addShift.id) {
                    shift.name = addShift.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const shiftDelete = async () => {
        deleteShift(addShift.id).then(() => {
            setData(Data.filter(shift => shift.id !== addShift.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const shiftOption = (shift, op) => {
        setAddShift(shift);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => shiftOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => shiftOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddShift = (
        <StyledBodyModal>
            <h3>Agregar Turno</h3>
            <TextField label='Turno' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => shiftCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateShift = (
        <StyledBodyModal>
            <h3>Editar Turno</h3>
            <TextField label='Turno' name="name" onChange={handledChange} value={addShift && addShift.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => shiftUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteShift = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Turno <b>{addShift && addShift.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => shiftDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Turno</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Turno</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Turno</TableCell>
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
                    {bodyAddShift}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateShift}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteShift}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default ShiftList;