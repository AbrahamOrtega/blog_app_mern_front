import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { category } = router.query;

  useEffect(() => {
    // function to fetch data
    const fetchBlogdata = async () => {
      try {
        const res = await axios.get(`/api/getblog?blogcategory=${category}`);
        const alldata = await res.data;
        setBlog(alldata);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetch blog data:", error);
        setLoading(false);
      }
    };

    // fetch blog data only if category is available
    if (category) {
      fetchBlogdata();
    } else {
      router.push("/404");
    }
  }, [category]);

  // Filter publish blogs
  const publishBlogs = blog.filter((blog) => blog.status === "publish");

  //Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = publishBlogs.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    //Check if the markdown content has an image
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    //reguler expression to find the first image in the markdown  ![alt text](image url)
    const regex = /!\[.*\]\((.*)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1">
              <h1>
                {loading ? (
                  <div>Loading...</div>
                ) : currentBlogs ? (
                  currentBlogs && currentBlogs[0]?.blogcategory
                ) : (
                  currentBlogs && currentBlogs.blogcategory
                )}
              </h1>
              <span>{loading ? <div>0</div> : allblog}</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              illo mollitia repellendus quia asperiores esse minus magnam
              impedit voluptatibus ipsam.
            </p>
          </div>
          <div className="category_blogs mt-3">
            {loading ? (
              <>
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              </>
            ) : (
              <>
                {currentBlogs.map((blog) => {
                  const firstImage = extractFirstImageUrl(blog.description);
                  return (
                    <div className="cate_blog" key={blog._id}>
                      {/* if not img in markdown show no img*/}
                      <Link href={`/blog/${blog.slug}`}>
                        <img
                          src={firstImage || "/img/noImg.jpg"}
                          alt={blog.title}
                        />
                      </Link>
                      <div className="bloginfo mt-1">
                        <Link href={`/tag/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>
                        </Link>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Soluta ut reiciendis enim saepe mollitia nobis
                          maxime nostrum? Nesciunt, dignissimos qui.
                        </p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img src="/img/profile.png" alt="author" />
                          </div>
                          <div className="flex flex-col flex-left gap-5">
                            <h4>Abraham Ortega</h4>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="blogpagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers
              .slice(
                Math.max(currentPage - 3, 0),
                Math.min(currentPage + 2, pageNumbers.length)
              )
              .map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={publishBlogs.length <= perPage * currentPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
