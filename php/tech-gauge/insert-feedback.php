<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_brand = $_POST['id_brand'];
    $id_akun = $_POST['id_akun'];
    $rate = $_POST['rate'];
    $review = $_POST['review'];

    // Validasi input
    if (empty($id_brand) || empty($id_akun) || empty($rate) || empty($review)) {
        echo json_encode([
            'status' => 400,
            'message' => 'All fields are required!'
        ]);
        exit();
    }

    // Insert data ke tbl_feedback
    $query = "INSERT INTO tbl_feedback (id_brand, id_akun, rate, review) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('iids', $id_brand, $id_akun, $rate, $review);

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 201,
            'message' => 'Feedback added successfully'
        ]);
    } else {
        echo json_encode([
            'status' => 500,
            'message' => 'Failed to add feedback'
        ]);
    }
}
?>
