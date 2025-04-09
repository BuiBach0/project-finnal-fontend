// import { useState, useEffect } from "react";

// const useProjectIdFromLocalStorage = () => {
//   const [projectId, setProjectId] = useState<string | null>(
//     localStorage.getItem("projectId")
//   );

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setProjectId(localStorage.getItem("projectId"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return projectId;
// };

// export default useProjectIdFromLocalStorage;
