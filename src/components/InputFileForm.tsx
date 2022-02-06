import TextField from '@mui/material/TextField'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import useAppContext from './appContext/useAppContext'

async function handleSend(file, params){
    const formData = new FormData()
    formData.append("file", file);
    formData.append("field", JSON.stringify(params));
    const url = '/calculate-hrv' || 'http://localhost:5000/calculate-hrv'

    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    try {
        return res.data
    } catch (err) {
        console.error(err)
    }

  }

const InputFileForm = () => {
    const { dispatch } = useAppContext()
    const [ expanded, setExpanded ] = React.useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            file: '' as any,
            step: 120,
            window: 100
        }
    });

    const onSubmit = async (data) => {
        setExpanded(false)
        dispatch({type: 'setLoading'})
        const {results: chartData, hrv_avg} = await handleSend(data.file, {step: data.step, window: data.window})
        console.log(chartData, 'hrv_avg: ' + hrv_avg)
        dispatch({type: 'setChartData', payload: chartData})
        dispatch({type: 'stopLoading'})
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <Accordion className="accordion" expanded={expanded} onChange={() => {setExpanded(prev => !prev)}}>
                    <AccordionSummary
                    //  style={{background: 'red', minHeight: '64px'}}
                    expandIcon={<ExpandMoreIcon style={{margin: '0 1rem'}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Controller
                            name="file"
                            control={control}
                            render={({ field }) => {
                                return (
                                <FormControl style={{width: '100%'}}>
                                    <InputLabel shrink={true} htmlFor="component-outlined">Name</InputLabel>
                                    <Typography zIndex={0} variant="subtitle1" style={{color: (field.value) ? 'initial' : 'rgba(0, 0, 0, 0.6)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', paddingLeft: '14px'}}>
                                    {field.value ? field.value.name : 'No file selected...'}
                                    </Typography>
                                    <OutlinedInput
                                    onChange={(e: any) => {
                                        field.onChange({target: {value: e.target.files[0]}})
                                        if (!expanded) handleSubmit(onSubmit)()
                                    }}
                                    onClick={(e) => {e.stopPropagation()}}
                                    label="Name"
                                    notched={true}
                                    size="small"
                                    inputProps={{type: "file", accept:".fit", style:{opacity: 0}}}
                                    />
                                </FormControl>
                            )}}
                        />
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'flex', justifyContent: 'space-between', paddingRight: '72px'}}>
                        <div>
                            <Controller
                                name="step"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => {field.onChange(parseInt(e.target.value))}}
                                        label="Step"
                                        type="number"
                                        size="small"
                                    />
                                )}
                            />
                            <Controller
                                name="window"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => {field.onChange(parseInt(e.target.value))}}
                                        label="Window"
                                        type="number"
                                        size="small"
                                        style={{marginLeft: '0.5rem'}}
                                    />
                                )}
                            />
                        </div>
                        <Button type="submit" variant="contained" disableElevation>Submit data</Button>
                        
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    )
}

export default InputFileForm