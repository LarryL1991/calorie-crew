// import Navbar from "@/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
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


