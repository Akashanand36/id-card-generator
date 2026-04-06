import React from "react";

const IDCard = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="card">

      {/* Top Header */}
      <div className="header">
        <h3>RISHABAM Foundation</h3>
      </div>

      {/* Photo */}
      <div className="photo-container">
        <img
          src={data.photo || "https://via.placeholder.com/100"}
          alt=""
          className="photo"
        />
      </div>

      {/* Name */}
      <h2 className="name">{data.name || "Your Name"}</h2>

      {/* Role */}
      <p className="role">{data.jobRole || "Job Role"}</p>

      {/* Details */}
      <div className="details">
        <p>ID: {data.id}</p>
        <p>📞 {data.phone}</p>
        <p>DOB: {data.dob}</p>
        <p>Blood: {data.bloodGroup}</p>
      </div>

      {/* Address */}
      <p className="address">
        {data.address}, {data.district}
      </p>

      {/* Signature */}
      <div className="sign-box">
        <p className="sign-name">V. SEKAR</p>
        <p className="sign-title">Authorised Signatory</p>
      </div>

    </div>
  );
});

export default IDCard;
