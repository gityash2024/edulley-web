import instance from './httpInterceptor';
import {config} from '../env/env.tsx';

const getBlogs = () => {
  return instance.get(`${config?.baseUrl}v1/blog/list`);
};

const getBlogsPaginated = (pageNumber, pageSize) => {
  return instance.get(`${config?.baseUrl}v1/blog/list/pagination?page=${pageNumber}&size=${pageSize}`);
};

const getCareerPaths = () => {
  return instance.get(`${config?.baseUrl}v1/careerPath/list`);
};

const getCareerPathsPaginated = (pageNumber, pageSize) => {
  return instance.get(`${config?.baseUrl}v1/careerPath/list/pagination?page=${pageNumber}&size=${pageSize}`);
};

const getScholarships = () => {
  return instance.get(`${config?.baseUrl}v1/scholarship/list`);
};

const getScholarshipsPaginated = (pageNumber, pageSize) => {
  return instance.get(`${config?.baseUrl}v1/scholarship/list/pagination?page=${pageNumber}&size=${pageSize}`);
};

const getStudents = () => {
  return instance.get(`${config?.baseUrl}v1/student/list`);
};

const getStudentsPaginated = (pageNumber, pageSize) => {
  return instance.get(`${config?.baseUrl}v1/student/list/pagination?page=${pageNumber}&size=${pageSize}`);
};

const getApplications = () => {
  return instance.get(`${config?.baseUrl}v1/application/list`);
};

const getApplicationsPaginated = (pageNumber, pageSize) => {
  return instance.get(`${config?.baseUrl}v1/application/list/pagination?page=${pageNumber}&size=${pageSize}`);
};

const getUniversities = () => {
  return instance.get(`${config?.baseUrl}v1/institute/list`);
}
const getCourses = () => {
  return instance.get(`${config?.baseUrl}v1/course/list`);
}

const getScholarship=()=>{
  return instance.get(`${config?.baseUrl}v1/scholarship/list`)
}
 const addStudent = (payload) => {
  const url = `${config.baseUrl}v1/student/add/new`;
  return instance.post(url, payload);
};

 const editStudent = (payload) => {
  const url = `${config.baseUrl}v1/student/edit`;
  return instance.post(url, payload);
};

const getStudentDetailsById = (id) => {
  const useQueryParams={userId:id}
  const url = `${config.baseUrl}v1/student/id/details?${new URLSearchParams(useQueryParams).toString()}`;
  return instance.get(url);
  // return instance.get(`${config.baseUrl}v1/student/id/details?userId=${id}`);

}


const applyApplication = (payload) => {
  const url = `${config.baseUrl}v1/application/apply`;
  return instance.post(url, payload);
}

const createTransaction=(payload)=>{
  const url = `${config.baseUrl}v1/transaction/razorPay/create`;
  return instance.post(url, payload);
}
const verifyTransaction=(payload)=>{
  const url = `${config.baseUrl}v1/transaction/verify/razorPay`;
  return instance.post(url, payload);
}
const submitFeedBack=(payload)=>{
  const url = `${config.baseUrl}v1/users/create/interest`;
  return instance.post(url, payload);
}
export const getApplicationChat = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${config.baseUrl}v1/chat/application/list?${queryString}`;
  return instance.get(url);
}
export const createApplicationChat = (payload) => {
  const url = `${config.baseUrl}v1/chat/application`;
  return instance.post(url,payload);
}
export const getCareerPathsListing = () => {
  const url = `${config.baseUrl}v1/careerPath/list`;
  return instance.get(url);
}

export const toggleShortlistAPI = (id) => {
  // const url = `${config.baseUrl}v1/course/toggle-shortlist`;
  // return instance.post(url);
  const url = `${config.baseUrl}v1/course/toggle-shortlist`;
  return instance.post(url, {courseId:id});
}



export {
  getBlogs,
  getCourses,
  applyApplication,
  verifyTransaction,
  
  getScholarship,
  getUniversities,
  getBlogsPaginated,
  createTransaction,
  getCareerPaths,
  getCareerPathsPaginated,
  getScholarships,
  getScholarshipsPaginated,
  getStudents,
  addStudent,
  editStudent,
  getStudentsPaginated,
  getApplications,
  getApplicationsPaginated,
  submitFeedBack,
  getStudentDetailsById
};
