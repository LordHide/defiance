import dadoAmarillo from './Img/svg/dadoAmarillo.svg';
import dadoNaranja from './Img/svg/dadoNaranja.svg';
import dadoRojo from './Img/svg/dadoRojo.svg';
import dadoAzul from './Img/svg/dadoAzul.svg';
import dadoVerde from './Img/svg/dadoVerde.svg';
import dadoNegro from './Img/svg/dadoNegro.svg';
import dano from './Img/svg/dano.svg';
import software from './Img/svg/software.svg';
import salud from './Img/svg/salud.svg';
import defensa from './Img/svg/defensa.svg';
import agro from './Img/svg/agro.svg';
import movimiento from './Img/svg/movimiento.svg';
import ardiendo from './Img/svg/ardiendo.svg';
import aturdido from './Img/svg/aturdido.svg';
import marcado from './Img/svg/marcado.svg';
import concentrado from './Img/svg/concentrado.svg';
import inmovilizado from './Img/svg/inmovilizado.svg';
import inconsciente from './Img/svg/inconsciente.svg';
import poisoned from './Img/svg/poisoned.svg';
import oculto from './Img/svg/oculto.svg';
import herida from './Img/svg/herida.svg';
import especialBlack from './Img/svg/especialBlack.svg';
import especialWhite from './Img/svg/especialWhite.svg';
import exitoBlack from './Img/svg/exitoBlack.svg';
import escudo from './Img/svg/escudo.svg';
import bloqueoWhite from './Img/svg/bloqueoWhite.svg';
import bloqueoBlack from './Img/svg/bloqueoBlack.svg';
import mano from './Img/svg/mano.svg';
import casco from './Img/svg/casco.svg';
import pecho from './Img/svg/pecho.svg';
import equipo from './Img/svg/equipo.svg';
import packete from './Img/svg/packete.svg';
import accion from './Img/svg/accion.svg';
import cegado from './Img/svg/cegado.svg';


function svgDispenser(marker){
    let svg;

    switch (marker) {
        case "diceblack":
            svg = dadoNegro;
            break;
        case "diceYellow":
            svg = dadoAmarillo;
            break;
        case "diceblue":
            svg = dadoAzul;
            break;
        case "diceOrange":
            svg = dadoNaranja;
            break;
        case "diceRed":
            svg = dadoRojo;
            break;
        case "diceGreen":
            svg = dadoVerde;
            break;
        case "software":
            svg = software;
            break;
        case "health":
            svg = salud;
            break;
        case "defense":
            svg = defensa;
            break;
        case "agro":
            svg = agro;
            break;
        case "movement":
            svg = movimiento;
            break;
        case "burning":
            svg = ardiendo;
            break;
        case "stunned":
            svg = aturdido;
            break;
        case "marked":
            svg = marcado;
            break;
        case "concentrated":
            svg = concentrado;
            break;
        case "blind":
            svg = cegado;
            break;
        case "poisoned":
            svg = poisoned;
            break;
        case "immobilized":
            svg = inmovilizado;
            break;
        case "unconscious":
            svg = inconsciente;
            break;
        case "hidden":
            svg = oculto;
            break;
        case "wound":
            svg = herida;
            break;
        case "specialWhite":
            svg = especialWhite;
            break;
        case "specialBlack":
            svg = especialBlack;
            break;
        case "exitoBlack":
            svg = exitoBlack;
            break;
        case "shield":
            svg = escudo;
            break;
        case "package":
            svg = packete;
            break;
        case "guardWhite":
            svg = bloqueoWhite;
            break;
        case "guardBlack":
            svg = bloqueoBlack;
            break;
        case "hand":
            svg = mano;
            break;
        case "helmet":
            svg = casco;
            break;
        case "chest":
            svg = pecho;
            break;
        case "equipment":
            svg = equipo;
            break;
        case "action":
            svg = accion;
            break;
        case "damage":
            svg = dano;
            break;
        default:
            break;
    }

    return svg;
}

export default svgDispenser;