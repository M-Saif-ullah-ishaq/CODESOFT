// app.js
document.getElementById('reservationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const seatNumber = document.getElementById('seatNumber').value;
  
    const response = await fetch('/reserveTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, seatNumber }),
    });
  
    const result = await response.text();
    alert(result);
  });
  