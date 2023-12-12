import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid";
import ScrollAnimation from "react-scroll-animation-wrapper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowIcon from "@mui/icons-material/ArrowForward";
import Container from "@mui/material/Container";
import axios from "axios";
import Error from "~/components/Error";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import brand from "~/public/text/brand";
import { makeStaticProps } from "~/lib/getStatic";
import CategoryCard from "~/components/Cards/Category";
import imgAPI from "~/public/images/imgAPI";
import Explore from "~/components/Explore";

const useStyles = makeStyles({ uniqId: "error" })((theme) => ({
  dedicatedPage: {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
}));

// const lecturesData = [
//   {
//     img: imgAPI.education[0],
//     title: "Photography",
//     desc: "Nulla lobortis nunc vitae nisi semper semper.",
//     link: "/lectures/emuna",
//   },
//   {
//     img: imgAPI.education[4],
//     title: "Artificial Intelligence",
//     desc: "Nulla lobortis nunc vitae nisi semper semper.",
//     link: "/torah",
//   },
//   {
//     img: imgAPI.education[7],
//     title: "Architect",
//     desc: "Nulla lobortis nunc vitae nisi semper semper.",
//     link: "/gemarah",
//   },
//   {
//     img: imgAPI.education[2],
//     title: "Geography",
//     desc: "Nulla lobortis nunc vitae nisi semper semper.",
//   },
//   {
//     img: imgAPI.education[6],
//     title: "Art",
//     desc: "Nulla lobortis nunc vitae nisi semper semper.",
//   },
// ];

async function fetchData({ topic }) {
  try {
    const res = await axios.get(
      `${process.env.server_address}/list_files?topic=${topic}`
    );
    // const res = await axios.get(`/api/fileList?topic=${topic}`);
    const listFiles = res.data;
    return listFiles;
  } catch (error) {
    // Handle the error here
    //console.log(error);
    return null;
  }
}

function Lecture(props) {
  const router = useRouter();
  const { locale, lecture } = router.query;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  //   const { errorCode, stars } = props;
  const { t } = useTranslation("common");

  const [lecturesData, setLecturesData] = useState();
  //console.log("lecturesData", lecture, lecturesData);

  useEffect(() => {
    const fetchDataAndSetLectures = async ({ topic }) => {
      const data = await fetchData({ topic });
      if (data) {
        setLecturesData(data);
      }
    };

    fetchDataAndSetLectures({ topic: lecture });
  }, []);

  // TODO: Fetch lecture data based on the `locale` and `lecture` params
  return (
    <Fragment>
      <Head>
        <title>{brand.education.name + " - " + lecture}</title>
      </Head>

      <div className={classes.dedicatedPage}>
        <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} invert />
        {/* <Error errorCode={errorCode} text={t("404")} /> */}
        <Explore data={lecturesData} isAudioPlayer lectureName={lecture} />
        {/* <div className={classes.root}>
          <Container fixed={isDesktop}>
            <div className={classes.massonry}>
              <Grid container spacing={isMobile ? 2 : 6}>
                {lecturesData.map((item, index) => (
                  <Grid item lg={4} xs={6} key={index.toString()}>
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeInUpShort"
                      offset={-100}
                      delay={index * 200}
                      duration={0.4}
                    >
                      <div>
                        <CategoryCard
                          img={item.img}
                          title={item.title}
                          desc={item.desc}
                          link={item.link}
                        />
                      </div>
                    </ScrollAnimation>
                  </Grid>
                ))}

                <Grid item lg={4} xs={6}>
                  <ScrollAnimation
                    animateOnce
                    animateIn="fadeInUpShort"
                    offset={-100}
                    delay={lecturesData.length * 200}
                    duration={0.4}
                  >
                    <div className={classes.cardWrap}>
                      <span className={classes.fold} />
                      <ButtonBase
                        className={classes.allCategoryCard}
                        focusRipple
                        href="#"
                      >
                        <span className={classes.figure}>
                          <img src={imgAPI.education[10]} alt="img" />
                        </span>
                        <span className={classes.property}>
                          <span className={classes.title}>ALL COURSE</span>
                          <ArrowIcon />
                        </span>
                      </ButtonBase>
                    </div>
                  </ScrollAnimation>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div> */}
        {/* <h1>{lecture}</h1> */}
        {/* TODO: Render lecture content */}

        <Footer />
      </div>
    </Fragment>
  );
  //   return (

  //     <div>
  //       <h1>{lecture}</h1>
  //       {/* TODO: Render lecture content */}
  //     </div>
  //   );
}

export default Lecture;

export const getLeturesPaths = () => ({
  paths: [
    { params: { locale: "he", lecture: "parashat_shavua" } },
    { params: { locale: "he", lecture: "emuna" } },
    { params: { locale: "he", lecture: "gemarah" } },
    { params: { locale: "he", lecture: "likutey_moharan" } },
    { params: { locale: "he", lecture: "halacha" } },
  ],
  fallback: false,
});

export const getStaticPaths = () => ({
  ...getLeturesPaths(),
});

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticProps };

// const router = useRouter();
// const { locale, lecture } = router.query;
// return (

//     <div>
//       <h1>{lecture}</h1>
//       {/* TODO: Render lecture content */}
//     </div>
//   );
