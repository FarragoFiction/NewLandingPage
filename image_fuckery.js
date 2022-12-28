
let cached_css;

const beginMakingShamblingHorrorsOfEntries = ()=>{
  const entries = document.querySelectorAll(".entry");
  for(let entry of entries){
    createOneShamblingHorror(entry)
  }
}

const createOneShamblingHorror = async(entry)=>{
  let image = await renderEleAsMuteImage(entry);
  const shambling_horror = createElementWithClassAndParent("div",entry, "shambling-horror");
  shambling_horror.style.background=`url(${image.src})`;
  shambling_horror.style.backgroundRepeat = 'no-repeat';
  const normalWidth = image.width;
  const normalHeight = image.height;

  shambling_horror.style.width = getRandomNumberBetween(5, 50) + "px";
  shambling_horror.style.height = getRandomNumberBetween(5, 50) + "px";

  const x = getRandomNumberBetween(0, normalWidth);
  const y = getRandomNumberBetween(0, normalHeight) ;
  shambling_horror.style.backgroundPositionX = "-"+x + "px";
  shambling_horror.style.backgroundPositionY = "-"+y + "px";
  shambling_horror.style.top = y -16+ "px";
  shambling_horror.style.left = x -16+ "px";
  //shambling_horror.style.filter="grayscale()";
  const timing_functions = ["linear","ease"];
  const animations = ["scaleX","scaleY","scale"];

  shambling_horror.style.animation = `${pickFrom(animations)}  ${getRandomNumberBetween(5,10)}s ${pickFrom(timing_functions)} infinite`
  shambling_horror.style.animationDelay = `${getRandomNumberBetween(1000,30000)}ms`;
  //document.querySelector("body").append(image)

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


  if(!cached_css){
     cached_css = await httpGetAsync("http://farragofiction.com/SampleNewHomePage/index.css");

  }
  const margin = 16;

  var data = `<svg xmlns="http://www.w3.org/2000/svg" width="${source.offsetWidth + margin}" height="${source.offsetHeight + margin}">` +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    `<style>${cached_css}</style>` +
    ele.outerHTML +
    '</div>' +
    '</foreignObject>' +
    '</svg>';



  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  img.width = source.offsetWidth + margin
  img.height = source.offsetHeight + margin

  const svg = new Blob([data], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);


  img.src = url;
  return img;

}