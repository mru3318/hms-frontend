import React, { useEffect } from "react";

export default function DoctorScheduleList() {
  useEffect(() => {
    const searchInput = document.getElementById("searchInput");
    const departmentFilter = document.getElementById("departmentFilter");
    const tableBody = document.getElementById("tableBody");
    const countDisplay = document.getElementById("countDisplay");

    function filterTable() {
      const searchValue = searchInput.value.toLowerCase();
      const departmentValue = departmentFilter.value;
      const rows = tableBody.getElementsByTagName("tr");
      let count = 0;

      for (let row of rows) {
        const doctorName = row.cells[0].textContent.toLowerCase();
        const specialization = row.cells[1].textContent;

        const matchesSearch =
          doctorName.includes(searchValue) ||
          specialization.toLowerCase().includes(searchValue);
        const matchesDepartment =
          !departmentValue || specialization === departmentValue;

        if (matchesSearch && matchesDepartment) {
          row.style.display = "";
          count++;
        } else {
          row.style.display = "none";
        }
      }
      countDisplay.textContent = count;
    }

    searchInput.addEventListener("keyup", filterTable);
    departmentFilter.addEventListener("change", filterTable);

    // View Button
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const doctorName = row.cells[0].textContent;
        let schedules = [];

        if (doctorName === "Dr. Anita Sharma") {
          schedules = [
            {
              day: "Monday",
              availableFrom: "09:00 AM",
              availableTo: "12:00 PM",
              status: "Active",
            },
            {
              day: "Tuesday",
              availableFrom: "10:00 AM",
              availableTo: "01:00 PM",
              status: "Active",
            },
            {
              day: "Wednesday",
              availableFrom: "09:30 AM",
              availableTo: "12:30 PM",
              status: "Active",
            },
            {
              day: "Thursday",
              availableFrom: "11:00 AM",
              availableTo: "02:00 PM",
              status: "Inactive",
            },
            {
              day: "Friday",
              availableFrom: "09:00 AM",
              availableTo: "12:00 PM",
              status: "Active",
            },
            {
              day: "Saturday",
              availableFrom: "10:00 AM",
              availableTo: "01:00 PM",
              status: "Active",
            },
            {
              day: "Sunday",
              availableFrom: "Off",
              availableTo: "Off",
              status: "Inactive",
            },
          ];
        } else if (doctorName === "Dr. Rajiv Mehta") {
          schedules = [
            {
              day: "Monday",
              availableFrom: "02:00 PM",
              availableTo: "05:00 PM",
              status: "Inactive",
            },
            {
              day: "Tuesday",
              availableFrom: "03:00 PM",
              availableTo: "06:00 PM",
              status: "Active",
            },
            {
              day: "Wednesday",
              availableFrom: "02:00 PM",
              availableTo: "05:00 PM",
              status: "Active",
            },
            {
              day: "Thursday",
              availableFrom: "03:00 PM",
              availableTo: "06:00 PM",
              status: "Active",
            },
            {
              day: "Friday",
              availableFrom: "02:00 PM",
              availableTo: "05:00 PM",
              status: "Inactive",
            },
            {
              day: "Saturday",
              availableFrom: "03:00 PM",
              availableTo: "06:00 PM",
              status: "Active",
            },
            {
              day: "Sunday",
              availableFrom: "Off",
              availableTo: "Off",
              status: "Inactive",
            },
          ];
        } else if (doctorName === "Dr. Seema Patel") {
          schedules = [
            {
              day: "Monday",
              availableFrom: "11:00 AM",
              availableTo: "02:00 PM",
              status: "Active",
            },
            {
              day: "Tuesday",
              availableFrom: "Off",
              availableTo: "Off",
              status: "Inactive",
            },
            {
              day: "Wednesday",
              availableFrom: "11:00 AM",
              availableTo: "02:00 PM",
              status: "Active",
            },
            {
              day: "Thursday",
              availableFrom: "01:00 PM",
              availableTo: "04:00 PM",
              status: "Active",
            },
            {
              day: "Friday",
              availableFrom: "11:00 AM",
              availableTo: "02:00 PM",
              status: "Active",
            },
            {
              day: "Saturday",
              availableFrom: "01:00 PM",
              availableTo: "04:00 PM",
              status: "Active",
            },
            {
              day: "Sunday",
              availableFrom: "Off",
              availableTo: "Off",
              status: "Inactive",
            },
          ];
        }

        let content = `<h6>Schedules for ${doctorName}</h6>`;
        content += `<div class="table-responsive">
                      <table class="table table-bordered table-sm">
                        <thead class="table-secondary">
                          <tr>
                            <th>Day</th>
                            <th>Available From</th>
                            <th>Available To</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>`;
        schedules.forEach((s) => {
          content += `<tr>
                        <td>${s.day}</td>
                        <td>${s.availableFrom}</td>
                        <td>${s.availableTo}</td>
                        <td>${s.status}</td>
                      </tr>`;
        });
        content += `</tbody></table></div>`;

        const viewContentEl = document.getElementById("viewContent");
        const viewModalEl = document.getElementById("viewModal");
        if (viewContentEl && viewModalEl) {
          viewContentEl.innerHTML = content;

          // Create modal instance and show it. Keep a reference to hide/cleanup later.
          let modalInstance = null;
          try {
            if (
              window.bootstrap &&
              typeof window.bootstrap.Modal === "function"
            ) {
              modalInstance = new window.bootstrap.Modal(viewModalEl);
              modalInstance.show();
            } else {
              // Fallback: toggle classes manually (if bootstrap JS unavailable)
              viewModalEl.style.display = "block";
              viewModalEl.classList.add("show");
              document.body.classList.add("modal-open");
              const backdrop = document.createElement("div");
              backdrop.className = "modal-backdrop fade show";
              document.body.appendChild(backdrop);
            }
          } catch (err) {
            console.error("Error showing modal:", err);
          }

          // Ensure close button hides modal and cleans up content/backdrop
          const closeBtn = viewModalEl.querySelector(".btn-close");
          if (closeBtn) {
            closeBtn.onclick = () => {
              try {
                if (modalInstance) modalInstance.hide();
                else {
                  viewModalEl.style.display = "none";
                  viewModalEl.classList.remove("show");
                  document.body.classList.remove("modal-open");
                  document
                    .querySelectorAll(".modal-backdrop")
                    .forEach((b) => b.remove());
                }
              } catch (err) {
                console.error("Error hiding modal on close click:", err);
              }
              // clear content when closed
              if (viewContentEl) viewContentEl.innerHTML = "";
            };
          }

          // Cleanup when modal is fully hidden
          if (viewModalEl) {
            viewModalEl.addEventListener("hidden.bs.modal", () => {
              if (viewContentEl) viewContentEl.innerHTML = "";
              document
                .querySelectorAll(".modal-backdrop")
                .forEach((b) => b.remove());
            });
          }
        }
      })
    );

    // Delete Button
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        if (window.confirm("Are you sure you want to delete this schedule?")) {
          e.target.closest("tr").remove();
          filterTable();
        }
      })
    );

    // Edit Button
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        alert("Edit functionality can be linked to your form page.");
      })
    );
  }, []);

  return (
    <div className="full-width-card card shadow-lg border-0">
      {/* Header */}
      <div
        className="d-sm-flex align-items-center justify-content-between px-4 py-3 text-white"
        style={{
          backgroundColor: "#01c0c8",
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
        }}
      >
        <div className="d-flex align-items-center mx-auto">
          <i className="bi bi-calendar-check-fill fs-4 me-2"></i>
          <h5 className="mb-0">Doctor Schedule List</h5>
        </div>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        {/* Search + Department + Count Row */}
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Search doctor or specialization..."
              />
            </div>
          </div>

          <div className="col-md-3 mt-2 mt-md-0">
            <select
              id="departmentFilter"
              className="form-select form-select-sm"
            >
              <option value="">All Departments</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
            </select>
          </div>

          <div className="col-md-3 text-end mt-2 mt-md-0">
            <small className="text-muted">
              Showing <strong id="countDisplay">5</strong> results
            </small>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle" id="doctorTable">
            <thead>
              <tr className="text-muted small">
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Fees</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {[
                {
                  name: "Dr. Anita Sharma",
                  spec: "Pediatrician",
                  fee: "₹500",
                  active: true,
                },
                {
                  name: "Dr. Rajiv Mehta",
                  spec: "Cardiologist",
                  fee: "₹800",
                  active: false,
                },
                {
                  name: "Dr. Seema Patel",
                  spec: "Dermatologist",
                  fee: "₹600",
                  active: true,
                },
              ].map((doc, i) => (
                <tr key={i}>
                  <td>{doc.name}</td>
                  <td>{doc.spec}</td>
                  <td>{doc.fee}</td>
                  <td>
                    <select
                      className="form-select form-select-sm status"
                      defaultValue={doc.active ? "Active" : "Inactive"}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary view-btn">
                      <i className="bi bi-eye"></i>
                    </button>{" "}
                    <button
                      className="btn btn-sm text-white edit-btn"
                      style={{ backgroundColor: "#01C0C8" }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>{" "}
                    <button className="btn btn-sm btn-outline-danger delete-btn">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <div className="modal fade" id="viewModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#01C0C8" }}
            >
              <h5 className="modal-title text-white">Doctor Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body" id="viewContent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
