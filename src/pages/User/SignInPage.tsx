import { FormSignIn } from "../../components";

const SignInPage: React.FC = () => {
  return (
    <section className="h-screen">
      <div className="flex h-screen items-center">
        {/* <!-- Left column container with background--> */}
        <div className="h-full flex-1">
          <img
            src="/public/image/image4.png"
            className="h-full w-full object-cover"
            alt="Phone image"
          />
        </div>

        {/* <!-- Right column container with form --> */}
        <div className="md:w-8/12 lg:ml-6 lg:w-5/12 mr-4">
          <FormSignIn />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
