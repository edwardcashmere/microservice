import React,{useState,useEffect} from 'react'
import Wrapper from './Wrapper';
import {Product} from "../interfaces/product"
import {Link} from 'react-router-dom';


const Products = () => {
const [products,setProducts] = useState([]);
const del =async (id: number)=>{
  await fetch(`http://localhost:8000/api/products/${id}`,{
    method: 'DELETE'
  })
  setProducts(products.filter((p: Product) => p.id !== id))
}
useEffect(  ()=>{
  (
    async ()=>{
     const response = await fetch("http://localhost:8000/api/products");
     const data = await response.json();
     setProducts(data)
    }
  )();

},  [])
    return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-2 border-bottom">
        <div className="btn-toolbar mb-2 mb md-0">
          <Link to={'/admin/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>
      </div>
      <h2>Section title</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {
                  products.map((p: Product) =>{
                        return (
                         <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><img src={p.image} height='180' alt=''/></td>
                            <td>{p.title}</td>
                            <td>{p.likes}</td>
                            <td>
                              <div className="btn-group mr-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary mr-2" data-toggle="modal" data-target="#exampleModalCenter">delete</button>
                                <Link to={`/admin/products/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                <div className="modal fade" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                  <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        Are you sure you want to delete this product?
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                        <button type="button" onClick={()=>del(p.id)}className="btn btn-primary" data-dismiss="modal">Yes</button>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              </div>
                            </td>
                          </tr>
              
                        )
                  })
              }
            
          </tbody>
        </table>

        
      </div>
        
            
    </Wrapper>
    )
}

export default Products
