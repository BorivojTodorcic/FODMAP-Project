"use client";
import {useEffect, useState} from 'react';
import Navbar from "./shared_components/navbar";

export default function Dashboard() {
  const [data, setData] = useState({})
  // console.log('data', data);

  useEffect(() => {
    fetch('http://localhost:3001/home').then(res => {
      return res.json();
    }).then(result => {
      setData(result);
    });
  }, [])

    return (
        <main>
          <Navbar currentRoute="/" />
          <h1>Dashboard Page</h1>
        </main>
    )}