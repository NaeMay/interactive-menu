# interactive-menu
“Patriot-Plates-AI and Patriot-Security-AI Interactive Menu”

## Description
Developed the **PatriotPlates AI & PatriotSecurity AI Interactive Menu** as part of freeCodeCamp’s Responsive Web Design certification. This HTML/CSS/JavaScript application serves as a placeholder for the 2026 launch of **PatriotPlates AI** (FoodTech) and **PatriotSecurity AI** (security-tech). It features a dual-menu system with 10 catering dishes (e.g., Strawberry Cheesecake Lamb Chops at $25.00, Patriotic Sliders at $18.00) and 5 cybersecurity services (e.g., Firewall Feast at $500.00, Password Protector at $100.00, Secure Login Demo at $0.00) with a cart system for selecting items across both menus, toggle functionality, and real-time total price updates. Inspired by Donald Trump’s no-tax-on-tips policy, Elon Musk’s AI innovation with xAI, and Gordon Ramsay’s culinary excellence, it integrates with my Stratford Cooking and Catering Diploma with Highest Honors and supports my roles as a **Front-End Developer**, **FoodTech Entrepreneur**, and **Cybersecurity Analyst** in **West Columbia, SC** (flexible for **Miami or Tampa, FL**). The project adheres to WCAG 2.1 Level AA accessibility standards and synergizes with **Nae’s PatriotPlates AI RPG Creature Search** (e.g., StarberryBlaze for Strawberry Cheesecake Lamb Chops, CryptoShield for Firewall Feast) and **Color-by-Number Security Badge**.

## Features
- **Interactive Menu with Cart**: Select from 10 catering dishes (e.g., Steak and Fries at $28.00, Nectarine-Blueberry Summer Tart at $15.00) and 5 cybersecurity services (e.g., Virus Scanner at $250.00, Threat Intelligence Dashboard at $50.00) across both menus, with selections added to a cart and real-time total price updates. A dual-menu system with 10 catering dishes and 6 cybersecurity services, featuring a clickable cart system, menu toggle, custom backgrounds (elegant foodtech for catering, futuristic tech-security for services), and localStorage persistence. Built with HTML, CSS, JavaScript, Font Awesome 6.5.1, and Orbitron font, using a MAGA-themed aesthetic with glitch animations. 
- **Menu Toggle**: Switch between **PatriotPlates AI** catering and **PatriotSecurity AI** services menus without resetting cart selections.
- **Cart Display**: View all selected items and their prices in a dedicated cart section, with a "Clear Cart" button to reset selections.
- **Responsive Design**: Uses flexbox for item and cart layouts and media queries for mobile compatibility (<600px, <400px).
- **Accessibility**: Implements ARIA attributes (e.g., `aria-label`, `aria-live`) and keyboard navigation (Tab, Enter, Space) for WCAG 2.1 Level AA compliance.
- **Branding**: Features modern MAGA colors (red `#B22234`, white `#FFFFFF`, blue `#3C3B6E`, gold `#feac32`) with a futuristic glitch effect on headings, selected items, and cart for a cyberpunk aesthetic.
- **Social Integration**: Links to Email, X, freeCodeCamp, GitHub, and LinkedIn profiles.
- **Synergy**: Links catering items to **RPG Creature Search** creatures (e.g., StarberryBlaze for Strawberry Cheesecake Lamb Chops, CryptoShield for Firewall Feast) via `data-creature` attributes, with creature names announced on selection for future integration. Supports **Color-by-Number Security Badge** thematically.
- **Persistence**: Saves cart selections to `localStorage` for persistence across page reloads.

## Achievements
- Passed all freeCodeCamp Responsive Web Design test cases for interactivity and responsiveness.
- Mastered HTML, CSS, and JavaScript for dynamic menu and cart systems with real-time calculations.
- Expanded menu to include 10 catering items and 5 security services, reflecting FoodTech and cybersecurity expertise.
- Integrated culinary and cybersecurity themes with a futuristic glitch effect, inspired by Trump’s no-tax-on-tips policy, Musk’s xAI leadership, and Ramsay’s culinary standards.
- Ensured accessibility for users with disabilities, leveraging my experience with Erb’s palsy.
- Strengthened portfolio for **PatriotPlates AI** and **PatriotSecurity AI** 2026 launch.
*Prototype for 2026 Launch – Not Available for Purchase*.

## Code Sample
Below is the `toggleItem` function from `script.js`, which handles menu item selection, updates accessibility attributes, announces RPG creatures, and updates the cart:
```javascript
function toggleItem(item) {
  const itemId = item.dataset.id;
  const priceElement = item.querySelector(".price");
  if (!priceElement || !itemId) {
    console.error(`Invalid item: ${item.textContent}`);
    return;
  }
  const priceText = priceElement.textContent.replace(/[^0-9.]/g, '');
  const price = parseFloat(priceText);
  if (isNaN(price)) {
    console.error(`Invalid price for item: ${item.textContent}`);
    return;
  }
  if (selectedItems.has(itemId)) {
    selectedItems.delete(itemId);
    item.classList.remove("selected");
  } else {
    selectedItems.add(itemId);
    item.classList.add("selected");
    const creature = item.dataset.creature;
    if (creature) {
      const liveRegion = document.getElementById("live-region") || createLiveRegion();
      liveRegion.textContent = `${item.querySelector(".flavor, .service").textContent} (Creature: ${creature}) ${selectedItems.has(itemId) ? "added to" : "removed from"} cart`;
    }
  }
  updateAria(item);
  calculateTotal();
  updateCartDisplay();
  saveSelections();
}
