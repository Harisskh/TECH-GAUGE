let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 2;

loadMoreBtn.onclick = () => {
  // Mengganti onClick menjadi onclick
  let boxes = [
    ...document.querySelectorAll(".review-box-container .review-box"),
  ];
  for (let i = currentItem; i < currentItem + 2; i++) {
    if (i < boxes.length) {
      // Menambahkan kondisi untuk menghindari error saat index diluar jangkauan
      boxes[i].style.display = "inline-block";
    }
  }

  currentItem += 2; // Mengganti currentItems menjadi currentItem

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};
