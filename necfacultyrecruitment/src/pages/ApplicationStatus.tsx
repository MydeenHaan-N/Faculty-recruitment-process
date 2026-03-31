import { CheckCircle } from "lucide-react";

export default function ApplicationStatus() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-500 w-8 h-8 mr-2" />
        <h2 className="text-2xl font-semibold">Application Status</h2>
      </div>
      <p className="text-gray-600 mb-2">This is the Application Status Page.</p>
      <p className="text-lg">
        <span className="font-medium text-gray-800">Status:</span>{" "}
        <span className="text-green-600 font-semibold">Form Submitted</span>
      </p>
    </div>
  );
}
