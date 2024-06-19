import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import DetailCoursePage from "../pages/User/detailCoursePage";
import HelpPage from "../pages/User/HelpPage";
import AdminPage from "../pages/Admin/AdminPage";
import SignInPage from "../pages/User/SignInPage";
import SignUpPage from "../pages/User/SignUpPage";
import { AuthContext, AuthProvider } from "../app/context/AuthContext";
import { useContext } from "react";
import StudentPage from "../pages/User/StudentPage";
import CategoriesManagePage from "../pages/Admin/CategoriesManagePage";
import StudentProfilePage from "../pages/Student/StudentProfilePage";
import StudentCourseDetailPage from "../pages/Student/StudentCourseDetailPage";
import ReportPage from "../pages/User/ReportPage";
import Cart from "../pages/User/Cart";
import CheckOut from "../pages/User/CheckOut";
import PaidMembershipPage from "../pages/User/PaidMembership";
import ProfilePage from "../pages/Admin/ProfilePage";
import InstructorPage from "../pages/Instructor/InstructorPage";
import UserManagePage from "../pages/Admin/UserManagePage";
import FeedBackManagePage from "../pages/Admin/FeedBackManagePage";
import ReportManagePage from "../pages/Admin/ReportManagePage";
import BlogManagePage from "../pages/Admin/BlogManagePage";
import SettingsPage from "../pages/User/SettingPage";
import CoursesCheckPage from "../pages/Admin/CoursesCheckPage";
import CoursesManagePage from "../pages/Instructor/CoursesManagePage";
import CreateCoursePage from "../pages/Instructor/CreateCoursePage";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="/detail" element={<DetailCoursePage />} />
          <Route path="/report-page" element={<ReportPage />} />
          <Route path="/help-page" element={<HelpPage />} />
          <Route path="/settings-page" element={<SettingsPage />} />

          {/* Student */}
          <Route path="/student-management" element={<StudentPage />} />
          <Route
            path="/view-detail"
            element={
              <ProtectedRoute
                element={<StudentCourseDetailPage />}
                allowedRoles={["student"]}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute element={<Cart />} allowedRoles={["student"]} />
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute
                element={<CheckOut />}
                allowedRoles={["student"]}
              />
            }
          />
          <Route
            path="/paid-membership"
            element={
              <ProtectedRoute
                element={<PaidMembershipPage />}
                allowedRoles={["student"]}
              />
            }
          />
          <Route
            path="/student-profile-page"
            element={
              <ProtectedRoute
                element={<StudentProfilePage />}
                allowedRoles={["student"]}
              />
            }
          />
          {/* --- */}

          {/* Admin  */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                element={<AdminPage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin-profile-page"
            element={
              <ProtectedRoute
                element={<ProfilePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/users-management"
            element={
              <ProtectedRoute
                element={<UserManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/categories-management"
            element={
              <ProtectedRoute
                element={<CategoriesManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/feedbacks-management"
            element={
              <ProtectedRoute
                element={<FeedBackManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/reports-management"
            element={
              <ProtectedRoute
                element={<ReportManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/blogs-management"
            element={
              <ProtectedRoute
                element={<BlogManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/courses-check"
            element={
              <ProtectedRoute
                element={<CoursesCheckPage />}
                allowedRoles={["admin"]}
              />
            }
          />
          {/* --- */}

          {/* Instructor */}
          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoute
                element={<InstructorPage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/courses-management"
            element={
              <ProtectedRoute
                element={<CoursesManagePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute
                element={<CreateCoursePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
