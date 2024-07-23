import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GetMeaChai - Home",
  description: "GetMeaChai - We buy a chai to your favorite creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:text-white`}>
        <SessionWrapper>
          <header className="dark:bg-blue-950">
            <Navbar />
          </header>
          <main className="min-h-[86.5vh] bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
            {children}
          </main>
          <footer className="dark:bg-blue-950">
            <Footer />
          </footer>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          {/* Same as */}
          <ToastContainer />
        </SessionWrapper>
      </body>
    </html>
  );
}
