window.onload = ()=>{
  renderFilter();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let filter = urlParams.get('filter');
  if(filter){
    applyFilter(filter);
  }

}


const renderFilter = ()=>{
  const select = document.querySelector("#filter");
  select.onchange = (e)=>{
    applyFilter(e.target.value);
  }
  if(controls){
    const tags = fetchTags();
    for(let tag of tags){
      const option = createElementWithClassAndParent("option", select)
      option.value = tag;
      option.innerText = tag;
    }
  }
}

const applyFilter = (filter)=>{
  const entries = document.querySelectorAll(".entry");
  for(let entry of entries){
    if(entry.className.includes(filter)){
      entry.style.display ="inline-block";
    }else{
      entry.style.display="none";
    }
  }
  updateURLParams("filter="+filter)
}

const fetchTags = ()=>{
  let ret = "";
  const entries = document.querySelectorAll(".entry");
  for(let entry of entries){
    ret += entry.className;
  }
  return uniq(ret.split(" "));
}