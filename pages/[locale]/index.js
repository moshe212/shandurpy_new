import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import axios from "axios";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";
import brand from "~/public/text/brand";
import Header from "~/components/Header";
import Banner from "~/components/Banner";
import Feature from "~/components/Feature";
import PopularCourse from "~/components/PopularCourse";
import Explore from "~/components/Explore";
import About from "~/components/About";
import Testimonials from "~/components/Testimonials";
import Blog from "~/components/Blog";
import Subscribe from "~/components/SubscribeForm";
import Footer from "~/components/Footer";
import PageNav from "~/components/PageNav";
import Notification from "~/components/Notification";
// import { v2 as cloudinary } from "cloudinary";

const sectionMargin = (margin) => margin * 20;
const useStyles = makeStyles({ uniqId: "home" })((theme) => ({
  spaceBetween: {
    marginTop: "20rem",
  },
  mainWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  spaceBottom: {
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down("lg")]: {
      paddingBottom: sectionMargin(6),
    },
  },
  spaceBottomShort: {
    paddingBottom: theme.spacing(10),
  },
  spaceTop: {
    paddingTop: theme.spacing(20),
    [theme.breakpoints.down("lg")]: {
      paddingTop: sectionMargin(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: sectionMargin(4),
    },
  },
  spaceTopShort: {
    paddingTop: theme.spacing(10),
  },
  containerWrap: {
    "& > section": {
      position: "relative",
    },
  },
}));

async function fetchData() {
  //console.log("server_address", process.env);
  try {
    const res = await axios.get(`${process.env.server_address}/last_lecture`);
    // const res = await axios.get(`/api/fileList?topic=${topic}`);
    const listFiles = res.data;
    //console.log(listFiles);
    return listFiles;
  } catch (error) {
    // Handle the error here
    //console.log(error);
    return null;
  }
}

function Landing(props) {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [courseDataA, setcourseDataA] = useState();
  useEffect(() => {
    const fetchDataAndSetLectures = async () => {
      const data = await fetchData();
      if (data) {
        setcourseDataA(data);
      }
    };

    fetchDataAndSetLectures();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{brand.education.name + " - Home Page"}</title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
        <main className={classes.containerWrap}>
          <section id="home">
            <Banner />
          </section>
          {/* <section id="feature" className={classes.spaceTop}>
            <Feature />
          </section> */}
          <section id="popular" className={classes.spaceBetween}>
            <PopularCourse latestLecture={courseDataA} />
          </section>
          <section id="explore">
            <Explore />
          </section>
          <div id="about">
            <About />
          </div>
          {/* <div id="testimonials" className={classes.spaceTop}>
            <Testimonials />
          </div> */}
          <section id="blog" className={classes.spaceTopShort}>
            <Blog />
          </section>
          <section id="subscribe" className={classes.spaceTopShort}>
            <Subscribe />
          </section>
          <Footer toggleDir={onToggleDir} />
        </main>
        {/* {!isTablet && (
          <Fragment>
            <PageNav />
            <Notification />
          </Fragment>
        )} */}
      </div>
    </React.Fragment>
  );
}

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

export default Landing;

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
