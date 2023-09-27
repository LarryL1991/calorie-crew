import Navbar from "@/components/Navbar";
import "../styles/Home.css";
import "../styles/Navbar.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}


