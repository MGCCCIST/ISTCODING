document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Make the canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set background color
    ctx.fillStyle = '#ffffff'; // Set the color to #0c1c44
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the new color

    // Create particles array
    let particlesArray;

    // Get mouse position
    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height/80) * (canvas.width/80)
    }

    window.addEventListener('mousemove', 
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
    );

// ... (previous code remains unchanged)

// Load the image
const particleImage = new Image();
particleImage.src = 'bulldog_hphones.png'; // Replace with the path to your image file

// Modify the Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size; // size will be used to scale the image
        this.color = color; // this can be removed if not using color
        this.image = particleImage;
    }
    // Method to draw individual particle
    draw() {
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // Draw particle
        this.draw();
    }
}

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 19000;
        for(let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 300) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 5) - 2.5;
            let directionY = (Math.random() * 5) - 2.5;
            let color = '#ffffff';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Instead of clearing the canvas, draw a semi-transparent rectangle over the entire canvas
    // This will give the effect of a tail or tracer because the previous positions of the particles
    // will fade out slowly.
    ctx.fillStyle = 'rgba(12, 28, 68, 0.2)'; // Adjust the last value to control the trail length
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}


    // Resize event
    window.addEventListener('resize', 
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            mouse.radius = ((canvas.height/80) * (canvas.height/80));
            init();
        }
    );

    // Mouse out event
    window.addEventListener('mouseout',
        function() {
            mouse.x = undefined;
            mouse.y = undefined;
        }
    )

    init();
    animate();
});
