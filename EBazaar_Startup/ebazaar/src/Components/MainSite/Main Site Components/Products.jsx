import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { Link } from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore'
import { where } from 'firebase/firestore'
import './Products.scss'
const Products = ({user}) => {
  const [maxPrice,setMaxPrice]=useState(1000)
  
  const [products,setProducts]=useState(null)

  const handleSearch = async (searchTerm) => {
    const q = query(collection(db, 'product'),
      orderBy('likedBy'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    setProducts(products);
  };

  const getProducts = () => {
    const q = query(collection(db, 'product'), orderBy('likedBy'));
    onSnapshot(q, (docSnap) => {
      var pro = [];
      docSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        pro.push({ id: doc.id, ...doc.data() });
      });
      setProducts(pro);
    });
  };

  useEffect(()=>{
    getProducts();
  },[])

  const priceChange=(e)=>{
    setMaxPrice(e.target.value)
  }
  return (
    <div className='products-page'>
      <div className='div-1'>
        <div className='category'>
          <h1>Filter products</h1>
          {/* <div style={{marginTop:'20px'}}>
            <p>Price Max: {maxPrice}rs</p>
            <input type="range" min={0} max={1000} style={{width:'80%'}} value={maxPrice} onChange={priceChange}/>
          </div> */}
          <div style={{marginTop:'20px'}}>
            <p>Search Products</p>
            <input type="search" className='search-p'/>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className='div-2' style={{margin:'50px'}}>
        {products ? (
          <>
          {products.map((item,index)=>{
          return(
            <>
        <div className='product-card'>
              <div className='card'>
                <div className='card-div-1' style={{backgroundImage:`url(${item?.productURL})`}}>

                </div>
                <div className='card-div-2'>
                <div style={{margin:'10px 10px'}}>
                <p className='price'>Rs.{item?.price}</p>
                  <p className='title'>{item?.name}</p>
      
                  <div className='cart-view'>
                    <Link to={`/view-item/${item?.id}`}>
                    <button>View Item</button>
                    </Link>
                    <p  id={item?.id} name={item?.farm}>add to cart</p>
                  </div>
                  <p style={{textAlign:'center',marginTop:'10px',fontSize:'10px'}}>produced by </p>
                </div>
                </div>
              </div>
            </div>
            </>
          )
        })}</>
        ):(<><div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}><h1 className='loading-text'>Loading Products from our farms..</h1></div></>)}
      </div>
    </div>
  )
}

export default Products