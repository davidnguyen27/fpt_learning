import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../styles/StudentUser.css';

const StudentUser: React.FC = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    // If menu is not visible, toggle the visibility after a delay
    if (!menuVisible) {
      setTimeout(() => {
        setMenuVisible(true);
      }, 100); // Adjust the delay time (in milliseconds) as needed
    } else {
      // If menu is visible, toggle the visibility immediately
      setMenuVisible(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof Node && !document.getElementById('user-menu-container')?.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu-container" id="user-menu-container">
      <div className="user-icon-container" onClick={handleClick}>
        <i className="fa-solid fa-user"></i>
      </div>
      <div className={`user-menu-wrapper ${menuVisible ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Menu
          mode="vertical"
          className="bg-slate-200"
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => { navigate('/student-profile-page'); setMenuVisible(false); }}
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<SettingOutlined />}
            onClick={() => { navigate('/settings'); setMenuVisible(false); }}
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<LogoutOutlined />}
            onClick={() => { navigate('/logout'); setMenuVisible(false); }}
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          >
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default StudentUser;
