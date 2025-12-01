// Get form and input elements
const form = document.getElementById('interestForm');
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const timeInput = document.getElementById('time');
const resultContainer = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

// Result elements
const resultPrincipal = document.getElementById('resultPrincipal');
const resultInterest = document.getElementById('resultInterest');
const resultTotal = document.getElementById('resultTotal');

// Function to format currency
function formatCurrency(amount) {
    return 'NRS ' + amount.toLocaleString('en-NP', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Function to calculate simple interest
function calculateSimpleInterest(principal, rate, time) {
    const interest = (principal * rate * time) / 100;
    const total = principal + interest;
    return {
        principal: principal,
        interest: interest,
        total: total
    };
}

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);
    
    // Validate inputs
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }
    
    if (principal <= 0 || rate < 0 || time <= 0) {
        alert('Please enter positive values for principal, rate, and time.');
        return;
    }
    
    // Calculate simple interest
    const result = calculateSimpleInterest(principal, rate, time);
    
    // Display results
    resultPrincipal.textContent = formatCurrency(result.principal);
    resultInterest.textContent = formatCurrency(result.interest);
    resultTotal.textContent = formatCurrency(result.total);
    
    // Show result container and reset button
    resultContainer.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    
    // Scroll to results smoothly
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Handle reset button
resetBtn.addEventListener('click', function() {
    // Reset form
    form.reset();
    
    // Hide result container and reset button
    resultContainer.classList.add('hidden');
    resetBtn.classList.add('hidden');
    
    // Focus on principal input
    principalInput.focus();
});

// Add input validation on the fly
[principalInput, rateInput, timeInput].forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});

