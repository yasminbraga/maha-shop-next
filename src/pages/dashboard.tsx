import { getAPIClient } from "@/services/axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import React from "react";

const Dashboard: React.FC = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1>Página inicial</h1>
      <p>{user?.name}</p>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["maha-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const response = await apiClient.get("client");
  const user = response.data;
  return {
    props: { user },
  };
};
