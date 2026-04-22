import React,{useState} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../constants/api';
import {Link} from 'react-router-dom'

export default function Header({style}) {
  
  const [menus, setMenus] = useState([])
  const [hoveredSection, setHoveredSection] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  React.useEffect(() => {
    AOS.init();
    getMenus();
    
  }, [])
const getMenus = async () => {
  try {
    // Step 1: Fetch sections for navigation
    const sectionsRes = await api.get("/api/sections?pagination[pageSize]=100&filters[show_in_nav][$eq]=true");
    const sections = sectionsRes?.data?.data || [];
    
    console.log("Sections fetched:", sections);

    // ✅ Filter: has seo_title (exclude system tables)
    const filtered = sections.filter((item) => item.seo_title);
    
    // ✅ sort by sort_order
    const sorted = filtered.sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );

    // ✅ Remove duplicates (by lowercase section_title)
    const seen = new Set();
    const deduplicated = sorted.filter((section) => {
      const key = section.section_title?.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    
    console.log("Deduplicated sections:", deduplicated);

    // Step 2: Fetch categories with subcategories populated
    let allCategories = [];
    try {
      let categoriesRes;
      try {
        // Try fetching categories with populate to get subcategories as a relationship
        categoriesRes = await api.get("/api/categories?pagination[pageSize]=1000&populate=sub_categories");
        console.log("Categories with populate=sub_categories succeeded");
      } catch (e1) {
        console.log("populate=sub_categories failed, trying populate=subcategories...");
        try {
          categoriesRes = await api.get("/api/categories?pagination[pageSize]=1000&populate=subcategories");
          console.log("Categories with populate=subcategories succeeded");
        } catch (e2) {
          console.log("populate=subcategories failed, trying populate=*...");
          categoriesRes = await api.get("/api/categories?pagination[pageSize]=1000&populate=*");
          console.log("Categories with populate=* succeeded");
        }
      }
      
      allCategories = categoriesRes?.data?.data || [];
      console.log("All categories from API:", allCategories);
      
      // Debug: log structure of first category to see subcategories structure
      if (allCategories.length > 0) {
        console.log("First category structure:", JSON.stringify(allCategories[0], null, 2));
      }
    } catch (err) {
      console.log("Categories fetch error:", err.response?.status, err.response?.data);
      allCategories = [];
    }

    // ✅ Group categories by section_id
    const categoryBySection = {};
    deduplicated.forEach((section) => {
      categoryBySection[section.id] = [];
    });

    allCategories.forEach((category) => {
      // Handle both flat and nested attributes structure
      const categoryData = category.attributes ? category.attributes : category;
      const sectionId = categoryData.section_id;
      
      console.log(`Category "${categoryData.category_title}" has section_id:`, sectionId);
      
      if (sectionId && categoryBySection[sectionId]) {
        categoryBySection[sectionId].push(category);
      }
    });

    console.log("Categories grouped by section:", categoryBySection);

    // Step 3: Check if subcategories are already in categories from populate
    // If not, try to fetch them separately
    console.log("Checking for subcategories in categories...");
    let allSubcategories = [];
    
    // First check if categories have subcategories from populate
    allCategories.forEach((category) => {
      const categoryData = category.attributes ? category.attributes : category;
      const possibleSubcatFields = [
        'sub_categories',
        'subcategories',
        'sub_category',
        'subCategory',
        'subCategories',
      ];
      
      for (const field of possibleSubcatFields) {
        if (categoryData[field] && Array.isArray(categoryData[field])) {
          console.log(`Found subcategories in category field "${field}":`, categoryData[field]);
          if (!allSubcategories.includes(...categoryData[field])) {
            allSubcategories.push(...categoryData[field]);
          }
        }
      }
    });

    if (allSubcategories.length === 0) {
      console.log("No subcategories found in categories, trying to fetch using category_id filter...");
      
      // Get all unique category IDs
      const categoryIds = allCategories.map(cat => cat.id);
      console.log("Category IDs to fetch subcategories for:", categoryIds);
      
      // Try to fetch all subcategories with a filter for these category IDs
      const subcategoryEndpoints = [
        `/api/subcategories?pagination[pageSize]=1000&filters[category_id][$in]=${categoryIds.join(',')}`,
        "/api/subcategories?pagination[pageSize]=1000",
        "/api/subcategory?pagination[pageSize]=1000",
      ];

      for (const endpoint of subcategoryEndpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint.substring(0, 80)}...`);
          const subcatsRes = await api.get(endpoint);
          allSubcategories = subcatsRes?.data?.data || [];
          
          if (allSubcategories.length > 0) {
            console.log(`✅ Success! Found ${allSubcategories.length} subcategories`);
            
            if (allSubcategories.length > 0) {
              console.log("First subcategory structure:", JSON.stringify(allSubcategories[0], null, 2));
            }
            break;
          } else {
            console.log(`Response received but no data. Status:`, subcatsRes?.status);
          }
        } catch (err) {
          console.log(`❌ Failed:`, err.response?.status, err.response?.statusText);
          continue;
        }
      }
    }

    console.log("Total subcategories collected:", allSubcategories.length);

    // ✅ Group subcategories by category_id
    const subcategoryByCategory = {};
    allSubcategories.forEach((subcat) => {
      const subcatData = subcat.attributes ? subcat.attributes : subcat;
      const categoryId = subcatData.category_id;
      
      console.log(`Subcategory "${subcatData.sub_category_title}" belongs to category_id:`, categoryId, `subcategory id: ${subcat.id}`);
      
      if (categoryId) {
        if (!subcategoryByCategory[categoryId]) {
          subcategoryByCategory[categoryId] = [];
        }
        subcategoryByCategory[categoryId].push(subcat);
      }
    });

    console.log("✅ Subcategories grouped by category_id:", subcategoryByCategory);

    // ✅ Transform to menu structure
    const menuArray = deduplicated.map((section) => {
      const sectionCategories = categoryBySection[section.id] || [];
      
      console.log(`Section "${section.section_title}" (id: ${section.id}) has ${sectionCategories.length} categories`);
      
      // Flatten categories with their subcategories
      const value = sectionCategories.flatMap((category) => {
        const categoryData = category.attributes ? category.attributes : category;
        const categoryId = category.id;
        
        // Try to get subcategories from either:
        // 1. Direct populate in category
        let subcategories = categoryData.sub_categories || categoryData.subcategories || categoryData.sub_category || categoryData.subCategory || categoryData.subCategories || [];
        
        // 2. Or from separately fetched and grouped data
        if (!Array.isArray(subcategories) || subcategories.length === 0) {
          subcategories = subcategoryByCategory[categoryId] || [];
        }
        
        console.log(`  Category "${categoryData.category_title}" (id: ${categoryId}) has ${subcategories.length} subcategories`, subcategories);
        
        // Handle nested structure
        if (Array.isArray(subcategories) && subcategories.length > 0) {
          return subcategories.map((subcat) => {
            const subcatData = subcat.attributes ? subcat.attributes : subcat;
            return {
              seo_title: section.seo_title,
              category_title: categoryData.category_title,
              sub_category_title: subcatData.sub_category_title,
              sub_category_id: subcat.id,
            };
          });
        } else {
          // Category with no subcategories
          return {
            seo_title: section.seo_title,
            category_title: categoryData.category_title,
            sub_category_title: null,
            sub_category_id: null,
          };
        }
      });

      // If no categories, add default entry
      if (value.length === 0) {
        value.push({
          seo_title: section.seo_title,
          category_title: null,
          sub_category_title: null,
          sub_category_id: null,
        });
      }

      return {
        section_title: section.section_title,
        seo_title: section.seo_title,
        value: value,
      };
    });

    console.log("Final menu array:", menuArray);
    setMenus(menuArray);
  } catch (err) {
    console.log("Menu API error:", err);
    console.log("Error details:", err.response?.data);
    
    // Fallback: simple sections only
    try {
      const fallbackRes = await api.get("/api/sections?pagination[pageSize]=100");
      const fallbackSections = fallbackRes?.data?.data || [];
      const fallbackMenuArray = fallbackSections
        .filter((item) => item.show_in_nav === true && item.seo_title)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((section) => ({
          section_title: section.section_title,
          seo_title: section.seo_title,
          value: [
            {
              seo_title: section.seo_title,
              category_title: null,
              sub_category_id: null,
            },
          ],
        }));
      setMenus(fallbackMenuArray);
      console.log("Using fallback menu structure");
    } catch (fallbackErr) {
      console.log("Fallback menu API error:", fallbackErr);
    }
  }
};

  // const getBlogs = () =>{
  //   api.post('/getMenu').then(res=>{
     
  //     let loopData = res.data.data
  //     var result = loopData.reduce(function (r, a) {
  //         r[a.section_title] = r[a.section_title] || [];
  //         r[a.section_title].push(a);
  //         return r;
  //     }, Object.create(null));
     
  //     let menuArray = [];
  //     Object.keys(result).forEach(function(key, index) {
  //       menuArray.push({section_title:key,value:result[key]})
  //     });
  //     setMenus(menuArray)
  //     //console.log(menuArray)
     
  //   })
    
  // }
  const getFormatedText = (section_title) =>{
    var formatedd = section_title.toLowerCase()
    return formatedd.split(' ').join('-')
  }

  // Extract unique categories for a section
  const getCategories = (section) => {
    const categories = [];
    const categoryMap = new Map();
    
    section.value.forEach(item => {
      if (item.category_title && !categoryMap.has(item.category_title)) {
        categoryMap.set(item.category_title, {
          category_title: item.category_title,
          seo_title: item.seo_title,
        });
        categories.push(categoryMap.get(item.category_title));
      }
    });
    
    return categories;
  };

  // Get subcategories for a specific category
  const getSubcategories = (section, categoryTitle) => {
    return section.value.filter(
      item => item.category_title === categoryTitle && item.sub_category_title
    );
  };

 console.log('menu values', menus)
  return (
    <>
     <div style={style} className="naviagtion naviagtion-white fixed-top transition">
    <div className="container">
     <nav className="navbar navbar-expand-lg navbar-light p-0">
      <a className="navbar-brand p-0" href=""><img style={{width:200,height:100}} src="logo-dark.svg" alt="Agico" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" 
          aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
          <div className="collapse navbar-collapse text-center" id="navigation">
          <ul className="navbar-nav mx-auto">
            
           {menus.map((data, sectionIdx) => {
            const categories = getCategories(data);
            const hasCategories = categories.length > 0;

            if (hasCategories) {
              return (
                <li 
                  className="nav-item dropdown menu-with-hover" 
                  key={sectionIdx}
                  onMouseEnter={() => {
                    console.log("Hovering section:", sectionIdx);
                    setHoveredSection(sectionIdx);
                  }}
                  onMouseLeave={() => {
                    console.log("Left section:", sectionIdx);
                    setHoveredSection(null);
                    setHoveredCategory(null);
                  }}
                >
                  <a 
                    className="nav-link text-dark dropdown-toggle" 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    data-toggle="dropdown"
                    aria-haspopup="true" 
                    aria-expanded={hoveredSection === sectionIdx}
                  >
                    {data.section_title}
                  </a>
                  
                  {hoveredSection === sectionIdx && (
                    <div 
                      className="dropdown-menu show"
                      onMouseEnter={() => setHoveredSection(sectionIdx)}
                      onMouseLeave={() => {
                        setHoveredSection(null);
                        setHoveredCategory(null);
                      }}
                    >
                      {categories.map((category, catIdx) => {
                        const subcategories = getSubcategories(data, category.category_title);
                        const hasSubcategories = subcategories.length > 0;
                        const categoryKey = `${sectionIdx}-${catIdx}`;

                        if (hasSubcategories) {
                          return (
                            <li 
                              className="nav-item dropdown category-item" 
                              key={categoryKey}
                              onMouseEnter={() => {
                                console.log("Hovering category:", categoryKey);
                                setHoveredCategory(categoryKey);
                              }}
                              onMouseLeave={() => {
                                console.log("Left category:", categoryKey);
                                setHoveredCategory(null);
                              }}
                            >
                              <a 
                                className="dropdown-item text-dark1 dropdown-toggle" 
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                data-toggle="dropdown"
                                aria-haspopup="true" 
                                aria-expanded={hoveredCategory === categoryKey}
                              >
                                {category.category_title}
                              </a>
                              
                              {hoveredCategory === categoryKey && (
                                <div 
                                  className="dropdown-submenu show"
                                  onMouseEnter={() => setHoveredCategory(categoryKey)}
                                  onMouseLeave={() => setHoveredCategory(null)}
                                >
                                  {subcategories.map((subcat, subcatIdx) => (
                                    <Link 
                                      key={subcatIdx}
                                      to={`/${data.seo_title}/${getFormatedText(category.category_title)}/${getFormatedText(subcat.sub_category_title)}`}
                                      className="dropdown-item text-dark"
                                      onClick={() => {
                                        setHoveredSection(null);
                                        setHoveredCategory(null);
                                      }}
                                    >
                                      {subcat.sub_category_title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </li>
                          );
                        } else {
                          return (
                            <Link 
                              key={categoryKey}
                              to={`/${data.seo_title}/${getFormatedText(category.category_title)}`}
                              className="dropdown-item text-dark"
                              onClick={() => {
                                setHoveredSection(null);
                                setHoveredCategory(null);
                              }}
                            >
                              {category.category_title}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  )}
                </li>
              );
            } else {
              const seo = data.seo_title || "";
              return (
                <li className="nav-item" key={sectionIdx}>
                  <Link to={'/products/' + seo} className="nav-link text-dark">{data.section_title}</Link>
                </li>
              );
            }
           })}
          </ul>
          <a href="/#/contact-us" className="btn btn-outline-primary text-white ml-3">Enquiry now</a>
          </div>
      </nav>
    </div>
  </div> 
    </>
  )
}
