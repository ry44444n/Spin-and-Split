import { useState } from 'react';

const Bill = () => {
  const [billData, setBillData] = useState({
    totalBill: 0, // State for total bill input as a number
    numPeople: '', // State for number of people input
    amountPerPerson: '', // State to store the calculated amount per person
    debts: [], // State to store debts
    debtorName: '', // State for debtor name input
    debtAmount: '', // State for debt amount input
  }); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBillCalculation = () => {
    const bill = billData.totalBill;
    const people = billData.numPeople;

    if (!isNaN(bill) && !isNaN(people) && people > 0) {
      const amount = (bill / people).toFixed(2);
      setBillData((prevData) => ({
        ...prevData,
        amountPerPerson: amount,
      }));
    } else {
      setBillData((prevData) => ({
        ...prevData,
        amountPerPerson: 'Invalid input',
      }));
    }
  };

  const handleAddDebt = () => {
    if (billData.debtorName.trim() !== '' && !isNaN(billData.debtAmount)) {
      const newDebt = {
        name: billData.debtorName,
        amount: billData.debtAmount,
      };
      setBillData((prevData) => ({
        ...prevData,
        debts: [...prevData.debts, newDebt],
        debtorName: '', // Clear the input field
        debtAmount: '', // Clear the input field
      }));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Split the Bill</h2>
        <input
          type="number"
          name="totalBill"
          value={billData.totalBill}
          onChange={handleInputChange}
          placeholder="Enter Total Bill"
          className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
        />
        <input
          type="number"
          name="numPeople"
          value={billData.numPeople}
          onChange={handleInputChange}
          placeholder="Enter Number of People"
          className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          onClick={handleBillCalculation}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Calculate
        </button>

        {/* Display Amount Per Person */}
        {billData.amountPerPerson && (
          <p className="text-xl font-semibold mt-6 text-gray-700">
            Amount per person: {billData.amountPerPerson}
          </p>
        )}

        {/* Debt Status */}
        <div className="flex flex-col items-center mt-12 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-red-500">Debt Status</h3>
          {billData.debts.length > 0 ? (
            billData.debts.map((debt, index) => (
              <p key={index} className="text-lg text-gray-700">
                {debt.name} owes you ${debt.amount.toFixed(2)}
              </p>
            ))
          ) : (
            <p className="text-lg text-gray-700">No debts recorded</p>
          )}

          {/* Add Debt */}
          <input
            type="text"
            name="debtorName"
            value={billData.debtorName}
            onChange={handleInputChange}
            placeholder="Enter Debtor's Name"
            className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
          />
          <input
            type="text"
            name="debtAmount"
            value={billData.debtAmount}
            onChange={handleInputChange}
            placeholder="Enter Debt Amount"
            className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
          />
          <button
            onClick={handleAddDebt}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all mt-4"
          >
            Add Debt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;