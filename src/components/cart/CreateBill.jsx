import { Modal, Form, Input, Select, Card, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";
const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  //burda oluşturduğumuz onFinish e.target değerlerinin alınması gibi
  //düşünebiliriz name değerlerine karşılık felen yerler values değeri olarak
  //konsolda yazdırılır.
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };
  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[{ required: true }]}
        >
          <Input placeholder="Müşteri adı yazınız" />
        </Form.Item>
        <Form.Item
          label="Müşteri telefon numarası yazınız"
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
        >
          <Input
            placeholder="Müşteri telefon numarası yazınız"
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi "
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Seçiniz">
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            <Select.Option value="Kapıda Ödeme">Kapıda Ödeme</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>
              <span className="text-xl">
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
