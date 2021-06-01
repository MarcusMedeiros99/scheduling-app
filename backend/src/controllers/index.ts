import express from 'express';

module.exports.get = async (req: express.Request, res: express.Response) => {
  res.status(200).json({name: "Scheduling Web App"});
}