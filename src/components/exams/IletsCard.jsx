import React from "react";

const IletsCard = () => {
  return (
    <div className="course_card mt-0" style={{ backgroundColor: "rgb(243 243 243 / 47%)" }}>
      <div>
        <h4 style={{fontFamily: "Lato", fontWeight: 700}}>Overview</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        A typical letter of recommendation (LOR) follows a structured format, starting with the sender's contact information, date, and recipient's details, followed by a formal salutation on the official letterhead of the organization. The introduction should state the sender's relationship with the applicant and the context in which they know them. The body of the letter should provide specific examples and anecdotes that illustrate the applicant's qualities, skills, and achievements relevant to the program or position they are applying for. The conclusion should summarize the recommendation and express confidence in the applicant's abilities. The letter should close with a polite closing and the sender's signature, if possible. It's important to tailor the content and tone of the letter to the specific requirements of the recipient and to ensure that it is well-organized, clear, and concise.

        </p>
      </div>
    
      
      <div className="mt-4">
        <h4   style={{fontFamily: "Lato", fontWeight: 700}}>IELTS Syllabus</h4>
        <p className=" mb-5" style={{fontFamily: 'Lato', fontWeight: 500}}>
        The IELTS (International English Language Testing System) syllabus covers four key language skills: Listening, Reading, Writing, and Speaking. The Listening section involves listening to recordings and answering questions, testing your ability to understand spoken English in various contexts. The Reading section assesses your reading comprehension through passages from different sources, requiring you to identify main ideas and details. In the Writing section, you'll complete tasks like describing visual information and writing an essay, demonstrating your ability to organize and express ideas in written English. Here is a quick comprehensive guide about IELTS syllabus:

        </p>
        <div className="table-container mt-[150px]">
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{fontFamily: 'Lato', fontWeight: 500}}>Section</th>
                            <th style={{fontFamily: 'Lato', fontWeight: 500}}>Number of Questions and Duration</th>
                            <th style={{fontFamily: 'Lato', fontWeight: 500}}>Content</th>
                            <th style={{fontFamily: 'Lato', fontWeight: 500}}>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td data-label="Section"  style={{fontFamily: 'Lato', fontWeight: 500}}>Listening</td>
                            <td data-label="Number of Questions and Duration"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Four recordings, 40 questions, 30 minutes + 10
                              minutes (transfer time)
                            </td>
                            <td data-label="Content"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Four recorded monologues and conversations.
                            </td>
                            <td data-label="Remarks"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              A correct answer is awarded one mark, and the
                              final score is provided as a band score in the
                              range of 1-9.
                            </td>
                          </tr>
                          <tr>
                            <td data-label="Section"  style={{fontFamily: 'Lato', fontWeight: 500}}>Reading</td>
                            <td data-label="Number of Questions and Duration"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              40 questions <br />
                              60 minutes
                            </td>
                            <td data-label="Content"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Three passages which can be analytical, factual,
                              discursive, or descriptive.
                            </td>
                            <td data-label="Remarks"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Each correct answer is awarded one mark, and the
                              final score is provided as a band score in the
                              range of 1-9.
                            </td>
                          </tr>
                          <tr>
                            <td data-label="Section"  style={{fontFamily: 'Lato', fontWeight: 500}}>Writing</td>
                            <td data-label="Number of Questions and Duration" style={{fontFamily: 'Lato', fontWeight: 500}}>
                              60 minutes
                            </td>
                            <td data-label="Content"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Task1: Summarize or describe a table, graph,
                              chart, or diagram in at least 150 words.
                              <br />
                              Task2: Short essay task of at least 250 words.
                            </td>
                            <td data-label="Remarks"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              The contribution of Task 2 is twice that of Task 1
                              in the final writing score.
                            </td>
                          </tr>
                          <tr>
                            <td data-label="Section"  style={{fontFamily: 'Lato', fontWeight: 500}}>Speaking </td>
                            <td data-label="Number of Questions and Duration" style={{fontFamily: 'Lato', fontWeight: 500}}>
                              11 to 14 minutes{" "}
                            </td>
                            <td data-label="Content"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Face-to-face interview with three parts which are
                              recorded.
                              <br />
                              The first part involves answering short questions.
                              <br />
                              The second part involves speaking at length about
                              a general topic, followed by a structured
                              discussion in the third part.
                            </td>
                            <td data-label="Remarks"  style={{fontFamily: 'Lato', fontWeight: 500}}>
                              Each part of the test assesses speaking skills in
                              different ways, like interaction pattern, task
                              input, and test taker output.
                            </td>
                          </tr>
                          {/* Repeat for other rows */}
                        </tbody>
                      </table>
                    </div>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>IELTS Preparation</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>You should take a practice test because that is the best way to identify your weaknesses. It is crucial for students to understand what to expect from the test format before they start practicing. Reviewing each section's test content, questions, and task types can help students become more familiar with it. The last piece of advice is to start exam preparation at least three to six months in advance.</p>
        <h4 style={{fontFamily: "Lato", fontWeight: 700}} className="mt-3">Test Format</h4>

        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Familiarizing yourself with the format of the IELTS exam is crucial for effective preparation. The exam consists of four sections: Listening, Reading, Writing, and Speaking. Each section is designed to assess different aspects of your English language skills. The Listening section involves listening to recordings and answering questions. The Reading section requires you to read passages and answer questions. The Writing section includes writing tasks such as essays and reports. Finally, the Speaking section involves a face-to-face interview with an examiner. Understanding the format of each section will help you know what to expect on the exam day and prepare accordingly.
        
        </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>Language Skills</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Improving your English language skills is essential for performing well on the IELTS exam. Focus on developing your vocabulary, grammar, reading, writing, listening, and speaking skills. Reading books, newspapers, and articles in English can help you improve your vocabulary and reading skills. Writing essays and reports regularly can enhance your writing skills. Listening to English podcasts, watching English movies, and speaking with native English speakers can improve your listening and speaking skills. Additionally, consider taking an English language course or working with a tutor to improve your overall language proficiency.

        </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>
        Practice Regularly
        </h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Regular practice is key to improving your performance on the IELTS exam. Use official IELTS practice materials to familiarize yourself with the types of questions you will encounter on the exam. Take full-length practice tests to simulate exam conditions and improve your time management skills. Practice each section of the exam regularly to build your confidence and identify areas for improvement. Set aside dedicated time each day for practice and make it a priority in your study schedule.

        </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}} >Develop Time Management Skills</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        : Time management is crucial for success on the IELTS exam. Each section of the exam is timed, and you will need to complete all questions within the allotted time. Practice managing your time effectively during practice tests to ensure you can complete each section within the given time limits. Learn to pace yourself and prioritize questions based on their difficulty. Developing good time management skills will help you stay calm and focused during the exam and maximize your chances of success.
        </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>Focus on Weak Areas</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Identifying and focusing on your weak areas is essential for improving your performance on the IELTS exam. After taking practice tests, review your answers and identify any patterns of mistakes or areas where you struggled. Focus on improving these areas through targeted practice and study. For example, if you struggle with the Reading section, practice reading passages and answering questions to improve your reading comprehension skills. If you find the Speaking section challenging, practice speaking English with a tutor or language partner to improve your fluency and pronunciation. By focusing on your weak areas, you can improve your overall performance on the exam.
        </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>Use English in Daily Life</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Immersing yourself in the English language on a daily basis can help improve your language skills and prepare you for the IELTS exam. Try to use English in your daily life as much as possible. Read English books, newspapers, and magazines to improve your reading skills. Watch English movies and TV shows to improve your listening skills. Practice speaking English with friends, family members, or language partners to improve your speaking skills. By using English in daily life, you can become more comfortable with the language and improve your overall proficiency.        </p>
      </div>
      <div className="mt-4" >
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>Seek Feedback</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Getting feedback on your writing and speaking is crucial for improving your performance on the IELTS exam. Ask a teacher, tutor, or language exchange partner to review your writing and provide feedback on areas for improvement. Practice speaking English with a tutor or language partner and ask for feedback on your pronunciation, fluency, and grammar. Use this feedback to identify areas for improvement and work on them. Seeking feedback from others can help you improve your language skills and perform better on the exam.         </p>
      </div>
      <div className="mt-4">
        <h4  style={{fontFamily: "Lato", fontWeight: 700}}>Stay Motivated</h4>
        <p style={{fontFamily: 'Lato', fontWeight: 500}}>
        Staying motivated throughout your preparation is key to success on the IELTS exam. Set realistic goals for your study schedule and track your progress towards these goals. Celebrate your achievements along the way to stay motivated. Find ways to make your study routine enjoyable, such as listening to music or studying in a quiet, comfortable environment. Remind yourself of the reasons why you are taking the IELTS exam and stay focused on your goals. By staying motivated, you can overcome challenges and stay committed to your preparation.    </p>  </div>
    </div>
  );
};

export default IletsCard;
