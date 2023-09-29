import { UserButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function Home() {
  return (
  <>
    <Header/>
    <Hero/>
    <Feature/>
    <Footer/>
  </>
  );
}

