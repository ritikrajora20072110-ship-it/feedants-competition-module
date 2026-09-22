const mongoose = require('mongoose');

const RewardItemSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    title: { type: String, required: true },
    titleHi: { type: String },
    amount: { type: Number, required: true },
    iconType: {
      type: String,
      enum: ['trophy', 'medal-silver', 'medal-bronze', 'star', 'badge'],
      default: 'star',
    },
  },
  { _id: false }
);

const PreviousWinnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rankText: { type: String, required: true },
    rankTextHi: { type: String },
    avatarUrl: { type: String, required: true },
    videoUrl: { type: String, default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    yearOrEdition: { type: String, default: '2025' },
  },
  { _id: true }
);

const JudgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameHi: { type: String },
    title: { type: String, required: true },
    titleHi: { type: String },
    experience: { type: String, required: true },
    experienceHi: { type: String },
    avatarUrl: { type: String, required: true },
    introVideoUrl: {
      type: String,
      default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
  },
  { _id: false }
);

const TabContentSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    hi: { type: String, required: true },
  },
  { _id: false }
);

const CompetitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleHi: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Dance',
    },
    tags: [
      {
        type: String,
      },
    ],
    tagsHi: [
      {
        type: String,
      },
    ],
    prizePool: {
      type: Number,
      required: true,
      min: 0,
    },
    entryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    maxParticipants: {
      type: Number,
      required: true,
      default: 20,
    },
    currentParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },
    isCertificateProvided: {
      type: Boolean,
      default: true,
    },
    isMultiWin: {
      type: Boolean,
      default: true,
    },
    judge: {
      type: JudgeSchema,
      required: true,
    },
    dates: {
      registrationStart: { type: Date, required: true },
      registrationEnd: { type: Date, required: true },
      submissionStart: { type: Date, required: true },
      submissionEnd: { type: Date, required: true },
      resultDate: { type: Date, required: true },
    },
    previousWinners: [PreviousWinnerSchema],
    tabs: {
      about: TabContentSchema,
      judgingParameters: TabContentSchema,
      rulesAndEligibility: TabContentSchema,
    },
    rewards: [RewardItemSchema],
    disclaimer: {
      en: {
        type: String,
        default: 'Only contributions from paid participants will be considered for judging.',
      },
      hi: {
        type: String,
        default: 'केवल भुगतान किए गए प्रतिभागियों के योगदान पर ही निर्णय के लिए विचार किया जाएगा।',
      },
    },
    referral: {
      code: { type: String, default: 'referral123' },
      baseUrl: { type: String, default: 'https://feedants.com/r/' },
      rewardAmount: { type: Number, default: 10 },
    },
    prizeMoneyVideoUrl: {
      type: String,
      default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    waitlist: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for remaining spots
CompetitionSchema.virtual('spotsLeft').get(function () {
  return Math.max(0, this.maxParticipants - this.currentParticipants);
});

// Virtual helper for dynamic lifecycle calculation
CompetitionSchema.methods.calculateDynamicState = function (now = new Date()) {
  const { registrationStart, registrationEnd, submissionStart, submissionEnd, resultDate } = this.dates;
  const isFull = this.currentParticipants >= this.maxParticipants;

  let lifecycle = 'UPCOMING';
  let countdownTarget = registrationEnd;
  let countdownLabel = 'Registration closes in';
  let canRegister = false;
  let canSubmit = false;
  let statusMessage = 'Registration is open';

  if (now < registrationStart) {
    lifecycle = 'UPCOMING';
    countdownTarget = registrationStart;
    countdownLabel = 'Registration opens in';
    canRegister = false;
    statusMessage = 'Competition is upcoming. Registration opens soon.';
  } else if (now <= registrationEnd && !isFull) {
    lifecycle = 'REGISTRATION_OPEN';
    countdownTarget = registrationEnd;
    countdownLabel = 'Registration closes in';
    canRegister = true;
    const remaining = Math.max(0, this.maxParticipants - this.currentParticipants);
    statusMessage = `Registration open. Only ${remaining} spots remaining!`;
  } else if (now <= registrationEnd && isFull) {
    lifecycle = 'REGISTRATION_FULL';
    countdownTarget = submissionStart;
    countdownLabel = 'Submission starts in';
    canRegister = false;
    statusMessage = 'All spots booked. Waitlist is currently open.';
  } else if (now < submissionStart) {
    lifecycle = 'REGISTRATION_CLOSED';
    countdownTarget = submissionStart;
    countdownLabel = 'Submission starts in';
    canRegister = false;
    statusMessage = 'Registration has closed. Submission window will open shortly.';
  } else if (now <= submissionEnd) {
    lifecycle = 'SUBMISSION_OPEN';
    countdownTarget = submissionEnd;
    countdownLabel = 'Submission closes in';
    canRegister = false;
    canSubmit = true;
    statusMessage = 'Submission window active. Registered participants can upload entries.';
  } else if (now < resultDate) {
    lifecycle = 'JUDGING';
    countdownTarget = resultDate;
    countdownLabel = 'Results announce in';
    canRegister = false;
    canSubmit = false;
    statusMessage = 'Judging in progress. Final scores and winner leaderboard being compiled.';
  } else {
    lifecycle = 'COMPLETED';
    countdownTarget = null;
    countdownLabel = 'Competition Ended';
    canRegister = false;
    canSubmit = false;
    statusMessage = 'Competition completed. Winner certificates and cash prizes distributed.';
  }

  return {
    lifecycle,
    isFull,
    spotsLeft: Math.max(0, this.maxParticipants - this.currentParticipants),
    countdownTarget,
    countdownLabel,
    canRegister,
    canSubmit,
    statusMessage,
    serverTime: now,
    waitlistCount: this.waitlist ? this.waitlist.length : 0,
  };
};

module.exports = mongoose.model('Competition', CompetitionSchema);
