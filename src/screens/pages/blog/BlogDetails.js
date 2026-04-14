// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import AOS from "aos";
// import { useParams } from "react-router-dom";
// import api from "../../../constants/api";
// import ReactHtmlParser from "react-html-parser";
// import imageBase from "../../../constants/image.js";

// export default function BlogDetails(props) {
//   const [blogs, setBlogs] = useState([]);
//   const { title } = useParams();

//   const getBlogs = () => {
//     var formated = title.split("-").join(" ");
//     api.post("/getBlogTitle", { title: formated }).then((res) => {
//       setBlogs(res.data.data);
//     });
//   };

//   const getFormatedText = (title) => {
//     var formatedd = title.toLowerCase();
//     return formatedd.split(" ").join("-");
//   };
//   //const [data, setData] = useState([]);
//   console.log(blogs);
//   console.log(getFormatedText);
//   const location = useLocation();
//   console.log(props, " props");
//   console.log(location, " useLocation Hook");
//   const data = location.state?.data;
//   // React.useEffect(() => {
//   //   AOS.init();
//   //   getBlogs();

//   //   // Check if 'data' is available in location state
//   //   if (location.state && location.state.data) {
//   //     setData(location.state.data);
//   //   }
//   // }, [location.state]);

//   React.useEffect(() => {
//     AOS.init();
//     getBlogs();
//     //getCategory();

//   }, []);
//   return (
//     <>
//       <section
//         class="page-title page-title-overlay bg-cover overflow-hidden"
//         data-background="assets/images/background/about.jpg"
//       >
//         <div class="container">
//           <div class="row">
//             <div class="col-lg-7">
//               <h1 class="text-white position-relative">{title}</h1>
//             </div>
//             <div class="col-lg-3 ml-auto align-self-end">
//               <nav class="position-relative zindex-1" aria-label="breadcrumb">
//                 <ol class="breadcrumb justify-content-lg-end bg-transparent mb-4 px-0">
//                   <li class="breadcrumb-item">
//                     <a href="index.html" class="text-white">
//                       Home
//                     </a>
//                   </li>
//                   <li
//                     class="breadcrumb-item text-white fw-bold"
//                     aria-current="page"
//                   >
//                     Blog Details
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section class="section">
//         <div class="container">
//           <div class="row">
//             <div class="col-lg-8 rounded-sm pr-5">
//               {blogs.map((data) => {
//                 return (
//                   <div>
//                     {/* {data ? data.title : "Go to Home"} */}
//                     <h3 class="mb-3 text-dark">{data.title}</h3>
//                     <img
//                       src={`${imageBase}${data.file_name}`}
//                       className="irounded-sm img-fluid w-100 mb-5"
//                       alt="post-thumb"
//                     />
//                     {/* <img src="assets/images/men/lg-img-1.jpg" class="rounded-sm img-fluid w-100 mb-5" alt="post-thumb"/> */}
//                     {/* <p class="text-color card-date position-relative d-inline-block">
//                 {moment(data.date.substring(0, 10), "YYYY-MM-DD").format(
//                   "MMMM Do YYYY"
//                 )}
//               </p> */}

//                     <p></p>
//                     <p>{ReactHtmlParser(data.description)}</p>
//                     <div class="my-5">
//                       <h5 class="d-inline-block mr-3">Share:</h5>
//                       <ul class="list-inline d-inline-block">
//                         <li class="list-inline-item">
//                           <a href="index.html" class="text-color">
//                             <i class="fa fa-facebook"></i>
//                           </a>
//                         </li>
//                         <li class="list-inline-item">
//                           <a href="index.html" class="text-color">
//                             <i class="fa fa-twitter"></i>
//                           </a>
//                         </li>
//                         <li class="list-inline-item">
//                           <a href="index.html" class="text-color">
//                             <i class="fa fa-linkedin"></i>
//                           </a>
//                         </li>
//                         <li class="list-inline-item">
//                           <a href="index.html" class="text-color">
//                             <i class="fa fa-google-plus"></i>
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             {/* <div class="col-lg-4">
//               <div class="rounded-sm shadow bg-white pb-4">
//               <div class="widget">
//      <h4>Latest Article</h4>
//       <ul class="list-unstyled list-bordered">
//       {blogs && blogs.slice(0, 3).map(data=>(
//           <li class="media border-bottom py-3">
//             <img src={`${imageBase}${data.file_name}`} class="rounded-sm mr-3" alt="post-thumb" />
//            <img src="assets/images/men/sm-img-1.jpg" class="rounded-sm mr-3" alt="post-thumb"/> 
//           <div class="media-body">
           
//             <h6 class="mt-0"> <Link
//                             to={getFormatedText(data.title)}
//                             state={{ data: data }}
//                             className="text-dark">{data.title}</Link></h6>
            
//           </div>
//           </li>

//       ))}
//       </ul>
//       </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import AOS from "aos";
import api from "../../../constants/api";
import ReactHtmlParser from "react-html-parser";

export default function BlogDetails() {
  const [blogs, setBlogs] = useState([]);
  const { title } = useParams();
  const location = useLocation();
  const stateData = location.state?.data;

  const slugToTitle = (slug) => {
    return decodeURIComponent(slug || "").split("-").join(" ");
  };

  const getFormatedText = (value) => {
    return String(value || "").toLowerCase().split(" ").join("-");
  };

  const getBlogImage = (blog) => {
    if (blog?.images?.length > 0) {
      return (
        blog.images[0]?.formats?.large?.url ||
        blog.images[0]?.formats?.medium?.url ||
        blog.images[0]?.formats?.small?.url ||
        blog.images[0]?.formats?.thumbnail?.url ||
        blog.images[0]?.url
      );
    }
    return "/assets/images/no-image.png";
  };

  const getBlogs = async () => {
    try {
      const formattedTitle = slugToTitle(title);

      const res = await api.get("/api/blogs", {
        params: {
          "filters[title][$eq]": formattedTitle,
          "populate[0]": "images",
        },
      });

      const blogData = res?.data?.data || [];

      if (blogData.length > 0) {
        setBlogs(blogData);
      } else if (stateData) {
        setBlogs([stateData]);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.log("Blog details fetch error:", error);

      if (stateData) {
        setBlogs([stateData]);
      }
    }
  };

  useEffect(() => {
    AOS.init();
    getBlogs();
  }, [title]);

  return (
    <>
      <section
        className="page-title page-title-overlay bg-cover overflow-hidden"
        data-background="assets/images/background/about.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h1 className="text-white position-relative">
                {blogs[0]?.title || slugToTitle(title)}
              </h1>
            </div>
            <div className="col-lg-3 ml-auto align-self-end">
              <nav className="position-relative zindex-1" aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end bg-transparent mb-4 px-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/blog" className="text-white">
                      Blog
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white fw-bold"
                    aria-current="page"
                  >
                    Blog Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 rounded-sm pr-5">
              {blogs.length > 0 ? (
                blogs.map((data) => (
                  <div key={data.id}>
                    <h3 className="mb-3 text-dark">{data.title}</h3>

                    <img
                      src={getBlogImage(data)}
                      className="rounded-sm img-fluid w-100 mb-5"
                      alt={data.title || "post-thumb"}
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                    />

                    <div>{ReactHtmlParser(data.description || "")}</div>

                    <div className="my-5">
                      <h5 className="d-inline-block mr-3">Share:</h5>
                      <ul className="list-inline d-inline-block">
                        <li className="list-inline-item">
                          <a href="/" className="text-color">
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="/" className="text-color">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="/" className="text-color">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="/" className="text-color">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h4>No blog found</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}