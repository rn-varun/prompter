import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Prompt",
  description: "share ai prompt",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
