import "./App.css";
import products from "../public/data";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCircle } from "react-icons/fa";
import { useState } from "react";
// import CartModal from "../public/components/CartModal";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedWristSize, setSelectedWristSize] = useState("S");
  const [quantity, setQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // console.log(cartData);
  // console.log(selectedWristSize);

  const handleBandColor = (color) => {
    const product = products.find((prod) => prod.color == color);
    if (product) {
      setSelectedProduct(product);
      setSelectedWristSize("S");
      setQuantity(0);
    }
  };

  const handleWristSize = (size) => {
    setSelectedWristSize(size);
    setQuantity(0);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    if (quantity > 0) {
      const newItem = {
        id: selectedProduct.id,
        image: selectedProduct.image,
        title: selectedProduct.title,
        color: selectedProduct.color,
        size: selectedWristSize,
        quantity: quantity,
        price: selectedProduct.newPrice * quantity,
      };

      setCartData((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) =>
            item.id == selectedProduct.id &&
            item.color === newItem.color &&
            item.size == selectedWristSize
        );
        if (existingItemIndex !== -1) {
          const updatedCart = [...prev];
          updatedCart[existingItemIndex].quantity += newItem.quantity;
          updatedCart[existingItemIndex].price += newItem.price;
          return updatedCart;
        } else {
          return [...prev, newItem];
        }
      });

      setTotalQuantity((prev) => prev + quantity);
      setShowCheckout(true);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleContinueShopping = () => {
    closeModal();
  };

  const handleCheckout = () => {
    setCartData([]);
    setQuantity(0);
    setTotalQuantity(0);
    setSelectedWristSize("S");
    setSelectedProduct(products[0]);
    setShowCheckout(false);
    closeModal();
  };

  return (
    <>
      <div className="w-4/5 lg:w-2/3 mt-8 lg:mt-20 ml-10  lg:mx-72 ">
        <div className=" lg:flex gap-14 pb-204">
          <div className="lg:w-1/2 ">
            <img
              className="w-2/3 lg:w-full"
              src={selectedProduct.image}
              alt=""
            />
          </div>
          <div className="lg:w-1/2  pt-6">
            <h1 className="text-4xl font-bold" style={{ color: "#364A63" }}>
              {selectedProduct.title}
            </h1>
            <div className="flex gap-1 pt-2 items-center">
              <FaStar color="#FFD200" />
              <FaStar color="#FFD200" />
              <FaStar color="#FFD200" />
              <FaStarHalfAlt color="#FFD200" />
              <FaRegStar color="#FFD200" />
              <p style={{ color: "#8091A7", fontSize: "14px" }}>(2 Reviews)</p>
            </div>
            <p className="pt-5">
              <del style={{ color: "#8091A7" }} className="text-lg">
                ${selectedProduct.oldPrice}
              </del>
              <span
                style={{ color: "#6576FF" }}
                className="text-2xl font-bold ps-1"
              >
                ${selectedProduct.newPrice}
              </span>
            </p>
            <p style={{ color: "#8091A7" }} className="text-lg pt-5">
              I must explain to you how all this mistaken idea of denoun cing
              ple praising pain was born and I will give you a complete account
              of the system, and expound the actual teaching.
            </p>
            <div className="flex gap-11 pt-5">
              <div>
                <p style={{ color: "#8091A7" }} className="text-sm">
                  {" "}
                  Type
                </p>
                <p style={{ color: "#364A63" }} className="font-bold">
                  Watch
                </p>
              </div>
              <div>
                <p style={{ color: "#8091A7" }} className="text-sm">
                  Model Number
                </p>
                <p style={{ color: "#364A63" }} className="font-bold">
                  {selectedProduct.model}
                </p>
              </div>
            </div>

            {/* Band color section  */}
            <div className="pt-5">
              <p style={{ color: "#364A63" }} className="font-bold text-lg">
                Band Color
              </p>
              <div className="flex gap-5 pt-2">
                {products.map((product) => (
                  <FaCircle
                    key={product.color}
                    onClick={() => handleBandColor(product.color)}
                    className={`cursor-pointer ${
                      selectedProduct.color == product.color
                        ? "border-2 border-blue-500 rounded-full p-0.5"
                        : ""
                    }`}
                    color={product.colorCode}
                  ></FaCircle>
                ))}
              </div>
            </div>
            {/* wrist size section */}
            <div className="pt-5">
              <p style={{ color: "#364A63" }} className="font-bold text-lg">
                Wrist Size
              </p>
              <div className="py-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    style={{
                      border:
                        selectedWristSize === size
                          ? "1px solid #6576FF"
                          : "1px solid #DBDFEA",
                      borderRadius: "3px",
                    }}
                    className="mr-3 px-4 py-2"
                    onClick={() => handleWristSize(size)}
                  >
                    <span
                      style={{ color: "#364A63", fontSize: "13px" }}
                      className="font-bold mr-2"
                    >
                      {size}
                    </span>
                    <span
                      style={{ color: "#8091A7", fontSize: "13px" }}
                      className="font-bold"
                    >
                      ${69 + ["S", "M", "L", "XL"].indexOf(size) * 10}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* quantity and add to cart button  */}
            <div className="pt-5 pb-5 lg:pb-0  ">
              <button
                style={{
                  color: "#8091A7",
                  borderWidth: "1px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }}
                className="px-2 text-lg rounded-s"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span
                style={{
                  color: "#364A63",
                  borderTopWidth: "1px",
                  borderBottomWidth: "1px",
                  paddingTop: "13.2px",
                  paddingBottom: "10.8px",
                }}
                className="text-sm px-6   "
              >
                {quantity}
              </span>
              <button
                style={{
                  color: "#8091A7",
                  borderWidth: "1px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }}
                className="px-2 text-lg rounded-e"
                onClick={increaseQuantity}
              >
                +
              </button>
              <button
                className="px-4 font-bold ml-3 rounded"
                style={{
                  backgroundColor: "#6576FF",
                  paddingTop: "9.2px",
                  paddingBottom: "8px",
                  color: "#FFFFFF",
                }}
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {showCheckout && (
          <div className="pb-5 lg:pb-0 lg:fixed left-1/2 bottom-16">
            <button
              className="rounded-full px-6 "
              style={{
                backgroundColor: "#FFBB5A",
                paddingTop: "11px",
                paddingBottom: "11px",
              }}
              onClick={openModal}
            >
              <span style={{ color: "#364A63" }} className="font-bold ">
                Checkout
              </span>
              <span
                style={{
                  color: "#364A63",
                  backgroundColor: "#FFFFFF",
                  marginLeft: "10px",
                }}
                className="font-bold text-sm  px-2 rounded-md "
              >
                {totalQuantity}
              </span>
            </button>
          </div>
        )}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 lg:w-1/3 max-h-[90%] overflow-auto">
              <h2
                className=" font-bold mb-4"
                style={{ fontSize: "22px", color: "#364A63" }}
              >
                Your Cart
              </h2>
              <table className="w-full ">
                <thead>
                  <tr
                    style={{
                      color: "#8091A7",
                      fontSize: "14px",
                    }}
                    className="border-b "
                  >
                    <th className="text-start pb-2">Item</th>
                    <th className="text-center  pb-2 px-1 lg:px-0">Color</th>
                    <th className="text-center pb-2 px-1 lg:px-0">Size</th>
                    <th className="text-center pb-2 px-1 lg:px-0">Qnt</th>
                    <th className="text-end pb-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b"
                      style={{ color: "#364A63" }}
                    >
                      <td
                        className="flex items-center gap-1 lg:gap-3 py-4 over px-1 lg:px-0"
                        style={{ fontSize: "14px" }}
                      >
                        <img
                          src={item.image}
                          className="w-9 h-9 rounded-md object-cover"
                          alt=""
                        />
                        {item.title}
                      </td>

                      <td
                        className="py-2 text-center px-1 lg:px-0"
                        style={{ fontSize: "14px" }}
                      >
                        {item.color}
                      </td>
                      <td
                        className="py-2 text-center px-1 lg:px-0"
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {item.size}
                      </td>
                      <td
                        className="py-2 text-center px-1 lg:px-0"
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {item.quantity}
                      </td>
                      <td
                        className="py-2 text-end"
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        ${item.quantity * item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ color: "#364A63", fontWeight: "700" }}>
                    <td
                      colSpan="3"
                      className="text-start py-3"
                      style={{ fontSize: "16px" }}
                    >
                      Total
                    </td>
                    <td
                      className="text-center py-3"
                      style={{ fontSize: "14px" }}
                    >
                      {cartData.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </td>
                    <td className="text-end py-3" style={{ fontSize: "18px" }}>
                      $
                      {cartData
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="text-end py-4 ">
                <button
                  style={{
                    borderColor: "#DBDFEA",
                    borderWidth: "1px",
                    borderRadius: "3px",
                    color: "#364A63",
                    fontSize: "13px",
                    fontWeight: "700",
                    paddingLeft: "18px",
                    paddingRight: "18px",
                  }}
                  className="py-2"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  style={{
                    backgroundColor: "#6576FF",
                    borderRadius: "3px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: "700",
                    paddingLeft: "18px",
                    paddingRight: "18px",
                  }}
                  className="py-2 ml-6 "
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
