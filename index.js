window.onload = ()=>{
  renderFilter();
}


const renderFilter = ()=>{
  const select = document.querySelector("#filter");
  if(controls){
    const tags = fetchTags();
    for(let tag of tags){
      const option = createElementWithClassAndParent("option", select)
      option.value = tag;
      option.innerText = tag;
    }
  }
}

const fetchTags = ()=>{
  let ret = "";
  const entries = document.querySelectorAll(".entry");
  for(let entry of entries){
    ret += entry.className;
  }
  return uniq(ret.split(" "));
}