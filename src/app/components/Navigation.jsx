import Link from "next/link";

const links = [
    {
      label: "Home",
      route: "/"
    },
    {
      label: "About",
      route: "/About"
    },
    {
      label: "Posts",
      route: "/Posts"
    }
  ];

  export default function Navigation(){
    return (
    
      <>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
   </>
   
 
    );
  }