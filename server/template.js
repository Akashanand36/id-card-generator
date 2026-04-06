exports.generateHTML = (data) => {
  return `
  <html>
  <body style="
    width:188px;
    height:302px;
    font-family:Arial;
    position:relative;
    border:2px solid #000;
    border-radius:10px;
    overflow:hidden;
  ">

    <!-- Background -->
    <div style="
      background:linear-gradient(#2e3c8c,#ffffff);
      height:120px;
      width:100%;
    "></div>

    <!-- Photo -->
    <div style="
      position:absolute;
      top:70px;
      left:50%;
      transform:translateX(-50%);
      width:90px;
      height:90px;
      border-radius:50%;
      overflow:hidden;
      border:4px solid #2e3c8c;
    ">
      <img src="${data.photo}" width="100%" height="100%" />
    </div>

    <!-- Name -->
    <h3 style="
      position:absolute;
      top:170px;
      width:100%;
      text-align:center;
      color:red;
      font-size:14px;
    ">
      ${data.name}
    </h3>

    <!-- Role -->
    <p style="
      position:absolute;
      top:195px;
      width:100%;
      text-align:center;
      font-size:11px;
    ">
      ${data.jobRole}
    </p>

    <!-- Details -->
    <div style="
      position:absolute;
      top:215px;
      left:10px;
      font-size:9px;
    ">
      <p>ID: ${data.id}</p>
      <p>📞 ${data.phone}</p>
      <p>DOB: ${data.dob}</p>
      <p>Blood: ${data.bloodGroup}</p>
    </div>

    <!-- Address -->
    <p style="
      position:absolute;
      bottom:25px;
      width:100%;
      text-align:center;
      font-size:8px;
    ">
      ${data.address}, ${data.district}
    </p>

    <!-- Signature -->
    <div style="
      position:absolute;
      bottom:5px;
      width:100%;
      text-align:center;
      font-size:8px;
    ">
      <p><b>V. SEKAR</b></p>
      <p>Authorised Signatory</p>
    </div>

  </body>
  </html>
  `;
};
