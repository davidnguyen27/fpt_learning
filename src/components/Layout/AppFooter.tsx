const AppFooter: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-sm max-md:grid-cols-2">
        <div className="text-white">
          <span>
            <a href="#">About</a>
          </span>
          <br />
          <span>
            <a href="#">Blog</a>
          </span>
          <br />
          <span>
            <a href="#">Careers</a>
          </span>
          <br />
          <span>
            <a href="#">Press</a>
          </span>
        </div>
        <div className="text-white">
          <span>
            <a href="#">Help</a>
          </span>
          <br />
          <span>
            <a href="#">Advertise</a>
          </span>
          <br />
          <span>
            <a href="#">Developers</a>
          </span>
          <br />
          <span>
            <a href="#">Contact us</a>
          </span>
        </div>
        <div className="text-white">
          <span>
            <a href="#">Copyright Policy</a>
          </span>
          <br />
          <span>
            <a href="#">Terms</a>
          </span>
          <br />
          <span>
            <a href="#">Privacy Policy</a>
          </span>
          <br />
          <span>
            <a href="#">Site map</a>
          </span>
        </div>
        <div>
          <img
            width={150}
            src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
            alt=""
          />

          <span className="text-xs text-white">
            Copyright @ 2024 FPT LearningHub
          </span>
        </div>
      </div>
    </>
  );
};

export default AppFooter;
