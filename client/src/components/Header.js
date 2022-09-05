import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className = "header" >
      Notes
      {user?<i class="fa fa-sign-out" aria-hidden="true" onClick={logoutUser}></i>:null}
    </div>
  );
};
export default Header;
