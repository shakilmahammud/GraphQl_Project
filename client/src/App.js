import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { NetworkStatus, useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from './gqlOperations/queries';
import SignUp from './components/SignUp';

function App() {
  // const {loading,error,data,refetch,networkStatus} = useQuery(GET_ALL_QUOTES,{
  //   pollInterval:0,
  //   notifyOnNetworkStatusChange: true,
  //   fetchPolicy: 'network-only',
  //   nextFetchPolicy: 'cache-first',
  // })
  const [quotes,{ loading, error, data }] = useLazyQuery(GET_ALL_QUOTES);
  
  // if(networkStatus===NetworkStatus.refetch)return <h1>Refetching...</h1>
  if(loading) return <h1>Loading...</h1>
  if(error) return console.log(error)
  return (
    <>
        <button onClick={()=>quotes()} className="btn #673ab7 deep-purple">refetch</button>
    <Login/>
    <div className="container">
    {data?.quotes.map((q,i)=><ul key={i} className="collection"><li className="collection-item" key={i}>{q.name}</li></ul>)}
    </div>
    <SignUp/>
    </>
  );
}

export default App;
