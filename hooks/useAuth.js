import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  async function register(userSingUP) {
    try {
      const data = await api.post("/userSingUPs/register", userSingUP).then((response) => {
        return response.data
      });

      console.log(data)
    } catch (error) {
        // tratar o erro

        console.log(error)
    }
  }

  return {register}
}
