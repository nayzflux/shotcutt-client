import React from "react";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <main className="flex-grow flex items-center flex-col gap-24 px-24 py-8 xl:px-32 xl-py-16 2xl:px-64">
      <div className="py-20">
        <SignInForm />
      </div>
    </main>
  );
};

export default SignInPage;
