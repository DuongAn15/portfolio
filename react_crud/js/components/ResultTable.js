function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

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
        console.error("Lỗi tải API:", err);
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

  React.useEffect(() => {
    if (user) {
      setUsers((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((u) => u.id || 0)) + 1 : 1;
        return [...prev, { ...user, id: nextId }];
      });
      onAdded();
    }
  }, [user]);

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
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  }

  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  const filteredUsers = users.filter((u) => {
    const kw = (keyword || "").toLowerCase().trim();
    if (!kw) return true;
    const name = (u.name || "").toLowerCase();
    const username = (u.username || "").toLowerCase();
    return name.includes(kw) || username.includes(kw);
  });

  if (loading) {
    return <div className="loading-state">Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>ID</th>
              <th>Họ tên</th>
              <th>Username</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th style={{ textAlign: "center", width: "120px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  Không tìm thấy người dùng phù hợp với từ khóa "{keyword}".
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
                      ? `${u.address.street || ""}, ${u.address.suite || ""}, ${u.address.city || ""}`.replace(/^, |, $/g, "")
                      : "-"}
                  </td>
                  <td>{u.phone || "-"}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="cell-actions">
                      <button
                        className="btn btn-edit"
                        onClick={() => editUser(u)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => removeUser(u.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Sửa người dùng (#{editing.id})</h3>
              <button className="modal-close" onClick={() => setEditing(null)}>
                &times;
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
                <button type="submit" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

window.ResultTable = ResultTable;
