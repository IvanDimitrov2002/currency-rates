import "./style.css";
import { getRates, getData } from "./functions";

const select = document.getElementById("currencies");
const options = [...select.options].map((option) => option.value.toLowerCase());
const groups = document.querySelectorAll(".group-container");

getRates(options).then((rates) => {
    const displayData = (currency) => {
        groups.forEach((group) =>
            group.querySelector(".group").replaceChildren()
        );

        const data = getData(currency, rates);

        const longestArray = data.filter(
            (entry) => Math.abs(data[0][2] - entry[2]) <= 0.5
        );

        longestArray.forEach((entry) => {
            const p = document.createElement("p");
            p.innerHTML = `${entry[0].toUpperCase()}-${entry[1].toUpperCase()}: ${
                entry[2]
            }`;
            groups[3].querySelector(".group").appendChild(p);
        });

        data.forEach((entry) => {
            const p = document.createElement("p");
            p.innerHTML = `${entry[0].toUpperCase()}-${entry[1].toUpperCase()}: ${
                entry[2]
            }`;
            if (entry[2] < 1) {
                groups[0].querySelector(".group").appendChild(p);
            } else if (entry[2] >= 1 && entry[2] < 1.5) {
                groups[1].querySelector(".group").appendChild(p);
            } else {
                groups[2].querySelector(".group").appendChild(p);
            }
        });

        groups.forEach(
            (group) =>
                (group.querySelector(".counter").innerHTML =
                    "Count: " + group.querySelector(".group").childElementCount)
        );
    };

    displayData(select.value);

    select.addEventListener("change", (event) => {
        displayData(event.target.value);
    });
});
