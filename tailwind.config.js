/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./login/Login.jsx",
    "./home/Home.jsx",
    "./code/Code.jsx",
    "./profile/Profile.jsx",
    "./dashboard/users/Users.jsx",
    "./dashboard/problems/Problems.jsx",
    "./dashboard/problems/AddProblem.jsx",
    "./dashboard/problems/ProblemDetails.jsx",
    "./dashboard/problems/Solutions.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
