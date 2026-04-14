import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../../../constants/api";
import Address1 from "../../../assets/images/attachments/Address11.png";
import Address2 from "../../../assets/images/attachments/address2.png";
import Address3 from "../../../assets/images/attachments/address3.png";
import { Button, Col, Form, Input, Row, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
// import * as Yup from 'yup';

export default function Contact() {
  const [email, setEmail] = useState();
  const [companyname, setCompanyName] = useState();
  const [address, setAddress] = useState();
  const [address1, setAddress1] = useState();
  const [contact, setContact] = useState();
  const [mailId, setmailId] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null); // Add state for captcha
console.log("erwe",email,contact)
  React.useEffect(() => {
    AOS.init();
    getEmail();
    getCompanyName();
    getAddress();
    getAddress1();
    getMobile();
    getEnquiryEmail();
    window.scrollTo(0, 0);
  }, []);
  const applyChanges = () => {};

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log({ [name]: value });
    // lname = e.target.lname
    // email = e.target.email
    // message = e.target.message
  };
  const onFinish = (values) => {
    if (!captchaValue) {
      return message.error("Please complete the CAPTCHA!");
    }
    console.log("Received values of form: ", values);
    api
      .post("/addContact", values)
      .then((res) => {
        console.log(res.data.data);
        return message.error("Registered Successfully ");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getEnquiryEmail = () => {
    api.get("/getMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };

  //Email
  const sendMail = () => {
    if (user.name && user.email && user.message) {
      const to = mailId.email;
      const dynamic_template_data = {
        name: user.name,
        email: user.email,
        message: user.message,
      };
      api.post("/sendemail", { to, dynamic_template_data }).then(() => {
        alert(
          "Thanks for contacting us. We will respond to your enquiry as soon as possible"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } else {
      applyChanges();
    }
  };

  const getEmail = () => {
    api.get("/getEmail").then((res) => {
      setEmail(res.data.data[0]);
    });
  };

  const getCompanyName = () => {
    api.get("/getCompanyName").then((res) => {
      setCompanyName(res.data.data[0]);
    });
  };

  const getAddress = () => {
    api.get("/getAddress").then((res) => {
      setAddress(res.data.data[0]);
    });
  };
  const getAddress1 = () => {
    api.get("/getAddress1").then((res) => {
      setAddress1(res.data.data[0]);
    });
  };
  const getMobile = () => {
    api.get("/getContacts").then((res) => {
      setContact(res.data.data[0]);
    });
  };
  const onCaptchaChange = (value) => {
    setCaptchaValue(value); // Set the captcha value when user completes it
  };
  return (
    <>
      <section
        class="page-title page-title-overlay bg-cover overflow-hidden"
        data-background="#11476a"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-7">
              <h1 class="text-white position-relative">
                Contact<span class="watermark-sm">Contact</span>
              </h1>
              <p class="text-white pt-4 pb-4">We are happy to assist you!!</p>
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
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 150 }} class="section section-lg bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <p class="subtitle">Message</p>
              <h2 class="section-title">Leave A Message</h2>
            </div>
            <div className="col-lg-12 text-center">
  <div className="container center" style={{ maxWidth: "800px", margin: "auto" }}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: "600px", margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={(event) => handleChange(event)}
          placeholder="Name"
          style={{ width: "130%", height: "150%" }}         
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not a valid email!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={(event) => handleChange(event)}
          placeholder="Email"
          style={{ width: "130%" }} // Increase input field size
        />
      </Form.Item>
      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: "Please input your message!",
          },
        ]}
      >
        <Input.TextArea
          name="message"
          value={user.message}
          onChange={(event) => handleChange(event)}
          placeholder="Message"
          rows={6}
          style={{ width: "200%" }} // Increase input field size
        />
      </Form.Item>
        {/* Add reCAPTCHA here */}
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <ReCAPTCHA
                      sitekey="6LcG8mkqAAAAAAMtU5DZKoOIzzVbStlV4DpfEryp" // Replace with your reCAPTCHA site key
                      onChange={onCaptchaChange}
                    />
                  </Form.Item>

      <Form.Item>
      <Button
  type="primary"
  onClick={sendMail}
  shape="round"
  size="large"
  htmlType="submit"
  className="login-form-button"
  style={{ padding: '10px', fontSize: '20px' }}
>
  Submit
</Button>
      </Form.Item>
    </Form>
  </div>
</div>
<Row>
<Col style={{  textAlign: 'center', paddingLeft: '400px' }}>
  <div style={{ fontSize: '35px' }}>
    {companyname && companyname.companyname}
  </div>
  <div style={{ marginBottom: '20px', fontSize: '18px' }}>
    <i className="fa fa-envelope-o icon-primary"></i>
    {companyname && companyname.description}
  </div>
</Col>
</Row>
            <Row>
             <div class="col-lg-2"></div>
            <div class="col-lg-4" >
              <div class="p-5 rounded-xs shadow">
                <ul class="list-unstyled">
                  <li
                    class="d-flex mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                   
                    <div class="pl-3" style={{ textAlign: 'center' }}>
                    <img src={Address1} alt="Address" width="40%" height="40%"  />
                  
                      <h6 class="text-dark">India</h6>
                      <ul class="list-unstyled">
                        <li>{address && address.address}</li>
                      </ul>
                    </div>
                  </li>
              
                
                </ul>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="p-5 rounded-xs shadow">
                <ul class="list-unstyled">
                  <li
                    class="d-flex mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                  
                    <div class="pl-3" style={{ textAlign: 'center' }}>
                    <img src={Address2} alt="Address" width="40%" height="40%"  />
                  
                      <h6 class="text-dark">Singapore</h6>
                      <ul class="list-unstyled">
                        <li>{address && address.description}</li>
                    
                      </ul>
                    </div>
                  </li>
                
                
                </ul>
              </div>
            </div>
            {/* <div class="col-lg-4">
              <div class="p-5 rounded-xs shadow">
                <ul class="list-unstyled">
                  <li
                    class="d-flex mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                   
                    <div class="pl-3" style={{ textAlign: 'center' }}>
                    <img src={Address3} alt="Address" width="40%" height="40%"  />
                  
                      <h6 class="text-dark">United Arab Emirates</h6>
                      <ul class="list-unstyled">
                        <li>{address1 && address1.description}</li>
           
                      </ul>
                    </div>
                  </li>
                 
   
                </ul>
              </div>
            </div> */}
            </Row>
          </div>
        
        </div>
      </section>
    </>
  );
}
