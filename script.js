let selectedItems = new Set();
let isCateringMenu = true;

function toggleItem(item) {
  const itemId = item.dataset.id;
  const name = item.querySelector(".flavor, .service")?.textContent;
  const priceElement = item.querySelector(".price");
  const url = item.dataset.url || null;

  if (!itemId || !name || !priceElement) {
    console.error(`Invalid item: ${item.textContent}`);
    return;
  }

  const priceText = priceElement.textContent.replace(/[^0-9.]/g, "");
  const price = parseFloat(priceText);
  if (isNaN(price)) {
    console.error(`Invalid price for item: ${name}`);
    return;
  }

  if (selectedItems.has(itemId)) {
    selectedItems.delete(itemId);
    item.classList.remove("selected");
  } else {
    selectedItems.add(itemId);
    item.classList.add("selected");
    if (url) {
      window.open(url, "_blank");
    }
  }

  const creature = item.dataset.creature;
  const liveRegion = document.getElementById("live-region") || createLiveRegion();
  liveRegion.textContent = `${name} (Creature: ${creature}) ${selectedItems.has(itemId) ? "added to" : "removed from"} cart`;

  updateAria(item);
  calculateTotal();
  updateCartDisplay();
  saveSelections();

  console.log(`Clicked item: ${name} (${itemId}), Selected: ${selectedItems.has(itemId)}`);
}

function calculateTotal() {
  let total = 0;
  document.querySelectorAll(".item").forEach((item) => {
    if (selectedItems.has(item.dataset.id)) {
      const priceText = item.querySelector(".price").textContent.replace(/[^0-9.]/g, "");
      total += parseFloat(priceText) || 0;
    }
  });
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = total > 0 ? `Total: $${total.toFixed(2)}` : "Total: $0.00";
  const liveRegion = document.getElementById("live-region") || createLiveRegion();
  liveRegion.textContent = `Total calculated: $${total.toFixed(2)}`;
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = selectedItems.size === 0 ? "<p>Cart is empty</p>" : "";
  document.querySelectorAll(".item").forEach((item) => {
    if (selectedItems.has(item.dataset.id)) {
      const name = item.querySelector(".flavor, .service").textContent;
      const price = item.querySelector(".price").textContent;
      const cartItem = document.createElement("p");
      cartItem.textContent = `${name}: $${price}`;
      cartItemsElement.appendChild(cartItem);
    }
  });
}

function resetSelections() {
  selectedItems.clear();
  document.querySelectorAll(".item").forEach((item) => {
    item.classList.remove("selected");
    updateAria(item);
  });
  calculateTotal();
  updateCartDisplay();
  saveSelections();
  const liveRegion = document.getElementById("live-region") || createLiveRegion();
  liveRegion.textContent = "Cart cleared";
}

function updateAria(item) {
  const name = item.querySelector(".flavor, .service")?.textContent;
  const price = item.querySelector(".price")?.textContent;
  const itemId = item.dataset.id;
  if (name && price) {
    item.setAttribute("aria-label", `Toggle ${name}, $${price}, ${selectedItems.has(itemId) ? "selected" : "not selected"}`);
  }
}

function toggleMenu() {
  const cateringMenu = document.getElementById("catering-menu");
  const securityMenu = document.getElementById("security-menu");
  const toggleButton = document.getElementById("toggle-menu");
  isCateringMenu = !isCateringMenu;
  if (isCateringMenu) {
    cateringMenu.classList.remove("hidden");
    securityMenu.classList.add("hidden");
    toggleButton.textContent = "Switch to Security Menu";
    toggleButton.setAttribute("aria-label", "Switch to Security Menu");
    document.body.classList.remove("security-background");
    console.log("Switched to Catering Menu, background class: none");
  } else {
    cateringMenu.classList.add("hidden");
    securityMenu.classList.remove("hidden");
    toggleButton.textContent = "Switch to Catering Menu";
    toggleButton.setAttribute("aria-label", "Switch to Catering Menu");
    document.body.classList.add("security-background");
    console.log("Switched to Security Menu, background class: security-background");
  }
  const liveRegion = document.getElementById("live-region") || createLiveRegion();
  liveRegion.textContent = `Switched to ${isCateringMenu ? "Catering" : "Security"} menu`;
}

function saveSelections() {
  localStorage.setItem("selectedItems", JSON.stringify([...selectedItems]));
}

function loadSelections() {
  const saved = localStorage.getItem("selectedItems");
  if (saved) {
    selectedItems = new Set(JSON.parse(saved));
    document.querySelectorAll(".item").forEach((item) => {
      if (selectedItems.has(item.dataset.id)) {
        item.classList.add("selected");
        updateAria(item);
      }
    });
    calculateTotal();
    updateCartDisplay();
  }
}

function createLiveRegion() {
  const liveRegion = document.createElement("div");
  liveRegion.id = "live-region";
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.style.position = "absolute";
  liveRegion.style.width = "1px";
  liveRegion.style.height = "1px";
  liveRegion.style.overflow = "hidden";
  document.body.appendChild(liveRegion);
  return liveRegion;
}

document.addEventListener("DOMContentLoaded", () => {
  loadSelections();
  document.querySelectorAll(".item").forEach((item) => updateAria(item));
  document.getElementById("toggle-menu").addEventListener("click", toggleMenu);
  document.querySelector('button[aria-label="Calculate total price"]').addEventListener("click", calculateTotal);
  document.querySelector('button[aria-label="Reset all selections"]').addEventListener("click", resetSelections);

  console.log(
    `PatriotPlates AI & PatriotSecurity AI Interactive Menu initialized - ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
  );
});
