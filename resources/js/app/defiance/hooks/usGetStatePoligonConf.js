
export function usGetStatePoligonConf(info, index, handleClick){
  let alpha = info.active ? 1 : 0.5;
  let blur = info.active ? 15 : 5;
  return {"shadowColor": 'rgb('+info.color1+')',
    "shadowBlur": blur,
    "shadowOffset": { x: info.positionXBlur, y: info.positionYBlur },
    "shadowOpacity": 0.5,
    "drawBorder": true,
    "rotation": info.angle,
    "y": window.innerWidth * (info.positionY),
    "x": window.innerWidth * (info.positionX),
    "fillLinearGradientStartPoint": {x: 50, y: -70},
    "fillLinearGradientEndPoint": {x: 50, y: 15},
    "fillLinearGradientColorStops": [0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')'],
    "onClick": handleClick(index),
    "onTap": handleClick(index)
  };
}