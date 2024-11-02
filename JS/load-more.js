let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 2;

loadMoreBtn.onclick = () => {
  // Mengganti onClick menjadi onclick
  let boxes = [
    ...document.querySelectorAll(".review-box-container .review-box"),
  ];
  for (let i = currentItem; i < currentItem + 2; i++) {
    if (i < boxes.length) {
      // Menambahkan kondisi untuk menghindari error saat index diluar jangkauan
      boxes[i].style.display = "inline-block";
    }
  }

  currentItem += 2; // Mengganti currentItems menjadi currentItem

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};


document.addEventListener('DOMContentLoaded', function() {
  const userIcon = document.getElementById('user-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Status user sign in (diambil dari server)
  let isUserSignedIn = false;

  // Fungsi untuk memeriksa status login dari server
  function checkSignInStatus() {
      fetch('http://localhost/tech-gauge/register.php')  // Ganti dengan endpoint server-mu untuk cek login status
          .then(response => response.json())
          .then(data => {
              isUserSignedIn = data.isSignedIn;  // Menyimpan status login
              updateDropdown(); // Update dropdown berdasarkan status login
          })
          .catch(error => {
              console.error('Error fetching sign-in status:', error);
          });
  }

  // Fungsi untuk memperbarui dropdown berdasarkan status sign in
  function updateDropdown() {
      if (isUserSignedIn) {
          dropdownMenu.innerHTML = '<a href="#" id="sign-out">Sign Out</a>';
      } else {
          dropdownMenu.innerHTML = '<a href="sign-up.html">Sign In</a>';
      }
  }

  // Tampilkan atau sembunyikan dropdown saat icon diklik
  userIcon.addEventListener('click', function(e) {
      e.stopPropagation(); // Mencegah dropdown menutup saat diklik
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Tutup dropdown saat mengklik di luar
  document.addEventListener('click', function(event) {
      if (!event.target.closest('#user-icon') && !event.target.closest('.dropdown-menu')) {
          dropdownMenu.style.display = 'none';
      }
  });

  // Tangani event sign-out
  document.addEventListener('click', function(event) {
      if (event.target.id === 'sign-out') {
          fetch('/logout', { method: 'POST' })  // Ganti dengan endpoint server untuk logout
              .then(response => {
                  if (response.ok) {
                      isUserSignedIn = false;
                      updateDropdown(); // Perbarui menu dropdown
                      alert('You have signed out.');
                  }
              })
              .catch(error => {
                  console.error('Error during sign-out:', error);
              });
      }
  });

  // Panggil fungsi untuk cek status login saat halaman dimuat
  checkSignInStatus();
});
