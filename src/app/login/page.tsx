"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import logoImage from "@/../public/images/logo.svg";
import Container from "@/components/container";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "@/components/loader";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo de senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    if (!data.email || !data.password) {
      return;
    }

    try {
      setLoading(true);
      await signIn(data);
    } catch (error) {
      console.log(error);
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
            className="flex items-center justify-center bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
            disabled={loading && true}
          >
            {loading ? <Loader /> : "Acessar"}
          </button>
        </form>
        <Link href="/register">Ainda não possui uma conta? Cadastre-se</Link>
      </div>
    </Container>
  );
};

export default Login;
