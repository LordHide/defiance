import trishaImg from './Img/trisha.png';
import './ProfileGlobal.css';
import './characterState.css';
import './font/css/fontello.css';
import './font/css/fontello-codes.css';

function profailMain({character}) {

    const profileImg = characterImg(character.name);

    return (
        <div className="line">
          <img src={profileImg} className="character" alt="character" />
          {character.characterState.map(info => {return createCharacterState(info) } ) }
        </div>
    );
}

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      default: return imgReference = trishaImg; break;
    }
  
    return imgReference;
}

function createCharacterState(characterState){
  let classNameState = "glass stateCharacter "+characterState.name
  let classNameStateSpam = "stateCharacter "+characterState.name+"Span "+characterState.name;
  classNameState += characterState.active ? " stateActive" : " stateDeactivated";

  if(characterState.name == "aturdido" || characterState.name == "cegado" || characterState.name == "marcado"){
    classNameState += " invertedTriangle";
  }
  else if(characterState.name == "ardiendo" || characterState.name == "concentrado" || characterState.name == "inmovilizado"){
    classNameState += " triangle";
  }
  
  return <span><span className={classNameStateSpam}></span><div className={classNameState}><i className = {characterState.asociatedClass}></i></div></span>;
}


export default profailMain;
