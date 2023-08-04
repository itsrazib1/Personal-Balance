import { useContext } from "react";
// import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provaider/Authprovaider";
// import Swal from "sweetalert2";
// import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const img_hosting_url = `https://api.imgbb.com/1/upload?expiration:null&key=${import.meta.env.VITE_Image_Upload_token}`;

  const onSubmit = async (data) => {
    try {
      const file = data.photoURL[0]; // Get the file from the input
      const formData = new FormData();
      formData.append("image", file);

      // Upload the file and get the URL
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const imgResponse = await response.json();
      const photoURL = imgResponse.data.url; // Get the URL from the response

      // Create user and update profile
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser);

      await updateUserProfile(data.name, photoURL);

      
      const saveResponse = await fetch("https://rupsojja-cosmatic-server-deployment-xoxorazibahamed-gmailcom.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      });
      const saveData = await saveResponse.json();

      if (saveData.insertedId) {
        reset();

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>

      <div  className="hero min-h-screen rounded-l-full  rounded-r-full  bg-rose-100 ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="text-center lg:text-left">
            
            {/* <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p> */}
          </div>
          <div className="card  flex-shrink-0 w-[98%]  ms-2 shadow-2xl bg-base-100">
            <div className="card-body ">
              <form onSubmit={handleSubmit(onSubmit)} className=" ">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm me-2 font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="photoURL"
                    className="text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <input
                    id="photoURL"
                    type="file"
                    {...register("photoURL", { required: true })}
                    className="input input-bordered text-xs pt-3 file-input-accent "
                    // placeholder="Enter the URL of your photo"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">Photo URL is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm me-3 font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      // pattern: //
                    })}
                    className="input input-bordered mb-1 my-1"
                    placeholder="Enter your password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be at least 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one uppercase, one lowercase, one
                      number, and one special character.
                    </p>
                  )}
                </div>
                <div>
                  <input
                    className="btn btn-primary my-1 w-full"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>

              <p className=" sm:-mt-10 md:mt-8 ">
                <small className="flex">
                  <div> Already have an account? </div>
                  <div>
                    <Link to="/login" className="link">
                      <div className="text-yellow-700 ms-2"> Login</div>
                    </Link>
                  </div>
                </small>
              </p>
            </div>
            {/* <SocialLogin /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;