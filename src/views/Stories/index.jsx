import * as React from "react";
import {
	Backdrop,
	Box,
	Modal,
	Grow,
	Button,
	Typography,
	Fade,
	Zoom,
	styled,
} from "@mui/material";
import "./index.css";

const imagesArr = [
	"https://images.pexels.com/photos/18816017/pexels-photo-18816017/free-photo-of-empty-highway-surrounded-by-trees-during-a-foggy-weather.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18000249/pexels-photo-18000249/free-photo-of-a-photo-of-a-food-stand-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/13909946/pexels-photo-13909946.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/7873841/pexels-photo-7873841.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18551704/pexels-photo-18551704/free-photo-of-man-and-woman-holding-hands-at-a-sea-beach.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18721030/pexels-photo-18721030/free-photo-of-church-tower-behind-trees.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/15547144/pexels-photo-15547144/free-photo-of-a-snowy-mountain-with-trees-on-top.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18796548/pexels-photo-18796548/free-photo-of-way-of-water.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/12389195/pexels-photo-12389195.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18854123/pexels-photo-18854123/free-photo-of-el-micalet-valencia.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/15114678/pexels-photo-15114678/free-photo-of-photo-of-a-person-running-around-columns.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/6981693/pexels-photo-6981693.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18693566/pexels-photo-18693566/free-photo-of-a-small-pagoda-on-a-lake-surrounded-by-trees.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18831203/pexels-photo-18831203/free-photo-of-view-of-mountains-under-a-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/12229002/pexels-photo-12229002.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18091873/pexels-photo-18091873/free-photo-of-a-street-sign-that-says-valla-port.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18624946/pexels-photo-18624946/free-photo-of-model-posing-in-black-clothes-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18622543/pexels-photo-18622543/free-photo-of-go-home.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/15030785/pexels-photo-15030785/free-photo-of-a-mountain-with-trees-and-grass-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18642137/pexels-photo-18642137/free-photo-of-train-on-track-near-buildings.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18720682/pexels-photo-18720682/free-photo-of-girl-at-rural.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
];

const StyledMain = styled(Box)(({ theme }) => ({
	position: "absolute",
	width: "80%",
	height: "50%",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "red",
	boxShadow: 24,
	p: 4,
}));

function Stories() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const parentDiv = document.querySelector(".slider-wrapper");
    const slidItems = document.querySelectorAll(".slider-item");
    slidItems.forEach((item) =>
      item.addEventListener("click", () => console.log("clicked"))
    );
  }, []);

  return (
    <Zoom in={open} timeout={500}>
      <Box
        sx={{
          backgroundColor: "#2b2424",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* sliderSection */}
        <Box
          sx={{
            backgroundColor: "#ffff",
            width: { xs: "100%", md: "85%" },
            maxWidth: { xs: "100%", md: "85%" },
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "0.5rem",
            padding: "1rem",
            position: "relative",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollSnapType: "y mandatory",
          }}
        >
          <Box className="slider-item">
            <h2>1</h2>
          </Box>
          <Box className="slider-item">
            <h2>2</h2>
          </Box>
          <Box className="slider-item">
            <h2>3</h2>
          </Box>
          <Box className="slider-item">
            <h2>4</h2>
          </Box>
          <Box className="slider-item">
            <h2>5</h2>
          </Box>
          <Box className="slider-item">
            <h2>6</h2>
          </Box>
          <Box className="slider-item">
            <h2>7</h2>
          </Box>
          <Box className="slider-item">
            <h2>8</h2>
          </Box>
        </Box>
      </Box>
    </Zoom>
  );
}

export default Stories;
