import React, { useState } from "react";
import StudentCard from "./StudentCard";
import indumati from "../../assets/test1.jpeg";
import charishma from "../../assets/test4.jpeg";
import rexlene from "../../assets/test2.jpeg";
import satish from "../../assets/test3.jpeg";

const videoLinks = [
  "https://www.youtube.com/embed/ai0EFyYkss8?autoplay=1&modestbranding=1",
  "https://www.youtube.com/embed/ZkNUZuF5EJ4?autoplay=1&modestbranding=1",
  "https://www.youtube.com/embed/wIvhTxohPLo?autoplay=1&modestbranding=1"
];

const testimonials = [
  {
    name: "Satish Sowreddy",
    review: "My dream has come true only because of Edulley. I enquired with many consultancies, but luckily I came to know about Edulley through Quora. They maintain transparency from the application process until we get the visa. Big thanks to the team!",
    image: satish
  },
  {
    name: "Rexlene Ramya",
    review: "I want to express my deepest gratitude to Muskan from Edulley for her exceptional support in securing my husband's open spouse work permit. Team's dedication and efficient handling of the process made everything so much easier.",
    image: rexlene
  },
  {
    name: "Indumathi Natrajan",
    review: "Edulley is a one-stop solution for study abroad aspirants. It had been a great experience throughout for myCanada visa. The team was able to understand my aspirations and guided me in the right direction. I recommend it to anyone aspiring to study abroad.",
    image: indumati
  },
  {
    name: "Charishma Varra",
    review: "Joining the University of Liverpool has been a dream, and I owe a massive thanks to Ms. Muskan and the incredible team at Edulley! Ms. Muskan took care of the entire process, making everything smooth and stress-free.",
    image: charishma
  }
];

const StudentSays = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const videoClickHandler = () => {
    setVideoPlaying(true);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
    setVideoPlaying(false);
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoLinks.length - 1 : prevIndex - 1
    );
    setVideoPlaying(false);
  };

  return (
    <div className="most-searched-countries-container featured-university-container br-b-0 py-5">
      <div className="container">
        <h2 className="what-we-can-do-title" style={{ fontFamily: "Lato", fontWeight: 700 }}>Success Stories</h2>
        {/* <p className="what-we-can-do-description" style={{ fontFamily: "Lato", fontWeight: 500 }}>
          Check out what our students have to say about us. We have helped thousands of students in their study abroad journey and their feedback will lighten up your day.
        </p> */}
      </div>
      <div className="my-5 content-container-what-student position-relative">
        <div className="video-container">
          {isVideoPlaying ? (
            <div className="position-relative">
              <iframe
                title="YouTube video"
                width="100%"
                height="400px"
                src={videoLinks[currentVideoIndex]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                style={{
                  width: "36px",
                  height: "36px",
                  position: "absolute",
                  top: "50%",
                  right: "19rem",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
                variant="primary"
                className="mr-2 btn btn-primary prev-button"
                onClick={handlePreviousVideo}
              >
                {"<"}
              </button>
              <button
                style={{
                  width: "36px",
                  height: "36px",
                  position: "absolute",
                  top: "50%",
                  left: "19rem",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
                variant="primary"
                className="ml-2 btn btn-primary next-button"
                onClick={handleNextVideo}
              >
                {">"}
              </button>
            </div>
          ) : (
            <>
              <div className="d-flex flex-direction-col position-relative">
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    position: "absolute",
                    top: "50%",
                    right: "19rem",
                    transform: "translateY(-50%)",
                  }}
                  variant="primary"
                  className="mr-2 btn btn-primary prev-button"
                  onClick={handlePreviousVideo}
                >
                  {"<"}
                </button>
                <div>
                  <iframe
                    style={{ borderRadius: "24px" }}
                    src={`https://www.youtube.com/embed/${videoLinks[currentVideoIndex].split("embed/")[1].split("?")[0]}`}
                    width="100%"
                    height="400px"
                    frameBorder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    position: "absolute",
                    top: "50%",
                    left: "19rem",
                    transform: "translateY(-50%)",
                  }}
                  variant="primary"
                  className="ml-2 btn btn-primary next-button"
                  onClick={handleNextVideo}
                >
                  {">"}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="ml-5 reviews-container-what-student">
          {testimonials.map((testimonial, index) => (
            <StudentCard
              key={index}
              image={testimonial.image}
              name={testimonial.name}
              review={testimonial.review}
              stars={5}
              style={{ borderRadius: "22px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSays;