import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createBirthCertificate,
  selectCreationStatus,
} from "../../../features/birthAndDethSlice";
import Swal from "sweetalert2";

const EditBirthCertificate = () => {
  const dispatch = useDispatch();
  const creationStatus = useSelector(selectCreationStatus);

  const handleGenerate = async (values, { resetForm }) => {
    const payload = {
      gender: values.gender.toUpperCase(),
      dateOfBirth: values.dob,
      timeOfBirth: values.time,
      birthWeight: parseFloat(values.weight) || null,
      birthLength: parseFloat(values.height) || null,
      headCircumference: null,
      placeOfBirth: values.place || values.hospitalName,
      attendingDoctor: values.doctor,
      timeOfIssue: values.issueDate,
      certificateNumber: values.certificateNo,
      motherName: values.mother,
      fatherName: values.father,
      contactNumber: values.mobile,
      email: "",
      motherPatientId: null,
    };

    try {
      await dispatch(createBirthCertificate(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Certificate Saved!",
        text: "The birth certificate has been successfully saved.",
        timer: 2000,
        showConfirmButton: false,
      });

      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  const initialValues = {
    hospitalName: "HarishChandra Hospital",
    certificateNo: "",
    childName: "",
    dob: "",
    time: "",
    weight: "",
    height: "",
    gender: "",
    place: "",
    father: "",
    mother: "",
    address: "",
    doctor: "",
    mobile: "",
    signatory: "",
    issueDate: "",
  };

  const validationSchema = Yup.object({
    hospitalName: Yup.string().required("Hospital name is required"),
    childName: Yup.string(),
    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    gender: Yup.string().required("Gender is required"),
    time: Yup.string()
      .required("Time of birth is required")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format"),
  });

  return (
    <div className="card full-width-card shadow-sm w-100 border-0">
      <div
        className="card-header text-white text-center"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <h3 className="mb-0">
          <i className="bi bi-heart-pulse me-2"></i>
          Baby Birth Certificate Form
        </h3>
      </div>

      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleGenerate(values, { resetForm })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form id="birthForm" autoComplete="off" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Hospital Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hospitalName"
                    value={values.hospitalName}
                    onChange={handleChange}
                  />
                  {touched.hospitalName && errors.hospitalName && (
                    <div className="text-danger small">
                      {errors.hospitalName}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mother’s Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mother"
                    value={values.mother}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="issueDate"
                    value={values.issueDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Date of Birth <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    value={values.dob}
                    onChange={handleChange}
                  />
                  {touched.dob && errors.dob && (
                    <div className="text-danger small">{errors.dob}</div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Time of Birth <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={values.time}
                    onChange={handleChange}
                  />
                  {touched.time && errors.time && (
                    <div className="text-danger small">{errors.time}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    value={values.weight}
                    onChange={handleChange}
                    placeholder="e.g., 3.2"
                    step="0.01"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Height (inch)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    value={values.height}
                    onChange={handleChange}
                    placeholder="e.g., 20"
                    step="0.1"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {touched.gender && errors.gender && (
                    <div className="text-danger small">{errors.gender}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Place of Birth (Hospital / Ward)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="place"
                    value={values.place}
                    onChange={handleChange}
                    placeholder="Enter place of birth"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Father’s Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="father"
                    value={values.father}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Attending Doctor / Midwife
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctor"
                    value={values.doctor}
                    onChange={handleChange}
                    placeholder="Enter doctor’s name"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#01C0C8", borderColor: "#01C0C8" }}
                  disabled={creationStatus === "loading"}
                >
                  {creationStatus === "loading" ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save-fill me-1"></i>
                      Save Certificate
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBirthCertificate;
