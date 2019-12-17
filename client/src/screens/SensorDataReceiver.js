import React, { Component } from "react";

class SensorDataReceiver extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const response = await fetch("/api/iot-received");
    const data = await response.json();
    this.setState({ data: data });
  }

  render() {
    const { data } = this.state;
    data.reverse();
    let num = 1;
    const listItems = data.map(d => {
      return (
        <tr key={d._id}>
          <th scope="row">{num++}</th>
          <td>{d.Time}</td>
          <td style={{ color: "red" }}>{d.DevAddr}</td>
          <td>{d.DevEUI}</td>
          <td style={{ color: "blue" }}>{d.payload_hex}</td>
          <td>{d.FPort}</td>
          <td>{d.FCntUp}</td>
          <td>{d.FCntDn}</td>
          <td>{d.LrrRSSI}</td>
          <td>{d.LrrSNR}</td>
          <td>{d.SubBand}</td>
          <td>{d.Channel}</td>
          <td>{d.Lrrid}</td>
          <td>{d.LrrLAT}</td>
          <td>{d.LrrLON}</td>
        </tr>
      );
    });

    return (
      <div className="container-flud m-3">
        <h1>Sensor Data List</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Time</th>
                <th scope="col">DevAddr</th>
                <th scope="col">DevEUI</th>
                <th scope="col">Payload</th>
                <th scope="col">FPort</th>
                <th scope="col">FCntUp</th>
                <th scope="col">FCntDn</th>
                <th scope="col">RSSI</th>
                <th scope="col">SNR</th>
                <th scope="col">SubBand</th>
                <th scope="col">Channel</th>
                <th scope="col">LRR ID</th>
                <th scope="col">LRR LAT</th>
                <th scope="col">LRR LON</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SensorDataReceiver;
