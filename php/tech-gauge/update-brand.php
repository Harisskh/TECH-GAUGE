<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari POST request
    $id = $_POST['id']; // Pastikan ID untuk update disertakan
    $name = $_POST['name'];
    $brand = $_POST['brand'];
    $processor_name = $_POST['processor_name'];
    $memory_name = $_POST['memory_name'];
    $ram_gb = $_POST['ram_gb'];
    $battery_hours = $_POST['battery_hours'];
    $storage_name = $_POST['storage_name'];
    $storage_gb = $_POST['storage_gb'];
    $display_name = $_POST['display_name'];
    $screensize_inch = $_POST['screensize_inch'];
    $resolution_height_px = $_POST['resolution_height_px'];
    $resolution_width_px = $_POST['resolution_width_px'];
    $display_type = $_POST['display_type'];
    $has_a_touch_screen_1_or_0 = $_POST['has_a_touch_screen_1_or_0'];

    // Cek apakah ID disertakan
    if (empty($id)) {
        echo json_encode(['status' => 400, 'message' => 'ID is required']);
        exit();
    }

    // Update data
    $query = "UPDATE tbl_brand SET name = ?, brand = ?, processor_name = ?, memory_name = ?, ram_gb = ?, battery_hours = ?, storage_name = ?, storage_gb = ?, display_name = ?, screensize_inch = ?, resolution_height_px = ?, resolution_width_px = ?, display_type = ?, has_a_touch_screen_1_or_0 = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssiisisdiisii', $name, $brand, $processor_name, $memory_name, $ram_gb, $battery_hours, $storage_name, $storage_gb, $display_name, $screensize_inch, $resolution_height_px, $resolution_width_px, $display_type, $has_a_touch_screen_1_or_0, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Data updated successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to update data']);
    }
}
?>
