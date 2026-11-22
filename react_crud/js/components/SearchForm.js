// ==========================================
// BƯỚC 3: COMPONENT TÌM KIẾM (SearchForm)
// ==========================================
function SearchForm({ onChangeValue }) {
  return (
    <div className="search-box">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Tìm theo name, username..."
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

// Xuất ra phạm vi toàn cục để App có thể sử dụng
window.SearchForm = SearchForm;
