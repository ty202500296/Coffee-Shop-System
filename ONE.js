




function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}




if (!localStorage.getItem("menu")) {

    const defaultMenu = [

        {
            id: 1,
            name: "Spanish Latte",
            description: "Rich espresso topped with creamy steamed milk and a hint of vanilla.",
            category: "coffee",
            price: 120,
            image: "https:
            available: true,
            ingredients: [
                { name: "Coffee Beans", amount: 18, unit: "g" },
                { name: "Milk", amount: 220, unit: "ml" },
                { name: "Sugar", amount: 8, unit: "g" }
            ]
        },

        {
            id: 2,
            name: "Cappuccino",
            description: "Classic cappuccino with velvety foam and bold espresso flavor.",
            category: "coffee",
            price: 110,
            image: "https:
            available: true,
            ingredients: [
                { name: "Coffee Beans", amount: 20, unit: "g" },
                { name: "Milk", amount: 150, unit: "ml" },
                { name: "Sugar", amount: 10, unit: "g" }
            ]
        },

        {
            id: 3,
            name: "Matcha",
            description: "Smooth matcha latte made with premium green tea powder.",
            category: "non_coffee",
            price: 130,
            image: "https:
            available: true,
            ingredients: [
                { name: "Matcha Powder", amount: 15, unit: "g" },
                { name: "Milk", amount: 200, unit: "ml" },
                { name: "Sugar", amount: 8, unit: "g" }
            ]
        },

        {
            id: 4,
            name: "Fries",
            description: "Crispy golden fries seasoned with our signature spice blend.",
            category: "snacks",
            price: 90,
            image: "https:
            available: true,
            ingredients: [
                { name: "Potatoes", amount: 150, unit: "g" },
                { name: "Oil", amount: 20, unit: "ml" },
                { name: "Salt", amount: 5, unit: "g" }
            ]
        }

    ];

    saveData("menu", defaultMenu);
}


if (!localStorage.getItem("announcements")) {

    saveData("announcements", [
        {
            title: "WELCOME TO BLACK CUP",
            message: "Enjoy our premium coffee experience!",
            type: "store_update",
            created_at: new Date()
        }
    ]);

}

if (!localStorage.getItem("ingredients")) {
    saveData("ingredients", [
        { id: 1, name: "Coffee Beans", stock: 1000, unit: "g", minStock: 200, maxStock: 1000 },
        { id: 2, name: "Milk", stock: 5000, unit: "ml", minStock: 1000, maxStock: 5000 },
        { id: 3, name: "Sugar", stock: 1000, unit: "g", minStock: 200, maxStock: 1000 },
        { id: 4, name: "Matcha Powder", stock: 500, unit: "g", minStock: 100, maxStock: 500 },
        { id: 5, name: "Potatoes", stock: 2000, unit: "g", minStock: 500, maxStock: 2000 },
        { id: 6, name: "Oil", stock: 2000, unit: "ml", minStock: 500, maxStock: 2000 },
        { id: 7, name: "Salt", stock: 500, unit: "g", minStock: 100, maxStock: 500 }
    ]);
}

if (!localStorage.getItem("vouchers")) {
    saveData("vouchers", [
        { id: "V10", code: "BLACK10", description: "10% off your order", discount: 0.10 },
        { id: "V15", code: "GOLD15", description: "15% off orders above ₱200", discount: 0.15 },
        { id: "F1", code: "FREESIP", description: "Free drink on next visit", discount: 0 }
    ]);
}

if (!localStorage.getItem("payments")) {
    saveData("payments", []);
}

if (!localStorage.getItem("receipts")) {
    saveData("receipts", []);
}


const barangays = {
    "Tugbungan": {
        distance: 29,
        streets: ["Tugbungan Road", "San Jose Street", "Veterans Avenue", "Purok 1", "Purok 2"]
    },
    "Tumaga": {
        distance: 15,
        streets: ["Tumaga Road", "Pasonanca Road", "Don Pablo Lorenzo Street", "Purok 3", "Purok 4"]
    },
    "Boalan": {
        distance: 24,
        streets: ["Boalan Road", "Governor Camins Avenue", "Purok 5", "Purok 6", "Purok 7"]
    },
    "Ayala": {
        distance: 10,
        streets: ["Ayala Street", "Rizal Avenue", "Purok 8", "Purok 9", "Purok 10"]
    },
    "Baliwasan": {
        distance: 10,
        streets: ["Baliwasan Road", "Valderosa Street", "Purok 11", "Purok 12", "Purok 13"]
    }
};

function getPayments() {
    return getData("payments");
}

function savePayments(list) {
    saveData("payments", list);
}

function getReceipts() {
    return getData("receipts");
}

function saveReceipts(list) {
    saveData("receipts", list);
}

function parseIngredientLine(text) {
    const raw = text.trim();
    if (!raw) return null;
    const parts = raw.split(":");
    if (parts.length < 2) return null;
    const name = parts[0].trim();
    const amountText = parts[1].trim();
    const match = amountText.match(/^([0-9]+(?:\.[0-9]+)?)(\s*)(g|ml)$/i);
    if (!match) return null;
    return {
        name,
        amount: parseFloat(match[1]),
        unit: match[3].toLowerCase()
    };
}

function parseIngredientsText(text) {
    return text.split(",").map(line => parseIngredientLine(line)).filter(Boolean);
}

function getIngredients() {
    return getData("ingredients");
}

function saveIngredients(list) {
    saveData("ingredients", list);
}

function getVoucherById(id) {
    return getData("vouchers").find(v => v.id === id) || null;
}

function getIngredientByName(name) {
    return getIngredients().find(i => i.name.toLowerCase() === name.toLowerCase());
}

function getIngredientStatus(stock, minStock) {
    if (stock <= 0) return { label: "Out of Stock", color: "#dc3545", class: "badge-out-of-stock" };
    if (stock <= minStock) return { label: "Low Stock", color: "#ffc107", class: "badge-low-stock" };
    return { label: "Available", color: "#28a745", class: "badge-available" };
}

function getItemRequirements(item, quantity = 1) {
    if (!item.ingredients || !item.ingredients.length) return [];
    return item.ingredients.map(i => ({
        name: i.name,
        amount: Number(i.amount || 0) * quantity,
        unit: i.unit || "g"
    }));
}

function canFulfillItem(item, quantity = 1) {
    return getItemRequirements(item, quantity).every(req => {
        const ingredient = getIngredientByName(req.name);
        return ingredient && ingredient.stock >= req.amount;
    });
}

function calculateOrderIngredients(cart) {
    const totals = {};
    cart.forEach(item => {
        const quantity = Number(item.quantity || 1);
        getItemRequirements(item, quantity).forEach(req => {
            totals[req.name] = (totals[req.name] || 0) + req.amount;
        });
    });
    return totals;
}

function deductIngredients(cart) {
    const ingredients = getIngredients();
    const totals = calculateOrderIngredients(cart);
    Object.entries(totals).forEach(([name, amount]) => {
        const ingredient = ingredients.find(i => i.name.toLowerCase() === name.toLowerCase());
        if (ingredient) {
            ingredient.stock = Math.max(0, ingredient.stock - amount);
        }
    });
    saveIngredients(ingredients);
}

function updateMenuAvailability() {
    const menu = getData("menu");
    menu.forEach(item => {
        item.available = canFulfillItem(item, 1);
    });
    saveData("menu", menu);
}

function getCart() {
    return getData("cart");
}

function saveCart(cart) {
    saveData("cart", cart);
}

function showToast(message, type = "info") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.className = "show";

    if (type === "warning") {

        toast.style.backgroundColor = "#ffc107";

        toast.style.color = "#000";

    } else if (type === "error") {

        toast.style.backgroundColor = "#dc3545";

        toast.style.color = "#fff";

    } else {

        toast.style.backgroundColor = "#d4af37";

        toast.style.color = "#000";

    }

    setTimeout(() => {

        toast.className = "";

    }, 3000);

}

function calculateCartTotal(cart) {
    return cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
}

function makeQuantityControls(index, quantity) {
    return `
        <button class="qty-btn" onclick="changeCartQuantity(${index}, -1)">−</button>
        <span>${quantity}</span>
        <button class="qty-btn" onclick="changeCartQuantity(${index}, 1)">+</button>
    `;
}

