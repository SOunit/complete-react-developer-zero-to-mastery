import React from "react";

import SignInForm from "../sign-in-form/sign-in-form.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <div>
      <div>Authentication</div>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
