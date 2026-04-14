
import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={pageNumber === currentPage ? 'active' : ''}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  export default Pagination