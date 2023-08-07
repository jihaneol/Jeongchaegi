import { useEffect, useState } from "react";

export function GetTokens() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return {accessToken, refreshToken};
}
