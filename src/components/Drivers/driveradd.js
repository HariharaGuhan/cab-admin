import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Drivers/driver.css'
export default function DriverForm() {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputFocus = (id) => {
    setFocusedInput(id);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission and display the entered information in the card.
  };
  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (e) => {
    // Handle the file input change event if needed
    console.log("File selected:", e.target.files[0]);
  };
  const [mobileNumber, setMobileNumber] = useState("");

  const handleMobileNumberChange = (e) => {
    // Remove non-numeric characters from the input
    const sanitizedInput = e.target.value.replace(/\D/g, "");
    
    // Limit the input to 10 characters
    if (sanitizedInput.length <= 10) {
      setMobileNumber(sanitizedInput);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="common-wrapper border rounded p-3 shadow">
        <h3 className="text-center mb-3 with-border">Add Drivers</h3>
        <form className="form-input1" onSubmit={handleSubmit}>
          <div className="row">
            {/* First Column */}
            <div className="col-lg-6 mb-3 ">
              <div
                className={`form-group  ${
                  focusedInput === "firstName" ? "focused" : ""
                }`}
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  onFocus={() => handleInputFocus("firstName")}
                  onBlur={handleInputBlur}
                />
              </div>
              <div
                className={`form-group ${
                  focusedInput === "lastName" ? "focused" : ""
                }`}
              >
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onFocus={() => handleInputFocus("lastName")}
                  onBlur={handleInputBlur}
                />
              </div>
              <div
                className={`form-group ${
                  focusedInput === "homeAddress" ? "focused" : ""
                }`}
              >
                <label htmlFor="homeAddress">Home Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="homeAddress"
                  onFocus={() => handleInputFocus("homeAddress")}
                  onBlur={handleInputBlur}
                />
              </div>

              <div
                className={`form-group ${
                  focusedInput === "presentAddress" ? "focused" : ""
                }`}
              >
                <label htmlFor="presentAddress">Present Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="presentAddress"
                  onFocus={() => handleInputFocus("presentAddress")}
                  onBlur={handleInputBlur}
                />
              </div>

              <div
                className={`form-group ${
                  focusedInput === "city" ? "focused" : ""
                }`}
              >
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  onFocus={() => handleInputFocus("city")}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="col-lg-6 mb-3">
              <div
                className={`form-group ${
                  focusedInput === "country" ? "focused" : ""
                }`}
              >
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  onFocus={() => handleInputFocus("country")}
                  onBlur={handleInputBlur}
                />
              </div>
              <div
                className={`form-group ${
                  focusedInput === "pincode" ? "focused" : ""
                }`}
              >
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  onFocus={() => handleInputFocus("pincode")}
                  onBlur={handleInputBlur}
                />
              </div>

              <div
                className={`form-group ${
                  focusedInput === "email" ? "focused" : ""
                }`}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onFocus={() => handleInputFocus("email")}
                  onBlur={handleInputBlur}
                />
              </div>

              <div
                className={`form-group ${
                  focusedInput === "mobileNumber" ? "focused" : ""
                }`}
              >
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  pattern="[0-9]*"
                  maxLength="10"
                 
                  onFocus={() => handleInputFocus("mobileNumber")}
                  onBlur={handleInputBlur}
                />
              </div>

              <div
                className={`form-group ${
                  focusedInput === "gender" ? "focused" : ""
                }`}
              >
                {/* <label htmlFor="gender">Gender</label> */}
                <select
                  className="form-control gen-text"
                  id="gender"
                  onFocus={() => handleInputFocus("gender")}
                  onBlur={handleInputBlur}
                >
                  <option value="" className="">
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div
                className={`form-group ${
                  focusedInput === "profilePhoto" ? "focused" : ""
                }`}
              >
                 {/* <label htmlFor="profilePhoto">
                  <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Profile Photo
                </label> */}
                <div className="custom-file-upload" onClick={handleFileInputClick}>
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control text-secondary"
                    onFocus={() => handleInputFocus("profilePhoto")}
                    onBlur={handleInputBlur}
                    onChange={handleFileInputChange}
                  />
                 
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Display Card */}
        <div className="card mt-3">
          <div className="card-header">Driver Information</div>
          <div className="card-body">
            <div className="row">
              {/* Second Column */}
              <div className="col-lg-6 mb-3">
                <div
                  className={`form-group ${
                    focusedInput === "vehicleNumber" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="vehicleNumber">Vehicle Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vehicleNumber"
                    onFocus={() => handleInputFocus("vehicleNumber")}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "vehicleType" ? "focused" : ""
                  }`}
                >
                  {/* <label htmlFor="vehicleType">Vehicle Type</label> */}
                  <select
                    className="form-control gen-text"
                    id="vehicleType"
                    onFocus={() => handleInputFocus("vehicleType")}
                    onBlur={handleInputBlur}
                  >
                    <option value="" className="mr-2">
                      Vehicle type
                    </option>
                    <option value="bike">Bike</option>
                    <option value="auto">Auto</option>
                    <option value="car">Car</option>
                    <option value="premiumCar">Premium Car</option>
                    <option value="electricCar">Electric Car</option>
                  </select>
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "vehicleModel" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="vehicleModel">Vehicle Model</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vehicleModel"
                    onFocus={() => handleInputFocus("vehicleModel")}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "seatingCapacity" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="seatingCapacity">Seating Capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="seatingCapacity"
                    onFocus={() => handleInputFocus("seatingCapacity")}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-3">
                {/* Continue repeating the pattern for the remaining input fields in the second column */}
                <div
                  className={`form-group ${
                    focusedInput === "taxRenewalDate" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="taxRenewalDate">Tax Renewal Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="taxRenewalDate"
                    onFocus={() => handleInputFocus("taxRenewalDate")}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "renewalDate" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="renewalDate">Renewal Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="renewalDate"
                    onFocus={() => handleInputFocus("renewalDate")}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "insuranceRenewalDate" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="insuranceRenewalDate">
                    Insurance Renewal Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="insuranceRenewalDate"
                    onFocus={() => handleInputFocus("insuranceRenewalDate")}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div
                  className={`form-group ${
                    focusedInput === "vehicleDocumentUpload" ? "focused" : ""
                  }`}
                >
                  <label htmlFor="vehicleDocumentUpload">
                    <i className="fas fa-cloud-upload-alt"></i> 
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="vehicleDocumentUpload"
                    onFocus={() => handleInputFocus("vehicleDocumentUpload")}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}