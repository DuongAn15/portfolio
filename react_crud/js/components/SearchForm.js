function SearchForm({ onChangeValue }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Tìm theo name, username..."
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

window.SearchForm = SearchForm;
