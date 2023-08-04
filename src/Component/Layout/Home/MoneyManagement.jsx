import { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

const MoneyManagement = () => {
  const [lines, setLines] = useState([{ name: "", amount: "" }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousMoney, setPreviousMoney] = useState("");
  const [difference, setDifference] = useState(0);
  const [showDifference, setShowDifference] = useState(false);

  const handleAddLine = () => {
    setLines([...lines, { name: "", amount: "" }]);
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
    localStorage.removeItem("MoneyManagementData");
    setLines([{ name: "", amount: "" }]);
    setTotalPrice(0);
    setPreviousMoney("");
    setDifference(0);
    setShowDifference(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedLines = [...lines];
    updatedLines[index][field] = value;
    setLines(updatedLines);
  };

  const handleCalculate = () => {
    let total = 0;
    lines.forEach((line) => {
      if (!isNaN(parseFloat(line.amount))) {
        total += parseFloat(line.amount);
      }
    });
    setTotalPrice(total);

    // Save data to localStorage
    const dataToSave = {
      lines,
      previousMoney,
    };
    localStorage.setItem("MoneyManagementData", JSON.stringify(dataToSave));
  };

  const handleCalculateDifference = () => {
    const difference =   totalPrice - previousMoney;
    setDifference(difference);
    setShowDifference(true);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("MoneyManagementData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLines(parsedData.lines);
      setPreviousMoney(parsedData.previousMoney);
    }
  }, []);

  return (
    <div>
      <div className="md:w-[70%] w-[98%] text-center mx-auto py-3 bg-cyan-100  md:border-2 sm:border-none md:p-3 sm:p-0 rounded-lg my-5">
        <div ref={pdfRef}>
          <div className="text-center px-2">
            <div className="flex items-center space-x-2 md:space-x-4 mb-2 font-bold">
              <span>No</span>
              <span className="md:pl-48 pl-10">Name</span>
              <span className="md:pl-96 pl-20">Amount</span>
            </div>
            {lines.map((line, index) => (
              <div
                key={index}
                className="flex  items-center space-x-2 md:space-x-4 mb-2"
              >
                <span>{index + 1}.</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={line.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="md:w-full w-40 border rounded md:px-2 px-1 py-1 md:py-2"
                />
                <input
                  type="text"
                  placeholder="Amount"
                  value={line.amount}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                  className="border md:w-full w-40 rounded md:px-2 px-1 py-1 md:py-2"
                />
              </div>
            ))}
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={handleAddLine}
                className="bg-blue-500  btn-xs md:btn-sm text-white px-4 py-1 rounded"
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
                className="bg-blue-500 btn-xs md:btn-sm text-white px-2 py-1 rounded"
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
              className="bg-teal-400 text-white px-4 py-2 rounded"
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
          
        </div>
        <marquee className="bg-green-200 py-1">Previous money তে ইনপুট দিয়ে Calculate বাটন এবং Difference বাটন এ ক্লিক করতে হবে || Input previous money and click Calculate button and Difference button</marquee>
      </div>
    </div>
  );
};

export default MoneyManagement;
