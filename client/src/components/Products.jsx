import React from 'react';


import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect} from "react";
import axios from "axios";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  // console.log(cat, filters, sort, " working");
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() =>{
    const getProducts = async () => {
      try{
        const res = await axios.get
        (
          "http://localhost:5000/api/products"
        );
        setProducts(res.data)
        // console.log(res.data, "Working1");
      }
      catch (err){}
    }
   getProducts()
  },[cat]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/products?catgory=coat")
  //     .then(response => 
  //       console.log(response.data, "Working"))
  //     .catch(error => console.error(error));
  // }, [cat]);
  

  useEffect(() =>{
    cat && setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )    
    );
  },[products,cat,filters,])
  // console.log(filteredProducts);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
      )
    }
    else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
      )
    }
    else {
      setFilteredProducts((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  },[sort])
  
  return (
    <Container>
      {cat ? filteredProducts.map((item) => 
        <Product item={item} key={item.id} />)
        : products.slice(0, 8).map((item) => 
        <Product item={item} key={item.id} />)
      }
    </Container>
   
  );
};

export default Products;


// cat 
// ? `http://localhost:5000/api/products?category=${cat}`
// :  "http://localhost:5000/api/products"