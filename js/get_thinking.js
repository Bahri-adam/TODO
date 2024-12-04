document.addEventListener("DOMContentLoaded", () => {
    const thoughtInput = document.getElementById("thought-input");
    const thoughtsContainer = document.getElementById("thoughts-container");

    thoughtInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const thoughtValue = thoughtInput.value.trim();
            if (thoughtValue !== "") {
                addThought(thoughtValue);
                thoughtInput.value = "";
                reactiveBackgroundLight();
            }
        } else {
            createKeyGlow();
        }
    });

    function addThought(thought) {
        const thoughtElement = document.createElement("div");
        thoughtElement.classList.add("thought");
        thoughtElement.textContent = thought;

        // Word Expansion Animation on hover
        thoughtElement.addEventListener("mouseenter", () => {
            thoughtElement.style.transform = "scale(1.1)";
            thoughtElement.style.color = Math.random() > 0.5 ? '#DAA520' : '#9370DB'; // Gold or Purple
        });

        thoughtElement.addEventListener("mouseleave", () => {
            thoughtElement.style.transform = "scale(1)";
            thoughtElement.style.color = "#fff";
        });

        thoughtsContainer.appendChild(thoughtElement);

        // Scroll to the latest thought smoothly
        thoughtElement.scrollIntoView({ behavior: "smooth" });
    }

    // Reactive Background Lighting
    function reactiveBackgroundLight() {
        const body = document.body;
        body.classList.add("background-glow");

        setTimeout(() => {
            body.classList.remove("background-glow");
        }, 800); // Glow lasts for 800ms
    }

    // Key Glow Effect
    function createKeyGlow() {
        const glow = document.createElement("div");
        glow.classList.add("key-glow");

        // Position the glow at a random spot near the center for each keypress
        glow.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 200}px`;
        glow.style.top = `${window.innerHeight / 2 + (Math.random() - 0.5) * 200}px`;

        document.body.appendChild(glow);

        // Remove the glow after the animation ends
        setTimeout(() => {
            glow.remove();
        }, 1000);
    }
});
