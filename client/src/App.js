import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import IDCard from "./IDcard";
import "./styles.css";

export default function App() {
  const cardRef = useRef();

  const [data, setData] = useState({
    name: "",
    id: "",
    phone: "",
    jobRole: "",
    dob: "",
    bloodGroup: "",
    address: "",
    district: "",
    photo: ""
  });

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const downloadCard = async () => {
    const canvas = await html2canvas(cardRef.current, {
      scale: 3
    });
    const link = document.createElement("a");
    link.download = "id-card.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container">

      {/* FORM */}
      <div className="form">
        <input placeholder="Name" onChange={e => handleChange("name", e.target.value)} />
        <input placeholder="ID" onChange={e => handleChange("id", e.target.value)} />
        <input placeholder="Phone" onChange={e => handleChange("phone", e.target.value)} />
        <input placeholder="Job Role" onChange={e => handleChange("jobRole", e.target.value)} />
        <input type="date" onChange={e => handleChange("dob", e.target.value)} />
        <input placeholder="Blood Group" onChange={e => handleChange("bloodGroup", e.target.value)} />
        <textarea placeholder="Address" onChange={e => handleChange("address", e.target.value)} />
        <input placeholder="District" onChange={e => handleChange("district", e.target.value)} />

        <input type="file" accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              handleChange("photo", URL.createObjectURL(file));
            }
          }}
        />

        <button onClick={downloadCard}>Download ID Card</button>
      </div>

      {/* CARD */}
      <IDCard ref={cardRef} data={data} />

    </div>
  );
}
