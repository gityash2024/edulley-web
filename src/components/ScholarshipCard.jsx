import React from "react";

const ScholarshipCard = ({ scholarship, universities }) => {
  const formatName = (name) => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word.charAt(0)?.toUpperCase() + word?.slice(1))
        .join(" ");
    }
  };

  const getUniversityCountry = (universityName) => {
    console.log(universities);
    console.log(universityName);
    const university = universities?.find(
      (uni) => uni?.universityName?.toLowerCase()?.trim() === universityName?.toLowerCase()?.trim()
    );
    return university ? university?.country : "";
  };

  return (
    <div className="course_card mt-0">
      <h4 style={{ fontFamily: "Lato", fontWeight: 700 }}>{formatName(scholarship?.name)}({scholarship?.level || 0})</h4>
      <h4 style={{ fontFamily: "Lato", fontWeight: 500 }}>{formatName(scholarship?.universityName)} <small>({getUniversityCountry(scholarship?.universityName)||'--'})</small></h4>
      {/* <p style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "14px" }}></p> */}
      <div className="inner_card gap-2">
        <div>
          <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 700 }}>Amount</p>
          <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>${scholarship?.amount?.toString() || 0}</p>
        </div>
        <div>
          <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 700 }}>Deadline</p>
          <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>{scholarship?.deadline?.split('T')[0]}</p>
        </div>
        <div>
          <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 700 }}>Course Name</p>
          <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>{scholarship?.coursesName || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;