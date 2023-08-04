import { useRef, useState, useEffect } from "react";
import { BiPlusCircle } from "react-icons/bi";
import html2pdf from "html2pdf.js";

const MarketCalculation = () => {
  const [lines, setLines] = useState([{ name: "", quantity: 1, price: "" }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousMoney, setPreviousMoney] = useState("");
  const [difference, setDifference] = useState(0);
  const [showDifference, setShowDifference] = useState(false);

  const handleAddLine = () => {
    setLines([...lines, { name: "", quantity: 1, price: "" }]);
  };

  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 10,
      filename: "market_calculation.pdf",
      image: { type: "jpeg", quality: 0.9 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };
  const handleClearData = () => {
    localStorage.removeItem("marketCalculationData");
    setLines([{ name: "", quantity: 1, price: "" }]);
    setTotalPrice(0);
    setPreviousMoney("");
    setDifference(0);
    setShowDifference(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedLines = [...lines];
    updatedLines[index][field] = value;
    if (field === "quantity") {
      updatedLines[index]["price"] =
        value * (updatedLines[index]["price"] || 0);
    }
    setLines(updatedLines);
  };

  const handleCalculate = () => {
    let total = 0;
    lines.forEach((line) => {
      if (!isNaN(parseFloat(line.price))) {
        total += parseFloat(line.price);
      }
    });
    setTotalPrice(total);

    // Save data to localStorage
    const dataToSave = {
      lines,
      previousMoney,
    };
    localStorage.setItem("marketCalculationData", JSON.stringify(dataToSave));
  };

  const handleCalculatePrice = (index) => {
    const updatedLines = [...lines];
    updatedLines[index]["price"] =
      updatedLines[index]["quantity"] * (updatedLines[index]["price"] || 0);
    setLines(updatedLines);
  };

  const handleCalculateDifference = () => {
    const difference = previousMoney - totalPrice;
    setDifference(difference);
    setShowDifference(true);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("marketCalculationData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLines(parsedData.lines);
      setPreviousMoney(parsedData.previousMoney);
    }
  }, []);

  return (
    <div>
      <div className="md:w-[70%] w-[98%] my-5 bg-indigo-200 py-3 mx-auto md:border-2 sm:border-none md:p-3 sm:p-0 rounded-lg ">
        <div ref={pdfRef}>
          <div className="text-center px-2   ">
            <div className="flex items-center space-x-2 md:space-x-4 mb-2 font-bold">
              <span>No</span>
              <span className="md:pl-48 pl-5">Name</span>
              <span className="md:pl-56 pl-12">Quantity</span>
              <span className="md:pl-60 pl-7">Price</span>
            </div>
            {lines.map((line, index) => (
              <div
                key={index}
                className="flex  items-center space-x-1 md:space-x-4 mb-2"
              >
                <span>{index + 1}.</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={line.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="md:w-full w-32 border rounded md:px-2 px-1 py-2"
                />
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={line.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    className="border w-full   rounded md:px-0 text-center px-1 py-2"
                  />
                  <BiPlusCircle
                    className="ml-2 text-lg  cursor-pointer text-blue-500"
                    onClick={() =>
                      handleInputChange(
                        index,
                        "quantity",
                        parseInt(line.quantity) + 1
                      )
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Price"
                  value={line.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="border md:w-full w-28 rounded md:px-2 px-1 py-2"
                />
                <button
                  onClick={() => handleCalculatePrice(index)}
                  className="bg-cyan-500 text-gray-600 md:px-2 px-2 py-1 rounded"
                >
                  =
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={handleAddLine}
                className="bg-blue-500 text-white px-4 btn-xs md:btn-sm  py-1 rounded"
              >
                Add
              </button>
              <input
                type="number"
                placeholder="Previous money"
                value={previousMoney}
                onChange={(e) => setPreviousMoney(e.target.value)}
                className="border md:w-full w-32 rounded md:px-2 px-1 py-1"
              />
              <button
                onClick={handleCalculateDifference}
                className="bg-blue-500 text-white btn-xs md:btn-sm  px-2 py-1 rounded"
              >
                Difference
              </button>
              <button
                onClick={handleCalculate}
                className="bg-green-500  btn-xs md:btn-sm  text-white px-2 py-1 rounded"
              >
                Calculate
              </button>
            </div>
            {totalPrice !== 0 && showDifference && (
              <div>
                Total Price: {totalPrice}
                <br />
                Difference: {difference}
              </div>
            )}
          </div>
          
          <div className="text-center py-3">
            <button
              onClick={handleDownloadPDF}
              className=" bg-teal-400  text-white px-4 py-2 rounded"
            >
              Download
            </button>
            <button
          onClick={handleClearData}
          className="bg-red-500 text-white px-4 py-2 rounded ml-4"
        >
          Clear
        </button>
          </div>
          <marquee className="bg-red-200  py-1">Quantity তে আগে সংখ্যা দিয়ে Price Input করবেন তার পর ইকুয়াল(=) বাটন এ ক্লিক করবেন || Input Price with number in Quantity first and then click on equal(=) button</marquee>
        </div>
      </div>
    </div>
  );
};

export default MarketCalculation;