window.changeCartQuantity = function(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;
    const item = cart[index];
    const newQuantity = Math.max(0, Number(item.quantity || 1) + delta);
    if (newQuantity === 0) {
        cart.splice(index, 1);
    } else {
        if (!canFulfillItem(item, newQuantity)) {
            showToast(`Not enough ingredients for ${item.name} (${newQuantity}x)`, "error");
            return;
        }
        item.quantity = newQuantity;
    }
    saveCart(cart);
    if (document.getElementById("cartItems")) loadCart();
    if (document.getElementById("orderList")) renderCheckoutSummary();
};

window.renderCheckoutSummary = function() {
    const cart = getCart();
    const orderList = document.getElementById("orderList");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const deliveryFeeEl = document.getElementById("deliveryFee");
    const discountEl = document.getElementById("discount");
    const deliveryType = document.getElementById("deliveryType");
    const deliveryKm = Number(document.getElementById("deliveryKm")?.value || 0);
    const voucherId = document.getElementById("voucherSelect")?.value;
    const voucher = getVoucherById(voucherId);
    if (!orderList) return;
    orderList.innerHTML = "";
    let subtotal = 0;
    let valid = true;
    cart.forEach(item => {
        const quantity = Number(item.quantity || 1);
        const lineTotal = Number(item.price) * quantity || 0;
        subtotal += lineTotal;
        const customization = item.customization || {};
        let customText = "";
        if (customization.sweetness) customText += `🍬 ${customization.sweetness} | `;
        if (customization.strength) customText += `☕ ${customization.strength} | `;
        if (customization.foam) customText += `🫧 ${customization.foam} | `;
        const available = canFulfillItem(item, quantity);
        if (!available) valid = false;
        orderList.innerHTML += `
        <li style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding:8px 0; ${!available ? 'opacity:0.6;' : ''}">
            <div>
                <div>${item.name} (${quantity}x)</div>
                <div style="font-size:11px; color:#999;">${customText}</div>
                ${!available ? `<div style="color:#dc3545; font-size:12px;">Not enough ingredients</div>` : ''}
            </div>
            <div>₱${lineTotal.toFixed(2)}</div>
        </li>
        `;
    });
    const deliveryFee = deliveryType && deliveryType.value === "delivery" ? getDeliveryRate() * deliveryKm : 0;
    const discount = voucher ? subtotal * voucher.discount : 0;
    const total = Math.max(0, subtotal + deliveryFee - discount);
    if (subtotalEl) subtotalEl.innerText = "₱" + subtotal.toFixed(2);
    if (deliveryFeeEl) deliveryFeeEl.innerText = "₱" + deliveryFee.toFixed(2);
    if (discountEl) discountEl.innerText = `-₱${discount.toFixed(2)}`;
    const paymentMethodSummaryEl = document.getElementById("paymentMethodSummary");
    if (paymentMethodSummaryEl) {
        const selectedMethod = paymentMethodSelect?.value;
        paymentMethodSummaryEl.innerText = selectedMethod === "gcash" ? "GCash" : selectedMethod === "paymaya" ? "PayMaya" : "Cash on Delivery / Pickup";
    }
    if (totalEl) totalEl.innerText = "₱" + total.toFixed(2);
    const submitButton = document.querySelector('#checkoutForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = cart.length === 0 || !valid;
        submitButton.title = cart.length === 0 ? "Add items to cart first" : !valid ? "Resolve ingredient shortages before checkout" : "";
    }
};

window.removeCartItem = function(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    if (document.getElementById("cartItems")) loadCart();
    if (document.getElementById("orderList")) renderCheckoutSummary();
};

function getCurrentUserName() {
    const user = JSON.parse(localStorage.getItem("currentUser")) || {};
    return user.firstname ? `${user.firstname} ${user.lastname || ""}`.trim() : user.username || "Guest";
}

