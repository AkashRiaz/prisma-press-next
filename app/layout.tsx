import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Link href="/">Home</Link>
        <Link href="/blogs">Blogs</Link>
        {children}
      </body>
    </html>
  );
}
