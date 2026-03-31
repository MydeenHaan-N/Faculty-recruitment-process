//necfacultyrecruitment\necfacultyrecruitment\src\pages\PersonalForm.tsx

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Upload, UserCircle2, X } from 'lucide-react';
import { useSelectedUser } from '../context/userContext';


export default function PersonalForm() {

  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    email: '',
    mobileNumber: '',
    communicationAddress: '',
    permanentAddress: '',
    religion: '',
    community: '',
    caste: '',
    post: '',
    department: '',
    appliedDate: new Date().toISOString().slice(0, 10)
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {setUser} = useSelectedUser();

  // Department and Post options
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);

useEffect(() => {
  axios.get('http://localhost:5400/facultyrecruitment/specialization/departments')
    .then((res) => {
      const depts = res.data.map((item: { dept_name: string }) => item.dept_name);
      setDepartmentOptions(depts);
    })
    .catch((err) => console.error('Failed to fetch departments:', err));
}, []);

  const postOptions = [
    'Assistant Professor',
  ];

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5400/facultyrecruitment/personal/${userId}`)
        .then((res) => {
          if (res.data) {
            const updatedFormData = { ...res.data };

            // If no applied date is in the response, use today's date
            if (!updatedFormData.appliedDate) {
              updatedFormData.appliedDate = new Date().toISOString().split('T')[0];
            }

            // Calculate age if DOB exists
            if (updatedFormData.dateOfBirth) {
              updatedFormData.age = calculateAge(updatedFormData.dateOfBirth).toString();
            }

            setFormData(updatedFormData);

            if (res.data.photo) {
              const byteCharacters = atob(res.data.photo);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });
              const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

              setPhotoFile(file);
              setPhotoPreview(`data:image/jpeg;base64,${res.data.photo}`);
            }
          }
        })
        .catch((err) => {
          if (err.response?.status !== 404) {
             console.error('Error fetching personal data:', err);
        }
      });
    }
  }, [userId]);


  // useEffect"=>{
  //     console.log("hi");
  // },[formData.department])

  // Function to calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'appliedDate' || name === 'age') return;

    setFormData((prevData) => {
      if (prevData[name] === value) return prevData; // Prevents re-renders

      const newData = { ...prevData, [name]: value };
      if (name === 'dateOfBirth' && value) {
        newData.age = calculateAge(value).toString();
      }
      return newData;
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoRemoved(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear photo error if it exists
      if (errors.photo) {
        setErrors({ ...errors, photo: '' });
      }
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoRemoved(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = [
      { key: 'fullName', label: 'Full Name' },
      { key: 'dateOfBirth', label: 'Date of Birth' },
      { key: 'gender', label: 'Gender' },
      { key: 'communicationAddress', label: 'Communication Address' },
      { key: 'permanentAddress', label: 'Permanent Address' },
      { key: 'religion', label: 'Religion' },
      { key: 'community', label: 'Community' },
      { key: 'caste', label: 'Caste' },
      { key: 'email', label: 'Email Address' },
      { key: 'mobileNumber', label: 'Mobile Number' },
      { key: 'post', label: 'Post' },
      { key: 'department', label: 'Department' },
    ];

    requiredFields.forEach(field => {
      if (!formData[field.key as keyof typeof formData]) {
        newErrors[field.key] = `${field.label} is required`;
        isValid = false;
      }
    });

    // Check if photo is provided
    if (!photoFile && !formData.photo && !photoRemoved) {
      newErrors.photo = 'Profile photo is required';
      isValid = false;
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Mobile number validation (assuming 10 digits)
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form before submission
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-field');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add all form fields except photo
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'photo') {
          formDataToSend.append(key, value);
        }
      });

      if (photoFile) {
        formDataToSend.append('photo', photoFile);
      } else if (photoRemoved) {
        formDataToSend.append('photoRemoved', 'true');
      }

      const res = await axios.post(
        `http://localhost:5400/facultyrecruitment/personal/${userId}`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setUser({ department: formData.department });
      localStorage.setItem("Department",formData.department)    
      alert(res.data.message || 'Saved Successfully ✅');

      if (photoRemoved) {
        setFormData(prev => ({ ...prev, photo: '' }));
      }

    } catch (err) {
      console.error('Save Error:', err);
      alert('Failed to save data ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <h2 className="text-2xl font-bold text-white">Personal Information</h2>
              <div className="w-full md:w-auto">
                <div className="relative flex items-center gap-4">
                  <div className="relative group">
                    <div className={`w-24 h-24 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 ${photoPreview ? 'border-white/20' : 'border-dashed border-white/40'} ${errors.photo ? 'border-red-400' : ''}`}>
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle2 className="w-12 h-12 text-white/60" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label htmlFor="photo-upload" className="cursor-pointer text-white text-sm font-medium">
                          Change
                        </label>
                      </div>
                    </div>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-sm mb-2">
                      Profile Photo <span className="text-red-300">*</span>
                    </p>
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-md text-sm font-medium text-white hover:bg-white/20 transition-all duration-200"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {photoPreview ? 'Change Photo' : 'Upload Photo'}
                    </label>
                    <p className="text-white/60 text-xs mt-1">
                      Recommended: Square JPG, PNG. Max 5MB
                    </p>
                    {errors.photo && (
                      <p className="text-red-300 text-xs mt-1">{errors.photo}</p>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
              </div>
            </div>
          </div>

          <div className="p-6 overflow-auto">
            <div className="mb-4 px-2">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <p className="text-indigo-800 text-sm flex items-center">
                  <span className="mr-2">ℹ️</span> All fields marked with <span className="text-red-500 mx-1">*</span> are required
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">1</span>
                  Basic Details
                </h3>
                <div className={`mb-3 ${errors.fullName ? 'error-field' : ''}`}>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white
      ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    required
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    id="dateOfBirth"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-style"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-600 mb-1">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    id="age"
                    placeholder="Age"
                    value={formData.age}
                    readOnly
                    className="input-style bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className={`mb-3 ${errors.gender ? 'error-field' : ''}`}>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`input-style ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>
              </div>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">2</span>
                  Contact Information
                </h3>

                <div className="mb-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-style"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="input-style"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="communicationAddress" className="block text-sm font-medium text-gray-600 mb-1">
                    Communication Address
                  </label>
                  <input
                    name="communicationAddress"
                    id="communicationAddress"
                    placeholder="Communication Address"
                    value={formData.communicationAddress}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-600 mb-1">
                    Permanent Address
                  </label>
                  <input
                    name="permanentAddress"
                    id="permanentAddress"
                    placeholder="Permanent Address"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>
              </div>


              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2">3</span>
                  Additional Information
                </h3>

                <div className="mb-3">
                  <label htmlFor="religion" className="block text-sm font-medium text-gray-600 mb-1">
                    Religion
                  </label>
                  <input
                    name="religion"
                    id="religion"
                    placeholder="Religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="community" className="block text-sm font-medium text-gray-600 mb-1">
                    Community
                  </label>
                  <input
                    name="community"
                    id="community"
                    placeholder="Community"
                    value={formData.community}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="caste" className="block text-sm font-medium text-gray-600 mb-1">
                    Caste
                  </label>
                  <input
                    name="caste"
                    id="caste"
                    placeholder="Caste"
                    value={formData.caste}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="post" className="block text-sm font-medium text-gray-600 mb-1">
                    Post <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="post"
                    id="post"
                    value={formData.post}
                    onChange={handleChange}
                    className="input-style"
                    required
                  >
                    <option value="">Select Post</option>
                    {postOptions.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-600 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-style"
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-600 mb-1">
                    Applied Date
                  </label>
                  <input
                    name="appliedDate"
                    id="appliedDate"
                    type="date"
                    placeholder="Applied Date"
                    value={formData.appliedDate}
                    readOnly
                    className="input-style bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="border-t bg-gray-50 p-4">
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Save Information
              </button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
  .input-style {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
  }
  .input-style:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px #c7d2fe;
    background-color: #ffffff;
  }
`}</style>

    </div>
  );
}