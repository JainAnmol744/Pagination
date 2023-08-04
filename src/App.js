import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Pagination from './Pagination';

function App() {

  const [data, setdata] = useState([]);

  const [currentItems, setcurrentItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?`);
        const newData = response.data;
        setdata(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetch();
  }, []);

 
  return (
    <div className="App">
      {
        currentItems.length>0  && currentItems.map((item, key)=>{
          return(
            <li key={key}>{item.title}</li>
          )
        })
      }
      <Pagination data={data} setcurrentItems={setcurrentItems} />
    </div>
  );
}

export default App;
