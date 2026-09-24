const express = require('express');
const router = express.Router();

// Mock in-memory / persistent sponsor catalog
const sponsorAds = [
  {
    id: 'ad_1',
    sponsorName: 'Nritya Wear & Ghungroo Store',
    sponsorNameHi: 'नृत्य परिधान एवं घुंघरू स्टोर',
    headline: 'Flat 25% Off on Authentic Kathak Ghungroos & Costumes',
    headlineHi: 'प्रामाणिक कथक घुंघरू और वेशभूषा पर फ्लैट 25% की छूट',
    couponCode: 'NATYA25',
    discount: '25% OFF',
    tag: 'SPONSORED',
    ctaText: 'Use Code',
    badgeColor: '#E11D48',
    icon: 'sparkles-outline',
  },
  {
    id: 'ad_2',
    sponsorName: 'Parampara Arts Academy',
    sponsorNameHi: 'परंपरा कला अकादमी',
    headline: 'Exclusive Masterclass with Sangeet Natak Akademi Winners',
    headlineHi: 'संगीत नाटक अकादमी विजेताओं के साथ विशेष मास्टरक्लास',
    couponCode: 'PARAM500',
    discount: '₹500 OFF',
    tag: 'PARTNER',
    ctaText: 'Claim Pass',
    badgeColor: '#0284C7',
    icon: 'ribbon-outline',
  },
  {
    id: 'ad_3',
    sponsorName: 'Feedants Creator Spotlight',
    sponsorNameHi: 'फीडैंट्स क्रिएटर स्पॉटलाइट',
    headline: 'Promote your brand to 50,000+ competitive performers',
    headlineHi: '50,000+ प्रतिस्पर्धी कलाकारों तक अपने ब्रांड का प्रचार करें',
    couponCode: 'ADVERTISE',
    discount: 'BOOST',
    tag: 'FEATURED',
    ctaText: 'Advertise Here',
    badgeColor: '#10B981',
    icon: 'megaphone-outline',
  },
];

// Active inquiries storage
const inquiries = [];

/**
 * GET /api/ads
 * Fetch active sponsor ads
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: sponsorAds,
  });
});

/**
 * POST /api/ads/inquire
 * Submit an advertising or sponsorship request
 */
router.post('/inquire', (req, res) => {
  const { brandName, contactPerson, email, phone, tier, message } = req.body;

  if (!brandName || !brandName.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Brand or Academy name is required',
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'A valid contact email is required',
    });
  }

  const inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    brandName: brandName.trim(),
    contactPerson: (contactPerson || '').trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    tier: tier || 'Standard Banner',
    message: (message || '').trim(),
    createdAt: new Date().toISOString(),
    status: 'RECEIVED',
  };

  inquiries.push(inquiry);

  return res.status(201).json({
    success: true,
    message: 'Advertising inquiry received successfully! Our team will contact you shortly.',
    data: inquiry,
  });
});

module.exports = router;
