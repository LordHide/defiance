
export function useIconCombersion(context){

  let sectionCode = [];

  let contextList = context.split("/");

  for (const section of contextList) {
    let hasMoustache = section[0] == "_"; 
    sectionCode.push({type: hasMoustache ? "svg" : "text", code: section}); 
  }

  return sectionCode;
}