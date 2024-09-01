import Link from "next/link";
import { IoMoonSharp, IoSearchSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/Loading";

export default function Header() {
  // searchbar open and close
  const [searchopen, setSearchopen] = useState(false);
  //For open searchbar
  const openSearch = () => {
    setSearchopen(!searchopen);
  };
  //for close searchbar
  const closeSearch = () => {
    setSearchopen(false);
  };

  //asidebar for mobile device
  const [aside, setAside] = useState(false);

  const openAside = () => {
    setAside(!aside);
  };

  const closeAside = () => {
    setAside(false);
  };

  //for close aside when link click
  const handleLinkClick = () => {
    setAside(false);
  };

  //Dark mode on and off
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // check local storage for dark mode preference on initial load
    const isDarkMode = localStorage.getItem("darkMode") == "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // apply dark mode class to body based on dark mode preference
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // toggle dark mode state
  };

  //search data fetch
  const { alldata, loading } = useFetchData("/api/getblog");

  // filtering publish blogs
  const publishedblogs = alldata.filter((blog) => blog.status === "publish");

  const [searchQuery, setSearchQuery] = useState("");
  // filtering based on search query search data from title
  const filteredblogs =
    searchQuery.trim() === ""
      ? publishedblogs
      : publishedblogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link href="/">WELCOME</Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            <input
              onClick={openSearch}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="nav_list_dark">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="">About Me</Link>
              </li>
              <li>
                <Link href="">Contact</Link>
              </li>
            </ul>
            {/* For Mobile */}
            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkMode}>
                {darkMode ? <IoMoonSharp /> : <LuSun />}
              </button>
              <button>
                <IoSearchSharp />
              </button>
              <button onClick={openAside}>
                <HiBars3BottomRight />
              </button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchopen ? "open" : ""}`}>
          <div className="searchab_input ">
            <IoSearchSharp />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="search_data text-center">
            {loading ? (
              <div className="wh_100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {searchQuery ? (
                  <>
                    {filteredblogs.slice(0, 3).map((blog) => {
                      return (
                        <Link
                          className="blog"
                          key={blog._id}
                          onClick={closeSearch}
                          href={`/blog/${blog.slug}`}
                        >
                          <div className="bloginfo">
                            <div>
                              <h3>{blog.slug}</h3>
                            </div>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Aliquid obcaecati,
                              exercitationem numquam commodi optio quas vitae
                              voluptates molestias suscipit tempore.
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <div>No Search Result</div>
                )}
              </>
            )}
          </div>
          <div className="exit_search" onClick={closeSearch}>
            <div>
              <FaXmark />
            </div>
            <h4>Esc</h4>
          </div>
        </div>
        {/* For Mobile list*/}
        <div className={aside ? "navlist_mobile open" : "navlist_mobile"}>
          <div className="navlist_m_title flex flex-sb">
            <h1>WELCOME</h1>
            <button onClick={closeAside}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main Menu</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">About Me</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul>
            <li>
              <Link href="/topics/htmlcssjs">Html Css Js</Link>
            </li>
            <li>
              <Link href="/topics/nextjs">Next Js</Link>
            </li>
            <li>
              <Link href="/topics/database">Database</Link>
            </li>
            <li>
              <Link href="/topics/deployment">Deployment</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
