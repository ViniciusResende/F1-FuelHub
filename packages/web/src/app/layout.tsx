import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/index.scss";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],   
  style: ["normal", "italic"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "F1 - Fuel Hub",
  description: "F1-FuelHub is your fast lane to live standings, driver stats, car tech and circuit insights—everything a Formula 1 fan needs, turbocharged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="../assets/favicon/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="../assets/favicon/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../assets/favicon/favicon-16x16.png"
        />
    <link rel="manifest" href="../src/assets/favicon/site.webmanifest" />
      </head>
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
