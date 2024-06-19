import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png" alt="FPT Education" />
      </div>
      <div className="menu">
        <div className="menu-item active">Thông tin cá nhân</div>
        <div className="menu-item">Mật khẩu và bảo mật</div>
      </div>
    </div>
  );
};

export default Sidebar;
