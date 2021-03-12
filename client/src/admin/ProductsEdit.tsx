import React,{SyntheticEvent, useState,useEffect, PropsWithRef} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from "react-router-dom";
import {Product} from "../interfaces/product";

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [title,setTitle] = useState("");
    const [image, setImage] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{
        (async ()=>{
          const res =  await fetch(`http://localhost:8000/api/products/${props.match.params.id}`)
          const product: Product = await res.json();
          setTitle(product.title);
          setImage(product.image);
        })()
          //eslint-disable-next-line
    },[])

    const onSubmit =async(e: SyntheticEvent) =>{
        e.preventDefault();
        await fetch(`http://localhost:8000/api/products/${props.match.params.id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title,image})
        });
        setRedirect(true);
    }
    if(redirect){
       return <Redirect to={"/admin/products"} />
    }
    return (
        <Wrapper>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" name="title"  value={title} onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Image</label>
                    <input type="text" className="form-control" name="image"  value={image} onChange={(e)=> setImage(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
            
        </Wrapper>
    )
}

export default ProductsEdit
