import Header from "../componenets/home/Header";
import Banner from "../componenets/home/Banner";
import FilterSection from "../componenets/home/FilterSection";
import OfferSection from "../componenets/home/OfferSection";
import Contact from "../componenets/home/Contact";
import Footer from "../componenets/home/Footer";
const Home = () => {
  return (
    <div className="  font-montserrat relative bg-white ">
      <Header />

      <Banner />
      
        <FilterSection />
   

      <OfferSection />

      <Contact />

      <Footer />
    </div>
  );
};

export default Home;
