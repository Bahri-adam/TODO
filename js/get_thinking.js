document.addEventListener("DOMContentLoaded", () => {
    const thoughtInput = document.getElementById("thought-input");
    const thoughtsContainer = document.getElementById("thoughts-container");

    // Mouse Trail Effect
    document.addEventListener("mousemove", (event) => {
        const trail = document.createElement("div");
        trail.classList.add("trail");
        trail.style.left = `${event.pageX}px`;
        trail.style.top = `${event.pageY}px`;

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    });

    thoughtInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const thoughtValue = thoughtInput.value.trim();
            if (thoughtValue !== "") {
                addThought(thoughtValue);
                thoughtInput.value = "";
                createKeyGlow();
                createSparks();
            }
        } else {
            createSparks(); // Create sparks on each keypress
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

    // Create Golden Sparks Effect
    function createSparks() {
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement("div");
            spark.classList.add("spark");
            spark.style.left = `${thoughtInput.getBoundingClientRect().left + Math.random() * thoughtInput.offsetWidth}px`;
            spark.style.top = `${thoughtInput.getBoundingClientRect().top + Math.random() * thoughtInput.offsetHeight}px`;
            spark.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;

            document.body.appendChild(spark);

            setTimeout(() => {
                spark.remove();
            }, 1000);
        }
    }
});
