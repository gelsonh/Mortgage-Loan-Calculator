function valueEntered() {
  const amount = parseFloat(document.getElementById("loanAmount").value);
  const term = parseFloat(document.getElementById("termMonths").value);
  const rate = parseFloat(document.getElementById("interestRate").value) / 100;

  // Validate input
  if (amount <= 0 || term <= 0 || rate <= 0) {
    alert("Please enter valid values.");
    return;
  }

  // Call the calcLoan function with the values entered by the user
  calcLoan(amount, term, rate);
}

function calcLoan(amount, term, rate) {
  // Calculate the monthly interest rate
  const monthlyRate = rate / 12;

  // Calculate the monthly payment
  const monthlyPayment =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

  // Display monthly payment
  document.getElementById("results").innerHTML =
    "$" + monthlyPayment.toFixed(2);

  // Total principal
  const totalPrincipal = amount;
  document.getElementById("totalPrincipal").innerHTML =
    "$" +
    totalPrincipal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Total interest
  const totalInterest = monthlyPayment * term - amount;
  document.getElementById("totalInterest").innerHTML =
    "$" +
    totalInterest.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Total cost
  const totalCost = amount + totalInterest;
  document.getElementById("totalCost").innerHTML =
    "$" +
    totalCost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  displayResults(amount, term, monthlyRate, monthlyPayment);
}

function displayResults(amount, term, monthlyRate, monthlyPayment) {
  // Total interest
  const totalInterest = monthlyPayment * term - amount;

  // display total interest
  document.getElementById("totalInterest").value = totalInterest.toFixed(2);

  // Get the table body element
  const tableBody = document.getElementById("mortgageTable");

  // Clear the table body
  tableBody.innerHTML = "";

  let balance = amount;
  let totalInterestPaid = 0;
  for (let month = 1; month <= term; month++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    totalInterestPaid += interestPaid;
    balance -= principalPaid;

    // Create a new row
    const newRow = document.createElement("tr");

    newRow.innerHTML = `<td>${month}</td><td>$${monthlyPayment.toLocaleString(
      "en-US",
      {minimumFractionDigits: 2}
    )}</td><td>$${principalPaid.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}</td><td>$${interestPaid.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}</td><td>$${totalInterestPaid.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}</td><td>$${balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}</td>`;

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  }
}
