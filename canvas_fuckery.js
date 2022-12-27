

const renderEleAsMuteImage = async (ele, target) => {
  console.log("JR NOTE: trying to do sin", ele)


  const css = await httpGetAsync("http://farragofiction.com/SampleNewHomePage/index.css");
  const margin = 13;

  var data = `<svg xmlns="http://www.w3.org/2000/svg" width="${ele.offsetWidth + margin}" height="${ele.offsetHeight + margin}">` +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    `<style>${css}</style>` +
    ele.outerHTML +
    '</div>' +
    '</foreignObject>' +
    '</svg>';

  console.log("JR NOTE: data", data)


  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  const svg = new Blob([data], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);
  target.append(img);

  img.onload = function () {
    console.log("JR NOTE: image loaded")
    DOMURL.revokeObjectURL(url);
  }

  img.src = url;

}