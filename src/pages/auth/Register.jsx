import React, { useState } from "react";
import { Form, Input, Button, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import { useNavigate } from "react-router-dom";
import logo from "../../components/assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    //console.log(values);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Kayıt işlemleri başarılı.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Bir şeyler yanlış gitti.");
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

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Şifreler aynı olmak zorunda")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="medium"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="text-blue-600">
              Şimdi giriş yap
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
            <Carousel className="!h-full px-6">
              <AuthCarousel
                img="/images/ist.png"
                title="İstatistiksel Analizler"
              />
              <AuthCarousel
                img="/images/res.png"
                title="Tüm Cihazlarla Uyumlu"
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

export default Register;
