import trishaImg from './Img/trisha.png';
import umaImg from './Img/uma.png';
import qiangImg from './Img/qiang.png';
import cadinImg from './Img/cadin.png';
import jazminImg from './Img/jazmin.png';
import rahmanImg from './Img/rahman.png';
import defaultImg from './Img/default.png';
import miniTrishaImg from './Img/miniTrisha.png';
import duchessImg from './Img/duchess.png';
import logoDefianceImg from './Img/logo-defiance.png';
import loading from './Img/loading.png';
import revenantIng from './Img/revenant.png';
import outcastIng from './Img/outcast.png';
import coreIng from './Img/core.png';

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      case "uma" : imgReference = umaImg; break;
      case "qiang" : imgReference = qiangImg; break;
      case "cadin" : imgReference = cadinImg; break;
      case "jazmin" : imgReference = jazminImg; break;
      case "rahman" : imgReference = rahmanImg; break;
      case "Duchess" : imgReference = duchessImg; break;
      case "logoDefianceImg" : imgReference = logoDefianceImg; break;
      case "loading" : imgReference = loading; break;
      case "core" : imgReference = coreIng; break;
      case "revenant" : imgReference = revenantIng; break;
      case "outcast" : imgReference = outcastIng; break;
      case "miniTrisha" : imgReference = miniTrishaImg; break;
      default: return imgReference = defaultImg; break;
    }
  
    return imgReference;
}

export default characterImg;