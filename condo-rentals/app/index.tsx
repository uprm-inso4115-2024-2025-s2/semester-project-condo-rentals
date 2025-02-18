import { Redirect } from "expo-router";
import React from "react";

// App starts here
const StartPage = () => {
  return <Redirect href="/(tabs)/Listings" />;
};

export default StartPage;
