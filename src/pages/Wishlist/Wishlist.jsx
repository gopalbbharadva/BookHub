import { Navbar, WishListCard } from "../../barrelexport/Componentutil";
import { useAuth } from "../../contexts/AuthContext";
import { checkLoginService } from "../../Services/AuthService";
import "./Wishlist.css";

export const Wishlist = () => {
  const { currentUser } = useAuth();

  checkLoginService();
  return (
    <div>
      <Navbar />
      <WishListCard />
    </div>
  );
};
