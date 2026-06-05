document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.getElementById("breed-select");
  const categorySelect = document.getElementById("category-select");
  const numberInput = document.getElementById("number-input");
  const fetchBtn = document.getElementById("fetch-btn");
  const resultsSection = document.getElementById("results");

  // Load breeds and categories on page load
  loadBreeds();
  loadCategories();

  fetchBtn.addEventListener("click", fetchFacts);

  async function loadBreeds() {
    try {
      const res = await fetch("/api/breeds");
      const data = await res.json();
      if (data.success) {
        data.breeds.forEach((breed) => {
          const option = document.createElement("option");
          option.value = breed;
          option.textContent = breed;
          breedSelect.appendChild(option);
        });
      }
    } catch (err) {
      console.error("Failed to load breeds:", err);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        data.categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  }

  async function fetchFacts() {
    const breed = breedSelect.value;
    const category = categorySelect.value;
    const number = numberInput.value;

    // Build query string
    const params = new URLSearchParams();
    if (number) params.set("number", number);
    if (breed) params.set("breed", breed);
    if (category) params.set("category", category);

    // Show loading
    resultsSection.innerHTML = '<div class="loading">Fetching dog facts</div>';

    try {
      const res = await fetch(`/facts?${params.toString()}`);
      const data = await res.json();

      if (!data.success) {
        resultsSection.innerHTML = `<div class="error-message">${data.error}</div>`;
        return;
      }

      if (data.facts.length === 0) {
        resultsSection.innerHTML = `<div class="placeholder"><p>No facts found for the selected filters. Try a different combination!</p></div>`;
        return;
      }

      const factsList = data.facts
        .map(
          (fact, i) => `
        <li class="fact-card">
          <div class="fact-content">
            <span class="fact-number">${i + 1}</span>
            <p>${fact}</p>
          </div>
        </li>
      `
        )
        .join("");

      resultsSection.innerHTML = `<ul class="facts-list">${factsList}</ul>`;
    } catch (err) {
      resultsSection.innerHTML = `<div class="error-message">Something went wrong. Please try again.</div>`;
      console.error(err);
    }
  }
});
