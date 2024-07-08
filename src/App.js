import { useEffect, useState } from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import { API_DELAY_TIME, FAKE_API_URL } from './constants';


function App() {
  const [name,setName] = useState();

  const [user, setUser] = useState();
  // Get the first user.

  const [isLoading, setLoading] = useState(true);

  // [] => initial render (only once for app initialization).
  // [name] => when name changes.
  // []  => component rerender.



  useEffect(()=> {
    const waiter = () => new Promise((resolve,reject) => {
      setTimeout(()=> resolve("Delayed for 3 secs"), API_DELAY_TIME);
    })

    async function fetchUserData() {
      const data = await fetch(FAKE_API_URL);
      const users = await data.json(); // contains 10 users.
      // Adding a delay to make loader visible.
      await waiter();
     
      setUser({...users[0],age: 22}); // taking the first user, since age is property is not present => assigned age property.
      setName(users[0].name);
      setLoading(false);
    }

    
    fetchUserData();

   
  },[]);


  // Main thread. (synhronous) []
  // Event loop
  // Callback Queue : [(()=> resolve("Delayed for 3 secs"),3000)] FIFO

  

  useEffect(() => {
    if(name){
      console.log(`Name updated to: ${name}`);
    }
    return () => {
      // this is the way to do cleanup.
      // Here in our case, we are not using any asynchronous actions like 
      // using setTimeout, setInterval or any resource allocation. 
      // Since we have only asynchronous code (console.log), which will execute and logs on the spot. 
    }
  },[name]); // [name] => dependency array.



  if(isLoading){
    return (
      <img src='1495.gif' alt="Loading..."></img>
    )
  }

  return (
    <div className="App">
      <UserProfile name={name} setName={(name) => setName(name)} age={user?.age}/>
    </div>
  );
}

export default App;