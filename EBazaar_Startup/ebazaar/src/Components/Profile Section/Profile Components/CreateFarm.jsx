import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { storage } from '../../../firebase'
import { toast } from 'react-toastify';
import './CreateFarm.scss'
import { async } from '@firebase/util'
import { addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { UserContext } from '../../../Context/user.context';
import { db } from '../../../firebase'
const farmForm={
  name:'',
  phoneNumber:null,
  email:'',
  address:'',
  state:'',
  city:'',
  zipcode:null,
  description:'',
  bannerURL:'',
  earning:0
}
const CreateFarm = ({user}) => {
  const [form,setForm] = useState(farmForm); 
  const {name,email,phoneNumber,address,state,city,zipcode,description,bannerURL}=form;
  const [file,setFile] = useState(null)
  const {currentUser} = useContext(UserContext);
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleForm=async(e)=>{
    e.preventDefault();
    const docRef =doc(db,'farm',user.uid);
    await setDoc(docRef,{
    name:name,
    phoneNumber:phoneNumber,
    email:email,
    address:address,
    state:state,
    city:city,
    zipcode:zipcode,
    description:description,
    bannerURL:bannerURL,
    earning:0
    })
    const docRef2 =doc(db,'users',user.uid)
    await updateDoc(docRef2,{
      admin:true
    })
  }

  useEffect(
    ()=>{
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
            setForm((prev)=>({...prev,bannerURL:downloadUrl}))
          })
        })
        toast.success('Successfully Uploaded Image')
      }
      file && uploadFile();
    },[file]
  )

  return (
    <div className='farm-form'>
      <form action="submit" onSubmit={handleForm}>
      <div className='fields'>
        <label htmlFor="">Name your farm</label>
        <input value={name} type="text" placeholder='eg.Yash ka farm' required name='name' onChange={handleChange}/>
      </div>
      <h1>Contact Details</h1>
      <div style={{display:'flex',width:'100%',marginTop:'20px'}}>
      <div className='fields-2'>
        <label htmlFor="">Phone Number</label>
        <input value={phoneNumber} type="number" name='phoneNumber' placeholder='eg.Yash ka farm' required  onChange={handleChange}/>
      </div>
      <div className='fields-2'>
        <label htmlFor="">Email Address</label>
        <input value={email} type="email" name='email' placeholder='eg.yashrajdeshmukh707@gmail.com' required onChange={handleChange}/>
      </div>
      </div>
      <h1>Address Details</h1>
      <div className='fields' style={{marginTop:'20px'}}>
        <label htmlFor="">Farm address</label>
        <input value={address} type="text" placeholder='' name='address' style={{width:'100%'}} required onChange={handleChange}/>
      </div>
      <div style={{display:'flex',width:'100%',marginTop:'20px'}}>
      <div className='fields-2'>
        <label htmlFor="">State</label>
        <input value={state}  type="text"  required onChange={handleChange} name='state'/>
      </div>
      <div className='fields-2'>
        <label htmlFor="">City/Village</label>
        <input value={city} type="text" name='city'  required onChange={handleChange}/>
      </div>
      </div>
      <div className='fields' style={{marginTop:'20px'}}>
        <label htmlFor="">Zipcode/postal code</label>
        <input value={zipcode} type="number" style={{width:'20%'}} name='zipcode'  required onChange={handleChange}/>
      </div>
      <h1>Tell others more about your farm</h1>
      <div className='fields' style={{marginTop:'20px'}}>
        <label htmlFor="">Describe about your farm in short and to the point</label>
        <textarea value={description} name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
      </div>
      <div className='fields' style={{marginTop:'20px'}}>
        <label htmlFor="">Upload a banner for your farm</label>
        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} required/>
        {bannerURL && (
          <div className='farm-banner-preview' style={{backgroundImage:`url(${bannerURL})`}} >
          </div>
        )}
      </div>
      <div>
        <button type='submit'>Create Farm</button>
      </div>
      </form>
    </div>
  )
}

export default CreateFarm