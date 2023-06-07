import Link from "next/link";
import { Nav } from "rsuite";
import NewForm from "../components/NewForm";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";

const links = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Login",
    route: "/Login"
  },
  {
    label: "Categories",
    route: "/Categories"
  },
  {
    label: "Layers",
    route: "/Layers"
  }
];

export default function Navigation() {
  const [showForm, setShowForm] = useState(false);
  
  const handleNewItemClick = () => {
    setShowForm(true);
  };

 

  return (
    <>
      <Nav appearance="subtle" activeKey={window.location.pathname} marginBottom={5} style={{display:"flex"}}>
        {links.map(({ label, route }) => (
          <Nav.Item key={route} eventKey={route} className="nav-item">
            <Link href={route} color="inherit">
              <h6 style={{ color: "whitesmoke" }}>{label}</h6>
            </Link>
          </Nav.Item>
        ))}
        <Nav.Item className="nav-item"  style={{textJustify:"flex-end"}}>
          <IconButton onClick={handleNewItemClick}>
          <AddIcon style={{ color: "whitesmoke", fontSize: 40 }} />
          </IconButton>
        </Nav.Item>
      </Nav>
      {showForm && <NewForm handleCancel={() => setShowForm(false)} />}
    </>
  );
}