window.viewReceipt = function(orderId) {
    const orders = getData("orders");
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    let receiptContent = `
        <div style="background:#fff; color:#000; padding:30px; border-radius:8px; max-width:600px; font-family:'Courier New', monospace;">
            <h2 style="text-align:center; color:#d4af37; margin-bottom:10px; border-bottom:2px solid #d4af37; padding-bottom:10px;">☕ BLACK CUP</h2>
            <p style="text-align:center; font-size:12px; color:#666;">Premium Coffee Shop</p>
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            
            <p style="text-align:center; font-weight:bold;">ORDER RECEIPT</p>
            <p style="text-align:center; font-size:12px;">Order #: ${order.id}</p>
            <p style="text-align:center; font-size:12px;">Date: ${new Date(order.created_at).toLocaleString()}</p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p><strong>Customer:</strong> ${order.customer || 'Guest'}</p>
            <p><strong>Payment:</strong> ${order.payment_method || order.payment || 'N/A'}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="font-weight:bold;">ITEMS:</p>
        `;
    let total = 0;
    (order.items || []).forEach(item => {
        const qty = Number(item.quantity || 1);
        const price = Number(item.price || 0) * qty;
        total += price;
        const customization = item.customization || {};
        let customText = customization.sweetness ? ` [${customization.sweetness}]` : "";
        customText += customization.strength ? ` [${customization.strength}]` : "";
        receiptContent += `<p style="display:flex; justify-content:space-between; font-size:12px; margin:5px 0;">
                <span>${item.name} ${customText}<br>(${qty}x)</span>
                <span>₱${price.toFixed(2)}</span>
            </p>`;
    });
    const paymentMethod = order.payment_method || order.payment || 'N/A';
    const paymentStatus = order.payment_status || 'Pending';
    const customerContact = order.contact || 'N/A';
    const deliveryType = order.delivery || 'N/A';
    const address = order.address || 'N/A';
    const landmark = order.landmark || 'N/A';
    const notes = order.notes || 'None';
    const voucherCode = order.voucher || 'None';
    receiptContent += `
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p><strong>Customer Contact:</strong> ${customerContact}</p>
            <p><strong>Delivery Type:</strong> ${deliveryType}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Landmark:</strong> ${landmark}</p>
            <p><strong>Voucher:</strong> ${voucherCode}</p>
            <p><strong>Order Notes:</strong> ${notes}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Payment Status:</strong> ${paymentStatus}</p>
            <p><strong>Payment Ref:</strong> ${order.payment_ref || 'N/A'}</p>
            <p><strong>Payment Account:</strong> ${order.payment_account || 'N/A'}</p>
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px;">
                <span>TOTAL:</span>
                <span>₱${total.toFixed(2)}</span>
            </p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="text-align:center; font-size:11px; color:#666;">Thank you for your order!</p>
            <p style="text-align:center; font-size:10px; color:#999;">© 2025 BLACK CUP Coffee Shop</p>
            
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button onclick="printReceipt()" class="btn btn-primary" style="flex:1; padding:8px; font-size:12px;">🖨️ Print</button>
                <button onclick="downloadReceipt()" class="btn btn-primary" style="flex:1; padding:8px; font-size:12px;">⬇️ Download</button>
            </div>
        </div>
        `;
    let modal = document.getElementById("receiptModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "receiptModal";
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center; display:flex; padding:20px;";
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="max-width:600px; width:100%; max-height:90vh; overflow-y:auto;">
            ${receiptContent}
            <div style="text-align:center; margin-top:20px;">
                <button onclick="document.getElementById('receiptModal').style.display='none';" class="btn" style="padding:10px 20px; background:#ccc; color:#000;">Close</button>
            </div>
        </div>
        `;
    modal.style.display = "flex";
};

function getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("currentUser")) || { username: "Guest" };
}

function getDeliveryRate() {
    const settings = JSON.parse(localStorage.getItem("settings")) || {};
    return Number(settings.delivery_rate) || 6;
}

function getLoyaltyPointsPerItem() {
    const settings = JSON.parse(localStorage.getItem("settings")) || {};
    return Number(settings.loyalty_points) || 5;
}

updateMenuAvailability();




if (document.getElementById("announcementsList")) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && document.getElementById("userGreeting")) {
        document.getElementById("userGreeting").textContent = `Hello, ${currentUser.firstname || currentUser.username}!`;
    }

    const announcements = getData("announcements");

    const list = document.getElementById("announcementsList");

    announcements.forEach(a => {

        list.innerHTML += `

        <div style="
            background:#1a1a1a;
            padding:20px;
            border-left:4px solid #d4af37;
            border-radius:8px;
        ">

            <h3 style="color:white;">
                ${a.title}
            </h3>

            <p style="color:#ccc;">
                ${a.message}
            </p>

        </div>

        `;

    });

}





if (document.getElementById("menuGrid")) {

    const menuGrid = document.getElementById("menuGrid");

    const menu = getData("menu");

    const cart = getData("cart");



    function displayMenu(category = "coffee") {

        menuGrid.innerHTML = "";

        const filtered = menu.filter(item => item.category === category);

        filtered.forEach(item => {

            const available = canFulfillItem(item, 1);

            menuGrid.innerHTML += `

            <div class="menu-card ${!available ? 'out-of-stock' : ''}">

                <img src="${item.image}" width="100%">

                <h3>${item.name}</h3>

                ${item.description ? `<p class="menu-desc">${item.description}</p>` : ``}

                <p>₱${Number(item.price).toFixed(2)}</p>

                <button onclick="addToCart(${item.id})" ${!available ? 'disabled' : ''}>
                    ${available ? 'Add to Cart' : 'Out of Stock'}
                </button>

            </div>

            `;

        });

    }



    displayMenu();



    document.querySelectorAll(".choice").forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".choice")
            .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            displayMenu(btn.dataset.category);

        });

    });



    window.addToCart = function(id) {

        const item = menu.find(m => m.id === id);

        if (!canFulfillItem(item, 1)) {

            alert("Out of Stock!");

            return;

        }

        
        showCustomizationModal(item);

    };

    function showCustomizationModal(item) {

        
        let modal = document.getElementById("customizationModal");

        if (!modal) {

            modal = document.createElement("div");

            modal.id = "customizationModal";

            modal.innerHTML = `

            <div style="background:#111; padding:30px; border-radius:8px; border:1px solid #d4af37; max-width:400px; width:90%;">

                <h3 style="color:#d4af37; margin-bottom:15px;">Customize Your Order</h3>

                <div id="customItemName" style="font-size:18px; margin-bottom:20px;"></div>

                <div class="custom-options">

                    <div style="margin-bottom:15px;">

                        <label style="display:block; margin-bottom:5px; color:#ccc;">Sweetness Level</label>

                        <select id="sweetness" style="width:100%; padding:8px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:4px;">

                            <option value="0%">0%</option>

                            <option value="25%">25%</option>

                            <option value="50%" selected>50%</option>

                            <option value="75%">75%</option>

                            <option value="100%">100%</option>

                        </select>

                    </div>

                    <div style="margin-bottom:15px;">

                        <label style="display:block; margin-bottom:5px; color:#ccc;">Coffee Strength</label>

                        <select id="strength" style="width:100%; padding:8px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:4px;">

                            <option value="Normal">Normal</option>

                            <option value="Strong">Strong</option>

                            <option value="Extra Strong">Extra Strong</option>

                        </select>

                    </div>

                    <div style="margin-bottom:15px;">

                        <label style="display:block; margin-bottom:5px; color:#ccc;">Extra Foam</label>

                        <select id="foam" style="width:100%; padding:8px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:4px;">

                            <option value="No">No</option>

                            <option value="Yes">Yes</option>

                        </select>

                    </div>

                    <div style="margin-bottom:20px;">

                        <label style="display:block; margin-bottom:5px; color:#ccc;">Notes / Special Request</label>

                        <textarea id="notes" rows="3" style="width:100%; padding:8px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:4px;" placeholder="Any special instructions..."></textarea>

                    </div>

                </div>

                <div style="display:flex; gap:10px;">

                    <button onclick="addToCartWithCustomization()" class="btn btn-primary" style="flex:1;">Add to Cart</button>

                    <button onclick="closeCustomizationModal()" class="btn" style="flex:1; background:#ccc; color:#000;">Cancel</button>

                </div>

            </div>

            `;

            modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center; display:flex;";

            document.body.appendChild(modal);

        }

        document.getElementById("customItemName").textContent = item.name;

        modal.style.display = "flex";

        

        modal.currentItem = item;

    }

    window.closeCustomizationModal = function() {

        document.getElementById("customizationModal").style.display = "none";

    };

    window.addToCartWithCustomization = function() {

        const modal = document.getElementById("customizationModal");

        const item = modal.currentItem;

        const customization = {

            sweetness: document.getElementById("sweetness").value,

            strength: document.getElementById("strength").value,

            foam: document.getElementById("foam").value,

            notes: document.getElementById("notes").value

        };

        const cartItem = {

            ...item,

            quantity: 1,

            customization: customization

        };

        cart.push(cartItem);

        saveData("cart", cart);

        loadCart();

        closeCustomizationModal();

        showToast(item.name + " added to cart!", "success");

    };



    function loadCart() {

        const cartItems = document.getElementById("cartItems");

        const totalEl = document.getElementById("cartTotal");

        if (!cartItems) return;

        const cart = getCart();

        cartItems.innerHTML = "";

        let total = 0;
        let invalid = false;

        cart.forEach((item, index) => {

            const quantity = Number(item.quantity || 1);

            const subtotal = Number(item.price || 0) * quantity;

            total += subtotal;

            const customization = item.customization || {};

            let customText = "";

            if (customization.sweetness) customText += `🍬 ${customization.sweetness} | `;

            if (customization.strength) customText += `☕ ${customization.strength} | `;

            if (customization.foam) customText += `🫧 ${customization.foam} | `;

            const available = canFulfillItem(item, quantity);
            if (!available) {
                invalid = true;
            }

            cartItems.innerHTML += `

            <li style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:10px; margin-bottom:10px; ${!available ? 'opacity:0.6;' : ''}">

                <div style="flex:1;">

                    <div style="font-weight:bold;">${item.name}${!available ? ' <span style=\"color:#dc3545;font-size:12px;\">(Insufficient ingredients)</span>' : ''}</div>

                    <div style="font-size:11px; color:#666;">${customText}</div>

                    <div>${makeQuantityControls(index, quantity)}</div>

                </div>

                <div style="text-align:right;">

                    <div>₱${subtotal.toFixed(2)}</div>

                    <button onclick="removeCartItem(${index})" style="font-size:11px; padding:3px 6px; background:#dc3545; color:white; border:none; border-radius:3px; cursor:pointer;">Remove</button>

                </div>

            </li>

            `;

        });

        totalEl.innerText = "₱" + total.toFixed(2);

        const checkoutButton = document.getElementById("checkoutBtn");
        if (checkoutButton) {
            checkoutButton.disabled = cart.length === 0 || invalid;
            if (invalid) checkoutButton.title = "Some cart items cannot be fulfilled due to ingredient shortages.";
            else checkoutButton.title = "";
        }

    }

    loadCart();



    const checkoutBtn = document.getElementById("checkoutBtn");

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            window.location.href = "checkout.html";

        });

    }

}





if (document.getElementById("checkoutForm")) {

    const cart = getData("cart");
    const orderList = document.getElementById("orderList");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const deliveryFeeEl = document.getElementById("deliveryFee");
    const discountEl = document.getElementById("discount");
    const paymentMethodSelect = document.getElementById("paymentMethod");
    const paymentFields = document.getElementById("paymentFields");
    const deliveryTypeSelect = document.getElementById("deliveryType");
    const addressFields = document.getElementById("addressFields");
    const deliveryKmInput = document.getElementById("deliveryKm");

    function refreshCheckout() {
        orderList.innerHTML = "";
        let subtotal = 0;
        let valid = true;
        cart.forEach(item => {
            const quantity = Number(item.quantity || 1);
            const lineTotal = Number(item.price || 0) * quantity;
            subtotal += lineTotal;
            const customization = item.customization || {};
            let customText = "";
            if (customization.sweetness) customText += `🍬 ${customization.sweetness} | `;
            if (customization.strength) customText += `☕ ${customization.strength} | `;
            if (customization.foam) customText += `🫧 ${customization.foam} | `;
            const available = canFulfillItem(item, quantity);
            if (!available) valid = false;
            orderList.innerHTML += `
            <li style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding:8px 0; ${!available ? 'opacity:0.6;' : ''}">
                <div>
                    <div>${item.name} (${quantity}x)</div>
                    <div style="font-size:11px; color:#999;">${customText}</div>
                    ${!available ? `<div style="color:#dc3545; font-size:12px;">Not enough ingredients</div>` : ''}
                </div>
                <div>₱${lineTotal.toFixed(2)}</div>
            </li>
            `;
        });

        const voucherId = document.getElementById("voucherSelect")?.value;
        const voucher = getVoucherById(voucherId);
        const deliveryKm = Number(deliveryKmInput?.value || 0);
        const deliveryFee = deliveryTypeSelect && deliveryTypeSelect.value === "delivery" ? getDeliveryRate() * deliveryKm : 0;
        const discount = voucher ? subtotal * voucher.discount : 0;
        const total = Math.max(0, subtotal + deliveryFee - discount);

        if (subtotalEl) subtotalEl.innerText = "₱" + subtotal.toFixed(2);
        if (deliveryFeeEl) deliveryFeeEl.innerText = "₱" + deliveryFee.toFixed(2);
        if (discountEl) discountEl.innerText = `-₱${discount.toFixed(2)}`;
        if (totalEl) totalEl.innerText = "₱" + total.toFixed(2);

        const submitButton = document.querySelector('#checkoutForm button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = cart.length === 0 || !valid;
            submitButton.title = cart.length === 0 ? "Add items to cart first" : !valid ? "Resolve ingredient shortages before checkout" : "";
        }
    }

    function updatePaymentFields() {
        const method = paymentMethodSelect?.value;
        if (paymentFields) {
            paymentFields.style.display = method === "gcash" || method === "paymaya" ? "block" : "none";
        }
    }

    function updateDeliveryFields() {
        if (deliveryTypeSelect && addressFields) {
            if (deliveryTypeSelect.value === "pickup") {
                addressFields.style.display = "none";
            } else {
                addressFields.style.display = "block";
            }
        }
    }

    
    const barangaySelect = document.getElementById("barangaySelect");
    if (barangaySelect) {
        Object.keys(barangays).forEach(barangay => {
            const option = document.createElement("option");
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });
    }

    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener("change", () => {
            updatePaymentFields();
            refreshCheckout();
        });
    }
    if (deliveryTypeSelect) {
        deliveryTypeSelect.addEventListener("change", () => {
            updateDeliveryFields();
            refreshCheckout();
        });
    }
    if (deliveryKmInput) {
        deliveryKmInput.addEventListener("input", refreshCheckout);
    }
    if (barangaySelect) {
        barangaySelect.addEventListener("change", () => {
            const selectedBarangay = barangaySelect.value;
            if (selectedBarangay && barangays[selectedBarangay]) {
                deliveryKmInput.value = barangays[selectedBarangay].distance;
                refreshCheckout();
            }
        });
    }
    document.getElementById("voucherSelect")?.addEventListener("change", refreshCheckout);

    updatePaymentFields();
    updateDeliveryFields();
    refreshCheckout();

    document.getElementById("checkoutForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const cartData = getCart();
        if (cartData.length === 0) {
            showToast("Your cart is empty.", "error");
            return;
        }
        const invalid = cartData.some(item => !canFulfillItem(item, Number(item.quantity || 1)));
        if (invalid) {
            showToast("Cannot checkout while some items are out of stock.", "error");
            return;
        }

        const form = new FormData(this);
        const paymentMethod = form.get("payment_method") || "cash";
        const voucherId = form.get("voucher_id") || "";
        const voucher = getVoucherById(voucherId);
        const deliveryKmValue = Number(form.get("delivery_km") || 0);
        const deliveryType = form.get("delivery_type") || "delivery";
        const deliveryFee = deliveryType === "delivery" ? getDeliveryRate() * deliveryKmValue : 0;
        const subtotal = calculateCartTotal(cartData);
        const discount = voucher ? subtotal * voucher.discount : 0;
        const total = Math.max(0, subtotal + deliveryFee - discount);

        const paymentScreenshot = document.getElementById("paymentScreenshot")?.files?.[0];
        const paymentInfo = {
            method: paymentMethod === "cash" ? "Cash on Delivery" : paymentMethod === "gcash" ? "GCash" : "PayMaya",
            account_name: form.get("account_name") || "",
            reference_no: form.get("reference_no") || "",
            screenshot_name: paymentScreenshot ? paymentScreenshot.name : "",
            screenshot_data: ""
        };

        const createOrder = () => {
            const orders = getData("orders");
            const order = {
                id: "BC" + Date.now(),
                customer: getCurrentUserName(),
                items: cartData,
                total,
                subtotal,
                delivery_fee: deliveryFee,
                discount,
                voucher: voucher ? voucher.code : "",
                status: "Pending",
                payment_method: paymentInfo.method,
                payment_status: "Pending",
                payment_account: paymentInfo.account_name,
                payment_ref: paymentInfo.reference_no,
                contact: form.get("contact") || "",
                address: `${form.get("street") || ""}, ${form.get("barangay") || ""}`.replace(/^,\s*/, ""),
                landmark: form.get("landmark") || "",
                delivery: deliveryType,
                notes: form.get("notes") || "",
                created_at: new Date().toISOString()
            };
            orders.push(order);
            saveData("orders", orders);
            deductIngredients(cartData);
            updateMenuAvailability();
            const payments = getPayments();
            payments.push({
                id: order.id,
                order_id: order.id,
                customer: order.customer,
                amount: total,
                method: order.payment_method,
                status: order.payment_method === "Cash on Delivery" ? "Pending" : "Pending",
                account_name: paymentInfo.account_name,
                reference_no: paymentInfo.reference_no,
                screenshot_name: paymentInfo.screenshot_name,
                screenshot_data: paymentInfo.screenshot_data,
                created_at: order.created_at
            });
            savePayments(payments);
            const receipts = getReceipts();
            receipts.push({
                order_id: order.id,
                created_at: order.created_at,
                customer: order.customer,
                items: order.items,
                payment_method: order.payment_method,
                voucher: order.voucher,
                delivery_fee: order.delivery_fee,
                total: order.total,
                status: order.status,
                address: order.address,
                landmark: order.landmark,
                notes: order.notes
            });
            saveReceipts(receipts);
            const points = parseInt(localStorage.getItem("points") || 0) + cartData.reduce((sum, item) => sum + (Number(item.quantity) || 1) * getLoyaltyPointsPerItem(), 0);
            localStorage.setItem("points", points);
            saveCart([]);
            showToast("Order placed successfully!", "success");
            setTimeout(() => {
                window.location.href = "orders.html";
            }, 600);
        };

        if (paymentScreenshot) {
            const reader = new FileReader();
            reader.onload = function() {
                paymentInfo.screenshot_data = reader.result;
                createOrder();
            };
            reader.readAsDataURL(paymentScreenshot);
        } else {
            createOrder();
        }
    });

}





if (document.getElementById("ordersBody")) {

    const body = document.getElementById("ordersBody");

    function renderCustomerOrders() {
        const orders = getData("orders");
        body.innerHTML = "";

        orders.forEach(order => {
            body.innerHTML += `
        <tr>
            <td>${new Date(order.created_at).toLocaleDateString()}</td>
            <td>${order.id}</td>
            <td>₱${Number(order.total).toFixed(2)}</td>
            <td><span class="badge badge-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm" onclick="viewReceipt('${order.id}')">VIEW</button>
                <button class="btn btn-danger btn-sm" onclick="deleteOrder('${order.id}')">Delete</button>
            </td>
        </tr>
        `;
        });
    }

    renderCustomerOrders();

    window.deleteOrder = function(id) {
        if (!confirm("Delete this order?")) return;
        const orders = getData("orders").filter(o => String(o.id) !== String(id));
        saveData("orders", orders);
        renderCustomerOrders();
    };

    window.viewReceipt = function(orderId) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        
        let receiptContent = `
        <div style="background:#fff; color:#000; padding:30px; border-radius:8px; max-width:600px; font-family:'Courier New', monospace;">
            <h2 style="text-align:center; color:#d4af37; margin-bottom:10px; border-bottom:2px solid #d4af37; padding-bottom:10px;">☕ BLACK CUP</h2>
            <p style="text-align:center; font-size:12px; color:#666;">Premium Coffee Shop</p>
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            
            <p style="text-align:center; font-weight:bold;">ORDER RECEIPT</p>
            <p style="text-align:center; font-size:12px;">Order #: ${order.id}</p>
            <p style="text-align:center; font-size:12px;">Date: ${new Date(order.created_at).toLocaleString()}</p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p><strong>Customer:</strong> ${order.customer || 'Guest'}</p>
            <p><strong>Payment:</strong> ${order.payment_method || order.payment || 'N/A'}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="font-weight:bold;">ITEMS:</p>
        `;
        
        let total = 0;
        order.items.forEach(item => {
            const qty = Number(item.quantity || 1);
            const price = Number(item.price) * qty;
            total += price;
            const customization = item.customization || {};
            let customText = customization.sweetness ? ` [${customization.sweetness}]` : "";
            customText += customization.strength ? ` [${customization.strength}]` : "";
            receiptContent += `<p style="display:flex; justify-content:space-between; font-size:12px; margin:5px 0;">
                <span>${item.name} ${customText}<br>(${qty}x)</span>
                <span>₱${price.toFixed(2)}</span>
            </p>`;
        });
        
        const paymentMethod = order.payment_method || order.payment || 'N/A';
        const paymentStatus = order.payment_status || 'Pending';
        const customerContact = order.contact || 'N/A';
        const deliveryType = order.delivery || 'N/A';
        const address = order.address || 'N/A';
        const landmark = order.landmark || 'N/A';
        const notes = order.notes || 'None';
        const voucherCode = order.voucher || 'None';

        receiptContent += `
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p><strong>Customer Contact:</strong> ${customerContact}</p>
            <p><strong>Delivery Type:</strong> ${deliveryType}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Landmark:</strong> ${landmark}</p>
            <p><strong>Voucher:</strong> ${voucherCode}</p>
            <p><strong>Order Notes:</strong> ${notes}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Payment Status:</strong> ${paymentStatus}</p>
            <p><strong>Payment Ref:</strong> ${order.payment_ref || 'N/A'}</p>
            <p><strong>Payment Account:</strong> ${order.payment_account || 'N/A'}</p>
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px;">
                <span>TOTAL:</span>
                <span>₱${total.toFixed(2)}</span>
            </p>
            
            <hr style="border:none; border-top:1px dashed #999; margin:15px 0;">
            <p style="text-align:center; font-size:11px; color:#666;">Thank you for your order!</p>
            <p style="text-align:center; font-size:10px; color:#999;">© 2025 BLACK CUP Coffee Shop</p>
            
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button onclick="printReceipt()" class="btn btn-primary" style="flex:1; padding:8px; font-size:12px;">🖨️ Print</button>
                <button onclick="downloadReceipt()" class="btn btn-primary" style="flex:1; padding:8px; font-size:12px;">⬇️ Download</button>
            </div>
        </div>
        `;
        
        
        let modal = document.getElementById("receiptModal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "receiptModal";
            modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center; display:flex; padding:20px;";
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
        <div style="max-width:600px; width:100%; max-height:90vh; overflow-y:auto;">
            ${receiptContent}
            <div style="text-align:center; margin-top:20px;">
                <button onclick="document.getElementById('receiptModal').style.display='none';" class="btn" style="padding:10px 20px; background:#ccc; color:#000;">Close</button>
            </div>
        </div>
        `;
        
        modal.style.display = "flex";
        modal.currentOrderId = orderId;
    };

    window.printReceipt = function() {
        window.print();
    };

    window.downloadReceipt = function() {
        alert("Receipt download feature coming soon!");
    };

}





