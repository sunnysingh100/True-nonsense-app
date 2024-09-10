import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-auto min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
