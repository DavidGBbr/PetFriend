"use client";
import Container from "@/components/container";
import Header from "@/components/header";
import DashboardHeader from "@/components/panelheader";
import React from "react";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  specie: z.string().nonempty("A espécie do pet é obrigatória"),
  weight: z.string().nonempty("O peso do pet é obrigatório"),
  age: z.string().nonempty("A idade do pet é obrigatória"),
  description: z.string().nonempty("A descrição do pet é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const New = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Container>
        <DashboardHeader />
        <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
          <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
            <div className="absolute cursor-pointer">
              <FiUpload size={30} color="#000" />
            </div>
            <div className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="opacity-0 cursor-pointer"
              />
            </div>
          </button>
        </div>

        <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <p className="mb-2 font-medium">Nome do pet</p>
              <Input
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Ex: Rex..."
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Espécie</p>
              <Input
                type="text"
                register={register}
                name="specie"
                error={errors.specie?.message}
                placeholder="Ex: Labrador"
              />
            </div>

            <div className="flex w-full mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className="mb-2 font-medium">Peso</p>
                <Input
                  type="number"
                  register={register}
                  name="weight"
                  error={errors.weight?.message}
                  placeholder="Ex: 12kg"
                />
              </div>

              <div className="w-full">
                <p className="mb-2 font-medium">Idade</p>
                <Input
                  type="number"
                  register={register}
                  name="age"
                  error={errors.age?.message}
                  placeholder="Ex: 2 anos"
                />
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 011999101923..."
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Descrição</p>
              <textarea
                className="border-2 w-full rounded-md h-24 px-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite uma descrição sobre o pet..."
              />
              {errors.description && (
                <p className="mb-1 text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default New;
