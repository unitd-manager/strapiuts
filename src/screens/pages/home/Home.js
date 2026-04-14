// import React,{useState} from 'react'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { Checkbox } from 'pretty-checkbox-react';
// import '@djthoms/pretty-checkbox';
// import api from '../../../constants/api';
// // //import moment from 'moment';
// import ReactHtmlParser from 'react-html-parser';
// import { Link,useNavigate } from 'react-router-dom';
// import imageBase from "../../../constants/image.js"
// import {Helmet} from "react-helmet";


// export default function Home() {

//   const [blogs, setBlogs] = useState([])
//   const [testimonial, setTestimonials] = useState([])
//   const [products, setProducts] = useState([])
//   const [services, setServices] = useState([]) 
//   const [choose, setWhychooseus] = useState([])
 
//   const navigate = useNavigate()

//   const [contact, setContact] = React.useState({
//     name:'', email:'', phone:'', message:''});
 
// const [product, setProduct] = useState([])
// const [service, setService] = useState([])

// const handleProductChange = (e) => {
//   // Destructuring
//   const { value, checked } = e.target;
    
//   console.log(`${value} is ${checked}`);
   
//   // Case 1 : The user checks the box
//   if (checked) {
//     setProduct( [...product, value]);
//   }

//   // Case 2  : The user unchecks the box
//   else {
//     setProduct(product.filter((e) => e !== value));
//   }
// };
// const applyChanges = () => {};


// const handleServiceChange = (e) => {
//   // Destructuring
//   const { value, checked } = e.target;
    
//   console.log(`${value} is ${checked}`);
   
//   // Case 1 : The user checks the box
//   if (checked) {
//     setService( [...service, value]);
//   }

//   // Case 2  : The user unchecks the box
//   else {
//     setService(service.filter((e) => e !== value));
//   }
// };
// const updateContactFields = e => {
//   const fieldName = e.target.name
//   setContact(existingValues => ({
//     // Retain the existing values
//     ...existingValues,
//     // update the current field
//     [fieldName]: e.target.value,
//   }))
// }
//   const onEquirySubmit = () =>{
//     if (
      
//       contact.name  &&
//       contact.email &&
//       contact.message        ){
    
//     api.post('/addEnquiry',{
//       name:contact.name,
//       email:contact.email,
//       phone:contact.phone,
//       message:contact.message,
//       products:product.join(','),
//       services:service.join(',')
//     }).then((res)=>{
//             console.log(res)        
//    // alert('Record created successfully', 'success'); 
//       })
//       .catch(() => {
//         alert('Unable to edit record.', 'error');
//       });
//     console.log(contact)
//   } else {
//     alert('Please fill all required fields.', 'error');
//   }
//   }
  
//   //Email
// const sendMail = () => {
//   if (
//     contact.name  &&
//     contact.email &&
//     contact.message     ) {
//     const dynamic_template_data= 
//     {name:contact.name,
//     email:contact.email,
//     message:contact.message,
//     phone:contact.phone,
//     };
//   api
//     .post('/sendenquiryemail',{dynamic_template_data})
//     .then(() => {
//       alert('Thanks for contacting us. We will respond to your enquiry as soon as possible'); 
//     })
//     window.location.reload();
//   }
//  else {
//   applyChanges();
// }
// };


//   React.useEffect(() => {
//     AOS.init();
//     getBlogs()
//     window.scrollTo(0,0)
//     setTimeout(()=>{
      
//     },1000)
   
//   }, [])
  
 
//   const settings2 = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     responsive: [
//       {
//           breakpoint: 1024,
//           settings: {
//               slidesToShow: 2,
//               slidesToScroll: 5,
//           }
//       },
//       {
//           breakpoint: 600,
//           settings: {
//               slidesToShow: 2,
//               slidesToScroll: 1
//           }
//       },
//       {
//           breakpoint: 480,
//           settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//           }
//       }
//     ]
//   };
//   const settings3 = {
//     dots: true,
//     // infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     responsive: [
//       {
//           breakpoint: 1024,
//           settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2,
//           }
//       },
//       {
//           breakpoint: 600,
//           settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//           }
//       },
//       {
//           breakpoint: 480,
//           settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//           }
//       }
//     ]
//   };
//   const getBlogs = () =>{
//   api.get('/getBlogImage').then(res=>{
//       setBlogs(res.data.data)
//     })
//     api.post('/getContent',{recordType:'Testimonialpart'}).then(res=>{
//       setTestimonials(res.data.data)
//     })
//     api.post('/getContent',{recordType:'Home Products'}).then(res=>{
//       setProducts(res.data.data)
//     })
//     api.post('/getContent',{recordType:'Our Services'}).then(res=>{
//       setServices(res.data.data)
    
