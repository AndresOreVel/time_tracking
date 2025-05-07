const cards = document.querySelectorAll(".card");
const links = document.querySelectorAll(".link");

fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        cards.forEach((card, index) => {
            const title = card.querySelector(".card-title");
            const current = card.querySelector(".current-hours");
            const previous = card.querySelector(".previous-hours");
            
            title.textContent = data[index].title;
            current.textContent = data[index].timeframes.weekly.current + "hrs";
            previous.textContent = "Last week - " + data[index].timeframes.weekly.previous + "hrs";

            links.forEach((link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();

                    const timeframe = link.getAttribute("data-timeframe");
                    current.textContent = data[index].timeframes[timeframe].current + "hrs";
                    const namewithoutLY = timeframe.replace(/ly$/i, "");
                    const namewithoutI = namewithoutLY.replace(/i/i, "y");

                    previous.textContent = "Last " + namewithoutI + " - " + data[index].timeframes[timeframe].previous + "hrs";
                    links.forEach((link) => link.classList.remove("activated"));
                    link.classList.add("activated");
                })
            }))
        });
    });