import React from "react";
import PropTypes from "prop-types";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";
import useStyles from "./cards-style";

function Category(props) {
  const { classes } = useStyles();
  const { img, title, desc, link, isAudioPlayer, index } = props;
  //console.log("isAudioPlayer", isAudioPlayer);
  //console.log("img", img);
  return (
    <div className={classes.cardWrap}>
      <span className={classes.fold} />
      <ButtonBase className={classes.categoryCard} focusRipple href={link}>
        <span className={classes.figure}>
          <img src={img} alt="img" style={{ height: "13rem" }} />
        </span>
        <span id={`catgory_property${index}`} className={classes.property}>
          <Typography component="span" className={classes.title}>
            {title}
          </Typography>
          {desc && (
            <Typography component="span" className={classes.descCategory}>
              {desc}
            </Typography>
          )}

          {isAudioPlayer && (
            <div>
              <ReactAudioPlayer
                src={link}
                controls
                style={{ width: "255px", marginTop: "54px" }}
                onPlay={() => {
                  //console.log("play");
                  // Get the element by its ID
                  const element = document.getElementById(
                    `catgory_property${index}`
                  );

                  // Add the class to the element
                  element.classList.add(classes.after_play);
                }}
                onPause={() => {
                  //console.log("stop");
                  // Get the element by its ID
                  const element = document.getElementById(
                    `catgory_property${index}`
                  );

                  // Add the class to the element
                  element.classList.remove(classes.after_play);
                }}
              />
            </div>
          )}
        </span>
      </ButtonBase>
    </div>
  );
}

Category.propTypes = {
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Category;
