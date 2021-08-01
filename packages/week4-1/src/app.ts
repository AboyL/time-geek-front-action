import { useState } from "react";
import { useModel } from 'umi'

// src/app.ts
export function useQiankunStateForSlave() {
  // const { content, setContent } = useModel('content', model => model);
  const [ content, setContent ] = useState('content');


  return {
    content,
    setContent,
  };
}