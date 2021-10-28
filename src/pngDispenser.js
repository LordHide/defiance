import trishaImg from './Img/trisha.png';
import duchessImg from './Img/duchess.png';

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      case "Duchess" : imgReference = duchessImg; break;
      default: return imgReference = trishaImg; break;
    }
  
    return imgReference;
}

export default characterImg;