import Container from "@/components/container";
import Header from "@/components/header";
import Image from "next/image";
import logoImage from "@/../public/images/logo.svg";

const Home = () => {
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
          <section className="w-full bg-white rounded-lg">
            <Image
              src={logoImage}
              alt="pet"
              width={100}
              height={100}
              className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            />

            <div className="flex justify-center px-2">
              <strong className="text-black font-medium text-xl">
                Pitbull - 4 anos
              </strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <div className="px-2 pb-2 text-center">
              <span className="text-black">Campo Grande - MG</span>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Home;
