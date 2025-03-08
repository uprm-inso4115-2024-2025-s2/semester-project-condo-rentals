import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { supabase } from "../backend/supabaseClient";
import { Button } from "react-native";
import { makeRedirectUri, Prompt } from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "789646850059-v1rqnplbgqtha8okl5b7nafqctf4ke2f.apps.googleusercontent.com",
    prompt: Prompt.SelectAccount,
    responseType: "id_token",
  });

  const router = useRouter();

  useEffect(() => {
    let idToken: string | null = null;

    if (response?.type === "success") {
      // Extract id_token from response.url
      const urlParams = new URLSearchParams(response.url.split("#")[1]);
      idToken = urlParams.get("id_token");

      if (idToken) {
        supabase.auth
          .signInWithIdToken({
            provider: "google",
            token: idToken,
          })
          .then(({ data, error }) => {
            if (error) {
              console.error("Supabase error:", error.message);
            } else {
              router.push("/(tabs)/Profile");
            }
          });
      } else {
        console.error("No ID token found in response.");
      }
    }
  }, [response]);

  return (
    <Button
      title="Sign in with Google"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
};

export default SignInWithGoogle;
