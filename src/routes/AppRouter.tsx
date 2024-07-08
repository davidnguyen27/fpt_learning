import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import DetailCoursePage from "../pages/User/detailCoursePage";
import HelpPage from "../pages/User/HelpPage";
import AdminPage from "../pages/Admin/AdminPage";
import SignInPage from "../pages/User/SignInPage";
import SignUpPage from "../pages/User/SignUpPage";
import { AuthContext, AuthProvider } from "../app/context/AuthContext";
import { useContext } from "react";
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
import SettingsPage from "../pages/User/SettingPage";
import CoursesCheckPage from "../pages/Admin/CoursesCheckPage";
import CoursesManagePage from "../pages/Instructor/CoursesManagePage";
import CreateCoursePage from "../pages/Instructor/CreateCoursePage";
import LessonManagePage from "../pages/Instructor/LessonManagePage";
import SessionManagePage from "../pages/Instructor/SessionManagePage";
import EarningPage from "../pages/Instructor/EarningPage";
import StudentCourseListPage from "../pages/Student/StudentCourseListPage";
import StudentSettingPage from "../pages/Student/StudentSettingPage";
import ReviewManagePage from "../pages/Instructor/ReviewManagePage";
import PayoutManagePage from "../pages/Instructor/PayoutManagePage";
import AboutPage from "../pages/User/AboutPage";
import PasswordReset from "../pages/User/ForgotPassword";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const storedUser: any = sessionStorage.getItem("user");
  if (!storedUser) {
    throw new Error("Không tìm thấy người dùng trong sessionStorage");
  }
  const user = JSON.parse(storedUser);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.data.role)) {
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="/detail" element={<DetailCoursePage />} />
          <Route path="/report-page" element={<ReportPage />} />
          <Route path="/help-page" element={<HelpPage />} />
          <Route path="/settings-page" element={<SettingsPage />} />
          <Route path="/forgot-password" element={<PasswordReset />} />

          {/* Student */}
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
          <Route
            path="/student-course-list-page"
            element={
              <ProtectedRoute
                element={<StudentCourseListPage />}
                allowedRoles={["student"]}
              />
            }
          />
          <Route
            path="/student-setting-page"
            element={
              <ProtectedRoute
                element={<StudentSettingPage />}
                allowedRoles={["student"]}
              />
            }
          />

          {/* --- */}

          {/* Admin  */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                element={<AdminPage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin-profile-page/"
            element={
              <ProtectedRoute
                element={<ProfilePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/users-management"
            element={
              <ProtectedRoute
                element={<UserManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/categories-management"
            element={
              <ProtectedRoute
                element={<CategoriesManagePage />}
                allowedRoles={["admin"]}
              />
            }
          />
          {/* <Route
            path="/admin/feedbacks-management"
            element={
              <ProtectedRoute
                element={<FeedBackManagePage />}
                allowedRoles={["admin"]}
              />
            }
          /> */}
          {/* <Route
            path="/admin/reports-management"
            element={
              <ProtectedRoute
                element={<ReportManagePage />}
                allowedRoles={["admin"]}
              />
            }
          /> */}
          {/* <Route
            path="/admin/blogs-management"
            element={
              <ProtectedRoute
                element={<BlogManagePage />}
                allowedRoles={["admin"]}
              />
            }
          /> */}
          <Route
            path="/admin/courses-check"
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
            path="/instructor/dashboard"
            element={
              <ProtectedRoute
                element={<InstructorPage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/courses-management"
            element={
              <ProtectedRoute
                element={<CoursesManagePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/lessons-management"
            element={
              <ProtectedRoute
                element={<LessonManagePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/sessions-management"
            element={
              <ProtectedRoute
                element={<SessionManagePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/courses-management/create-course-step"
            element={
              <ProtectedRoute
                element={<CreateCoursePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/reviews-management"
            element={
              <ProtectedRoute
                element={<ReviewManagePage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/earning-management"
            element={
              <ProtectedRoute
                element={<EarningPage />}
                allowedRoles={["instructor"]}
              />
            }
          />
          <Route
            path="/instructor/payout"
            element={
              <ProtectedRoute
                element={<PayoutManagePage />}
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
