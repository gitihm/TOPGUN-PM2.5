const mongoose = require("mongoose");
const Sensor = mongoose.model("sensors");

exports.list = async (req, res, next) => {
  try {
    Sensor.find()
      .sort({ Time: 1 })
      .limit(200)
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};

exports.store = async (req, res, next) => {
  try {
    const data = req.body.DevEUI_uplink;
    console.log(req.body.DevEUI_uplink);

    if (!data) {
      return res.send("0");
    }

    const result = await new Sensor({
      DevEUI_uplink :{
        Time: data.Time,
        DevEUI: data.DevEUI,
        DevAddr: data.DevAddr,
        FPort: data.FPort,
        FCntUp: data.FCntUp,
        ADRbit: data.ADRbit,
        MType: data.MType,
        FCntDn: data.FCntDn,
        payload_hex: data.payload_hex,
        mic_hex: data.mic_hex,
        Lrcid: data.Lrcid,
        LrrRSSI: data.LrrRSSI,
        LrrSNR: data.LrrSNR,
        SpFact: data.SpFact,
        SubBand: data.SubBand,
        Channel: data.Channel,
        DevLrrCnt: data.DevLrrCnt,
        Lrrid: data.Lrrid,
        Late: data.Late,
        LrrLAT: data.LrrLAT,
        LrrLON: data.LrrLON,
        Lrrs: {
          Lrr: [
            {
              Chain: data.Lrrs.Lrr[0].Chain,
              LrrESP: data.Lrrs.Lrr[0].LrrESP,
              LrrRSSI: data.Lrrs.Lrr[0].LrrRSSI,
              LrrSNR: data.Lrrs.Lrr[0].LrrSNR,
              Lrrid:data.Lrrs.Lrr[0].Lrrid
            }
            // {
            //   Chain: data.Lrrs.Lrr[1].Chain,
            //   LrrESP: data.Lrrs.Lrr[1].LrrESP,
            //   LrrRSSI: data.Lrrs.Lrr[1].LrrRSSI,
            //   LrrSNR: data.Lrrs.Lrr[1].LrrSNR,
            //   Lrrid:data.Lrrs.Lrr[1].Lrrid
            // },
            // {
            //   Chain: data.Lrrs.Lrr[2].Chain,
            //   LrrESP: data.Lrrs.Lrr[2].LrrESP,
            //   LrrRSSI: data.Lrrs.Lrr[2].LrrRSSI,
            //   LrrSNR: data.Lrrs.Lrr[2].LrrSNR,
            //   Lrrid:data.Lrrs.Lrr[2].Lrrid
            // }
          ]
        },
        CustomerID: data.CustomerID,
        CustomerData: {
          alr: {
            pro: data.CustomerData.alr.pro,
            ver: data.CustomerData.alr.ver
          }
        },
        ModelCfg: data.ModelCfg,
        InstantPER: data.InstantPER,
        MeanPER: data.MeanPER
      }
      
    }).save();

    return res.send("1");
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};
