//Đóng / ẩn 3 gạch đi khi màn hình nhỏ
const An3gach = () => {
  document //Dùng để đóng mở 3 gạch đi khi nhấn vào 1 cái gì đó trên menu
    .getElementById("navbarSupportedContent")
    .classList.remove("show");
};

export default An3gach;
