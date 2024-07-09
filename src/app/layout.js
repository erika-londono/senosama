import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import AppStateProvider from "@/context/appStateProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SENOSama",
  description: "SENOSama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <AppStateProvider>
          <ToastContainer
            autoClose={3500}
            theme="dark"
            position="bottom-center"
            transition={Slide}
            style={{ width: "fit-content" }}
          />
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
