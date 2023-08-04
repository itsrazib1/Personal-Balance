import {  useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provaider/Authprovaider";

const Login = () => {
  // const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
     
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      
      <div className="min-h-screen rounded-t-full rounded-b-full   bg-base-200 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6 mt-5">
              Login now!
            </h1>
          </div>

          <div className=" bg-slate-400 mx-auto ms-2 w-[95%] shadow-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-4 ">
              <div>
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered px-12"
                />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered px-12"
                  />
                  <span
                    className="  mt-3 -ms-10 "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "show"}
                  </span>
                </div>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    {/* Forgot password? */}
                  </a>
                </label>
              </div>
              <div></div>
              <div className="flex justify-center">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center mt-4">
              <small>
                New Here?{" "}
                <Link className="text-yellow-300 underline" to="/signup">
                  Create an account
                </Link>
              </small>
            </p>
            {/* <SocialLogin /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;