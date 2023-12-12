// import cors from "cors";
const cors = require("cors");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const app = express();

cloudinary.config({
  cloud_name: "binyaminbiz",
  api_key: "377497779621851",
  api_secret: "mItCb8yTGbEH54MYfnsTjbyWoWA",
});

const CloudName = "binyaminbiz";

let port = process.env.PORT || 3001;
// if (port == null || port == "") {
//   port = 8000;
// }

app.use(
  cors({
    origin: "*",

    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.get("/list_files", async (req, res) => {
  //console.log("query", req.query);
  const tagName = req.query.topic;

  let imgFileList = [];
  const imgResponse = await cloudinary.api.resources_by_tag(tagName, {
    resource_type: "image",
    max_results: "500",
    metadata: true,
    context: true,
  });

  //console.log("resultIMG", imgResponse.resources);
  imgFileList = imgResponse.resources.map((resource) => ({
    id: resource.public_id.slice(-2),
    url: resource.url,
  }));
  //console.log("img", imgFileList);

  const audioResponse = await cloudinary.api.resources_by_tag(tagName, {
    resource_type: "video",
    max_results: "150",
    metadata: true,
    context: true,
  });

  const arrangeFileArray = audioResponse.resources.map((file, index) => {
    //console.log("index", index);
    const endLink = file.public_id.slice(-2);
    const id = endLink.includes("/") ? endLink.slice(-1) : endLink;
    //console.log("id", id);
    const imgObj = imgFileList.find((obj) => obj.id === id);
    //console.log("imgObj", imgObj);
    return {
      imgUrl: imgObj?.url,
      url: file.url,
      caption: file.context.custom.caption,
    };
  });
  //console.log(arrangeFileArray);
  res.json(arrangeFileArray);

  // cloudinary.api
  //   .resources_by_tag(tagName, {
  //     resource_type: "image",
  //     max_results: "500",
  //     metadata: true,
  //     context: true,
  //   })
  //   .then((result) => {
  //     //console.log("resultIMG", result.resources);
  //     imgFileList = result.resources.map((resource) => ({
  //       id: resource.public_id.slice(-2),
  //       url: resource.url,
  //     }));
  //     //console.log("img", imgFileList);
  //   });

  // cloudinary.api
  //   .resources_by_tag(tagName, {
  //     resource_type: "video",
  //     max_results: "150",
  //     metadata: true,
  //     context: true,
  //   })
  //   .then((result) => {
  //     const arrangeFileArray = result.resources.map((file, index) => {
  //       //console.log("index", index);
  //       const endLink = file.public_id.slice(-2);
  //       const id = endLink.includes("/") ? endLink.slice(-1) : endLink;
  //       //console.log("id", id);
  //       const imgObj = imgFileList.find((obj) => obj.id === id);
  //       //console.log("imgObj", imgObj);
  //       return {
  //         imgUrl: imgObj?.url,
  //         url: file.url,
  //         caption: file.context.custom.caption,
  //       };
  //     });
  //     //console.log(arrangeFileArray);
  //     res.json(arrangeFileArray);
  //   });
});

app.get("/last_lecture", async (req, res) => {
  //console.log("lastlecture");
  let imgFileList = [];
  const imgResponse = await cloudinary.api.resources_by_tag(
    "shandurpy_lecture",
    {
      resource_type: "image",
      max_results: "500",
      metadata: true,
      context: true,
    }
  );

  imgFileList = imgResponse.resources.map((resource) => ({
    id: resource.public_id.slice(-2),
    url: resource.url,
  }));

  const audioResponse = await cloudinary.api.resources_by_tag(
    "shandurpy_lecture",
    {
      resource_type: "video",
      max_results: "500",
      metadata: true,
      context: true,
    }
  );

  audioResponse.resources.sort((a, b) => {
    const lastTwoA = a.public_id.slice(-2);
    const lastTwoB = b.public_id.slice(-2);
    if (lastTwoA < lastTwoB) {
      return 1;
    }
    if (lastTwoA > lastTwoB) {
      return -1;
    }
    return 0;
  });

  const fiveLatestObjs = audioResponse.resources.slice(0, 5);
  //console.log("img", imgFileList);
  const arrangeFileArray = fiveLatestObjs.map((file) => {
    const id = file.public_id.slice(-2);
    //console.log("id", id);
    const imgUrlObj = imgFileList.find((item) => item.id === id);
    //console.log("imgUrlObj", imgUrlObj);
    return {
      imgUrl: imgUrlObj?.url,
      url: file.url,
      caption: file.context.custom.caption,
    };
  });
  //console.log(arrangeFileArray);
  res.json(arrangeFileArray);

  // cloudinary.api
  //   .resources_by_tag("shandurpy_lecture", {
  //     resource_type: "image",
  //     max_results: "500",
  //     metadata: true,
  //     context: true,
  //   })
  //   .then((result) => {
  //     imgFileList = result.resources.map((resource) => ({
  //       id: resource.public_id.slice(-2),
  //       url: resource.url,
  //     }));
  //     // //console.log("img", imgFileList);
  //   });

  // cloudinary.api
  //   .resources_by_tag("shandurpy_lecture", {
  //     resource_type: "video",
  //     max_results: "500",
  //     metadata: true,
  //     context: true,
  //   })
  //   .then((result) => {
  //     result.resources.sort((a, b) => {
  //       const lastTwoA = a.public_id.slice(-2);
  //       const lastTwoB = b.public_id.slice(-2);
  //       if (lastTwoA < lastTwoB) {
  //         return 1;
  //       }
  //       if (lastTwoA > lastTwoB) {
  //         return -1;
  //       }
  //       return 0;
  //     });

  //     const fiveLatestObjs = result.resources.slice(0, 5);
  //     //console.log("img", imgFileList);
  //     const arrangeFileArray = fiveLatestObjs.map((file) => {
  //       const id = file.public_id.slice(-2);
  //       //console.log("id", id);
  //       const imgUrlObj = imgFileList.find((item) => item.id === id);
  //       //console.log("imgUrlObj", imgUrlObj);
  //       return {
  //         imgUrl: imgUrlObj?.url,
  //         url: file.url,
  //         caption: file.context.custom.caption,
  //       };
  //     });
  //     //console.log(arrangeFileArray);
  //     res.json(arrangeFileArray);
  //   });
});

//   https://res.cloudinary.com/binyaminbiz/video/upload/v1699289598/shandurpy/parashat_shavua/2.mp3
app.get("/audio", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://res.cloudinary.com/${CloudName}/video/upload/v1699285618/shandurpy/parashat_shavua/3.mp3`,
      { responseType: "stream" }
    );
    res.set({
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
    });
    data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  //console.log(`Server listening at http://localhost:${port}`);
});
