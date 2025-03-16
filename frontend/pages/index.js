import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../src/app/globals.css";


export default function Home() {
    return (
        <div classname="bg-white">
            <Navbar></Navbar> 
            <MainSection></MainSection>
            <Footer></Footer>

        </div>
    );
  }

