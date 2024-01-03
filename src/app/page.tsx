"use client";
import { useState, useEffect } from "react";
import Container from "@/components/container";
import Header from "@/components/header";
import { setupAPIClient } from "@/services/api";
import Link from "next/link";
import { PetType } from "@/types/PetType";

const Home = () => {
  const [pets, setPets] = useState<PetType[]>([]);
  const [loadImage, setLoadImage] = useState<string>();

  useEffect(() => {
    const getPets = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/pets");
      setPets(response.data as PetType[]);
    };

    getPets();
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadImage(id);
  };
  return (
    <>
      <Header />
      <Container>
        <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
          <input
            className="w-full border-2 rounded-lg h-9 px-3 outline-none"
            placeholder="Digite a raça do pet..."
          />
          <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
            Buscar
          </button>
        </section>

        <h1 className="font-bold text-center mt-6 text-2xl mb-4">
          Adote um pet hoje mesmo
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets?.map((pet) => (
            <Link href={`pet/${pet.id}`} key={pet.id}>
              <section
                className="w-full bg-white rounded-lg flex flex-col justify-between overflow-hidden"
                key={pet.id}
              >
                <div
                  className="w-full h-56 bg-slate-200"
                  style={{ display: loadImage?.length ? "none" : "block" }}
                ></div>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pet.picture}`}
                  alt={pet.name}
                  width={100}
                  height={100}
                  className="w-full mb-2 h-56 hover:scale-105 duration-200 transition-all object-cover"
                  onLoad={() => handleImageLoad(pet.id)}
                  style={{ display: loadImage?.length ? "block" : "none" }}
                />

                <div>
                  <div className="flex justify-center px-2">
                    <strong className="text-black font-medium text-xl">
                      {pet.specie} - {pet.age} {pet.age === 1 ? "ano" : "anos"}
                    </strong>
                  </div>
                  <div className="w-full h-px bg-slate-200 my-2"></div>
                  <div className="px-2 pb-2 text-center">
                    <span className="text-black">{pet?.city}</span>
                  </div>
                </div>
              </section>
            </Link>
          ))}
        </main>
      </Container>
    </>
  );
};

export default Home;
