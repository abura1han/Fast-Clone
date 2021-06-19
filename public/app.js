let resultElement = document.getElementById('net-speed');
let refreshBtn = document.getElementById('refresh');
let unitElement = document.getElementById('unit');

// Recheck the speed when click on the button
refreshBtn.addEventListener('click', netSpeed)

// Get and show net speed
netSpeed();

function netSpeed() {
    // Show loading content
    loadingEffect('create')

    // Default value
    resultElement.innerHTML = '0';

    // Fetch data
    fetch('/netspeed', {
        "method": "POST"
    })
        .then(res => res.json())
        .then(speed => {

            // unit element value
            let unit = (Math.floor(speed) >= 1024 ? "Mbps" : "Kbps")
            unitElement.innerText = unit;

            // Formate current speed
            let currentSpeed = (Math.floor(speed) >= 1024 ? Math.floor(speed / 1000) : Math.floor(speed))

            // Show current speed
            if (currentSpeed.toString().includes('.') && currentSpeed >= 1024) {
                resultElement.innerText = currentSpeed.toFixed(1).toString();
            } else {
                resultElement.innerText = currentSpeed.toString();

            }

            // remove loading content
            loadingEffect('remove');
        })
        .catch(err => { console.log(err) })
}

// When loading start and end thsi function will run
function loadingEffect(action) {
    let loadingBtn = document.getElementById('refresh');
    let loadingText = document.querySelectorAll('.loading');

    // Create and styling loading content
    if (action === "create") {
        loadingBtn.innerHTML = '<i class="bi bi-pause"></i>';
        loadingBtn.classList.add('loading-btn');

        loadingText.forEach(element => {
            element.style.color = "lightgray";
        })

    } else if (action === "remove") {
        // Removing loading style and content
        loadingBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';

        loadingBtn.classList.remove('loading-btn');

        loadingText.forEach(element => {
            element.style.color = "black";
        })
    }
}