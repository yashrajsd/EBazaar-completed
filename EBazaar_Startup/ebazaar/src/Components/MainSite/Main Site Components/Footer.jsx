import React from 'react'
import './Footer.scss'
const Footer = () => {
    const contactUs=[
        {
            title:'Phone Number:',
            value:'7248907517'
        },
        {
            title:'Email:',
            value:'rizviclg@eng.rizvi.edu.in'
        },{
            title:'Address:',
            value:'Rizvi Educational Complex Off Carter Road, Sherly Rajan Rd, Bandra West, Mumbai'
        }
    ]
    const developers=[
        {
            name:"Yashraj Deshmukh",
            githubLink:'https://github.com/yashrajsd'
        },{
          name:'Yousuf',
          githubLink:''  
        },{
            name:'Mohammad',
            githubLink:''
        },{
            name:"Zuber",
            githubLink:''
        }
    ]
  return (
    <div className='footer-container' >
        <div className='fc-div1'>
            <h1>EBazaar</h1>
            <p>Team.exe from<br/>Rizvi College of Engineering</p>
            <div style={{marginTop:'20px'}} className='f-ourTeam'>
            <p>Our Team</p>
            <ul>
                {developers.map((coder)=>{
                    return(
                        <a href={coder.githubLink}><li>{coder.name}</li></a>
                    )
                })}
            </ul>
            </div>
        </div>
        <div className='fc-div2'>
            <div>
            <p>Contact Us</p>
            <ul>
                {contactUs.map((detail)=>{
                    return(
                        <>
                        <li style={{marginBottom:'10px'}}>
                            {detail.title}<br/>{detail.value}
                        </li>
                        </>
                    )
                })}
            </ul>
            </div>
        </div>
        <div className='fc-div2'>

        </div>
        <div className='fc-div2'>

        </div>
    </div>
  )
}

export default Footer