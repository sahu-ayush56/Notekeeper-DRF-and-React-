import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
const NotePage = () => {
  let [note, setNote] = useState([])
  let navigate = useNavigate()
  const noteid = useParams().id;

  useEffect(()=>{
    getNote();
  },[])
  
  let getNote=async()=>{
    if(noteid === "new"){return;}
    let response = await fetch(`/api/notes/${noteid}/`)
    let data = await response.json()
    setNote(data)
  } 

  let deleteNote=async()=>{
    fetch(`/api/notes/${noteid}/`,{
      method:'DELETE',
      header:{
        'Content-Type':'application/json'
      }
    })
    setTimeout(()=>navigate('/'),100)
  }

  let updateNote=async()=>{
    fetch(`/api/notes/${noteid}/`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }
  let createNote=async()=>{
    fetch(`/api/notes/`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
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
    setTimeout(()=>navigate('/'),100)
  }

  return (
    <div className = "note">
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
