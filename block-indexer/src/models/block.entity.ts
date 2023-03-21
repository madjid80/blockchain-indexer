const mongoose = require('mongoose');

const BlockEntity = mongoose.model(
  'Block',
  mongoose.Schema(
    {
      difficulty: Number,
      extraData: String,
      gasLimit: String,
      gasUsed: String,
      hash: {
        type: String,
        unique: true,
      },
      miner: String,
      nonce: String,
      blockNumber: Number,
      parentHash: String,
      blockTimeStamp: Number,
      networkId: String,
    },
    { timestamps: true }
  )
);

export default BlockEntity;