if (document.getElementById("totalPoints")) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("customerName").textContent = currentUser.firstname || currentUser.username;
    }

    let points = localStorage.getItem("points") || 0;
    document.getElementById("totalPoints").innerText = points;

    
    const vouchers = [
        { name: "Free Coffee", points: 50, description: "Redeem for a free coffee" },
        { name: "10% Discount", points: 100, description: "Get 10% off your next order" },
        { name: "Free Pastry", points: 75, description: "Redeem for a free pastry" }
    ];

    const vouchersGrid = document.getElementById("vouchersGrid");
    if (vouchersGrid) {
        vouchers.forEach(v => {
            vouchersGrid.innerHTML += `
                <div class="voucher-card">
                    <h4>${v.name}</h4>
                    <p>${v.description}</p>
                    <p><strong>${v.points} points</strong></p>
                    <button onclick="redeemVoucher('${v.name}', ${v.points})">Redeem</button>
                </div>
            `;
        });
    }

    
    const orders = getData("orders");
    const historyBody = document.getElementById("historyBody");
    if (historyBody) {
        orders.forEach(order => {
            historyBody.innerHTML += `
                <tr>
                    <td>${new Date(order.created_at).toLocaleDateString()}</td>
                    <td>${order.id}</td>
                    <td>₱${order.total}</td>
                    <td>${order.status}</td>
                </tr>
            `;
        });
    }

    
    const tiersList = document.getElementById("tiersList");
    if (tiersList) {
        tiersList.innerHTML = `
            <li>Bronze: 0-99 points - No benefits</li>
            <li>Silver: 100-499 points - 5% discount</li>
            <li>Gold: 500+ points - 10% discount + free delivery</li>
        `;
    }
}

