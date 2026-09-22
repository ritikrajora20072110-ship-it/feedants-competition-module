const seedCompetitions = [
  {
    title: 'Feedants Classical Dance',
    titleHi: 'फीडैंट्स क्लासिकल डांस प्रतियोगिता',
    slug: 'feedants-classical-dance',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    tagsHi: ['नृत्य', 'मल्टी-विन', 'विजेताओं को प्रमाण पत्र'],
    prizePool: 1500,
    entryFee: 99,
    maxParticipants: 20,
    currentParticipants: 1,
    isCertificateProvided: true,
    isMultiWin: true,
    judge: {
      name: 'Manju Dubey',
      nameHi: 'मंजू दुबे',
      title: 'Professional Kathak Dancer',
      titleHi: 'पेशेवर कथक नृत्यांगना',
      experience: '12+ Years of Experience',
      experienceHi: '12+ वर्षों का अनुभव',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    dates: {
      registrationStart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      registrationEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 3600 * 1000 + 28 * 60 * 1000), // ~1d 6h
      submissionStart: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      submissionEnd: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days later
      resultDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days later
    },
    previousWinners: [
      {
        name: 'Riya Shah',
        rankText: '1st Winner',
        rankTextHi: 'प्रथम विजेता',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        yearOrEdition: 'Season 4',
      },
      {
        name: 'Aarav Mehta',
        rankText: '1st Winner',
        rankTextHi: 'प्रथम विजेता',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        yearOrEdition: 'Season 3',
      },
      {
        name: 'Neha Verma',
        rankText: '2nd Winner',
        rankTextHi: 'द्वितीय विजेता',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        yearOrEdition: 'Season 4',
      },
      {
        name: 'Ishita Cho',
        rankText: '3rd Winner',
        rankTextHi: 'तृतीय विजेता',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        yearOrEdition: 'Season 4',
      },
    ],
    tabs: {
      about: {
        en: 'This is an online classical dance competition open for all age groups.\nParticipate from anywhere and showcase your talent.\nExpress your passion through traditional dance.\n\nWhether you practice Kathak, Bharatanatyam, Odissi, Kuchipudi, or Kathakali, this platform provides national visibility, direct feedback from veteran artists, and guaranteed cash rewards for top performers.',
        hi: 'यह एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है जो सभी आयु समूहों के लिए खुली है।\nकहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें।\nपारंपरिक नृत्य के माध्यम से अपने जुनून को व्यक्त करें।\n\nचाहे आप कथक, भरतनाट्यम, ओडिसी, कुचिपुड़ी या कथकली का अभ्यास करते हों, यह मंच राष्ट्रीय पहचान, अनुभवी कलाकारों से सीधी प्रतिक्रिया और शीर्ष प्रदर्शनकर्ताओं के लिए नकद पुरस्कार प्रदान करता है।',
      },
      judgingParameters: {
        en: '1. Technical Proficiency & Footwork (30%): Accuracy of rhythm (Taal), postures (Mudras), and foot synchronization.\n2. Expressions & Abhinaya (25%): Facial expressions, emotional conveyance, and storytelling depth.\n3. Choreography & Rhythm (25%): Originality of movement, seamless transitions, and musical harmony.\n4. Costume & Presentation (20%): Traditional attire, makeup, stage aesthetics, and overall presentation.',
        hi: '1. तकनीकी दक्षता और पद संचालन (30%): ताल की सटीकता, मुद्राएं और पैरों का तालमेल।\n2. भाव एवं अभिनय (25%): चेहरे के भाव, संवेगात्मक प्रस्तुति और कहानी की गहराई।\n3. कोरियोग्राफी और लय (25%): गति की मौलिकता, सुगम परिवर्तन और संगीत का सामंजस्य।\n4. वेशभूषा और प्रस्तुति (20%): पारंपरिक पोशाक, श्रृंगार और समग्र मंच प्रस्तुति।',
      },
      rulesAndEligibility: {
        en: '• Open to all age groups across India & internationally.\n• Video performance duration must be between 1.5 to 3 minutes.\n• Continuous unedited video recording with clearly audible background music.\n• Only solo performances are eligible for prize distribution.\n• High definition video (720p or 1080p) uploaded in MP4/MOV format or YouTube unlisted link.\n• Decisions of the judging panel will be final and binding.',
        hi: '• भारत और अंतरराष्ट्रीय स्तर पर सभी आयु समूहों के लिए खुला है।\n• वीडियो प्रदर्शन की अवधि 1.5 से 3 मिनट के बीच होनी चाहिए।\n• स्पष्ट श्रव्य पृष्ठभूमि संगीत के साथ निरंतर असंपादित वीडियो रिकॉर्डिंग।\n• पुरस्कार वितरण के लिए केवल एकल प्रदर्शन ही पात्र हैं।\n• 720p या 1080p में वीडियो MP4/MOV प्रारूप में अपलोड किया जाना चाहिए।\n• निर्णायक मंडल का निर्णय अंतिम एवं सर्वमान्य होगा।',
      },
    },
    rewards: [
      { rank: 1, title: '1st Winner', titleHi: 'प्रथम विजेता', amount: 550, iconType: 'trophy' },
      { rank: 2, title: '2nd Winner', titleHi: '2nd Winner', amount: 300, iconType: 'medal-silver' },
      { rank: 3, title: '3rd Winner', titleHi: '3rd Winner', amount: 240, iconType: 'medal-bronze' },
      { rank: 4, title: '4th Winner', titleHi: '4th Winner', amount: 200, iconType: 'star' },
      { rank: 5, title: '5th Winner', titleHi: '5th Winner', amount: 130, iconType: 'star' },
      { rank: 6, title: '6th Winner', titleHi: '6th Winner', amount: 80, iconType: 'star' },
    ],
    disclaimer: {
      en: 'Only contributions from paid participants will be considered for judging.',
      hi: 'केवल भुगतान किए गए प्रतिभागियों के योगदान पर ही निर्णय के लिए विचार किया जाएगा।',
    },
    referral: {
      code: 'referral123',
      baseUrl: 'https://feedants.com/r/',
      rewardAmount: 10,
    },
    prizeMoneyVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isActive: true,
  },
  {
    title: 'Feedants Folk Dance Fiesta',
    titleHi: 'फीडैंट्स लोक नृत्य प्रतियोगिता',
    slug: 'feedants-folk-dance-fiesta',
    category: 'Folk Dance',
    tags: ['Folk', 'Single-Win', 'Certificate of Merit'],
    tagsHi: ['लोक नृत्य', 'एकल-जीत', 'प्रमाण पत्र'],
    prizePool: 2500,
    entryFee: 149,
    maxParticipants: 30,
    currentParticipants: 30, // SOLD OUT SCENARIO
    isCertificateProvided: true,
    isMultiWin: false,
    judge: {
      name: 'Radhika Sen',
      nameHi: 'राधिका सेन',
      title: 'Folk Dance Maestro',
      titleHi: 'लोक नृत्य विशेषज्ञ',
      experience: '15+ Years of Experience',
      experienceHi: '15+ वर्षों का अनुभव',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    dates: {
      registrationStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      registrationEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      submissionStart: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      submissionEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      resultDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    previousWinners: [
      {
        name: 'Kabir Das',
        rankText: '1st Winner',
        rankTextHi: 'प्रथम विजेता',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        yearOrEdition: 'Season 2',
      },
    ],
    tabs: {
      about: {
        en: 'Celebrate India’s rich folklore and folk traditions in this high-energy competition.',
        hi: 'इस प्रतियोगिता में भारत की समृद्ध लोक परंपराओं का जश्न मनाएं।',
      },
      judgingParameters: {
        en: 'Energy, Authenticity, Traditional Attire, Coordination',
        hi: 'ऊर्जा, प्रामाणिकता, पारंपरिक पोशाक, समन्वय',
      },
      rulesAndEligibility: {
        en: 'All folk forms including Garba, Bhangra, Lavani, Bihu, and Ghoomar are eligible.',
        hi: 'गरबा, भांगड़ा, लावणी, बिहू और घूमर सहित सभी लोक नृत्य रूप पात्र हैं।',
      },
    },
    rewards: [
      { rank: 1, title: '1st Winner', titleHi: 'प्रथम विजेता', amount: 1500, iconType: 'trophy' },
      { rank: 2, title: '2nd Winner', titleHi: '2nd Winner', amount: 1000, iconType: 'medal-silver' },
    ],
    disclaimer: {
      en: 'Only contributions from paid participants will be considered for judging.',
      hi: 'केवल भुगतान किए गए प्रतिभागियों के योगदान पर ही निर्णय के लिए विचार किया जाएगा।',
    },
    referral: {
      code: 'folk2026',
      baseUrl: 'https://feedants.com/r/',
      rewardAmount: 15,
    },
    prizeMoneyVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isActive: true,
  },
];

const seedReviews = [
  {
    userName: 'Pooja Bhattacharya',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    comment: 'Feedants provided an incredible stage! The feedback from Manju Dubey ma’am was genuinely constructive and helped me improve my Mudras.',
    commentHi: 'फीडैंट्स ने एक अविश्वसनीय मंच प्रदान किया! मंजू दुबे मैम की प्रतिक्रिया वास्तव में रचनात्मक थी और इससे मुझे अपनी मुद्राओं में सुधार करने में मदद मिली।',
    competitionCategory: 'Classical Dance',
    badge: '1st Place Winner',
  },
  {
    userName: 'Vikramaditya Roy',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    comment: 'Smooth registration process and instant cash prize credited straight to UPI within 24 hours of result announcement. Highly recommended!',
    commentHi: 'सुचारू पंजीकरण प्रक्रिया और परिणाम घोषणा के 24 घंटों के भीतर सीधे UPI में तत्काल नकद पुरस्कार। अत्यधिक अनुशंसित!',
    competitionCategory: 'Kathak Solo',
    badge: 'Verified Participant',
  },
  {
    userName: 'Ananya Deshmukh',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    comment: 'The transparent judging parameters and verified certificates make Feedants the best platform for budding artists in India.',
    commentHi: 'पारदर्शी निर्णय मानदंड और सत्यापित प्रमाण पत्र फीडैंट्स को भारत में उभरते कलाकारों के लिए सर्वश्रेष्ठ मंच बनाते हैं।',
    competitionCategory: 'Bharatanatyam',
    badge: 'Top 5 Finalist',
  },
];

module.exports = { seedCompetitions, seedReviews };
