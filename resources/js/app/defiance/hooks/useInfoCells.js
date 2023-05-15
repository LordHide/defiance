
export function useInfoCells(rectY, imageName, stat){
  const statValue = stat.max + stat.modifier;

  let info = [];
  let cellX = window.innerWidth * 0.35;
  let cellHeight = (window.innerWidth * 0.024)/(statValue);
  let redDeferencial = 0;
  let greenDeferencial = 0;
  let blueDeferencial = 0;

  for (let index = 1; index <= (statValue); index++) {

    redDeferencial += (243 - 50)/statValue;
    greenDeferencial += (37 - 212)/statValue;
    blueDeferencial += (51 - 77)/statValue;

    let colorTransition = imageName == "_wound" ? 
      "rgb("+(243 - redDeferencial)+","+ (37 - greenDeferencial)+"," +(51 - blueDeferencial)+")"
    :
      "rgb("+(50 + redDeferencial)+","+ (212 + greenDeferencial)+"," +(77 + blueDeferencial)+")";

    const colorActive = index <= stat.current ? colorTransition : "rgb(60, 60, 60)";

    info.push({"x":cellX,
      "y":window.innerWidth * ((rectY + 0.002))+(window.innerWidth * 0.024 - cellHeight),
      "width": window.innerWidth * 0.009,
      "height":cellHeight,
      "fill":colorActive});
    
    cellX += window.innerWidth * 0.012;
    cellHeight += (window.innerWidth * 0.024)/statValue;

  }

  return info;
}