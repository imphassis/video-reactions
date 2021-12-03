const Language = require('../models/Language');

const reactions = {
  love: { count: 0 },
  surprised: { count: 0 },
  happy: { count: 0 },
  sad: { count: 0 },
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('sendReaction', async ({ value }) => {
      console.log(`Cliente clicou na reação ${value}`);
      reactions[value].count += 1;
      // await Language.increaseVotes(value);
      // const data = await Language.getByvalue(value);
      io.emit('refreshReactions', reactions);
    });
  });
