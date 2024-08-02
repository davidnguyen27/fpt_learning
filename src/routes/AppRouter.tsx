import React, { Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../app/context/AuthContext";

//-----------------------------------------------USER------------------------------------------------
const HomePage = React.lazy(() => import("../pages/User/HomePage"));
const DetailCoursePage = React.lazy(
  () => import("../pages/User/detailCoursePage"),
);
const HelpPage = React.lazy(() => import("../pages/User/HelpPage"));
const SignInPage = React.lazy(() => import("../pages/User/SignInPage"));
const SignUpPage = React.lazy(() => import("../pages/User/SignUpPage"));
const ReportPage = React.lazy(() => import("../pages/User/ReportPage"));
const Cart = React.lazy(() => import("../pages/User/Cart"));
const CheckOut = React.lazy(() => import("../pages/User/CheckOut"));
const PaidMembershipPage = React.lazy(
  () => import("../pages/User/PaidMembership"),
);
const SettingsPage = React.lazy(() => import("../pages/User/SettingPage"));
const AboutPage = React.lazy(() => import("../pages/User/AboutPage"));
const PasswordReset = React.lazy(() => import("../pages/User/ForgotPassword"));
const UserDetail = React.lazy(() => import("../pages/User/UserDetail"));
const RegisterInstructorPage = React.lazy(
  () => import("../pages/Instructor/RegisterInstructorPage"),
);
const VerifyPage = React.lazy(() => import("../pages/User/VerifyPage"));
const ChangePassPage = React.lazy(() => import("../pages/ChangePasswordPage"));
const BlogPage = React.lazy(() => import("../pages/User/BlogPage"));
const SearchResultsPage = React.lazy(() => import("../pages/User/SearchResultsPage"));
const CategoryCoursesPage = React.lazy(() => import("../pages/User/CategoryCoursesPage"));

//-----------------------------------------------ADMIN-------------------------------------------------
const AdminPage = React.lazy(() => import("../pages/Admin/AdminPage"));
const CategoriesManagePage = React.lazy(
  () => import("../pages/Admin/CategoriesManagePage"),
);
const ProfilePage = React.lazy(() => import("../pages/Admin/ProfilePage"));
const UserManagePage = React.lazy(
  () => import("../pages/Admin/UserManagePage"),
);
const CoursesCheckPage = React.lazy(
  () => import("../pages/Admin/CoursesCheckPage"),
);
const ReviewProfilePage = React.lazy(
  () => import("../pages/Admin/ReviewProfilePage"),
);
const AdminLoginPage = React.lazy(
  () => import("../pages/Admin/AdminLoginPage"),
);
const AdminReviewManagePage = React.lazy(
  () => import("../pages/Admin/AdminReviewManagePage"),
);
const BlogManagePage = React.lazy(
  () => import("../pages/Admin/BlogManagePage"),
);

//---------------------------------------------INSTRUCTOR----------------------------------------------
const InstructorPage = React.lazy(
  () => import("../pages/Instructor/InstructorPage"),
);
const CoursesManagePage = React.lazy(
  () => import("../pages/Instructor/CoursesManagePage"),
);
const CreateCoursePage = React.lazy(
  () => import("../pages/Instructor/CreateCoursePage"),
);
const LessonManagePage = React.lazy(
  () => import("../pages/Instructor/LessonManagePage"),
);
const SessionManagePage = React.lazy(
  () => import("../pages/Instructor/SessionManagePage"),
);
const ReviewManagePage = React.lazy(
  () => import("../pages/Instructor/ReviewManagePage"),
);
const PayoutManagePage = React.lazy(
  () => import("../pages/Instructor/PayoutManagePage"),
);
const EarningPage = React.lazy(() => import("../pages/Instructor/EarningPage"));

//-----------------------------------------------STUDENT-----------------------------------------------
const StudentVerifyPage = React.lazy(() => import("../pages/User/VerifyPage"));
const UserProfilePage = React.lazy(
  () => import("../pages/Student/StudentProfilePage"),
);
const StudentDashboard = React.lazy(
  () => import("../pages/Student/StudentDashboard"),
);
const StudentSettingPage = React.lazy(
  () => import("../pages/Student/StudentSettingPage"),
);
const ConfirmCheckout = React.lazy(
  () => import("../components/Checkout/ConfirmCheckOut"),
);

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
    return <Navigate to="/sign-in" replace />;
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
        <Suspense fallback={""}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />;
            <Route
              path="/category/:categoryId"
              element={<CategoryCoursesPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="/detail/:_id" element={<DetailCoursePage />} />
            <Route path="/report-page" element={<ReportPage />} />
            <Route path="/help-page" element={<HelpPage />} />
            <Route path="/settings-page" element={<SettingsPage />} />
            <Route path="/forgot-password" element={<PasswordReset />} />
            <Route path="/verify-account" element={<StudentVerifyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route
              path="/sign-up-instructor"
              element={<RegisterInstructorPage />}
            />
            <Route path="/verify-email/:token" element={<VerifyPage />} />
            <Route path="/user/change-password" element={<ChangePassPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            {/*----------------------------ADMIN---------------------------------*/}
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
            <Route
              path="/admin/user-detail/id"
              element={
                <ProtectedRoute
                  element={<UserDetail _id={""} token={""} />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/admin/review-profile"
              element={
                <ProtectedRoute
                  element={<ReviewProfilePage />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/admin/blog-manage"
              element={
                <ProtectedRoute
                  element={<BlogManagePage />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/admin/courses-check"
              element={
                <ProtectedRoute
                  element={<CoursesCheckPage />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/admin/reviews-management"
              element={
                <ProtectedRoute
                  element={<AdminReviewManagePage />}
                  allowedRoles={["admin"]}
                />
              }
            />
            {/*----------------------------STUDENT-------------------------------*/}
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  element={<Cart />}
                  allowedRoles={["student" , "instructor"]}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute
                  element={<CheckOut />}
                  allowedRoles={["student" , "instructor"]}
                />
              }
            />
            <Route
              path="/confirm-checkout"
              element={
                <ProtectedRoute
                  element={<ConfirmCheckout />}
                  allowedRoles={["student" , "instructor"]}
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
              path="/user-profile-page"
              element={
                <ProtectedRoute
                  element={<UserProfilePage />}
                  allowedRoles={["student", "instructor"]}
                />
              }
            />
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute
                  element={<StudentDashboard />}
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
            {/*---------------------------INSTRUCTOR-----------------------------*/}
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
