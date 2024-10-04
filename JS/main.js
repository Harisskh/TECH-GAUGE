document.querySelector('.sign-up-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah submit form secara default

  // ambil nilai dari input field
  let email = document.getElementById('gmail').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  // Flag validasi
  let isValid = true;

  // Validasi email dengan regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email address format';
    isValid = false;
  } else {
    document.getElementById('emailError').textContent = '';
  }

  // Validasi username (simulasi)
  const existingUsernames = ['admin123', 'techgauge5']; // Contoh username

  if (existingUsernames.includes(username)) {
      document.getElementById('usernameError').textContent = 'Username already exists';
      isValid = false;
  } else {
      document.getElementById('usernameError').textContent = '';
  }

  // Validasi password
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
      document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and contain uppercase, lowercase, and number';
      isValid = false;
  } else {
      document.getElementById('passwordError').textContent = '';
  }

  // Cek apakah validasi berhasil
  if (isValid) {
      // Mendapatkan user yang tersimpan dari localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];

      // Menyimpan username, email, dan password ke localStorage
      let newUser = { username, email, password };
      users.push(newUser);
      
      localStorage.setItem('users', JSON.stringify(users));
      
      console.log('Form is valid. Proceeding with signup...');
      alert('Sign up successful!');
      window.location.href = "index.html"; // Redirect ke halaman login
  }
});

// Fungsi untuk sign up dengan Google (simulasi)
function googlesignup() {
  console.log('Sign up with Google clicked');
  alert('Google Sign-Up successful! (Simulasi)');





  // //SIGN UP
  // document.querySelector('.sign-up-form').addEventListener('submit', function(e) {
  //   e.preventDefault(); // Mencegah submit form secara default
  
  //   // ambil nilai dari input field
  //   let email = document.getElementById('gmail').value;
  //   let username = document.getElementById('username').value;
  //   let password = document.getElementById('password').value;
    
  //   // Flag validasi
  //   let isValid = true;
  
  //   // Validasi email
  //   if (!email.includes('@') || email.includes(' ')) {
  //     document.getElementById('emailError').textContent = 'Invalid email address format';
  //     isValid = false;
  // } else {
  //     document.getElementById('emailError').textContent = '';
  // }
  
  //   // Validasi username (simulasi)
  //   const existingUsernames = ['admin123', 'techgauge5']; // Contoh username
  
  //   if (existingUsernames.includes(username)) {
  //       document.getElementById('usernameError').textContent = 'Username already exists';
  //       isValid = false;
  //   } else {
  //       document.getElementById('usernameError').textContent = '';
  //   }
  
  //   // Validasi password
  //   let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //       document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and contain uppercase, lowercase, and number';
  //       isValid = false;
  //   } else {
  //       document.getElementById('passwordError').textContent = '';
  //   }
  
  //   // Menyimpan username dan password ke localStorage
  //   localStorage.setItem('username', username);
  //   localStorage.setItem('password', password);
  
  //   if (isValid) {
  //       console.log('Form is valid. Proceeding with signup...');
  //       alert('Sign up successfull!');
  //       window.location.href = "index.html"; // Redirect ke halaman login
  //   }
  // });
  
  // // Fungsi untuk sign up dengan Google
  // function googlesignup() {
  //   console.log('Sign up with Google clicked');
  //   alert('Google Sign-Up successfull! (Simulasi)');
  // }
}