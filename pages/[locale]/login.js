import React, { Fragment } from 'react';
import Head from 'next/head';
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import { getStaticPaths, makeStaticProps } from '~/lib/getStatic';
import brand from '~/public/text/brand';
import LoginForm from '~/components/Forms/Login';

function Login() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.education.name + ' - Login' }
        </title>
      </Head>
      <div>
        <LoginForm />
      </div>
    </Fragment>
  );
}

export default Login;

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