window.verifyPin = function() {
    const pin = document.getElementById("loyaltyPinInput").value;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.pin == pin) {
        document.getElementById("pinContainer").style.display = "none";
        document.getElementById("loyaltyDashboard").style.display = "block";
    } else {
        alert("Invalid PIN");
    }
};

window.redeemVoucher = function(name, cost) {
    let points = parseInt(localStorage.getItem("points") || 0);
    if (points >= cost) {
        points -= cost;
        localStorage.setItem("points", points);
        document.getElementById("totalPoints").innerText = points;
        alert(`Redeemed ${name}!`);
    } else {
        alert("Not enough points");
    }
};





if (document.getElementById("menuTableBody")) {

    loadAdminMenu();

    function loadAdminMenu() {

        const menu = getData("menu");

        const body = document.getElementById("menuTableBody");

        body.innerHTML = "";

        menu.forEach((item, index) => {

            body.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>
                    <img src="${item.image || 'https:
                </td>

                <td>${item.name}</td>

                <td>${item.description || ''}</td>

                <td>${item.ingredients ? item.ingredients.map(i => `${i.name} ${i.amount}${i.unit}`).join(', ') : 'N/A'}</td>

                <td>${item.category}</td>

                <td>₱${Number(item.price).toFixed(2)}</td>

                <td>${item.available !== false ? 'Yes' : 'No'}</td>

                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteMenuItemAdmin(${index})">Delete</button>
                </td>

            </tr>

            `;

        });

    }



    window.deleteMenuItemAdmin = function(index) {

        if (!confirm("Delete this menu item?")) return;

        let menu = getData("menu");

        menu.splice(index, 1);

        saveData("menu", menu);

        loadAdminMenu();

    };



    window.openMenuModal = function() {

        document.getElementById("menuModal")
        .style.display = "flex";

    };



    window.closeModal = function(id) {

        document.getElementById(id)
        .style.display = "none";

    };



    document.getElementById("menuForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const menu = getData("menu");

        const ingredientText = document.getElementById("menu_ingredients").value || "";
        const parsedIngredients = parseIngredientsText(ingredientText);
        const item = {
            id: Date.now(),
            name: document.getElementById("menu_name").value,
            description: document.getElementById("menu_desc").value,
            category: document.getElementById("menu_category").value,
            price: Number(document.getElementById("menu_price").value) || 0,
            image: document.getElementById("menu_image").value,
            ingredients: parsedIngredients,
            available: true
        };

        menu.push(item);

        saveData("menu", menu);

        closeModal("menuModal");

        loadAdminMenu();

        this.reset();

    });

}





if (document.getElementById("ingredientsTableBody")) {

    loadIngredients();

    function loadIngredients() {

        const ingredients = getIngredients();

        const body = document.getElementById("ingredientsTableBody");

        body.innerHTML = "";

        let warnings = [];

        ingredients.forEach((ing, index) => {

            const status = getIngredientStatus(ing.stock, ing.minStock);

            if (status.label !== "Available") {

                warnings.push(`${ing.name} is ${status.label.toLowerCase()}`);

            }

            body.innerHTML += `

            <tr>

                <td>${ing.name}</td>

                <td>${ing.stock} ${ing.unit}</td>

                <td>${ing.minStock} ${ing.unit}</td>

                <td>${ing.maxStock} ${ing.unit}</td>

                <td><span class="badge ${status.class}">${status.label}</span></td>

                <td>
                    <button class="btn btn-sm" onclick="editIngredient(${index})">Edit</button>
                    <button class="btn btn-primary btn-sm" onclick="restockIngredient(${index})">Restock</button>
                </td>

            </tr>`;

        });

        
        if (warnings.length > 0) {

            showToast("⚠️ " + warnings.join(", "), "warning");

        }

    }

    window.editIngredient = function(index) {

        const ingredients = getIngredients();

        const ing = ingredients[index];

        document.getElementById("ingredient_id").value = index;

        document.getElementById("ingredient_name").value = ing.name;

        document.getElementById("ingredient_unit").value = ing.unit;

        document.getElementById("ingredient_min_stock").value = ing.minStock;

        document.getElementById("ingredient_max_stock").value = ing.maxStock;

        document.getElementById("ingredient_stock").value = ing.stock;

        document.getElementById("ingredientModalTitle").textContent = "Edit Ingredient";

        document.getElementById("ingredientModal").style.display = "flex";

    };

    window.restockIngredient = function(index) {

        const ingredients = getIngredients();

        const ing = ingredients[index];

        const newStock = prompt(`Restock ${ing.name}. Current: ${ing.stock} ${ing.unit}. Enter new stock:`);

        if (newStock !== null && !isNaN(newStock)) {

            ingredients[index].stock = parseFloat(newStock);

            saveIngredients(ingredients);

            loadIngredients();

            updateMenuAvailability();

            alert("Restocked successfully!");

        }

    };

    window.openIngredientModal = function() {

        document.getElementById("ingredient_id").value = "";

        document.getElementById("ingredient_name").value = "";

        document.getElementById("ingredient_unit").value = "g";

        document.getElementById("ingredient_min_stock").value = "";

        document.getElementById("ingredient_max_stock").value = "";

        document.getElementById("ingredient_stock").value = "";

        document.getElementById("ingredientModalTitle").textContent = "Add Ingredient";

        document.getElementById("ingredientModal").style.display = "flex";

    };

    document.getElementById("ingredientForm").addEventListener("submit", function(e) {

        e.preventDefault();

        const ingredients = getIngredients();

        const id = document.getElementById("ingredient_id").value;

        const ingredient = {

            name: document.getElementById("ingredient_name").value,

            unit: document.getElementById("ingredient_unit").value,

            minStock: parseFloat(document.getElementById("ingredient_min_stock").value),

            maxStock: parseFloat(document.getElementById("ingredient_max_stock").value),

            stock: parseFloat(document.getElementById("ingredient_stock").value)

        };

        if (id === "") {

            ingredients.push(ingredient);

        } else {

            ingredients[id] = ingredient;

        }

        saveIngredients(ingredients);

        closeModal("ingredientModal");

        loadIngredients();

        updateMenuAvailability();

        this.reset();

    });

}





if (document.getElementById("incomingOrdersDetails")) {

    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "cashier") {
        alert("Access denied.");
        window.location.href = "LOGIN.html";
    }

    
    document.getElementById("userName").textContent = currentUser.firstname || currentUser.username;

    loadCashierOrders();

    function loadCashierOrders() {
        const orders = getData("orders");
        const incoming = document.getElementById("incomingOrdersDetails");
        incoming.innerHTML = "";

        const pendingOrders = orders.filter(order => order.status === "Pending");
        
        if (pendingOrders.length === 0) {
            incoming.innerHTML = '<p style="text-align:center; color:#999; padding:40px;">No incoming orders</p>';
        }

        pendingOrders.forEach(order => {
            let itemsHtml = "";
            (order.items || []).forEach(item => {
                itemsHtml += `<p style="margin:3px 0; font-size:14px; color:#ddd;">${item.quantity || 1}x ${item.name}</p>`;
            });
            incoming.innerHTML += `
                <div class="order-card" style="background:#111; border:1px solid #333; padding:20px;">
                    <h3 style="color:#d4af37; margin-bottom:10px;">Order ${order.id}</h3>
                    ${itemsHtml}
                    <p style="margin:10px 0; color:#fff;"><strong>Total:</strong> ₱${Number(order.total || 0).toFixed(2)}</p>
                    <p style="margin:0 0 10px; color:#aaa;"><strong>Customer:</strong> ${order.customer || 'Guest'}</p>
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <button class="btn btn-secondary" onclick="viewOrderReceipt('${order.id}')">View Details</button>
                        <button class="btn btn-primary" onclick="acceptOrder('${order.id}')">Accept</button>
                        <button class="btn btn-danger" onclick="rejectOrder('${order.id}')">Reject</button>
                    </div>
                </div>`;
        });

        
        document.getElementById("statPending").textContent = orders.filter(o => o.status === "Pending").length;
        document.getElementById("statActive").textContent = orders.filter(o => o.status === "Active").length;
        document.getElementById("statCompleted").textContent = orders.filter(o => o.status === "Completed").length;
        document.getElementById("statSales").textContent = "₱" + orders.filter(o => o.status === "Completed").reduce((sum, o) => sum + (Number(o.total) || 0), 0).toFixed(2);
    }

    window.acceptOrder = function(id) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = "Active";
            saveData("orders", orders);
            loadCashierOrders();
            showToast("Order Accepted!", "success");
        }
    };

    window.rejectOrder = function(id) {
        if (!confirm("Are you sure you want to reject this order?")) return;
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = "Cancelled";
            saveData("orders", orders);
            loadCashierOrders();
            showToast("Order Rejected", "warning");
        }
    };

    window.markPreparing = function(id) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = "Preparing";
            saveData("orders", orders);
            loadCashierOrders();
            showToast("Order is being prepared", "success");
        }
    };

    
    const tabs = document.querySelectorAll(".sidebar-nav a[data-tab]");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            panes.forEach(pane => {
                pane.style.display = "none";
            });

            document.getElementById(target).style.display = "block";

            
            if (target === "active") {
                loadActiveOrders();
            } else if (target === "completed") {
                loadCompletedOrders();
            } else if (target === "payments") {
                loadPaymentsTab();
            }
        });
    });

    function loadActiveOrders() {
        const orders = getData("orders");
        const activeDiv = document.getElementById("activeOrders");
        if (!activeDiv) return;
        activeDiv.innerHTML = "";
        orders.filter(o => o.status === "Preparing" || o.status === "Active").forEach(order => {
            let itemsHtml = "";
            order.items.forEach(item => {
                itemsHtml += `<p style="margin:3px 0; font-size:12px;">${item.name} (${item.quantity || 1}x)</p>`;
            });
            activeDiv.innerHTML += `
            <div class="order-card">
                <h3 style="color:#d4af37;">🕐 ${order.id}</h3>
                <div style="font-size:12px; margin-bottom:8px;">${itemsHtml}</div>
                <p style="margin-top:10px;"><strong>Status:</strong> ${order.status}</p>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
                    <button class="btn btn-secondary" onclick="viewOrderReceipt('${order.id}')">View Details</button>
                    <button class="btn btn-primary" onclick="markCompleted('${order.id}')" style="flex:1;">Mark Completed</button>
                </div>
            </div>`;
        });
    }

    function loadCompletedOrders() {
        const orders = getData("orders");
        const completedDiv = document.getElementById("completedOrdersBody");
        if (!completedDiv) return;
        completedDiv.innerHTML = "";
        orders.filter(o => o.status === "Completed").forEach(order => {
            completedDiv.innerHTML += `<tr>
                <td>${order.id}</td>
                <td>${order.customer || "Guest"}</td>
                <td>₱${Number(order.total).toFixed(2)}</td>
                <td>${order.payment || "COD"}</td>
                <td>${new Date(order.created_at).toLocaleTimeString()}</td>
                <td><button class="btn btn-sm" onclick="viewOrderReceipt('${order.id}')">Receipt</button></td>
            </tr>`;
        });
    }

    function loadPaymentsTab() {
        const orders = getData("orders");
        const paymentsBody = document.getElementById("paymentsTableBody");
        if (!paymentsBody) return;
        paymentsBody.innerHTML = "";
        orders.filter(o => o.payment_method && o.payment_method !== "Cash on Delivery").forEach(order => {
            paymentsBody.innerHTML += `<tr>
                <td>${order.id}</td>
                <td>${order.customer || "Guest"}</td>
                <td>₱${Number(order.total).toFixed(2)}</td>
                <td>${order.payment_method}</td>
                <td>${order.payment_ref || "N/A"}</td>
                <td>${order.payment_account || "N/A"}</td>
                <td><span class="badge badge-${order.payment_status || 'pending'}">${order.payment_status || 'Pending'}</span></td>
                <td>
                    <button class="btn btn-sm" onclick="verifyPayment('${order.id}')">Verify</button>
                </td>
            </tr>`;
        });
    }

    window.markCompleted = function(id) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = "Completed";
            saveData("orders", orders);
            loadCashierOrders();
            loadActiveOrders();
            showToast("Order Completed! ✓", "success");
        }
    };

    window.viewOrderReceipt = function(id) {
        window.viewReceipt(id);
    };

    window.verifyPayment = function(id) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        if (order && confirm("Mark payment as verified?")) {
            order.payment_status = "Paid";
            saveData("orders", orders);
            loadPaymentsTab();
            showToast("Payment Verified!", "success");
        }
    };

    loadCashierOrders();
}





if (document.getElementById("refundTable")) {

    loadRefundOrders();

    function loadRefundOrders() {
        const orders = getData("orders");
        const tbody = document.getElementById("refundTable");
        tbody.innerHTML = "";
        orders.forEach(order => {
            tbody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.status}</td>
                <td>
                    <select onchange="updateRefundStatus('${order.id}', this.value)">
                        <option value="none" ${order.refund_status === 'none' ? 'selected' : ''}>None</option>
                        <option value="requested" ${order.refund_status === 'requested' ? 'selected' : ''}>Requested</option>
                        <option value="approved" ${order.refund_status === 'approved' ? 'selected' : ''}>Approved</option>
                        <option value="completed" ${order.refund_status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
            </tr>
            `;
        });
    }

    window.updateRefundStatus = function(id, status) {
        const orders = getData("orders");
        const order = orders.find(o => o.id === id);
        order.refund_status = status;
        saveData("orders", orders);
        alert("Refund status updated!");
    };
}