//     })
//     api.post('/getContent',{recordType:'Why Choose Us'}).then(res=>{
//       setWhychooseus(res.data.data)
//       // console.log(res.data.data)
//     }) 
 
    
//   }
//   const getServiceDetail = (title) =>{
//     if(title === 'Web/ E Commerce Development'){
//       navigate('services/website-development-software')
//     }else{
//       var formated = title.toLowerCase().split(' ').join('-')
    
//       navigate('/services/'+formated)
//     }
    
//   }
//   const getFormatedText = (title) =>{
//     var formatedd = title.toLowerCase()
//     return formatedd.split(' ').join('-')
//   }
  
  
 
//   return (
//     <>
    
//     <section className="hero-area hero-area-lg position-relative">
//   <Helmet>
//     <meta charSet='utf-8' />
//     <link rel="icon" type="image/x-icon" href="/public/assets/images/logo/favicon-32x32.png"/>
//     <title>United Technologies</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
//   </Helmet>
//   <div className="container">
//     <div className="row align-items-center">
//       <div className="col-lg-6 text-center text-lg-left mb-4 mb-lg-0">
//         <div className="content">
//           <h2 className="text-dark position-relative" >Build Your Business Together with United Technologies<span className="watermark">Build</span></h2>
//           <p className="text-dark mb-4">Our mission - to develop a comprehensive set of online products tailored for burgeoning industries, streamlining workloads, delivering optimal outcomes, and maximizing revenue margins to unprecedented heights.</p>
//           <ul className="list-inline">
//             <li className="list-inline-item mx-1 my-2">
//               <a href="#" className="btn btn-primary">
//                 <img src="assets/images/icon/google-play-white.png" className="img-fluid mr-2 rounded" alt="play-store"/> Google Play</a>
//             </li>
//             <li className="list-inline-item mx-1 my-2">
//               <a href="#" className="btn btn-outline-primary"><i className="fa fa-apple text-secondary mr-3 transition"></i>App
//                 Store</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="col-lg-6">
//         <img src="assets/images/banner/banner-3.png" className="img-fluid w-100 shadow rounded-lg banner-image" alt="app-interface" data-aos="fade-left" data-aos-delay="1000" />
//       </div>
//     </div>
//   </div>
//   <img src="assets/images/homepage-3/banner-shape.png" className="img-fluid bg-shape-4 banner-shape" alt="shape" />
// </section>

// <section style={{paddingTop:10}} className="section pb-0 features">
//   <div className="container">
    
//     <div className="row features-slider px-4" data-aos="fade-up">
      
