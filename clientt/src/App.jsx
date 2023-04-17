import React, { useState } from "react";
import { useEffect } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem" ;
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [task , setTasks] = useState(null)
  

  const getData = async () => {
     
      try {
       const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
       const json = await response.json()
       setTasks(json)
      }
      catch(err){
        console.error(err)
      }
  }

  useEffect(()=> {
    if(authToken) {
      getData()
    }
  } ,[])

  console.log(task)

  // sort by date 
  const sortedTasks = task?.sort((a,b) => new Date(a.date) - new Date(b.date))
  

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && <>
            <ListHeader listName={'🥥🌴Holiday tick list'} getData={getData}/>
            <p className="useremail">Welcome back { userEmail} </p>
            {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>)} </> }
   
    
    </div>
  )
};

export default App
