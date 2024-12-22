// import TextLoop from "react-text-loop";

import gsap from "gsap";
import { useEffect } from "react";

const Messages = () => {
    
    useEffect(() => {
        // Aquí estamos animando la opacidad y el movimiento del texto
        gsap.fromTo(
          ".animated-text", // Elemento que vamos a animar
          { opacity: 0, y: 20 }, // Estado inicial
          { opacity: 1, y: 0, duration: 1, stagger: 0.5 } // Estado final (animación)
        );
      }, []);
    
      return (
        <div className="fix top-1/2 inset-x-0 text-center text-white absolute px-2">
        <p className="animated-text">
        ¡Feliz Navidad a todos! 🎄✨
        </p>
        <p className="animated-text">
        Gracias por su apoyo, amistad y colaboración durante todo el año.
        </p>
        <p className="animated-text">
        Que esta Navidad esté llena de alegría, paz y momentos especiales junto a sus seres queridos. 
        </p>
        <p className="animated-text">
        ¡Les deseo lo mejor para el próximo año!
        </p>
        </div>
      );
}

export default Messages