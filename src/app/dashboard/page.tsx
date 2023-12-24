import Container from "@/components/container";
import Header from "@/components/header";
import DashboardHeader from "@/components/panelheader";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container>
        <DashboardHeader />
        Página dashboard
      </Container>
    </>
  );
};

export default Dashboard;
