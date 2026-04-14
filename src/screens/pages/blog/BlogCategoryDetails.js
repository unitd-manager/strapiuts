import PropTypes from "prop-types";
import React from "react";
import { setActiveSorts } from "./BlogCategory";

const BlogCategory = ({ categories, getSortParams }) => {
  return (

<div class="widget">
<h4>Category</h4>
<ul class="list-styled list-bordered">
        {categories ? (
           <li> 
          
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="list-styled list-bordered">
                    <button
                      onClick={e => {
                        getSortParams("category", category.category_id);
                        setActiveSorts(e);
                      }}
                    >
                      {" "}
                      <a
              class="text-color d-block py-3" 
              href="/#/blogs"
            > {category.category_title}{" "}</a>
                    </button>
                  </div>
                </li>
              );
            })}
          </li>
          
        ) : (
          "No categories found"
        )}
        </ul>
      </div>
  
  );
};

BlogCategory.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default BlogCategory