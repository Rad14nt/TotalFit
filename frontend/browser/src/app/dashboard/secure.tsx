// import React, { useEffect, useState } from 'react';
// import { getSecureData } from '../utils/api';
//
// const SecurePage: React.FC = () => {
//     const [data, setData] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await getSecureData();
//             setData(result);
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//                 <h1 className="text-2xl font-bold mb-4">Secure Data</h1>
//                 <pre>{JSON.stringify(data, null, 2)}</pre>
//             </div>
//         </div>
//     );
// };
//
// export default SecurePage;
