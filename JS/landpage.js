// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Dropdown functionality for user icon
    const userIcon = document.querySelector('.user-icon');
    const dropdownMenu = document.getElementById('dropdown');
  
    userIcon.addEventListener('click', function (e) {
      e.preventDefault();
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
  
    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!userIcon.contains(e.target)) {
        dropdownMenu.style.display = 'none';
      }
    });
  
    // Search suggestions functionality
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');
  
    const laptopSuggestions = ['MacBook Air', 'MacBook Pro', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad X1'];
  
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      suggestionsBox.innerHTML = ''; // Clear previous suggestions
      if (query) {
        const filteredSuggestions = laptopSuggestions.filter((item) =>
          item.toLowerCase().includes(query)
        );
        filteredSuggestions.forEach((suggestion) => {
          const suggestionDiv = document.createElement('div');
          suggestionDiv.textContent = suggestion;
          suggestionDiv.addEventListener('click', function () {
            searchInput.value = suggestion; // Set input to the selected suggestion
            suggestionsBox.innerHTML = ''; // Clear the suggestions
          });
          suggestionsBox.appendChild(suggestionDiv);
        });
        suggestionsBox.style.display = 'block';
      } else {
        suggestionsBox.style.display = 'none';
      }
    });
  
    // Hide suggestions box when clicking outside
    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
      }
    });
});
