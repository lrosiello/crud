import Link from "next/link";
import { Nav } from "rsuite";


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
  
      </Nav>

    </>
  );
}
