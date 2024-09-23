// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const reports = [
//   { id: 1, title: 'Q1 Financial Audit', status: 'Draft', dueDate: '2023-06-30', progress: 25, assignee: 'John Doe' },
//   { id: 2, title: 'Annual Compliance Review', status: 'In Progress', dueDate: '2023-07-15', progress: 60, assignee: 'Jane Smith' },
//   { id: 3, title: 'IT Security Assessment', status: 'Completed', dueDate: '2023-05-31', progress: 100, assignee: 'Mike Johnson' },
//   { id: 4, title: 'Q2 Performance Review', status: 'Draft', dueDate: '2023-08-15', progress: 10, assignee: 'Sarah Williams' },
//   { id: 5, title: 'Supply Chain Audit', status: 'In Progress', dueDate: '2023-09-30', progress: 45, assignee: 'Tom Brown' },
//   // Add more reports as needed for testing scroll functionality
//   { id: 6, title: 'Market Analysis Q3', status: 'Draft', dueDate: '2023-10-15', progress: 15, assignee: 'Alice Green' },
//   { id: 7, title: 'Operational Efficiency Review', status: 'In Progress', dueDate: '2023-11-01', progress: 50, assignee: 'Bob White' },
//   { id: 8, title: 'Customer Feedback Analysis', status: 'Completed', dueDate: '2023-04-20', progress: 100, assignee: 'Charlie Black' },
//   { id: 9, title: 'Product Launch Audit', status: 'Draft', dueDate: '2023-12-05', progress: 5, assignee: 'Diana Blue' },
//   { id: 10, title: 'HR Compliance Audit', status: 'In Progress', dueDate: '2023-08-25', progress: 40, assignee: 'Ethan Yellow' },
// ];

// const ReportList = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredReports = reports.filter((report) =>
//     report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     report.assignee.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Completed':
//         return 'bg-green-100 text-green-800';
//       case 'In Progress':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Draft':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
//       <div className="md:flex md:items-center md:justify-between mb-6">
//         <div className="flex-1 min-w-0">
//           <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Reports</h2>
//         </div>
//         <div className="mt-4 flex md:mt-0 md:ml-4">
//           <Link to="/create" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
//             Create New Report
//           </Link>
//         </div>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search reports..."
//           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-md flex-1 flex flex-col">
//         <ul className="divide-y divide-gray-200 flex-1 overflow-y-auto">
//           {filteredReports.map((report) => (
//             <li key={report.id}>
//               <Link to={`/edit/${report.id}`} className="block hover:bg-gray-50">
//                 <div className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium text-indigo-600 truncate">{report.title}</p>
//                     <div className="ml-2 flex-shrink-0 flex">
//                       <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
//                         {report.status}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-2 sm:flex sm:justify-between">
//                     <div className="sm:flex">
//                       <p className="flex items-center text-sm text-gray-500">
//                         <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                           <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                         </svg>
//                         Due on {report.dueDate}
//                       </p>
//                       <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
//                         <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                         </svg>
//                         {report.assignee}
//                       </p>
//                     </div>
//                     <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                       <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                       </svg>
//                       Progress
//                       <div className="ml-2 w-32 bg-gray-200 rounded-full h-2.5">
//                         <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${report.progress}%` }}></div>
//                       </div>
//                       <span className="ml-2">{report.progress}%</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ReportList;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // For sanitizing HTML

const reports = [
  { id: 1, title: 'Q1 Financial Audit', status: 'Draft', dueDate: '2023-06-30', progress: 25, assignee: 'John Doe', content: '<p>This is the initial content of the Q1 Financial Audit report.</p>' },
  { id: 2, title: 'Annual Compliance Review', status: 'In Progress', dueDate: '2023-07-15', progress: 60, assignee: 'Jane Smith', content: '<p>This is the initial content of the Annual Compliance Review report.</p>' },
   // Add more reports as needed for testing scroll functionality
];

const ReportList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewReport, setPreviewReport] = useState(null);

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.assignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openPreview = (report) => {
    setPreviewReport(report);
  };

  const closePreview = () => {
    setPreviewReport(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Reports List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <li key={report.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
              <div className="px-4 py-4 sm:px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <div className="flex-1">
                  <div className="flex mx-3 justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{report.title}</h3>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => openPreview(report)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Preview
                  </button>
                  <Link
                    to={`/edit/${report.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Report Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{previewReport.title}</h3>
              <div className="mt-2 px-7 py-3">
                <div className="text-sm text-gray-500">
                  <p><strong>Assignee:</strong> {previewReport.assignee}</p>
                  <p><strong>Due Date:</strong> {previewReport.dueDate}</p>
                  <p><strong>Status:</strong> {previewReport.status}</p>
                  <p><strong>Progress:</strong> {previewReport.progress}%</p>
                </div>
                <div className="mt-4 text-left">
                  <h4 className="text-md font-medium text-gray-900">Report Content:</h4>
                  <div 
                    className="mt-2 text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(previewReport.content) }}
                  />
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closePreview}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;