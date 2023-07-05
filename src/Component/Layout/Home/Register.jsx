
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    // Perform registration logic here
  };

  return (
    < >
    <div className='flex flex-row-reverse w-[80%] mx-auto'>
    <form onSubmit={handleSubmit(onSubmit)} className="border-2 p-3  max-w-md w-1/2 mx-auto py-20 my-3 rounded-lg">
  <div className="mb-4">
    <label htmlFor="name" className="block mb-2">
      Name:
    </label>
    <input
      type="text"
      id="name"
      {...register('name', { required: 'name is required' })}
      className="w-full px-4 py-2 border rounded"
    />
    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
  </div>

  <div className="mb-4">
    <label htmlFor="email" className="block mb-2">
      Email:
    </label>
    <input
      type="email"
      id="email"
      {...register('email', {
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+$/i,
          message: 'Invalid email address',
        },
      })}
      className="w-full px-4 py-2 border rounded"
    />
    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
  </div>

  <div className="mb-4">
  <label htmlFor="password" className="block mb-2">
    Password:
  </label>
  <div className="flex">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      {...register('password', {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password should be at least 6 characters long',
        },
      })}
      className="w-full px-4 py-2 border rounded"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="ml-2 px-4 py-2 bg-gray-300 rounded"
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
</div>

  <button type="submit" className="bg-blue-500 btn-block text-white px-4 py-2 rounded">
    Register
  </button>
</form>
<div className='w-1/2'>
  <img src="/public/img/singup.jpg" alt="" />
</div>
    </div>
     
    </>
   

  );
};

export default Register;
