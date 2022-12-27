

const beginMakingShamblingHorrorsOfEntries = ()=>{
  const entries = document.querySelectorAll(".entry");
  for(let entry of entries){
    createOneShamblingHorror(entry)
  }
}

const createOneShamblingHorror = async(entry)=>{
  let image = await renderEleAsMuteImage(entry);
  console.log("JR NOTE: entry image is",image)
  const shambling_horror = createElementWithClassAndParent("div",entry, "shambling-horror");
  shambling_horror.style.background=`url(${image.src})`;
  shambling_horror.style.width = image.width;
  shambling_horror.style.height = image.height;

}

const renderEleAsMuteImage = async (ele) => {


  const css = await httpGetAsync("http://farragofiction.com/SampleNewHomePage/index.css");
  const margin = 16;

  var data = `<svg xmlns="http://www.w3.org/2000/svg" width="${ele.offsetWidth + margin}" height="${ele.offsetHeight + margin}">` +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    `<style>${css}</style>` +
    ele.outerHTML +
    '</div>' +
    '</foreignObject>' +
    '</svg>';



  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  img.width = ele.offsetWidth + margin;
  img.height = ele.offsetHeight + margin;

  const svg = new Blob([data], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    console.log("JR NOTE: image loaded")
    DOMURL.revokeObjectURL(url);
  }

  img.src = url;
  return img;

}