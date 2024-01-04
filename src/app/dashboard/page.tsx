"use client";
import Container from "@/components/container";
import Header from "@/components/header";
import DashboardHeader from "@/components/panelheader";
import { setupAPIClient } from "@/services/api";
import { PetType } from "@/types/PetType";
import { toCapitalize } from "@/utils/ToCapitalize";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const [myPets, setMyPets] = useState<PetType[]>([]);

  useEffect(() => {
    const getPets = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/mypets");
      setMyPets(response.data as PetType[]);
    };

    getPets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete(`/delete/${id}`);

      setMyPets(myPets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <DashboardHeader />
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPets.map((pet) => (
            <section
              className="w-full bg-white rounded-lg relative overflow-hidden"
              key={pet.id}
            >
              <button
                onClick={() => {
                  handleDelete(pet.id);
                }}
                className="absolute z-10 bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
              >
                <FiTrash2 size={26} color="#000" />
              </button>
              <img
                className="w-full bg-white relative hover:scale-105 duration-200 transition-all mb-2"
                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pet.picture}`}
              />

              <div>
                <div className="flex justify-center px-2">
                  <strong className="text-black font-medium text-xl">
                    {toCapitalize(pet.specie)} - {pet.age}{" "}
                    {pet.age === 1 ? "ano" : "anos"}
                  </strong>
                </div>
                <div className="w-full h-px bg-slate-200 my-2"></div>
                <div className="px-2 pb-2 text-center">
                  <span className="text-black">{pet?.city}</span>
                </div>
              </div>
            </section>
          ))}
        </main>
      </Container>
    </>
  );
};

export default Dashboard;
