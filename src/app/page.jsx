"use client";
import { useEffect, useState } from "react"

export default function Home() {

  const [categories, setCategories] = useState([]);

  async function getCategories(){

    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, postData);
    const response = await res.json();
    setCategories(response.categories);
    console.log(response);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {categories.map((category, index) => (
        <div key={category.id}>
          <p>{category.nombre_categoria}</p>
          <p>{category.descripcion}</p>
          <p>{category.numero_orden}</p>
        </div>
      ))}
      <p>nueva app</p>
    </div>
  )
}
