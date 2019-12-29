const mongoose = require("mongoose");
const Sensor = mongoose.model("sensors");
const Location = mongoose.model("location");
const Pm = mongoose.model("pm");
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

exports.updateData = async (req, res, next) => {
  //while(1){
    const loraData = await getlist();
    const mainData = await getData();
    const pmData = await getPM();
    console.log(pmData.length);
    // console.log("mainData " + mainData.length);
    //if (!checkNewData(loraData, mainData)) sleep(5000);
    let d = await validate(loraData);
    let sizeUnupload = (loraData.length-(loraData.length-mainData.length))
    let sizeUnuploadPM = (loraData.length-(loraData.length-pmData.length))
    
    await saveData(d.newList,sizeUnupload)
    await savePM(d.pmList,sizeUnuploadPM)
  //}
  
};
exports.getdata = async (req, res, next) => {
 
    const NowData = await getData();
    return res.json(NowData);
  
};
exports.getpm = async (req, res, next) => {
 
  const NowData = await getPM();
  return res.json(NowData);

};
checkNewData = async (loraData, mainData) => {
  if (loraData.length > mainData.length) return true;
  return false;
};
saveData = async (d,index) => {

  for(let i=index ; i < d.length ; i++){
    console.log("HAVE NEW DATA");
    await new Location({
      Timestamp: d[i].Timestamp,
      Latitude: d[i].Latitude,
      Longitude: d[i].Longitude,
      Alittude: d[i].Alittude,
      Team : d[i].Team
    }).save();
  }
};
savePM = async (d,index) => {
  for(let i=index ; i < d.length ; i++){
    console.log("HAVE NEW DATA");
    await new Pm({
      Timestamp: d[i].Timestamp,
      pm: d[i].pm,
    }).save();
  }
};
validate = async d => {
  var newList = [];
  var pmList = []
  d.forEach(async _ => {
    let tmplist = {};
    let pmlist = {};
    if (_.DevEUI_uplink.payload_hex && _.DevEUI_uplink.payload_hex.split("").length == 20) {
      let __ = await setFormData(_.DevEUI_uplink.payload_hex);
      tmplist.Timestamp = _.DevEUI_uplink.Time
      tmplist.Latitude = __.latitude;
      tmplist.Longitude = __.longitude;
      tmplist.Team = 13;
      newList.push(tmplist);
      pmlist.Timestamp = _.DevEUI_uplink.Time
      pmlist.pm = __.pm
      pmList.push(pmlist);
    }

  });
  return {newList,pmList};
};
setFormData = async payload => {
  let arr = payload.match(/..?/g);
  let pm =
    ((parseInt("0x" + arr[0], 16) * 256 + parseInt("0x" + arr[1], 16)));
  // let appLedStateOn = parseInt("0x" + arr[0], 16);
  // let pressure =
  //   ((parseInt("0x" + arr[1], 16) * 256 + parseInt("0x" + arr[2], 16)) * 10) /
  //   100;
  // let temperature =
  //   (parseInt("0x" + arr[3], 16) * 256 + parseInt("0x" + arr[4], 16)) / 100;
  // let humidity =
  //   (parseInt("0x" + arr[5], 16) * 256 + parseInt("0x" + arr[6], 16)) / 100;
  // let batteryLevel = (parseInt("0x" + arr[7], 16) * 100) / 254;
    let latitude =(
      ((parseInt("0x" + arr[2], 16) * 65536) +
        (parseInt("0x" + arr[3], 16) * 256) +
        parseInt("0x" + arr[4], 16)) *90)/8388607
      ;
    let longitude =(
      (parseInt("0x" + arr[5], 16) * 65536 +
        parseInt("0x" + arr[6], 16) * 256 +
        parseInt("0x" + arr[7], 16)) * 180)/8388607
      ;
    let alittude =
      parseInt("0x" + arr[8], 16) * 256 + parseInt("0x" + arr[9], 16);

  return {
    pm,
    latitude,
    longitude,
    alittude
  };
};
getlist = async () => {
  return await Sensor.find();
};
getData = async () => {
  return await Location.find();
};
getPM = async () => {
  return await Pm.find();
};
