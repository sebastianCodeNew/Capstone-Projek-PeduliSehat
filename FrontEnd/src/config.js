const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081',
  mlServerUrl: import.meta.env.VITE_ML_SERVER_URL || 'http://localhost:3000'
};
export default config;