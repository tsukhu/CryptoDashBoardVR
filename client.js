// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Location, Surface } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options
  });

  // Render your app content to the default cylinder surface
  r360.renderToLocation(
    r360.createRoot("ConnectCryptoModel", {
      /* initial props */
    }),
    new Location([0,0,-1.5])
  );

  const leftPanel = new Surface(300,600,Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.5,0);

  r360.renderToSurface(
    r360.createRoot("ConnectLeftPanel", {
      /* initial props */
    }),
    leftPanel
  );

  const rightPanel = new Surface(300,600,Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.5,0);

  r360.renderToSurface(
    r360.createRoot("ConnectRightPanel", {
      /* initial props */
    }),
    rightPanel
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"));
}

window.React360 = { init };
