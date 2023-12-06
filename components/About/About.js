import React, { Fragment } from "react";
import ScrollAnimation from "react-scroll-animation-wrapper";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import { useText } from "~/theme/common";
import imgAPI from "~/public/images/imgAPI";
import useStyles from "./about-style";

function About() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const { t } = useTranslation("common");
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container justifyContent="center" spacing={8}>
          <Grid item md={6} xs={12} className={classes.illuWrap}>
            {!isTablet && (
              <Fragment>
                <div className={cx(classes.illustration, classes.one)} />
                <figure className={cx(classes.illustration, classes.two)}>
                  <img src={imgAPI.about[0]} alt="gitar" />
                </figure>
                <figure className={cx(classes.illustration, classes.three)}>
                  <img src={imgAPI.about[1]} alt="horse" />
                </figure>
                <figure className={cx(classes.illustration, classes.four)}>
                  <img src={imgAPI.about[2]} alt="lecture" />
                </figure>
                <div className={cx(classes.illustration, classes.five)} />
              </Fragment>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInRightShort"
              offset={-100}
              delay={200}
              duration={0.6}
            >
              <div>
                <div className={classes.title}>
                  <Typography variant="h3" className={text.title}>
                    <span>{t("education-landing.about_title")}</span>
                  </Typography>
                </div>
                <Typography className={text.paragraph}>
                  {t("education-landing.about_desc")}
                </Typography>
                <Button className={classes.white} variant="contained">
                  {t("education-landing.about_join")}
                </Button>
              </div>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
