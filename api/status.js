module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ ai: !!process.env.ANTHROPIC_API_KEY, passcode: !!process.env.APP_PASSCODE });
};
