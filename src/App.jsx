import { useState } from 'react'
import './App.css'
import { getSummary } from './services/openaiService';
import FileUpload from './components/FIleUpload';
import Loader from './components/Loader';
import SummaryResult from './components/SummaryResult';

function App() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtract = async (text) =>{
    setLoading(true);
    setSummary('');
    try{
      const summarized = await getSummary(text.slice(0,3000));
      setSummary(summarized);
    } catch(error){
      console.error(error);
    }
    setLoading(false);
  };
  return(
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>AI Document</h1>
      <FileUpload onExtract={handleExtract} />
      {loading && <Loader />}
      {summary && <SummaryResult summary={summary}/>}
    </div>
  )
}

export default App
