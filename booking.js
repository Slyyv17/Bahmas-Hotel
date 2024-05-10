const paymentForm = document.createElement('form');
paymentForm.setAttribute('id', 'paymentForm');

const amountInput = document.createElement('input');
amountInput.setAttribute('type', 'hidden');
amountInput.setAttribute('id', 'amount');
paymentForm.appendChild(amountInput);

document.body.appendChild(paymentForm);

function payNow(amount) {
    const email = document.getElementById("email").value;

    document.getElementById("amount").value = amount;

    payWithPaystack(email, amount);
}

function payWithPaystack(email, amount) {
    let handler = PaystackPop.setup({
        key: 'pk_test_f1c3eca0f7d0742d75d74cb0b732039562baacbb', // Replace with your public key
        email: email,
        amount: amount * 100, // Amount in kobo
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (response) {
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
        }
    });

    handler.openIframe();
}

function bookNow() {
    updatePrice();
}

function updatePrice() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const rooms = document.getElementById("rooms").value;
    const guests = document.getElementById("guests").value;
    const checkIn = document.getElementById("check-in").value;
    const checkOut = document.getElementById("check-out").value;

    if (email && username && rooms && guests && checkIn && checkOut) {
        const duration = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

        let price;

        switch (rooms) {
            case "suite":
                price = 150000.00; // price for suite room
                break;
            case "deluxe":
                price = 125000.00; // price for deluxe room
                break;
            case "standard":
                price = 100000.00; // price for standard room
                break;
            default:
                document.getElementById("result").textContent = "Select a room please";
                return; // Exit the function if room is not selected
        }

        const totalPrice = price * parseFloat(guests) * duration;
        document.getElementById("result").textContent = "Total Price: N" + totalPrice.toFixed(2); // Convert totalPrice to string with 2 decimal places

        // Proceed to payment
        payNow(totalPrice);
    } else {
        document.getElementById("result").textContent = "Please fill all fields.";
    }
}

// Initialize minimum check-out date based on today's date
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = today.getFullYear();
const minDate = yyyy + '-' + mm + '-' + dd;
document.getElementById("check-in").setAttribute("min", minDate);
document.getElementById("check-out").setAttribute("min", minDate);

// Add event listener to check-in date input
document.getElementById("check-in").addEventListener('change', function () {
    document.getElementById("check-out").setAttribute("min", this.value);
});
