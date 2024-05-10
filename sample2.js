function payWithPaystack(e) {
    e.preventDefault();

    let amountInNaira = parseFloat(document.getElementById("amount").value);
    if (isNaN(amountInNaira)) {
        alert("Please enter a valid amount.");
        return;
    }

    let amountInKobo = Math.round(amountInNaira * 100); // Convert to kobo
    if (amountInKobo <= 0) {
        alert("Amount must be greater than zero.");
        return;
    }

    let handler = PaystackPop.setup({
        key: 'pk_test_f1c3eca0f7d0742d75d74cb0b732039562baacbb', // Replace with your public key
        email: document.getElementById("email-address").value,
        amount: amountInKobo, // Amount in kobo
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
