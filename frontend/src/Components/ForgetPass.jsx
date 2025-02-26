// import React, { useState } from "react";
// import axios from "axios";

// export default function ForgetPass() {
//   const [email, setYourEmail] = useState("");

//   const handleForgetPass = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = axios.post("http://localhost:8000/user/forgetpassword", {
//         email,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form
//         method="POST"
//         action="/user/forgetpassword"
//         onSubmit={handleForgetPass}
//         className="fixed top-[300px] left-[600px] bg-green-400 px-8 py-[40px] flex flex-col"
//       >
//         <label htmlFor="yourEmail" className="text-2xl text-gray-700">
//           Enter your email address
//         </label>
//         <input
//           type="email"
//           className="w-[300px] py-1 pl-4 text-xl mt-1 rounded-md"
//           id="yourEmail"
//           value={email}
//           placeholder="Enter your email"
//           onChange={(e) => setYourEmail(e.target.value)}
//         />
//         <input
//           type="submit"
//           className="border-2 mt-6 w-[100px] cursor-pointer py-1"
//         />
//       </form>
//     </div>
//   );
// }
