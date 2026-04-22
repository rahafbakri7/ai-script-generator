import "./globals.css";

export const metadata = {
  title: "AI Script Generator",
  description: "Generate video scripts with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden z-0">


  {/* background layer */}
  <div className="fixed inset-0 -z-20 overflow-hidden">

    <div className="glow-purple" />
    <div className="glow-blue" />
  </div>

  {/* content */}
  <div className="relative z-10">
    {children}
  </div>

</body>

    </html>
  );
}
