<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil ID dari request
    $id = $_POST['id']; // Pastikan ID untuk delete disertakan

    // Validasi jika ID kosong
    if (empty($id)) {
        echo json_encode(['status' => 400, 'message' => 'ID is required']);
        exit();
    }

    // Hapus data berdasarkan ID
    $query = "DELETE FROM tbl_brand WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        // Cek apakah ada baris yang dihapus
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 200, 'message' => 'Data deleted successfully']);
        } else {
            echo json_encode(['status' => 404, 'message' => 'No data found with that ID']);
        }
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to delete data']);
    }
}
?>
