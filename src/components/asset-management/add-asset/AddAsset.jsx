import React from "react";

const AddAsset = () => {
  return (
    <div className="container my-4 p-0 m-0">
      {/* Header */}
      <div className="card-border">
        <div className="card-header d-flex justify-content-center align-items-center bg-primary">
          <div className="text-center d-flex align-items-center">
            <i
              className="fa-solid fa-toolbox me-2"
              style={{ color: "#ffffff" }}
            ></i>
            <span className="text" style={{ color: "#ffffff" }}>
              Add New Asset
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Form Section */}
        <div className="card shadow-sm p-4 mt-3">
          <h4 className="mb-3">Add Asset Details</h4>

          <form id="assetForm">
            <div className="mb-3">
              <label htmlFor="assetCategory" className="form-label">
                Select Asset Category:
              </label>
              <select id="assetCategory" className="form-select" required>
                <option value="">-- Select Category --</option>
                <option value="medical">Medical Equipment</option>
                <option value="furniture">Furniture</option>
                <option value="it equipment">IT Equipment</option>
                <option value="vehicles">Hospital Vehicles</option>
                <option value="others">Other Assets</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Asset ID</label>
              <input
                type="text"
                className="form-control"
                id="assetId"
                placeholder="Enter unique asset ID"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Asset Name</label>
              <input
                type="text"
                className="form-control"
                id="assetName"
                placeholder="Enter asset name"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""))
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Vendor</label>
              <input
                type="text"
                className="form-control"
                id="vendor"
                placeholder="Vendor"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                id="purchaseDate"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Warranty</label>
              <input
                type="text"
                className="form-control"
                id="warranty"
                placeholder="in months"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Condition</label>
              <select className="form-select" id="assetCondition">
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="repair">Needs Repair</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Remark</label>
              <textarea
                className="form-control"
                name="Remark"
                id="remark"
                placeholder="Remark"
              ></textarea>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                type="button"
                className="btn btn-success"
                id="addAssetBtn"
                style={{ backgroundColor: "#01C0C8", border: "none" }}
              >
                Add Asset
              </button>
            </div>
          </form>
        </div>

        <div className="text-end mt-3">
          <a href="/asset-list" className="btn btn-outline-primary">
            View All Assets
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
