import React, { useState, useRef } from "react";
import "../css/combobox.css"; // Import CSS

export const Combobox = ({ options, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Filter options based on input
    if (newValue.trim() === "") {
      setFilteredOptions([]);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(newValue.toLowerCase())
        )
      );
    }

    setShowDropdown(true);
    onChange(newValue);
  };

  const handleSelectOption = (selectedOption) => {
    setInputValue(selectedOption);
    setShowDropdown(false);
    onChange(selectedOption);
  };

  return (
    <div className="combobox-container">
      {/* Custom Input with dropdown arrow */}
      <div className="combobox-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder={placeholder}
          className="combobox-input"
        />
        <span className="combobox-arrow">▼</span> {/* Dropdown Arrow */}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul ref={dropdownRef} className="combobox-dropdown">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="combobox-option"
              onMouseDown={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
