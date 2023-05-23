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
import successWhite from './Img/svg/successWhite.svg';
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
        case "_diceblack":
            svg = dadoNegro;
            break;
        case "_diceYellow":
            svg = dadoAmarillo;
            break;
        case "_diceblue":
            svg = dadoAzul;
            break;
        case "_diceOrange":
            svg = dadoNaranja;
            break;
        case "_diceRed":
            svg = dadoRojo;
            break;
        case "_diceGreen":
            svg = dadoVerde;
            break;
        case "_software":
            svg = software;
            break;
        case "_health":
            svg = salud;
            break;
        case "_defense":
            svg = defensa;
            break;
        case "_agro":
            svg = agro;
            break;
        case "_movement":
            svg = movimiento;
            break;
        case "_burning":
            svg = ardiendo;
            break;
        case "_stunned":
            svg = aturdido;
            break;
        case "_marked":
            svg = marcado;
            break;
        case "_focused":
            svg = concentrado;
            break;
        case "_blind":
            svg = cegado;
            break;
        case "_poisoned":
            svg = poisoned;
            break;
        case "_immobilized":
            svg = inmovilizado;
            break;
        case "_unconscious":
            svg = inconsciente;
            break;
        case "_hidden":
            svg = oculto;
            break;
        case "_wound":
            svg = herida;
            break;
        case "_specialWhite":
            svg = especialWhite;
            break;
        case "_specialBlack":
            svg = especialBlack;
            break;
        case "_exitoBlack":
            svg = exitoBlack;
            break;
        case "_successWhite":
            svg = successWhite;
            break;
        case "_shield":
            svg = escudo;
            break;
        case "_package":
            svg = packete;
            break;
        case "_guardWhite":
            svg = bloqueoWhite;
            break;
        case "_guardBlack":
            svg = bloqueoBlack;
            break;
        case "_hand":
            svg = mano;
            break;
        case "_helmet":
            svg = casco;
            break;
        case "_chest":
            svg = pecho;
            break;
        case "_equipment":
            svg = equipo;
            break;
        case "_action":
            svg = accion;
            break;
        case "_damage":
            svg = dano;
            break;
        default:
            break;
    }

    return svg;
}

export default svgDispenser;