//Author:
import video from "../assets/videos/background.mp4";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/images/arrow.png";
import { Card, CardContent, Button } from "@mui/material";
import "../App.css";
import { theme } from "../utils";

export const LandingPage = () => {
  const navigate = useNavigate();

  const buttonClicked = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        <div
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightblue",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "4rem",
                fontFamily: "monospace",
              }}
            >
              DalCSHub
            </h1>

            <h1 style={{ color: "white", textAlign: "center" }}>
              We promise to elevate your learning, together.
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              {/* Reference Link:  https://www.freeiconspng.com/img/41944
              Date accessed: 19 June, 2023
              Help taken: The arrow image was taken from this link
          */}
              <img
                src={arrow}
                alt={"arrow"}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>

          <video
            autoPlay
            muted
            loop
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              filter: "brightness(50%)",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            {/* Reference Link:  https://www.pexels.com/video/high-speed-photography-of-blue-ink-diffusion-in-water-9669109/
              Date accessed: 18 June, 2023
              Help taken: The background content was taken from this link
          */}
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <Card
              style={{
                flex: "1 0 400px",
                color: "white",
                backgroundColor: theme.palette.background.secondary,
              }}
            >
              <CardContent>
                <h2>Student</h2>
                <p>Welcome DalCSHubers! </p>
                <p>
                  Connect with your colleagues and access a comprehensive
                  platform for sharing insights and inquiries about various
                  university courses.
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                flex: "1 0 400px",
                color: "white",
                backgroundColor: theme.palette.background.secondary,
              }}
            >
              <CardContent>
                <h2>Teacher</h2>
                <p>Welcome to DalCSHub!</p>
                <p>
                  Engage with your students, effortlessly share course content,
                  and foster exciting discussions through our user-friendly
                  platform.
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                flex: "1 0 400px",
                color: "white",
                backgroundColor: theme.palette.background.secondary,
              }}
            >
              <CardContent>
                <h2>Alumni</h2>
                <p>Welcome to DalCSHub!</p>
                <p>
                  Join the Dalhousie University Computer Science Society to
                  mentor current students and share your valuable experiences,
                  while connecting with like-minded individuals in the field of
                  computer science.
                </p>
              </CardContent>
            </Card>
          </div>
          <Button
            variant="contained"
            onClick={buttonClicked}
            style={{ marginTop: "2rem" }}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};
