import Footer from "@/components/footer";
import Header from "@/components/shared/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col ">
      <Header />
      <main className="flex flex-1 wrap-normal px-4"> {children}</main>
      <Footer />
    </div>
  );
}
