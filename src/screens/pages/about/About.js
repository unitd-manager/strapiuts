import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../../../constants/api";
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function About() {
  const [about, setAbout] = useState([]);
  const [testimonial, setTestimonials] = useState([]);

  React.useEffect(() => {
    AOS.init();
    getAboutContent();
    window.scrollTo(0, 0);
  }, []);
  const applyChanges = () => {};

  const settings3 = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [aboutUs, setAboutUs] = React.useState({
    email: "",
    name: "",
    message: "",
  });

  let name, value;

  const handleChangeAbout = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAboutUs({ ...aboutUs, [name]: value });
    console.log({ [name]: value });
    // lname = e.target.lname
    // email = e.target.email
    // message = e.target.message
  };
  const AboutUsSubmit = () => {
    if (aboutUs.email && aboutUs.name && aboutUs.message) {
      api
        .post("/addContact", {
          email: aboutUs.email,
          name: aboutUs.name,
          message: aboutUs.message,
        })
        .then((res) => {
          console.log(res);
          // alert('Record created successfully', 'success');
        })
        .catch(() => {
          alert("Unable to edit record.", "error");
        });
      console.log(aboutUs);
    } else {
      alert("Please fill all required fields.", "error");
    }
  };

  //Email
  const Mail = () => {
    if (aboutUs.name && aboutUs.email && aboutUs.message) {
      const dynamic_template_data = {
        name: aboutUs.name,
        email: aboutUs.email,
        message: aboutUs.message,
      };
      api.post("/sendemail", { dynamic_template_data }).then(() => {
        alert(
          "Thanks for contacting us. We will respond to your enquiry as soon as possible"
        );
      });
    } else {
      applyChanges();
    }
  };

  const getAboutContent = () => {
    api.get("/getAboutUs", { recordType: "Record" }).then((res) => {
      setAbout(res.data.data);
      console.log("About us", res.data.data);
      api.post("/getContent", { recordType: "Testimonialpart" }).then((res) => {
        setTestimonials(res.data.data);
      });
    });
  };
  return (
    <>
    {/* <div class="row">
            {about.map((data) => {
              return (
                <div class="col-md-12 align-self-center pl-lg-4">
                   <Helmet>
              <meta charSet='utf-8' />
              <title>{data.title}</title>
              <meta name="description" content="Digital Marketing"></meta>
              <meta name="keyword" content=""></meta>
            </Helmet>
            </div>
              )})}
              </div> */}
      <section
        class="page-title page-title-overlay bg-cover overflow-hidden"
        data-background="images/background/about.jpg"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-7">
              <h1 class="text-white position-relative">
                About Us<span class="watermark-sm">About Us</span>
              </h1>
              <p class="text-white pt-4 pb-4">United Technologies</p>
            </div>
            <div class="col-lg-3 ml-auto align-self-end">
              <nav class="position-relative zindex-1" aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-lg-end bg-transparent mb-4 px-0">
                  <li class="breadcrumb-item">
                    <a href="index.html" class="text-white">
                      Home
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item text-white fw-bold"
                    aria-current="page"
                  >
                    About Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

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
