import Account from "./Account.comp";
import Address from "./Address.comp";
import Cart from "./Cart.comp";
import Logo from "./Logo.comp";
import SearchBar from "./SearchBar.comp";
import Settings from "./Settings.comp";

function Navebar() {
  return (
    <nav className="w-full bg-gray-700 text-white p-3  pl-4 pr-4">
      <ul className="flex  gap-5  item">
        <Logo />
        <Address />
        <SearchBar />
        <Cart />
        <Account />
        <Settings />
      </ul>
    </nav>
  );
}

export default Navebar;
