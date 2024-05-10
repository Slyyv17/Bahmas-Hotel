// for thr Navigation bar
const navToggle = document.querySelector(".navbar_toggle");
const links = document.querySelector(".main_nav");

navToggle.addEventListener('click', function () {
    links.classList.toggle("show_nav");
})

// Moving Carousels 
const carouselItems = document.querySelectorAll(".carousel_item");
let i = 1;

setInterval(() => {
    // Accessing All the carousel Items
    Array.from(carouselItems).forEach((item, index) => {

        if (i < carouselItems.length) {
            item.style.transform = `translateX(-${i * 100}%)`
        }
    })


    if (i < carouselItems.length) {
        i++;
    }
    else {
        i = 0;
    }
}, 2000)

// sending message to an email
function mailSend() {
    // Default email address
    const defaultEmail = 'ememevictor08@gmail.com';

    // Get the message from the textarea
    const emailInput = document.getElementById("send-input").value;

    // Create the mailto link with default email and message body
    const mailtoLink = `mailto:${defaultEmail}?body=${encodeURIComponent(emailInput)}`;

    // Open the mail client
    window.location.href = mailtoLink;
}
AOS.init();