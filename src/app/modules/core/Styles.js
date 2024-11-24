import { styled, Box } from "@mui/system"

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