document.addEventListener('DOMContentLoaded', function() {
  const userIcon = document.getElementById('user-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const laptopSearch1 = document.getElementById('laptop-search-1');
  const searchResults1 = document.getElementById('search-results-1');
  const laptopSearch2 = document.getElementById('laptop-search-2');
  const searchResults2 = document.getElementById('search-results-2');
  const compareBtn = document.getElementById('compare-btn');

  // Sample laptop data (replace with actual database or data fetch)
  const laptops = [
    'Dell XPS 13',
    'MacBook Pro 16',
    'Lenovo ThinkPad X1 Carbon',
    'HP Spectre x360',
    'ASUS ROG Zephyrus G14'
  ];

  let selectedLaptops = [];

  // User icon dropdown
  userIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent closing dropdown
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('#user-icon') && !event.target.closest('.dropdown-menu')) {
      dropdownMenu.style.display = 'none';
    }
  });

  // Close dropdown search results when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('#search-results-1') && !event.target.closest('#laptop-search-1')) {
      searchResults1.style.display = 'none';
    }
    if (!event.target.closest('#search-results-2') && !event.target.closest('#laptop-search-2')) {
      searchResults2.style.display = 'none';
    }
  });

  // Laptop search functionality for search bar 1
  laptopSearch1.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase(); // Case-insensitive and trimmed input
    const filteredLaptops = laptops.filter(laptop => 
      laptop.toLowerCase().includes(searchTerm)
    );

    if (filteredLaptops.length === 0 && searchTerm !== '') {
      // If no laptops match the search term, show message in the dropdown
      displayNoResults(searchResults1);
    } else {
      displaySearchResults(filteredLaptops, searchResults1, laptopSearch1);
    }
  });

  // Laptop search functionality for search bar 2
  laptopSearch2.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredLaptops = laptops.filter(laptop => 
      laptop.toLowerCase().includes(searchTerm)
    );

    if (filteredLaptops.length === 0 && searchTerm !== '') {
      // If no laptops match the search term, show message in the dropdown
      displayNoResults(searchResults2);
    } else {
      displaySearchResults(filteredLaptops, searchResults2, laptopSearch2);
    }
  });

  function displaySearchResults(results, searchResultsElement, searchInputElement) {
    searchResultsElement.innerHTML = ''; // Clear previous results

    results.forEach(laptop => {
      const laptopElement = document.createElement('a');
      laptopElement.href = '#';
      laptopElement.textContent = laptop;
      laptopElement.addEventListener('click', function(e) {
        e.preventDefault();
        selectLaptop(laptop, searchInputElement);
      });
      searchResultsElement.appendChild(laptopElement);
    });
    searchResultsElement.style.display = results.length > 0 ? 'block' : 'none'; // Show if results exist
  }

  function displayNoResults(searchResultsElement) {
    searchResultsElement.innerHTML = ''; // Clear previous results
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'Laptop not available';
    noResultsMessage.style.color = 'red'; // Add styling to make it more noticeable
    noResultsMessage.style.padding = '10px'; // Add padding to the message
  noResultsMessage.style.fontSize = '16px'; // Increase font size
    searchResultsElement.appendChild(noResultsMessage);
    searchResultsElement.style.display = 'block'; // Show the no results message
  }

  function selectLaptop(laptop, searchInputElement) {
    if (selectedLaptops.length < 2 && !selectedLaptops.includes(laptop)) {
      selectedLaptops.push(laptop);
      searchInputElement.value = selectedLaptops.join(' vs '); // Display selected laptops
    } else if (selectedLaptops.includes(laptop)) {
      alert("This laptop has already been selected");
    }
    if (searchInputElement === laptopSearch1) {
      searchResults1.style.display = 'none';
    } else {
      searchResults2.style.display = 'none';
    }
  }

  // Compare button functionality
  compareBtn.addEventListener('click', function() {
    if (selectedLaptops.length === 2) {
      // Redirect to comparison page
      window.location.href = `comparison.html?laptop1=${encodeURIComponent(selectedLaptops[0])}&laptop2=${encodeURIComponent(selectedLaptops[1])}`;
    } else {
      alert('Please select two laptops to compare.');
    }
  });
});


//edwin punya
// Wait for DOM to load
// document.addEventListener('DOMContentLoaded', function () {
//     // Dropdown functionality for user icon
//     const userIcon = document.querySelector('.user-icon');
//     const dropdownMenu = document.getElementById('dropdown');
  
//     userIcon.addEventListener('click', function (e) {
//       e.preventDefault();
//       dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//     });
  
//     // Close dropdown when clicking outside
//     document.addEventListener('click', function (e) {
//       if (!userIcon.contains(e.target)) {
//         dropdownMenu.style.display = 'none';
//       }
//     });
  
//     // Search suggestions functionality
//     const searchInput = document.getElementById('search-input');
//     const suggestionsBox = document.getElementById('suggestions');
  
//     const laptopSuggestions = ['MacBook Air', 'MacBook Pro', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad X1'];
  
//     searchInput.addEventListener('input', function () {
//       const query = searchInput.value.toLowerCase();
//       suggestionsBox.innerHTML = ''; // Clear previous suggestions
//       if (query) {
//         const filteredSuggestions = laptopSuggestions.filter((item) =>
//           item.toLowerCase().includes(query)
//         );
//         filteredSuggestions.forEach((suggestion) => {
//           const suggestionDiv = document.createElement('div');
//           suggestionDiv.textContent = suggestion;
//           suggestionDiv.addEventListener('click', function () {
//             searchInput.value = suggestion; // Set input to the selected suggestion
//             suggestionsBox.innerHTML = ''; // Clear the suggestions
//           });
//           suggestionsBox.appendChild(suggestionDiv);
//         });
//         suggestionsBox.style.display = 'block';
//       } else {
//         suggestionsBox.style.display = 'none';
//       }
//     });
  

//     // Hide suggestions box when clicking outside
//     document.addEventListener('click', function (e) {
//       if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
//         suggestionsBox.style.display = 'none';
//       }
//     });
// });
