"use client"

import React,  { useState, useEffect } from "react"
import { MDBTable, MDBTableHead, MDBTableBody,   MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import '../../../assets/css/mdb.css'
import axios from 'axios';
import '../../../assets/css/Tostify.css'
import { ToastContainer, toast } from 'react-toastify';


function Home(){

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);


    const [formData, setFormData] = useState({
        resturentname: '',
        location: '',
        rating: '',
        imagelink: '',
        userid: localStorage.getItem('user_id'),
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
       
    
        // try {

        //   await axios.post('/api/resturents/MyReutrants', formData);

        //   // Handle success, maybe show a success message or redirect
        // } catch (error) {
        //   console.error('Error:', error);
        //   // Handle error, show an error message, or log it
        // }

        // setBasicModal(!basicModal)


        // let data = JSON.stringify({
        //     "userid": "12133131",
        //     "resturentname": "abc",
        //     "imagelink": "hshsh"
        //   });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/resturents/MyReutrants',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : formData
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          })

          
          .catch((error) => {
            console.log(error);
          });

          setBasicModal(!basicModal);
        
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };




    //   Get Data in Table
    let [res, setres] = useState([])

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/resturents/All',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setres(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });


    //   Delete

    const handleDelete = async (_id) => {
    //    console.log(_id)

       let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/resturents/MyReutrants/${_id}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
       
      };


  


    return(
        <>

<ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

        <br/>
        <br/>
        <br/>
        <br/>
        

        <div className="container">

            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <h1>All Resturent</h1>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6">
                <MDBBtn style={{float:'right'}} onClick={toggleShow}>Add Resturent</MDBBtn>
                </div>
            </div>
        <br/>
        <MDBTable className="table table-striped" style={{border:'1px solid black'}}>
      <MDBTableHead style={{backgroundColor:'darkblue', color:'white'}}>
        <tr>
          <th scope='col'>Action</th>
          <th scope='col'>Resturent Name</th>
          <th scope='col'>Location</th>
          <th scope='col'>Rating</th>
          <th scope='col'>Image link</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody style={{backgroundColor:'#F0ECEC', color:'black'}}>
      {res.map((v, i) => (
          <tr>
            <td>
            <MDBBtn className='me-1' color='danger' onClick={() => handleDelete(v._id)}>Delete</MDBBtn>
            </td>
            <td>{v.resturentname}</td>
            <td>{v.location}</td>
            <td>{v.rating}</td>
            <td>{v.imagelink}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    </div>
        



    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Resturent</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>


                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-lg-12">
                        <MDBInput label='Resturent Name' name="resturentname" value={formData.resturentname} onChange={handleChange} id='form1' type='text' />
                        </div>

                        </div>

                        <br/>
                        <div className="row">
                        <div className="col-md-6 col-sm-6 col-lg-6">
                        <MDBInput label='Location' name="location" value={formData.location} onChange={handleChange} id='form1' type='text' />
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6">
                        <MDBInput label='Rating' name="rating" value={formData.rating} onChange={handleChange} id='form1' type='text' />
                        </div>
                    </div>
<br/>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-lg-12">
                        <MDBInput label='Image Link' name="imagelink" value={formData.imagelink} onChange={handleChange} id='form1' type='text' />
                        </div>
                        
                        <label value={formData.userid} style={{display:'none'}}></label>
                    </div>
                </div>


            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}


export default Home;