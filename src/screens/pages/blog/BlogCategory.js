import api from "../../../constants/api";

export const getSortedCategories = (categories, sortType, sortValue) => {
    if (sortType && sortValue) {
      if (sortType === "categories") {
        // return products.filter(
        //   product => product.category.filter(single => single === sortValue)[0]
        // );
       const getvalues=async()=>{
  
       
       const sorted= await api.post('/getBlogByCategory',{category_id:sortValue})
     
       .then((res)=>{
        console.log(res.data.data)
          return res.data.data
          
        }).then((result)=>{
          console.log(result)
            return result
            
          }).catch((err)=>{
          console.log(err)
        })
     
          return sorted
      }
      const pro=getvalues();
      return pro
      }
         if (sortType === "filterSort") {
        let sortProducts = [...categories];
        if (sortValue === "default") {
          return sortProducts;
        }
        
      }
    }
    return categories;
  };
  export const setActiveSorts = e => {
    const filterButtons = document.querySelectorAll(
      ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
    );
    filterButtons.forEach(item => {
      item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };