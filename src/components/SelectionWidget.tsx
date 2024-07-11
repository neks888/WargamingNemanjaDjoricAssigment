// src/components/SelectionWidget.tsx
import React, { useState, useEffect } from "react";

const SelectionWidget: React.FC = () => {
  const [elements, setElements] = useState<string[]>([]);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState(0);

  useEffect(() => {
    const initialElements = Array.from(
      { length: 300 },
      (_, i) => `Element ${i + 1}`
    );
    setElements(initialElements);
  }, []);

  const handleOpenDialog = () => {
    setTempSelected([...selectedElements]);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setSelectedElements([...tempSelected]);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(parseInt(e.target.value));
  };

  const handleSelect = (element: string) => {
    if (tempSelected.includes(element)) {
      setTempSelected(tempSelected.filter((el) => el !== element));
    } else if (tempSelected.length < 3) {
      setTempSelected([...tempSelected, element]);
    }
  };

  const filteredElements = elements
    .filter((el) => el.toLowerCase().includes(searchQuery))
    .filter((el) => {
      const num = parseInt(el.split(" ")[1]);
      return num > filterValue;
    });

  return (
    <div className="wrapper">
      <h3>Selected Items</h3>
      <ul>
        {selectedElements.map((el) => (
          <li className="button" key={el}>
            {el}{" "}
            <div
              onClick={() =>
                setSelectedElements(selectedElements.filter((se) => se !== el))
              }
            >
              X
            </div>
          </li>
        ))}
      </ul>
      <button className="button green" onClick={handleOpenDialog}>
        Change my choice
      </button>

      {dialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h3>Select Items</h3>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <select value={filterValue} onChange={handleFilter}>
              <option value="0">All</option>
              <option value="10">Greater than 10</option>
              <option value="50">Greater than 50</option>
              <option value="100">Greater than 100</option>
            </select>
            <div className="scrollable-list">
              {filteredElements.map((el) => (
                <div key={el}>
                  <input
                    type="checkbox"
                    checked={tempSelected.includes(el)}
                    disabled={
                      !tempSelected.includes(el) && tempSelected.length >= 3
                    }
                    onChange={() => handleSelect(el)}
                  />
                  {el}
                </div>
              ))}
            </div>
            <div className="selected-items">
              {tempSelected.map((el) => (
                <div className="button" key={el}>
                  {el} <button onClick={() => handleSelect(el)}>X</button>
                </div>
              ))}
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionWidget;
