import React, { useEffect, useRef, useState } from "react";

const PlaceInput = ({ label, placeholder, value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const autocompleteService = useRef(null);

  useEffect(() => {
    if (
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      !autocompleteService.current
    ) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setValue(val);

    if (!val) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (
      !autocompleteService.current &&
      window.google?.maps?.places?.AutocompleteService
    ) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      console.warn("Google AutocompleteService not ready");
      return;
    }
    console.log(autocompleteService)

    autocompleteService.current.getPlacePredictions(
      { input: val },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      }
    );
  };

  const handleSelect = (description) => {
    setValue(description);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#F5F7F6] border-none text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90A0]/30"
          value={value}
          onChange={handleInputChange}
        />
        <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-md max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => handleSelect(suggestion.description)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlaceInput;
