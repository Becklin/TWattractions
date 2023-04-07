import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div></div>
      <h1>
        <FaExclamationTriangle />
        404
      </h1>
      <p>Page ot Found</p>
      <Link href="/">Home</Link>
    </Layout>
  );
}
