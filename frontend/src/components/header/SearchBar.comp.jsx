function SearchBar() {
  return (
    <li className="flex-1 relative flex items-center">
      <input
        type="text"
        placeholder="Search products"
        className="bg-white w-full h-10 rounded-md border-0 outline-amber-600 focus:outline-2 focus:[box-shadow:inset_0_0_4px_rgba(23,23,36,0.6)] text-black pl-3  leading-10"
      />

      <button className="bg-gray-500 w-12 h-10 absolute right-0 top--1  rounded-r-md flex justify-center items-center outline-amber-600 active:outline-2 hover:bg-gray-600 duration-75">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#e3e3e3"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </button>
    </li>
  );
}

export default SearchBar;
