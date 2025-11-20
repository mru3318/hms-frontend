import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPatients,
  selectDepartments,
} from "../../../features/commanSlice";
import {
  createAppointment,
  updateAppointment,
} from "../../../features/appointmentSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPatientAppointment() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const appointmentId = params?.id || null;

  // Read from Redux only
  const patients = useSelector(selectPatients);
  const storeDepartments = useSelector(selectDepartments);

  const [selectedPatientHospitalId, setSelectedPatientHospitalId] =
    useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [patientQuery, setPatientQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [status, setStatus] = useState("SCHEDULED");

  // store departments into local state
  useEffect(() => {
    setDepartments(Array.isArray(storeDepartments) ? storeDepartments : []);
  }, [storeDepartments]);

  // autofill patient info
  useEffect(() => {
    if (!selectedPatientHospitalId) return;

    const p = patients.find(
      (x) => String(x.patient_hospital_id) === String(selectedPatientHospitalId)
    );

    if (p) {
      setAge(p.age ?? "");
      setGender(p.gender ?? "");
      setPhone(p.contactInfo ?? p.emergencyContact ?? "");
      const addr = p.address
        ? `${p.address.addressLine || ""}, ${p.address.city || ""}, ${
            p.address.state || ""
          } ${p.address.pincode || ""}`
        : "";
      setAddress(addr);
    } else {
      setAge("");
      setGender("");
      setPhone("");
      setAddress("");
    }
  }, [selectedPatientHospitalId, patients]);

  // submit appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patient = (patients || []).find(
      (p) =>
        String(p.patient_hospital_id) === String(selectedPatientHospitalId) ||
        String(p.id) === String(selectedPatientHospitalId)
    );

    const patientId = patient?.id;
    if (!patientId) {
      Swal.fire({
        icon: "error",
        title: "No patient",
        text: "Please select a patient",
      });
      return;
    }

    // doctor id resolution
    let doctorId = null;
    if (selectedDoctorId) {
      const asNum = Number(selectedDoctorId);
      if (!Number.isNaN(asNum)) {
        doctorId = asNum;
      }
    }

    if (!doctorId) {
      Swal.fire({
        icon: "error",
        title: "Doctor required",
        text: "Please select a valid doctor.",
      });
      return;
    }

    const payload = {
      patientId,
      doctorId,
      departmentId: Number(selectedDepartmentId) || null,
      appointmentDate,
      appointmentTime,
      status,
      symptoms,
    };

    // delegate snake_case conversion to thunks if used; keep for backwards compatibility
    payload.patient_id = payload.patientId;
    payload.doctor_id = payload.doctorId;
    payload.department_id = payload.departmentId;

    try {
      if (appointmentId) {
        // Edit existing appointment via Redux thunk
        await dispatch(
          updateAppointment({ id: appointmentId, data: payload })
        ).unwrap();
        Swal.fire({ icon: "success", title: "Appointment updated" });
        navigate("/dashboard/view-appointments");
      } else {
        await dispatch(createAppointment(payload)).unwrap();
        Swal.fire({ icon: "success", title: "Appointment created" });

        // Reset
        setSelectedPatientHospitalId("");
        setPatientQuery("");
        setAge("");
        setGender("");
        setPhone("");
        setAddress("");
        setSelectedDepartmentId("");
        setDoctors([]);
        setSelectedDoctorId("");
        setAppointmentDate("");
        setAppointmentTime("");
        setSymptoms("");
        setStatus("SCHEDULED");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.message || JSON.stringify(err),
      });
    }
  };

  // If editing an appointment, fetch its data and populate the form
  useEffect(() => {
    if (!appointmentId) return;

    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/appointment/${appointmentId}`
        );
        const data = res.data || {};
        if (!mounted) return;

        // Map backend fields to our form
        const pid = data.patient_id ?? data.patientId ?? data.patient?.id;
        const doctor = data.doctor_id ?? data.doctorId ?? data.doctor?.id;
        const dept =
          data.department_id ?? data.departmentId ?? data.department?.id;

        // Use patient's hospital id for selection if available
        const patientHospitalId =
          data.patient_hospital_id ?? data.patient?.patient_hospital_id ?? pid;
        setSelectedPatientHospitalId(patientHospitalId || "");
        if (data.patient) {
          const name = `${
            data.patient.firstName || data.patient.first_name || ""
          } ${data.patient.lastName || data.patient.last_name || ""}`.trim();
          setPatientQuery(
            name
              ? `${name} (${
                  data.patient.patient_hospital_id ||
                  data.patient_hospital_id ||
                  ""
                })`
              : ""
          );
        }

        setSelectedDepartmentId(dept || "");
        setSelectedDoctorId(doctor || "");
        setAppointmentDate(data.appointmentDate ?? data.appointment_date ?? "");
        setAppointmentTime(data.appointmentTime ?? data.appointment_time ?? "");
        setSymptoms(data.symptoms ?? "");
        setStatus(data.status ?? "SCHEDULED");

        // load doctors for department if present
        if (dept) {
          try {
            const dr = await axios.get(`${API_BASE_URL}/doctor/${dept}`);
            if (mounted) setDoctors(dr.data || []);
          } catch {
            // ignore
          }
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to load appointment",
          text: err?.message || "",
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [appointmentId]);

  return (
    <div className="full-width-card card shadow border-0">
      {/* Header */}
      <div
        className="text-center text-white fw-bold py-3"
        style={{
          backgroundColor: "#01c0c8",
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
        }}
      >
        <i className="bi bi-calendar2-check me-2"></i>
        Patient Appointment Form
      </div>

      {/* Body */}
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Patient Search */}
            <div className="col-md-6 position-relative">
              <label className="form-label fw-bold">Search Patient</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or hospital id"
                value={patientQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setPatientQuery(q);
                  if (!q) return setSuggestions([]);
                  const low = q.toLowerCase();
                  const list = (patients || []).filter((p) => {
                    const full = `${p.firstName || ""} ${
                      p.lastName || ""
                    }`.toLowerCase();
                    const hid = String(
                      p.patient_hospital_id || ""
                    ).toLowerCase();
                    return full.includes(low) || hid.includes(low);
                  });
                  setSuggestions(list.slice(0, 8));
                }}
              />

              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ zIndex: 2100, maxHeight: 200, overflowY: "auto" }}
                >
                  {suggestions.map((p) => (
                    <li
                      key={p.patient_hospital_id || p.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setSelectedPatientHospitalId(
                          p.patient_hospital_id || p.id
                        );
                        setPatientQuery(
                          `${p.firstName} ${p.lastName} (${p.patient_hospital_id})`
                        );
                        setSuggestions([]);
                      }}
                    >
                      <div className="fw-semibold">
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="small text-muted">
                        {p.patient_hospital_id}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Age */}
            <div className="col-md-3">
              <label className="form-label fw-bold">Age</label>
              <input
                type="number"
                className="form-control"
                value={age}
                readOnly
              />
            </div>

            {/* Gender */}
            <div className="col-md-3">
              <label className="form-label fw-bold">Gender</label>
              <input
                type="text"
                className="form-control"
                value={gender}
                readOnly
              />
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                readOnly
              />
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                readOnly
              />
            </div>

            {/* Symptoms */}
            <div className="col-md-12">
              <label className="form-label fw-bold">Symptoms / Problem</label>
              <textarea
                className="form-control"
                rows="3"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            {/* Departments */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Department</label>
              <select
                className="form-select"
                value={selectedDepartmentId}
                onChange={async (e) => {
                  const id = e.target.value;
                  setSelectedDepartmentId(id);
                  setSelectedDoctorId("");
                  setDoctors([]);

                  if (!id) return;

                  try {
                    const res = await axios.get(`${API_BASE_URL}/doctor/${id}`);
                    setDoctors(res.data || []);
                  } catch (err) {
                    Swal.fire({
                      icon: "error",
                      title: "Failed to load doctors",
                      text: err?.message || "",
                    });
                  }
                }}
              >
                <option value="">-- Select department --</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.department_name || d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctors */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Select Doctor</label>
              <select
                className="form-select"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
              >
                <option value="">-- Select doctor --</option>
                {doctors.length === 0 && (
                  <option disabled>No doctors available</option>
                )}
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name || doc.doctorName}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment date */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Time</label>
              <input
                type="time"
                className="form-control"
                required
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn text-white fw-bold px-4"
              style={{ background: "#01c0c8" }}
            >
              <i className="bi bi-save me-1"></i> Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
