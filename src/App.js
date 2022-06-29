import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import MainHome from './components/MainHome';
import { getData, updateData } from './redux/actions/bitcoinAction';

function App() {
  const [func,setFunc] = useState('1min')
  const dispatch = useDispatch()
  const getDatas = () =>{
    return (dispatch)=>{
      dispatch(getData());
      fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${func}/BTCUSD?apikey=587ecff454abab4689659623bb3e9d22`)
      .then(res=>res.json())
      .then(res => dispatch(updateData(res)))
    }
  }
  useEffect(()=>{
    dispatch(getDatas())
  },[func])
  return (
    <div className="App">
      <MainHome func={setFunc}/>
    </div>
  );
}

export default App;
