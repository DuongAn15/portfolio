function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  const SearchFormComponent = window.SearchForm || SearchForm;
  const AddUserComponent = window.AddUser || AddUser;
  const ResultTableComponent = window.ResultTable || ResultTable;

  return (
    <div className="container">
      <header className="app-header">
        <h1>Quản lý người dùng</h1>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
