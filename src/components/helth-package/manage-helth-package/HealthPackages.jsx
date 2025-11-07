import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHealthPackages,
  deleteHealthPackage,
} from "../../../features/healthPackageSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const HealthPackages = () => {
  const dispatch = useDispatch();
  const {
    packages: healthPackages,
    status,
    error,
  } = useSelector((state) => state.healthPackages);

  // Fetch health packages from backend on component mount
  useEffect(() => {
    dispatch(fetchHealthPackages());
  }, [dispatch]);

  // Handle delete
  const handleDelete = async (pkg) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${pkg?.name}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteHealthPackage(pkg.id)).unwrap();

        await Swal.fire({
          title: "Deleted!",
          text: "Health package has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (err) {
        await Swal.fire({
          title: "Error!",
          text: err?.message || "Failed to delete health package",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const loading = status === "loading";

  // Ensure healthPackages is always an array
  const packagesList = Array.isArray(healthPackages) ? healthPackages : [];

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
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading health packages...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger my-3" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            Error: {error}
          </div>
        ) : packagesList.length === 0 ? (
          <div className="alert alert-info my-3" role="alert">
            <i className="fa-solid fa-info-circle me-2"></i>
            No health packages available.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-3">
            {packagesList.map((pkg, index) => (
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
                        <h2
                          className="accordion-header"
                          id={`heading-${index}`}
                        >
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
                          <div className="accordion-body">
                            {pkg.description}
                          </div>
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
        )}
      </div>
    </div>
  );
};

export default HealthPackages;
