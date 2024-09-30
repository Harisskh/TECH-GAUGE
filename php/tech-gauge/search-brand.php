<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil parameter dari request
    $search = $_GET['search']; // Ambil parameter search

    // Validasi jika parameter search kosong
    if (empty($search)) {
        echo json_encode(['status' => 400, 'message' => 'Search parameter is required']);
        exit();
    }

    // Query untuk mencari berdasarkan nama atau brand
    $query = "SELECT * FROM tbl_brand WHERE name LIKE ? OR brand LIKE ?";
    $search_param = "%" . $search . "%";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $search_param, $search_param);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $brands = [];
            while ($row = $result->fetch_assoc()) {
                $brands[] = $row;
            }
            echo json_encode(['status' => 200, 'data' => $brands]);
        } else {
            echo json_encode(['status' => 404, 'message' => 'No data found']);
        }
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to search data']);
    }
}
?>
