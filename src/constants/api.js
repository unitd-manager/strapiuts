import axios from "axios";
const api = axios.create({
    //baseURL: 'https://unitdweb.unitdtechnologies.com:3003/api'
   baseURL: 'http://localhost:1337'
  //baseURL: 'https://tidy-light-2ab5c4f13a.strapiapp.com'
  });
  export default api;