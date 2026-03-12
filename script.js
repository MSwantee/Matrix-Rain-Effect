// Select the canvas element from the DOM using its ID
const canvas = document.getElementById("canvas");

// Get the 2D rendering context, which provides the methods to draw on the canvas
const ctx = canvas.getContext("2d");

// Set the canvas dimensions to match the full browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the characters to be used in the animation (Letters only)
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Set the size of the font; this also determines the width of each column
const fontSize = 18;

// Calculate how many columns can fit across the screen width
const columns = Math.floor(canvas.width / fontSize);

// The drops array stores the vertical (Y) position of each column's "raindrop"
let drops = [];
for (let i = 0; i < columns; i++) {
    // Initialize each drop at a random starting Y position to prevent a flat line at the start
    drops[i] = Math.random() * canvas.height / fontSize;
}

function animate() {
    // Draw a semi-transparent black rectangle over the entire canvas every frame.
    // This creates the "fading trail" effect as previous frames are partially covered.
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font style
    ctx.fillStyle = "lime";
    ctx.font = fontSize + "px monospace";

    // Loop through each column to draw a character
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character from our letters string
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // Draw the character at (x, y) coordinates
        // X is the column index * fontSize; Y is the drop's position * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move the drop down by one unit for the next frame
        drops[i]++;

        // If the drop hits the bottom, reset it to the top randomly.
        // The Math.random() check ensures columns don't all reset at the exact same time.
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
            drops[i] = 0;
        }
    }

    // Tells the browser to run the animate function again for the next animation frame
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// Update canvas size if the user resizes their browser window
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
