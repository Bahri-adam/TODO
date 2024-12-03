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

    // Light Trail Effect
    document.addEventListener("mousemove", (event) => {
        const trail = document.createElement("div");
        trail.classList.add("trail");
        trail.style.left = `${event.pageX}px`;
        trail.style.top = `${event.pageY}px`;

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000); // Trail lasts for 1 second
    });
});