if (document.getElementById("hourlySalesChart")) {

    function generateHourlySalesReport() {

        const orders = getData("orders");

        const today = new Date().toDateString();

        const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);

        
        const hourlyData = {};

        for (let hour = 0; hour < 24; hour++) {

            hourlyData[hour] = { orders: 0, revenue: 0 };

        }

        todayOrders.forEach(order => {

            const hour = new Date(order.created_at).getHours();

            hourlyData[hour].orders++;

            hourlyData[hour].revenue += Number(order.total) || 0;

        });

        
        renderHourlySalesChart(hourlyData);

        
        renderHourlyBreakdown(hourlyData);

        
        const totalOrders = todayOrders.length;

        const totalRevenue = todayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        
        let bestSelling = { name: "-", qty: 0 };

        const itemSales = {};

        todayOrders.forEach(order => {

            order.items.forEach(item => {

                itemSales[item.name] = (itemSales[item.name] || 0) + (item.quantity || 1);

            });

        });

        for (const [name, qty] of Object.entries(itemSales)) {

            if (qty > bestSelling.qty) {

                bestSelling = { name, qty };

            }

        }

        document.getElementById("reportTotalOrders").textContent = totalOrders;

        document.getElementById("reportTotalRevenue").textContent = "₱" + totalRevenue.toFixed(2);

        document.getElementById("reportBestSelling").textContent = bestSelling.name + ` (${bestSelling.qty}x)`;

    }

    function renderHourlySalesChart(hourlyData) {

        const canvas = document.getElementById("hourlySalesChart");

        const ctx = canvas.getContext("2d");

        const width = canvas.width;

        const height = canvas.height;

        
        ctx.fillStyle = "#111";

        ctx.fillRect(0, 0, width, height);

        
        ctx.strokeStyle = "#333";

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(40, 20);

        ctx.lineTo(40, height - 40);

        ctx.lineTo(width - 20, height - 40);

        ctx.stroke();

        
        let maxRevenue = 0;

        Object.values(hourlyData).forEach(d => {

            if (d.revenue > maxRevenue) maxRevenue = d.revenue;

        });

        if (maxRevenue === 0) maxRevenue = 1000;

        
        const barWidth = (width - 70) / 24;

        Object.entries(hourlyData).forEach(([hour, data]) => {

            const barHeight = (data.revenue / maxRevenue) * (height - 80);

            const x = 40 + Number(hour) * barWidth;

            const y = height - 40 - barHeight;

            
            ctx.fillStyle = "#d4af37";

            ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

            
            if (Number(hour) % 3 === 0) {

                ctx.fillStyle = "#999";

                ctx.font = "10px Arial";

                ctx.textAlign = "center";

                ctx.fillText(hour + ":00", x + barWidth / 2, height - 20);

            }

        });

        
        ctx.fillStyle = "#ccc";

        ctx.font = "12px Arial";

        ctx.textAlign = "left";

        ctx.fillText("Revenue (₱)", 50, 15);

    }

    function renderHourlyBreakdown(hourlyData) {

        const tbody = document.getElementById("hourlyBreakdownBody");

        tbody.innerHTML = "";

        Object.entries(hourlyData).forEach(([hour, data]) => {

            if (data.orders > 0 || Number(hour) % 3 === 0) {

                tbody.innerHTML += `<tr>

                    <td>${hour}:00</td>

                    <td>${data.orders}</td>

                    <td>₱${data.revenue.toFixed(2)}</td>

                </tr>`;

            }

        });

    }

    generateHourlySalesReport();

}





