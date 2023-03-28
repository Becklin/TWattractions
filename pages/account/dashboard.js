import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ListLayout from "@/components/ListLayout";
import DashboardAttraction from "@/components/DashboardAttraction";
import { API_URL } from "@/config/index";

export default function DashboardPage({ attractions, token }) {
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
        <h1>Dashboard</h1>
        <h3>My Posts</h3>
        {attractions.map((attraction) => (
          <DashboardAttraction
            key={attraction.id}
            attraction={attraction}
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

  const res = await fetch(`${API_URL}/attractions/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const attractions = await res.json();
  return {
    props: {
      attractions,
      token,
    },
  };
}
