
window.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

    const dropdowns = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("form button");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");

    for (let select of dropdowns) {
        for (currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if (select.name === "from" && currCode === "USD") {
                newOption.selected = "selected";
            } else if (select.name === "to" && currCode === "INR") {
                newOption.selected = "selected";
            }
            select.appendChild(newOption);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }

    const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
        }

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

        try {
            let response = await fetch(URL);
            let data = await response.json();
            let conversionRates = data[fromCurr.value.toLowerCase()];
            let rate = conversionRates[toCurr.value.toLowerCase()];
            let finalAmount = amtVal * rate;

            document.querySelector(".msg").innerText =
                `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } catch (error) {
            console.error("Conversion failed:", error);
            document.querySelector(".msg").innerText = "Conversion failed. Please try again.";
        }
    });
});
