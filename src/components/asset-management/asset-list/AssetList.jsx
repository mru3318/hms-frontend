const AssetList = () => {
  // Example static data (replace later with API or state data)
  const assets = [
    {
      id: 1,
      category: "Medical Equipment",
      assetId: "MED-001",
      name: "X-Ray Machine",
      vendor: "Meditech Corp",
      purchaseDate: "2024-03-15",
      warrantyDate: "2026-03-15",
      condition: "New",
      remark: "Installed in Radiology",
    },
    {
      id: 2,
      category: "Furniture",
      assetId: "FUR-015",
      name: "Hospital Bed",
      vendor: "CareComfort",
      purchaseDate: "2023-11-20",
      warrantyDate: "2024-11-20",
      condition: "Used",
      remark: "Good condition",
    },
  ];

  return (
    <div className="container my-4 p-0 m-0">
      {/* Header */}
      <div className="card-border">
        <div className="card-header d-flex justify-content-center align-items-center text-center bg-primary">
          <i
            className="fa-solid fa-toolbox me-2"
            style={{ color: "#ffffff" }}
          ></i>
          <span className="text" style={{ color: "#ffffff" }}>
            Assets in Hospital
          </span>
        </div>
      </div>

      <div className="container">
        {/* Back Button */}
        <div className="text-end mb-3">
          <a href="/hospital-assets" className="btn  text-dark bg-secondary">
            ← Back to Form
          </a>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Vendor</th>
                <th>Purchase Date</th>
                <th>Warranty Date</th>
                <th>Condition</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assets.length > 0 ? (
                assets.map((asset, index) => (
                  <tr key={asset.id}>
                    <td>{index + 1}</td>
                    <td>{asset.category}</td>
                    <td>{asset.assetId}</td>
                    <td>{asset.name}</td>
                    <td>{asset.vendor}</td>
                    <td>{asset.purchaseDate}</td>
                    <td>{asset.warrantyDate}</td>
                    <td>{asset.condition}</td>
                    <td>{asset.remark}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" title="Delete">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline style adjustments for mobile */}
      <style>{`
        @media (max-width: 576px) {
          .card-header .text {
            font-size: 1rem;
          }
          .btn-outline-secondary {
            font-size: 0.8rem;
            padding: 4px 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default AssetList;
