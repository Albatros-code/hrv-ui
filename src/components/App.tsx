import React from 'react';
import axios from 'axios'
import '../styles/App.css';
import Chart from './Chart';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const HiddenInput = styled('input')({
  display: 'none',
});

function App() {

  const [ selectedFile, setSelectedFile ] = React.useState<any>({name: 'No file selected...'})
  const [ params, setParams ] = React.useState({step: 120, window: 120})
  const [ data, setData ] = React.useState<any>(null)
  const [ loading, setLoading ] = React.useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    const param = e.target.id.replace('input-', '')
    setParams(prev => ({...prev, [param]: value}))
  }

  const handleSend = (selectedFile) => {
    const formData = new FormData()
    formData.append("file", selectedFile || 'no file');
    formData.append("field", JSON.stringify(params));
    setLoading(true)
    setSelectedFile(selectedFile)
    const url = '/calculate-hrv' || 'http://localhost:5000/calculate-hrv'
    axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      console.log(res)
      // const parsedData = res.data.timestamp.map((time, i) => {
      //   return {
      //     time: time/60,
      //     alfa1: res.data.heart_rate[i] * 2,
      //     hr: res.data.heart_rate[i],
      //   }
      // })
      setData(res.data.results)
    })
    .catch(err => {console.log(err)})
    .finally(() => {setLoading(false)})
  }

  function handleImport(e: any){
    // setSelectedFile(e.target.files[0])
    handleSend(e.target.files[0])
    e.target.blur()
  }

  return (
    <div className="main">
      <div className="container">
        <div className="nav">
          {/* <label htmlFor="contained-button-file">
            <HiddenInput accept=".fit" id="contained-button-file" type="file"  onChange={handleImport}/>
            <Button disableElevation style={{height: '100%'}} variant="contained" component="span">Add .fit file</Button>
          </label> */}

          {/* <TextField  placeholder="Search Google Maps" inputProps={{type: 'file', style: {opacity: 0}}} className="file-name-display" margin="none" style={{flexGrow: 1}} size="small" label="Selected file"/> */}
          {/* <input type="file" onChange={handleImport} /> */}
          {/* <TextField className="file-name-display" margin="none" disabled={true} style={{flexGrow: 1}} size="small" label="Selected file" value={selectedFile?.name} /> */}
          {/* <Typography>{selectedFile?.name}</Typography> */}
          {/* <Button disabled={!selectedFile} disableElevation variant="contained" onClick={handleClick}>Send file</Button> */}
          <FormControl style={{width: '100%'}}>
            <InputLabel shrink={true} htmlFor="component-outlined">Name</InputLabel>
            <Typography zIndex={0} variant="subtitle1" style={{color: (loading || !selectedFile) ? 'rgba(0, 0, 0, 0.6)' : 'initial', position: 'absolute', top: '50%', transform: 'translateY(-50%)', paddingLeft: '14px'}}>
              {selectedFile ? selectedFile.name : 'No file selected...'}
            </Typography>
            <OutlinedInput
              id="input-file"
              onChange={handleImport}
              label="Name"
              notched={true}
              size="small"
              disabled={loading}
              inputProps={{type: "file", style:{opacity: 0}}}
            />
          </FormControl>
          <TextField
            id="input-step"
            label="Step"
            type="number"
            value={params.step}
            onChange={handleChange}
            size="small"
            style={{marginLeft: '0.5rem'}}
          />
          <TextField
            id="input-window"
            label="Window"
            type="number"
            value={params.window}
            onChange={handleChange}
            size="small"
            style={{marginLeft: '0.5rem'}}
          />
        </div>
        <div className="chart-container">
          {loading && <div className="chart-container-loading"><CircularProgress /></div>}
          <Chart data={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;
