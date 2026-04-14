import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
// import Address1 from "../../../assets/images/attachments/digital.png";
import Address1 from "../../../assets/images/attachments/Digital2.jpg";

const apiInsertContact = axios.create({
  baseURL: 'http://43.228.126.245:3007',
});

export default function Offer() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [user, setUser] = useState({
    lead_title: "",
    email: "",
    source_of_lead: ""
  });

  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onFinish = (value) => {
    if (!formSubmitted) {
      const urlSearchParams = new URLSearchParams(window.location.search);
const utmSource = urlSearchParams.get("utm_source");
console.log("Full URL:", window.location.href);
console.log("Extracted utmSource:", utmSource);
  
      const leadData = {
        ...value,
        source_of_lead: utmSource,
      };
      
  
      console.log("Lead Data:", leadData);
  
      apiInsertContact
      .post("/lead/insertLeadCompany", leadData)
      .then((res) => {
        console.log("Response from API:", res.data);
        setFormSubmitted(true);
        message.success({
          content: "Thanks for giving your Email",
            // onClose: () => (window.location.href = "/"),
          });
        })
        .catch((err) => {
          console.log('Error inserting contact data:', err);
          message.error('Error inserting contact data. Please try again later.');
        });
    } else {
      message.warning("Form already submitted");
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section style={{ paddingTop: 150 }} className="section section-lg bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="container center" style={{ width: "200%", height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="pl-3" style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <img src={Address1} alt="Address" width="90%" height="90%" />
                </div>
                <div style={{ maxWidth: "600px", width: '100%', border: "3px solid #007bff", borderRadius: "5px", padding: "20px" }}>
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="lead_title"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        name="lead_title"
                        value={user.lead_title}
                        onChange={(event) => handleChange(event)}
                        placeholder="Name"
                        style={{ width: "100%", color: "blue" }}
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
                        style={{ width: "100%", color: "blue" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          type="primary"
                          onClick={onFinish}
                          shape="round"
                          size="large"
                          htmlType="submit"
                          className="login-form-button"
                          style={{
                            width: '100%',
                            padding: '0px',
                            fontSize: '30px',
                            backgroundColor: 'red',
                            border: 'none',
                            lineHeight: '1',
                          }}
                        >
                          GET OFFER
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
