import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "global"; // fallback if IP not found

    const { success } = await ratelimit.limit(`limit_${ip}`);
    if (!success)
      return res.status(429).json({
        message: "Too many requests ! Try after some time",
      });
    next();
  } catch (error) {
    console.log("Rate limit error ", error);
    next(error);
  }
};

export default rateLimiter;
