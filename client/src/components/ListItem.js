const ListItem = ({ note }) => {
  let getTime=()=>{
    return new Date(note.updated).toLocaleDateString();
  }
  let bodyarr = note.body.split('\n');
  return (
    <div>
      <p className="item">{bodyarr[0].slice(0,50)}
        <br/><div className = "sub">{getTime()} {(bodyarr.length>1)?' - '+note.body.slice(bodyarr[0].length,50):""}</div>
      </p>
    </div>
  );
};
export default ListItem;
