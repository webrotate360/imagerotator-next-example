import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
// To dynamically load a component on the client side, you can use the ssr option to disable server-rendering.
// This is useful if an external dependency or component relies on browser APIs like window.
const Webrotate = dynamic(() => import('@/components/webrotate'), {
  ssr: false,
});

export default function Root() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = {
    id: 'webrotate360',
    licenseCode: 'your-license-code',
    configFileURL: '/example/example.xml',
    graphicsPath: '/graphics',
    alt: 'Your alt image description',
    responsiveBaseWidth: 800,
    responsiveMinHeight: 300,
  };

  return (
    <>
      <Head>
        <title>WebRotate 360 Product Viewer - Next Example</title>
        <meta content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="alignCenter">
        <Link href="/alternative">Alternative</Link>
        <div className="viewerContainer">
          <div id="webrotate360" />
          {mounted ? <Webrotate config={config} /> : null}
        </div>
      </div>
    </>
  );
}
