import Head from 'next/head';
import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';

export default function Alternative() {
  const viewerApi = useRef(null);

  // Run this code only on the client side
  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const loadWebRotate360 = async () => {
        // https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-external-libraries
        const WR360 = (await import('@webrotate360/imagerotator')).default;
        const viewer = WR360.ImageRotator.Create('webrotate360');
        viewer.licenseCode = 'your-license-code';
        viewer.settings.configFileURL = '/example/example.xml';
        viewer.settings.graphicsPath = '/graphics';
        viewer.settings.alt = 'Your alt image description';
        viewer.settings.responsiveBaseWidth = 800;
        viewer.settings.responsiveMinHeight = 300;
        viewer.settings.apiReadyCallback = (api, isFullScreen) => {
          viewerApi.current = api;
          viewerApi.current.images.onDrag((event) => {
            console.log(`${event.action}; current image index = ${viewerApi.current.images.getCurrentImageIndex()}`);
          });
        };
        viewer.runImageRotator();
      };
      loadWebRotate360();
      return () => {
        if (viewerApi.current) {
          console.log('Destroying Webrotate...');
          viewerApi.current.delete();
        }
      };
    }, []);
  }

  return (
    <>
      <Head>
        <title>WebRotate 360 Product Viewer - Next Example</title>
        <meta content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="alignCenter">
        <Link href="/">Root</Link>
        <div className="viewerContainer">
          <div id="webrotate360" />
        </div>
      </div>
    </>
  );
}
