<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validasi input
    if (empty($username) || empty($password)) {
        echo json_encode([
            'status' => 400,
            'message' => 'Username and password are required!'
        ]);
        exit();
    }

    // Ambil data akun berdasarkan username
    $query = "SELECT * FROM tbl_akun WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verifikasi password (tanpa hash, langsung cek kecocokan string)
        if ($password == $user['password']) {
            echo json_encode([
                'status' => 200,
                'message' => 'Login successful',
                'data' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'username' => $user['username'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            echo json_encode([
                'status' => 401,
                'message' => 'Invalid password!'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 404,
            'message' => 'User not found!'
        ]);
    }
}
?>
