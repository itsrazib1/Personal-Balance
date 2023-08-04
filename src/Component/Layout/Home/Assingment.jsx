import { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

const Assingment = () => {
  const [lines, setLines] = useState([{ name: "", amount: "" }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [difference, setDifference] = useState(0);
  const [showDifference, setShowDifference] = useState(false);
  const [showAllAmounts, setShowAllAmounts] = useState(true);

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
    localStorage.removeItem("Assingmentmark");
    setLines([{ name: "", amount: "" }]);
    setTotalPrice(0);
    setDifference(0);
    setShowDifference(false);
    setShowAllAmounts(false);
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
    setDifference(total / lines.length);
    setShowAllAmounts(true);
    setShowDifference(true); // Add this line to set showDifference to true
  
    // Save data to localStorage
    const dataToSave = {
      lines: lines.map((line) => ({ name: line.name, amount: line.amount })),
    };
    localStorage.setItem("Assingmentmark", JSON.stringify(dataToSave));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("Assingmentmark");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLines(parsedData.lines);
    }
  }, []);

  return (
    <div>
      <div className="md:w-[70%] mx-auto py-5 bg-lime-200 sm:w-full md:border-2 sm:border-none md:p-3 sm:p-0 rounded-lg my-2">
        <div ref={pdfRef}>
          <div className="text-center px-2">
            <div className="flex items-center space-x-2 md:space-x-4 mb-2 font-bold">
              <span>No</span>
              <span className="md:pl-48 pl-10">Assingment Name</span>
              <span className="md:pl-96 pl-20">Assingment Mark</span>
            </div>
            {lines.map((line, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 md:space-x-4 mb-2 ${
                  showAllAmounts ? "" : ""
                }`}
              >
                <span>{index + 1}.</span>
                <input
                  type="text"
                  placeholder="Assingment Mark"
                  value={line.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value                  )}
                  className="md:w-full w-40 border rounded md:px-2 px-1 py-2"
                />
                <input
                  type="number"
                  placeholder="Assingment Mark"
                  value={showAllAmounts ? line.amount : ""}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                  className={`border md:w-full w-40 rounded md:px-2 px-1 py-2 ${
                    showAllAmounts ? "" : ""
                  }`}
                  readOnly={!showAllAmounts}
                />
              </div>
            ))}
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={handleAddLine}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={handleCalculate}
                className="bg-green-500 text-white px-2 py-2 rounded"
              >
                Calculate
              </button>
            </div>
            {totalPrice !== 0 && showDifference && (
              <div>
                
                Difference (Average): {difference}
              </div>
            )}
          </div>
          <div className="text-center py-3">
            <button
              onClick={handleDownloadPDF}
              className="bg-teal-400 hidden text-white px-4 py-2 rounded"
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
      </div>
    </div>
  );
};

export default Assingment;
