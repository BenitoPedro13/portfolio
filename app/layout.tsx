import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
    </head>
    <body>
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
