<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db_name = 'db_tech-gauge'; 

// Membuat koneksi
$conn = new mysqli($host, $user, $password, $db_name);

// Cek koneksi
if ($conn->connect_error) {
    die(json_encode([
        'status' => 500,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}
?>