//       <div className="col-12 text-center">
//         <div className="subtitle aos-init aos-animate" > 
//         <p className="subtitle aos-init aos-animate mt-5"  >Products </p>
//         <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">Exclusive Products</h2>
//       </div>
//       </div>
//       {products.slice(0, 1).map((data, index) => (
//   <div className="col-12 mb-4 aos-init aos-animate" data-aos="fade-up" key={index}>
//     <Link to={data.external_link} className="link">
//       <div className="text-center position-relative px-8 py-12 rounded-lg shadow card-active" style={{ backgroundColor: '#0437F2', width: '100%', height: '780px', color: '#ffffff', padding: '0 18px' }}>
//         <img src="assets/images/feature/feature-1.png" className="img-fluid" alt="feature-image" />
//         <h5 className="pt-5 pb-3 text-capitalize card-title">{data.title}</h5>
//         <p style={{ color: '#ffffff' }}>{ReactHtmlParser(`<span style="color: #ffffff;">${data.description}</span>`)}</p>
//         <Link to={data.external_link} className="btn btn-outline-primary" style={{ color: '#ffffff' }}>Read More</Link>
//       </div>
//     </Link>
//   </div>
// ))}
// {products.slice(1).map((data, index) => (
//   <div key={index} className={`col-lg-4 col-md-6 mb-4 aos-init aos-animate ${index % 2 !== 0 ? 'card-active' : ''}`} data-aos="fade-up">
//     <Link to={data.external_link} className="link">
//       <div className="text-center position-relative rounded-lg shadow" style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '', color: index % 2 === 0 ? '' : '#ffffff', padding: '15px', maxWidth: '100%' }}>
//         <img src={`assets/images/feature/feature-${index % 2 === 0 ? 1 : 2}.png`} className="img-fluid" alt="feature-image" />
//         <h5 className="pt-5 pb-3 text-capitalize card-title" style={{ color: index % 2 === 0 ? '' : '#ffffff' }}>{data.title}</h5>
//         {ReactHtmlParser(data.description)}
//         <Link to={data.external_link} className="btn btn-outline-primary" style={{ color: index % 2 === 0 ? '' : '#ffffff', borderColor: index % 2 === 0 ? '' : '#ffffff' }}>read more</Link>
//       </div>
//     </Link>
//   </div>
// ))}
//     </div>
//   </div>
// </section>
// <section className="position-relative mt-5">
//   <div className="container">
//     <div className="row ">
//     <div className="col-12 text-center">
//         <p className="subtitle aos-init aos-animate mt-5" >Services</p>
//         <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">Our Services</h2>
//       </div>
//       {services.map(data=>(
//         <div onClick={()=>{getServiceDetail(data.title)}}  className="col-lg-3 col-sm-6 mb-4 mb-lg-0" data-aos="fade-right" >
         
//             <div className="card border-0 shadow rounded-xs pt-5 h-100">
//               <div className="card-body">
//                 <i className="fa fa-desktop icon-lg icon-blue icon-bg-blue icon-bg-circle mb-3"></i>
//                 <h4 className="mt-4 mb-3">{data.title}</h4>
//                 <p>{ReactHtmlParser(data.description)}</p>
//               </div>
//             </div>
        
//       </div>
//       ))}
      
//     </div>
//   </div>
//   <img src="/assets/images/dot/dot-1.png" className="img-fluid feature-bg-shape-1" alt="background-dots"/>
//   <img src="/assets/images/shape/shape-bg.png" className="img-fluid feature-bg-shape-2" alt="background-shape"/>
// </section>
// <section className="section position-relative overflow-hidden">
//   <div className="container">
//     <div className="row">
//       <div className="col-md-6 align-self-center pr-lg-4 mb-4 mb-md-0">
//         <p className="subtitle" data-aos="fade-up">Why choose us</p>
//         <h2 className="section-title" data-aos="fade-up" data-aos-delay="200">Discover how we can assist you in problem-solving, expert methodologies, and agile deployment with an innovation-driven approach. Get in touch with us today to explore the possibilities!</h2>
//         {/* <p data-aos="fade-up" data-aos-delay="500">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accu santium
//           doloreque laudantum.</p> */}
//       </div>
//       <div className="col-md-6 pl-lg-4">
//         <ul className="list-unstyled process-steps">
//           {choose.map(res=>( <li className="bg-white d-inline-flex shadow rounded-xs p-4" data-aos="fade-right" data-aos-delay="200">
//             <div className="mr-3">
//               <span className="text-secondary step-number bg-gray-light rounded-circle"><i className='fa fa-trophy'></i></span>
//             </div>
//             <div className="align-self-center">
//               <h5>{res.title}</h5>
//               <p className="mb-0">
//                 {ReactHtmlParser(res.description)}
//               </p>
//             </div>
//           </li>))}
          
//         </ul>
//       </div>
//     </div>
//   </div>
//   <img src="assets/images/shape/curve-shape-2.png" className="img-fluid process-bg-shape" alt="bg-shape"/>
// </section>

