import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState} from 'react';
import api from "./constants/api";
import Home from "../src/screens/pages/home/Home";
import About from "../src/screens/pages/about/About";
import Contact from "../src/screens/pages/contact/Contact";
// import Offer from "../src/screens/pages/offerPage/Offer";
import Blog from "../src/screens/pages/blog/Blog";
import BlogDetails from "../src/screens/pages/blog/BlogDetails";
import ServiceDetail from "./screens/pages/service-detail/serviceDetail";
import ServiceSubMenu from "./screens/pages/service-detail/serviceSubMenu";
import Error from "./screens/pages/Error";
import ProductDetail from "./screens/pages/Products/ProductDetails";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import PrivacyPolicy from "../src/screens/pages/about/PrivacyPolicy";
import Terms from '../src/screens/pages/about/Terms';
import {Helmet} from "react-helmet";
import Offer from "./screens/pages/offerPage/offer";


function App() {
  const [about, setAbout] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const getAboutContent = () => {
    api.get("/getAboutUs", { recordType: "Record" }).then((res) => {
      setAbout(res.data.data);
      
      api
      .get("/getBlogImage", {recordType:"picture"})
      .then((res) => {
        setBlogs(res.data.data);
      })
      api
      .post("/getProductDetail", {recordType:"Record"})
      .then((res) => {
        setProducts(res.data.data);
        console.log(res);
      })
    });
  };
  React.useEffect(() => {

    getAboutContent();
   
  }, []);
  return (
    <>
        <div class="row">
            {about.map((data) => {
              return (
                <div class="col-md-12 align-self-center pl-lg-4">
                   <Helmet>
              <meta charSet='utf-8' />
           
              <title>{data.meta_title}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Helmet>
            </div>
              )})}
              </div>
      <HashRouter>
        <Header />
        
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogdetail" element={<BlogDetails />} />
          <Route path="/blogs/:title" element={<BlogDetails />} />
          <Route path="/services/:title" element={<ServiceDetail />} />
          <Route path="/services/:title/:title" element={<ServiceSubMenu />} />
          <Route path="/products/:title" element={<ProductDetail />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
