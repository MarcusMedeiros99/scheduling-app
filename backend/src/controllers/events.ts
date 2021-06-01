import express from 'express';

const repository = require('../repositories/events');

module.exports.get = async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['events']
  try {
    const data = await repository.get();
    res
      .status(200)
      .send(data);
  }
  catch (err) {
    res
      .status(500)
      .send({
        message: "Failed to proccess request"
      })
  }
}


module.exports.getById = async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['events']
  try {
    const data = await repository.getById(req.params.id);
    res
      .status(200)
      .send(data);
  }
  catch (err) {
    res
      .status(500)
      .send({
        message: "Failed to proccess request"
      })
  }
}

module.exports.post = async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['events']
  try {
    await repository.post(req.body);
    res
      .status(200)
      .end();
  }
  catch (err) {
    res
      .status(500)
      .send({
        message: "Failed to proccess request"
      })
  }
}

module.exports.put = async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['events']
  try {
    await repository.put(req.body);
    res
      .status(200)
      .end();
  }
  catch (err) {
    res
      .status(500)
      .send({
        message: "Failed to proccess request"
      })
  }
}

module.exports.del = async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['events']
  try {
    await repository.del(req.params.id);
    res
      .status(200)
      .end();
  }
  catch (err) {
    res
      .status(500)
      .send({
        message: "Failed to proccess request"
      })
  }
}