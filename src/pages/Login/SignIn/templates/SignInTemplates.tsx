import React from 'react';
import SignInForm from '@/pages/Login/SignIn/molecules/SignInForm';
import SocialLoginButtons from '@/pages/Login/SignIn/organisms/SocialLoginButtons';

const SignInOrganism: React.FC = () => {
  return (
    <div>
      <div className="flex  flex-col justify-center gap-10 border rounded-2xl w-[60.62rem] py-20  stroke-3.64 stroke-gray-400 items-center">
        <h2 className="text-5xl">로그인</h2>

        <SignInForm />
        <div className="border w-[28.625rem]"> </div>
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default SignInOrganism;
