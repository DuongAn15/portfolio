// ==========================================
// BƯỚC 2: COMPONENT GỐC VÀ STATE TẬP TRUNG (App)
// ==========================================
function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  // Lấy các component từ window scope
  const SearchFormComponent = window.SearchForm || SearchForm;
  const AddUserComponent = window.AddUser || AddUser;
  const ResultTableComponent = window.ResultTable || ResultTable;

  return (
    <div className="container">
      <header className="app-header">
        <h1>
          <i className="fa-solid fa-users-gear"></i> Quản lý người dùng
        </h1>
        <p className="app-subtitle">
          Ứng dụng CRUD (Create - Read - Update - Delete) xây dựng bằng React Functional Components & Hooks
        </p>
        <div className="toolbar">
          <SearchFormComponent onChangeValue={setKeyword} />
          <AddUserComponent onAdd={setNewUser} />
        </div>
      </header>

      <main>
        <ResultTableComponent
          keyword={kw}
          user={newUser}
          onAdded={() => setNewUser(null)}
        />
      </main>
    </div>
  );
}

// Render Component gốc vào #root bằng ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
