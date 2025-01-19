import { Response } from "express";

const onPostLogin = (res: Response, getUserByEmail: () => Promise<unknown>) => {
  getUserByEmail().then((result) => {
    // if (result?.hasError) {
    //   res.status(500).send();
    //   return;
    // }

    res.status(200).send(result);
  });
};

export default onPostLogin;
