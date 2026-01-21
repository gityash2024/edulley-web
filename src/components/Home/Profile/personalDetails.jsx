import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { addStudent ,editStudent,getStudentDetailsById} from "../../../Services/dashboard";
import CustomLoader from "../../loader";

export default function PersonalDetails({updateState}) {
  const _u = JSON.parse(localStorage.getItem('_u'));
  const userId = _u?._id;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModeData, setEditModeData] = useState({});
  const [sameAsMailing, setSameAsMailing] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    gender: "",
    contactNumber: "",
    email: "",
    dob: "",
    maritalStatus: "",
    mailingAddressLine1: "",
    mailingAddressLine2: "",
    mailingCountry: "",
    mailingState: "",
    mailingCity: "",
    mailingPincode: "",
    permanentAddressLine1: "",
    permanentAddressLine2: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentPincode: "",
    passportNumber: "",
    passportIssueCountry: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    passportStateOfBirth: "",
    passportCountryOfBirth: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getStudentDetailsById(userId);
        if (res?.data?.data) {
          setData({
            fullName: res?.data?.data?.fullName,
            gender: res?.data?.data?.gender,
            contactNumber: res?.data?.data?.contactNumber,
            email: res?.data?.data?.email,
            dob: res?.data?.data?.dob?.split("T")[0],
            maritalStatus: res?.data?.data?.maritalStatus,
            mailingAddressLine1: res?.data?.data?.mailingAddress?.addressLine1,
            mailingAddressLine2: res?.data?.data?.mailingAddress?.addressLine2,
            mailingCountry: res?.data?.data?.mailingAddress?.country,
            mailingState: res?.data?.data?.mailingAddress?.state,
            mailingCity: res?.data?.data?.mailingAddress?.city,
            mailingPincode: res?.data?.data?.mailingAddress?.pinCode,
            permanentAddressLine1: res?.data?.data?.permanentAddress?.addressLine1,
            permanentAddressLine2: res?.data?.data?.permanentAddress?.addressLine2,
            permanentCountry: res?.data?.data?.permanentAddress?.country,
            permanentState: res?.data?.data?.permanentAddress?.state,
            permanentCity: res?.data?.data?.permanentAddress?.city,
            permanentPincode: res?.data?.data?.permanentAddress?.pinCode,
            passportNumber: res?.data?.data?.passportInformation?.passportNumber,
            passportIssueCountry: res?.data?.data?.passportInformation?.issueCountry,
            passportIssueDate: res?.data?.data?.passportInformation?.issueDate?.split("T")[0],
            passportExpiryDate: res?.data?.data?.passportInformation?.expiryDate?.split("T")[0],
            passportStateOfBirth: res?.data?.data?.passportInformation?.birthState,
            passportCountryOfBirth: res?.data?.data?.passportInformation?.birthCountry,
          });
          setEditModeData(res?.data?.data);
          setEditMode(true);
        } else {
          setEditMode(false);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
        setEditMode(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userId]);

  useEffect(() => {
    const isNotEmpty = (value) => value !== null && value !== undefined && value.trim() !== '';
  
    const isSameAddress = 
      isNotEmpty(data.mailingAddressLine1) &&
      isNotEmpty(data.mailingCountry) &&
      isNotEmpty(data.mailingState) &&
      isNotEmpty(data.mailingCity) &&
      isNotEmpty(data.mailingPincode) &&
      data.mailingAddressLine1 === data.permanentAddressLine1 &&
      data.mailingAddressLine2 === data.permanentAddressLine2 &&
      data.mailingCountry === data.permanentCountry &&
      data.mailingState === data.permanentState &&
      data.mailingCity === data.permanentCity &&
      data.mailingPincode === data.permanentPincode;
  
    setSameAsMailing(isSameAddress);
  }, [data]);

  const validateField = (name, value) => {
    if (!value && name !== 'mailingAddressLine2' && name !== 'permanentAddressLine2') {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
      return false;
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSameAsMailingChange = () => {
    const newSameAsMailing = !sameAsMailing;
    setSameAsMailing(newSameAsMailing);
    if (newSameAsMailing) {
      setData((prev) => ({
        ...prev,
        permanentAddressLine1: prev.mailingAddressLine1,
        permanentAddressLine2: prev.mailingAddressLine2,
        permanentCountry: prev.mailingCountry,
        permanentState: prev.mailingState,
        permanentCity: prev.mailingCity,
        permanentPincode: prev.mailingPincode,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = Object.keys(data).every((key) => validateField(key, data[key]));
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }
    const payload = {
      fullName: data.fullName,
      gender: data.gender,
      contactNumber: data.contactNumber,
      email: data.email,
      dob: data.dob,
      maritalStatus: data.maritalStatus,
      mailingAddress: {
        addressLine1: data.mailingAddressLine1,
        addressLine2: data.mailingAddressLine2,
        country: data.mailingCountry,
        state: data.mailingState,
        city: data.mailingCity,
        pinCode: data.mailingPincode,
      },
      permanentAddress: {
        addressLine1: data.permanentAddressLine1,
        addressLine2: data.permanentAddressLine2,
        country: data.permanentCountry,
        state: data.permanentState,
        city: data.permanentCity,
        pinCode: data.permanentPincode,
      },
      passportInformation: {
        passportNumber: data.passportNumber,
        issueCountry: data.passportIssueCountry,
        issueDate: data.passportIssueDate,
        expiryDate: data.passportExpiryDate,
        birthState: data.passportStateOfBirth,
        birthCountry: data.passportCountryOfBirth,
      },
    };
    let response;
    setLoading(true);
    if (editMode) {
      payload.userId = userId;
      response = await editStudent({...editModeData, ...payload});
    } else {
      payload.userId = userId;
      response = await addStudent(payload);
    }
    setLoading(false);

    if (response.error) {
      toast.error(response.message);
    } else {

      toast.success('Profile Data Updated successfully');
      updateState(2);
      if(data?.gender==='Male'){

        localStorage.setItem('profileUpdated','m')
      }else if (data?.gender==='Female'){

        localStorage.setItem('profileUpdated','f')
      }else{
        localStorage.setItem('profileUpdated',null)

      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <CustomLoader />}
      <div className="main-container">
        <h5 className="heading" style={{ fontFamily: 'Lato', fontWeight: 500 }}>Personal Information</h5>
        <div className="row">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Full name', value: data.fullName },
            { label: 'Gender', name: 'gender', type: 'select', options: ['Select Gender', 'Male', 'Female', 'Other'], value: data.gender },
            { label: 'Contact Number', name: 'contactNumber', type: 'text', placeholder: 'Contact number', value: data.contactNumber },
            { label: 'Email ID', name: 'email', type: 'text', placeholder: 'Enter Email', value: data.email },
            { label: 'Date of Birth', name: 'dob', type: 'date', value: data.dob },
            { label: 'Marital Status', name: 'maritalStatus', type: 'select', options: ['Select Marital Status', 'Married', 'Unmarried'], value: data.maritalStatus }
          ].map((field, index) => (
            <div className="col-12 col-md-6 formField" key={index}>
              <label style={{ fontFamily: "Lato", fontWeight: 500, whiteSpace: "nowrap" }}>{field.label} <span style={{ color: 'red' }}>*</span></label>
              {field.type === 'select' ? (
                <select className="dropdown-css form-control" style={{ fontFamily: "Lato", fontWeight: 500 }} name={field.name} value={field.value} onChange={handleInputChange}>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option === 'Select Gender' || option === 'Select Marital Status' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  style={{ fontFamily: "Lato", fontWeight: 500 }}
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <hr style={{border: "1px solid #ccc"}}/>
      <div className="main-container">
        <h5 className="heading" style={{ fontFamily: 'Lato', fontWeight: 500 }}>Mailing Address</h5>
        <div className="row">
          {[
            { label: 'Address Line 1', name: 'mailingAddressLine1', type: 'text', placeholder: 'Address Line 1', value: data.mailingAddressLine1 },
            { label: 'Address Line 2', name: 'mailingAddressLine2', type: 'text', placeholder: 'Address Line 2', value: data.mailingAddressLine2 },
            { label: 'Country', name: 'mailingCountry', type: 'text', placeholder: 'Country', value: data.mailingCountry },
            { label: 'State', name: 'mailingState', type: 'text', placeholder: 'State', value: data.mailingState },
            { label: 'City', name: 'mailingCity', type: 'text', placeholder: 'City', value: data.mailingCity },
            { label: 'Pincode', name: 'mailingPincode', type: 'text', placeholder: 'Pincode', value: data.mailingPincode }
          ].map((field, index) => (
            <div className="col-12 col-md-6 formField" key={index}>
              <label style={{ fontFamily: "Lato", fontWeight: 500, whiteSpace: "nowrap" }}>{field.label} {field.name !== 'mailingAddressLine2' && <span style={{ color: 'red' }}>*</span>}</label>
              <input
                className="form-control"
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
      <hr style={{border: "1px solid #ccc"}}/>
      <div className="main-container">
        <h5 className="heading" style={{ fontFamily: 'Lato', fontWeight: 500 }}>Permanent Address</h5>
        <div className="form-check mb-3">
        <input 
  className="form-check-input" 
  type="checkbox" 
  checked={sameAsMailing} 
  onChange={handleSameAsMailingChange} 
/>          <label className="form-check-label" style={{ fontFamily: "Lato", fontWeight: 500 }}>
            Same as Mailing Address
          </label>
        </div>
        <div className="row">
          {[
            { label: 'Address Line 1', name: 'permanentAddressLine1', type: 'text', placeholder: 'Address Line 1', value: data.permanentAddressLine1, disabled: sameAsMailing },
            { label: 'Address Line 2', name: 'permanentAddressLine2', type: 'text', placeholder: 'Address Line 2', value: data.permanentAddressLine2, disabled: sameAsMailing },
            { label: 'Country', name: 'permanentCountry', type: 'text', placeholder: 'Country', value: data.permanentCountry, disabled: sameAsMailing },
            { label: 'State', name: 'permanentState', type: 'text', placeholder: 'State', value: data.permanentState, disabled: sameAsMailing },
            { label: 'City', name: 'permanentCity', type: 'text', placeholder: 'City', value: data.permanentCity, disabled: sameAsMailing },
            { label: 'Pincode', name: 'permanentPincode', type: 'text', placeholder: 'Pincode', value: data.permanentPincode, disabled: sameAsMailing }
          ].map((field, index) => (
            <div className="col-12 col-md-6 formField" key={index}>
              <label style={{ fontFamily: "Lato", fontWeight: 500, whiteSpace: "nowrap" }}>{field.label} {field.name !== 'permanentAddressLine2' && <span style={{ color: 'red' }}>*</span>}</label>
              <input
                className="form-control"
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={handleInputChange}
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>
      </div>
      <hr style={{border: "1px solid #ccc"}}/>
      <div className="main-container">
        <h5 className="heading" style={{ fontFamily: 'Lato', fontWeight: 500 }}>Passport Information</h5>
        <div className="row">
          {[
            { label: 'Passport Number', name: 'passportNumber', type: 'text', placeholder: 'Passport Number', value: data.passportNumber },
            { label: 'Issue Country', name: 'passportIssueCountry', type: 'text', placeholder: 'Issue Country', value: data.passportIssueCountry },
            { label: 'Issue Date', name: 'passportIssueDate', type: 'date', value: data.passportIssueDate },
            { label: 'Expiry Date', name: 'passportExpiryDate', type: 'date', value: data.passportExpiryDate },
            { label: 'State of Birth', name: 'passportStateOfBirth', type: 'text', placeholder: 'State of Birth', value: data.passportStateOfBirth },
            { label: 'Country of Birth', name: 'passportCountryOfBirth', type: 'text', placeholder: 'Country of Birth', value: data.passportCountryOfBirth }
          ].map((field, index) => (
            <div className="col-12 col-md-6 formField" key={index}>
              <label style={{ fontFamily: "Lato", fontWeight: 500, whiteSpace: "nowrap" }}>{field.label} <span style={{ color: 'red' }}>*</span></label>
              <input
                className="form-control"
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="button-container mb-4 mt-3">
        <button style={{ fontFamily: "Lato", fontWeight: 500, width: '200px' }} type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  );
}
