<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
    
    // Handle image upload
    $target_dir = "uploads/";  // folder where images will be stored
    $image_name = basename($_FILES["image"]["name"]);  // original image name
    $target_file = $target_dir . uniqid() . "_" . $image_name;  // target file with unique name
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a valid image or fake
    if (isset($_FILES["image"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo json_encode(['status' => 400, 'message' => 'File is not an image.']);
            $uploadOk = 0;
        }
    }

    // Check file size (limit to 5MB)
    if ($_FILES["image"]["size"] > 5000000) {
        echo json_encode(['status' => 400, 'message' => 'Sorry, your file is too large.']);
        $uploadOk = 0;
    }

    // Allow certain file formats (jpg, png, jpeg, gif)
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo json_encode(['status' => 400, 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.']);
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo json_encode(['status' => 400, 'message' => 'Sorry, your file was not uploaded.']);
    } else {
        // Try to upload file
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Image uploaded successfully, now insert data into DB
            $query = "INSERT INTO tbl_brand (name, brand, processor_name, memory_name, ram_gb, battery_hours, storage_name, storage_gb, display_name, screensize_inch, resolution_height_px, resolution_width_px, display_type, has_a_touch_screen_1_or_0, image)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ssssiisisdiisis',
             $name,
             $brand,
             $processor_name,
             $memory_name,
             $ram_gb,
             $battery_hours,
             $storage_name,
             $storage_gb,
             $display_name,
             $screensize_inch,
             $resolution_height_px,
             $resolution_width_px,
             $display_type,
             $has_a_touch_screen_1_or_0,
             $target_file);

            if ($stmt->execute()) {
                echo json_encode(['status' => 201, 'message' => 'Data added successfully']);
            } else {
                echo json_encode(['status' => 500, 'message' => 'Failed to add data']);
            }
        } else {
            echo json_encode(['status' => 500, 'message' => 'Sorry, there was an error uploading your file.']);
        }
    }
}
?>
