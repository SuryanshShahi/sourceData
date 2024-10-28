import { getSourceData, getMasterFields } from "@/app/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { IData } from "../types";

const useHook = () => {
  const { data: sourceData } = useQuery<IData>({
    queryKey: ["sourceData"],
    queryFn: () => getSourceData("users"),
  });

  const { data: masterData } = useQuery<IData>({
    queryKey: ["masterData"],
    queryFn: getMasterFields,
  });
  const initialValues = {
    expression: "",
  };
  const { setValues, values, handleChange, setFieldValue } = useFormik({
    initialValues: [initialValues],
    onSubmit: () => {},
  });
  useEffect(() => {
    for (let i = 0; i < (masterData?.fields?.length || 0); i++) {
      setValues([...values, initialValues]);
    }
  }, []);
  return { sourceData, masterData, values, handleChange, setFieldValue };
};

export default useHook;
