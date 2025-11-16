import React, { useState, useEffect } from "react";
import "./AddDriver.css";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    driverName: "",
    licenseNumber: "",
    contactNumber: "",
    ambulanceId: "",
  });

  const [ambulances, setAmbulances] = useState([]);
  const [loadingAmbulances, setLoadingAmbulances] = useState(true);
  const [ambulancesError, setAmbulancesError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchAmbulances = async () => {
      try {
        setLoadingAmbulances(true);
        setAmbulancesError(null);
        const res = await fetch(`http://localhost:8080/api/ambulance/list`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (mounted) setAmbulances(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted)
          setAmbulancesError(err.message || "Failed to load ambulances");
      } finally {
        if (mounted) setLoadingAmbulances(false);
      }
    };
    fetchAmbulances();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAmbulancesError(null);

    // basic validation
    if (
      !formData.driverName ||
      !formData.licenseNumber ||
      !formData.contactNumber
    ) {
      alert("Fill all required fields.");
      setSubmitting(false);
      return;
    }

    if (!formData.ambulanceId) {
      alert("Please select a valid ambulance.");
      setSubmitting(false);
      return;
    }

    const ambulanceId = Number(formData.ambulanceId);
    if (Number.isNaN(ambulanceId)) {
      alert("Please select a valid ambulance.");
      setSubmitting(false);
      return;
    }

    const payload1 = {
      driverName: formData.driverName,
      licenseNumber: formData.licenseNumber,
      contactNumber: formData.contactNumber,
      ambulanceId: ambulanceId,
    };

    console.log("Submitting driver payload (attempt 1):", payload1);

    try {
      let res = await fetch(`http://localhost:8080/api/driver/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload1),
      });

      if (res.ok) {
        alert("Driver added successfully!");
        setFormData({
          driverName: "",
          licenseNumber: "",
          contactNumber: "",
          ambulanceId: "",
        });
        setSubmitting(false);
        return;
      }

      const text = await res.text();
      console.warn("Driver add failed (attempt 1):", res.status, text);

      // if backend complains id null, try nested ambulance object
      const shouldRetryWithObject =
        /id must not be null|given id must not be null|must not be null/i.test(
          text
        );
      if (shouldRetryWithObject) {
        const payload2 = {
          driverName: formData.driverName,
          licenseNumber: formData.licenseNumber,
          contactNumber: formData.contactNumber,
          ambulance: { id: ambulanceId },
        };
        console.log("Retrying with payload (attempt 2):", payload2);

        res = await fetch(`http://localhost:8080/api/driver/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload2),
        });

        if (res.ok) {
          alert("Driver added successfully (with nested ambulance)!");
          setFormData({
            driverName: "",
            licenseNumber: "",
            contactNumber: "",
            ambulanceId: "",
          });
          setSubmitting(false);
          return;
        }

        const text2 = await res.text();
        throw new Error(text2 || `${res.status} ${res.statusText}`);
      }

      throw new Error(text || `${res.status} ${res.statusText}`);
    } catch (err) {
      console.error("Add driver failed:", err);
      alert("Failed to add driver: " + (err.message || "unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid my-4 p-0 m-0">
      {/* Header */}
      <div className="card-border">
        <div className="card-header d-flex justify-content-center align-items-center bg-info text-white rounded-top">
          <div className="text-center d-flex align-items-center">
            <i className="fa-solid fa-truck-medical me-2"></i>
            <span className="fs-5 fw-semibold">Add Driver</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className=" p-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          {/* Driver Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="driverName" className="form-label">
              Driver Name
            </label>
            <input
              type="text"
              className="form-control"
              id="driverName"
              placeholder="Enter name"
              value={formData.driverName}
              onChange={handleChange}
              required
            />
          </div>

          {/* License Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="licenseNumber" className="form-label">
              Driver License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="licenseNumber"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          {/* Contact Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact No.
            </label>
            <input
              type="number"
              className="form-control"
              id="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ambulance Dropdown */}
          <div className="col-md-6 mb-3">
            <label htmlFor="ambulanceType" className="form-label">
              Ambulance
            </label>
            <select
              id="ambulanceId"
              className="form-select"
              value={formData.ambulanceId}
              onChange={handleChange}
              required
              disabled={loadingAmbulances || submitting}
            >
              <option value="">
                {loadingAmbulances
                  ? "Loading ambulances..."
                  : "Choose Ambulance"}
              </option>

              {ambulances &&
                ambulances.map((a) => (
                  <option key={a.ambulanceId} value={a.ambulanceId}>
                    {a.vehicleNumber}
                  </option>
                ))}
            </select>

            {ambulancesError && (
              <div className="text-danger small mt-1">{ambulancesError}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
