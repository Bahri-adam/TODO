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
        createSparks(thoughtElement);

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

    // Create Sparks Effect
    function createSparks(targetElement) {
        for (let i = 0; i < 20; i++) { // Number of sparks
            const spark = document.createElement("div");
            spark.classList.add("spark");

            // Randomize position and movement direction
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomDistance = Math.random() * 50;

            const offsetX = Math.cos(randomAngle) * randomDistance;
            const offsetY = Math.sin(randomAngle) * randomDistance;

            spark.style.left = `${targetElement.offsetLeft + targetElement.clientWidth / 2}px`;
            spark.style.top = `${targetElement.offsetTop + targetElement.clientHeight / 2}px`;

            document.body.appendChild(spark);

            // Animate the spark to fly outward
            setTimeout(() => {
                spark.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                spark.style.opacity = 0;
            }, 10);

            // Remove the spark after the animation
            setTimeout(() => {
                spark.remove();
            }, 1000);
        }
    }
});
