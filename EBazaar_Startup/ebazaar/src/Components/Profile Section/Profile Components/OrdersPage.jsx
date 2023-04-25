import { async } from '@firebase/util';
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';

import './OrdersPage.scss'
const OrdersPage = ({user}) => {
    const [orders,setOrders]=useState([]);

    const getOrders = () => {
        const q = query(collection(db, 'orders'), where('userCart', '==', user.uid));
        onSnapshot(q, (docSnap) => {
          var pro = [];
          docSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            pro.push({ id: doc.id, ...doc.data() });
          });
          setOrders(pro);
        });
      };

    useEffect(()=>{
        getOrders();
        console.log("error")
    },[])

  return (
    <div className='OrdersPage'>
        {!(orders.length===0) ? (
            <table>
            <thead>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
            </thead>
            <tbody>
                {orders.map((order)=>{
                    const handleReq=async()=>{
                        const docRef = doc(db,"orders",order?.id);
                        await updateDoc(docRef,{
                            completed:true,
                        })
                    }

                    return(
                        <tr>
                            <td><img src={order?.productURL} alt="" style={{width:'8rem',height:'4rem',borderRadius:'5px'}}/></td>
                            <td>{order?.name}</td>
                            <td>{order?.price}</td>
                            <td>{order?.quantity}</td>
                            <td>{order?.completed ? (<h1 className='order-recieved'>Order Recieved</h1>):(<>{order?.reqConfirm ? (<button className='recieved-btn' onClick={handleReq}>Confirm Recieved</button>):(<h1>Order Pending</h1>)}</>)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        ):(<h1>You haven't ordered anything</h1>)}
    </div>
  )
}

export default OrdersPage