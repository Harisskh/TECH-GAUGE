<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = 'user';

    // Validasi data
    if (empty($email) || empty($username) || empty($password) || empty($role)) {
        echo json_encode([
            'status' => 400,
            'message' => 'All fields are required!'
        ]);
        exit();
    }

    // Cek apakah email atau username sudah terdaftar
    $checkQuery = "SELECT * FROM tbl_akun WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param('ss', $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            'status' => 400,
            'message' => 'Email or Username already exists!'
        ]);
        exit();
    }

    
    // Simpan data ke database
    $query = "INSERT INTO tbl_akun (email, username, password, role) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssss', $email, $username, $password, $role);

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 201,
            'message' => 'Registration successful',
            'data' => [
                'id' => $stmt->insert_id,
                'email' => $email,
                'username' => $username,
                'role' => $role
            ]
        ]);
    } else {
        echo json_encode([
            'status' => 500,
            'message' => 'Registration failed: ' . $conn->error
        ]);
    }
}
?>
