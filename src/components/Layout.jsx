const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto p-4">
      <header>
        <h1 className="flex items-center">
          {" "}
          <img src="../../public/logoIcon.svg" alt="logo icon" /> Мой To-Do List
        </h1>
      </header>
      <main className="flex flex-col items-center gap-4">{children}</main>
    </div>
  );
};

export default Layout;
