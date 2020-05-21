module.exports = {
  client: {
    service: 'grapple',
    url: process.env.DEVICE_IP
      ? `${process.env.DEVICE_IP}:${process.env.PORT}`
      : `${process.env.HOST}:${process.env.PORT}`,
  },
};
