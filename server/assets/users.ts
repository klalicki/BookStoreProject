import { IUser } from "../models/Users";

/**
 * Usually, we would store our users in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 */
const users: IUser[] = [
  {
    id: "2725",
    username: "testuser",
    password: "password",
  },
  {
    id: "5976",
    username: "kristoff",
    password: "lalicki",
  },
];

export default users;
