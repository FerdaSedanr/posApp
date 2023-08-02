import React from "react";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import logo from "../assets/logo.png";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı !");
    }
  };

  return (
    <div border-b mb-6>
      {/*  header için yukrdan aşağı padding değerleri verdi */}
      <header className="header py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">
              <img
                src={logo}
                alt="Logo"
                className="w-32 h-32 md:w-24 md:h-24 p-2 md:p-1 "
              />
            </h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="large size"
            prefix={<SearchOutlined />}
            className="max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        {/* menu linksler arası kapsayıcısı içine justify-content yazarız */}
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className="menu-link flex flex-col hover:text-indigo-500 transition-all"
          >
            <HomeOutlined className="md:text-3xl text-xl" />
            <span className="md:text-xs text-[12px]">Anasayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className=" menu-link flex flex-col hover:text-indigo-500 transition-all"
            >
              <ShoppingCartOutlined className="md:text-3xl text-xl" />
              <span className="md:text-xs text-[12px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className=" menu-link flex flex-col hover:text-indigo-500 transition-all"
          >
            <CopyOutlined className="md:text-3xl text-xl" />
            <span className="md:text-xs text-[12px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className=" menu-link flex flex-col hover:text-indigo-500 transition-all"
          >
            <UserOutlined className="md:text-3xl text-xl" />
            <span className="md:text-xs text-[12px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className=" menu-link flex flex-col hover:text-indigo-500 transition-all"
          >
            <LineChartOutlined className="md:text-3xl text-xl" />
            <span className="md:text-xs text-[12px]">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className=" menu-link flex flex-col hover:text-indigo-500 transition-all">
              <LogoutOutlined className="md:text-3xl text-xl" />
              <span className="md:text-xs text-[12px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/"}
            className=" menu-link flex flex-col hover:text-indigo-500 transition-all"
          >
            <ShoppingCartOutlined className=" text-2xl" />
            <span className="md:text-xs text-[12px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
