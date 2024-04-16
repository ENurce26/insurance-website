document.getElementById('inquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form data
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var telephone = document.getElementById('telephone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var dob = document.getElementById('dob') ? document.getElementById('dob').value : '';
    var smoker = document.getElementById('smoker') ? document.getElementById('smoker').value : '';

    // Log form data for verification (optional)
    console.log('Form submitted', { firstName, lastName, telephone, email, message, dob, smoker });

    // Use fetch API to send the form data to the server
    fetch('http://localhost:3015/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            telephone: telephone,
            email: email,
            message: message,
            dob: dob,
            smoker: smoker
        })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    // Optionally, display a thank you message or clear the form
    alert('Thank you for your inquiry. We will be in touch soon!');
    this.reset();  // Clears the form
    document.getElementById('policyFields').innerHTML = '';  // Clear the policy fields if present
});

// Add policy fields if the policy checkbox is checked
function addPolicyFields() {
    var checkbox = document.getElementById('policy');
    var policyFields = document.getElementById('policyFields');

    if (checkbox.checked) {
        policyFields.innerHTML = `
            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required>
            <label>Are you a smoker?</label>
            <div>
                <button type="button" onclick="setSmoker('yes')">Yes</button>
                <button type="button" onclick="setSmoker('no')">No</button>
            </div>
            <input type="hidden" id="smoker" name="smoker" value="">
        `;
    } else {
        policyFields.innerHTML = '';
    }
}

// Function to set the smoker value
function setSmoker(value) {
    document.getElementById('smoker').value = value;
    // Add any additional UI changes to indicate selection, if needed
}

// Attach the addPolicyFields function to the checkbox for Policy
document.getElementById('policy').onchange = addPolicyFields;
