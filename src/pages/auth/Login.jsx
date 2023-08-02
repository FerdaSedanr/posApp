import React from "react";
import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import logo from "../../components/assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();
      console.log(user);

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-5xl font-bold mb-2"></h1>
            <img
              src={logo}
              alt="Logo"
              className="w-64 h-64 md:w-32 md:h-32 p-2 md:p-1"
            />
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: false }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-between">
                <Checkbox>Remember Me</Checkbox>
                <Link>Forget Password?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="medium"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu ?&nbsp;
            <Link to="/register" className="text-blue-600">
              Şimdi Kaydol{" "}
            </Link>
          </div>
        </div>
        {/* Sağ kısım başlangıcı */}
        <div
          className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden"
          style={{
            backgroundImage: "linear-gradient(to right, #FFB6C1, #E6E6FA)",
          }}
        >
          <div className="w-full !h-full">
            <Carousel className="!h-full px-6" autoplay>
              <AuthCarousel
                img="/images/ist.png"
                title="İstatistiksel Analizler"
              />
              <AuthCarousel
                img="/images/res.png"
                title="Tüm Cihazlarla Uyumluluk"
              />
              <AuthCarousel
                img="/images/scor.png"
                title="Puanlandırma Sistemi"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
