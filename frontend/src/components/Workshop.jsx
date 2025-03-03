import BounceCards from './BounceCards';
import portadaEsencial from "../img/cursos/cursoEsencial.jpg";
import portadaLetras from "../img/cursos/letrasPorteñas.jpg";
import portadaMembresia from "../img/cursos/membresia.webp";

const images = [
    portadaEsencial,
    portadaLetras,
    portadaMembresia,
];

const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
];

export default function Workshop({ handleClick }) {
    return (<BounceCards
        className="custom-bounceCards"
        images={images}
        containerWidth={500}
        containerHeight={250}
        animationDelay={1}
        animationStagger={0.08}
        transformStyles={transformStyles}
        enableHover={true}
        handleSelectedCardInfo={(cardIndex) => handleClick(cardIndex)}
    />);
}



