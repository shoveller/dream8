import React from 'react';

import SignInOrganism from '@/pages/Login/SignIn/templates/SignInTemplates';

const SignInPage: React.FC = () => {
  return (
    <section className="py-[10%] flex justify-center items-center">
      <h2 className="sr-only">로그인페이지</h2>

      <SignInOrganism></SignInOrganism>
    </section>
  );
};

export default SignInPage;
