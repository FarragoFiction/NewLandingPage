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
    initThemes();
    if(hackedGiggles){
      alert("You are entering a place that may make you feel uneasy. Obsession is a dangerous thing. You may wish to turn back.")

      infiniteMode(); //so i can debug
    }

    beginMakingShamblingHorrorsOfEntries()

    const warning = document.querySelector("#warning");
    warning.innerText = "WARNING: RUN.";
    await sleep(30000);
    giggleTime = true;

    beginMakingShamblingHorrorsOfEntries()
    beginMakingShamblingHorrorsOfEntries()
    warning.innerText = "WARNING: TOO LATE.";
    infiniteMode();
  } else {
    console.log("JR NOTE: No... :( :( :(")
  }

}


const infiniteMode = () => {
  let lastScroll = 0;
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 300) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      addShamblingHorrorEntry();
    });


  };

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

let stopScrolling = false;

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
  if(count >200){
    stopScrolling=true;
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

const randomTitle = (chosenTheme) => {
  if(stopScrolling){
    return "StopScrolling"
  }

  const person = (chosenTheme.pickPossibilityFor(PERSON));
  const adj = (chosenTheme.pickPossibilityFor(ADJ));
  const compliment = (chosenTheme.pickPossibilityFor(COMPLIMENT));
  const insult = (chosenTheme.pickPossibilityFor(INSULT));
  const supermove = (chosenTheme.pickPossibilityFor(SUPERMOVE));
  const object = (chosenTheme.pickPossibilityFor(OBJECT));
  const location = (chosenTheme.pickPossibilityFor(LOCATION));


  const smell = (chosenTheme.pickPossibilityFor(SMELL));
  const taste = (chosenTheme.pickPossibilityFor(TASTE));
  const feeling = (chosenTheme.pickPossibilityFor(FEELING));
  const sound = (chosenTheme.pickPossibilityFor(SOUND));
  const options = [sound, feeling, taste, smell, person, adj, compliment, insult, supermove, object, location];
  return pickFrom(options);
}

const randomDesc = (chosenTheme) => {
  if(stopScrolling){
    return "Please just stop. What are you doing to yourself. To your computer. There are too many. Just stop. Please. Leave. Go hydrate. Touch grass. I don't care what but it can't be this. Not anymore."
  }
  const person = titleCase((chosenTheme.pickPossibilityFor(PERSON)));
  const adj = (chosenTheme.pickPossibilityFor(ADJ));
  const compliment = (chosenTheme.pickPossibilityFor(COMPLIMENT));
  const insult = (chosenTheme.pickPossibilityFor(INSULT));
  const supermove = (chosenTheme.pickPossibilityFor(SUPERMOVE));
  const object = (chosenTheme.pickPossibilityFor(OBJECT));
  const location = titleCase(chosenTheme.pickPossibilityFor(LOCATION));
  const philosophy = (chosenTheme.pickPossibilityFor(PHILOSOPHY));

  const childbackstory = (chosenTheme.pickPossibilityFor(CHILDBACKSTORY));
  const generalbackstory = (chosenTheme.pickPossibilityFor(GENERALBACKSTORY));
  const miracle = (chosenTheme.pickPossibilityFor(MIRACLE));
  const loc_desc = (chosenTheme.pickPossibilityFor(LOC_DESC));
  const monster_desc = (chosenTheme.pickPossibilityFor(MONSTER_DESC));
  const smell = (chosenTheme.pickPossibilityFor(SMELL));
  const taste = (chosenTheme.pickPossibilityFor(TASTE));
  const feeling = (chosenTheme.pickPossibilityFor(FEELING));
  const sound = (chosenTheme.pickPossibilityFor(SOUND));
  const effects = (chosenTheme.pickPossibilityFor(EFFECTS));

  const templates = [
    `Have you ever wanted to be The ${person}? Now's your chance! Decide if you're ${compliment}, ${insult} or even gain the ability to ${miracle}.`,
    `You can practically smell the ${smell}. `,
    `It reeks of ${smell}. `,
    `Just be glad the smell of ${smell} cannot be simulated. `,

    ` ${titleCase(smell)}. ${titleCase(feeling)}. ${titleCase(taste)}. ${titleCase(sound)}.`,
    ` ${titleCase(smell)}. ${titleCase(feeling)}. ${titleCase(taste)}. ${titleCase(sound)}. And you.`,

    `You can practically feel the ${feeling}. `,
    `You can practically taste the ${taste}. `,
    `Just be glad the taste of ${taste} cannot be simulated. `,

    `Learn about The ${person}. They ${generalbackstory}. `,
    `You hear muttering: '${philosophy}'. `,
    `Learn about The ${person}. ${monster_desc}. `,
    `Have you ever heard about The ${person}. ${monster_desc}. `,
    `It's okay. You can stop now. Just stop.`,
    `You can leave any time. No one will call you ${insult}.`,
    `Why did you come here? Did you not know that Midnight and Fridays are special? Not just here, either. <a target="_blank" href = 'http://farragofiction.com/LitRPGSimE/?friday=true'>I wonder if this link has rotten away?</a>`,
    `The ${person} ${childbackstory}.`,
    `Learn how ${effects}. `,
    `It's okay. No one will be able to tell you're ${insult}. `,
    `Maybe if you play this, everyone will finally understand you're ${compliment}. `,
    `I really don't think there is a simulation where there's ${loc_desc}.`,

    `Genuinely too much ${sound}. `,

    `You can practically hear the sound of ${sound}. `,
    `Simulates the ${location} where there's ${loc_desc}.`,
  ]
  return pickFrom(templates);
}


const addShamblingHorrorEntry = () => {
  const chosenThemeKey = pickFrom(Object.keys(all_themes));
  const chosenTheme = all_themes[chosenThemeKey];
  const entries = document.querySelector("#entries");
  entry = createElementWithClassAndParent("div", entries, "entry spiral horror zampanio");
  const title = titleCase(randomTitle(chosenTheme)).replace(/\s/g, "") + "Sim";
  const desc = randomDesc(chosenTheme);
  const html = `
  <a class="title"target="_blank" href="http://knucklessux.com/PuzzleBox/Secrets/ZampanioFAQ/">${title}</a>
  <p class="description">${desc}
  </p>
  `;
  entry.innerHTML = html;
  createOneShamblingHorror(entry);
  setCount();
}
