import Idea from '../models/Idea.js';
import helper from './helper.js';

export default {
  addIdea: (req, res) => {
    const boardId = req.params.board_id;
    const { content } = req.body;
    const newIdea = new Idea({ content, boardId });

    newIdea.save()
      .then((idea) => {
        res.status(201).json({ idea });
      })
      .error(helper.handleError(res));
  },

  getIdea: (req, res) => {
    const id = req.params.idea_id;

    Idea.get(id).run()
      .then((idea) => {
        res.status(200).json({ idea });
      })
      .error(helper.handleError(res));
  },

  upvoteIdea: (req, res) => {
    const id = req.params.idea_id;

    Idea.get(id).run()
      .then((idea) => {
        idea.upvotes++;
        idea.save()
          .then((idea) => {
            res.status(201).json({ idea });
          })
          .error(helper.handleError(res));
      })
      .error(helper.handleError(res));
  },

  deleteIdea: (req, res) => {
    const id = req.params.idea_id;

    Idea.get(id).run()
      .then((idea) => {
        idea.delete()
          .then((result) => {
            res.sendStatus(204);
          })
      })
  },

  updateIdea: (req, res) => {
    const id = req.params.idea_id;
    const update = req.body;

    Idea.get(id).run()
      .then((idea) => {
        idea.merge(update).save()
          .then((result) => {
            res.status(200).json({ result });
          })
      })
      .error(helper.handleError(res));
  },
};
