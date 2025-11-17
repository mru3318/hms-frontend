import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { addPrescription } from "../../../features/priscriptionSlice";
import { API_BASE_URL } from "../../../../config";

export default function AddNewPrescription() {
  // `${API_BASE_URL}/endpoint`
  const [selectedDept, setSelectedDept] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);
  const [departmentsError, setDepartmentsError] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctorsError, setDoctorsError] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const dispatch = useDispatch();
  // console.log("URL is :", API_BASE_URL);
  // Fetch departments on mount
  useEffect(() => {
    let mounted = true;
    const fetchDepartments = async () => {
      setDepartmentsLoading(true);
      setDepartmentsError(null);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/doctor-schedule/departments`
        );
        const data = res.data?.data ?? res.data;
        if (mounted) setDepartments(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted)
          setDepartmentsError(err?.message || "Failed to load departments");
      } finally {
        if (mounted) setDepartmentsLoading(false);
      }
    };
    fetchDepartments();
    return () => (mounted = false);
  }, []);

  const handleDeptChange = async (e) => {
    const deptId = e.target.value;
    setSelectedDept(deptId);
    setSelectedDoctorId("");
    if (!deptId) {
      setDoctors([]);
      return;
    }
    setDoctorsLoading(true);
    setDoctorsError(null);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/doctor-schedule/doctors/${deptId}`
      );
      const data = res.data?.data ?? res.data;
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      setDoctorsError(err?.message || "Failed to load doctors");
      setDoctors([]);
    } finally {
      setDoctorsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    // collect basic fields; use defaults for ids if not provided
    const fd = new FormData(form);
    const patientId = Number(fd.get("patientId")) || 1;
    const doctorId = Number(fd.get("doctorId")) || 1;
    const departmentId = Number(fd.get("departmentId")) || 1;
    const diagnosis = fd.get("diagnosis") || "";
    const symptoms = fd.get("symptoms") || "";
    const additionalNotes = fd.get("additionalNotes") || "";
    const prescriptionDate =
      fd.get("prescriptionDate") || new Date().toISOString().split("T")[0];

    // collect medicines from table rows
    const medicineRows = Array.from(form.querySelectorAll("tbody tr"));
    const medicines = medicineRows
      .map((row) => {
        const inputs = row.querySelectorAll("input");
        return {
          medicineName: inputs[0]?.value || "",
          frequency: inputs[1]?.value || "",
          duration: inputs[2]?.value || "",
        };
      })
      .filter((m) => m.medicineName || m.frequency || m.duration);

    const payload = {
      patientId,
      doctorId,
      departmentId,
      diagnosis,
      symptoms,
      additionalNotes,
      prescriptionDate,
      medicines,
    };

    // dispatch the thunk
    dispatch(addPrescription(payload))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Saved",
          text: "Prescription saved successfully",
          timer: 1600,
          showConfirmButton: false,
        });
        form.reset();
        setSelectedDept("");
        setDoctors([]);
      })
      .catch((err) => {
        console.error("Add prescription failed:", err);
        const msg =
          err?.message || JSON.stringify(err) || "Failed to save prescription";
        Swal.fire({ icon: "error", title: "Error", text: msg });
      });
  };

  const handleReset = () => {
    setSelectedDept("");
    setDoctors([]);
  };

  //changes by me here
  const [rows, setRows] = useState([
    { medicineName: "", frequency: "", duration: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { medicineName: "", frequency: "", duration: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="full-width-card card shadow border-0 rounded-3">
      {/* Header */}
      <div
        className=" text-white text-center py-3 rounded-top fw-semibold"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <i className="bi bi-file-medical-fill me-2"></i>Patient Prescription
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {/* Hidden default for patientId (replace with real selector if available) */}
          <input type="hidden" name="patientId" defaultValue="1" />
          {/* Department & Doctor */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Department <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                required
                name="departmentId"
                value={selectedDept}
                onChange={handleDeptChange}
                disabled={departmentsLoading}
              >
                <option value="">
                  {departmentsLoading
                    ? "Loading departments..."
                    : "Select Department"}
                </option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
              {departmentsError && (
                <div className="small text-danger mt-1">{departmentsError}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Doctor Name <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                required
                name="doctorId"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                disabled={doctorsLoading || !selectedDept}
              >
                <option value="">
                  {doctorsLoading ? "Loading doctors..." : "Select Doctor"}
                </option>
                {doctors.map((doc) => (
                  <option
                    key={doc.id || doc.doctorId}
                    value={doc.id || doc.doctorId}
                  >
                    {doc.name || doc.doctorName}
                  </option>
                ))}
              </select>
              {doctorsError && (
                <div className="small text-danger mt-1">{doctorsError}</div>
              )}
            </div>
          </div>
          {/* Patient Info */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Patient Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Gender</label>
              <select className="form-select">
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {/* Date */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="prescriptionDate"
                required
              />
            </div>
          </div>
          {/* Symptoms */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Symptoms <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              name="symptoms"
              rows="2"
              placeholder="Enter patient symptoms"
              required
            ></textarea>
          </div>
          {/* Diagnosis */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Diagnosis <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              name="diagnosis"
              rows="2"
              placeholder="Enter diagnosis details"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Prescription Details <span className="text-danger">*</span>
            </label>

            <table className="table table-bordered text-center align-middle">
              <thead className="table-info">
                <tr>
                  <th>Medicine Name</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Paracetamol"
                        value={row.medicineName}
                        onChange={(e) =>
                          handleChange(index, "medicineName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="2 times/day"
                        value={row.frequency}
                        onChange={(e) =>
                          handleChange(index, "frequency", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="5 days"
                        value={row.duration}
                        onChange={(e) =>
                          handleChange(index, "duration", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddRow}
            >
              <i className="bi bi-plus me-1"></i> Add Medicine
            </button>
          </div>
          {/* Notes */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Additional Notes</label>
            <textarea
              className="form-control"
              name="additionalNotes"
              rows="2"
              placeholder="Any additional advice..."
            ></textarea>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-center mt-4">
            <button type="reset" className="btn btn-secondary me-2">
              <i className="bi bi-arrow-left"></i> Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#01C0C8", color: "white" }}
            >
              <i className="bi bi-save me-1"></i> Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
