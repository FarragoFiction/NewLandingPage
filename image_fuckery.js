

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
  document.querySelector("body").append(image)

}

const renderEleAsMuteImage = async (source) => {

  const ele = source.cloneNode(true); //so i can tweak style to make it perfect
  const title = ele.querySelector(".title");
  title.style.lineHeight ="20px";
  title.style.fontSize ="28px";

  title.style.marginTop ="4px";
  title.style.fontWeight="700";
  //title.style.marginLeft ="0px";
  title.style.letterSpacing="-2px";
  title.style.textDecorationThickness="3px";
  title.style.textDecorationStyle="solid";

  const desc = ele.querySelector(".description");
  desc.style.marginTop="17px";
  desc.style.marginLeft="0px";
  title.style.letterSpacing="1px";
  desc.style.lineHeight ="20px";
  desc.style.fontSize ="18px";


  console.log("JR NOTE: outer html is", ele.outerHTML)

  const css = await httpGetAsync("http://farragofiction.com/SampleNewHomePage/index.css");
  const margin = 16;

  var data = `<svg xmlns="http://www.w3.org/2000/svg" width="${source.offsetWidth + margin}" height="${source.offsetHeight + margin}">` +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    `<style>${css}</style>` +
    ele.outerHTML +
    '</div>' +
    '</foreignObject>' +
    '</svg>';



  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  img.width = getRandomNumberBetween(5,source.offsetWidth + margin);
  img.height = getRandomNumberBetween(5,source.offsetHeight + margin);

  const svg = new Blob([data], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);


  img.src = url;
  return img;

}