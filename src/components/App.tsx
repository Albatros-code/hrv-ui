import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import '../styles/App.css';
import Chart from './Chart';

function App() {

  const [ selectedFile, setSelectedFile ] = React.useState(null)
  const [ data, setData ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(false)

  function handleImport(e: any){
    console.log('selected!')
    setSelectedFile(e.target.files[0])
  }

  const handleClick = (e) => {
    const formData = new FormData()
    formData.append('fileID', '123456');
    formData.append("file", selectedFile || 'no file');
    setLoading(true)
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

  return (
    <div className="main">
      <input type="file" onChange={handleImport} />
      <button onClick={handleClick}>Send file</button>
      <div style={{height: '300px', width: '500px', background: 'white', position: "relative"}}>
        {loading && <div style={{position: "absolute", height: '100%', width: '100%', background: 'rgba(0,0,0,0.2', zIndex: 100, textAlign: "center", fontSize: '2rem'}}>LOADING</div>}
        <Chart data={data}/>
      </div>
    </div>
  );
}

export default App;
