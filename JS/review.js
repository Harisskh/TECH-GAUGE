// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star-rating i');
  const reviewForm = document.querySelector('.review-form');
  const reviewTextarea = document.querySelector('.review-textarea');
  let currentRating = 0;

  // Function to update star colors
  function updateStars(rating) {
      stars.forEach((star, index) => {
          if (index < rating) {
              star.style.color = '#FFD700'; // Yellow color for filled stars
          } else {
              star.style.color = '#ffd700'; // Black color for empty stars
          }
      });
  }

  // Add click event listeners to stars
  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          currentRating = index + 1;
          updateStars(currentRating);
      });
  });

  // Add submit event listener to the form
  reviewForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form from submitting normally

      // Get the review text
      const reviewText = reviewTextarea.value.trim();

      // Validate input
      if (currentRating === 0) {
          alert('Please select a rating before submitting.');
          return;
      }

      if (reviewText === '') {
          alert('Please enter a review before submitting.');
          return;
      }

      // Here you would typically send the data to a server
      // For this example, we'll just log it to the console
      console.log('Rating:', currentRating);
      console.log('Review:', reviewText);

      // Clear the form and reset stars after submission
      reviewTextarea.value = '';
      currentRating = 0;
      updateStars(currentRating);

      alert('Thank you for your review!');
  });
});