// <section style={{paddingTop:0}}className="bg-light py-5">
//   <div className="container">
//     <div className="row">
//       <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
//         <p className="h2 text-dark"><span className="counter" data-count="100">0</span>+</p>
//         <h6 className="text-dark font-weight-normal">HAPPY CLIENTS</h6>
//       </div>
//       <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
//         <p className="h2 text-dark"><span className="counter" data-count="200">0</span>+</p>
//         <h6 className="text-dark font-weight-normal">FINISHED PROJECTS</h6>
//       </div>
//       <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
//         <p className="h2 text-dark"><span className="counter" data-count="30">0</span>+</p>
//         <h6 className="text-dark font-weight-normal">SKILLED EXPERTS</h6>
//       </div>
//       <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
//         <p className="h2 text-dark"><span className="counter" data-count="300">0</span>+</p>
//         <h6 className="text-dark font-weight-normal">MEDIA POSTS</h6>
//       </div>
//     </div>
//   </div>
// </section>


//   <section style={{paddingTop:40}} className="section">
// <div className="container">
//   <div className="row">
//     <div className="col-12">
//       <p className="subtitle">latest blogs</p>
//       <h2 className="section-title">Blogs</h2>
//     </div>
//     <div className="col-12">
//       <div className="blog-slider">
//       <Slider {...settings2}>
//         {blogs && blogs.map(data=>(
//           <div className="px-3 mb-5">
//           <Link to="/blogdetail" state={{ data: data }} className="link">
//           <div className="card border-0 shadow rounded-xs">
//           <img
//                                 src={`${imageBase}${data.file_name}`}
//                                 className="img-fluid card-img-top"
//                                 alt="post-thumb"
//                               />
//           {/* <img src={`http://43.228.126.245/unitd-api/storage/uploads/${data.file_name}`} className="img-fluid card-img-top" alt="post-thumb" /> */}
//             <div className="card-body">
//               {/* <p className="card-date">{moment(data.date.substring(0,10), 'YYYY-MM-DD').format('MMMM Do YYYY')}</p> */}
//               <h5><Link to="/blogdetail" state={{ data: data }} className="text-dark">{data.title}</Link></h5>
//               <br></br>
//             </div>
//           </div>
//           </Link>
//         </div>
//         ))}
//       </Slider>
//       </div>
//     </div>
//   </div>
// </div>
// </section>


// <section style={{paddingTop:10}} className="section">
//   <div className="container">
//     <div className="row">
//       <div className="col-12 text-center">
//         <p className="subtitle">Enquiry</p>
//         <h2 className="section-title">HOW CAN WE HELP YOU</h2>
//       </div>
//       <div className="col-12 text-center">
//         <form action="#" className="row">
//           <div className="col-lg-4">
//             <input onChange={updateContactFields} type="text" 
//             className="bg-light form-control mb-4" placeholder="Your Name*" name="name" />
//           </div>
//           <div className="col-lg-4">
//             <input  onChange={updateContactFields} type="text" className="bg-light form-control mb-4" placeholder="Your Email*" name="email"/>
//           </div>
//           <div className="col-lg-4">
//             <input  onChange={updateContactFields} type="text" className="bg-light form-control mb-4" placeholder="Your Phone" name="phone"/>
//           </div>
//           <div className="col-lg-12">
//             <textarea  onChange={updateContactFields} className="bg-light form-control mb-4" placeholder="Message*" name="message"></textarea>
//           </div>
                   
//           <div className="col-12">
//             <button onClick={()=>{
             
//               onEquirySubmit();
//               sendMail();
              
//             }} type="button" className="btn btn-primary">Submit Now</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>


//     </>
//   )
// }

