import mongoose, { InferSchemaType } from 'mongoose';

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    team: { type: String, required: true },
  },
  { timestamps: true },
);

/** Static helper to compute counts grouped by team */
schema.statics.countByTeam = function () {
  return this.aggregate([
    { $group: { _id: '$team', votes: { $sum: 1 } } },
    { $project: { _id: 0, team: '$_id', votes: 1 } },
    { $sort: { votes: -1 } },
  ]);
};

export interface TeamVoteDoc extends InferSchemaType<typeof schema> {}
export interface TeamVoteModel
  extends mongoose.Model<TeamVoteDoc, {}, {}, {}, any> {
  countByTeam(): Promise<{ team: string; votes: number }[]>;
}

export const TeamVote = mongoose.model<TeamVoteDoc, TeamVoteModel>(
  'TeamVote',
  schema,
);
