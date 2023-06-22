import { useState, useEffect } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getDistricts, deleteDistrict, createDistrict, updateDistrict } from "./services/DistrictService";
import { StyledBodyModal } from "../Styles";

const DistrictList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addDistric, setAddDistrict] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        districts();
    }, []);

    const handledChange = e => {
        const { name, value } = e.target;
        setAddDistrict(prevState => ({
            ...prevState,
            [name]: value.toUpperCase()
        }));
        console.log(addDistric);
    }

    const districts = async () => {
        const data = await getDistricts();
        setData(data);
    }

    const districtCreate = async () => {
        createDistrict(addDistric).then(response => {
            setData(Data.concat(response.data));
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const districtUpdate = async () => {
        updateDistrict(addDistric.id, addDistric).then(response => {
            var newData = Data;
            newData.map(district => {
                if (district.id === addDistric.id) {
                    district.name = addDistric.name;
                }
            });
            setData(newData);
            handledModalUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    const districtDelete = async () => {
        deleteDistrict(addDistric.id).then(() => {
            setData(Data.filter(district => district.id !== addDistric.id));
            handledModalDelete();
        }).catch(err => {
            console.log(err);
        })
    }

    const districtOption = (district, op) => {
        setAddDistrict(district);
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
                    <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => districtOption(data, "Edit")} ><EditIcon />Editar</Button>
                    <Button size="small" variant="contained" onClick={() => districtOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
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

    const bodyAddDistrict = (
        <StyledBodyModal>
            <h3>Agregar Barrio</h3>
            <TextField label='Barrio' name="name" onChange={handledChange} />
            <br />
            <Box align='center' >
                <Button color='primary' onClick={() => districtCreate()} >Insertar</Button>
                <Button onClick={() => handledModalCreate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyaupdateDistrict = (
        <StyledBodyModal>
            <h3>Editar Barrio</h3>
            <TextField label='Barrio' name="name" onChange={handledChange} value={addDistric && addDistric.name} />
            <br />
            <Box align='center' >
                <Button onClick={() => districtUpdate()} >Editar</Button>
                <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodyDeleteDistrict = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Barrio <b>{addDistric && addDistric.name}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick={() => districtDelete()}>Sí</Button>
                <Button onClick={() => handledModalDelete()} >No</Button>
            </div>
        </StyledBodyModal>
    )

    return (
        <Box sx={{ margin: 5 }}>
            <Typography align="center" variant="h4" padding={1}> Barrio</Typography>
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Barrio</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "ButtonFace" }} >
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }} align="center">ID</TableCell>
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
                    {bodyAddDistrict}
                </Modal>
                <Modal
                    open={modalUpdate}
                    onClose={handledModalUpdate}>
                    {bodyaupdateDistrict}
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={handledModalDelete}>
                    {bodyDeleteDistrict}
                </Modal>

            </TableContainer>
        </Box>
    )
};

export default DistrictList;