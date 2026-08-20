import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div id="page-content" className="page-content flex flex-1 flex-col">
        {children}
        <Footer />
      </div>
    </>
  );
}
