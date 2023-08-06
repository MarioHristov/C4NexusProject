const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input"),
    progress = document.querySelector(".slider .progress");

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minValue = parseInt(priceInput[0].value),
            maxValue = parseInt(priceInput[1].value);

        // Calculate the positions of the thumbs and update the progress bar accordingly
        if (0 <= minValue && minValue <= maxValue && maxValue <= 10000)
        {
            rangeInput[0].value = isNaN(minValue) ? 0 : minValue;
            rangeInput[1].value = isNaN(maxValue) ? 0 : maxValue;
    
            const minPercentage = (Math.min(minValue, maxValue) / rangeInput[0].max) * 100;
            const maxPercentage = (Math.max(minValue, maxValue) / rangeInput[1].max) * 100;
    
            progress.style.left = minPercentage + "%";
            progress.style.right = 100 - maxPercentage + "%";
        }
       
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minValue = parseInt(rangeInput[0].value),
            maxValue = parseInt(rangeInput[1].value);

        // Calculate the positions of the thumbs and update the progress bar accordingly
        const minPercentage = (Math.min(minValue, maxValue) / rangeInput[0].max) * 100;
        const maxPercentage = (Math.max(minValue, maxValue) / rangeInput[1].max) * 100;
        progress.style.left = minPercentage + "%";
        progress.style.right = 100 - maxPercentage + "%";

        // Set the input values based on the current positions of the thumbs
        priceInput[0].value = Math.min(minValue, maxValue);
        priceInput[1].value = Math.max(minValue, maxValue);
    });
});
