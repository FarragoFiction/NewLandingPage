let giggleTime = false;

const giggling = new Audio(src = "483159__f-r-a-g-i-l-e__children-s-toys-laughing.mp3");
let audio = document.querySelector("#audio");

window.onload = () => {
  setCount();
  let audio = document.querySelector("#audio");

  renderFilter();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let filter = urlParams.get('filter');
  if (filter) {
    applyFilter(filter);
  }
  isItGiggleTime();

  window.onclick = () => {
    if (audio && !audio.playing) {
      audio.play();
    }
    if (giggleTime && !giggling.playing) {
      giggling.play();
    }
  }

  window.onmousemove = () => {
    if (audio && !audio.playing) {
      audio.play();
    }
    if (giggleTime && !giggling.playing) {
      giggling.play();
    }
  }

}

const isItGiggleTime = async () => {
  console.log("JR NOTE: Is it giggletime?")
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hackedGiggles = urlParams.get('giggletime');

  //midnight and fridays are giggle time
  if (hackedGiggles || new Date().getHours() == 0 || new Date().getDay() === 5) {
    console.log("JR NOTE: Yes!!! :) :) :)")

    beginMakingShamblingHorrorsOfEntries()

    const warning = document.querySelector("#warning");
    warning.innerText = "WARNING: RUN.";
    await sleep(30000);
    giggleTime = true;

    beginMakingShamblingHorrorsOfEntries()
    beginMakingShamblingHorrorsOfEntries()
    warning.innerText = "WARNING: TOO LATE.";

  } else {
    console.log("JR NOTE: No... :( :( :(")
  }

}


const renderFilter = () => {
  const select = document.querySelector("#filter");
  select.onchange = (e) => {
    applyFilter(e.target.value);
  }
  if (controls) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let filter = urlParams.get('filter');
    const tags = fetchTags();
    for (let tag of tags) {
      if (tag.trim()) {
        const option = createElementWithClassAndParent("option", select)
        option.value = tag;
        option.innerText = tag;
        if (tag === filter) {
          option.selected = true;
        }
      }

    }
  }
}

const setCount = () => {
  const countEle = document.querySelector("#count");

  let count = 0;
  const entries = document.querySelectorAll(".entry");
  if (countEle && entries) {
    for (let entry of entries) {

      if (entry.style.display !== "none") {
        count++;
      }
    }
  }

  countEle.innerText = "Count: " + count;

}

const applyFilter = (filter) => {
  const entries = document.querySelectorAll(".entry");
  for (let entry of entries) {
    if (entry.className.includes(filter)) {
      entry.style.display = "inline-block";
    } else {
      entry.style.display = "none";
    }
  }
  setCount();
  updateURLParams("filter=" + filter)
}

const fetchTags = () => {
  let ret = "";
  const entries = document.querySelectorAll(".entry");
  for (let entry of entries) {
    ret += entry.className + " ";
  }
  return uniq(ret.split(" "));
}


