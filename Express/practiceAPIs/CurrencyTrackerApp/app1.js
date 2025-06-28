import express from 'express';

const response = await fetch("https://v6.exchangerate-api.com/v6/71193a7bf2ad43fa63c52391/latest/INR")
const data = await response.json();
// console.log(data);
let obj = data.conversion_rates;
let arr = Object.entries(obj);

arr.sort((a,b)=>a[1]-b[1]);
for(let i = 0 ; i < 5 ; i++)
    console.log(arr[i][1]);

