import React, { useState } from "react";

export default function CreateNotice() {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview({ type: "image", src: event.target.result });
        setFileName("");
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Notice Saved Successfully!");
  };

  return (
    <div className="full-width-card card shadow border-0">
      {/* Header */}
      <div
        className="card-header text-white text-center py-3"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <h4 className="mb-0">
          <i className="bi bi-megaphone-fill me-2"></i>
          Create New Notice
        </h4>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Notice Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="noticeTitle"
                className="form-control"
                placeholder="Enter notice title"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="startDate" className="form-label fw-semibold">
                Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="noticeStartDate"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="endDate" className="form-label fw-semibold">
                End Date <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="noticeEndDate"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Target Audience <span className="text-danger">*</span>
              </label>

              <div className="btn-group d-flex flex-wrap gap-2">
                {[
                  { id: 3, role: "DOCTOR" },
                  { id: 4, role: "HEADNURSE" },
                  { id: 5, role: "PHARMACIST" },
                  { id: 6, role: "ACCOUNTANT" },
                  { id: 7, role: "HR" },
                  { id: 8, role: "LABORATORIST" },
                  { id: 9, role: "INSURANCE" },
                  { id: 10, role: "RECEPTIONIST" },
                ].map(({ id, role }) => (
                  <React.Fragment key={id}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`role-${id}`}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-info"
                      htmlFor={`role-${id}`}
                    >
                      {role}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="description"
              name="noticeDescription"
              className="form-control"
              rows="6"
              placeholder="Enter notice details here..."
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="attachment" className="form-label fw-semibold">
              Attachment
            </label>
            <input
              type="file"
              id="attachment"
              className="form-control"
              accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
              onChange={handleFileChange}
            />

            {/* Preview Section */}
            {(filePreview || fileName) && (
              <div className="mt-3">
                <p className="text-muted mb-2">
                  <strong>File Preview:</strong>
                </p>
                {filePreview && filePreview.type === "image" ? (
                  <img
                    src={filePreview.src}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "300px", maxHeight: "200px" }}
                  />
                ) : (
                  <div className="p-2 bg-light rounded">
                    <i className="bi bi-file-earmark-text"></i> {fileName}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="submit"
              className="btn text-white px-4"
              style={{ backgroundColor: "#01C0C8" }}
            >
              <i className="bi bi-save me-2"></i>Save Notice
            </button>
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-arrow-left me-2"></i>Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
