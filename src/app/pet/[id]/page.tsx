"use client";
import Container from "@/components/container";
import Header from "@/components/header";
import { setupAPIClient } from "@/services/api";
import { PetType } from "@/types/PetType";
import { useParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { toCapitalize } from "@/utils/ToCapitalize";
import { formatNumber } from "@/utils/formatNumber";
import Footer from "@/components/footer";

const Pet = () => {
  const [pet, setPet] = useState<PetType>();
  const { id } = useParams();

  useEffect(() => {
    const getPet = async () => {
      const api = setupAPIClient();
      const response = await api.get(`/detailPet/${id}`);
      setPet(response.data);
    };

    getPet();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        {pet && (
          <>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pet?.picture}`}
              alt={toCapitalize(pet.specie)}
              className="w-full h-96 object-cover rounded-lg"
            />
            <main className="w-full bg-white rounded-lg p-6 my-4">
              <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                <h1 className="font-bold text-3xl text-black">{pet.name}</h1>
                <h1 className="font-bold text-3xl text-black">
                  {toCapitalize(pet.specie)}
                </h1>
              </div>
              <div className="flex w-full gap-6 my-4">
                <div className="flex flex-row gap-4">
                  <div>
                    <p>Cidade</p>
                    <strong>{pet.city}</strong>
                  </div>
                  <div>
                    <p>Idade</p>
                    <strong>
                      {pet.age} {pet.age > 1 ? "anos" : "ano"}
                    </strong>
                  </div>
                  <div>
                    <p>Peso</p>
                    <strong>{pet.weight}kg</strong>
                  </div>
                </div>
              </div>

              <strong>Descrição: </strong>
              <p className="mb-4">{pet.description}</p>

              <strong>Telefone / WhatsApp: </strong>
              <p className="mb-4">{formatNumber(pet.whatsapp)}</p>

              <a
                className="cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium"
                href={`https://api.whatsapp.com/send?phone=${pet?.whatsapp}&text=Olá vi o anúncio do seu pet, ${pet?.name} já foi adotado(a)?`}
                target="_blank"
              >
                Conversar com anunciante
                <FaWhatsapp size={26} color="#fff" />
              </a>
            </main>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Pet;
