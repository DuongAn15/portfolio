// ==========================================
// BƯỚC 4, 6, 7: BẢNG KẾT QUẢ, SỬA, XÓA (ResultTable)
// ==========================================
function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

  // Bước 4.1: Tải dữ liệu từ API khi component mount (useEffect [])
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải API, sử dụng dữ liệu mặc định:", err);
        // Dữ liệu fallback nếu mất mạng hoặc API lỗi
        setUsers([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: { street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough" },
            phone: "1-770-736-8031 x56442"
          },
          {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: { street: "Victor Plains", suite: "Suite 879", city: "Wisokyburgh" },
            phone: "010-692-6593 x09125"
          }
        ]);
        setLoading(false);
      });
  }, []);

  // Bước 5.4: Khi prop user thay đổi -> thêm vào danh sách
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => {
        // Tạo ID duy nhất an toàn: ID lớn nhất hiện tại + 1
        const nextId = prev.length > 0 ? Math.max(...prev.map((u) => u.id || 0)) + 1 : 1;
        return [...prev, { ...user, id: nextId }];
      });
      onAdded();
    }
  }, [user]);

  // Bước 6: Sửa người dùng (Edit)
  // Kỹ thuật Deep Copy để form sửa không làm biến đổi trực tiếp đối tượng trong bảng
  function editUser(userItem) {
    setEditing({
      ...userItem,
      address: userItem.address ? { ...userItem.address } : { street: "", suite: "", city: "" }
    });
  }

  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing((prev) => ({
        ...prev,
        address: { ...(prev.address || {}), [field]: value }
      }));
    } else {
      setEditing((prev) => ({ ...prev, [field]: value }));
    }
  };

  function saveUser(e) {
    if (e) e.preventDefault();
    if (!editing.name.trim() || !editing.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    // Cập nhật danh sách qua map()
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  }

  // Bước 7: Xóa người dùng (Delete)
  function removeUser(id) {
    // Dùng filter() để trả về mảng mới không chứa id cần xóa
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Bước 4.4: Lọc danh sách theo keyword (name, username)
  const filteredUsers = users.filter((u) => {
    const kw = (keyword || "").toLowerCase().trim();
    if (!kw) return true;
    const name = (u.name || "").toLowerCase();
    const username = (u.username || "").toLowerCase();
    return name.includes(kw) || username.includes(kw);
  });

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>ID</th>
              <th>Họ tên</th>
              <th>Username</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th style={{ textAlign: "center", width: "140px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  <i
                    className="fa-regular fa-folder-open"
                    style={{ fontSize: "2rem", marginBottom: "8px", display: "block" }}
                  ></i>
                  Không tìm thấy người dùng nào phù hợp với từ khóa "{keyword}".
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="cell-id">#{u.id}</td>
                  <td className="cell-user">{u.name}</td>
                  <td>
                    <span className="cell-username">@{u.username}</span>
                  </td>
                  <td>{u.email || "-"}</td>
                  <td>
                    {u.address && (u.address.street || u.address.suite || u.address.city)
                      ? `${u.address.street || ""}, ${u.address.suite || ""}, ${u.address.city || ""}`.replace(
                          /^, |, $/g,
                          ""
                        )
                      : "-"}
                  </td>
                  <td>{u.phone || "-"}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="cell-actions" style={{ justifyContent: "center" }}>
                      <button
                        className="btn btn-edit"
                        title="Sửa thông tin"
                        onClick={() => editUser(u)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        title="Xóa người dùng"
                        onClick={() => removeUser(u.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa người dùng */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fa-solid fa-user-pen" style={{ color: "var(--warning)" }}></i>{" "}
                Chỉnh sửa người dùng (#{editing.id})
              </h3>
              <button className="modal-close" onClick={() => setEditing(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-name">
                    Họ và tên <span className="required">*</span>
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editing.name || ""}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-username">
                    Tên đăng nhập <span className="required">*</span>
                  </label>
                  <input
                    id="edit-username"
                    type="text"
                    value={editing.username || ""}
                    onChange={(e) => handleEditChange("username", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-email">Email</label>
                  <input
                    id="edit-email"
                    type="email"
                    value={editing.email || ""}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-phone">Số điện thoại</label>
                  <input
                    id="edit-phone"
                    type="text"
                    value={editing.phone || ""}
                    onChange={(e) => handleEditChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <div className="form-row-3">
                  <input
                    type="text"
                    placeholder="Đường"
                    value={editing.address?.street || ""}
                    onChange={(e) => handleEditChange("street", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Căn hộ/Phòng"
                    value={editing.address?.suite || ""}
                    onChange={(e) => handleEditChange("suite", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Thành phố"
                    value={editing.address?.city || ""}
                    onChange={(e) => handleEditChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={() => setEditing(null)}>
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--success)" }}
                >
                  <i className="fa-solid fa-floppy-disk"></i> Lưu thay đổi
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
window.ResultTable = ResultTable;
