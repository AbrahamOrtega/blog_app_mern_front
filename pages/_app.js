import "@/styles/globals.css";
import Header from "@/components/Header";
import AosA from "@/components/Aos";
import Footer from "@/components/Footer";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import TopLoadingLine from "@/components/TopLoadingLine";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <TopLoadingLine />
        <AosA />
        <Component {...pageProps} />
        <ScrollToTopBtn />
      </main>
      <Footer />
    </>
  );
}
