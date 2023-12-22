"use client";
import logoImage from "@/../public/images/logo.svg";
import Container from "@/components/container";
import { Input } from "@/components/input";
import { Loader } from "@/components/loader";
import { AuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    if (!data.name || !data.email || !data.password) {
      return;
    }

    try {
      setLoading(true);
      await signUp(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-2">
        <Link href="/" className="mb-1 max-w-sm w-full">
          <Image
            src={logoImage}
            alt="Logo do site"
            height={100}
            width={100}
            priority
            className="w-full"
          />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-4 mt-[-50px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu nome completo..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium flex items-center justify-center"
            disabled={loading && true}
          >
            {loading ? <Loader /> : "Cadastrar"}
          </button>
        </form>

        <Link href="/login">Já possui uma conta? Faça o login!</Link>
      </div>
    </Container>
  );
};

export default Register;
