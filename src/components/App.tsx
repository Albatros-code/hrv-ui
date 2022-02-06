import '../styles/App.css';
import Chart from './Chart';
import InputFileForm from './InputFileForm'
import LoadingWrapper from './LoadingWrapper';

function App() {

  return (
    <div className="main">
      <div className="container">
          <LoadingWrapper>
            <div className="nav">
              <InputFileForm/>
            </div> 
            <div className="chart-container">
              {/* {(loading || true) && <div className="chart-container-loading"><CircularProgress /></div>} */}
                <Chart/>
            </div>
          </LoadingWrapper>
      </div>
    </div>
  );
}

export default App;
