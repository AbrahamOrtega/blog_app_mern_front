import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function TopLoadingLine() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setLoadingProgress(80);
    };

    const handleComplete = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setLoadingProgress(0);
      }, 500);
    };

    // add event listener for page loading
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // remove event listener
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      <div
        className="topLoadingLine"
        style={{ width: `${loadingProgress}%` }}
      ></div>
    </>
  );
}