import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import api from "../../../constants/api";
import ReactHtmlParser from "react-html-parser";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [testimonial, setTestimonials] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [choose, setWhychooseus] = useState([]);

  const navigate = useNavigate();

  const [contact, setContact] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [product, setProduct] = useState([]);
  const [service, setService] = useState([]);

  const handleProductChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProduct([...product, value]);
    } else {
      setProduct(product.filter((item) => item !== value));
    }
  };

  const applyChanges = () => {};

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setService([...service, value]);
    } else {
      setService(service.filter((item) => item !== value));
    }
  };

  const updateContactFields = (e) => {
    const fieldName = e.target.name;
    setContact((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
  };

  const onEquirySubmit = async () => {
  if (!contact.name || !contact.email || !contact.message) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const payload = {
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "",
        comments: contact.message,
        notes: contact.message,
        subject: "Website Enquiry",
        enquiry_type: "General",
        company: "",
        country: "India",
        address_country: "India",
        first_name: contact.name,
        last_name: "",
        fax: "",
        status: "New",
        follow_up_date: null,
        flag: false,
        preferred_contact: "Email",
        preferred_time: "",
        phone_area_code: "+91",
        staff_id: null,
        client_type: "Website Visitor",
        product: product.join(","),
        service: service.join(","),
        creation_date: new Date().toISOString(),
        modification_date: new Date().toISOString(),
      },
    };

    const res = await api.post("/api/enquiries", payload);
    console.log("Enquiry submitted successfully:", res.data);

    await sendMail();

    alert("Thanks for contacting us. We will respond to your enquiry as soon as possible");

    setContact({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setProduct([]);
    setService([]);

    window.location.reload();
  } catch (error) {
    console.log("Enquiry submit error:", error?.response?.data || error);
    alert("Unable to submit enquiry.");
  }
};
  const sendMail = () => {
    if (contact.name && contact.email && contact.message) {
      const dynamic_template_data = {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        phone: contact.phone,
      };

      api.post("/sendenquiryemail", { dynamic_template_data }).then(() => {
        alert("Thanks for contacting us. We will respond to your enquiry as soon as possible");
        window.location.reload();
      });
    } else {
      applyChanges();
    }
  };

  useEffect(() => {
    AOS.init();
    getHomeData();
    window.scrollTo(0, 0);
  }, []);

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 5 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const getHomeData = async () => {
  try {
    const [
      testimonialRes,
      productsRes,
      servicesRes,
      whyChooseRes,
    ] = await Promise.all([
      
      api.get("/api/contents?filters[content_type][$eq]=Testimonialpart&sort[0]=createdAt:desc"),

      api.get("/api/contents?filters[content_type][$eq]=Home Products&sort[0]=createdAt:desc"),

      api.get("/api/contents?filters[content_type][$eq]=Our Services&sort[0]=createdAt:desc"),

      api.get("/api/contents?filters[content_type][$eq]=Why Choose Us&sort[0]=createdAt:desc"),
    ]);

    setTestimonials(testimonialRes?.data?.data || []);
    setProducts(productsRes?.data?.data || []);
    setServices(servicesRes?.data?.data || []);
    setWhychooseus(whyChooseRes?.data?.data || []);

  } catch (error) {
    console.log("Home API error:", error);
  }
};

  const getServiceDetail = (title) => {
    if (title === "Web/ E Commerce Development") {
      navigate("services/website-development-software");
    } else {
      const formated = String(title || "").toLowerCase().split(" ").join("-");
      navigate("/services/" + formated);
    }
  };

  const getFormatedText = (title) => {
    return String(title || "").toLowerCase().split(" ").join("-");
  };

  const getBlogImage = (blog) => {
    if (blog?.images?.length > 0) {
      return (
        blog.images[0]?.formats?.medium?.url ||
        blog.images[0]?.formats?.small?.url ||
        blog.images[0]?.formats?.thumbnail?.url ||
        blog.images[0]?.url
      );
    }
    return "/assets/images/no-image.png";
  };

  return (
    <>
      <section className="hero-area hero-area-lg position-relative">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image/x-icon" href="/public/assets/images/logo/favicon-32x32.png" />
          <title>United Technologies</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-left mb-4 mb-lg-0">
              <div className="content">
                <h2 className="text-dark position-relative">
                  Build Your Business Together with United Technologies
                  <span className="watermark">Build</span>
                </h2>
                <p className="text-dark mb-4">
                  Our mission - to develop a comprehensive set of online products tailored
                  for burgeoning industries, streamlining workloads, delivering optimal
                  outcomes, and maximizing revenue margins to unprecedented heights.
                </p>
                <ul className="list-inline">
                  <li className="list-inline-item mx-1 my-2">
                    <a href="#" className="btn btn-primary">
                      <img
                        src="assets/images/icon/google-play-white.png"
                        className="img-fluid mr-2 rounded"
                        alt="play-store"
                      />{" "}
                      Google Play
                    </a>
                  </li>
                  <li className="list-inline-item mx-1 my-2">
                    <a href="#" className="btn btn-outline-primary">
                      <i className="fa fa-apple text-secondary mr-3 transition"></i>App Store
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="assets/images/banner/banner-3.png"
                className="img-fluid w-100 shadow rounded-lg banner-image"
                alt="app-interface"
                data-aos="fade-left"
                data-aos-delay="1000"
              />
            </div>
          </div>
        </div>
        <img
          src="assets/images/homepage-3/banner-shape.png"
          className="img-fluid bg-shape-4 banner-shape"
          alt="shape"
        />
      </section>

      <section style={{ paddingTop: 10 }} className="section pb-0 features">
        <div className="container">
          <div className="row features-slider px-4" data-aos="fade-up">
            <div className="col-12 text-center">
              <div className="subtitle aos-init aos-animate">
                <p className="subtitle aos-init aos-animate mt-5">Products</p>
                <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                  Exclusive Products
                </h2>
              </div>
            </div>

            {products.slice(0, 1).map((data, index) => (
              <div className="col-12 mb-4 aos-init aos-animate" data-aos="fade-up" key={data.id || index}>
                <a href={data.external_link} className="link" target="_blank" rel="noreferrer">
                  <div
                    className="text-center position-relative px-8 py-12 rounded-lg shadow card-active"
                    style={{
                      backgroundColor: "#0437F2",
                      width: "100%",
                      height: "780px",
                      color: "#ffffff",
                      padding: "0 18px",
                    }}
                  >
                    <img src="assets/images/feature/feature-1.png" className="img-fluid" alt="feature-image" />
                    <h5 className="pt-5 pb-3 text-capitalize card-title">{data.title}</h5>
                    <p style={{ color: "#ffffff" }}>
                      {ReactHtmlParser(`<span style="color: #ffffff;">${data.description || ""}</span>`)}
                    </p>
                    <span className="btn btn-outline-primary" style={{ color: "#ffffff" }}>
                      Read More
                    </span>
                  </div>
                </a>
              </div>
            ))}

            {products.slice(1).map((data, index) => (
              <div
                key={data.id || index}
                className={`col-lg-4 col-md-6 mb-4 aos-init aos-animate ${index % 2 !== 0 ? "card-active" : ""}`}
                data-aos="fade-up"
              >
                <a href={data.external_link} className="link" target="_blank" rel="noreferrer">
                  <div
                    className="text-center position-relative rounded-lg shadow"
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "",
                      color: index % 2 === 0 ? "" : "#ffffff",
                      padding: "15px",
                      maxWidth: "100%",
                    }}
                  >
                    <img
                      src={`assets/images/feature/feature-${index % 2 === 0 ? 1 : 2}.png`}
                      className="img-fluid"
                      alt="feature-image"
                    />
                    <h5
                      className="pt-5 pb-3 text-capitalize card-title"
                      style={{ color: index % 2 === 0 ? "" : "#ffffff" }}
                    >
                      {data.title}
                    </h5>
                    {ReactHtmlParser(data.description || "")}
                    <span
                      className="btn btn-outline-primary"
                      style={{
                        color: index % 2 === 0 ? "" : "#ffffff",
                        borderColor: index % 2 === 0 ? "" : "#ffffff",
                      }}
                    >
                      read more
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="position-relative mt-5">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <p className="subtitle aos-init aos-animate mt-5">Services</p>
              <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                Our Services
              </h2>
            </div>

            {services.map((data) => (
              <div
                key={data.id}
                onClick={() => {
                  getServiceDetail(data.title);
                }}
                className="col-lg-3 col-sm-6 mb-4 mb-lg-0"
                data-aos="fade-right"
              >
                <div className="card border-0 shadow rounded-xs pt-5 h-100">
                  <div className="card-body">
                    <i className="fa fa-desktop icon-lg icon-blue icon-bg-blue icon-bg-circle mb-3"></i>
                    <h4 className="mt-4 mb-3">{data.title}</h4>
                    <p>{ReactHtmlParser(data.description || "")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img src="/assets/images/dot/dot-1.png" className="img-fluid feature-bg-shape-1" alt="background-dots" />
        <img src="/assets/images/shape/shape-bg.png" className="img-fluid feature-bg-shape-2" alt="background-shape" />
      </section>

      <section className="section position-relative overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center pr-lg-4 mb-4 mb-md-0">
              <p className="subtitle" data-aos="fade-up">
                Why choose us
              </p>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="200">
                Discover how we can assist you in problem-solving, expert methodologies, and agile deployment with an innovation-driven approach. Get in touch with us today to explore the possibilities!
              </h2>
            </div>
            <div className="col-md-6 pl-lg-4">
              <ul className="list-unstyled process-steps">
                {choose.map((res) => (
                  <li
                    key={res.id}
                    className="bg-white d-inline-flex shadow rounded-xs p-4"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="mr-3">
                      <span className="text-secondary step-number bg-gray-light rounded-circle">
                        <i className="fa fa-trophy"></i>
                      </span>
                    </div>
                    <div className="align-self-center">
                      <h5>{res.title}</h5>
                      <p className="mb-0">{ReactHtmlParser(res.description || "")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <img src="assets/images/shape/curve-shape-2.png" className="img-fluid process-bg-shape" alt="bg-shape" />
      </section>

      <section style={{ paddingTop: 0 }} className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
              <p className="h2 text-dark">
                <span className="counter" data-count="100">
                  0
                </span>
                +
              </p>
              <h6 className="text-dark font-weight-normal">HAPPY CLIENTS</h6>
            </div>
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
              <p className="h2 text-dark">
                <span className="counter" data-count="200">
                  0
                </span>
                +
              </p>
              <h6 className="text-dark font-weight-normal">FINISHED PROJECTS</h6>
            </div>
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
              <p className="h2 text-dark">
                <span className="counter" data-count="30">
                  0
                </span>
                +
              </p>
              <h6 className="text-dark font-weight-normal">SKILLED EXPERTS</h6>
            </div>
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0 text-center">
              <p className="h2 text-dark">
                <span className="counter" data-count="300">
                  0
                </span>
                +
              </p>
              <h6 className="text-dark font-weight-normal">MEDIA POSTS</h6>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 40 }} className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="subtitle">latest blogs</p>
              <h2 className="section-title">Blogs</h2>
            </div>
            <div className="col-12">
              <div className="blog-slider">
                <Slider {...settings2}>
                  {blogs &&
                    blogs.map((data) => (
                      <div className="px-3 mb-5" key={data.id}>
                        <Link to={`/blog/${getFormatedText(data.title)}`} state={{ data }} className="link">
                          <div className="card border-0 shadow rounded-xs">
                            <img
                              src={getBlogImage(data)}
                              className="img-fluid card-img-top"
                              alt={data.title}
                              style={{ height: "240px", objectFit: "cover", width: "100%" }}
                            />
                            <div className="card-body">
                              <h5>
                                <span className="text-dark">{data.title}</span>
                              </h5>
                              <br />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 10 }} className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="subtitle">Enquiry</p>
              <h2 className="section-title">HOW CAN WE HELP YOU</h2>
            </div>
            <div className="col-12 text-center">
              <form action="#" className="row">
                <div className="col-lg-4">
                  <input
                    onChange={updateContactFields}
                    type="text"
                    className="bg-light form-control mb-4"
                    placeholder="Your Name*"
                    name="name"
                  />
                </div>
                <div className="col-lg-4">
                  <input
                    onChange={updateContactFields}
                    type="text"
                    className="bg-light form-control mb-4"
                    placeholder="Your Email*"
                    name="email"
                  />
                </div>
                <div className="col-lg-4">
                  <input
                    onChange={updateContactFields}
                    type="text"
                    className="bg-light form-control mb-4"
                    placeholder="Your Phone"
                    name="phone"
                  />
                </div>
                <div className="col-lg-12">
                  <textarea
                    onChange={updateContactFields}
                    className="bg-light form-control mb-4"
                    placeholder="Message*"
                    name="message"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    onClick={() => {
                      onEquirySubmit();
                      sendMail();
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}