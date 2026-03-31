import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu button with improved styling */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-white text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-100"
        aria-label="Toggle menu"
      >
      </button>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Show instructions ONLY on /dashboard route */}
        {location.pathname === '/dashboard' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Welcome to Faculty Portal
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  Please read the following instructions carefully before proceeding with your application
                </p>
              </div>

              {/* Instructions Content */}
              <div className="flex-1 p-6 sm:p-8">
                <div className="space-y-8">
                  {/* General Instructions Section */}
                  <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center mr-3 text-sm">1</span>
                      General Instructions
                    </h3>
                    <ul className="list-none space-y-3 text-gray-700 pl-11">
                      <li className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                        <span>The applications from the candidates who studied both UG and PG through Regular Stream in Anna University Affiliated colleges, NITs, IITs and any other state and central universities alone are invited. No provision is available for the candidates who studied in any other stream of study/colleges/universities.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                        <span><strong>For Engineering Discipline:</strong>  The Candidates who have passed all subjects in the first attempt itself in each and every semester of Four years of study (VIII semesters) for UG and Two Years of Study for PG degree (IV Semesters) are preferable.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                        <span><strong>For Arts Discipline: </strong> The Candidates who have passed all subjects in the first attempt itself in each and every semester of Three years of study (VI semesters) for UG and Two Years of Study for PG degree (IV Semesters) are preferable.

                        </span>
                      </li>
                    </ul>
                  </section>

                  {/* Other Instructions Section */}
                  <section>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center mr-3 text-sm">2</span>
                        Important Guidelines
                      </h3>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center mr-3 text-sm">I</span>
                        General Instructions to the Candidates
                      </h3>
                      <ul className="list-none space-y-3 text-gray-700 pl-11">
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>Influence in any form will lead to disqualification of the candidates for the post.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>Clarifications/ Difficulties if any may be communicated to <a href="mailto:facultyportal@nec.edu.in" className="text-blue-600 hover:text-blue-700 underline">facultyportal@nec.edu.in</a></span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>Please look for specializations and post specified in the advertisement before applying.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>For Assistant Professor, Candidates with Ph.D will be given preference.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          {/* ✅ Fix */}
<span>(Please ensure you have filled <span style={{color: 'red'}}>all the * fields </span> before clicking the Save button. Also, ensure to click Save button in all the pages )</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center mr-3 text-sm">II</span>
                        Other Instructions
                      </h3>
                      <ul className="list-none space-y-3 text-gray-700 pl-11">
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>Candidates should apply through online in <a href="https://www.nec.edu.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">www.nec.edu.in</a> only and proceed carefully before the start of filling the online application form.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>The applications received through any other medium such as post, in person and e-mail will not be entertained.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>Candidates applying for the post of Asst.Professor should be below 35 years of age.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>CGPA of UG/PG can be converted into % of marks (E.g:7.84 CGPA = 78.4%).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>After filling all details as asked in all the fields/modules for the post including uploading of photograph, experience etc., click on “Submit” button and the candidate will receive the acknowledgement through e-mail within 24 hrs.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>In the online application of the candidates, if any deliberate wrong entry of data is noticed by the college, the application will be rejected.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>The application of the candidates which is submitted through online will be scrutinized as per the Recruitment norms of the college. The short-listed candidates for the post of Asst.Professor will be called for interview.</span>
                        </li>
                      </ul>
                    </div>
                  </section>


                  {/* Contact Section */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h4>
                    <p className="text-blue-700 mb-4">
                      If you have any questions or need assistance, our support team is here to help.
                    </p>
                    <a
                      href="mailto:facultyportal@nec.edu.in"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Contact Support
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => navigate('application-form')}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Begin Application Process
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}