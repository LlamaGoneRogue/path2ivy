import express from 'express';

const router = express.Router();

// Financial aid estimator (very rough demo)
router.post('/aid-estimate', async (req, res) => {
  try {
    const { familyIncome = 0, assets = 0, householdSize = 3 } = req.body || {};
    const efc = Math.max(0, familyIncome * 0.22 + assets * 0.05 - householdSize * 1500);
    const sticker = 65000; // demo sticker price
    const need = Math.max(0, sticker - efc);
    const estimatedGrant = Math.round(need * 0.6);
    const estimatedNet = sticker - estimatedGrant;
    res.json({ efc: Math.round(efc), sticker, estimatedGrant, estimatedNet });
  } catch (e) {
    res.status(500).json({ message: 'Error estimating aid' });
  }
});

export default router;


