import React, { useEffect, useState } from 'react'
import './ViewProducts.scss'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { collection, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { doc } from 'firebase/firestore'
import { useContext } from 'react'
import { UserContext } from '../../../Context/user.context'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { async } from '@firebase/util'

const ViewProduct = ({user}) => {
  const {id} = useParams()
  const[num,setNum] = useState(1)
  const[item,setItem]=useState(null);
  const {currentUser,userDB}=useContext(UserContext)
  const [liked,setLiked]=useState(false);
  const [likes,setLikes]=useState([])
  const [farm,setFarm]=useState(null)
  const [member,setMember]=useState(null)
  const [isMember,setIsMember]=useState(false)
  const getFarmData=async()=>{
    const docRef = doc(db,'farm',item?.farm)
    const docSnap = await getDoc(docRef)
    setFarm({ id: docSnap.id, ...docSnap.data() })
  }


  const getMemberData = async () => {
    if (!farm) {
      return;
    }
    const membersRef = collection(db, 'farm', farm.id, 'members');
    const docSnap = await getDocs(membersRef);
    const data = [];
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    setMember(data);
  };

  useEffect(() => {
    getMemberData();
  }, [farm]);
  
  useEffect(() => {
    if (member && user) {
      setIsMember(member.findIndex(obj=>obj.userID===user.uid) !==-1)
    }
  }, [member, user]);

  useEffect(()=>{
    getUserData();
    console.log('rendering')
  },[id])

  useEffect(() => {
    getFarmData();
  }, [item]);

  useEffect(
    ()=>{
      setLiked(likes.findIndex((like)=> like.id===currentUser.uid ) !== -1)
    },[likes]
  )

  useEffect(()=>{
    onSnapshot(collection(db,'product',id,'likedBy'),(snapshot)=>{setLikes(snapshot.docs)})
  },[db,id])

  const getUserData = () => {
    const docRef = doc(db, 'product', id);
    onSnapshot(docRef, (doc) => {
      setItem(doc.data());
    });
  };
  
  const handleLike =async ()=>{
    await setDoc(doc(db,'product',id,'likedBy',currentUser.uid),{
      userID:currentUser.uid,
    })
    toast.success("Liking a product helps it to reach more users")
    const docRef=doc(db,'product',id)
    await updateDoc(docRef,{
        likedBy:likes.length,
    })
}

  // const handleLike=async()=>{
  //   const docRef=doc(db,'product',id)
  //   await updateDoc(docRef,{
  //       likedBy:item?.likedBy+1,
  //   })
  //   window.location.reload()
  // }

  const handleClick=async(e)=>{
    if(userDB?.address && userDB?.city && userDB?.zipcode && userDB?.state){
        if(item?.stock - num>=0){
          await setDoc(doc(db,'users',currentUser.uid,'cart',id),{
            quantity:num,
            price:item?.price,
            name:item?.name,
            userCart:currentUser.uid,
            userName:userDB?.name,
            farm:item?.farm,
            productURL:item?.productURL,
            unit:item?.unit,
            address:userDB?.address,
            state:userDB?.state,
            email:userDB?.email,
          })
          await updateDoc(doc(db,'product',id),{
            stock:(item?.stock-num),
          })
          toast.success(`Item Added to the Cart`)
        }else{
          toast.error('Out of stock!')
        }
    }
    else{
        toast.error("Please update your address in your profile to place orders")
    }
  }
  const handleDec=()=>{
    if(num-1>0){
        setNum(num-1);
    }
  }

  const handleInc=()=>{
    setNum(num+1)
  }

  useEffect(()=>{
    
  },[])
  return (
    <div className='view-cart-container'>
      <Link to={`/farm/${farm?.id}`}>
      <h1 className='farm-title' >{farm?.name}</h1>
      </Link>
        <div className='div-v-1'>
            <div className='div-1' style={{display:'flex',flexDirection:'column',gap:'30px'}}>
              
                    <img src={item?.productURL} alt="" style={{borderRadius:'12px',height:'300px',width:'500px'}}/>
                    <h1>Liked by {likes.length}</h1>
            </div>
            <div className="div-2">
                <h1>{item?.name} <span className={isMember && ('cut-price')}>{item?.price}rs/{item?.unit}</span></h1>
                {isMember && (<h1><span>Discounted Price: {item?.discountPrice}rs/{item?.unit}</span></h1>)}
                <div className='inc-dec-btn'>
                    <button onClick={handleDec}>-</button>
                    <div>
                    <p>{num}</p>
                    </div>
                    <button onClick={handleInc}>+</button>
                </div>
                <div className='main-btn'>
                    <button onClick={handleClick}>Add to cart</button>
                    <button>Buy Now</button>
                </div>
                <div style={{width:'100%',marginTop:"3rem"}}>
                    {liked ? (<><h1 style={{fontSize:'15px',display:'flex',alignItems:'center',color:'white'}} className='likeButton'>You have already liked this product! 🥳</h1></>):(<><h1 style={{fontSize:'15px',display:'flex',alignItems:'center',color:'white'}} className='likeButton'>Would you like to recommend <ThumbUpIcon style={{marginLeft:'10px'}} onClick={handleLike}/></h1></>)}
                    {item?.stock==0 ? (<p className='out-of-stock'>Out of stock!</p>):(<p className='in-stock'>Stock: {item?.stock}</p>)}
                    <p style={{marginTop:'2rem'}}>Description:</p>
                    <span className='item-description'>{item?.description}</span>
                </div>
            </div>
        </div>
        <div className='comment-section'>

        </div>
        {/* <div className='recommendation-section'>
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
        </div> */}
    </div>
  )
}

export default ViewProduct