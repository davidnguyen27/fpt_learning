
import { FormSignIn } from "../../components";

const SignInPage: React.FC= () => {
  return (
    <section className="h-screen">
      <div className="container h-full">
        <div className="gap-8 flex flex-wrap items-center">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-6/12 lg:w-6/12">
            <img
              src="/public/image/image4.png"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <FormSignIn />
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignInPage;