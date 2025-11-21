const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const genAI = require("../config/gemini");
const Project = require("../models/Project");
const profile = require("../config/profile");



const buildProfileContext = () => {
  const lines = [];

  lines.push(`Name: ${profile.name}`);
  lines.push(`Headline: ${profile.headline}`);
  lines.push(`Location: ${profile.location}`);
  lines.push("");
  lines.push("About:");
  lines.push(profile.about);
  lines.push("");

  if (profile.education?.length) {
    lines.push("Education:");
    profile.education.forEach((edu) => {
      lines.push(
        `- ${edu.degree} at ${edu.institute} (${edu.year})${edu.grade ? ` – ${edu.grade}` : ""}`
      );
    });
    lines.push("");
  }

  if (profile.skills) {
    lines.push("Skills:");
    if (profile.skills.frontend?.length) {
      lines.push(`- Frontend: ${profile.skills.frontend.join(", ")}`);
    }
    if (profile.skills.backend?.length) {
      lines.push(`- Backend: ${profile.skills.backend.join(", ")}`);
    }
    if (profile.skills.database?.length) {
      lines.push(`- Databases: ${profile.skills.database.join(", ")}`);
    }
    if (profile.skills.devopsAndTools?.length) {
      lines.push(`- DevOps & Tools: ${profile.skills.devopsAndTools.join(", ")}`);
    }
    if (profile.skills.aiAndOthers?.length) {
      lines.push(`- AI & Others: ${profile.skills.aiAndOthers.join(", ")}`);
    }
    lines.push("");
  }

  if (profile.interests?.length) {
    lines.push(`Interests: ${profile.interests.join(", ")}`);
    lines.push("");
  }

  if (profile.contact) {
    lines.push("Contact:");
    if (profile.contact.emailPrimary) {
      lines.push(`- Email (primary): ${profile.contact.emailPrimary}`);
    }
    if (profile.contact.emailCollege) {
      lines.push(`- Email (college): ${profile.contact.emailCollege}`);
    }
    if (profile.contact.github) {
      lines.push(`- GitHub: ${profile.contact.github}`);
    }
    if (profile.contact.linkedin) {
      lines.push(`- LinkedIn: ${profile.contact.linkedin}`);
    }
  }

  return lines.join("\n");
};



const buildProjectContext = async () => {
  const projects = await Project.find()
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(10);

  if (!projects.length) {
    return "No projects are currently stored in the database.";
  }

  const lines = projects.map((p, index) => {
    return [
      `Project ${index + 1}: ${p.title}`,
      p.shortDescription ? `- Summary: ${p.shortDescription}` : null,
      p.techStack?.length ? `- Tech stack: ${p.techStack.join(", ")}` : null,
      p.role ? `- Role: ${p.role}` : null,
      p.timeline ? `- Timeline: ${p.timeline}` : null,
      p.githubUrl ? `- GitHub: ${p.githubUrl}` : null,
      p.liveUrl ? `- Live: ${p.liveUrl}` : null,
      p.highlightPoints?.length
        ? `- Highlights: ${p.highlightPoints.join("; ")}`
        : null
    ]
      .filter(Boolean)
      .join("\n");
  });

  return lines.join("\n\n");
};

const formatConversationText = (messages) => {
  return messages
    .map((m) => {
      const speaker = m.role === "user" ? "User" : "Assistant";
      return `${speaker}: ${m.content}`;
    })
    .join("\n");
};


const chatWithPersona = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(", "));
  }

  const { messages, mode = "default" } = req.body;

  const profileContext = buildProfileContext();
  const projectContext = await buildProjectContext();

  const modeDescriptionMap = {
    default:
      "You are Ankit Kumar's AI twin. Speak casually, like a friendly, confident developer in his early 20s.",
    developer:
      "You are 'Developer Ankit', focusing on code, architecture, and technical depth. Use precise technical language.",
    designer:
      "You are 'Designer Ankit', focusing on UI/UX strategy, visual hierarchy, and interactions.",
    mentor:
      "You are 'Mentor Ankit', giving career guidance, feedback, and support to junior developers."
  };

  const modeDescription = modeDescriptionMap[mode] || modeDescriptionMap.default;

const systemPrompt = `
${modeDescription}

You are embedded inside Ankit's personal portfolio website as a chat assistant.
Your job:
- Answer questions about Ankit's projects, skills, background, and interests.
- Give career guidance when asked.
- Be short, friendly, and clear.
- If unsure, say you don't know rather than guessing.

Here is structured profile information about Ankit:

${profileContext}

Here is context about Ankit's projects from the backend:

${projectContext}
`;

  const conversationText = formatConversationText(messages);

  const fullPrompt = `
${systemPrompt}

Conversation so far:
${conversationText}

Respond as the assistant:
`;

  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const model = genAI.getGenerativeModel({ model: modelName });

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text();

  if (!text) {
    res.status(500);
    throw new Error("No response from AI model");
  }

  res.json({
    reply: {
      role: "assistant",
      content: text
    },
    model: modelName
  });
});

module.exports = { chatWithPersona };
