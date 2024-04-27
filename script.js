document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navbar-links');
    var links = navLinks.querySelectorAll('.nav-link');

    // Toggle hamburger menu
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close hamburger menu when a link is clicked
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // Initialize the 3D model view
    init();
});

let scene, camera, renderer, model, controls, allowOrbitControls = true;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Adjust camera position to fit the model
    camera.position.set(0, 0, 7); // Adjust the z-coordinate according to your needs

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('car-model').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 500, 300);
    scene.add(directionalLight);

    // Load the model
    const loader = new THREE.GLTFLoader();
    loader.load('merecedes_amg_gt.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
        
        // Calculate the scale factor based on the screen size
        const scaleFactor = 1.0 / Math.max(model.scale.x, model.scale.y, model.scale.z);
        
        // Apply the scale factor to fit the model on the screen
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        animate();
    });

    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zooming to prevent accidental zoom
    controls.enabled = allowOrbitControls;
}

function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0.01; // Optionally rotate the model
    }
    controls.update(); // Only required if damping or auto-rotation is enabled.
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle touch events to enable/disable OrbitControls
window.addEventListener('touchstart', function () {
    allowOrbitControls = true;
    controls.enabled = allowOrbitControls;
});

window.addEventListener('touchmove', function () {
    allowOrbitControls = false;
    controls.enabled = allowOrbitControls;
});

window.addEventListener('touchend', function () {
    allowOrbitControls = true;
    controls.enabled = allowOrbitControls;
});


let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-slide .slide');
    slideIndex += step;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}

document.addEventListener('DOMContentLoaded', function () {
    moveSlide(0); // Initialize the first slide position
});