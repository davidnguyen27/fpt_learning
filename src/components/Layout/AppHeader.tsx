import { useNavigate } from "react-router-dom";
import { useSider } from "../../app/context/SiderContext";
import { Badge, Button, Dropdown, MenuProps, Space } from "antd";
import {
  ShoppingCartOutlined,
  MailOutlined,
  BellOutlined,
  ContactsOutlined,
  AreaChartOutlined,
  RetweetOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../app/context/AuthContext";

const AppHeader: React.FC = () => {
  const { toggleSider } = useSider();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const storedUser: any = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateCourseClick = () => {
    navigate("/instructor/courses-management/create-course-step");
  };

  const handleView = () => {
    if (user?.data.role === "admin") {
      navigate("/admin-profile-page");
    } else if (user?.data.role === "instructor") {
      navigate("/user-profile-page");
    } else {
      navigate("/user-profile-page");
    }
  };

  const handleManagement = () => {
    if (user?.data.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.data.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/student-course-list-page");
    }
  };

  const handleShoppingCart = () => {
    if (user?.data.role === "student") {
      navigate("/cart");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <a onClick={handleView}>
          <ContactsOutlined /> Profile
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a onClick={handleManagement}>
          <AreaChartOutlined />{" "}
          {user?.data.role === "admin" || "instructor"
            ? "Dashboard"
            : "My Course"}
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/paid-membership">Paid Memberships</a>,
    },
    {
      key: "3",
      label: <a href="/settings">Setting</a>,
    },
    {
      key: "4",
      label: <a href="/help">Help</a>,
    },
    {
      key: "5",
      label: (
        <a href="/user/change-password">
          <RetweetOutlined /> Change Password
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="wrapper-50">
        <div className="styles-x-axis">
          <div className="menu-bar" onClick={toggleSider}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <a href="/" className="logo-box">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
              alt="FPT Education"
            />
          </a>
          <div className="styles-x-axis search-box">
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Search for courses, tutorials..."
              className="search-item"
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </div>
      </div>
      <div className="styles-x-axis w-1/2 justify-end gap-5">
        {user?.data.role === "instructor" ? (
          <Button
            type="primary"
            danger
            className="my-custom-button"
            onClick={handleCreateCourseClick}
          >
            Create new Course
          </Button>
        ) : null}
        {user ? (
          <>
            {user?.data.role === "student" && (
              <Badge count={1}>
                <ShoppingCartOutlined
                  style={{ fontSize: "1.5em" }}
                  onClick={handleShoppingCart}
                />
              </Badge>
            )}
            {user?.data.role === "instructor" && (
              <Badge count={1}>
                <ShoppingCartOutlined
                  style={{ fontSize: "1.5em" }}
                  onClick={handleShoppingCart}
                />
              </Badge>
            )}
            <Badge count={1}>
              <MailOutlined style={{ fontSize: "1.5em", cursor: "pointer" }} />
            </Badge>
            <Badge count={1}>
              <BellOutlined style={{ fontSize: "1.5em", cursor: "pointer" }} />
            </Badge>
            <Dropdown menu={{ items }}>
              <a className="mr-9 flex" onClick={(e) => e.preventDefault()}>
                <Space>
                  <img
                    src={user.data.avatar}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <div className="mr-4">
            <Button
              type="primary"
              className="mr-4 bg-red-500"
              danger
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
            <Button
              className="mr-4"
              style={{
                backgroundColor: "#f3f4f6",
                color: "black",
                borderColor: "black",
              }}
              type="primary"
              danger
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
            <Button
              className="mr-4 border-slate-900 bg-slate-900 text-white"
              type="primary"
              onClick={() => navigate("/sign-up-instructor")}
            >
              Become an Instructor
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AppHeader;
