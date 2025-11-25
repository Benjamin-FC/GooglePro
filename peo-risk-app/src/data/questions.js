export const questions = [
    {
        id: "company_profile",
        text: "Company Information",
        type: "company_profile",
    },
    {
        id: "ca_specific_permit",
        text: "Do you have a valid Cal-OSHA permit?",
        type: "radio",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
        condition: (answers) => answers.company_profile?.state === "CA",
    },
    {
        id: "industry",
        text: "What is your primary industry?",
        type: "select",
        options: [
            { label: "Construction", value: "construction" },
            { label: "Healthcare", value: "healthcare" },
            { label: "Technology", value: "tech" },
            { label: "Retail", value: "retail" },
            { label: "Hospitality", value: "hospitality" },
        ],
    },
    {
        id: "construction_height",
        text: "Do your employees work at heights above 15 feet?",
        type: "radio",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
        condition: (answers) => answers.industry === "construction",
    },
    {
        id: "healthcare_type",
        text: "What type of healthcare facility?",
        type: "select",
        options: [
            { label: "Hospital", value: "hospital" },
            { label: "Private Practice", value: "practice" },
            { label: "Nursing Home", value: "nursing_home" },
        ],
        condition: (answers) => answers.industry === "healthcare",
    },
    {
        id: "wc_code",
        text: "Enter your main Workers' Comp Class Code",
        type: "text",
        placeholder: "e.g., 8810",
    },
    {
        id: "claims_history",
        text: "Have you had any WC claims in the last 3 years?",
        type: "radio",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "claims_details",
        text: "Please provide a brief summary of the claims",
        type: "textarea",
        condition: (answers) => answers.claims_history === "yes",
    },
];
