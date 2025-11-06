import { useState } from "react";

const UpdateHelthPackage = () => {
  const [fileName, setFileName] = useState("No icon chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No icon chosen");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Health package saved successfully!");
  };

  return (
    <div className="container my-4 p-0 m-0">
      {/* Header */}
      <div className="card-border">
        <div className="card-header d-flex justify-content-center align-items-center">
          <div className="text-center d-flex align-items-center">
            <i
              className="fa-solid fa-notes-medical me-2"
              style={{ color: "#ffffff" }}
            ></i>
            <span className="text" style={{ color: "#ffffff" }}>
              Health Packages
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="container-fluid my-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="form-group col-md-6">
            <label htmlFor="packageCode">Health Package Code</label>
            <input
              type="text"
              className="form-control"
              id="packageCode"
              placeholder="Enter code"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="packageName">Health Package Name</label>
            <input
              type="text"
              className="form-control"
              id="packageName"
              placeholder="Enter name"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="form-group col-md-12">
            <label htmlFor="packageDescription">
              Health Package Description
            </label>
            <input
              type="text"
              className="form-control"
              id="packageDescription"
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="form-group col-md-6">
            <label htmlFor="packagePrice">Health Package Price</label>
            <input
              type="number"
              className="form-control"
              id="packagePrice"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group col-md-6 mt-2">
            <div className="file-upload-wrapper d-flex flex-column">
              <label className="mb-1">Choose Icon</label>
              <input
                type="file"
                className="form-control"
                id="iconInput"
                onChange={handleFileChange}
              />
              {/* <span className="mt-1 text-muted">{fileName}</span> */}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary px-4"
            style={{ backgroundColor: "#01c0c8", border: "none" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHelthPackage;
