import trishaImg from './Img/trisha.png';
import defaultImg from './Img/default.png';
import miniTrishaImg from './Img/miniTrisha.png';
import duchessImg from './Img/duchess.png';

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      case "Duchess" : imgReference = duchessImg; break;
      case "miniTrisha" : imgReference = miniTrishaImg; break;
      default: return imgReference = defaultImg; break;
    }
  
    return imgReference;
}

export default characterImg;