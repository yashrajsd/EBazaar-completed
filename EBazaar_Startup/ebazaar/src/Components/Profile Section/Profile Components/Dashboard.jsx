import React from 'react'
import './Dashboard.scss'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import { uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../../Context/user.context';
import { onSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
const productForm={
  name:'',
  price:null,
  unit:'',
  description:'',
  productURL:'',
  category:'',
  stock:null,
  discountPrice:null
}


const Dashboard = ({user}) => {
    const [products,setProducts]=useState(null)
    const [form,setForm]=useState(productForm)
    const {name,price,unit,description,productURL,category,stock,discountPrice}= form
    const [file,setFile]=useState(null)
    const {currentUser}=useContext(UserContext)
    const [orderItem,setOrderItem]=useState([])
    const [pending,setPending]=useState([])
    const [completed,setCompleted] = useState([])
    const [farm,setFarm]=useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleRowClick = (order) => {
      setSelectedOrder(order);
    };

    

    const getFarm =async()=>{
      const docRef = doc(db,'farm',user.uid)
      const docSnap = await getDoc(docRef);
      setFarm(docSnap.data())
      console.log(farm)
    }

      


    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }

    const getItemData = () => {
      const q = query(collection(db, 'orders'), where('farm', '==', user.uid));
      onSnapshot(q, (docSnap) => {
        var pro = [];
        var p = [];
        var c = [];
        docSnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          pro.push({ id: doc.id, ...doc.data() });
        });
        setOrderItem(pro);
        pro.forEach((doc) => {
          if (doc.completed) {
            c.push(doc);
          } else {
            p.push(doc);
          }
        });
        setPending(p);
        setCompleted(c);
      });
    };

    useEffect(()=>{
      console.log("error")
      getItemData();
      getFarm()
    },[user])

    const getProduct = () => {
      const q = query(collection(db, 'product'), where('farm', '==', user.uid));
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
      console.log("error")
      getProduct()
    },[user])

    const uploadProduct=async(e)=>{
      e.preventDefault();
      const docRef = collection(db,'product')
      await addDoc(docRef,{
        name:name,
        price:parseInt(price),
        unit:unit,
        description:description,
        productURL:productURL,
        farm:currentUser.uid,
        category:category,
        stock:stock,
        discountPrice:discountPrice,
        likedBy:0
      })
      setForm(productForm)
    }

    useEffect(
      ()=>{
        console.log("error")
        console.log('problem 7')
        const uploadFile =()=>{
          const storageRef = ref(storage,file.name)
          const uploadTask = uploadBytesResumable(storageRef,file);
  
          uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log('upload is '+progress+'% done')
            switch(snapshot.state){
              case 'paused':
                console.log('Upload is paused')
                break;
              case 'running':
                console.log('Upload is running');
                break;
                default:break;
            }
          },(error)=>{
            console.log(error)
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              setForm((prev)=>({...prev,productURL:downloadUrl}))
            })
          })
          toast.success('Successfully Uploaded Image')
        }
        file && uploadFile();
      },[file]
    )

  return (
    <div className='dashboard'>
        <div className='records'>
            <div className='record'>
                <div className='div-1'><AccessTimeIcon className='record-icon'/><p>Pending orders</p></div>
                <div className='record-num'><h1>{pending.length}</h1></div>
            </div>
            <div className='record'>
            <div className='div-1'><BeenhereIcon className='record-icon'/><p>Orders Completed</p></div>
                <div className='record-num'><h1>{completed.length}</h1></div>
            </div>
            <div className='record'>
            <div className='div-1'><CurrencyRupeeIcon className='record-icon'/><p>Total earnings</p></div>
                <div className='record-num'><h1>{farm?.earning ?(farm?.earning):(0)}.rs</h1></div>
            </div>
        </div>



        <div className='add-product'>
            <div className='div-1'>
              <form action="submit" onSubmit={uploadProduct}>
              <h1><Inventory2Icon className='icon'/> Add Products to your farm</h1>
              <div className='product-field'>
                <label htmlFor="">Product name</label>
                <input type="text" placeholder='onions' name='name' onChange={handleChange} value={name} required/>
              </div>
              <div >
                <div style={{display:'flex'}}>
                <div className='product-field'>
                <label htmlFor="">Product Price (rs)</label>
                <input type="number" placeholder='50' style={{width:'100%'}} name='price' onChange={handleChange} required  value={price}/>
                </div>
                <div className='product-field'>
                <label htmlFor="">Unit for sale</label>
                <input type="text" placeholder='kg/gram/etc' style={{width:'100%'}} name='unit' value={unit} onChange={handleChange} required/>
                </div>
                </div>
                <div className='product-field'>
                <label htmlFor="">Current Stock</label>
                <input type="text" placeholder='' name='stock' onChange={handleChange} value={stock} required/>
              </div>
              <div className='product-field'>
                <label htmlFor="">Discount Price</label>
                <input type="number" placeholder='' name='discountPrice' onChange={handleChange} value={discountPrice} required/>
              </div>
                <div className='product-field'>
                <label htmlFor="">Describe about it</label>
                <textarea name="description" id="" cols="30" rows="10" value={description} onChange={handleChange} required></textarea>
                </div>
                <div className='product-field'>
                <label htmlFor="">Category</label>
                <select name='category'  onChange={handleChange}>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy Products</option>
                </select>
                </div>
                <div className='product-field'>
                    <label htmlFor="">Upload picture</label>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} required/>
                </div>
              </div>
              <div className='product-submit-btn'>
              <button type='submit'>Upload Product</button>
              </div>
              </form>
              
            </div>
            <div className='div-2'>
                <h1>Listed products</h1>
                <hr />
                <div style={{width:'100%',height:'18rem',overflowY:'scroll'}}>
                {products ? 
                (
                <div className='listed-product'>
                {products.map((item)=>{
                  
                  return(
                  <div className='p-prev'>
                  <div className='div-11'>
                    <img src={item.productURL} alt="" />
                  </div>
                  <div className='div-22'>
                    <p>{item.name}</p>
                    <p>{item.price}rs/{item.unit}</p>
                  </div>
                </div>
                  )
                })}
                </div>
                ):
                (
                <>
                    <h1>you haven't uploaded any products yet</h1>
                </>
                )
                }
                </div>
            </div>
        </div>
        <table>
  <thead>
    <tr>
      <th>Order Item</th>
      <th>Customer Name</th>
      <th>Quantity</th>
      <th>Order Total</th>
      {/* <th>Address</th> */}
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {pending.map((order) => 
    
    {
      const handleReq=async()=>{
        console.log(order)
        const docRef = doc(db,"orders",order.id)
        await updateDoc(docRef,{
          reqConfirm:true
        })
        
      }
      return(
        <tr key={order.id}>
        <td>{order.name}</td>
        <td>{order.userName}</td>
        <td>{order.quantity}{order.unit}</td>
        <td>{order.price}</td>
        {/* <td>{order.address}</td> */}
        <td><button onClick={() => handleRowClick(order)}>more details</button></td>
        <td>{order.reqConfirm ? (<p>Already requested to confirm order!</p>):(<button onClick={handleReq} className='req-btn'>Order Delivered</button>)}</td>
      </tr>
      )   
})}
  </tbody>
</table>
{selectedOrder && (
  <div className="popup">
    <div className="popup-content">
      <span className="close-btn" onClick={() => setSelectedOrder(null)}>
        &times;
      </span>
      <h2>{selectedOrder.name}'s Order</h2>
      <p>Price: {selectedOrder.price}rs</p>
      <p>Customer Name: {selectedOrder.userName}</p>
      <p>Address: {selectedOrder.address}</p>
      <p>State: {selectedOrder.state}</p>
      <p>Email: {selectedOrder.email}</p>
      
    </div>
  </div>
)}
    </div>
  )
}

export default Dashboard