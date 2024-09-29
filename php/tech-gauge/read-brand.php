<?php
include 'config.php';

// Define base URL for the image
$base_url = "http://localhost/tech-gauge/uploads/"; 

$query = "SELECT * FROM tbl_brand";
$result = $conn->query($query);

$brands = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Check if image exists and append the full URL for the image
        if (!empty($row['image'])) {
            $row['image'] = $base_url . basename($row['image']);
        } else {
            $row['image'] = null;  // Set null if no image available
        }
        $brands[] = $row;
    }
    echo json_encode(['status' => 200, 'data' => $brands]);
} else {
    echo json_encode(['status' => 404, 'message' => 'No data found']);
}
?>
