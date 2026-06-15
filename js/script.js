const buttonsOptions = document.querySelector(".activity-tracker__options");

buttonsOptions.addEventListener("click", (event) => {
  if (event.target.classList.contains("activity-tracker__option")) {
    const buttonClicked = event.target;

    const buttonActive = document.querySelector(".active");

    buttonActive.classList.remove("active");
    buttonClicked.classList.add("active");

    pullData(buttonClicked.dataset.option);
  }
});

function pullData(dataOption) {
  fetch("./data.json")
    .then((response) => {
      if (!response.ok) return console.log("Oops! Something went wrong.");

      return response.json();
    })
    .then((data) => {
      updateCards(data, dataOption);
    });
}

function updateCards(trackerData, selectedOption) {
  const cards = document.querySelectorAll(".activity-tracker__activity");

  cards.forEach((card) => {
    const cardTitle = card.dataset.title;

    const activityData = trackerData.find((item) => item.title === cardTitle);

    const currentTime = activityData.timeframes[selectedOption].current;
    const previous = activityData.timeframes[selectedOption].previous;

    const changeCurrentTime = card.querySelector(
      ".activity__current-timeframe",
    );
    const changePrevious = card.querySelector(".time");

    changeCurrentTime.innerHTML = `${currentTime}hrs`;
    changePrevious.innerHTML = `${previous}hrs`;
  });
}
