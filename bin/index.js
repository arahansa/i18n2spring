#!/usr/bin/env node

const fs = require("fs");
const {loadInfo} = require("../index");


loadInfo().then(()=>{
    console.log('complete');
});



