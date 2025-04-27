import { useState, useEffect, useCallback, useMemo } from "react";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSelect from "./components/CustomSelect";

import { getProfessors, deleteProfessor, createProfessor, updateProfessor } from "./services/ProfessorService";
import { getMaritalStatus } from "../../catalogs/maritalStatus/";
import { StyledBodyModal } from "../Styles";


const ProfessorList = () => {
    const [Data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addProfessor, setAddProfessor] = useState({
    
        first_name: "",
        second_name: "",
        last_name: "",
        second_lastname: "",
        age: "",
        marital_status_id: "",
        phone: "",
        number_children: ""
    })

    const [DataMaritalStatus, setDataMaritalStatus] = useState([]); // Para almacenar los datos
    const [errors, setErrors] = useState({});

    useEffect(() => {
        Profesors();
    }, []);

    const handledChange = useCallback((e) => {
        const { name, value } = e.target;
    
        setAddProfessor((prevState) => ({
            ...prevState,
            [name]:
                ["age", "marital_status_id", "number_children"].includes(name)
                    ? (value === "" ? "" : parseInt(value, 10))
                    : value.toUpperCase(),
        }));
    }, []);    

    const validateFields = () => {
        const newErrors = {};
    
        if (!addProfessor.first_name.trim()) {
            newErrors.first_name = "El primer nombre es obligatorio.";
        }
        if (!addProfessor.last_name.trim()) {
            newErrors.last_name = "El primer apellido es obligatorio.";
        }
        if (!addProfessor.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio.";
        } else if (!/^\d{8,15}$/.test(addProfessor.phone)) {
            newErrors.phone = "El teléfono debe contener entre 8 y 15 dígitos.";
        }
        if (addProfessor.age === "" || addProfessor.age < 18 || addProfessor.age > 100) {
            newErrors.age = "La edad debe estar entre 18 y 100.";
        }
        if (addProfessor.number_children < 0) {
            newErrors.number_children = "El número de hijos no puede ser negativo.";
        }
        if (!addProfessor.marital_status_id) {
            newErrors.marital_status_id = "El estado civil es obligatorio.";
        }
    
        setErrors(newErrors);
    
        // Devuelve verdadero si no hay errores
        return Object.keys(newErrors).length === 0;
    };
    

    const Profesors = async () => {
        const data = await getProfessors();
        console.log(data)
        setData(data);
        const dataMaritalStatus = await getMaritalStatus();
        setDataMaritalStatus(dataMaritalStatus);
    }
    const professorCreate = async () => {
        if (!validateFields()) {
            console.log("Errores de validación:", errors);
            return;
        }

        console.log("Datos enviados:", addProfessor);
        createProfessor(addProfessor).then(response => {
            setData((prevState) => [...prevState, response.data]); // Añadir el nuevo profesor al estado
            console.log(response.data);
            handledModalCreate();
        }).catch(err => {
            console.log(err);
        })
    }

    const profesorUpdate = async () => {
        if (!validateFields()) {
            console.log("Errores de validación:", errors);
            return;
        }
    
        updateProfessor(addProfessor.id, addProfessor)
            .then(response => {
                const newData = Data.map(professor =>
                    professor.id === addProfessor.id ? { ...professor, ...addProfessor } : professor
                );
                setData(newData);
                handledModalUpdate();
            })
            .catch(err => {
                console.log(err);
            });
    };

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

    const headRows = () => {
        return (
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
        )
    }

    const rows = useMemo(() => Data.map((data, index) => {
        const maritalStatus = DataMaritalStatus.find(status => status.id === data.marital_status_id);
        return (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{data.id}</TableCell>
                <TableCell align="center">{data.first_name}</TableCell>
                <TableCell align="center">{data.second_name}</TableCell>
                <TableCell align="center">{data.last_name}</TableCell>
                <TableCell align="center">{data.second_lastname}</TableCell>
                <TableCell align="center">{data.age}</TableCell>
                <TableCell align="center">{maritalStatus ? maritalStatus.name : 'No disponible'}</TableCell>
                <TableCell align="center">{data.phone}</TableCell>
                <TableCell align="center">{data.number_children}</TableCell>
                <TableCell align="center">
                    <Box component='div'>
                        <Button size="small" sx={{ marginInlineEnd: 1 }} variant="contained" onClick={() => professorOption(data, "Edit")} ><EditIcon />Editar</Button>
                        <Button size="small" variant="contained" onClick={() => professorOption(data, "Eliminar")} > <DeleteIcon />Eliminar</Button>
                    </Box>
                </TableCell>
            </TableRow>
        );
    }), [Data, DataMaritalStatus]);
    
    

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
            <TextField label='Primer Nombre' name="first_name" onChange={handledChange} fullWidth margin="normal" error={!!errors.first_name}
                helperText={errors.first_name} />
            <TextField label='Segundo Nombre' name="second_name" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Primer Apellido' name="last_name" onChange={handledChange} fullWidth margin="normal" error={!!errors.last_name}
                helperText={errors.last_name} />
            <TextField label='Segundo Apellido' name="second_lastname" onChange={handledChange} fullWidth margin="normal" />
            <TextField label='Edad' name="age" type="number" onChange={handledChange} fullWidth margin="normal" error={!!errors.age}
                helperText={errors.age} />
            <CustomSelect
                label="Estado Civil"
                name="marital_status_id"
                value={addProfessor.marital_status_id}
                options={DataMaritalStatus}
                onChange={handledChange}
            />
            <TextField label='Teléfono' name="phone" onChange={handledChange} fullWidth margin="normal" error={!!errors.phone}
                helperText={errors.phone}/>
            <TextField label='Número Hijos' name="number_children" type="number" onChange={handledChange} fullWidth margin="normal" error={!!errors.number_children}
                helperText={errors.number_children}/>
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
            <Typography variant="h6" gutterBottom>Actualizar Profesor</Typography>
            <TextField label='Primer Nombre' name="first_name" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.first_name : ''} error={!!errors.first_name}
                helperText={errors.first_name} />
            <TextField label='Segundo Nombre' name="second_name" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.second_name : ''} />
            <TextField label='Primer Apellido' name="last_name" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.last_name : ''} error={!!errors.last_name}
                helperText={errors.last_name}/>
            <TextField label='Segundo Apellido' name="second_lastname" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.second_lastname : ''} />
            <TextField label='Edad' name="age" type="number" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.age : ''} error={!!errors.age}
                helperText={errors.age}/>
            <CustomSelect
                label="Estado Civil"
                name="marital_status_id"
                value={addProfessor ? addProfessor.marital_status_id : ''}
                options={DataMaritalStatus}
                onChange={handledChange}
            />
            <TextField label='Teléfono' name="phone" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.phone : ''} error={!!errors.phone}
                helperText={errors.phone}/>
            <TextField label='Número Hijos' name="number_children" type="number" onChange={handledChange} fullWidth margin="normal" value={addProfessor ? addProfessor.number_children : ''} error={!!errors.number_children}
                helperText={errors.number_children} />
            <Box mt={2} align="center">
                <Button variant="contained" onClick={() => profesorUpdate()} >Actualizar</Button>
                <Button variant="contained" onClick={() => handledModalUpdate()} sx={{ ml: 2 }}>Cancelar</Button>
            </Box>
        </StyledBodyModal>
    )

    const bodydeleteProfessor = (
        <StyledBodyModal>
            <p>Estás seguro que deseas eliminar el Professor <b>{addProfessor && addProfessor.first_name} {addProfessor && addProfessor.last_name}</b>?</p>
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
                        {headRows()}
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