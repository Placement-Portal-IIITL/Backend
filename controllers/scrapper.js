const axios = require("axios");

exports.scrapCompanyProfile = async (req, res) => {
  try {
    const profileId = req.query.profileId;
    const { data } = await axios.post(
      "https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details",
      {
        profile_id: profileId,
        profile_type: "company",
        contact_info: true,
        recommendations: false,
        related_profiles: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host":
            "linkedin-profiles-and-company-data.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.LINKEDIN_SCRAPPER_API_KEY,
        },
      }
    );
    return res.json({
      name: data.details?.name,
      natureOfBusiness: data.details?.industries[0],
      website: data.details?.urls?.company_page,
      linkedIn: data.details?.urls?.li_url,
      logo: data.details?.images?.logo,
    });
  } catch (error) {
    console.log("Error occurred in /scrapCompanyProfile", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.scrapUserProfile = async (req, res) => {
  try {
    const profileId = req.query.profileId;
    const { data } = await axios.post(
      "https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details",
      {
        profile_id: profileId,
        profile_type: "personal",
        contact_info: true,
        recommendations: false,
        related_profiles: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host":
            "linkedin-profiles-and-company-data.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.LINKEDIN_SCRAPPER_API_KEY,
        },
      }
    );
    res.json({
      firstName: data.first_name,
      lastName: data.last_name,
      title: data.sub_title,
      photo: data.profile_picture,
      designation: data.position_groups[0]?.profile_positions[0]?.title,
      company: data.position_groups[0]?.profile_positions[0]?.company,
    });
  } catch (error) {
    console.log("Error occurred in /scrapUserProfile", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
