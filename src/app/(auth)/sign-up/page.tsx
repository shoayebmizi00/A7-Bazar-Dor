import React from "react";

const SignUpPage = () => {
  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 my-20 mx-auto">
        <legend className="mx-auto text-2xl font-bold mt-4">Sign Up</legend>

        <label className="label">Name</label>
        <input type="name" className="input" placeholder="Name" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn bg-green-700 text-white mt-4">Sign Up</button>
      </fieldset>
    </div>
  );
};

export default SignUpPage;
