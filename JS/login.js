// LOGIN
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah submit form secara default

  // Mendapatkan input username dan password dari form login
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // Mendapatkan data users yang tersimpan di localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Mencari user yang cocok dengan username dan password yang diinputkan
  const user = users.find(user => user.username === usernameInput && user.password === passwordInput);

  // Verifikasi user
  if (user) {
      alert('Login successful!');
      window.location.href = 'landpage.html'; // Arahkan ke halaman landpage
  } else {
      alert('Invalid Username or Password, Please Check and Try Again');
  }
});

// Fungsi untuk login dengan Google (Simulasi)
document.querySelector('.google-login').addEventListener('click', function() {
  alert('Google Login successful! (Simulasi)');
  // window.location.href = 'landpage.html'; 
});




// LOGIN
// document.querySelector('.login-form').addEventListener('submit', function(e) {
//   e.preventDefault(); // Mencegah submit form secara default

//   // Mendapatkan input username dan password dari form login
//   const usernameInput = document.getElementById('username').value;
//   const passwordInput = document.getElementById('password').value;

//   // Mendapatkan data username dan password yang tersimpan di localStorage saat sign up
//   const savedUsername = localStorage.getItem('username');
//   const savedPassword = localStorage.getItem('password');

//   // Verifikasi username dan password
//   if (savedUsername && savedPassword) {
//     if (usernameInput === savedUsername && passwordInput === savedPassword) {
//         alert('Login successful!');
//         window.location.href = 'landpage.html'; 
//     } else {
//         alert('Invalid Username or Password, Please Check and Try Again');
//     }
// } else {
//     alert('No registered user found. Please sign up first.');
// }

// // Fungsi untuk login dengan Google (Simulasi)
// document.querySelector('.google-login').addEventListener('click', function() {
//   alert('Google Login successfull! (Simulasi)');
//   // window.location.href = 'landpage.html'; 
// });
// });