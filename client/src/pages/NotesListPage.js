import ListItem from "../components/ListItem"
import {Link} from "react-router-dom"
import {useState, useEffect, useContext} from "react"
import AuthContext from "../utils/AuthContext";

const NotesListPage = () => {
  let [notes,setNotes] = useState([])
  let {authToken, logoutUser} = useContext(AuthContext)
  useEffect(()=>{
    getNotes();
  },[])
  let getNotes = async()=>{
    let response = await fetch("/api/notes/",{
      method:'GET',
      headers : {
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authToken?.access)
      },
    }
    )
    let data = await response.json()
    setNotes(data)
  }
  return (
    <div>
      <div className="notes-list">
        {notes.map((note, index) => {
          return (
            <Link to = {`/note/${note.id}`} className="list" key = {index}>
              <ListItem note={note} />
            </Link>
          );
        })}
      </div>
      <Link to = "/note/new/" className = "list">
        <p className="item add">Add</p>
      </Link>
    </div>
  );
};
export default NotesListPage;
