import axios from "axios";
import 'dotenv/config';

// * callback
export const callbackService = async (code: string) => {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
    });
    console.log("data: ", data);
    if (!data.access_token) {
        throw new Error("Access token not received.");
    }

    // *Use access_token to get profile from Google
    const { access_token, id_token } = data;

    const profileRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    console.log("profileRes: ", profileRes.data);
    if (!profileRes.data) {
        throw new Error("Profile data not received.");
    }

    return profileRes.data
}