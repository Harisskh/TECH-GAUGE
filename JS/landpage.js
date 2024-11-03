document.addEventListener('DOMContentLoaded', async function() {
  const userIcon = document.getElementById('user-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const laptopSearch1 = document.getElementById('laptop-search-1');
  const searchResults1 = document.getElementById('search-results-1');
  const laptopSearch2 = document.getElementById('laptop-search-2');
  const searchResults2 = document.getElementById('search-results-2');
  const compareBtn = document.getElementById('compare-btn');
  
  let selectedLaptops = [];

  // Fetch user login status from your database
  let userLoggedIn = false;
  try {
    const response = await fetch('http://localhost/tech-gauge/register.php'); 
    const data = await response.json();
    userLoggedIn = data.loggedIn; // Contoh respons login
  } catch (error) {
    console.error('Error fetching login status:', error);
  }

  // Jika pengguna sudah login, ubah icon menjadi "Sign Out"
  if (userLoggedIn) {
    userIcon.innerHTML = 'Sign Out'; // Mengubah tulisan jadi "Sign Out"
    
    // Fungsi untuk menangani klik tombol sign out
    userIcon.addEventListener('click', async function() {
      try {
        const response = await fetch('/api/logout', { method: 'POST' }); 
        if (response.ok) {
          alert('You have been signed out!');
          window.location.reload(); // Reload halaman setelah sign out
        } else {
          alert('Failed to sign out');
        }
      } catch (error) {
        console.error('Error signing out:', error);
      }
    });
  } else {
    // Logika untuk user dropdown dan login
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
  }

  // Dummy data laptop
  const laptops = [
    'Dell XPS 13',
    'MacBook Pro 16',
    'Lenovo ThinkPad X1 Carbon',
    'HP Spectre x360',
    'ASUS ROG Zephyrus G14'
  ];

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
    const searchTerm = this.value.trim().toLowerCase();
    const filteredLaptops = laptops.filter(laptop =>
      laptop.toLowerCase().includes(searchTerm)
    );
    if (filteredLaptops.length === 0 && searchTerm !== '') {
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
    if (filteredLaptops.length === 0  && searchTerm !== '') {
      displayNoResults(searchResults2);
    } else {
      displaySearchResults(filteredLaptops, searchResults2, laptopSearch2);
    }
  });

  // Function for displaying search results
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
    searchResultsElement.style.display = results.length > 0 ? 'block' : 'none';
  }

  // Function for displaying "no results" message
  function displayNoResults(searchResultsElement) {
    searchResultsElement.innerHTML = '';
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'Laptop not available';
    noResultsMessage.style.color = 'red';
    noResultsMessage.style.padding = '10px';
    noResultsMessage.style.fontSize = '16px';
    searchResultsElement.appendChild(noResultsMessage);
    searchResultsElement.style.display = 'block';
  }

  // Function for selecting laptops
function selectLaptop(laptop, searchInputElement) {
  if (selectedLaptops.length < 2 && !selectedLaptops.includes(laptop)) {
      selectedLaptops.push(laptop);
      
      if (searchInputElement === laptopSearch1) {
          searchInputElement.value = selectedLaptops[0];  // Tampilkan laptop pertama
      } else {
          searchInputElement.value = selectedLaptops.length > 1 ? selectedLaptops[1] : '';  // Hanya tampilkan laptop kedua
      }
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
      window.location.href = `../html/comparison.html?laptop1=${encodeURIComponent(selectedLaptops[0])}&laptop2=${encodeURIComponent(selectedLaptops[1])}`;
    } else {
      alert('Please select two laptops to compare.');
    }
  });
});