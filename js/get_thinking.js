document.addEventListener("DOMContentLoaded", () => {
    const thoughtInput = document.getElementById("thought-input");
    const thoughtsContainer = document.getElementById("thoughts-container");

    thoughtInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const thoughtValue = thoughtInput.value.trim();
            if (thoughtValue !== "") {
                addThought(thoughtValue);
                thoughtInput.value = "";
            }
        }
    });

    function addThought(thought) {
        const thoughtElement = document.createElement("div");
        thoughtElement.classList.add("thought");
        thoughtElement.textContent = thought;
        thoughtsContainer.appendChild(thoughtElement);

        // Scroll to the latest thought smoothly
        thoughtElement.scrollIntoView({ behavior: "smooth" });
    }
});
