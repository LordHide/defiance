import trishaImg from './Img/trisha.png';
import defaultImg from './Img/default.png';
import miniTrishaImg from './Img/miniTrisha.png';
import duchessImg from './Img/duchess.png';
import logoDefianceImg from './Img/logo-defiance.png';
import loading from './Img/loading.png';

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      case "Duchess" : imgReference = duchessImg; break;
      case "logoDefianceImg" : imgReference = logoDefianceImg; break;
      case "loading" : imgReference = loading; break;
      case "miniTrisha" : imgReference = miniTrishaImg; break;
      default: return imgReference = defaultImg; break;
    }
  
    return imgReference;
}

export default characterImg;