import createUser from "@/actions/create_user";
import { getUserByEmail } from "@/actions/get_user";
import { User } from "@/types";
import { hashPassword } from "@/utils/password";
import { Request, Response } from "express";
import { Knex } from "knex";

type Services = {
  queryBuilder: Knex;
};

type UserExistResponse = {
  status: 400;
  message: string;
};

type UserCreatedResponse = {
  status: 200;
  user: User;
};

type UserRequest = {
  body: User;
  query?: any;
  params?: any;
  session: {
    isAuth?: boolean;
  };
};

type RegisterResponse = UserExistResponse | UserCreatedResponse;

const postRegister = async (req: UserRequest, services: Services): Promise<RegisterResponse> => {
  const userData = req.body;

  const user = await getUserByEmail(userData.email, services.queryBuilder);

  if (user) {
    return { status: 400, message: "User already exists" };
  }

  const createdUser = await createUser(
    { ...userData, password: await hashPassword(userData.password) },
    services.queryBuilder
  );

  return { status: 200, user: createdUser };
};

const handleRequest = async (req: Request, res: Response, services: Services) => {
  let result;

  try {
    result = await postRegister(
      {
        body: req.body,
        query: req.query,
        params: req.params,
        session: req.session,
      },
      services
    );
  } catch (error) {
    result = { status: 500, message: "Internal server error" };
  }

  res.status(result.status).json(result);
};

export { handleRequest };

export default postRegister;
