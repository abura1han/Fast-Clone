const FastSpeedtest = require("fast-speedtest-api");
function netSpeed() {

    let speedtest = new FastSpeedtest({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
        verbose: false, // default: false
        timeout: 10000, // default: 5000
        https: true, // default: true
        urlCount: 5, // default: 5
        bufferSize: 8, // default: 8
        unit: FastSpeedtest.UNITS.Kbps // default: Bps
    });

    return speedtest.getSpeed();
}

module.exports = netSpeed;