import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListLayout from "@/components/ListLayout";
import DashboardAttraction from "@/components/DashboardAttraction";
import { API_URL } from "@/config/index";

export default function DashboardPage({ attractions = [], token }) {
  const router = useRouter();
  const deleteAttraction = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/attractions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <h2 className="text-neutral-content">My Posts</h2>
        {attractions.map(({ id, attributes }) => (
          <DashboardAttraction
            key={id}
            id={id}
            attributes={attributes}
            handleDelete={deleteAttraction}
          />
        ))}
      </div>
    </>
  );
}
DashboardPage.getLayout = function getLayout(page) {
  return (
    <Layout title="User Dashboard">
      <ListLayout>{page}</ListLayout>
    </Layout>
  );
};
export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/attractions/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return {
    props: {
      attractions: response.data || [],
      token,
    },
  };
}
