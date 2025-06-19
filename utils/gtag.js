export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your GA4 ID

export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
