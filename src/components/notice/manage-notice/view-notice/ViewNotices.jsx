import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotices,
  deleteNotice,
  selectNotices,
  selectNoticesFetchStatus,
  selectNoticesFetchError,
} from "../../../../features/noticeSlice";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const ViewNotices = () => {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const fetchStatus = useSelector(selectNoticesFetchStatus);
  const fetchError = useSelector(selectNoticesFetchError);

  useEffect(() => {
    if (fetchStatus === "idle") dispatch(fetchNotices());
  }, [dispatch, fetchStatus]);

  const handleDelete = (id) => {
    if (!id) return;
    Swal.fire({
      title: "Delete notice?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      dispatch(deleteNotice(id))
        .unwrap()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            timer: 1200,
            showConfirmButton: false,
          });
          // refresh list to ensure consistency
          dispatch(fetchNotices());
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          Swal.fire({
            icon: "error",
            title: "Delete failed",
            text: err?.message || "Could not delete notice",
          });
        });
    });
  };
  return (
    <div className="full-width-card card shadow-sm border-0">
      {/* Header */}
      <div
        className=" text-white text-center py-3"
        style={{
          backgroundColor: "#01C0C8",
          borderTopLeftRadius: "0.50rem",
          borderTopRightRadius: "0.50rem",
        }}
      >
        <h4 className="mb-0">
          <i className="bi bi-megaphone-fill me-2"></i>Notice List
        </h4>
      </div>

      <div className="card-body">
        {/* Alert Messages */}
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ display: "none" }}
        >
          Success message here.
        </div>
        <div
          className="alert alert-danger text-center"
          role="alert"
          style={{ display: "none" }}
        >
          Error message here.
        </div>

        {/* Table */}
        {fetchStatus === "loading" && (
          <div className="text-center small text-muted mb-2">
            Loading notices...
          </div>
        )}
        {fetchStatus === "failed" && (
          <div className="text-center small text-danger mb-2">
            {fetchError || "Failed to load notices"}
          </div>
        )}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle text-center mb-0">
            <thead style={{ backgroundColor: "#E0F7FA" }}>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Attachment</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(notices) && notices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted small">
                    No notices found
                  </td>
                </tr>
              )}

              {Array.isArray(notices) &&
                notices.map((n) => {
                  const title = n.noticeTitle || n.title || "-";
                  const desc = n.noticeDescription || n.description || "";
                  const start =
                    n.noticeStartDate || n.startDate || n.start || "";
                  const end = n.noticeEndDate || n.endDate || n.end || "";
                  // try several attachment fields
                  const attachmentUrl =
                    n.attachmentUrl ||
                    n.fileUrl ||
                    n.attachment ||
                    n.attachment_path ||
                    null;

                  // format for datetime-local input if possible
                  const toInputValue = (s) => {
                    if (!s) return "";
                    const d = new Date(s);
                    if (isNaN(d)) return String(s);
                    const iso = d.toISOString();
                    return iso.slice(0, 16);
                  };

                  return (
                    <tr key={n.id || n.noticeId || Math.random()}>
                      <td className="fw-semibold">{title}</td>
                      <td>
                        <div
                          className="small text-muted"
                          dangerouslySetInnerHTML={{ __html: desc }}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          className="form-control form-control-sm text-center"
                          value={toInputValue(start)}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          className="form-control form-control-sm text-center"
                          value={toInputValue(end)}
                          readOnly
                        />
                      </td>
                      <td>
                        {attachmentUrl ? (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm w-100 text-white"
                            style={{ backgroundColor: "#01C0C8" }}
                          >
                            Download
                          </a>
                        ) : (
                          <span className="small text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <NavLink
                            to={`/dashboard/edit-notice/${n.id || n.noticeId}`}
                            className="btn btn-sm text-white px-3"
                            style={{ backgroundColor: "#01C0C8" }}
                          >
                            Edit
                          </NavLink>
                          <button
                            className="btn btn-danger btn-sm px-3"
                            onClick={() => handleDelete(n.id || n.noticeId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewNotices;
