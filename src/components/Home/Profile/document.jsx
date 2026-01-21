import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { addStudent, editStudent, getStudentDetailsById } from "../../../Services/dashboard";
import CustomLoader from "../../loader";
import { DocumentScanner } from "@mui/icons-material";
import { Button } from "react-bootstrap";

export default function ViewUserDocument() {
  const _u = JSON.parse(localStorage.getItem('_u'));
  const userId = _u?._id;
  const highlightColor = "#FF5573";
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [documentUrls, setDocumentUrls] = useState({
    tenthMarksheet: "",
    twelfthMarksheet: "",
    passport: "",
    statementOfPurpose: "",
    lettersOfRecommendation: "",
    ielts: "",
    degree: "",
    resume: "",
    additionalDocuments: "",
    greGmat: "",
    document1: "",
    document2: "",
    document3: "",
    document4: "",
    document5: ""
  });
  const [activeTab, setActiveTab] = useState(0);
  const [studentDetails, setStudentDetails] = useState({});

  const _id = _u ? _u._id : null;
  useEffect(() => {
    if (_id) {
      getStudentDetailsById(_id).then((res) => {
        setStudentDetails(res.data.data);
      });
    }
  }, [_id]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getStudentDetailsById(userId);
        if (res?.data?.data) {
          setDocumentUrls(res.data.data.documents || {});
          setData(res.data.data);
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

  const handleFileUpload = async (event, documentKey) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('https://api.edulley.com/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      setDocumentUrls(prevUrls => ({
        ...prevUrls,
        [documentKey]: responseData.url
      }));
      toast.success('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      toast.error(`Error uploading document: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openPdfPreview = (url) => {
    window.open(url, '_blank');
  };

  const toCapitalise = (text) => {
    switch (text) {
      case 'tenthMarksheet':
        return '10th Marksheet';
      case 'twelfthMarksheet':
        return '12th Marksheet';
      case 'greGmat':
        return 'GRE/GMAT';
      case 'document1':
        return 'Document 1';
      case 'document2':
        return 'Document 2';
      case 'document3':
        return 'Document 3';
      case 'document4':
        return 'Document 4';
      case 'document5':
        return 'Document 5';
      default:
        return text.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const uploadedDocuments = Object.entries(documentUrls)
      .filter(([_, url]) => url !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
    const payload = { ...data, userId: userId, documents: uploadedDocuments };
    let response;
    if (editMode) {
      response = await editStudent(payload);
    } else {
      response = await addStudent(payload);
    }
    setLoading(false);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(editMode ? 'Documents Updated successfully' : 'Documents Added successfully');
    }
  };

  const userDocuments = [
    'tenthMarksheet', 'twelfthMarksheet', 'passport', 'statementOfPurpose', 
    'lettersOfRecommendation', 'ielts', 'degree', 'resume', 'additionalDocuments', 'greGmat'
  ];

  return (
    <div>
      {loading && <CustomLoader />}
      <div style={{ display: 'flex', marginTop: "10px", marginBottom: '20px' }}>
        <Button
          variant={activeTab === 0 ? 'primary' : 'light'}
          style={{
            backgroundColor: activeTab === 0 ? '#FF6477' : '#FFF',
            color: activeTab === 0 ? '#FFF' : '#000',
            borderRadius: '20px',
            fontFamily: "Lato", fontWeight: 700,
            marginRight: '10px',
          }}
          onClick={() => setActiveTab(0)}
        >
          Uploaded by You
        </Button>
        <Button
          variant={activeTab === 1 ? 'primary' : 'light'}
          style={{
            backgroundColor: activeTab === 1 ? '#FF6477' : '#FFF',
            color: activeTab === 1 ? '#FFF' : '#000',
            borderRadius: '20px',
            fontFamily: "Lato", fontWeight: 700,
          }}
          onClick={() => setActiveTab(1)}
        >
          Uploaded by Edulley
        </Button>
      </div>
      <div className="card mb-4 welcome-card" style={{ backgroundColor: '#FFF0F0', border: 'none' }}>
        <div className="card-header" style={{ fontFamily: "Lato", fontWeight: 700 }}>Welcome to Edulley!</div>
        <div className="card-body">
          <p className="card-text mb-3" style={{ color: highlightColor, fontFamily: "Lato", fontWeight: 500 }}>
            You are just a few steps away from submitting your application
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Name : {studentDetails?.fullName || JSON.parse(localStorage.getItem('_u'))?.fullName || '--'}
            </span>
            <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Email : {studentDetails?.email || JSON.parse(localStorage.getItem('_u'))?.email || '--'}
            </span>
            <span style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Phone : {studentDetails?.contactNumber || JSON.parse(localStorage.getItem('_u'))?.mobileNumber || '--'}
            </span>
          </div>
        </div>
      </div>
      {activeTab === 0 && (
        <form onSubmit={handleSubmit}>
          <div className="main-container">
            <div className="row">
              {userDocuments.map((docKey, index) => (
                <div key={index} className="col-md-6 formField" style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <label style={{ fontFamily: 'Lato', fontWeight: 500 }}>{`${toCapitalise(docKey)}${index < 5 ? '*' : ''}`}</label>
                    <input
                      type="file"
                      name={docKey}
                      onChange={(e) => handleFileUpload(e, docKey)}
                      style={{ margin: "10px 0", fontFamily: 'Lato', fontWeight: 500 }}
                    />
                    {documentUrls[docKey] && (
                      <div style={{ width: "100%", marginTop: "10px" }}>
                        {documentUrls[docKey].toLowerCase().endsWith('.pdf') ? (
                          <button className="btn btn-link" onClick={() => openPdfPreview(documentUrls[docKey])}>View Document <DocumentScanner /></button>
                        ) : (
                          <img src={documentUrls[docKey]} alt={`${docKey}`} style={{ maxWidth: "150px", height: "150px" }} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="button-container mb-4 mt-3 float-end">
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#FF6477', borderColor: '#FF6477', fontFamily: "Lato", fontWeight: 700 }}>{editMode ? 'Update' : 'Add'} Profile</button>
            </div>
          </div>
        </form>
      )}
      {activeTab === 1 && (
        <div className="main-container">
          <div className="row">
            {Object.entries(documentUrls).filter(([key]) => key.startsWith('document')).map(([docKey, docValue], index) => (
              docValue && (
                <div key={index} className="col-md-6 formField" style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <label style={{ fontFamily: 'Lato', fontWeight: 500 }}>{`${toCapitalise(docKey)}`}</label>
                    <div style={{ width: "100%", marginTop: "10px" }}>
                      {docValue.toLowerCase().endsWith('.pdf') ? (
                        <button className="btn btn-link" onClick={() => openPdfPreview(docValue)}>View Document <DocumentScanner /></button>
                      ) : (
                        <img src={docValue} alt={`${docKey}`} style={{ maxWidth: "150px", height: "150px" }} />
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}