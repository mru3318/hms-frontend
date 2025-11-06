import React, { useState } from "react";

const HealthPackages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Example package data
  const healthPackages = [
    {
      id: 1,
      name: "Heart Checkup",
      code: "H001",
      image: "image/heart.png",
      price: "₹1999",
      description:
        "A complete cardiac health screening including ECG, cholesterol, and blood pressure evaluation.",
    },
    {
      id: 2,
      name: "Kidney Care",
      code: "H002",
      image: "image/kidney.png",
      price: "₹1499",
      description:
        "Includes tests to evaluate kidney function and detect early signs of kidney disease.",
    },
    {
      id: 3,
      name: "Liver Health",
      code: "H003",
      image: "image/liver.png",
      price: "₹1799",
      description:
        "Comprehensive liver profile to assess enzyme levels and liver functionality.",
    },
    {
      id: 4,
      name: "Brain Scan",
      code: "H004",
      image: "image/brain.png",
      price: "₹2499",
      description:
        "Neurological health screening to detect abnormalities and assess brain health.",
    },
    {
      id: 5,
      name: "Orthopedic Package",
      code: "H005",
      image: "image/orthopedic.png",
      price: "₹1399",
      description:
        "Bone density test and joint assessment for musculoskeletal wellness.",
    },
    {
      id: 6,
      name: "Pancreas Screening",
      code: "H006",
      image: "image/pancreas.png",
      price: "₹1699",
      description:
        "Tests to evaluate pancreatic enzymes and overall digestive health.",
    },
  ];

  // Handle delete
  const handleDelete = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const confirmDelete = () => {
    alert(`Deleted ${selectedPackage?.name} successfully!`);
    setShowModal(false);
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

      {/* Packages Grid */}
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-3">
          {healthPackages.map((pkg, index) => (
            <div className="col" key={pkg.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="card-title d-flex justify-content-between align-items-center">
                    <span className="name fw-semibold">{pkg.name}</span>
                    <img
                      className="image"
                      src={pkg.image}
                      alt={pkg.name}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>

                  <h6 className="card-subtitle mb-2 text-muted">
                    Code: {pkg.code}
                  </h6>

                  {/* Accordion */}
                  <div className="accordion mb-3" id={`accordion-${index}`}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading-${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${index}`}
                        >
                          Description
                        </button>
                      </h2>
                      <div
                        id={`collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${index}`}
                        data-bs-parent={`#accordion-${index}`}
                      >
                        <div className="accordion-body">{pkg.description}</div>
                      </div>
                    </div>
                  </div>

                  <p className="card-text fw-semibold">Price: {pkg.price}</p>
                  <button className="btn btn-primary me-2">
                    <i className="fa-solid fa-pen-to-square me-1"></i>Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pkg)}
                  >
                    <i className="fa-solid fa-trash-can me-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthPackages;
