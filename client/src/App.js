import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from './gqlOperations/queries';

function App() {
  const {loading,error,data} = useQuery(GET_ALL_QUOTES)
  if(loading) return <h1>Loading...</h1>
  if(error) return console.log(error)
  return (
    <><Login/>
    <div className="container">
    {data.quotes.map((q,i)=><ul key={i} className="collection"><li className="collection-item" key={i}>{q.name}</li></ul>)}
    </div>
    </>
  );
}

export default App;
