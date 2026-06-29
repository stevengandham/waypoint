/**
 * All static copy derived from waypoint.md
 * Single source of truth for website content
 */

const content = {
  site: {
    title: "Waypoint",
    tagline: "Find your people. Build real community.",
    description:
      "A monthly gathering for 25–32 year olds at Beachpoint Church — a waypoint for people looking to connect, find community, and build friendships.",
    footer: "Waypoint at Beachpoint Church",
  },

  hero: {
    headline: "Waypoint",
    subheadline: "Find your people. Build real community.",
    cta: "Get Connected",
  },

  about: {
    heading: "About Waypoint",
    body: [
      "We recognize a critical gap in our community: a significant number of people in the 25–32 age group around Beachpoint are past the traditional Young Adults programs yet remain unconnected to the consistent community and accountability provided by established Life Groups.",
      "We do not want to replace life groups. Instead, we want to create a non-intimidating \"soft entry\" point where people feel comfortable connecting to community and fellowship before they might feel comfortable joining a lifegroup.",
      "These events are a place to hang out and meet people in a similar life stage: a waypoint for people outside of the life of the church and the church's existing programs.",
    ],
    stats: [
      { label: "Meeting Frequency", value: "Monthly" },
      { label: "Where", value: "TBA Monthly" },
      { label: "Catered to", value: "25–32 yr olds" },
    ],
  },

  vision: {
    heading: "Our Vision",
    body: "We want to create a non-intimidating \"soft entry\" point for 25–32 year olds — a waypoint for people outside of the life of the church and the church's existing programs to connect with community and fellowship. These events are a place to hang out, meet people in a similar life stage, and build genuine relationships.",
  },

  values: {
    heading: "Beachpoint Value Alignment",
    items: [
      {
        title: "Transformational",
        icon: "🔄",
        description:
          "We believe a community of connected believers in the same age bracket fosters growth and transformation.",
      },
      {
        title: "Relational",
        icon: "🤝",
        description:
          "The Christian walk is not meant to be walked alone. Genuine relationships are built brick by brick with intention. This ministry brings together individuals in the 25–32 age bracket to spark friendships and create connections within the church body.",
      },
      {
        title: "Intergenerational",
        icon: "🌉",
        description:
          "We believe in the importance of an intragenerational network within a church body in addition to Beachpoint's Intergenerational approach to community. Beachpoint 20-somethings are earnestly seeking a format for camaraderie, unity, and fellowship.",
      },
      {
        title: "Missional",
        icon: "🎯",
        description:
          "Our mission is to connect people together in hopes they organically form their own friend groups and feel empowered to invite others to 'do life with' them in the day to day.",
      },
      {
        title: "Generous",
        icon: "🍞",
        description:
          "We believe breaking bread together is a powerful approach to fellowship (Acts 2:42). By practicing hospitality, we create an environment where connection is prioritized, promoting a culture where every member is encouraged to open their life and home to others.",
      },
    ],
  },

  contact: {
    heading: "Contact & Info",
    frequency: "Monthly",
    location: "TBA Monthly",
    email: "waypoint.bp@gmail.com"
  },

  interestForm: {
    heading: "Get Connected",
    subheading:
      "Interested in joining us? Drop your info below, including when you're usually free, and we'll keep you in the loop.",
    fields: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      availability: "Weekly Availability",
      availabilityHint: "Click all the time blocks that usually work for you.",
      lifeGroup: "Interested in a Life Group too?",
    },
    lifeGroupOptions: ["Yes", "No"],
    submit: "Send It",
    submitting: "Sending...",
    privacy:
      "Your info goes straight to our team. No spam.",
    successMessage: "Thanks! We'll be in touch soon. 🎉",
    errorMessage: "Something went wrong. Please try again.",
  },

  socials: {
    heading: "Connect With Us",
    items: [
      {
        platform: "Instagram",
        icon: "📸",
        handle: "@waypoint.bp",
        url: "https://www.instagram.com/waypoint.bp",
        label: "Follow us",
      },
      {
        platform: "Beachpoint Church Website",
        icon: "⛪",
        handle: "beachpoint",
        url: "https://www.beachpoint.com",
        label: "Visit",
      },
      {
        platform: "Beachpoint Church Instagram",
        icon: "📸",
        handle: "beachpointchurch",
        url: "https://www.instagram.com/beachpointchurch",
        label: "Check us out",
      },
    ],
  },

  gallery: {
    heading: "Gallery",
    placeholder: "Photos coming soon — check back after our next event!",
  },

  nav: {
    items: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "vision", label: "Vision" },
      { id: "values", label: "Values" },
      { id: "contact", label: "Contact" },
      { id: "interest", label: "Get Connected" },
      { id: "socials", label: "Socials" },
      { id: "gallery", label: "Gallery" },
    ],
  },
};

export default content;