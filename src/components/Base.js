import { getCurrentUserDetail, isLoggedIn } from "../auth";
import Footer from "../pages/Footer/Footer";
import AdminNavbar from "./AdminNavbar";
import CustomerNavbar from "./CustomerNavbar";
import CustomNavbar from "./CustomNavbar";
import OwnerNavbar from "./OwnerNavbar";

const Base = ({ title = "Welcome to our website", children }) => {

  const user = getCurrentUserDetail();
  return (
    <div className="container-fluid p-0 m-0">

      {
        ( isLoggedIn() ?(user.type==="Admin") ?<AdminNavbar />:(user.type==="Customer")? <CustomerNavbar />: <OwnerNavbar /> : <CustomNavbar />)
          
      }
      

      {children}

      <Footer />
    </div>
  );
};

export default Base;
