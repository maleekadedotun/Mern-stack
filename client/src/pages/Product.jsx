import React from 'react';

import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
// import {publicRequest} from "../requestMethod"
import { useState, useEffect } from "react";
import axios from "axios"
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
   const dispatch = useDispatch();

  const handleQuantity = (type)=>{
    if(type === "dec"){
      quantity>1 && setQuantity(quantity-1)
    }
    else{
      setQuantity(quantity+1)
    }
  };

  const handleClick = () =>{
    console.log("working");
    dispatch(
      addProduct({...product, quantity, color, size})
    );
  }

//   const handleClick = () => {
//     console.log("working");
//     dispatch(addProduct({ product, quantity }));
// };



  useEffect(() =>{
   const getProduct = async () =>{
      try{
        const res = await axios.get("http://localhost:5000/api/products/find/" + id)
        // console.log(res)
        setProduct(res.data)
      }
      catch{
        
      }
    }
   getProduct();
  },[id])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
          {product.desc}
          </Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={product[1].color} /> // pass the product[0].color value
            </Filter> */}

            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color !== undefined &&
              <FilterColor color={product.color} key={product.color} />}
              {/* <FilterColor color="black" />
              <FilterColor color="green" />
              <FilterColor color="yellow" /> */}
              {/* {product.color.map((c) => ( 
              <FilterColor color={c} key={c} />
              ))} */}
              
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
              {/* {product.size.map((s) => ( 
                 <FilterSizeOption key={s}>{s}</FilterSizeOption>
              ))} */}

                 {/* <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption> */}

                <FilterSizeOption>{product.size}</FilterSizeOption>
              </FilterSize> 
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() =>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() =>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

// "https://i.ibb.co/S6qMxwr/jean.jpg"


