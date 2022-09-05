import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from 'react'
import AuthContext from "../utils/AuthContext";
const NotePage = () => {
  let [note, setNote] = useState([])
  let {authToken, logoutUser} = useContext(AuthContext)
  let navigate = useNavigate()
  const noteid = useParams().id;

  useEffect(()=>{
    getNote();
  },[])
  
  let error_check=(response)=>{
    if(response.status!==200){
      logoutUser()
    }
  }

  let getNote=async()=>{
    if(noteid === "new"){return;}
    let response = await fetch(`/api/notes/${noteid}/`,{
      method:'GET',
      headers : {
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authToken?.access)
      },
    })
    let data = await response.json()
    error_check(response)
    setNote(data)
  } 

  let deleteNote=async()=>{
    let response = await fetch(`/api/notes/${noteid}/`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authToken?.access)
      },
    })
    error_check(response)
    setTimeout(()=>navigate('/notes'),100)
  }

  let updateNote=async()=>{
    let response = await fetch(`/api/notes/${noteid}/`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+String(authToken?.access)
      },
      body: JSON.stringify(note)
    })
    // console.log(response.status)
    error_check(response)
  }
  let createNote=async()=>{
    let response = await fetch(`/api/notes/`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+String(authToken?.access)
      },
      body: JSON.stringify(note)
    })
    // console.log(response.status)
    error_check(response)
  }
  let handleSubmit=async()=>{
    if(noteid!=="new"&&!note.body){
      deleteNote()
    }
    else if(noteid!=="new"){
      updateNote()
    }
    else if(note.body){
      createNote()
    }
    setTimeout(()=>navigate('/notes'),100)
  }

  return (
    <div className = "note">
      {/* {console.log(authToken)} */}
      <textarea
        value={note?.body}
        className="form-control"
        id="exampleFormControlTextarea1"
        onChange = {(e)=>{setNote({...note,'body':e.target.value})}}
      ></textarea>
        {(noteid==="new")?<p className="item add" onClick={handleSubmit}>Done</p>:<p className="item delete" onClick={deleteNote}>Delete</p>}
        <p className="item" onClick={handleSubmit}>Back</p>
    </div>
  );
};
export default NotePage;
