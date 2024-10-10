document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');  
    const stars = document.querySelectorAll('.star-rating i');
    const reviewForm = document.querySelector('.review-form');
    const reviewTextarea = document.querySelector('.review-textarea');
    let currentRating = 0;
  
    // Status user sign in (anggap false untuk awal)
    let isUserSignedIn = false;
  
    // Update dropdown based on sign in status
    function updateDropdown() {
        if (isUserSignedIn) {
            dropdownMenu.innerHTML = '<a href="#" id="sign-out">Sign Out</a>';
        } else {
            dropdownMenu.innerHTML = '<a href="sign-up.html">Sign In</a>';
        }
    }

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

    // Handle sign out
    document.addEventListener('click', function(event) {
        if (event.target.id === 'sign-out') {
            isUserSignedIn = false; // Set sign out status
            updateDropdown(); // Update dropdown menu
            alert('You have signed out.');
        }
    });

    // Update dropdown on load
    updateDropdown();

    // Function to update star classes (CSS) based on rating
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('fa-regular'); // Remove regular star (unfilled)
                star.classList.add('fa-solid');      // Add solid star (filled)
            } else {
                star.classList.remove('fa-solid');   // Remove solid star (filled)
                star.classList.add('fa-regular');    // Add regular star (unfilled)
            }
        });
    }
  
    // Add click event listeners to stars
    stars.forEach((star, index) => {
        star.style.cursor = 'pointer'; // Change cursor to pointer for better UX
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStars(currentRating); // Update star styles based on rating
        });
    });
  
    // Add submit event listener to the form
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting normally
  
        // Get the review text
        const reviewText = reviewTextarea.value.trim();
  
        // Check if user is signed in
        if (!isUserSignedIn) {
            alert('Please sign in before submitting your review.');
            userIcon.scrollIntoView({ behavior: 'smooth' }); // Scroll to user icon for sign in
            return;
        }

        // Validate input
        if (currentRating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }
  
        if (reviewText === '') {
            alert('Please enter a review before submitting.');
            return;
        }
  
        // Log rating and review text to console (or send to server)
        console.log('Rating:', currentRating);
        console.log('Review:', reviewText);
  
        // Clear the form and reset stars after submission
        reviewTextarea.value = '';
        currentRating = 0;
        updateStars(currentRating);
  
        alert('Thank you for your review!');
    });
  
    // Dummy function to simulate user sign in
    // Call this function somewhere in your sign in logic
    function signInUser() {
        isUserSignedIn = true;
        updateDropdown(); // Update the dropdown to show sign out option
        alert('You are now signed in.');
    }

    // Simulate user sign in for testing purposes (remove this in production)
    // Uncomment the line below to simulate a user signing in
    // signInUser();
});
