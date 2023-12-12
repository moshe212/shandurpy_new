import { serverSideTranslations as ssgTranslate } from "next-i18next/serverSideTranslations";
import axios from "axios";
import i18nextConfig from "../next-i18next.config";

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (ctx, ns = ["common"]) => {
  const locale = ctx?.params?.locale;
  const props = {
    ...(await ssgTranslate(locale, ns)),
  };
  //console.log("props", props);
  return props;
};

export const getI18nPropsLectures = async (ctx, ns = ["common"]) => {
  const res = await axios.get(`${process.env.server_address}/list_files`);
  // const res = await axios.get("/api/fileList");
  const listFiles = res.data;
  // //console.log("listFiles", listFiles);

  const locale = ctx?.params?.locale;

  const basicProps = {
    ...(await ssgTranslate(locale, ns)),
  };
  //console.log("basicProps", basicProps);

  const props = {
    ...(await ssgTranslate(locale, ns)),
  };

  const data = {
    basicProps,
    listFiles,
  };
  //console.log("props", props);

  return props;
};

export const makeStaticProps =
  (ns = []) =>
  async (ctx) => ({
    props: await getI18nPropsLectures(ctx, ns),
  });

export const getLecturesProps =
  (ns = []) =>
  async (ctx) => ({
    props: await getI18nProps(ctx, ns),
  });
