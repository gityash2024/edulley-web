import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { addStudent, editStudent, getStudentDetailsById } from "../../../Services/dashboard";
import CustomLoader from "../../loader";

export default function AcademicProfile({updateState}) {
  const _u=JSON.parse(localStorage.getItem('_u'))
  const userId=_u?._id
  const [loading, setLoading] = useState(false);
  const [editMode,  setEditMode] = useState(false);
  const [data, setData] = useState({
    tenthInstitutionName: "",
    tenthBoard: "",
    tenthScore: "",
    tenthYearOfCompletion: "",
    tenthSpecialization: "",
    twelfthInstitutionName: "",
    twelfthBoard: "",
    twelfthScore: "",
    twelfthYearOfCompletion: "",
    twelfthSpecialization: "",
    ugInstitutionName: "",
    ugBoard: "",
    ugScore: "",
    ugYearOfCompletion: "",
    ugSpecialization: "",
    pgInstitutionName: "",
    pgBoard: "",
    pgScore: "",
    pgYearOfCompletion: "",
    pgSpecialization: "",
  });
const [editModeData, setEditModeData] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getStudentDetailsById(userId);
        console.log(res, '--------------------');
        if (res?.data?.data) {
          console.log(res?.data?.data, '-----------------------get student by id response');
          setData({
            tenthInstitutionName: res?.data?.data?.academicProfile?.secondary?.instituteName,
            tenthBoard: res?.data?.data?.academicProfile?.secondary?.board,
            tenthScore: res?.data?.data?.academicProfile?.secondary?.score,
            tenthYearOfCompletion: res?.data?.data?.academicProfile?.secondary?.completionYear,
            tenthSpecialization: res?.data?.data?.academicProfile?.secondary?.specialization,
            twelfthInstitutionName: res?.data?.data?.academicProfile?.seniorSecondary?.instituteName,
            twelfthBoard: res?.data?.data?.academicProfile?.seniorSecondary?.board,
            twelfthScore: res?.data?.data?.academicProfile?.seniorSecondary?.score,
            twelfthYearOfCompletion: res?.data?.data?.academicProfile?.seniorSecondary?.completionYear,

            twelfthSpecialization: res?.data?.data?.academicProfile?.seniorSecondary?.specialization,
            ugInstitutionName: res?.data?.data?.academicProfile?.UG?.instituteName,
            ugBoard: res?.data?.data?.academicProfile?.UG?.board,
            ugScore: res?.data?.data?.academicProfile?.UG?.score,
            ugYearOfCompletion: res?.data?.data?.academicProfile?.UG?.completionYear,
            ugSpecialization: res?.data?.data?.academicProfile?.UG?.specialization,
            pgInstitutionName: res?.data?.data?.academicProfile?.PG?.instituteName,
            pgBoard: res?.data?.data?.academicProfile?.PG?.board,
            pgScore: res?.data?.data?.academicProfile?.PG?.score,
            pgYearOfCompletion: res?.data?.data?.academicProfile?.PG?.completionYear,
            pgSpecialization: res?.data?.data?.academicProfile?.PG?.specialization,

          });
          setEditModeData(res?.data?.data)
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

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value && name !== 'tenthSpecialization' && name !=='ugInstitutionName' && name !=='ugBoard' && name !== 'ugScore' && name !== 'ugYearOfCompletion' && name !== 'ugSpecialization'  && name !== 'pgInstitutionName' && name !== 'pgBoard' && name !== 'pgScore' && name !== 'pgYearOfCompletion' && name !== 'pgSpecialization') {
      setErrors(prev => ({ ...prev, [name]: "This field is required" }));
      return false;
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = Object.keys(data).every((key) => validateField(key, data[key]));
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }
    const payload = {
      academicProfile: {
        secondary: {
          instituteName: data.tenthInstitutionName,
          board: data.tenthBoard,
          score: data.tenthScore,
          completionYear: data.tenthYearOfCompletion,
          specialization: data.tenthSpecialization
        },
        seniorSecondary: {
          instituteName: data.twelfthInstitutionName,
          board: data.twelfthBoard,
          score: data.twelfthScore,
          completionYear: data.twelfthYearOfCompletion,
          specialization: data.twelfthSpecialization
        },
        UG: {
          instituteName: data.ugInstitutionName,
          board: data.ugBoard,
          score: data.ugScore,
          completionYear: data.ugYearOfCompletion,
          specialization: data.ugSpecialization
        },
        PG: {
          instituteName: data.pgInstitutionName,
          board: data.pgBoard,
          score: data.pgScore,
          completionYear: data.pgYearOfCompletion,
          specialization: data.pgSpecialization
        }
      }
    };
    let response;
    if(editMode){
      payload.userId=userId
      response = editStudent(payload);

    }else{
      payload.userId=userId

      response = addStudent(payload);
    }
    if(response.error) {
      toast.error(response.message);
    } else {
      updateState(3);
      
      toast.success('Profile Data Updated successfully');

    }
    console.log("Submitted Data:", payload);
  };
  return (
    <form onSubmit={handleSubmit}>
      {loading&&<CustomLoader/>}
      <div className="main-container">
        <h5 className="heading" style={{fontFamily:"Lato", fontWeight: 500}}>10th</h5>
        <div className="row">
          <div className="col-12 col-md-6 formField">
            <label style={{fontFamily:"Lato", fontWeight: 500}}>Institution Name<span style={{ color: 'red' }}>*</span></label>
            <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="tenthInstitutionName" value={data.tenthInstitutionName} onChange={handleInputChange} placeholder="Enter institution name" />
          </div>
          <div className="col-12 col-md-6 formField">
            <label style={{fontFamily:"Lato", fontWeight: 500}}>Board<span style={{ color: 'red' }}>*</span></label>
            <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="tenthBoard" value={data.tenthBoard} onChange={handleInputChange} placeholder="Enter board name" />
          </div>
          <div className="col-12 col-md-6 formField">
            <label style={{fontFamily:"Lato", fontWeight: 500}}>Score (%)<span style={{ color: 'red' }}>*</span></label>
            <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="tenthScore" value={data.tenthScore} onChange={handleInputChange} placeholder="Enter score" />
          </div>
          <div className="col-12 col-md-6 formField">
            <label style={{fontFamily:"Lato", fontWeight: 500}}>Year of Completion<span style={{ color: 'red' }}>*</span></label>
            <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="tenthYearOfCompletion" value={data.tenthYearOfCompletion} onChange={handleInputChange} placeholder="Enter year of completion" />
            </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Specialization<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="tenthSpecialization" value={data.tenthSpecialization} onChange={handleInputChange} placeholder="Enter specialization" />
        </div>
      </div>
    </div>
    <hr style={{border: "1px solid #ccc"}}/>

    <div className="main-container">
      <h5 className="heading" style={{fontFamily:"Lato", fontWeight: 500}}>Senior Secondary (11th-12th)</h5>
      <div className="row">
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Institution Name<span style={{ color: 'red' }}>*</span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="twelfthInstitutionName" value={data.twelfthInstitutionName} onChange={handleInputChange} placeholder="Enter institution name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Board<span style={{ color: 'red' }}>*</span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="twelfthBoard" value={data.twelfthBoard} onChange={handleInputChange} placeholder="Enter board name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Score (%)<span style={{ color: 'red' }}>*</span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="twelfthScore" value={data.twelfthScore} onChange={handleInputChange} placeholder="Enter score" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Year of Completion<span style={{ color: 'red' }}>*</span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="twelfthYearOfCompletion" value={data.twelfthYearOfCompletion} onChange={handleInputChange} placeholder="Enter year of completion" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Specialization<span style={{ color: 'red' }}>*</span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="twelfthSpecialization" value={data.twelfthSpecialization} onChange={handleInputChange} placeholder="Enter specialization" />
        </div>
      </div>
    </div>
    <hr style={{border: "1px solid #ccc"}}/>
    <div className="main-container">
      <h5 className="heading" style={{fontFamily:"Lato", fontWeight: 500}}>UG (Undergraduate)</h5>
      <div className="row">
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Institution Name<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="ugInstitutionName" value={data.ugInstitutionName} onChange={handleInputChange} placeholder="Enter institution name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Board<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="ugBoard" value={data.ugBoard} onChange={handleInputChange} placeholder="Enter board name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Score (%)<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="ugScore" value={data.ugScore} onChange={handleInputChange} placeholder="Enter score" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Year of Completion<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="ugYearOfCompletion" value={data.ugYearOfCompletion} onChange={handleInputChange} placeholder="Enter year of completion" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Specialization<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="ugSpecialization" value={data.ugSpecialization} onChange={handleInputChange} placeholder="Enter specialization" />
        </div>
      </div>
    </div>
    <hr style={{border: "1px solid #ccc"}}/>

    <div className="main-container">
      <h5 className="heading" style={{fontFamily:"Lato", fontWeight: 500}}>PG (Postgraduate)</h5>
      <div className="row">
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Institution Name<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="pgInstitutionName" value={data.pgInstitutionName} onChange={handleInputChange} placeholder="Enter institution name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Board<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="pgBoard" value={data.pgBoard} onChange={handleInputChange} placeholder="Enter board name" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Score (%)<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="pgScore" value={data.pgScore} onChange={handleInputChange} placeholder="Enter score" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Year of Completion<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="pgYearOfCompletion" value={data.pgYearOfCompletion} onChange={handleInputChange} placeholder="Enter year of completion" />
        </div>
        <div className="col-12 col-md-6 formField">
          <label style={{fontFamily:"Lato", fontWeight: 500}}>Specialization<span style={{ color: 'red' }}></span></label>
          <input style={{fontFamily:"Lato", fontWeight: 500}} type="text" name="pgSpecialization" value={data.pgSpecialization} onChange={handleInputChange} placeholder="Enter specialization" />
        </div>
      </div>
    </div>

    <div className="button-container mb-4 mt-3">
      <button style={{fontFamily:"Lato", fontWeight: 500, width: '200px'}} type="submit" className="btn btn-primary">Next</button>
    </div>
  </form>
);
}
