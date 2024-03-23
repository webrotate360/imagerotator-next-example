import WR360 from '@webrotate360/imagerotator';
import { useEffect, useRef } from 'react';

export default function Webrotate({ config }) {
  const { id, licenseCode, configFileURL, graphicsPath, alt, responsiveBaseWidth, responsiveMinHeight } = config;
  const viewerApi = useRef(null);
  const viewer = WR360.ImageRotator.Create(id);
  viewer.licenseCode = licenseCode;
  viewer.settings.configFileURL = configFileURL;
  viewer.settings.graphicsPath = graphicsPath;
  viewer.settings.alt = alt;
  viewer.settings.responsiveBaseWidth = responsiveBaseWidth;
  viewer.settings.responsiveMinHeight = responsiveMinHeight;
  viewer.settings.apiReadyCallback = (api, isFullScreen) => {
    viewerApi.current = api;
    viewerApi.current.images.onDrag((event) => {
      console.log(`${event.action}; current image index = ${viewerApi.current.images.getCurrentImageIndex()}`);
    });
  };
  viewer.runImageRotator();

  useEffect(() => {
    return () => {
      if (viewerApi.current) {
        console.log('Destroying Webrotate...');
        viewerApi.current.delete();
      }
    };
  }, []);

  return null;
}
