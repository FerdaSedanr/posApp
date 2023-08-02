import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="cart h-full max-h-[calc(100vh_-_98px)] flex flex-col">
      <h1 className="bg-indigo-500 text-center text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h1>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün sepetten silindi.");
                    }}
                  />
                  <div className="flex flex-col ml-2 ">
                    <b>{item.title}</b>
                    <span>
                      {item.price} TL x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items center gap-x-1">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => dispatch(decrease(item))}
                  />
                </div>
              </li>
            ))
          : "Sepetinizde ürün bulunmamaktadır."}
      </ul>
      <div className="mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between py-5">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between py-5">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between py-2">
            <b className="text-xl text-green-600">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="middle"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sipariş oluştur
          </Button>
          <Button
            type="primary"
            size="middle"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
            disabled={cart.cartItems.length === 0 ? true : false}
            onClick={() => {
              if (
                window.confirm("Sepeti temizlemek istediğinizden emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Sepetiniz temzilendi");
              }
            }}
          >
            Siparişleri Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};
