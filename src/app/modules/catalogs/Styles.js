import { styled, Box } from "@mui/system"

export const prueva = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 5,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
});

export const StyledBodyModal = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: 5,
    padding: '20px',
    color: '#000',
    textAlign: 'center'
});