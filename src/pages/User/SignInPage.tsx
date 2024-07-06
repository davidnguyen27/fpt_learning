import { FormSignIn } from "../../components";
import signIn from "../../assets/Image/Image4.png";

const SignInPage: React.FC = () => {
  return (
    <section className="h-screen">
      <div className="flex h-screen items-center">
        {/* <!-- Left column container with background--> */}
        <div className="h-full flex-1">
          <img
            src={signIn}
            className="h-full w-full object-cover"
            alt="Phone image"
          />
        </div>

        {/* <!-- Right column container with form --> */}
        <div className="mr-4 md:w-8/12 lg:ml-6 lg:w-5/12">
          <FormSignIn />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
