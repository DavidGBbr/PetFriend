import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-black py-8 border-t-2 bg-white w-full mt-4">
      <div className="w-full mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-red-500">Contato</h3>
            <p>WhatsApp: +55 61 98505-7936</p>
            <p>Email: davidgomesbrigido@gmail.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-red-500">
              Minhas Redes
            </h3>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.linkedin.com/in/david-brigido/"
                className="text-3xl hover:text-secondary hover:text-red-700 hover:scale-110 duration-300"
                aria-label="Linkedin"
                target="_blank"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/DavidGBbr"
                className="text-3xl hover:text-secondary hover:text-red-700 hover:scale-110 duration-300"
                aria-label="Github"
                target="_blank"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <>
            &copy; {new Date().getFullYear()} Copyright. Criado por David
            Brigido.
          </>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
