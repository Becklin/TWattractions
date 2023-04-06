import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
