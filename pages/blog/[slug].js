import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { FaHtml5 } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

export default function blogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error in fetch blog data:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  //markdown code highlighter
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    const [copied, setCopied] = useState();
    //copy code
    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); //reset copied state after 3 seconds
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            coderTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">
              {loading ? <div>Loading...</div> : blog && blog[0]?.title}
            </h1>
            <h5>
              By <span>Abraham Ortega</span>. Published in{" "}
              <span>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  blog && blog[0]?.blogcategory
                )}
              </span>{" "}
              .{" "}
              {blog &&
                new Date(blog[0]?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
              <span>. 1 min read</span>
            </h5>
          </div>

          {/* blog data section */}
          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh-100 flex flex-center mt-3">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="w-100 blogcontent">
                    <ReactMarkdown
                      remarkPlugins={remarkGfm}
                      components={{ code: Code }}
                    >
                      {blog[0].description}
                    </ReactMarkdown>
                  </div>
                </>
              )}
            </div>
            <div className="rightslug_data">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="slug_profile_img">
                    <img
                      style={{ width: "160px" }}
                      src="/img/profile.png"
                      alt="author"
                    />
                  </div>
                </div>
                <h3>Abraham Ortega</h3>
                <h4>Website Developer</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                </div>
              </div>
              <div className="topics_sec">
                <h2>Topics</h2>
                <div className="topics_list">
                  <Link href={"/topics/htmlcssjs"}>
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FaHtml5 />
                      </div>
                      <h3>HTML, CSS & JS</h3>
                    </div>
                  </Link>
                  <Link href={"/topics/nextjs"}>
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <TbBrandNextjs />
                      </div>
                      <h3>Next JS, React JS</h3>
                    </div>
                  </Link>
                  <Link href={"/topics/database"}>
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FiDatabase />
                      </div>
                      <h3>Database</h3>
                    </div>
                  </Link>
                  <Link href={"/topics/deployment"}>
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <AiOutlineDeploymentUnit />
                      </div>
                      <h3>Deployment</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