if (document.querySelector(".contact-form form")) {

    document.querySelector(".contact-form form")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        alert("Message Sent Successfully!");

        this.reset();

    });

}





document.querySelectorAll(".btn-logout")
.forEach(btn => {

    btn.addEventListener("click", () => {

        localStorage.removeItem("cart");
        localStorage.removeItem("currentUser");

        alert("Logged out!");

        window.location.href = "LOGIN.html";

    });

});





if (document.getElementById("loginForm")) {

    document.getElementById("loginForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const btn = this.querySelector("button");

        btn.disabled = true;
        btn.textContent = "Logging in...";

        const username =
        document.getElementById("username").value;

        const password =
        document.getElementById("password").value;

        const users =
        JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.username === username &&
            u.password === password
        );

        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            if (user.role === "admin") {

                window.location.href = "admin.html";

            } else if (user.role === "cashier") {

                window.location.href = "cashier.html";

            } else {

                window.location.href = "index.html";
            }

        } else {

            alert("Invalid username or password");

            btn.disabled = false;
            btn.textContent = "LOGIN";
        }

    });

}





if (document.getElementById("registerForm")) {

    
    const barangaySelect = document.getElementById("barangaySelect");
    if (barangaySelect) {
        Object.keys(barangays).forEach(barangay => {
            const option = document.createElement("option");
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });
    }

    document.getElementById("registerForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const btn = this.querySelector("button");

        btn.disabled = true;
        btn.textContent = "Registering...";

        const formData = new FormData(this);

        const data =
        Object.fromEntries(formData.entries());

        let users =
        JSON.parse(localStorage.getItem("users")) || [];



        const existingUser = users.find(
            user => user.username === data.username
        );



        if (existingUser) {

            alert("Username already exists!");

            btn.disabled = false;
            btn.textContent = "SIGN UP";

            return;
        }



        data.pin =
        Math.floor(1000 + Math.random() * 9000);

        data.role = "customer";



        users.push(data);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );



        document.getElementById("registerForm")
        .style.display = "none";



        document.getElementById("pinResult")
        .style.display = "grid";



        document.getElementById("loyaltyPin")
        .textContent = data.pin;

    });

}



if (!localStorage.getItem("users")) {

    const users = [

        {
            username: "admin",
            password: "admin123",
            role: "admin"
        },

        {
            username: "cashier",
            password: "cashier123",
            role: "cashier"
        }

    ];

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}









