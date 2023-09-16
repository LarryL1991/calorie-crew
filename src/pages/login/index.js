{/*Event listener code I'm using originated from answer on https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null */}

import { Stack, TextField, Form, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Login() {
    

  {/* Variable Initialization */}
  const router = new useRouter;

  {/* UseState Variables */}
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [data, setData] = useState('');

  {/* Function to retrieve data needed on page load (just DB info at the moment)  */}
  async function fetchData() {
    const response = await fetch("/api/login")
    setData(await response.json());
  }

  {/* Calls fetchData function on page load, as well as a line of code to prevent submit from refreshing the page */}
  useEffect(() => { 
    fetchData();
    document.getElementById("login").addEventListener('submit', (event) => {event.preventDefault()})
  }, [])

  {/*Handles click -- in this case, checking user and password against database to see if able to login or not */}
  function handleClick() {
    console.log("Wow you clicked it! Good job!")
    console.log(data)
    console.log(user + ' ' + pass)
    {/*The 2 lines below search the database as an array, looking for a username, then password that match what the user has input and returning a true/false answer. I'm sure there's a better way to query but we're doing it caveman style for now baybeeee */}
    console.log(!!data.currentusers.find(({username}) => username.toLowerCase() === user.toLowerCase())) 
    console.log(!!data.currentusers.find(({password}) => password.toLowerCase() === pass.toLowerCase())) 
    console.log(data.currentusers.find(({username}) => username.toLowerCase() === user.toLowerCase())._id)
    router.push(`/home/${data.currentusers.find(({username}) => username.toLowerCase() === user.toLowerCase())._id}`)
  }

  

  return (
    <>
        <form className="login-form" id="login">
            <Stack>
                <TextField label="Username" id="username" type='text' className='login-field' value={user} onChange={(e) => setUser(e.target.value)}/>
                <TextField label="Password" id="password" type='password'className='login-field' value={pass} onChange={(e) => setPass(e.target.value)}/>
                <Button onClick={handleClick} sx="margin-bottom: 5vh" type='submit'>Submit</Button> {/*Why does this "sx" here error in the console? Seems like it's working fine...*/}

                <div className="register-help">
                    <p>Not a member?</p>
                    <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Register</Link> {/* <-- This will link to the register page later */}
                </div>
            </Stack>

        </form>
    </>
  )
}
