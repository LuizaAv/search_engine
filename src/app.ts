const express = require("express");
import { Request, Response } from "express";
import * as fs from "fs";

const app = express();
const PORT = 3010;

app.use(express.static("public"));
app.use(express.json());

const { carModels, shopNames, addressesShops } = require("../db/constants");

function includesText(texts: (string | number)[], value: string | number): boolean {
  const updatedValue: string = typeof value === "string" ? (value as string).toLowerCase().trim() : value.toString();
  return texts.some((text) => {
    if (typeof text === "string") {
      const updatedText: string = (text as string).toLowerCase();
      return include(updatedText, updatedValue);
    }
    return false;
  });
}

function include(text: string, subtext: string): boolean {
  const check: number = 3;

  let subtextIndex: number = 0;
  let matchCount: number = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === subtext[subtextIndex]) {
      subtextIndex++;
      matchCount++;

      if (matchCount >= check) {
        return true;
      }

      if (subtextIndex === subtext.length) {
        return true;
      }
      
    } else {
      subtextIndex = 0;
      matchCount = 0;
    }
  }
  return false;
}

app.post("/", async (req: Request, res: Response) => {
  const { value } = req.body;

  const usersToShow: any[] = [];

  const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
  }

  if (carModels.has(value.toLowerCase())) {
    try {
      let carsData: any = JSON.parse(fs.readFileSync("./db/car.json", "utf-8"));
      let carId: any = carsData[value];
      let usersData: any = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));

      for (const item of usersData) {
        if (item.carId === carId) {
          usersToShow.push(item);
        }
      }

      res.status(200).send({ users: usersToShow, car: value });
    } catch (error) {
      console.error(error);
    }
  } else if (shopNames.has(value.toLowerCase())) {
    try {
      let shopData: any = JSON.parse(fs.readFileSync("./db/shop.json", "utf-8"));
      let userId: any[] = [];
      let shopToShow: any[] = [];
      let usersData: any = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));

      for (const item of shopData) {
        if (item.name.toLowerCase().trim() === value.toLowerCase().trim()) {
          userId.push(item.userId);
          shopToShow.push(item);
        }
      }

      let item: any
      for (item in usersData) {
        if (userId[item] === usersData[item].shopId) {
          usersData.push(item);
        }
      }

      for (let i = 0; i < usersData.length; ++i) {
        for (let j = 0; j < userId.length; ++j) {
          if (usersData[i].id === userId[j]) {
            usersToShow.push(usersData[i]);
          }
        }
      }

      const followersArray: any[] = [];
      shopToShow.map((item) => {
        item.followers.map((eachItem: any) => {
          usersData.filter((elem: any) => {
            if (eachItem === elem.id) {
              followersArray.push(elem);
            }
          });
        });
      });


      res
        .status(200)
        .send({
          shops: shopToShow,
          owners: usersToShow,
          follower: followersArray,
        });
    } catch (error) {
      console.error(error);
    }
  } else if (
    addressesShops.has(value.toLowerCase().replace(/\s+/g, " ").trim())
  ) {
    try {
      let shopData: any = JSON.parse(fs.readFileSync("./db/shop.json", "utf-8"));
      let usersData: any = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));

      let shopMatchByAddress: any[] = shopData.filter((item: any) => {
        let arrayOfAddresses: any[] = [];
        arrayOfAddresses.push(item.address);
        return includesText(arrayOfAddresses, value);
      });

      const followersArray: number[] = [];
      shopMatchByAddress.forEach((item) => {
        item.followers.forEach((followerId: number) => {
          followersArray.push(followerId);
        });
      });

      console.log(shopMatchByAddress)
      res
        .status(200)
        .send({
          shopAddressMatch: shopMatchByAddress,
          usersByAddress: usersData,
          followersByAddress: followersArray,
        });
    } catch (error) {
      console.error(error);
    }
  } else if (isValidEmail(value)) {
    let usersData: any = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));

    let usersList: any[] = usersData.filter((item: any) => {
      let valuesArray: any[] = [];
      valuesArray.push(item.email);
      return includesText(valuesArray, value);
    });

    if (usersList.length === 0) {
      console.log("No matches found.");
    }

    res.status(200).send({ usersList, usersData });
  } else {
    let usersData: any = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
    let usersList: any[] = usersData.filter((item: any) => {
      let valuesArray: any[] = [];
      valuesArray.push(item.name, item.surename);
      return includesText(valuesArray, value);
    });

    if (usersList.length === 0) {
      console.log("No matches found.");
    }

    res.status(200).send({ usersList, usersData });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});