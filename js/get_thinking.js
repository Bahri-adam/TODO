document.addEventListener("DOMContentLoaded", () => {
    const thoughtInput = document.getElementById("thought-input");
    const thoughtsContainer = document.getElementById("thoughts-container");

    thoughtInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const thoughtValue = thoughtInput.value.trim();
            if (thoughtValue !== "") {
                addThought(thoughtValue);
                thoughtInput.value = "";
                createKeyGlow();
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

    // Key Glow Effect
    function createKeyGlow() {
        const glow = document.createElement("div");
        glow.classList.add("key-glow");
        glow.style.left = `${window.innerWidth / 2}px`;
        glow.style.top = `${window.innerHeight / 2}px`;

        document.body.appendChild(glow);

        setTimeout(() => {
            glow.remove();
        }, 1000);
    }
});
