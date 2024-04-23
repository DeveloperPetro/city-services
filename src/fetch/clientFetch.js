"use client";
import useSWR from "swr";

export const GetData = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  return useSWR(`/api/apartments`, fetcher);
};