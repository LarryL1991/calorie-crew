import { UserButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";



export default function Home() {
  return (
  <>
  <Header/>
  <Hero/>
  <Feature/>
   <h1>You're not supposed to be here, traveler</h1>
  </>
  );
}

