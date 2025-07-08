import { useState } from "react";
import logo from "./assets/logo.png";

const units = {
    length: [
        { label: "Meters", value: "m" },
        { label: "Kilometers", value: "km" },
        { label: "Feet", value: "ft" },
        { label: "Miles", value: "mi" },
    ],
    weight: [
        { label: "Grams", value: "g" },
        { label: "Kilograms", value: "kg" },
        { label: "Pounds", value: "lb" }
    ]
};

const conversionRates = {
    m: { m: 1, km: 0.001, ft: 3.28084, mi: 0.000621371 },
    km: { m: 1000, km: 1, ft: 3280.84, mi: 0.621371 },
    ft: { m: 0.3048, km: 0.0003048, ft: 1, mi: 0.000189394 },
    mi: { m: 1609.34, km: 1.60934, ft: 5280, mi: 1 },

    g: { g: 1, kg: 0.001, lb: 0.00220462 },
    kg: { g: 1000, kg: 1, lb: 2.20462 },
    lb: { g: 453.592, kg: 0.453592, lb: 1 },
};

export default function UnitConverter() {
    const [category, setCategory] = useState("length");
    const [fromUnit, setFromUnit] = useState("m");
    const [toUnit, setToUnit] = useState("km");
    const [inputValue, setInputValue] = useState("");

    const handleConvert = () => {
        const value = inputValue;
        const rate = conversionRates[fromUnit]?.[toUnit] ?? 1;
        return (value * rate).toFixed(4);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-6">
            <div className="w-full max-w-md rounded-2xl shadow-xl p-6 bg-white">
                <div>
                    <img src={logo} alt="Unit Converter Logo" className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Unit Converter</h1>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full p-2 border rounded" value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCategory(value);
                                setFromUnit(units[value][0].value);
                                setToUnit(units[value][1].value);
                            }} >
                            {Object.keys(units).map((key) => (
                                <option key={key} value={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter value
                        </label>
                        <input type="number" placeholder={'Enter value'}
                            value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-2 border rounded text-lg"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Convert From</label>
                            <select className="w-full p-2 border rounded" value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)} >
                                {units[category].map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Convert To</label>
                            <select className="w-full p-2 border rounded"
                                value={toUnit} onChange={(e) => setToUnit(e.target.value)} >
                                {units[category].map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-lg font-semibold text-purple-700">
                            Result: <span className="text-gray-800">{handleConvert()}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}