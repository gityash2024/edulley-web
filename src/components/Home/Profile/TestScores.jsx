import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { addStudent, editStudent, getStudentDetailsById } from "../../../Services/dashboard";
import CustomLoader from "../../loader";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TestScores({updateState}) {
  const _u = JSON.parse(localStorage.getItem('_u'))
  const userId = _u?._id
  const [editMode, setEditMode] = useState(false);
  const [editModeData, setEditModeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [testScores, setTestScores] = useState({
    ieltsOverall: "",
    ieltsDateOfExam: "",
    ieltsYetToTake: false,
    ieltsLookingForWaiver: false,
    ieltsOtherTest: false
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getStudentDetailsById(userId);
        if (res?.data?.data) {
          setTestScores({
            ieltsOverall: res?.data?.data?.tests?.ieltsOverall,
            ieltsDateOfExam: res?.data?.data?.tests?.ieltsDateOfExam?.split("T")[0],
            ieltsYetToTake: res?.data?.data?.tests?.ieltsYetToTake,
            ieltsLookingForWaiver: res?.data?.data?.tests?.ieltsLookingForWaiver,
            ieltsOtherTest: res?.data?.data?.tests?.ieltsOtherTest
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestScores(prevScores => ({ ...prevScores, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTestScores(prevScores => {
      const updatedScores = { ...prevScores, [name]: checked };
      if (checked) {
        if (name === "ieltsYetToTake") {
          updatedScores.ieltsLookingForWaiver = false;
          updatedScores.ieltsOtherTest = false;
        } else if (name === "ieltsLookingForWaiver") {
          updatedScores.ieltsYetToTake = false;
          updatedScores.ieltsOtherTest = false;
        } else if (name === "ieltsOtherTest") {
          updatedScores.ieltsYetToTake = false;
          updatedScores.ieltsLookingForWaiver = false;
        }
      }
      return updatedScores;
    });
  };

  const validateFields = () => {
    const { ieltsOverall, ieltsDateOfExam, ieltsYetToTake, ieltsLookingForWaiver, ieltsOtherTest } = testScores;
    if (!ieltsYetToTake && !ieltsLookingForWaiver && !ieltsOtherTest) {
      if (!ieltsOverall || !ieltsDateOfExam) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }
    const payload = {
      tests: {
        ...testScores
      }
    };
    let response;
    if (editMode) {
      payload.userId = userId
      response = await editStudent(payload);
    } else {
      payload.userId = userId
      response = await addStudent(payload);
    }
    updateState('applications');

    // updateState(1);

    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success('Profile Data Updated successfully');
    }
  };

  const isAnyCheckboxChecked = testScores.ieltsYetToTake || testScores.ieltsLookingForWaiver || testScores.ieltsOtherTest;

  return (
    <form onSubmit={handleSubmit}>
      {loading && <CustomLoader />}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={{ fontFamily: "Lato", fontWeight: 500 }}>IELTS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="overview-container mb-4">
            <div className="row">
              <div className="col-12 col-md-6 formField">
                <label style={{ fontFamily: "Lato", fontWeight: 500 }}>
                  Overall Score{!isAnyCheckboxChecked && <span style={{ color: 'red' }}>*</span>}
                </label>
                <input
                  style={{ fontFamily: "Lato", fontWeight: 500 }}
                  type="text"
                  name="ieltsOverall"
                  placeholder="Enter your overall score"
                  value={testScores.ieltsOverall}
                  onChange={handleInputChange}
                  disabled={isAnyCheckboxChecked}
                />
              </div>
              <div className="col-12 col-md-6 formField">
                <label style={{ fontFamily: "Lato", fontWeight: 500 }}>
                  Date of Exam{!isAnyCheckboxChecked && <span style={{ color: 'red' }}>*</span>}
                </label>
                <input
                  style={{ fontFamily: "Lato", fontWeight: 500 }}
                  type="date"
                  name="ieltsDateOfExam"
                  placeholder="Date of Exam"
                  value={testScores.ieltsDateOfExam}
                  onChange={handleInputChange}
                  disabled={isAnyCheckboxChecked}
                />
              </div>
              <div className="col-12 formField" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                <label style={{ fontFamily: "Lato", fontWeight: 500 }}>
                  <input
                    style={{ fontFamily: "Lato", fontWeight: 500 }}
                    type="checkbox"
                    name="ieltsYetToTake"
                    className="mr-2"
                    checked={testScores.ieltsYetToTake}
                    onChange={handleCheckboxChange}
                  />
                  Yet to take this test
                </label>
              </div>
              <div className="col-12 formField" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                <label style={{ fontFamily: "Lato", fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    style={{ fontFamily: "Lato", fontWeight: 500 }}
                    className="mr-2"
                    name="ieltsLookingForWaiver"
                    checked={testScores.ieltsLookingForWaiver}
                    onChange={handleCheckboxChange}
                  />
                  Looking for a Waiver
                </label>
              </div>
              <div className="col-12 formField" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                <label style={{ fontFamily: "Lato", fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    style={{ fontFamily: "Lato", fontWeight: 500 }}
                    className="mr-2"
                    name="ieltsOtherTest"
                    checked={testScores.ieltsOtherTest}
                    onChange={handleCheckboxChange}
                  />
                  I have taken other test
                </label>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="button-container mb-4 mt-3">
        <button style={{ fontFamily: "Lato", fontWeight: 500, width: '200px' }} type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Submit'} Profile</button>
      </div>
    </form>
  );
}