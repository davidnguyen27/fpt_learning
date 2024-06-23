import { useNavigate } from "react-router-dom";
import { useSider } from "../../app/context/SiderContext";
import { Badge, Button, Dropdown, MenuProps, Space } from "antd";
import {
  ShoppingCartOutlined,
  MailOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../app/context/AuthContext";

const AppHeader: React.FC = () => {
  const { toggleSider } = useSider();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateCourseClick = () => {
    navigate("/create-course");
  };

  const handleView = () => {
    if (user?.role === "admin") {
      navigate("/admin-profile-page");
    } else if (user?.role === "instructor") {
      navigate("/instructor-profile-page");
    } else {
      navigate("/student-profile-page");
    }
  };

  const handleManagement = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "instructor") {
      navigate("/instructor-course-list-page");
    } else {
      navigate("/student-course-list-page");
    }
  };

  const handleShoppingCart = () => {
    if (user?.role === "student") {
      navigate("/cart");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <a onClick={handleView}>Profile</a>,
    },
    {
      key: "1",
      label: (
        <a onClick={handleManagement}>
          {user?.role === "admin" ? "Dashboard" : "My Course"}
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/paid-memberships">Paid Memberships</a>,
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
      label: <a href="/feedback">Send Feedback</a>,
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "6",
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
        {user?.role === "instructor" ? (
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
            {user.role === "student" && (
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
                    src={user.image}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <>
            <Button
              type="primary"
              className="bg-amber-500"
              danger
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
            <Button
              className="mr-4 bg-amber-500"
              type="primary"
              danger
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default AppHeader;
