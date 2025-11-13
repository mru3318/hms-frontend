import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AddDoctor from "./components/add-doctor/AddDoctor";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import ManageEmployee from "./components/human-resorces/manage-employee/ManageEmployee";
import AmbulanceAdd from "./components/ambulance/ambulance-add/AmbulanceAdd";
import AmbulanceAssignment from "./components/ambulance/ambulance-assignment/AmbulanceAssignment";
import AmbulanceDashboard from "./components/ambulance/ambulance-dashboard/AmbulanceDashboard";
import AddDriver from "./components/ambulance/add-driver/AddDriver";
import BedList from "./components/bed-manager/bed-list/BedList";
import BedAssign from "./components/bed-manager/bed-assign/BedAssign";
import AllottedBeds from "./components/bed-manager/alloted-beds/AllottedBeds";
import AddBeds from "./components/bed-manager/add-beds/AddBeds";
import AddRoom from "./components/bed-manager/add-room/AddRoom";
import LoginPage from "./components/auth/login/LoginPage";
import ForgotPassword from "./components/auth/forgot-password/ForgotPassword";
import ViewNotices from "./components/notice/manage-notice/view-notice/ViewNotices";
import CreateNotice from "./components/notice/manage-notice/add-new-notice/CreateNotice";
import EmployeeRegistration from "./components/human-resorces/add-new-employee/EmployeeRegistration";
import ManageDepartment from "./components/department/ManageDepartment";
import UpdateDepartment from "./components/department/UpdateDepartment";
import AddDepartment from "./components/department/AddDepartment";
import AddAsset from "./components/asset-management/add-asset/AddAsset";
import AssetList from "./components/asset-management/asset-list/AssetList";
import AddHealthPackage from "./components/helth-package/add-helth-package/AddHealthPackage";
import HealthPackages from "./components/helth-package/manage-helth-package/HealthPackages";
import UpdateHelthPackage from "./components/helth-package/update-package/UpdateHelthPackage";
import UpdateAsset from "./components/asset-management/update-asset/UpdateAsset";
import AddNewDonor from "./components/blood-bank/add-new-donor/AddNewDonor";
import ManageDonor from "./components/blood-bank/manage-donor/ManageDonor";
import AddBloodStock from "./components/blood-bank/add-stock/AddBloodStock";
import BloodStock from "./components/blood-bank/blood-stock/BloodStock";
import AddDonor from "./components/blood-bank/add-donor/AddDonor";
import BabyBirthCertificate from "./components/reports/baby-birth-certificate/BabyBirthCertificate";
import DeathCertificateForm from "./components/reports/deth-certificate/DeathCertificateForm";
import ManageBirthCertificates from "./components/reports/manage-birth-certificates/ManageBirthCertificates";
import EditBirthCertificate from "./components/reports/edit-birth-certificate/EditBirthCertificate";
import AddDoctorSchedule from "./components/doctor-schedule/add-schedule/AddDoctorSchedule";
import ManageDethCertificates from "./components/reports/manage-deth-certificates/ManageDethCertificates";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "registration",
      element: <EmployeeRegistration />,
    },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "add-doctor",
          element: <AddDoctor />,
        },
        {
          path: "add-new-employee",
          element: <EmployeeRegistration />,
        },

        {
          path: "manage-employees",
          element: <ManageEmployee />,
        },

        // Ambulance Routes
        {
          path: "ambulance-add",
          element: <AmbulanceAdd />,
        },
        {
          path: "ambulance-assignment",
          element: <AmbulanceAssignment />,
        },
        {
          path: "ambulance-dashboard",
          element: <AmbulanceDashboard />,
        },
        {
          path: "add-driver",
          element: <AddDriver />,
        },

        // Bed Manager Routes
        {
          path: "bed-list",
          element: <BedList />,
        },
        {
          path: "bed-assign",
          element: <BedAssign />,
        },
        {
          path: "allotted-beds",
          element: <AllottedBeds />,
        },
        {
          path: "add-beds",
          element: <AddBeds />,
        },
        {
          path: "add-room",
          element: <AddRoom />,
        },

        // Notice Management Routes
        {
          path: "manage-notices",
          element: <ViewNotices />,
        },
        {
          path: "add-new-notice",
          element: <CreateNotice />,
        },

        //Department Routes
        {
          path: "manage-department",
          element: <ManageDepartment />,
        },
        {
          path: "update-department/:id",
          element: <UpdateDepartment />,
        },
        {
          path: "add-department",
          element: <AddDepartment />,
        },

        // Asset Management Routes
        {
          path: "add-asset",
          element: <AddAsset />,
        },
        {
          path: "asset-list",
          element: <AssetList />,
        },
        {
          path: "update-asset/:id",
          element: <UpdateAsset />,
        },

        //Helth Package Routes
        {
          path: "add-health-package",
          element: <AddHealthPackage />,
        },
        {
          path: "manage-health-packages",
          element: <HealthPackages />,
        },
        {
          path: "update-health-package/:id",
          element: <UpdateHelthPackage />,
        },

        // Donor Management Routes
        {
          path: "add-new-donor",
          element: <AddNewDonor />,
        },
        {
          path: "manage-donors",
          element: <ManageDonor />,
        },
        {
          path: "add-stock",
          element: <AddBloodStock />,
        },
        {
          path: "blood-stock",
          element: <BloodStock />,
        },
        {
          path: "add-donor",
          element: <AddDonor />,
        },

        //reports routes here
        {
          path: "baby-birth-certificate",
          element: <BabyBirthCertificate />,
        },
        {
          path: "death-certificate",
          element: <DeathCertificateForm />,
        },
        {
          path: "manage-birth-certificates",
          element: <ManageBirthCertificates />,
        },
        {
          path: "edit-birth-certificate/:id",
          element: <EditBirthCertificate />,
        },

        // Add Doctors Schedule
        {
          path: "add-doctor-schedule",
          element: <AddDoctorSchedule />,
        },
        {
          path: "manage-death-certificates",
          element: <ManageDethCertificates />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
