import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";

const LoginForm = () => {
  //   const [loginUser, { error }] = useMutation(LOGIN_USER);

  const { loading, data, error } = useQuery(QUERY_USER);
  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data]);

  return <div>LoginForm</div>;
};

export default LoginForm;
