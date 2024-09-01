import { FaArrowUp } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // show or hide the scroll button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // add scroll event listener when component is mounted
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        className={`scrollToTop ${isVisible ? "show" : "hide"}`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    </>
  );
}
