import Header from "components/home/Header";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/Layout";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Navbar />
      <div data-scroll-section className="pt-0 pb-0">
        <Header />
      </div>
      <Footer />
    </Layout>
  );
}
export default Home;
