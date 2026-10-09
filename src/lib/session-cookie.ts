/**
 * The login cookie, shared by Auth.js (Google sign-in) and the password
 * sign-in action, which creates the same kind of database session by hand.
 *
 * Its own name because browsers do not separate cookies by port: on
 * localhost OttoLabs (:3000) and OttoHSK (:3100) would otherwise share one
 * login cookie. The __Secure- prefix matches what Auth.js uses over HTTPS.
 */
const secure = process.env.NODE_ENV === "production";

export const SESSION_COOKIE = `${secure ? "__Secure-" : ""}ottohsk.session-token`;

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure,
};

/** Auth.js's default for database sessions. */
export const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60;
