import React, { useEffect } from 'react';
import hooks from 'leemons-hooks';
import { plugins, frontPlugins } from '@plugins';
import PropTypes from 'prop-types';
import { useLayout } from '@layouts/hooks';
import 'leemons-ui/dist/theme/leemons.css';

function MyApp({ Component, pageProps }) {
  // Only add it once
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    window.addEventListener('error', (e) => {
      e.preventDefault();
      console.error(e.error);
    });
  }, []);

  // Only add it once (when leemons is not setted)
  if (!global.leemons) {
    // Define logger to console (temporal)
    global.leemons = { log: console };

    console.log(
      'Frontend plugins:',
      frontPlugins.map((plugin) => plugin.name)
    );
    console.log('All the installed plugins:', plugins);
    frontPlugins.forEach((plugin) => {
      plugin.load();
    });
  }

  const Layout = useLayout(Component.layout);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
