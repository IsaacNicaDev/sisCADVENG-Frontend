import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCountries, deleteCountry, createCountry, updateCountry } from "./services/CountryService";
import { StyledBodyModal } from "../Styles";

const CountryList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addCountry, setAddCountry] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        Countries();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddCountry(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addCountry);
    }

    const Countries = async () => {
        const data = await getCountries();
        setData(data);
    }

    const countryCreate = async () => {
        createCountry(addCountry).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const countryUpdate = async () => {
        updateCountry(addCountry.id, addCountry).then(response => {
            var newData = Data;
            newData.map(country => {
                if (country.id === addCountry.id) {
                    country.name = addCountry.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const countryDelete = async () => {
        deleteCountry(addCountry.id).then(() => {
            setData(Data.filter(country => country.id !== addCountry.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const countryOption = (country, op) => {
        setAddCountry(country);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => countryOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => countryOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddCountry = (
        <StyledBodyModal>
            <h3>Agregar País</h3>
            <TextField label='País' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => countryCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyUpdateCountry = (
        <StyledBodyModal>
            <h3>Editar País</h3>
            <TextField label='País' name="name" onChange={handledChange} value={addCountry && addCountry.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => countryUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteCountry = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el País <b>{addCountry && addCountry.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => countryDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> País</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar País</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">País</TableCell>
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
                    {bodyAddCountry}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyUpdateCountry}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteCountry}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default CountryList;