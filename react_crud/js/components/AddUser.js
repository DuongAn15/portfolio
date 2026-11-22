// ==========================================
// BƯỚC 5: COMPONENT THÊM NGƯỜI DÙNG (AddUser)
// ==========================================
function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  // Xử lý thay đổi input, sử dụng Spread Operator (...) với thuộc tính lồng nhau
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({
        ...user,
        address: { ...user.address, [id]: value }
      });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    // Validation theo yêu cầu đề bài
    if (user.name.trim() === "" || user.username.trim() === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    // Truyền user lên App thông qua callback onAdd (Lifting State Up)
    onAdd(user);

    // Reset form và đóng modal
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });
    setAdding(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setAdding(true)}>
        <i className="fa-solid fa-user-plus"></i> Thêm người dùng
      </button>

      {adding && (
        <div className="modal-overlay" onClick={() => setAdding(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fa-solid fa-user-plus" style={{ color: "var(--primary)" }}></i>{" "}
                Thêm người dùng mới
              </h3>
              <button className="modal-close" onClick={() => setAdding(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleAdd}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Họ và tên <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="VD: Leanne Graham"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">
                    Tên đăng nhập <span className="required">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="VD: Bret"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="0987654321"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <div className="form-row-3">
                  <input
                    id="street"
                    type="text"
                    placeholder="Đường (Street)"
                    value={user.address.street}
                    onChange={handleChange}
                  />
                  <input
                    id="suite"
                    type="text"
                    placeholder="Căn hộ/Phòng (Suite)"
                    value={user.address.suite}
                    onChange={handleChange}
                  />
                  <input
                    id="city"
                    type="text"
                    placeholder="Thành phố (City)"
                    value={user.address.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  placeholder="hildegard.org"
                  value={user.website}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={() => setAdding(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-check"></i> Xác nhận thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Xuất ra phạm vi toàn cục để App có thể sử dụng
window.AddUser = AddUser;
