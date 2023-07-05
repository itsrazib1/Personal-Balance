import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  gap-5 lg:flex-row-reverse">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card w-1/2 flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="password"
      className="input input-bordered pr-12"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
    >
      {showPassword ? (
        'Hide'
      ) : (
        'Show'
      )}
    </button>
  </div>
</div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
            </div>
            <label className="label pb-10 mx-auto">
              <Link to='/register'  className="label-text-alt link link-hover">
             dont have any account <span className="text-yellow-600">Register now</span>
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
