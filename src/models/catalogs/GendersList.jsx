import { useState, useEffect } from "react";
import axios from "axios";
import { TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Modal, Paper, Table, TableBody, TableCell, Button } from "@mui/material";
import { Box, palette, spacing } from "@mui/system";
import shadows from "@mui/material/styles/shadows";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const API_URL = 'http://localhost:8000';

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
    getGenders();
  }, []);

  const handledChange = e => {
    const { name, value } = e.target;
    setAddGender(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(addGender);
  }

  const getGenders = async () => {
    /*const url = `${API_URL}/api/catalogs/genders/`;
    const {data} = await axios.get(url);
    setGenderData(data);
*/
    const url = `${API_URL}/api/catalogs/genders/`;
    await axios.get(url).then(response => {
      setGenderData(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const createGender = async () => {
    const url = `${API_URL}/api/catalogs/genders/`;
    await axios.post(url, addGender).then(response => {
      setGenderData(genderData.concat(response.data));
      console.log(response.data);
      handledModalCreate();
    }).catch(err => {
      console.log(err);
    })
  }

  const updateGender = async () => {
    const url = `${API_URL}/api/catalogs/genders/${addGender.id}/`;
    await axios.put(url, addGender).then(response => {
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

  const deleteGender = async () => {
    const url = `${API_URL}/api/catalogs/genders/${addGender.id}/`;
    await axios.delete(url, addGender).then(response => {
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
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <Box component='div'>
          <Button onClick={() => GenderOption(data, "Edit")} ><EditIcon /></Button>
          <Button onClick={() => GenderOption(data, "Eliminar")} > <DeleteIcon /></Button>
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
    <Box
      component='div'
      sx={{
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: shadows[5],
        padding: spacing(2, 4, 3, 2),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}
    >
      <h3>Agregar Género</h3>
      <TextField label='Género' name="name" onChange={handledChange} />
      <br />
      <Box align='center' >
        <Button color='primary' onClick={() => createGender()} >Insertar</Button>
        <Button onClick={() => handledModalCreate()}>Cancelar</Button>
      </Box>
    </Box>
  )

  const bodyUpdateGender = (
    <Box
      component='div'
      sx={{
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: shadows[5],
        padding: spacing(2, 4, 3, 2),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}
    >
      <h3>Editar Género</h3>
      <TextField label='Género' name="name" onChange={handledChange} value={addGender && addGender.name} />
      <br />
      <Box align='center' >
        <Button onClick={() => updateGender()} >Editar</Button>
        <Button onClick={() => handledModalUpdate()}>Cancelar</Button>
      </Box>
    </Box>
  )

  const bodyDeleteGender = (
    <Box
      component='div'
      sx={{
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: shadows[5],
        padding: spacing(2, 4, 3, 2),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}
    >
      <p>Estás seguro que deseas eliminar el Género <b>{addGender && addGender.name}</b>?</p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteGender()}>Sí</Button>
        <Button onClick={() => handledModalDelete()} >No</Button>
      </div>
    </Box>
  )

  return (
    <Box>
      <TableContainer component={Paper}>
        <br />
        <Button startIcon={<AddCircleIcon />} onClick={() => handledModalCreate()}>Agregar Género</Button>
        <br />
        <Typography variant="h4" padding={1}> Género</Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Acciones</TableCell>
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