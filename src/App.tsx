import React, { useState } from "react";
import {
  items,
  blindagem,
  motor,
  transmissao,
  freios,
} from "./components/constants/prices";

const App: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [selectedValues, setSelectedValues] = useState({
    blindagem: 0,
    motor: 0,
    transmissao: 0,
    freios: 0,
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item: { key: string; value: number }) => {
    if (selectedItems.includes(item.key)) {
      setTotal(total - item.value);
      setSelectedItems(selectedItems.filter((key) => key !== item.key));
    } else {
      setTotal(total + item.value);
      setSelectedItems([...selectedItems, item.key]);
    }
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    category: string
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      const previousValue =
        selectedValues[category as keyof typeof selectedValues];
      setTotal(total - previousValue + value);
      setSelectedValues({ ...selectedValues, [category]: value });
    }
  };

  const handleReset = () => {
    setTotal(0);
    setSelectedValues({
      blindagem: 0,
      motor: 0,
      transmissao: 0,
      freios: 0,
    });
    setSelectedItems([]);
  };

  const handleAddAll = () => {
    const newSelectedItems = items.map((item) => item.key);
    const newTotal = items.reduce((acc, item) => acc + item.value, 0);
    setTotal(newTotal);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="flex w-full flex-col items-center min-h-screen text-gray-700 bg-[url('/images/image.png')]">
      <div className="absolute top-4 left-4 p-4 bg-white text-black rounded shadow-lg">
        <h2 className="font-bold text-xl">REPAROS</h2>
        <p>REPARO DENTRO DA MEC: 5.000</p>
        <p>REPARO FORA DA MEC (SUL): 10.000</p>
        <p>REPARO NORTE: 15.000</p>
      </div>
      <div className="absolute top-4 right-4 p-4 bg-white text-black rounded shadow-lg">
        <h2 className="font-bold text-xl mb-4">TUNING</h2>
        <p className="mb-2">
          <strong>FULL - CARROS</strong> <br />
          Sem blindagem: 280.000 <br /> Com blindagem: 370.000
        </p>
        <p className="mb-2">
          <strong>FULL - MOTOS</strong> <br />
          Sem blindagem: 180.000 <br /> Com blindagem: 280.000
        </p>
        <p className="mb-2">
          <strong>FULL - AERONAVES</strong> <br />
          Sem blindagem: 350.000 <br /> Com blindagem: 400.000
        </p>
      </div>
      <div className="flex flex-col items-center mt-4 py-8 px-4 justify-center bg-white p-4 rounded shadow-lg">
        <h1 className="text-6xl font-bold text-black">MECÂNICA CUSTOM</h1>
        <div className="flex gap-4 w-full justify-end p-4">
          <button
            onClick={handleAddAll}
            className="mt-4 px-4 py-2 bg-green-800 text-white font-bold rounded hover:bg-green-700"
          >
            Adicionar Todos
          </button>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-800 text-white font-bold rounded hover:bg-red-700"
          >
            Remover Todos
          </button>
        </div>
        <h2 className="font-bold text-4xl text-black">DIVERSOS</h2>

        <div className="grid grid-cols-5 gap-4 p-4">
          {items.map((item) => (
            <label
              key={item.key}
              className="border rounded min-h-12 min-w-48 px-2 bg-gray-700 text-white font-semibold hover:bg-gray-800 flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.key)}
                onChange={() => handleCheckboxChange(item)}
                className="mr-2"
              />
              {item.key}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-[60px]">
          <div className="p-4">
            <h2 className="mb-2 font-bold text-2xl text-black">BLINDAGEM</h2>
            <select
              onChange={(e) => handleSelectChange(e, "blindagem")}
              className="border rounded min-w-48 min-h-12 px-2 bg-gray-700 text-white font-semibold hover:bg-gray-800 flex justify-center items-center"
            >
              {blindagem.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.key}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            <h2 className="mb-2 font-bold text-2xl text-black">MOTOR</h2>
            <select
              onChange={(e) => handleSelectChange(e, "motor")}
              className="border rounded min-w-48 min-h-12 px-2 bg-gray-700 text-white font-semibold hover:bg-gray-800 flex justify-center items-center"
            >
              {motor.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.key}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            <h2 className="mb-2 font-bold text-2xl text-black">TRANSMISSAO</h2>
            <select
              onChange={(e) => handleSelectChange(e, "transmissao")}
              className="border rounded min-w-48 min-h-12 px-2 bg-gray-700 text-white font-semibold hover:bg-gray-800 flex justify-center items-center"
            >
              {transmissao.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.key}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            <h2 className="mb-2 font-bold text-2xl text-black">FREIOS</h2>
            <select
              onChange={(e) => handleSelectChange(e, "freios")}
              className="border rounded min-w-48 min-h-12 px-2 bg-gray-700 text-white font-semibold hover:bg-gray-800 flex justify-center items-center"
            >
              {freios.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h2 className="text-4xl font-bold mt-6 text-black">
          TOTAL: R${total}
        </h2>
      </div>
    </div>
  );
};

export default App;
