<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_brand = $_GET['id_brand'];

    // Validasi input
    if (empty($id_brand)) {
        echo json_encode([
            'status' => 400,
            'message' => 'Brand ID is required!'
        ]);
        exit();
    }

    // Query untuk mengambil feedback berdasarkan brand, termasuk data akun dan brand
    $query = "
        SELECT
            fb.id AS feedback_id,
            fb.rate,
            fb.review,
            fb.create_at,
            a.id AS akun_id,
            a.username,
            a.email,
            b.id AS brand_id,
            b.name AS brand_name,
            b.processor_name,
            b.memory_name,
            b.ram_gb,
            b.battery_hours
        FROM
            tbl_feedback fb
        JOIN
            tbl_akun a ON fb.id_akun = a.id
        JOIN
            tbl_brand b ON fb.id_brand = b.id
        WHERE
            fb.id_brand = ?
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id_brand);
    $stmt->execute();
    $result = $stmt->get_result();

    $feedbacks = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $feedbacks[] = $row;
        }
        echo json_encode([
            'status' => 200,
            'data' => $feedbacks
        ]);
    } else {
        echo json_encode([
            'status' => 404,
            'message' => 'No feedback found for this brand'
        ]);
    }
}
?>
