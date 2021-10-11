import dadoAmarillo from './Img/svg/dadoAmarillo.svg';
import dadoNaranja from './Img/svg/dadoNaranja.svg';
import dadoAzul from './Img/svg/dadoAzul.svg';
import dadoVerde from './Img/svg/dadoVerde.svg';
import dadoNegro from './Img/svg/dadoNegro.svg';
import dano from './Img/svg/dano.svg';
import software from './Img/svg/software.svg';
import salud from './Img/svg/salud.svg';
import defensa from './Img/svg/defensa.svg';
import agro from './Img/svg/agro.svg';
import velocidad from './Img/svg/velocidad.svg';
import ardiendo from './Img/svg/ardiendo.svg';
import aturdido from './Img/svg/aturdido.svg';
import marcado from './Img/svg/marcado.svg';
import concentrado from './Img/svg/concentrado.svg';
import inmovilizado from './Img/svg/inmovilizado.svg';
import inconsciente from './Img/svg/inconsciente.svg';
import oculto from './Img/svg/oculto.svg';
import herida from './Img/svg/herida.svg';
import cegado from './Img/svg/cegado.svg';


function svgDispenser(marker){
    let svg;

    switch (marker) {
        case "dadoNegro":
            svg = dadoNegro;
            break;
        case "dadoAmarillo":
            svg = dadoAmarillo;
            break;
        case "dadoAzul":
            svg = dadoAzul;
            break;
        case "dadoNaranja":
            svg = dadoNaranja;
            break;
        case "dadoVerde":
            svg = dadoVerde;
            break;
        case "software":
            svg = software;
            break;
        case "salud":
            svg = salud;
            break;
        case "defensa":
            svg = defensa;
            break;
        case "agro":
            svg = agro;
            break;
        case "velocidad":
            svg = velocidad;
            break;
        case "ardiendo":
            svg = ardiendo;
            break;
        case "aturdido":
            svg = aturdido;
            break;
        case "marcado":
            svg = marcado;
            break;
        case "concentrado":
            svg = concentrado;
            break;
        case "cegado":
            svg = cegado;
            break;
        case "inmovilizado":
            svg = inmovilizado;
            break;
        case "inconsciente":
            svg = inconsciente;
            break;
        case "oculto":
            svg = oculto;
            break;
        case "herida":
                svg = herida;
                break;
        case "dano":
            svg = dano;
            break;
        default:
            break;
    }

    return svg;
}

export default svgDispenser;