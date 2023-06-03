import Link from "next/link";
import { Nav, Dropdown } from "rsuite";

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
  },
];

export default function Navigation() {
  return (
    <Nav appearance="subtle" activeKey={window.location.pathname}>
      {links.map(({ label, route }) => (
        <Nav.Item key={route} eventKey={route} className="nav-item">
          <Link href={route} color="inherit"  >
          <p style={{ color: "whitesmoke" }}>{label}</p>
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
