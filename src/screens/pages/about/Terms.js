import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../../../constants/api";
import ReactHtmlParser from "react-html-parser";


export default function About() {
  const [about, setAbout] = useState([]);

  React.useEffect(() => {
    AOS.init();
    getAboutContent();
    window.scrollTo(0, 0);
  }, []);


  const getAboutContent = () => {
    api.get("/getTerms").then((res) => {
      setAbout(res.data.data);
      console.log("About us", res.data.data);
     });
  };
  return (
    <>

      <section class="section">
        <div class="container">
          <div class="row">
            {about.map((data) => {
              return (
                <div class="col-md-12 align-self-center pl-lg-4">
                  
                  <h2
                    class="section-title1"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    style={{paddingTop:"25px"}}
                  >
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-delay="400">
                    {ReactHtmlParser(data.description)}
                  </p>
                  {/* <p data-aos="fade-up" data-aos-delay="400">
                    {ReactHtmlParser(data.description)}
                  </p> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section
        style={{ paddingTop: 0 }}
        class="section section-lg-bottom bg-light"
      >
           </section> */}
    </>
  );
}
