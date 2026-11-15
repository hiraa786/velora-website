<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VELORA | Admin Panel</title>
<style>
  body {
    background-color: #F5EBDD;
    color: #241812;
    font-family: 'Poppins', sans-serif;
    padding: 40px;
  }
  h1 {
    font-family: 'Cormorant Garamond', serif;
    color: #6B4935;
    text-align: center;
  }
  .order-card {
    background: white;
    border: 1px solid #D8C5A9;
    border-left: 5px solid #B99561;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }
  .order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 10px;
    margin-bottom: 15px;
    font-size: 14px;
  }
  .order-date { color: #888; }
  .customer-info p { margin: 5px 0; font-size: 15px; }
  .customer-info strong { color: #6B4935; }
  .book-list {
    background: #f9f9f9;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 15px;
  }
  .book-item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .total-price {
    text-align: right;
    font-weight: bold;
    color: #B99561;
    font-size: 18px;
    margin-top: 15px;
  }
</style>
</head>
<body>

  <h1>VELORA - Admin Panel (Orders)</h1>
  <div id="orders-container">
    <p style="text-align:center;">Orders load ho rahe hain...</p>
  </div>

<script>
  const API = "http://localhost:5000/api";

  async function loadOrders() {
    try {
      const response = await fetch(`${API}/admin/orders`);
      const orders = await response.json();
      const container = document.getElementById("orders-container");
      
      if (orders.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Abhi tak koi order nahi aya.</p>";
        return;
      }

      container.innerHTML = ""; // Purana data clear karein

      orders.forEach(order => {
        // Date format karein
        const date = new Date(order.createdAt).toLocaleString();

        // Books ki list banayein
        let booksHTML = "";
        order.items.forEach(item => {
          const bookTitle = item.book ? item.book.title : "Unknown Book (Deleted)";
          const bookPrice = item.price;
          booksHTML += `
            <div class="book-item">
              <span>📚 ${bookTitle} (x${item.quantity})</span>
              <span>Rs. ${bookPrice * item.quantity}</span>
            </div>
          `;
        });

        // Card HTML
        const card = `
          <div class="order-card">
            <div class="order-header">
              <span>Order ID: ...${order._id.slice(-6)}</span>
              <span class="order-date">${date}</span>
            </div>
            
            <div class="customer-info">
              <p><strong>Phone:</strong> ${order.phone}</p>
              <p><strong>Address:</strong> ${order.address}</p>
              <p><strong>Status:</strong> <span style="color: orange;">${order.status}</span></p>
            </div>

            <div class="book-list">
              <p style="font-size:12px; color:#666; margin-bottom:8px;">BOOKS ORDERED:</p>
              ${booksHTML}
            </div>

            <div class="total-price">
              Total: Rs. ${order.totalAmount}
            </div>
          </div>
        `;
        
        container.innerHTML += card;
      });

    } catch (error) {
      document.getElementById("orders-container").innerHTML = 
        "<p style='color:red; text-align:center;'>Error: Server se connect nahi ho saka. Check karein ke backend chal raha hai.</p>";
    }
  }

  loadOrders();
</script>

</body>
</html>