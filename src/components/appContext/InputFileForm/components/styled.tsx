import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/system';

export const DivContainer = styled('div')({
    width: '100%',

    boxSizing: 'border-box',
    minHeight: '64px',
    padding: '0.2rem',
    margin: '0',
    zIndex: '50',
})

export const DivExpandedLeftSetion = styled('div')({
    display: 'flex',
    width: '100%',
    paddingRight: '0.5rem',
})

export const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.up("sm")]: {
        paddingRight: '72px',
    },

    '& .MuiTextField-root': {
        width: '100%',
    }
}))