function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let table = "";

    users.forEach((u, i) => {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${u.username}</td>
            <td>${u.role}</td>
            <td>${u.firstname || ""} ${u.lastname || ""}</td>
            <td><button onclick="deleteUser(${i})">Delete</button></td>
        </tr>`;
    });

    if (document.getElementById("usersTable")) {
        document.getElementById("usersTable").innerHTML = table;
    }
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}





function loadMenu() {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    let table = "";

    menu.forEach(m => {
        table += `
        <tr>
            <td>${m.name}</td>
            <td>${m.category}</td>
            <td>${m.price}</td>
            <td>${m.available ? "Yes" : "No"}</td>
        </tr>`;
    });

    if (document.getElementById("menuTable")) {
        document.getElementById("menuTable").innerHTML = table;
    }
}





function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let table = "";

    orders.forEach(o => {
        table += `
        <tr>
            <td>${o.ref}</td>
            <td>${o.customer}</td>
            <td>${o.status}</td>
            <td>${o.total}</td>
        </tr>`;
    });

    if (document.getElementById("ordersTable")) {
        document.getElementById("ordersTable").innerHTML = table;
    }
}





document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadMenu();
    loadOrders();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const greetingEl = document.getElementById("userGreeting");
    if (greetingEl) {
        greetingEl.textContent = `Hello, ${currentUser?.firstname || currentUser?.username || 'Guest'}!`;
    }

    document.querySelectorAll(".password-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.closest(".password-input")?.querySelector("input");
            if (!input) return;
            const show = input.type === "password";
            input.type = show ? "text" : "password";
           
        });
    });
});





if (document.getElementById("dashboard")) {
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.role !== "admin") {
        alert("Access denied.");
        window.location.href = "LOGIN.html";
    }

    
    const userNameEl = document.getElementById("userName");
    if (userNameEl) {
        userNameEl.textContent = currentUser.firstname || currentUser.username;
    }

    
    
    
    const tabs = document.querySelectorAll(".sidebar-nav a[data-tab]");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            panes.forEach(pane => {
                pane.style.display = "none";
            });

            if (document.getElementById(target)) {
                document.getElementById(target).style.display = "block";
            }

            if (target === "payments") {
                loadPaymentMonitoring();
            }

        });
    });
}





document.querySelector(".btn-logout").addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
});





let users = JSON.parse(localStorage.getItem("users")) || [];

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let vouchers = JSON.parse(localStorage.getItem("vouchers")) || [];

let announcements =
    JSON.parse(localStorage.getItem("announcements")) || [];

let settings =
    JSON.parse(localStorage.getItem("settings")) || {
        store_name: "BLACK CUP",
        store_contact: "09123456789",
        gcash_number: "09123456789",
        paymaya_number: "09123456789",
        delivery_rate: 6,
        loyalty_points: 5,
        terms: "By placing an order you agree to our terms."
    };





function loadDashboard() {

    document.getElementById("dashTotalOrders").textContent =
        orders.length;

    const totalSales = orders.reduce((sum, order) => {
        return sum + (Number(order.total) || 0);
    }, 0);

    document.getElementById("dashSales").textContent =
        `₱${totalSales.toFixed(2)}`;

    const pending = orders.filter(
        o => o.status === "pending"
    ).length;

    document.getElementById("dashPending").textContent = pending;

    const completed = orders.filter(
        o => o.status === "completed"
    ).length;

    document.getElementById("dashCompleted").textContent = completed;

}

loadDashboard();





function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.getElementById("usersTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    users.forEach((user, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.firstname || ""} ${user.lastname || ""}</td>
            <td>${user.role}</td>
            <td>${user.created_at || "N/A"}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteUser(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

loadUsers();





function deleteUser(index) {

    if (!confirm("Delete this user?")) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));

    loadUsers();
}















function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const tbody = document.getElementById("allOrdersBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    orders.forEach(order => {
        tbody.innerHTML += `
        <tr>
            <td>${order.id || "N/A"}</td>
            <td>${order.customer || "Customer"}</td>
            <td>₱${Number(order.total || 0).toFixed(2)}</td>
            <td>
                <span class="badge badge-${order.status}">
                    ${order.status}
                </span>
            </td>
            <td>${new Date(order.created_at).toLocaleDateString() || "N/A"}</td>
        </tr>
        `;
    });
}

loadOrders();
loadPaymentMonitoring();

function loadPaymentMonitoring() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const paymentsBody = document.getElementById("paymentsTableBody");
    if (!paymentsBody) return;
    paymentsBody.innerHTML = "";
    orders.filter(order => order.payment_method && order.payment_method !== "Cash on Delivery").forEach(order => {
        paymentsBody.innerHTML += `
        <tr>
            <td>${order.id || 'N/A'}</td>
            <td>${order.customer || 'Guest'}</td>
            <td>₱${Number(order.total || 0).toFixed(2)}</td>
            <td>${order.payment_method}</td>
            <td>${order.payment_ref || 'N/A'}</td>
            <td>${order.payment_account || 'N/A'}</td>
            <td><span class="badge badge-${order.payment_status || 'pending'}">${order.payment_status || 'Pending'}</span></td>
        </tr>
        `;
    });
}





function markCompleted(ref) {

    const order = orders.find(o => o.order_ref === ref);

    if (!order) return;

    order.status = "completed";

    localStorage.setItem("orders", JSON.stringify(orders));

    loadOrders();

    loadDashboard();
}





function markCompleted(id) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = "Completed";
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    }
}




function openMenuModal() {
    document.getElementById("menuModal").style.display = "flex";
}

function openUserModal() {
    document.getElementById("userModal").style.display = "flex";
}

function openAnnouncementModal() {
    document.getElementById("announcementModal").style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}





document.getElementById("menuForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    const item = {
        name: document.getElementById("menu_name").value,
        description: document.getElementById("menu_desc").value,
        price: document.getElementById("menu_price").value,
        category: document.getElementById("menu_category").value,
        image: document.getElementById("menu_image").value,
        available: true
    };

    menuItems.push(item);

    localStorage.setItem(
        "menuItems",
        JSON.stringify(menuItems)
    );

    loadMenu();

    closeModal("menuModal");

    e.target.reset();
});





document.getElementById("userForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    const user = {
        username: document.getElementById("user_username").value,
        firstname: document.getElementById("user_firstname").value,
        lastname: document.getElementById("user_lastname").value,
        password: document.getElementById("user_password").value,
        role: document.getElementById("user_role").value,
        created_at: new Date().toLocaleDateString()
    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    loadUsers();

    closeModal("userModal");

    e.target.reset();
});





function loadSettings() {

    document.getElementById("set_store_name").value =
        settings.store_name;

    document.getElementById("set_store_contact").value =
        settings.store_contact;

    document.getElementById("set_gcash_number").value =
        settings.gcash_number;

    document.getElementById("set_paymaya_number").value =
        settings.paymaya_number;

    document.getElementById("set_delivery_rate").value =
        settings.delivery_rate;

    document.getElementById("set_loyalty_points").value =
        settings.loyalty_points;

    document.getElementById("set_terms").value =
        settings.terms;
}

loadSettings();

document.getElementById("settingsForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    settings = {
        store_name:
            document.getElementById("set_store_name").value,

        store_contact:
            document.getElementById("set_store_contact").value,

        gcash_number:
            document.getElementById("set_gcash_number").value,

        paymaya_number:
            document.getElementById("set_paymaya_number").value,

        delivery_rate:
            document.getElementById("set_delivery_rate").value,

        loyalty_points:
            document.getElementById("set_loyalty_points").value,

        terms:
            document.getElementById("set_terms").value
    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

    alert("Settings saved!");
});





function loadAnnouncements() {

    const tbody =
        document.getElementById("announcementsBody");

    tbody.innerHTML = "";

    announcements.forEach((ann, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${ann.date}</td>
            <td>${ann.type}</td>
            <td>${ann.title}</td>
            <td>${ann.message}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteAnnouncement(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

loadAnnouncements();

document.getElementById("announcementForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    const ann = {
        title: document.getElementById("ann_title").value,
        type: document.getElementById("ann_type").value,
        message: document.getElementById("ann_message").value,
        date: new Date().toLocaleDateString()
    };

    announcements.push(ann);

    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );

    loadAnnouncements();

    closeModal("announcementModal");

    e.target.reset();
});

function deleteAnnouncement(index) {

    announcements.splice(index, 1);

    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );

    loadAnnouncements();
}


function login(username, password) {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
        alert("Invalid username or password");
        return false;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if(user.role === "admin"){
        window.location.href = "admin.html";
    }
    else if(user.role === "cashier"){
        window.location.href = "cashier.html";
    }
    else{
        window.location.href = "customer.html";
    }
}


function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


function checkAdmin(){

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user || user.role !== "admin"){
        alert("Access Denied");
        window.location.href = "login.html";
    }
}


function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}


function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}


function addUser(user){

    let users = getUsers();

    users.push(user);

    saveUsers(users);

    alert("User added");
}


function deleteUser(id){

    let users = getUsers();

    users = users.filter(u => u.id !== id);

    saveUsers(users);

    alert("User deleted");
}

function getMenu(){
    return JSON.parse(localStorage.getItem("menu")) || [];
}

function saveMenu(menu){
    localStorage.setItem("menu", JSON.stringify(menu));
}

function addMenu(item){

    let menu = getMenu();

    menu.push(item);

    saveMenu(menu);

    alert("Menu item added");
}

function deleteMenu(id){

    let menu = getMenu();

    menu = menu.filter(m => m.id !== id);

    saveMenu(menu);
}

function getOrders(){
    return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders){
    localStorage.setItem("orders", JSON.stringify(orders));
}

function placeOrder(order){

    let orders = getOrders();

    orders.push(order);

    saveOrders(orders);

    alert("Order placed");
}

function saveSettings(settings){
    localStorage.setItem("settings", JSON.stringify(settings));
}

function getSettings(){
    return JSON.parse(localStorage.getItem("settings")) || {};
}

function getAnnouncements(){
    return JSON.parse(localStorage.getItem("announcements")) || [];
}

function addAnnouncement(data){

    let announcements = getAnnouncements();

    announcements.push(data);

    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );
}

if(!localStorage.getItem("users")){

    let users = [
        {
            id: 1,
            username: "admin",
            password: "admin123",
            role: "admin"
        }
    ];

    localStorage.setItem("users", JSON.stringify(users));
}
