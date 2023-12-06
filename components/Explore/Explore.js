import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowIcon from "@mui/icons-material/ArrowForward";
import ScrollAnimation from "react-scroll-animation-wrapper";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
import imgAPI from "~/public/images/imgAPI";
import DotParallax from "../Parallax/Dots";
import CategoryCard from "../Cards/Category";
import Title from "../Title";
import useStyles from "./explore-style";

const categoriesData = [
  {
    imgUrl: imgAPI.category.parashat_shavua,
    title: "פרשת שבוע",
    desc: "שיעורים בפרשת שבוע מתוך הסתכלות אמונית.",
    url: "/lectures/parashat_shavua",
  },
  {
    imgUrl: imgAPI.category.emuna,
    title: "אמונה",
    desc: "שיעורים באמונה.",
    url: "/lectures/emuna",
  },
  {
    imgUrl: imgAPI.category.gemarah,
    title: "גמרא",
    desc: "שיעורים בגמרא.",
    url: "/lectures/gemarah",
  },
  {
    imgUrl: imgAPI.category.likutey_moharan,
    title: 'ליקוטי מוהר"ן',
    desc: 'שיעורים בליקוטי מוהר"ן.',
    url: "/lectures/likutey_moharan",
  },
  {
    imgUrl: imgAPI.category.halacha,
    title: "הלכה",
    desc: "שיעורים בהלכה.",
    url: "/lectures/halacha",
  },
];

function Explore({ isAudioPlayer, data = categoriesData, lectureName }) {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Translation Function
  const { t } = useTranslation("common");

  const { classes } = useStyles();
  console.log("lectureName", lectureName);
  console.log("img", imgAPI.category.emuna);
  console.log("data", data);
  const lectureNameArray = {
    parashat_shavua: "פרשת שבוע",
    emuna: "אמונה",
    gemarah: "גמרא",
    likutey_moharan: 'ליקוטי מוהר"ן',
    halacha: "הלכה",
  };

  return (
    <div className={classes.root}>
      <div className={classes.parallaxWrap}>
        <DotParallax />
      </div>
      <Container fixed={isDesktop}>
        <Box p={isDesktop ? 6 : 0}>
          <Title
            head={
              lectureName
                ? `שיעורים ב${lectureNameArray[lectureName]}`
                : isAudioPlayer
                ? "כל השיעורים במגוון נושאים"
                : t("education-landing.explore_title")
            }
            desc={
              data.length > 0
                ? lectureName || isAudioPlayer
                  ? "חפש את השיעור שמעניין אותך.."
                  : t("education-landing.explore_desc")
                : "בהמשך נוסיף שיעורים גם בנושא זה."
            }
            align={isMobile ? "center" : "left"}
            color="primary"
          />
          <div className={classes.massonry}>
            <Grid container spacing={isMobile ? 2 : 6}>
              {data?.map((item, index) => (
                <Grid item lg={4} xs={6} key={index.toString()}>
                  <ScrollAnimation
                    animateOnce
                    animateIn="fadeInUpShort"
                    offset={-100}
                    delay={250}
                    duration={0.4}
                  >
                    <div>
                      <CategoryCard
                        img={item.imgUrl}
                        title={isAudioPlayer ? item.caption : item.title}
                        desc={item.desc}
                        link={item.url}
                        isAudioPlayer={isAudioPlayer}
                        index={index}
                      />
                    </div>
                  </ScrollAnimation>
                </Grid>
              ))}

              {data.length > 0 && (
                <Grid item lg={4} xs={6}>
                  <ScrollAnimation
                    animateOnce
                    animateIn="fadeInUpShort"
                    offset={-100}
                    delay={1}
                    duration={0.4}
                  >
                    <div className={classes.cardWrap}>
                      <span className={classes.fold} />
                      <ButtonBase
                        className={classes.allCategoryCard}
                        focusRipple
                        href="lectures"
                      >
                        <span className={classes.figure}>
                          <img src={imgAPI.education[10]} alt="img" />
                        </span>
                        <span className={classes.property}>
                          <span className={classes.title}>כל השיעורים</span>
                          <ArrowIcon />
                        </span>
                      </ButtonBase>
                    </div>
                  </ScrollAnimation>
                </Grid>
              )}
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Explore;
