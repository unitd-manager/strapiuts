import React,{useState} from 'react'
import api from '../constants/api';
import AOS from 'aos';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [menus, setMenus] = useState([])
  const [email, setEmail] = useState();
  const [companyname, setCompanyName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();

  React.useEffect(() => {
    AOS.init();
    getBlogs();
    getAddress();
    getCompanyName();
    getMobile();
    getEmail();
    window.scrollTo(0,0)
   
  }, [])



  const getBlogs = () =>{
    api.post('/getMenu').then(res=>{
     
      let loopData = res.data.data
      var result = loopData.reduce(function (r, a) {
          r[a.section_title] = r[a.section_title] || [];
          r[a.section_title].push(a);
          return r;
      }, Object.create(null));
     
      let menuArray = [];
      Object.keys(result).forEach(function(key, index) {
        menuArray.push({section_title:key,value:result[key]})
      });
      setMenus(menuArray)
      //console.log(menuArray)
     
    })
    
  }

  const getEmail = () =>{
    api.get('/getEmail').then(res=>{
      setEmail(res.data.data[0])
     })
  }
  
  const getCompanyName= () =>{
    api.get('/getCompanyName').then(res=>{
      setCompanyName(res.data.data[0])
     })
  }
  
  const getAddress = () =>{
    api.get('/getAddress').then(res=>{
      setAddress(res.data.data[0])
     })
  }
  
  const getMobile = () =>{
    api.get('/getContacts').then(res=>{
      setContact(res.data.data[0])
     })
  }
  return (
    <>
    <footer className="bg-secondary">
    <section className="section border-bottom border-color py-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-5 mb-4 mb-md-0">
            <img style={{width:200,height:100}} src="assets/images/logo/logo.svg" className="mb-4" alt="agico"/>
            <p className="text-light mb-4"></p>
            <ul className="list-inline social-icons">
              <li className="list-inline-item"><a href="https://www.facebook.com/UnitdTech" target="_blank"><i className="fa fa-facebook"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/unitedtech30" target="_blank"><i className="fa fa-instagram"></i></a></li>
              <li className="list-inline-item"><a href="https://www.linkedin.com/in/syedmagthum/" target="_blank"><i className="fa fa-linkedin"></i></a></li>
              
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4 className="text-white mb-4">Services</h4>
            <ul className="list-styled list-hover-underline">
            
           {menus.map(data=>{
            if(data.value.length > 1 ){
              let submenu = data.value
             
            }else{
              return (<Link to={'/'+data.value[0].seo_title}><li className="nav-item">
              <a className="nav-link text-light" href="">{data.section_title}</a>
            </li></Link>)
            }
           })}
            </ul>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <h4 className="text-white mb-4">Contact Info</h4>
           <ul className="list-unstyled">
              <li className="mb-3"><a className="text-light" href="mailto:admin@unitdtechnologies.com">{email&&email.mailId}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  
    <section className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p className="mb-0 text-light">Copyright &copy;
              <script>
                var CurrentYear = new Date().getFullYear()
                document.write(CurrentYear)
              </script>
              <a href="#">United Technologies</a></p>
          </div>
          <div className="col-md-6 text-md-right text-center">
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#/terms" className="text-light">Terms of Service</a></li>
              <li className="list-inline-item">| &nbsp;<a href="#/privacyPolicy" className="text-light">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </footer>
    </>
  )
}
